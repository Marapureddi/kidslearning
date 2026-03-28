export const matchingPairSets = [
  {
    name: 'Animal Parents & Babies',
    emoji: '🐾',
    pairs: [
      { left: { emoji: '🐄', label: 'Cow' }, right: { emoji: '🐮', label: 'Calf' } },
      { left: { emoji: '🐔', label: 'Hen' }, right: { emoji: '🐣', label: 'Chick' } },
      { left: { emoji: '🐶', label: 'Dog' }, right: { emoji: '🐕', label: 'Puppy' } },
      { left: { emoji: '🐱', label: 'Cat' }, right: { emoji: '🐈', label: 'Kitten' } },
      { left: { emoji: '🐴', label: 'Horse' }, right: { emoji: '🦄', label: 'Foal' } },
      { left: { emoji: '🦆', label: 'Duck' }, right: { emoji: '🐥', label: 'Duckling' } },
    ],
  },
  {
    name: 'Opposites',
    emoji: '🔄',
    pairs: [
      { left: { emoji: '☀️', label: 'Hot' }, right: { emoji: '❄️', label: 'Cold' } },
      { left: { emoji: '⬆️', label: 'Up' }, right: { emoji: '⬇️', label: 'Down' } },
      { left: { emoji: '🐘', label: 'Big' }, right: { emoji: '🐜', label: 'Small' } },
      { left: { emoji: '🌞', label: 'Day' }, right: { emoji: '🌙', label: 'Night' } },
      { left: { emoji: '🐇', label: 'Fast' }, right: { emoji: '🐢', label: 'Slow' } },
      { left: { emoji: '😊', label: 'Happy' }, right: { emoji: '😢', label: 'Sad' } },
    ],
  },
  {
    name: 'Colors & Objects',
    emoji: '🎨',
    pairs: [
      { left: { emoji: '🔴', label: 'Red' }, right: { emoji: '🍎', label: 'Apple' } },
      { left: { emoji: '🟡', label: 'Yellow' }, right: { emoji: '🍌', label: 'Banana' } },
      { left: { emoji: '🟢', label: 'Green' }, right: { emoji: '🐸', label: 'Frog' } },
      { left: { emoji: '🔵', label: 'Blue' }, right: { emoji: '🌊', label: 'Ocean' } },
      { left: { emoji: '🟠', label: 'Orange' }, right: { emoji: '🥕', label: 'Carrot' } },
      { left: { emoji: '🟣', label: 'Purple' }, right: { emoji: '🍇', label: 'Grapes' } },
    ],
  },
  {
    name: 'Animals & Homes',
    emoji: '🏠',
    pairs: [
      { left: { emoji: '🐝', label: 'Bee' }, right: { emoji: '🍯', label: 'Hive' } },
      { left: { emoji: '🐦', label: 'Bird' }, right: { emoji: '🪺', label: 'Nest' } },
      { left: { emoji: '🐟', label: 'Fish' }, right: { emoji: '🌊', label: 'Water' } },
      { left: { emoji: '🐻', label: 'Bear' }, right: { emoji: '🕳️', label: 'Cave' } },
      { left: { emoji: '🕷️', label: 'Spider' }, right: { emoji: '🕸️', label: 'Web' } },
      { left: { emoji: '🐶', label: 'Dog' }, right: { emoji: '🏠', label: 'House' } },
    ],
  },
  {
    name: 'Food Groups',
    emoji: '🍽️',
    pairs: [
      { left: { emoji: '🍎', label: 'Apple' }, right: { emoji: '🥤', label: 'Juice' } },
      { left: { emoji: '🌾', label: 'Wheat' }, right: { emoji: '🍞', label: 'Bread' } },
      { left: { emoji: '🐄', label: 'Cow' }, right: { emoji: '🥛', label: 'Milk' } },
      { left: { emoji: '🐔', label: 'Chicken' }, right: { emoji: '🥚', label: 'Egg' } },
      { left: { emoji: '🌻', label: 'Sunflower' }, right: { emoji: '🌰', label: 'Seed' } },
      { left: { emoji: '🍇', label: 'Grapes' }, right: { emoji: '🧃', label: 'Juice Box' } },
    ],
  },
]

// Keep backward compatibility
export const matchingPairs = matchingPairSets[0].pairs
