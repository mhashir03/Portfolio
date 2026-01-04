'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Chess, Square, PieceSymbol, Color } from 'chess.js';

// Piece values for evaluation
const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Position bonuses for pieces (simplified)
const PAWN_TABLE = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5,  5, 10, 25, 25, 10,  5,  5,
  0,  0,  0, 20, 20,  0,  0,  0,
  5, -5,-10,  0,  0,-10, -5,  5,
  5, 10, 10,-20,-20, 10, 10,  5,
  0,  0,  0,  0,  0,  0,  0,  0
];

const KNIGHT_TABLE = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50
];

const BISHOP_TABLE = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20
];

const ROOK_TABLE = [
  0,  0,  0,  0,  0,  0,  0,  0,
  5, 10, 10, 10, 10, 10, 10,  5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  -5,  0,  0,  0,  0,  0,  0, -5,
  0,  0,  0,  5,  5,  0,  0,  0
];

const QUEEN_TABLE = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
  -5,  0,  5,  5,  5,  5,  0, -5,
  0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20
];

const KING_TABLE = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
  20, 20,  0,  0,  0,  0, 20, 20,
  20, 30, 10,  0,  0, 10, 30, 20
];

const PIECE_TABLES: Record<PieceSymbol, number[]> = {
  p: PAWN_TABLE,
  n: KNIGHT_TABLE,
  b: BISHOP_TABLE,
  r: ROOK_TABLE,
  q: QUEEN_TABLE,
  k: KING_TABLE,
};

// Chess piece SVG components for clear black/white distinction
const PieceSVG: React.FC<{ type: PieceSymbol; color: Color }> = ({ type, color }) => {
  const isWhite = color === 'w';
  const fill = isWhite ? '#FFFFFF' : '#1a1a1a';
  const stroke = isWhite ? '#1a1a1a' : '#FFFFFF';
  const strokeWidth = isWhite ? '1.5' : '1';
  
  const pieces: Record<PieceSymbol, React.ReactElement> = {
    k: (
      <svg viewBox="0 0 45 45" className="w-7 h-7 sm:w-8 sm:h-8">
        <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.5 11.63V6M20 8h5" strokeWidth="1.5"/>
          <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" strokeLinecap="butt"/>
          <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z"/>
          <path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0"/>
        </g>
      </svg>
    ),
    q: (
      <svg viewBox="0 0 45 45" className="w-7 h-7 sm:w-8 sm:h-8">
        <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="12" r="2.75"/>
          <circle cx="14" cy="9" r="2.75"/>
          <circle cx="22.5" cy="8" r="2.75"/>
          <circle cx="31" cy="9" r="2.75"/>
          <circle cx="39" cy="12" r="2.75"/>
          <path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z" strokeLinecap="butt"/>
          <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" strokeLinecap="butt"/>
          <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/>
        </g>
      </svg>
    ),
    r: (
      <svg viewBox="0 0 45 45" className="w-7 h-7 sm:w-8 sm:h-8">
        <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt"/>
          <path d="M34 14l-3 3H14l-3-3"/>
          <path d="M31 17v12.5H14V17" strokeLinecap="butt" strokeLinejoin="miter"/>
          <path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/>
          <path d="M11 14h23" fill="none" strokeLinejoin="miter"/>
        </g>
      </svg>
    ),
    b: (
      <svg viewBox="0 0 45 45" className="w-7 h-7 sm:w-8 sm:h-8">
        <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <g strokeLinecap="butt">
            <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z"/>
            <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/>
            <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/>
          </g>
          <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" fill="none" stroke={stroke}/>
        </g>
      </svg>
    ),
    n: (
      <svg viewBox="0 0 45 45" className="w-7 h-7 sm:w-8 sm:h-8">
        <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/>
          <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/>
          <circle cx="9.5" cy="25.5" r="0.5" fill={stroke} stroke="none"/>
          <path d="M15 15.5s.5 1.5-.5 2.5c-.5.5-1.5 0-1.5 0" fill="none"/>
        </g>
      </svg>
    ),
    p: (
      <svg viewBox="0 0 45 45" className="w-7 h-7 sm:w-8 sm:h-8">
        <path 
          d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" 
          fill={fill} 
          stroke={stroke} 
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    ),
  };
  
  return pieces[type];
};

