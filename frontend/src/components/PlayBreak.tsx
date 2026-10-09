import { useEffect, useRef, useState } from 'react';
import { bilingual as b, useI18n } from '../i18n/context';
import { advance, newRace, ROAD, steer, type Race } from '../games/racer';

type Phase = 'ready' | 'running' | 'paused' | 'ended';

function drawRace(ctx: CanvasRenderingContext2D, race: Race) {
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#453a2c';
  ctx.fillRect(0, 0, 340, 340);
  const scroll = Math.floor(race.distance * 5);
  for (let y = -60; y < 380; y += 60) {
    const py = y + (scroll % 60);
    ctx.fillStyle = '#71806a';
    ctx.fillRect(15, py, 5, 18);
    ctx.fillRect(9, py + 5, 17, 5);
    ctx.fillRect(316, py + 24, 5, 18);
    ctx.fillRect(310, py + 29, 17, 5);
  }
  ctx.fillStyle = '#25292b';
  ctx.fillRect(46, 0, 248, 340);
  for (let y = -48; y < 360; y += 24) {
    ctx.fillStyle = Math.floor(y / 24) % 2 ? '#eda66e' : '#dcd1b9';
    ctx.fillRect(42, y + (scroll % 48), 4, 24);
    ctx.fillRect(294, y + (scroll % 48), 4, 24);
  }
  ctx.fillStyle = '#89908a';
  for (let y = -48; y < 340; y += 48) {
    ctx.fillRect(129, y + (scroll % 48), 2, 23);
    ctx.fillRect(209, y + (scroll % 48), 2, 23);
  }
  function car(x: number, y: number, color: string, player: boolean) {
    x = Math.round(x);
    y = Math.round(y);
    ctx.fillStyle = '#101719';
    ctx.fillRect(x - 18, y - 14, 36, 9);
    ctx.fillRect(x - 18, y + 8, 36, 9);
    ctx.fillStyle = color;
    ctx.fillRect(x - 14, y - 20, 28, 40);
    ctx.fillRect(x - 10, y - 24, 20, 48);
    ctx.fillStyle = '#263b42';
    ctx.fillRect(x - 9, y - 9, 18, 10);
    ctx.fillRect(x - 8, y + 8, 16, 6);
    ctx.fillStyle = '#fff0c2';
    ctx.fillRect(x - 11, y - 20, 5, 4);
    ctx.fillRect(x + 6, y - 20, 5, 4);
    ctx.fillStyle = player ? '#ffe0b2' : '#b5dcdb';
    ctx.fillRect(x - 2, y - 23, 4, 12);
    ctx.fillStyle = '#cb685d';
    ctx.fillRect(x - 10, y + 19, 5, 3);
    ctx.fillRect(x + 5, y + 19, 5, 3);
  }
  for (const obstacle of race.obstacles) {
    const x = ROAD.lanes[obstacle.lane],
      y = Math.round(obstacle.y);
    if (obstacle.kind === 'car') car(x, y, '#8ccacf', false);
    else {
      ctx.fillStyle = '#101719';
      ctx.fillRect(x - 20, y - 9, 5, 25);
      ctx.fillRect(x + 15, y - 9, 5, 25);
      ctx.fillStyle = '#eda66e';
      ctx.fillRect(x - 25, y - 8, 50, 15);
      ctx.fillStyle = '#f9e8ce';
      for (let i = -21; i < 25; i += 14) ctx.fillRect(x + i, y - 8, 6, 15);
    }
  }
  car(race.x, ROAD.playerY, race.crashed ? '#b96655' : '#eda66e', true);
}

