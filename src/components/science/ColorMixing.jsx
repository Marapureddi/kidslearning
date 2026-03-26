import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { colorMixQuestions, colorFindQuestions } from '../../data/science/colors'
import QuizComplete from '../shared/QuizComplete'
import './ScienceGames.css'

const colorMap = {
  '🔴 Red': '#e74c3c', '🔵 Blue': '#3498db', '🟡 Yellow': '#f1c40f',
  '⚪ White': '#ecf0f1', '⚫ Black': '#2d3436',
}

export default function ColorMixing() {
  const [phase, setPhase] = useState('mix') // mix | find
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)

  const questions = phase === 'mix' ? colorMixQuestions : colorFindQuestions
  const q = questions[qIndex]

  const handleSelect = (val) => {
    if (isCorrect) return
    setSelected(val)
    const correct = phase === 'mix' ? q.correctAnswer : q.correctAnswer
    if (val === correct) {
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
    if (qIndex + 1 >= questions.length) {
      if (phase === 'mix') {
        setPhase('find')
        setQIndex(0); setSelected(null); setIsCorrect(null); setWrongAnswers([])
      } else {
        setDone(true)
      }
    } else {
      setQIndex(i => i + 1); setSelected(null); setIsCorrect(null); setWrongAnswers([])
    }
  }

  const handleReset = () => {
    setPhase('mix'); setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false)
  }

  const total = colorMixQuestions.length + colorFindQuestions.length
  if (done) return <QuizComplete score={score} total={total} onReset={handleReset} />

  const globalIndex = phase === 'mix' ? qIndex + 1 : colorMixQuestions.length + qIndex + 1

  return (
    <div className="science-game">
      <h2 className="science-title">Color Mixing 🎨</h2>
      <div className="science-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(globalIndex / total) * 100}%` }} />
        </div>
        <span className="progress-text">{globalIndex} / {total}</span>
      </div>

      {phase === 'mix' ? (
        <>
          <p className="science-prompt">What color do these make?</p>
          <div className="color-mix-visual">
            <div className="color-circle" style={{ background: colorMap[q.color1] }}>{q.color1.split(' ')[1]}</div>
            <span className="color-plus">+</span>
            <div className="color-circle" style={{ background: colorMap[q.color2] }}>{q.color2.split(' ')[1]}</div>
            <span className="color-plus">=</span>
            <div className={`color-result ${isCorrect ? 'revealed' : ''}`} style={isCorrect ? { background: q.resultColor, borderColor: q.resultColor } : {}}>
              {isCorrect ? '✓' : '?'}
            </div>
          </div>
          <div className="science-options">
            {q.options.map(opt => (
              <motion.button
                key={opt}
                className={`science-option ${selected === opt && isCorrect ? 'correct' : ''} ${selected === opt && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt) ? 'dimmed' : ''}`}
                onClick={() => handleSelect(opt)}
                disabled={isCorrect}
                whileHover={{ scale: 1.05 }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="science-prompt">{q.question}</p>
          <div className="science-options" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {q.options.map(opt => (
              <motion.button
                key={opt.value}
                className={`science-option ${selected === opt.value && isCorrect ? 'correct' : ''} ${selected === opt.value && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt.value) ? 'dimmed' : ''}`}
                onClick={() => handleSelect(opt.value)}
                disabled={isCorrect}
                whileHover={{ scale: 1.05 }}
                style={{ fontSize: 16 }}
              >
                <span style={{ fontSize: 32 }}>{opt.emoji}</span><br />{opt.label}
              </motion.button>
            ))}
          </div>
        </>
      )}

      {isCorrect && (
        <motion.button className="science-next" onClick={handleNext} initial={{ scale: 0 }} animate={{ scale: 1 }}>
          Next →
        </motion.button>
      )}
    </div>
  )
}
