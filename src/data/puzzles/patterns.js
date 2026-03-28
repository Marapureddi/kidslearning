export const patternQuestions = [
  // Simple alternating
  { pattern: ['🔴', '🔵', '🔴', '🔵', '🔴'], correctAnswer: '🔵', options: ['🔴', '🔵', '🟢', '🟡'] },
  { pattern: ['⭐', '🌙', '⭐', '🌙', '⭐'], correctAnswer: '🌙', options: ['⭐', '🌙', '☀️', '🌈'] },
  { pattern: ['🐶', '🐱', '🐶', '🐱', '🐶'], correctAnswer: '🐱', options: ['🐶', '🐱', '🐸', '🐦'] },
  { pattern: ['🌸', '🌿', '🌸', '🌿', '🌸'], correctAnswer: '🌿', options: ['🌸', '🌿', '🌻', '🍀'] },
  { pattern: ['🔺', '🔻', '🔺', '🔻', '🔺'], correctAnswer: '🔻', options: ['🔺', '🔻', '⬛', '🔵'] },
  // ABA pattern
  { pattern: ['🍎', '🍎', '🍌', '🍎', '🍎'], correctAnswer: '🍌', options: ['🍎', '🍌', '🍇', '🍊'] },
  { pattern: ['🔵', '🔵', '🔴', '🔵', '🔵'], correctAnswer: '🔴', options: ['🔵', '🔴', '🟢', '🟡'] },
  { pattern: ['🐱', '🐱', '🐶', '🐱', '🐱'], correctAnswer: '🐶', options: ['🐱', '🐶', '🐸', '🐭'] },
  // Counting sequences
  { pattern: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'], correctAnswer: '6️⃣', options: ['5️⃣', '6️⃣', '7️⃣', '8️⃣'] },
  { pattern: ['2️⃣', '4️⃣', '6️⃣', '8️⃣', '?'], correctAnswer: '🔟', options: ['9️⃣', '🔟', '7️⃣', '5️⃣'] },
  // ABC pattern
  { pattern: ['🔴', '🔵', '🟢', '🔴', '🔵'], correctAnswer: '🟢', options: ['🔴', '🔵', '🟢', '🟡'] },
  { pattern: ['🍎', '🍌', '🍇', '🍎', '🍌'], correctAnswer: '🍇', options: ['🍎', '🍌', '🍇', '🍊'] },
  { pattern: ['⭐', '🌙', '☀️', '⭐', '🌙'], correctAnswer: '☀️', options: ['⭐', '🌙', '☀️', '🌈'] },
  // ABBA pattern
  { pattern: ['🔴', '🔵', '🔵', '🔴', '🔵'], correctAnswer: '🔵', options: ['🔴', '🔵', '🟢', '🟡'] },
  { pattern: ['🐶', '🐱', '🐱', '🐶', '🐱'], correctAnswer: '🐱', options: ['🐶', '🐱', '🐸', '🐭'] },
  // Growing pattern
  { pattern: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '?'], correctAnswer: '⭐⭐⭐⭐⭐', options: ['⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐'] },
  { pattern: ['🔴', '🔴🔴', '🔴🔴🔴', '🔴🔴🔴🔴', '?'], correctAnswer: '🔴🔴🔴🔴🔴', options: ['🔴🔴🔴', '🔴🔴🔴🔴🔴', '🔴🔴', '🔴🔴🔴🔴'] },
  // AABB pattern
  { pattern: ['🍎', '🍎', '🍌', '🍌', '🍎'], correctAnswer: '🍎', options: ['🍎', '🍌', '🍇', '🍊'] },
  { pattern: ['🔴', '🔴', '🔵', '🔵', '🔴'], correctAnswer: '🔴', options: ['🔴', '🔵', '🟢', '🟡'] },
  // Symmetry
  { pattern: ['🌸', '🌿', '🌻', '🌿', '?'], correctAnswer: '🌸', options: ['🌸', '🌿', '🌻', '🍀'] },
]
