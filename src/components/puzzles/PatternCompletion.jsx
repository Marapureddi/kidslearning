import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { patternQuestions } from '../../data/puzzles/patterns'
import QuizComplete from '../shared/QuizComplete'
import './PuzzleGames.css'

export default function PatternCompletion() {
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)

  const q = patternQuestions[qIndex]

  const handleSelect = (val) => {
    if (isCorrect) return
    setSelected(val)
    if (val === q.correctAnswer) {
      setIsCorrect(true)
      setScore(s => s + 1)
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } })
    } else {
      setIsCorrect(false)
      setWrongAnswers(prev => [...prev, val])
      setTimeout(() => { setSelected(null); setIsCorrect(null) }, 800)
    }
  }

  const handleNext = () => {
    if (qIndex + 1 >= patternQuestions.length) { setDone(true) }
    else { setQIndex(i => i + 1); setSelected(null); setIsCorrect(null); setWrongAnswers([]) }
  }

  const handleReset = () => {
    setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false)
  }

  if (done) return <QuizComplete score={score} total={patternQuestions.length} onReset={handleReset} />

  return (
    <div className="puzzle-game">
      <h2 className="puzzle-title">Pattern Finder 🔁</h2>
      <div className="puzzle-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((qIndex + 1) / patternQuestions.length) * 100}%` }} />
        </div>
        <span className="progress-text">{qIndex + 1} / {patternQuestions.length}</span>
      </div>

      <p className="puzzle-info" style={{ fontSize: 22, color: 'var(--text)' }}>What comes next?</p>

      <div className="pattern-display">
        {q.pattern.map((item, i) => (
          <motion.span
            key={i}
            className="pattern-item"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {item}
          </motion.span>
        ))}
        <div className={`pattern-blank ${isCorrect ? 'filled' : ''}`}>
          {isCorrect ? q.correctAnswer : '?'}
        </div>
      </div>

      <div className="puzzle-options">
        {q.options.map(opt => (
          <motion.button
            key={opt}
            className={`puzzle-option ${selected === opt && isCorrect ? 'correct' : ''} ${selected === opt && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt) ? 'dimmed' : ''}`}
            onClick={() => handleSelect(opt)}
            disabled={isCorrect}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {opt}
          </motion.button>
        ))}
      </div>

      {isCorrect && (
        <motion.button className="puzzle-next" onClick={handleNext} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          Next →
        </motion.button>
      )}
    </div>
  )
}
