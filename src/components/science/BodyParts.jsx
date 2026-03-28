import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { bodyPartsData, bodyPartsQuiz } from '../../data/science/bodyParts'
import { useAudio } from '../../hooks/useAudio'
import QuizComplete from '../shared/QuizComplete'
import './ScienceGames.css'

export default function BodyParts() {
  const [mode, setMode] = useState('explore')
  const [selectedPart, setSelectedPart] = useState(null)
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)
  const { speak } = useAudio()

  const handleBodyTap = (part) => {
    setSelectedPart(part)
    speak(`This is your ${part.label}. ${part.description}`)
  }

  const handleQuizSelect = (val) => {
    if (isCorrect) return
    setSelected(val)
    const q = bodyPartsQuiz[qIndex]
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
    if (qIndex + 1 >= bodyPartsQuiz.length) { setDone(true) }
    else { setQIndex(i => i + 1); setSelected(null); setIsCorrect(null); setWrongAnswers([]) }
  }

  const handleReset = () => {
    setMode('explore'); setSelectedPart(null); setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false)
  }

  if (mode === 'explore') {
    return (
      <div className="science-game">
        <h2 className="science-title">My Body 🦴</h2>
        <p className="science-prompt">Tap a body part to learn about it!</p>

        <div className="body-container">
          {bodyPartsData.map(part => (
            <motion.button
              key={part.id}
              className={`body-btn ${selectedPart?.id === part.id ? 'active-part' : ''}`}
              onClick={() => handleBodyTap(part)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="body-emoji">{part.emoji}</span>
              <span className="body-label">{part.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedPart && (
            <motion.div
              key={selectedPart.id}
              className="body-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="body-detail-title">{selectedPart.emoji} {selectedPart.label}</h3>
              <p className="body-detail-desc">{selectedPart.description}</p>
              <div className="body-detail-section">
                <h4>How it works:</h4>
                <p>{selectedPart.howItWorks}</p>
              </div>
              <div className="body-detail-section">
                <h4>Fun fact:</h4>
                <p>{selectedPart.funFact}</p>
              </div>
              <button className="body-listen" onClick={() => speak(`${selectedPart.label}. ${selectedPart.description}. ${selectedPart.howItWorks}. Fun fact: ${selectedPart.funFact}`)}>
                🔊 Listen
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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

      <p className="science-prompt" style={{ fontSize: 22 }}>{q.question}</p>
      <div className="science-prompt" style={{ fontSize: 48 }}>{q.emoji}</div>

      <div className="science-options">
        {q.options.map(opt => (
          <motion.button
            key={opt}
            className={`science-option ${selected === opt && isCorrect ? 'correct' : ''} ${selected === opt && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt) ? 'dimmed' : ''}`}
            onClick={() => handleQuizSelect(opt)}
            disabled={isCorrect}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ textTransform: 'capitalize' }}
          >
            {opt}
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