const MiniChess: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [validMoves, setValidMoves] = useState<Square[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [playerColor, setPlayerColor] = useState<Color | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Get position index for piece-square tables
  const getPositionIndex = (square: Square, color: Color): number => {
    const file = square.charCodeAt(0) - 97;
    const rank = parseInt(square[1]) - 1;
    const index = color === 'w' ? (7 - rank) * 8 + file : rank * 8 + file;
    return index;
  };

  // Evaluate the board position
  const evaluateBoard = useCallback((chess: Chess): number => {
    if (chess.isCheckmate()) {
      return chess.turn() === 'w' ? -Infinity : Infinity;
    }
    if (chess.isDraw()) {
      return 0;
    }

    let score = 0;
    const board = chess.board();

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece) {
          const square = String.fromCharCode(97 + col) + (8 - row) as Square;
          const posIndex = getPositionIndex(square, piece.color);
          const pieceValue = PIECE_VALUES[piece.type];
          const positionBonus = PIECE_TABLES[piece.type][posIndex];
          
          if (piece.color === 'w') {
            score += pieceValue + positionBonus;
          } else {
            score -= pieceValue + positionBonus;
          }
        }
      }
    }

    return score;
  }, []);

  // Minimax with alpha-beta pruning
  const minimax = useCallback((
    chess: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean
  ): number => {
    if (depth === 0 || chess.isGameOver()) {
      return evaluateBoard(chess);
    }

    const moves = chess.moves();
    
    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of moves) {
        chess.move(move);
        const evalScore = minimax(chess, depth - 1, alpha, beta, false);
        chess.undo();
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        chess.move(move);
        const evalScore = minimax(chess, depth - 1, alpha, beta, true);
        chess.undo();
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [evaluateBoard]);

  // Find best move for AI
  const findBestMove = useCallback((chess: Chess, aiColor: Color): string | null => {
    const moves = chess.moves();
    if (moves.length === 0) return null;

    const shouldBlunder = Math.random() < 0.15;
    const isAIMaximizing = aiColor === 'w';
    
    if (shouldBlunder && moves.length > 1) {
      const moveEvals: { move: string; eval: number }[] = [];
      for (const move of moves) {
        chess.move(move);
        const evalScore = evaluateBoard(chess);
        chess.undo();
        moveEvals.push({ move, eval: evalScore });
      }
      moveEvals.sort((a, b) => isAIMaximizing ? b.eval - a.eval : a.eval - b.eval);
      const topHalf = moveEvals.slice(0, Math.ceil(moveEvals.length / 2));
      return topHalf[Math.floor(Math.random() * topHalf.length)].move;
    }

    let bestMove = moves[0];
    let bestEval = isAIMaximizing ? -Infinity : Infinity;
    const depth = 3;

    for (const move of moves) {
      chess.move(move);
      const evalScore = minimax(chess, depth - 1, -Infinity, Infinity, !isAIMaximizing);
      chess.undo();

      if (isAIMaximizing ? evalScore > bestEval : evalScore < bestEval) {
        bestEval = evalScore;
        bestMove = move;
      }
    }

    return bestMove;
  }, [evaluateBoard, minimax]);

  // Update game status
  const updateGameStatus = useCallback(() => {
    if (!playerColor) return;
    
    const aiColor = playerColor === 'w' ? 'b' : 'w';
    
    if (game.isCheckmate()) {
      const loser = game.turn();
      if (loser === playerColor) {
        setGameStatus('Checkmate! I win! 😎');
      } else {
        setGameStatus('Checkmate! You win! 🎉');
      }
    } else if (game.isDraw()) {
      if (game.isStalemate()) {
        setGameStatus('Stalemate! Draw.');
      } else if (game.isThreefoldRepetition()) {
        setGameStatus('Draw by repetition.');
      } else if (game.isInsufficientMaterial()) {
        setGameStatus('Draw - insufficient material.');
      } else {
        setGameStatus('Draw!');
      }
    } else if (game.isCheck()) {
      setGameStatus(game.turn() === playerColor ? 'Check! Your move.' : 'Check!');
    } else {
      setGameStatus(game.turn() === playerColor ? 'Your move' : 'My turn...');
    }
  }, [game, playerColor]);

  // Make AI move
  const makeAIMove = useCallback(() => {
    if (!playerColor) return;
    
    const aiColor = playerColor === 'w' ? 'b' : 'w';
    if (game.turn() !== aiColor || game.isGameOver()) return;

    setIsThinking(true);
    setGameStatus('Thinking...');

    setTimeout(() => {
      const gameCopy = new Chess(game.fen());
      const move = findBestMove(gameCopy, aiColor);
      
      if (move) {
        const result = game.move(move);
        if (result) {
          setLastMove({ from: result.from as Square, to: result.to as Square });
          setGame(new Chess(game.fen()));
        }
      }
      
      setIsThinking(false);
      updateGameStatus();
    }, 300);
  }, [game, playerColor, findBestMove, updateGameStatus]);

  // Handle AI moves
  useEffect(() => {
    if (!playerColor || !gameStarted) return;
    
    const aiColor = playerColor === 'w' ? 'b' : 'w';
    if (game.turn() === aiColor && !game.isGameOver()) {
      const timeout = setTimeout(makeAIMove, 500);
      return () => clearTimeout(timeout);
    }
  }, [game, playerColor, gameStarted, makeAIMove]);

  // Update status when game changes
  useEffect(() => {
    if (gameStarted) {
      updateGameStatus();
    }
  }, [game, gameStarted, updateGameStatus]);

  // Start game with color choice
  const startGame = (color: Color) => {
    setPlayerColor(color);
    setGameStarted(true);
    setGame(new Chess());
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(null);
    setGameStatus(color === 'w' ? 'Your move' : 'My turn...');
  };

  // Handle square click
  const handleSquareClick = (square: Square) => {
    if (!playerColor || isThinking || game.turn() !== playerColor || game.isGameOver()) return;

    const piece = game.get(square);

    if (piece && piece.color === playerColor) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      setValidMoves(moves.map(m => m.to as Square));
      return;
    }

    if (selectedSquare && validMoves.includes(square)) {
      const move = game.move({
        from: selectedSquare,
        to: square,
        promotion: 'q',
      });

      if (move) {
        setLastMove({ from: selectedSquare, to: square });
        setGame(new Chess(game.fen()));
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else {
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  // Reset game
  const resetGame = () => {
    setGame(new Chess());
    setSelectedSquare(null);
    setValidMoves([]);
    setIsThinking(false);
    setLastMove(null);
    setPlayerColor(null);
    setGameStarted(false);
    setGameStatus('');
  };

  // Render the board
  const renderBoard = () => {
    const board = game.board();
    const squares: JSX.Element[] = [];
    const isFlipped = playerColor === 'b';

    for (let displayRow = 0; displayRow < 8; displayRow++) {
      for (let displayCol = 0; displayCol < 8; displayCol++) {
        const row = isFlipped ? 7 - displayRow : displayRow;
        const col = isFlipped ? 7 - displayCol : displayCol;
        
        const square = (String.fromCharCode(97 + col) + (8 - row)) as Square;
        const piece = board[row][col];
        const isLight = (row + col) % 2 === 0;
        const isSelected = selectedSquare === square;
        const isValidMove = validMoves.includes(square);
        const isLastMoveSquare = lastMove && (lastMove.from === square || lastMove.to === square);
        const isCheck = game.isCheck() && piece?.type === 'k' && piece.color === game.turn();

        // Show coordinates
        const showFile = displayRow === 7;
        const showRank = displayCol === 0;
        const fileLabel = String.fromCharCode(97 + col);
        const rankLabel = String(8 - row);

        let bgClass = isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
        if (isSelected) bgClass = 'bg-[#829769]';
        else if (isLastMoveSquare) bgClass = isLight ? 'bg-[#cdd26a]' : 'bg-[#aaa23a]';
        else if (isCheck) bgClass = 'bg-red-500';

        squares.push(
          <div
            key={square}
            onClick={() => handleSquareClick(square)}
            className={`
              relative aspect-square flex items-center justify-center cursor-pointer
              ${bgClass}
              ${isValidMove ? 'ring-2 ring-inset ring-[#829769]' : ''}
              transition-colors duration-150
            `}
          >
            {/* Rank labels (1-8) on left edge */}
            {showRank && (
              <span className={`absolute top-0.5 left-1 text-[10px] font-semibold ${isLight ? 'text-[#b58863]' : 'text-[#f0d9b5]'}`}>
                {rankLabel}
              </span>
            )}
            {/* File labels (a-h) on bottom edge */}
            {showFile && (
              <span className={`absolute bottom-0 right-1 text-[10px] font-semibold ${isLight ? 'text-[#b58863]' : 'text-[#f0d9b5]'}`}>
                {fileLabel}
              </span>
            )}
            
            {piece && (
              <div className="flex items-center justify-center">
                <PieceSVG type={piece.type} color={piece.color} />
              </div>
            )}
            {isValidMove && !piece && (
              <div className="absolute w-3 h-3 rounded-full bg-[#829769] opacity-80" />
            )}
            {isValidMove && piece && (
              <div className="absolute inset-0 ring-[6px] ring-inset ring-[#829769] opacity-80 rounded-sm" />
            )}
          </div>
        );
      }
    }

    return squares;
  };

  // Color selection screen
  if (!gameStarted) {
    return (
      <div className="mini-chess-container">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-[--color-text-primary] mb-4">
            ♟️ Challenge Hashir
          </h3>
          <p className="text-xs text-[--color-text-secondary] mb-4">
            Choose your side
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startGame('w')}
              className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg bg-white border-2 border-gray-300 hover:border-[--color-accent] transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <PieceSVG type="k" color="w" />
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-[--color-accent]">White</span>
            </button>
            <button
              onClick={() => startGame('b')}
              className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 hover:border-[--color-accent] transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <PieceSVG type="k" color="b" />
              </div>
              <span className="text-xs font-medium text-gray-200 group-hover:text-[--color-accent]">Black</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mini-chess-container">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[--color-text-primary]">
          ♟️ vs Hashir
        </h3>
        <button
          onClick={resetGame}
          className="text-xs px-2 py-1 rounded bg-[--color-bg-elevated] border border-[--color-border] text-[--color-text-muted] hover:text-[--color-text-primary] hover:border-[--color-text-muted] transition-colors"
        >
          New Game
        </button>
      </div>
      
      <div className="grid grid-cols-8 gap-0 border-2 border-[#8b7355] rounded overflow-hidden shadow-lg" style={{ width: 'fit-content' }}>
        {renderBoard()}
      </div>
      
      <div className="mt-3 text-center">
        <p className={`text-sm ${isThinking ? 'text-[--color-accent]' : 'text-[--color-text-secondary]'}`}>
          {gameStatus}
        </p>
        {game.isGameOver() && (
          <button
            onClick={resetGame}
            className="mt-2 text-xs px-3 py-1 rounded-full bg-[--color-accent] text-white hover:opacity-90 transition-opacity"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default MiniChess;
