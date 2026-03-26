import { motion } from 'framer-motion'
import { FaStar, FaRedoAlt, FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './QuizComplete.css'

export default function QuizComplete({ score, total, onReset }) {
  const navigate = useNavigate()
  const stars = Math.round((score / total) * 5)

  return (
    <motion.div
      className="quiz-complete"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 12 }}
    >
      <h2>All Done!</h2>
      <div className="stars-row">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className={`star ${i < stars ? 'earned' : ''}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
          >
            <FaStar />
          </motion.span>
        ))}
      </div>
      <p className="score-text">You got {score} out of {total} right!</p>
      <div className="complete-actions">
        <motion.button
          className="action-btn play-again"
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRedoAlt /> Play Again
        </motion.button>
        <motion.button
          className="action-btn go-back"
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Go Back
        </motion.button>
      </div>
    </motion.div>
  )
}
