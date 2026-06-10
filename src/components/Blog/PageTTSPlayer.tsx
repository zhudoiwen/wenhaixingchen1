"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTENT_ROOT_ID = "page-readable-content";
const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[。！？；.!?;])\s*|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function extractReadableText(): string {
  const root = document.getElementById(CONTENT_ROOT_ID);
  if (!root) return "";

  const clone = root.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-tts-exclude]").forEach((el) => el.remove());
  clone.querySelectorAll('[aria-hidden="true"]').forEach((el) => el.remove());

  return clone.innerText.replace(/\s+/g, " ").trim();
}

function pickChineseVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  return (
    voices.find((v) => v.lang === "zh-CN") ??
    voices.find((v) => v.lang.startsWith("zh")) ??
    null
  );
}

export default function PageTTSPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rate, setRate] = useState(1);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const sentencesRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);
  const rateRef = useRef(1);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);

  const ensureSentences = useCallback(() => {
    if (sentencesRef.current.length > 0) return sentencesRef.current.length;

    const text = extractReadableText();
    sentencesRef.current = splitIntoSentences(text);
    setSentenceCount(sentencesRef.current.length);
    return sentencesRef.current.length;
  }, []);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const loadVoices = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    voiceRef.current = pickChineseVoice(voices);
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, [isSupported, loadVoices]);

  const speakFromIndex = useCallback(
    (startIndex: number) => {
      const synth = window.speechSynthesis;
      synth.cancel();

      const sentences = sentencesRef.current;
      if (sentences.length === 0) return;

      const safeIndex = Math.min(Math.max(startIndex, 0), sentences.length - 1);
      currentIndexRef.current = safeIndex;

      const queueSentence = (index: number) => {
        if (index >= sentences.length) {
          setIsPlaying(false);
          setIsPaused(false);
          setProgress(100);
          return;
        }

        const utterance = new SpeechSynthesisUtterance(sentences[index]);
        utterance.lang = "zh-CN";
        utterance.rate = rateRef.current;
        if (voiceRef.current) utterance.voice = voiceRef.current;

        utterance.onstart = () => {
          currentIndexRef.current = index;
          if (!isDraggingRef.current) {
            setProgress((index / sentences.length) * 100);
          }
        };

        utterance.onend = () => {
          if (!isPlayingRef.current) return;
          const next = index + 1;
          if (next >= sentences.length) {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(100);
            return;
          }
          queueSentence(next);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
          setIsPaused(false);
        };

        synth.speak(utterance);
      };

      queueSentence(safeIndex);
    },
    []
  );

  const handlePlay = useCallback(() => {
    if (!isSupported) return;

    const synth = window.speechSynthesis;

    if (isPlaying && isPaused) {
      synth.resume();
      setIsPaused(false);
      return;
    }

    if (isPlaying) {
      synth.pause();
      setIsPaused(true);
      isPausedRef.current = true;
      return;
    }

    ensureSentences();
    if (sentencesRef.current.length === 0) return;

    loadVoices();
    setIsPlaying(true);
    setIsPaused(false);
    isPausedRef.current = false;

    const startIndex = currentIndexRef.current;
    setProgress((startIndex / sentencesRef.current.length) * 100);

    setTimeout(() => speakFromIndex(startIndex), 50);
  }, [isSupported, isPlaying, isPaused, ensureSentences, loadVoices, speakFromIndex]);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const seekToRatio = useCallback(
    (ratio: number) => {
      ensureSentences();
      const sentences = sentencesRef.current;
      if (sentences.length === 0) return;

      const clamped = Math.min(1, Math.max(0, ratio));
      const index = Math.min(
        Math.floor(clamped * sentences.length),
        sentences.length - 1
      );

      setProgress(clamped * 100);

      if (isPlayingRef.current) {
        setIsPaused(false);
        isPausedRef.current = false;
        speakFromIndex(index);
      } else {
        currentIndexRef.current = index;
      }
    },
    [ensureSentences, speakFromIndex]
  );

  const getRatioFromEvent = useCallback((clientX: number) => {
    const bar = progressRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  }, []);

  const handleProgressPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      setIsDragging(true);
      seekToRatio(getRatioFromEvent(e.clientX));
    },
    [getRatioFromEvent, seekToRatio]
  );

  const handleProgressPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      seekToRatio(getRatioFromEvent(e.clientX));
    },
    [getRatioFromEvent, seekToRatio]
  );

  const handleProgressPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      seekToRatio(getRatioFromEvent(e.clientX));
      e.currentTarget.releasePointerCapture(e.pointerId);
    },
    [getRatioFromEvent, seekToRatio]
  );

  const handleRateChange = useCallback(
    (newRate: number) => {
      setRate(newRate);
      rateRef.current = newRate;

      if (!isPlayingRef.current) return;

      const resumeIndex = currentIndexRef.current;
      const wasPaused = isPausedRef.current;

      speakFromIndex(resumeIndex);

      if (wasPaused) {
        requestAnimationFrame(() => {
          window.speechSynthesis.pause();
          setIsPaused(true);
          isPausedRef.current = true;
        });
      }
    },
    [speakFromIndex]
  );

  if (!isSupported) return null;

  const totalSentences = sentenceCount;
  const currentSentence =
    totalSentences > 0
      ? Math.min(
          Math.floor((progress / 100) * totalSentences) + (progress >= 100 ? 0 : 1),
          totalSentences
        )
      : 0;

  const rateIndex = SPEED_OPTIONS.indexOf(rate as (typeof SPEED_OPTIONS)[number]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-6 px-4">
      {isExpanded && (
        <div className="mb-3 w-72 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-md shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <button
              type="button"
              onClick={handlePlay}
              aria-label={isPlaying && !isPaused ? "暂停朗读" : "开始朗读"}
              className="flex size-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
            >
              {isPlaying && !isPaused ? (
                <Pause className="size-4" />
              ) : (
                <Play className="ml-0.5 size-4" />
              )}
            </button>
            <div className="flex-1">
              <span className="text-sm text-body-color-dark">
                {isPlaying || progress > 0
                  ? `朗读进度 ${currentSentence}/${totalSentences || "—"}`
                  : "点击播放"}
              </span>
            </div>
          </div>

          <div
            ref={progressRef}
            role="slider"
            aria-label="朗读进度"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            onPointerDown={handleProgressPointerDown}
            onPointerMove={handleProgressPointerMove}
            onPointerUp={handleProgressPointerUp}
            onPointerCancel={handleProgressPointerUp}
            onKeyDown={(e) => {
              const step = e.shiftKey ? 10 : 2;
              if (e.key === "ArrowRight") {
                e.preventDefault();
                seekToRatio(progress / 100 + step / 100);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                seekToRatio(progress / 100 - step / 100);
              }
            }}
            className={cn(
              "relative h-1.5 cursor-pointer rounded-full bg-white/15 transition-all mb-4",
              isDragging && "h-2"
            )}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow-md transition-[left] duration-150"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-body-color-dark">语速</span>
            <input
              type="range"
              min={0}
              max={SPEED_OPTIONS.length - 1}
              step={1}
              value={rateIndex !== -1 ? rateIndex : SPEED_OPTIONS.indexOf(1)}
              onChange={(e) =>
                handleRateChange(SPEED_OPTIONS[Number(e.target.value)])
              }
              aria-label="语速调节"
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-primary [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <span className="w-8 text-right text-xs font-medium text-white">
              {rate}x
            </span>
          </div>

          {isPlaying && (
            <button
              type="button"
              onClick={handleStop}
              className="w-full rounded-lg px-3 py-2 text-sm text-body-color-dark transition-colors hover:bg-white/10 hover:text-white"
            >
              停止朗读
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        aria-label={isExpanded ? "收起朗读控制" : "展开朗读控制"}
        className="relative flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95"
      >
        {isPlaying && !isPaused ? (
          <Pause className="size-6" />
        ) : (
          <Play className="ml-1 size-6" />
        )}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
        )}
      </button>
    </div>
  );
}
