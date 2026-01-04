'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

// Types
interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
}

type TennisPoint = 0 | 15 | 30 | 40;
type GamePhase = 'idle' | 'playing' | 'deuce' | 'advantage-player' | 'advantage-ai' | 'point-scored' | 'game-over';

const TennisGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const gameLoopRef = useRef<boolean>(false);
  
  // Game dimensions (responsive)
  const [dimensions, setDimensions] = useState({ width: 280, height: 380 });
  
  // Game state
  const [playerScore, setPlayerScore] = useState<TennisPoint>(0);
  const [aiScore, setAiScore] = useState<TennisPoint>(0);
  const [gamePhase, setGamePhase] = useState<GamePhase>('idle');
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [rallyCount, setRallyCount] = useState(0);
  
  // Game objects refs
  const ballRef = useRef<Ball>({ x: 140, y: 190, vx: 0, vy: 0, radius: 6 });
  const playerRef = useRef<Player>({ x: 115, y: 320, width: 50, height: 60, frame: 0 });
  const aiRef = useRef<Player>({ x: 115, y: 30, width: 50, height: 60, frame: 0 });
  const playerInputRef = useRef<number>(0);
  const touchStartRef = useRef<number | null>(null);
  const lastHitRef = useRef<'player' | 'ai' | null>(null);
  
  // Tennis scoring
  const getNextPoint = (current: TennisPoint): TennisPoint => {
    if (current === 0) return 15;
    if (current === 15) return 30;
    if (current === 30) return 40;
    return 40;
  };
  
  const handlePointScored = useCallback((scorer: 'player' | 'ai') => {
    setRallyCount(0);
    lastHitRef.current = null;
    
    setGamePhase('point-scored');
    
    setTimeout(() => {
      let isGameOver = false;
      let nextPhase: GamePhase = 'playing';
      
      if (gamePhase === 'playing' || gamePhase === 'point-scored') {
        if (scorer === 'player') {
          const newScore = getNextPoint(playerScore);
          if (playerScore === 40 && aiScore < 40) {
            setGameMessage('You Win!');
            nextPhase = 'game-over';
            isGameOver = true;
          } else if (playerScore === 40 && aiScore === 40) {
            nextPhase = 'advantage-player';
          } else if (newScore === 40 && aiScore === 40) {
            nextPhase = 'deuce';
          } else {
            setPlayerScore(newScore);
            nextPhase = 'playing';
          }
        } else {
          const newScore = getNextPoint(aiScore);
          if (aiScore === 40 && playerScore < 40) {
            setGameMessage('AI Wins!');
            nextPhase = 'game-over';
            isGameOver = true;
          } else if (aiScore === 40 && playerScore === 40) {
            nextPhase = 'advantage-ai';
          } else if (newScore === 40 && playerScore === 40) {
            nextPhase = 'deuce';
          } else {
            setAiScore(newScore);
            nextPhase = 'playing';
          }
        }
      } else if (gamePhase === 'deuce') {
        nextPhase = scorer === 'player' ? 'advantage-player' : 'advantage-ai';
      } else if (gamePhase === 'advantage-player') {
        if (scorer === 'player') {
          setGameMessage('You Win!');
          nextPhase = 'game-over';
          isGameOver = true;
        } else {
          nextPhase = 'deuce';
        }
      } else if (gamePhase === 'advantage-ai') {
        if (scorer === 'ai') {
          setGameMessage('AI Wins!');
          nextPhase = 'game-over';
          isGameOver = true;
        } else {
          nextPhase = 'deuce';
        }
      }
      
      setGamePhase(nextPhase);
      
      if (!isGameOver) {
        // Reset ball position - serve from center
        const ball = ballRef.current;
        ball.x = dimensions.width / 2;
        ball.y = dimensions.height / 2;
        ball.vx = (Math.random() - 0.5) * 2;
        ball.vy = Math.random() > 0.5 ? 4 : -4;
      }
    }, 800);
  }, [gamePhase, playerScore, aiScore, dimensions]);
  
  // Reset game for replay
  const resetGame = () => {
    setPlayerScore(0);
    setAiScore(0);
    setGamePhase('playing');
    setGameMessage(null);
    setRallyCount(0);
    resetBall();
    gameLoopRef.current = true;
  };
  
  const resetBall = useCallback(() => {
    const ball = ballRef.current;
    const { width, height } = dimensions;
    ball.x = width / 2;
    ball.y = height / 2;
    // Serve with slight angle, alternating direction
    ball.vx = (Math.random() - 0.5) * 2;
    ball.vy = Math.random() > 0.5 ? 4 : -4;
  }, [dimensions]);
  
  const startGame = () => {
    if (gamePhase === 'idle') {
      setGamePhase('playing');
      gameLoopRef.current = true;
      resetBall();
      setShowInstructions(false);
    }
  };
  
  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const width = Math.min(containerWidth - 20, 300);
        const height = Math.min(width * 1.35, 400);
        setDimensions({ width, height });
        
        playerRef.current.y = height - 80;
        playerRef.current.x = width / 2 - 25;
        aiRef.current.x = width / 2 - 25;
        ballRef.current.x = width / 2;
        ballRef.current.y = height / 2;
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gamePhase === 'idle' || gamePhase === 'game-over' || gamePhase === 'point-scored') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        playerInputRef.current = -1;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        playerInputRef.current = 1;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
        playerInputRef.current = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gamePhase]);
  
  // Touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (gamePhase === 'idle' || gamePhase === 'game-over' || gamePhase === 'point-scored') return;
      touchStartRef.current = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (touchStartRef.current === null || gamePhase === 'idle' || gamePhase === 'game-over' || gamePhase === 'point-scored') return;
      
      const touchX = e.touches[0].clientX;
      const delta = touchX - touchStartRef.current;
      
      if (delta < -8) playerInputRef.current = -1;
      else if (delta > 8) playerInputRef.current = 1;
      else playerInputRef.current = 0;
      
      touchStartRef.current = touchX;
    };
    
    const handleTouchEnd = () => {
      playerInputRef.current = 0;
      touchStartRef.current = null;
    };
    
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gamePhase]);
  
  // Draw pixel character
  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, isAI: boolean) => {
    const scale = 1.2;
    ctx.save();
    
    if (isAI) {
      // AI - simple robot/android look (green tones)
      // Head
      ctx.fillStyle = '#4a7c59';
      ctx.fillRect(x + 15 * scale, y, 20 * scale, 18 * scale);
      // Eyes
      ctx.fillStyle = '#e5dfdc';
      ctx.fillRect(x + 18 * scale, y + 6 * scale, 4 * scale, 4 * scale);
      ctx.fillRect(x + 28 * scale, y + 6 * scale, 4 * scale, 4 * scale);
      // Body
      ctx.fillStyle = '#4a7c59';
      ctx.fillRect(x + 12 * scale, y + 20 * scale, 26 * scale, 20 * scale);
      // Racket arm
      ctx.fillStyle = '#3d6b4f';
      ctx.fillRect(x + 38 * scale, y + 22 * scale, 12 * scale, 6 * scale);
      // Racket
      ctx.fillStyle = '#e5dfdc';
      ctx.fillRect(x + 42 * scale, y + 12 * scale, 8 * scale, 18 * scale);
      ctx.fillStyle = '#9b6fc7';
      ctx.fillRect(x + 44 * scale, y + 14 * scale, 4 * scale, 14 * scale);
    } else {
      // Player - cat character (orange/warm tones)
      // Head
      ctx.fillStyle = '#e8a849';
      ctx.fillRect(x + 15 * scale, y, 20 * scale, 16 * scale);
      // Ears
      ctx.fillRect(x + 12 * scale, y - 6 * scale, 6 * scale, 8 * scale);
      ctx.fillRect(x + 32 * scale, y - 6 * scale, 6 * scale, 8 * scale);
      // Eyes
      ctx.fillStyle = '#131316';
      ctx.fillRect(x + 18 * scale, y + 6 * scale, 4 * scale, 4 * scale);
      ctx.fillRect(x + 28 * scale, y + 6 * scale, 4 * scale, 4 * scale);
      // Body (shirt)
      ctx.fillStyle = '#5b7bb8';
      ctx.fillRect(x + 12 * scale, y + 18 * scale, 26 * scale, 16 * scale);
      // Shorts
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(x + 14 * scale, y + 34 * scale, 22 * scale, 10 * scale);
      // Racket arm
      ctx.fillStyle = '#e8a849';
      ctx.fillRect(x + 38 * scale, y + 20 * scale, 10 * scale, 6 * scale);
      // Racket
      ctx.fillStyle = '#e5dfdc';
      ctx.fillRect(x + 40 * scale, y + 10 * scale, 8 * scale, 20 * scale);
      ctx.fillStyle = '#9b6fc7';
      ctx.fillRect(x + 42 * scale, y + 12 * scale, 4 * scale, 16 * scale);
    }
    
    ctx.restore();
  };
  
  // Draw static court (for idle state)
  const drawCourt = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const courtColor = '#4a9c5d';
    const lineColor = '#f5f5f5';
    
    ctx.fillStyle = courtColor;
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, width - 16, height - 16);
    
    ctx.fillStyle = '#3d8b4f';
    ctx.fillRect(8, height / 2 - 8, width - 16, 16);
    
    ctx.strokeStyle = '#e5dfdc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    ctx.fillStyle = '#c9a227';
    ctx.fillRect(0, height / 2 - 6, 6, 12);
    ctx.fillRect(width - 6, height / 2 - 6, 6, 12);
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.moveTo(width / 2, 8);
    ctx.lineTo(width / 2, height / 2 - 8);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(8, height / 4);
    ctx.lineTo(width - 8, height / 4);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 + 8);
    ctx.lineTo(width / 2, height - 8);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(8, height * 3 / 4);
    ctx.lineTo(width - 8, height * 3 / 4);
    ctx.stroke();
  }, []);
  
  // Draw static frame for idle state
  useEffect(() => {
    if (gamePhase !== 'idle') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = dimensions;
    drawCourt(ctx, width, height);
    drawPlayer(ctx, aiRef.current.x, aiRef.current.y, true);
    drawPlayer(ctx, playerRef.current.x, playerRef.current.y, false);
  }, [gamePhase, dimensions, drawCourt]);
  
  // Game loop - only runs when playing
  useEffect(() => {
    if (gamePhase === 'idle' || gamePhase === 'game-over') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = dimensions;
    const paddleSpeed = 4;
    let running = true;
    
    const gameLoop = () => {
      if (!running) return;
      
      const ball = ballRef.current;
      const player = playerRef.current;
      const ai = aiRef.current;
      
      drawCourt(ctx, width, height);
      
      // Update player position
      player.x += playerInputRef.current * paddleSpeed;
      player.x = Math.max(8, Math.min(width - 58, player.x));
      
      // Update AI position
      const aiTargetX = ball.x - 25;
      const aiSpeed = 2.5 + Math.min(rallyCount * 0.15, 2.5);
      
      if (ball.vy < 0 && ball.y < height * 0.5) {
        if (ai.x < aiTargetX - 8) ai.x += aiSpeed;
        else if (ai.x > aiTargetX + 8) ai.x -= aiSpeed;
      }
      ai.x = Math.max(8, Math.min(width - 58, ai.x));
      
      // Update ball (during active play phases)
      const isActivePlaying = gamePhase === 'playing' || gamePhase === 'deuce' || 
                              gamePhase === 'advantage-player' || gamePhase === 'advantage-ai';
      if (isActivePlaying) {
        const speedMult = 1 + rallyCount * 0.015;
        
        // Apply movement
        ball.x += ball.vx * speedMult;
        ball.y += ball.vy * speedMult;
        
        // Sideline boundaries - ball goes OUT (no bounce off walls)
        const leftBound = 20;
        const rightBound = width - 20;
        
        if (ball.x - ball.radius < leftBound || ball.x + ball.radius > rightBound) {
          // Ball went out of bounds - whoever hit it last loses the point
          if (lastHitRef.current === 'player') {
            handlePointScored('ai'); // Player hit it out
          } else if (lastHitRef.current === 'ai') {
            handlePointScored('player'); // AI hit it out
          } else {
            // Serve went out - server loses
            handlePointScored(ball.vy > 0 ? 'player' : 'ai');
          }
          return;
        }
        
        // Player hit zone (racket) - more forgiving hitbox
        const playerHitY = player.y + 15;
        if (ball.vy > 0 &&
            ball.y + ball.radius >= playerHitY &&
            ball.y - ball.radius <= playerHitY + 25 &&
            ball.x >= player.x + 5 &&
            ball.x <= player.x + 45) {
          // Hit the ball back up towards AI
          ball.vy = -4.5 - Math.random() * 1.5;
          ball.y = playerHitY - ball.radius - 1;
          // Add angle based on where ball hits paddle
          const hitPos = (ball.x - player.x - 25) / 25;
          ball.vx = hitPos * 3;
          lastHitRef.current = 'player';
          setRallyCount(r => r + 1);
        }
        
        // AI hit zone (racket) - more forgiving hitbox
        const aiHitY = ai.y + 45;
        if (ball.vy < 0 &&
            ball.y - ball.radius <= aiHitY &&
            ball.y + ball.radius >= aiHitY - 25 &&
            ball.x >= ai.x + 5 &&
            ball.x <= ai.x + 45) {
          // Hit the ball back down towards player
          ball.vy = 4.5 + Math.random() * 1.5;
          ball.y = aiHitY + ball.radius + 1;
          // Add angle based on where ball hits paddle
          const hitPos = (ball.x - ai.x - 25) / 25;
          ball.vx = hitPos * 3;
          lastHitRef.current = 'ai';
          setRallyCount(r => r + 1);
        }
        
        // Ball past player baseline (AI scores - player missed)
        if (ball.y > height + 10) {
          handlePointScored('ai');
          return;
        }
        
        // Ball past AI baseline (player scores - AI missed)
        if (ball.y < -10) {
          handlePointScored('player');
          return;
        }
      }
      
      drawPlayer(ctx, ai.x, ai.y, true);
      drawPlayer(ctx, player.x, player.y, false);
      
      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#c8e550';
      ctx.fill();
      ctx.strokeStyle = '#a5c43c';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
    
    return () => {
      running = false;
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, gamePhase, handlePointScored, rallyCount, drawCourt]);
  
  // Score display
  const getScoreDisplay = () => {
    if (gameMessage) return gameMessage;
    if (gamePhase === 'deuce') return 'Deuce';
    if (gamePhase === 'advantage-player') return 'Ad — 40';
    if (gamePhase === 'advantage-ai') return '40 — Ad';
    return `${playerScore} — ${aiScore}`;
  };
  
  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto"
      style={{ touchAction: 'none' }}
    >
      {/* Score */}
      <div 
        className="px-4 py-2 rounded-lg text-center"
        style={{ 
          backgroundColor: '#212127',
          border: '1px solid #3a3a42',
        }}
      >
        <p 
          className="text-base font-bold tracking-widest"
          style={{ 
            color: gameMessage ? '#9b6fc7' : '#e5dfdc',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {gamePhase === 'idle' ? 'TENNIS' : getScoreDisplay()}
        </p>
      </div>
      
      {/* Game container */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="rounded-lg"
          style={{ 
            maxWidth: '100%',
            touchAction: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        />
        
        {/* Play button overlay */}
        {gamePhase === 'idle' && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
            style={{ backgroundColor: 'rgba(19, 19, 22, 0.85)' }}
          >
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#9b6fc7',
                color: '#131316',
                boxShadow: '0 4px 15px rgba(155, 111, 199, 0.4)',
              }}
            >
              Play
            </button>
            <p 
              className="mt-4 text-xs text-center px-4"
              style={{ color: '#7a7a85' }}
            >
              {showInstructions && 'Use ← → or A / D • Drag on mobile'}
            </p>
          </div>
        )}
        
        {/* Game over overlay */}
        {gamePhase === 'game-over' && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center rounded-lg"
            style={{ backgroundColor: 'rgba(19, 19, 22, 0.9)' }}
          >
            <p 
              className="text-2xl font-bold mb-6"
              style={{ color: '#9b6fc7' }}
            >
              {gameMessage}
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2 rounded-full text-base font-bold transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#9b6fc7',
                color: '#131316',
                boxShadow: '0 4px 15px rgba(155, 111, 199, 0.4)',
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TennisGame;

