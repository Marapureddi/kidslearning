import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { seasons, natureQuizQuestions } from '../../data/science/nature'
import QuizComplete from '../shared/QuizComplete'
import './ScienceGames.css'

export default function NatureExplorer() {
  const [mode, setMode] = useState('explore') // explore | quiz
  const [activeSeason, setActiveSeason] = useState(null)
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)

  const handleQuizSelect = (val) => {
    if (isCorrect) return
    setSelected(val)
    if (val === natureQuizQuestions[qIndex].correctAnswer) {
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
    if (qIndex + 1 >= natureQuizQuestions.length) { setDone(true) }
    else { setQIndex(i => i + 1); setSelected(null); setIsCorrect(null); setWrongAnswers([]) }
  }

  const handleReset = () => {
    setMode('explore'); setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false); setActiveSeason(null)
  }

  if (mode === 'explore') {
    return (
      <div className="science-game">
        <h2 className="science-title">Nature Explorer 🌿</h2>
        <p className="science-prompt">Tap a season to explore!</p>

        <div className="season-cards">
          {seasons.map((season, i) => (
            <motion.div
              key={season.name}
              className={`season-card ${activeSeason === i ? 'active' : ''}`}
              style={{ background: season.color }}
              onClick={() => setActiveSeason(activeSeason === i ? null : i)}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="season-emoji">{season.emoji}</span>
              <div className="season-name">{season.name}</div>
              <div className="season-desc">{season.description}</div>
              {activeSeason === i && (
                <motion.div className="season-items" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {season.items.map((item, j) => (
                    <motion.span
                      key={j}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: j * 0.1 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
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

  if (done) return <QuizComplete score={score} total={natureQuizQuestions.length} onReset={handleReset} />

  const q = natureQuizQuestions[qIndex]

  return (
    <div className="science-game">
      <h2 className="science-title">Seasons Quiz 🎯</h2>
      <div className="science-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((qIndex + 1) / natureQuizQuestions.length) * 100}%` }} />
        </div>
        <span className="progress-text">{qIndex + 1} / {natureQuizQuestions.length}</span>
      </div>

      <p className="science-prompt">{q.question}</p>

      <div className="science-options">
        {q.options.map(opt => {
          const season = seasons.find(s => s.name.toLowerCase() === opt)
          return (
            <motion.button
              key={opt}
              className={`science-option ${selected === opt && isCorrect ? 'correct' : ''} ${selected === opt && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt) ? 'dimmed' : ''}`}
              onClick={() => handleQuizSelect(opt)}
              disabled={isCorrect}
              whileHover={{ scale: 1.05 }}
            >
              {season?.emoji} {opt}
            </motion.button>
          )
        })}
      </div>

      {isCorrect && (
        <motion.button className="science-next" onClick={handleNext} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          Next →
        </motion.button>
      )}
    </div>
  )
}
