import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { jigsawPuzzles } from '../../data/puzzles/jigsaw'
import './PuzzleGames.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function JigsawPuzzle() {
  const [puzzleIndex, setPuzzleIndex] = useState(null)
  const [board, setBoard] = useState([])
  const [scrambled, setScrambled] = useState([])
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [placedCount, setPlacedCount] = useState(0)
  const [showHint, setShowHint] = useState(true)

  const puzzle = puzzleIndex !== null ? jigsawPuzzles[puzzleIndex] : null

  const startPuzzle = (idx) => {
    const p = jigsawPuzzles[idx]
    const total = p.rows * p.cols
    const indices = Array.from({ length: total }, (_, i) => i)
    setPuzzleIndex(idx)
    setBoard(Array(total).fill(null))
    setScrambled(shuffle(indices))
    setSelectedPiece(null)
    setPlacedCount(0)
    setShowHint(true)
  }

  if (puzzleIndex === null) {
    return (
      <div className="puzzle-game">
        <h2 className="puzzle-title">Jigsaw Puzzle 🧩</h2>
        <p className="puzzle-info">Pick a puzzle to solve!</p>
        <div className="set-picker">
          {jigsawPuzzles.map((p, i) => (
            <motion.button
              key={p.name}
              className="set-card"
              onClick={() => startPuzzle(i)}
              whileHover={{ scale: 1.05, y: -3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="set-emoji">{p.emoji}</span>
              <span className="set-name">{p.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  const total = puzzle.rows * puzzle.cols
  const isComplete = placedCount === total

  // Get CSS background-position for a piece index
  const getPieceStyle = (pieceIdx) => {
    const col = pieceIdx % puzzle.cols
    const row = Math.floor(pieceIdx / puzzle.cols)
    const bgPosX = (col / (puzzle.cols - 1)) * 100
    const bgPosY = (row / (puzzle.rows - 1)) * 100
    return {
      backgroundImage: `url("${puzzle.image}")`,
      backgroundSize: `${puzzle.cols * 100}% ${puzzle.rows * 100}%`,
      backgroundPosition: `${bgPosX}% ${bgPosY}%`,
    }
  }

  const handlePieceTap = (pieceIdx) => {
    if (board.includes(pieceIdx)) return
    setSelectedPiece(selectedPiece === pieceIdx ? null : pieceIdx)
  }

  const handleCellTap = (cellIdx) => {
    if (board[cellIdx] !== null) return
    if (selectedPiece === null) return

    // The piece index must match the cell index (correct position)
    if (selectedPiece === cellIdx) {
      const newBoard = [...board]
      newBoard[cellIdx] = selectedPiece

      const newCount = placedCount + 1
      setBoard(newBoard)
      setPlacedCount(newCount)
      setSelectedPiece(null)

      if (newCount === total) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } })
      }
    } else {
      setSelectedPiece(null)
    }
  }

  return (
    <div className="puzzle-game">
      <button className="set-back" onClick={() => setPuzzleIndex(null)}>← Choose Puzzle</button>
      <h2 className="puzzle-title">🧩 {puzzle.name}</h2>

      {/* Reference image */}
      <div className="jigsaw-section">
        <div className="jigsaw-ref-header">
          <span className="jigsaw-ref-label">Complete Picture</span>
          <button className="jigsaw-hint-toggle" onClick={() => setShowHint(!showHint)}>
            {showHint ? '🙈 Hide Hint' : '👀 Show Hint'}
          </button>
        </div>
        {showHint && (
          <motion.div
            className="jigsaw-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img src={puzzle.image} alt={puzzle.name} className="jigsaw-preview-img" />
          </motion.div>
        )}
      </div>

      <div className="jigsaw-divider">
        <span>⬇️ Place the pieces to match the picture ⬇️</span>
      </div>

      {/* Board */}
      <div className="jigsaw-section">
        <p className="puzzle-info">Placed: {placedCount} / {total}</p>
        <div
          className="jigsaw-img-board"
          style={{ gridTemplateColumns: `repeat(${puzzle.cols}, 1fr)` }}
        >
          {board.map((cell, i) => (
            <motion.div
              key={i}
              className={`jigsaw-img-cell ${cell !== null ? 'filled' : 'empty'} ${selectedPiece !== null && cell === null ? 'ready' : ''}`}
              onClick={() => handleCellTap(i)}
              style={cell !== null ? getPieceStyle(cell) : {}}
              whileTap={cell === null ? { scale: 0.9 } : {}}
            />
          ))}
        </div>
      </div>

      {/* Pieces tray */}
      {!isComplete && (
        <div className="jigsaw-section">
          <p className="puzzle-info">
            {selectedPiece !== null
              ? '👆 Now tap the correct spot on the board!'
              : '👇 Tap a piece to pick it up'}
          </p>
          <div className="jigsaw-img-tray">
            {scrambled.map((pieceIdx) => {
              const isUsed = board.includes(pieceIdx)
              return (
                <motion.button
                  key={pieceIdx}
                  className={`jigsaw-img-piece ${isUsed ? 'used' : ''} ${selectedPiece === pieceIdx ? 'active' : ''}`}
                  onClick={() => handlePieceTap(pieceIdx)}
                  style={!isUsed ? getPieceStyle(pieceIdx) : {}}
                  whileHover={!isUsed ? { scale: 1.15 } : {}}
                  whileTap={!isUsed ? { scale: 0.9 } : {}}
                />
              )
            })}
          </div>
        </div>
      )}

      {isComplete && (
        <motion.div className="puzzle-complete" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <h3>Puzzle Complete! ⭐</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="puzzle-reset" onClick={() => startPuzzle(puzzleIndex)}>Play Again</button>
            <button className="puzzle-reset" onClick={() => setPuzzleIndex(null)}>More Puzzles</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
