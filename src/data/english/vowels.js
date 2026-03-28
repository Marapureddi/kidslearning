export const vowelData = [
  {
    vowel: 'A',
    shortSound: 'ah (as in apple)',
    longSound: 'ay (as in cake)',
    shortWords: [
      { word: 'Apple', emoji: '🍎' },
      { word: 'Ant', emoji: '🐜' },
      { word: 'Axe', emoji: '🪓' },
    ],
    longWords: [
      { word: 'Cake', emoji: '🎂' },
      { word: 'Lake', emoji: '🏞️' },
      { word: 'Game', emoji: '🎮' },
    ],
  },
  {
    vowel: 'E',
    shortSound: 'eh (as in egg)',
    longSound: 'ee (as in tree)',
    shortWords: [
      { word: 'Egg', emoji: '🥚' },
      { word: 'Elephant', emoji: '🐘' },
      { word: 'Elf', emoji: '🧝' },
    ],
    longWords: [
      { word: 'Tree', emoji: '🌳' },
      { word: 'Bee', emoji: '🐝' },
      { word: 'Key', emoji: '🔑' },
    ],
  },
  {
    vowel: 'I',
    shortSound: 'ih (as in igloo)',
    longSound: 'eye (as in ice)',
    shortWords: [
      { word: 'Igloo', emoji: '🏠' },
      { word: 'Insect', emoji: '🐛' },
      { word: 'Ink', emoji: '🖊️' },
    ],
    longWords: [
      { word: 'Ice', emoji: '🧊' },
      { word: 'Kite', emoji: '🪁' },
      { word: 'Bike', emoji: '🚲' },
    ],
  },
  {
    vowel: 'O',
    shortSound: 'oh (as in octopus)',
    longSound: 'oh (as in bone)',
    shortWords: [
      { word: 'Octopus', emoji: '🐙' },
      { word: 'Otter', emoji: '🦦' },
      { word: 'Olive', emoji: '🫒' },
    ],
    longWords: [
      { word: 'Bone', emoji: '🦴' },
      { word: 'Rose', emoji: '🌹' },
      { word: 'Home', emoji: '🏠' },
    ],
  },
  {
    vowel: 'U',
    shortSound: 'uh (as in umbrella)',
    longSound: 'yoo (as in unicorn)',
    shortWords: [
      { word: 'Umbrella', emoji: '☂️' },
      { word: 'Up', emoji: '⬆️' },
      { word: 'Umpire', emoji: '🧑‍⚖️' },
    ],
    longWords: [
      { word: 'Unicorn', emoji: '🦄' },
      { word: 'Cube', emoji: '🧊' },
      { word: 'Flute', emoji: '🎵' },
    ],
  },
]

export const vowelQuizQuestions = [
  { question: 'Which letter is a vowel?', correctAnswer: 'A', options: ['A', 'B', 'C', 'D'] },
  { question: 'Which letter is a vowel?', correctAnswer: 'E', options: ['F', 'G', 'E', 'H'] },
  { question: 'Which letter is a vowel?', correctAnswer: 'I', options: ['J', 'I', 'K', 'L'] },
  { question: 'Which letter is a vowel?', correctAnswer: 'O', options: ['N', 'P', 'Q', 'O'] },
  { question: 'Which letter is a vowel?', correctAnswer: 'U', options: ['U', 'V', 'W', 'X'] },
  { question: 'Which word starts with a vowel?', correctAnswer: 'Apple', options: ['Ball', 'Apple', 'Cat', 'Dog'] },
  { question: 'Which word starts with a vowel?', correctAnswer: 'Egg', options: ['Fish', 'Egg', 'Goat', 'Hat'] },
  { question: 'Which word starts with a vowel?', correctAnswer: 'Ice', options: ['Jam', 'Kite', 'Ice', 'Lamp'] },
  { question: 'How many vowels are there?', correctAnswer: '5', options: ['3', '4', '5', '6'] },
  { question: 'Which is NOT a vowel?', correctAnswer: 'B', options: ['A', 'B', 'E', 'I'] },
]
