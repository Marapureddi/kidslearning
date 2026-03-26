import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { subjects } from '../data/subjects'
import './SubjectPage.css'

export default function SubjectPage() {
  const { subjectId } = useParams()
  const subject = subjects.find(s => s.id === subjectId)

  if (!subject) return <h2>Subject not found</h2>

  return (
    <div className="subject-page">
      <motion.div
        className="subject-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ '--accent': subject.color }}
      >
        <span className="subject-page-emoji">{subject.emoji}</span>
        <h1>{subject.name}</h1>
        <p>Choose an activity</p>
      </motion.div>

      <div className="activity-grid">
        {subject.activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', damping: 12 }}
          >
            <Link
              to={`/${subjectId}/${activity.id}`}
              className="activity-card"
              style={{ '--accent': subject.color, '--accent-light': subject.lightColor }}
            >
              <span className="activity-emoji">{activity.emoji}</span>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
