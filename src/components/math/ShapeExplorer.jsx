import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { shapeQuestions } from '../../data/math/shapes'
import QuizComplete from '../shared/QuizComplete'
import './MathGames.css'

const ShapeSVG = ({ shape, size = 60, color = '#0ABDE3' }) => {
  const shapes = {
    circle: <circle cx={size/2} cy={size/2} r={size/2 - 4} fill={color} />,
    square: <rect x="4" y="4" width={size-8} height={size-8} rx="4" fill={color} />,
    triangle: <polygon points={`${size/2},4 ${size-4},${size-4} 4,${size-4}`} fill={color} />,
    star: <polygon points={`${size/2},4 ${size*0.38},${size-4} ${size-4},${size*0.38} 4,${size*0.38} ${size*0.62},${size-4}`} fill={color} />,
    diamond: <polygon points={`${size/2},4 ${size-4},${size/2} ${size/2},${size-4} 4,${size/2}`} fill={color} />,
    heart: (
      <path d={`M${size/2},${size*0.85} C${size*0.1},${size*0.55} ${size*0.05},${size*0.2} ${size/2},${size*0.35} C${size*0.95},${size*0.2} ${size*0.9},${size*0.55} ${size/2},${size*0.85}Z`} fill={color} />
    ),
  }
  return <svg className="shape-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{shapes[shape]}</svg>
}

const shapeColors = { circle: '#FF6B6B', square: '#0ABDE3', triangle: '#00B894', star: '#FECA57', diamond: '#A29BFE', heart: '#FD79A8' }

export default function ShapeExplorer() {
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [done, setDone] = useState(false)

  const q = shapeQuestions[qIndex]

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
    if (qIndex + 1 >= shapeQuestions.length) { setDone(true) }
    else { setQIndex(i => i + 1); setSelected(null); setIsCorrect(null); setWrongAnswers([]) }
  }

  const handleReset = () => {
    setQIndex(0); setScore(0); setSelected(null); setIsCorrect(null); setWrongAnswers([]); setDone(false)
  }

  if (done) return <QuizComplete score={score} total={shapeQuestions.length} onReset={handleReset} />

  return (
    <div className="math-game">
      <h2 className="math-title">Shape Explorer 🔷</h2>
      <div className="math-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((qIndex + 1) / shapeQuestions.length) * 100}%` }} />
        </div>
        <span className="progress-text">{qIndex + 1} / {shapeQuestions.length}</span>
      </div>

      <p className="math-prompt">{q.question}</p>

      <div className="math-options" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: 500 }}>
        {q.options.map(opt => (
          <motion.button
            key={opt.value}
            className={`math-option ${selected === opt.value && isCorrect ? 'correct' : ''} ${selected === opt.value && isCorrect === false ? 'shake wrong' : ''} ${wrongAnswers.includes(opt.value) ? 'dimmed' : ''}`}
            onClick={() => handleSelect(opt.value)}
            disabled={isCorrect}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '20px', minHeight: '120px' }}
          >
            <div className="shape-option-inner">
              <ShapeSVG shape={opt.svg} size={60} color={shapeColors[opt.svg] || '#0ABDE3'} />
              <span className="shape-label">{opt.label}</span>
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
