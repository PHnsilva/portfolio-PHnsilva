import { useEffect, useRef, useState } from 'react';
import { bilingual as b, useI18n } from '../i18n/context';

type Pipe = { x: number; top: number; scored: boolean };
const width = 340,
  height = 340,
  birdX = 76,
  gap = 110,
  pipeWidth = 38;

export default function PlayBreak({ onClose }: { onClose: () => void }) {
  const { pick } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const velocity = useRef(0);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext('2d');
    if (!element || !ctx) return;
    let birdY = height / 2,
      elapsed = 0,
      last = 0,
      frame = 0,
      points = 0;
    let pipes: Pipe[] = [];
    velocity.current = 0;
    function draw() {
      if (!ctx) return;
      ctx.fillStyle = '#172d33';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#26434a';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.fillStyle = '#97b6a1';
      pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + gap, pipeWidth, height);
      });
      ctx.fillStyle = '#e6ac78';
      ctx.fillRect(birdX - 9, birdY - 9, 18, 18);
      ctx.fillStyle = '#172d33';
      ctx.fillRect(birdX + 2, birdY - 4, 3, 3);
      ctx.fillStyle = '#f9ecd6';
      ctx.fillRect(birdX + 9, birdY, 5, 4);
    }
    function loop(time: number) {
      const dt = Math.min((time - (last || time)) / 1000, 0.035);
      last = time;
      if (running) {
        elapsed += dt;
        velocity.current += 700 * dt;
        birdY += velocity.current * dt;
        if (elapsed > 1.55) {
          pipes.push({ x: width, top: 45 + Math.random() * 125, scored: false });
          elapsed = 0;
        }
        pipes.forEach((pipe) => {
          pipe.x -= 105 * dt;
          if (!pipe.scored && pipe.x + pipeWidth < birdX - 9) {
            pipe.scored = true;
            points++;
            setScore(points);
          }
        });
        pipes = pipes.filter((pipe) => pipe.x > -pipeWidth);
        const collision =
          birdY - 9 < 0 ||
          birdY + 9 > height ||
          pipes.some(
            (pipe) =>
              birdX + 9 > pipe.x &&
              birdX - 9 < pipe.x + pipeWidth &&
              (birdY - 9 < pipe.top || birdY + 9 > pipe.top + gap),
          );
        if (collision) {
          draw();
          setRunning(false);
          setEnded(true);
          return;
        }
      }
      draw();
      if (running) frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [running]);
  function start() {
    setScore(0);
    setEnded(false);
    setRunning(true);
    canvas.current?.focus();
  }
  return (
    <dialog ref={dialog} className="game-dialog" aria-labelledby="game-title" onClose={onClose}>
      <div className="game-heading">
        <div>
          <p className="eyebrow">SIDE QUEST / 01</p>
          <h2 id="game-title">Pixel break</h2>
        </div>
        <button
          type="button"
          className="close-game"
          aria-label={pick(b('Fechar jogo', 'Close game'))}
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
      </div>
      <p>
        {pick(
          b(
            'Um pequeno jogo, só pelo prazer de construir.',
            'A little game, just for the joy of building.',
          ),
        )}
      </p>
      <canvas
        ref={canvas}
        width={width}
        height={height}
        tabIndex={0}
        role="img"
        aria-label={pick(
          b(
            'Jogo: pressione espaço ou toque para voar entre os obstáculos.',
            'Game: press space or tap to fly between obstacles.',
          ),
        )}
        onPointerDown={() => {
          if (running) velocity.current = -245;
        }}
        onKeyDown={(event) => {
          if (event.code === 'Space' || event.code === 'ArrowUp') {
            event.preventDefault();
            if (running) velocity.current = -245;
          }
        }}
      >
        {pick(
          b(
            'Seu navegador não suporta o jogo em canvas.',
            'Your browser does not support canvas games.',
          ),
        )}
      </canvas>
      <div className="game-controls">
        <span role="status">
          {ended ? pick(b('Fim de jogo', 'Game over')) + ' · ' : ''}
          {pick(b('Pontos', 'Score'))}: {score}
        </span>
        <button type="button" className="button button-primary" onClick={start} disabled={running}>
          {running
            ? pick(b('Jogando', 'Playing'))
            : ended
              ? pick(b('Jogar de novo', 'Play again'))
              : pick(b('Começar', 'Start'))}
        </button>
      </div>
      <small>
        {pick(
          b(
            'Espaço, seta para cima ou toque no quadro. Esc para fechar.',
            'Space, up arrow or tap the canvas. Esc to close.',
          ),
        )}
      </small>
    </dialog>
  );
}
