import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaVolumeUp } from 'react-icons/fa'
import { alphabetData } from '../../data/english/alphabet'
import { useAudio } from '../../hooks/useAudio'
import './AlphabetExplorer.css'

export default function AlphabetExplorer() {
  const [index, setIndex] = useState(0)
  const { speak } = useAudio()
  const item = alphabetData[index]

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(alphabetData.length - 1, i + 1))

  return (
    <div className="alphabet-explorer">
      <h2 className="alphabet-title">Alphabet Explorer 🔤</h2>

      <div className="letter-nav">
        <button className="arrow-btn" onClick={prev} disabled={index === 0}>
          <FaArrowLeft />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.letter}
            className="letter-display"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className="letter-big">{item.letter}</div>
            <div className="letter-small">{item.letter.toLowerCase()}</div>
            <div className="letter-emoji">{item.emoji}</div>
            <div className="letter-word">{item.word}</div>
            <button
              className="speak-btn"
              onClick={() => speak(`${item.letter}. ${item.letter} is for ${item.word}`)}
            >
              <FaVolumeUp /> Hear it!
            </button>
          </motion.div>
        </AnimatePresence>

        <button className="arrow-btn" onClick={next} disabled={index === alphabetData.length - 1}>
          <FaArrowRight />
        </button>
      </div>

      <div className="letter-dots">
        {alphabetData.map((a, i) => (
          <button
            key={a.letter}
            className={`letter-dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          >
            {a.letter}
          </button>
        ))}
      </div>
    </div>
  )
}
