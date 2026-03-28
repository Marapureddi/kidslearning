import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { matchingPairSets } from '../../data/puzzles/matching'
import './PuzzleGames.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MatchingPairs() {
  const [setIndex, setSetIndex] = useState(null)

  if (setIndex === null) {
    return (
      <div className="puzzle-game">
        <h2 className="puzzle-title">Matching Pairs 🔗</h2>
        <p className="puzzle-info">Pick a category!</p>
        <div className="set-picker">
          {matchingPairSets.map((s, i) => (
            <motion.button
              key={s.name}
              className="set-card"
              onClick={() => setSetIndex(i)}
              whileHover={{ scale: 1.05, y: -3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="set-emoji">{s.emoji}</span>
              <span className="set-name">{s.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  return <MatchingGame pairSet={matchingPairSets[setIndex]} onBack={() => setSetIndex(null)} />
}

function MatchingGame({ pairSet, onBack }) {
  const pairs = pairSet.pairs
  const shuffledRight = useMemo(() => shuffle(pairs.map((p, i) => ({ ...p.right, pairIndex: i }))), [pairs])
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matched, setMatched] = useState([])
  const [wrongPair, setWrongPair] = useState(null)

  const isComplete = matched.length === pairs.length

  const handleLeftClick = (index) => {
    if (matched.includes(index)) return
    setSelectedLeft(index)
    setWrongPair(null)

    if (selectedRight !== null) {
      checkMatch(index, selectedRight)
    }
  }

  const handleRightClick = (index) => {
    const pair = shuffledRight[index]
    if (matched.includes(pair.pairIndex)) return
    setSelectedRight(index)
    setWrongPair(null)

    if (selectedLeft !== null) {
      checkMatch(selectedLeft, index)
    }
  }

  const checkMatch = (leftIdx, rightIdx) => {
    const rightPair = shuffledRight[rightIdx]
    if (leftIdx === rightPair.pairIndex) {
      setMatched(prev => [...prev, leftIdx])
      setSelectedLeft(null)
      setSelectedRight(null)
      if (matched.length + 1 === pairs.length) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
      }
    } else {
      setWrongPair({ left: leftIdx, right: rightIdx })
      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
        setWrongPair(null)
      }, 800)
    }
  }

  const handleReset = () => {
    setSelectedLeft(null)
    setSelectedRight(null)
    setMatched([])
    setWrongPair(null)
  }

  return (
    <div className="puzzle-game">
      <button className="set-back" onClick={onBack}>← Choose Category</button>
      <h2 className="puzzle-title">Matching Pairs 🔗 — {pairSet.name}</h2>
      <p className="puzzle-info">Match the pairs!</p>

      <div className="matching-container">
        <div className="matching-column">
          {pairs.map((pair, i) => (
            <motion.button
              key={i}
              className={`match-item ${selectedLeft === i ? 'selected' : ''} ${matched.includes(i) ? 'matched' : ''} ${wrongPair?.left === i ? 'wrong shake' : ''}`}
              onClick={() => handleLeftClick(i)}
              whileHover={{ scale: matched.includes(i) ? 1 : 1.05 }}
            >
              <span className="match-emoji">{pair.left.emoji}</span>
              {pair.left.label}
            </motion.button>
          ))}
        </div>

        <div className="matching-column">
          {shuffledRight.map((item, i) => (
            <motion.button
              key={i}
              className={`match-item ${selectedRight === i ? 'selected' : ''} ${matched.includes(item.pairIndex) ? 'matched' : ''} ${wrongPair?.right === i ? 'wrong shake' : ''}`}
              onClick={() => handleRightClick(i)}
              whileHover={{ scale: matched.includes(item.pairIndex) ? 1 : 1.05 }}
            >
              <span className="match-emoji">{item.emoji}</span>
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>

      {isComplete && (
        <motion.div className="puzzle-complete" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <h3>All matched! ⭐</h3>
          <button className="puzzle-reset" onClick={handleReset}>Play Again</button>
        </motion.div>
      )}
    </div>
  )
}
