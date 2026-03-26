import { motion } from 'framer-motion'
import { FaStar, FaRedoAlt } from 'react-icons/fa'
import './FeedbackOverlay.css'

export default function FeedbackOverlay({ isCorrect, onNext }) {
  return (
    <motion.div
      className={`feedback-overlay ${isCorrect ? 'correct' : 'wrong'}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <div className="feedback-icon">
        {isCorrect ? <FaStar /> : <FaRedoAlt />}
      </div>
      <h3>{isCorrect ? 'Great Job! ⭐' : 'Try Again!'}</h3>
      {isCorrect && (
        <motion.button
          className="next-btn"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next →
        </motion.button>
      )}
    </motion.div>
  )
}
