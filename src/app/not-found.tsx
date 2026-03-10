"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

const SEO_WORDS = [
  "SEO", "LLM", "SERP", "E-E-A-T", "FAQ", "Meta", "Schema",
  "Backlink", "Crawl", "Index", "Rank", "Query", "Snippet",
  "CTR", "Alt", "H1", "Slug", "Sitemap", "Robot", "Anchor",
  "Keyword", "Authority", "Citation", "Entity", "Prompt",
];

export default function NotFoundPage() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [words, setWords] = useState<FallingWord[]>([]);
  const [missed, setMissed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const frameRef = useRef<number>(0);
  const lastSpawn = useRef(0);

  const spawnWord = useCallback(() => {
    const w = areaRef.current?.offsetWidth || 300;
    const word: FallingWord = {
      id: nextId.current++,
      text: SEO_WORDS[Math.floor(Math.random() * SEO_WORDS.length)],
      x: 20 + Math.random() * (w - 100),
      y: -30,
      speed: 1.0 + Math.random() * 1.5 + score * 0.05,
    };
    setWords((prev) => [...prev, word]);
  }, [score]);

  const catchWord = (id: number) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
    setScore((s) => s + 10);
  };

  useEffect(() => {
    if (!started || gameOver) return;

    const tick = (time: number) => {
      if (time - lastSpawn.current > Math.max(400, 1200 - score * 8)) {
        spawnWord();
        lastSpawn.current = time;
      }

      setWords((prev) => {
        const h = areaRef.current?.offsetHeight || 500;
        const alive: FallingWord[] = [];
        let newMissed = 0;
        for (const w of prev) {
          const ny = w.y + w.speed;
          if (ny > h + 20) {
            newMissed++;
          } else {
            alive.push({ ...w, y: ny });
          }
        }
        if (newMissed > 0) {
          setMissed((m) => m + newMissed);
        }
        return alive;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started, gameOver, spawnWord, score]);

  useEffect(() => {
    if (missed >= 5) setGameOver(true);
  }, [missed]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 select-none">
      <div className="text-center mb-6">
        <h1 className="text-8xl font-black text-primary tracking-tighter">404</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Bu sayfa bulunamadi -- ama SEO kelimelerini yakalayabilirsin!
        </p>
      </div>

      {!started ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground max-w-xs text-center">
            Dusen SEO terimlerine tiklayarak puan topla. 5 kelime kacirirsan oyun biter!
          </p>
          <Button size="lg" onClick={() => setStarted(true)}>
            Oyunu Baslat
          </Button>
          <Button variant="ghost" onClick={() => router.push("/")}>
            <Home className="mr-2 h-4 w-4" /> Ana Sayfa
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-6 mb-3 text-sm font-medium">
            <span className="text-primary">Skor: {score}</span>
            <span className="text-destructive">Kacan: {missed}/5</span>
          </div>

          <div
            ref={areaRef}
            className="relative w-full max-w-lg h-[400px] rounded-2xl border border-border bg-muted/30 overflow-hidden"
          >
            {gameOver && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm gap-4">
                <p className="text-2xl font-bold text-foreground">Oyun Bitti!</p>
                <p className="text-muted-foreground">
                  Skorun: <span className="text-primary font-semibold">{score}</span>
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setScore(0);
                      setMissed(0);
                      setWords([]);
                      setGameOver(false);
                    }}
                  >
                    Tekrar Oyna
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/")}>
                    <Home className="mr-2 h-4 w-4" /> Ana Sayfa
                  </Button>
                </div>
              </div>
            )}

            {words.map((w) => (
              <button
                key={w.id}
                onClick={() => catchWord(w.id)}
                className="absolute px-5 py-3 rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-primary cursor-pointer hover:scale-110 transition-transform duration-100 active:scale-95 touch-manipulation"
                style={{
                  left: w.x,
                  top: w.y,
                  willChange: "top",
                }}
              >
                {w.text}
              </button>
            ))}
          </div>

          {!gameOver && (
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" /> Ana Sayfa
            </Button>
          )}
        </>
      )}
    </div>
  );
}
