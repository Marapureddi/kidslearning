import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { subjects } from '../data/subjects'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <motion.div
        className="home-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Kids Learning Fun! 🌟</h1>
        <p>Pick a subject to start learning</p>
      </motion.div>

      <div className="subject-grid">
        {subjects.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', damping: 12 }}
          >
            <Link to={`/${subject.id}`} className="subject-card" style={{
              '--accent': subject.color,
              '--accent-light': subject.lightColor,
            }}>
              <div className="subject-emoji">{subject.emoji}</div>
              <h2>{subject.name}</h2>
              <p>{subject.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
