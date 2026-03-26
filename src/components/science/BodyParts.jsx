import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { bodyPartsQuiz, bodyParts } from '../../data/science/bodyParts'
import { useAudio } from '../../hooks/useAudio'
import QuizComplete from '../shared/QuizComplete'
import './ScienceGames.css'

export default function BodyParts() {
  const [mode, setMode] = useState('explore')
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)
  const { speak } = useAudio()

  const handleBodyTap = (part) => {
    speak(`This is your ${part.label}`)
  }

  const handleQuizSelect = (val) => {
    if (isCorrect) return
    setSelected(val)
    if (val === bodyPartsQuiz[qIndex].correctAnswer) {
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
    if (qIndex + 1 >= bodyPartsQuiz.length) { setDone(true) }
    else { setQIndex(i => i + 1); setSelected(null); setIsCorrect(null); setWrongAnswers([]) }
  }

  const handleReset = () => {
    setMode('explore'); setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false)
  }

  if (mode === 'explore') {
    return (
      <div className="science-game">
        <h2 className="science-title">Body Parts 🦴</h2>
        <p className="science-prompt">Tap to learn about your body!</p>

        <div className="body-container">
          {bodyParts.map(part => (
            <motion.button
              key={part.id}
              className="body-btn"
              onClick={() => handleBodyTap(part)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="body-emoji">{part.emoji}</span>
              <span className="body-label">{part.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          className="science-next"
          onClick={() => setMode('quiz')}
          whileHover={{ scale: 1.05 }}
          style={{ background: 'var(--science)' }}
        >
          Take the Quiz! 🎯
        </motion.button>
      </div>
    )
  }

  if (done) return <QuizComplete score={score} total={bodyPartsQuiz.length} onReset={handleReset} />

  const q = bodyPartsQuiz[qIndex]

  return (
    <div className="science-game">
      <h2 className="science-title">Body Parts Quiz 🎯</h2>
      <div className="science-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((qIndex + 1) / bodyPartsQuiz.length) * 100}%` }} />
        </div>
        <span className="progress-text">{qIndex + 1} / {bodyPartsQuiz.length}</span>
      </div>

      <p className="science-prompt">{q.question}</p>

      <div className="body-container">
        {bodyParts.map(part => (
          <motion.button
            key={part.id}
            className={`body-btn ${selected === part.id && isCorrect ? 'correct' : ''} ${selected === part.id && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(part.id) ? 'dimmed' : ''}`}
            onClick={() => handleQuizSelect(part.id)}
            disabled={isCorrect}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="body-emoji">{part.emoji}</span>
            <span className="body-label">{part.label}</span>
          </motion.button>
        ))}
      </div>

      {isCorrect && (
        <motion.button className="science-next" onClick={handleNext} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          Next →
        </motion.button>
      )}
    </div>
  )
}
