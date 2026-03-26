import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { numberQuestions } from '../../data/math/numbers'
import QuizComplete from '../shared/QuizComplete'
import './MathGames.css'

export default function NumberRecognition() {
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)

  const q = numberQuestions[qIndex]

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
    if (qIndex + 1 >= numberQuestions.length) { setDone(true) }
    else { setQIndex(i => i + 1); setSelected(null); setIsCorrect(null); setWrongAnswers([]) }
  }

  const handleReset = () => {
    setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false)
  }

  if (done) return <QuizComplete score={score} total={numberQuestions.length} onReset={handleReset} />

  return (
    <div className="math-game">
      <h2 className="math-title">Number Match 🔢</h2>
      <div className="math-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((qIndex + 1) / numberQuestions.length) * 100}%` }} />
        </div>
        <span className="progress-text">{qIndex + 1} / {numberQuestions.length}</span>
      </div>

      <p className="math-prompt">Which group has this many?</p>
      <div className="number-big">{q.number}</div>

      <div className="math-options" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {q.options.map(opt => (
          <motion.button
            key={opt}
            className={`math-option ${selected === opt && isCorrect ? 'correct' : ''} ${selected === opt && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt) ? 'dimmed' : ''}`}
            onClick={() => handleSelect(opt)}
            disabled={isCorrect}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="number-option-inner">
              {[...Array(opt)].map((_, i) => <span key={i}>{q.emoji}</span>)}
            </div>
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