export default function PlayBreak({ onClose }: { onClose: () => void }) {
  const { pick } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const race = useRef(newRace());
  const phase = useRef<Phase>('ready');
  const [view, setView] = useState<Phase>('ready');
  const [hud, setHud] = useState({ distance: 0, speed: 42 });
  function changePhase(next: Phase) {
    phase.current = next;
    setView(next);
  }
  useEffect(() => {
    dialog.current?.showModal();
    const ctx = canvas.current?.getContext('2d');
    let frame = 0,
      last = 0,
      lastHud = 0;
    function loop(time: number) {
      const dt = last ? (time - last) / 1000 : 0;
      last = time;
      if (phase.current === 'running') {
        advance(race.current, dt);
        if (race.current.crashed) {
          phase.current = 'ended';
          setView('ended');
        }
        if (time - lastHud > 100 || race.current.crashed) {
          setHud({
            distance: Math.floor(race.current.distance),
            speed: Math.round(race.current.speed * 0.4),
          });
          lastHud = time;
        }
      }
      if (ctx) drawRace(ctx, race.current);
      frame = requestAnimationFrame(loop);
    }
    function pauseWhenHidden() {
      if (document.hidden && phase.current === 'running') {
        phase.current = 'paused';
        setView('paused');
      }
    }
    frame = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, []);
  function start() {
    race.current = newRace();
    setHud({ distance: 0, speed: 42 });
    changePhase('running');
    canvas.current?.focus();
  }
  function move(direction: -1 | 1) {
    if (phase.current === 'running') steer(race.current, direction);
  }
  function pause() {
    if (phase.current === 'running') changePhase('paused');
    else if (phase.current === 'paused') changePhase('running');
  }
  const active = view === 'running' || view === 'paused';
  return (
    <dialog
      ref={dialog}
      className="game-dialog"
      aria-labelledby="game-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'].includes(event.code)) {
          event.preventDefault();
          if (!event.repeat) move(event.code === 'ArrowLeft' || event.code === 'KeyA' ? -1 : 1);
        } else if (event.code === 'KeyP') {
          event.preventDefault();
          pause();
        }
      }}
    >
      <div className="game-heading">
        <div>
          <p className="eyebrow">SIDE QUEST / 01</p>
          <h2 id="game-title">Pixel racer</h2>
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
            'O carro acelera sozinho. Troque de faixa e desvie dos obstáculos.',
            'The car accelerates on its own. Switch lanes and dodge obstacles.',
          ),
        )}
      </p>
      <div
        className="race-hud"
        aria-label={pick(b('Distância e velocidade', 'Distance and speed'))}
      >
        <span>{hud.distance} m</span>
        <span>{hud.speed} km/h</span>
      </div>
      <div className="race-track">
        <canvas
          ref={canvas}
          width={ROAD.width}
          height={ROAD.height}
          tabIndex={0}
          role="img"
          aria-label={pick(
            b(
              'Pista: use as setas esquerda e direita ou os botões para mudar de faixa.',
              'Track: use left and right arrows or buttons to switch lanes.',
            ),
          )}
        >
          {pick(
            b(
              'Seu navegador não suporta o jogo em canvas.',
              'Your browser does not support canvas games.',
            ),
          )}
        </canvas>
        {view !== 'running' && (
          <div className="race-overlay" aria-hidden="true">
            <span>{view === 'ready' ? 'READY?' : view === 'paused' ? 'PAUSE' : 'GAME OVER'}</span>
          </div>
        )}
      </div>
      <div className="race-steering" role="group" aria-label={pick(b('Direção', 'Steering'))}>
        <button
          type="button"
          disabled={view !== 'running'}
          onClick={() => move(-1)}
          aria-label={pick(b('Virar à esquerda', 'Steer left'))}
        >
          ←
        </button>
        <span aria-hidden="true">A / D</span>
        <button
          type="button"
          disabled={view !== 'running'}
          onClick={() => move(1)}
          aria-label={pick(b('Virar à direita', 'Steer right'))}
        >
          →
        </button>
      </div>
      <div className="game-controls">
        <span role="status">
          {view === 'ended'
            ? pick(b('Fim de jogo', 'Game over')) + ` · ${hud.distance} m`
            : view === 'paused'
              ? pick(b('Em pausa', 'Paused'))
              : view === 'running'
                ? pick(b('Na pista', 'On the road'))
                : pick(b('Pronto para sair?', 'Ready to go?'))}
        </span>
        <button type="button" className="button button-primary" onClick={active ? pause : start}>
          {view === 'running'
            ? pick(b('Pausar', 'Pause'))
            : view === 'paused'
              ? pick(b('Continuar', 'Resume'))
              : view === 'ended'
                ? pick(b('Jogar de novo', 'Play again'))
                : pick(b('Começar', 'Start'))}
        </button>
      </div>
      <small>
        {pick(
          b(
            '← → ou A / D para dirigir. P pausa. Esc fecha.',
            '← → or A / D to steer. P pauses. Esc closes.',
          ),
        )}
      </small>
    </dialog>
  );
}
