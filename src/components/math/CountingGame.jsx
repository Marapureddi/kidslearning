import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { countingQuestions } from '../../data/math/counting'
import QuizComplete from '../shared/QuizComplete'
import './MathGames.css'

export default function CountingGame() {
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)

  const q = countingQuestions[qIndex]

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
    if (qIndex + 1 >= countingQuestions.length) {
      setDone(true)
    } else {
      setQIndex(i => i + 1)
      setSelected(null)
      setIsCorrect(null)
      setWrongAnswers([])
    }
  }

  const handleReset = () => {
    setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false)
  }

  if (done) return <QuizComplete score={score} total={countingQuestions.length} onReset={handleReset} />

  return (
    <div className="math-game">
      <h2 className="math-title">Counting Fun 🐾</h2>
      <div className="math-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((qIndex + 1) / countingQuestions.length) * 100}%` }} />
        </div>
        <span className="progress-text">{qIndex + 1} / {countingQuestions.length}</span>
      </div>

      <p className="math-prompt">How many {q.emoji} do you see?</p>

      <div className="emoji-group">
        {[...Array(q.count)].map((_, i) => (
          <motion.span
            key={i}
            className="emoji-item"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
          >
            {q.emoji}
          </motion.span>
        ))}
      </div>

      <div className="math-options">
        {q.options.map(opt => (
          <motion.button
            key={opt}
            className={`math-option ${selected === opt && isCorrect ? 'correct' : ''} ${selected === opt && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt) ? 'dimmed' : ''}`}
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
        <motion.button className="math-next" onClick={handleNext} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          Next →
        </motion.button>
      )}
    </div>
  )
}
