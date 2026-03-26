import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { memoryCardSets } from '../../data/puzzles/memoryCards'
import './PuzzleGames.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createDeck() {
  const pairs = memoryCardSets.slice(0, 6)
  const cards = pairs.flatMap((p, i) => [
    { id: i * 2, emoji: p.emoji, pairId: i },
    { id: i * 2 + 1, emoji: p.emoji, pairId: i },
  ])
  return shuffle(cards)
}

export default function MemoryCards() {
  const [cards, setCards] = useState(createDeck)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)

  const flipTimeoutRef = useRef(null)
  const isComplete = matched.length === cards.length

  const handleFlip = (index) => {
    if (flipped.length >= 2 || flipped.includes(index) || matched.includes(index)) return
    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped
      setMoves(m => m + 1)
      if (cards[a].pairId === cards[b].pairId) {
        const newMatched = [...matched, a, b]
        setMatched(newMatched)
        setFlipped([])
        if (newMatched.length === cards.length) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
        }
      } else {
        clearTimeout(flipTimeoutRef.current)
        flipTimeoutRef.current = setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  const handleReset = () => {
    setCards(createDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
  }

  return (
    <div className="puzzle-game">
      <h2 className="puzzle-title">Memory Cards 🃏</h2>
      <p className="puzzle-info">Moves: {moves} | Pairs found: {matched.length / 2} / {cards.length / 2}</p>

      <div className="memory-grid">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i)
          return (
            <motion.button
              key={card.id}
              className={`memory-card ${isFlipped ? 'flipped' : ''} ${matched.includes(i) ? 'matched' : ''}`}
              onClick={() => handleFlip(i)}
              whileHover={!isFlipped ? { scale: 1.05 } : {}}
              whileTap={!isFlipped ? { scale: 0.95 } : {}}
            >
              <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {isComplete && (
        <motion.div className="puzzle-complete" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <h3>You found all pairs! ⭐</h3>
          <p>Completed in {moves} moves</p>
          <button className="puzzle-reset" onClick={handleReset}>Play Again</button>
        </motion.div>
      )}

      {!isComplete && (
        <button className="puzzle-reset" onClick={handleReset}>Restart</button>
      )}
    </div>
  )
}
