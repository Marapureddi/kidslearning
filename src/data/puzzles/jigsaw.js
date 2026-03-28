// Each puzzle is an SVG illustration split into a grid
// The SVG is rendered as a background-image and CSS background-position shows each piece

const cowSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="200" fill="#87CEEB"/>
  <circle cx="350" cy="50" r="40" fill="#FFD700"/>
  <circle cx="350" cy="50" r="30" fill="#FFF44F"/>
  <ellipse cx="100" cy="100" rx="60" ry="30" fill="white"/>
  <ellipse cx="280" cy="80" rx="50" ry="25" fill="white"/>
  <rect y="180" width="400" height="220" fill="#7CCD7C"/>
  <rect y="170" width="400" height="30" rx="15" fill="#6BBF6B"/>
  <rect x="20" y="130" width="8" height="60" fill="#8B6914" rx="2"/>
  <rect x="60" y="130" width="8" height="60" fill="#8B6914" rx="2"/>
  <rect x="100" y="130" width="8" height="60" fill="#8B6914" rx="2"/>
  <rect x="15" y="130" width="100" height="6" fill="#8B6914" rx="2"/>
  <rect x="15" y="155" width="100" height="6" fill="#8B6914" rx="2"/>
  <ellipse cx="200" cy="280" rx="80" ry="55" fill="white" stroke="#333" stroke-width="2"/>
  <ellipse cx="145" cy="250" rx="40" ry="45" fill="white" stroke="#333" stroke-width="2"/>
  <circle cx="135" cy="240" r="6" fill="#333"/>
  <circle cx="155" cy="240" r="6" fill="#333"/>
  <ellipse cx="145" cy="260" rx="25" ry="18" fill="#FFB6C1"/>
  <ellipse cx="138" cy="258" r="4" fill="#FF69B4"/>
  <ellipse cx="152" cy="258" r="4" fill="#FF69B4"/>
  <path d="M120 215 Q115 195 125 200" stroke="#333" stroke-width="4" fill="none"/>
  <path d="M170 215 Q175 195 165 200" stroke="#333" stroke-width="4" fill="none"/>
  <ellipse cx="180" cy="270" rx="20" ry="15" fill="#333"/>
  <ellipse cx="230" cy="285" rx="18" ry="12" fill="#333"/>
  <rect x="165" y="310" width="15" height="45" fill="white" stroke="#333" stroke-width="2" rx="4"/>
  <rect x="195" y="310" width="15" height="45" fill="white" stroke="#333" stroke-width="2" rx="4"/>
  <rect x="225" y="310" width="15" height="45" fill="white" stroke="#333" stroke-width="2" rx="4"/>
  <rect x="250" y="310" width="15" height="45" fill="white" stroke="#333" stroke-width="2" rx="4"/>
  <rect x="165" y="348" width="15" height="10" fill="#8B4513" rx="3"/>
  <rect x="195" y="348" width="15" height="10" fill="#8B4513" rx="3"/>
  <rect x="225" y="348" width="15" height="10" fill="#8B4513" rx="3"/>
  <rect x="250" y="348" width="15" height="10" fill="#8B4513" rx="3"/>
  <path d="M275 275 Q310 270 305 290 Q300 300 290 295" stroke="#333" stroke-width="2" fill="white"/>
  <circle cx="50" cy="350" r="8" fill="#FF6B9D"/>
  <circle cx="50" cy="350" r="4" fill="#FFD700"/>
  <line x1="50" y1="358" x2="50" y2="375" stroke="#228B22" stroke-width="2"/>
  <circle cx="340" cy="340" r="8" fill="#FF4444"/>
  <circle cx="340" cy="340" r="4" fill="#FFD700"/>
  <line x1="340" y1="348" x2="340" y2="370" stroke="#228B22" stroke-width="2"/>
  <circle cx="90" cy="370" r="6" fill="#FF69B4"/>
  <circle cx="90" cy="370" r="3" fill="#FFD700"/>
  <line x1="90" y1="376" x2="90" y2="390" stroke="#228B22" stroke-width="2"/>
  <circle cx="300" cy="375" r="6" fill="#9370DB"/>
  <circle cx="300" cy="375" r="3" fill="#FFD700"/>
  <line x1="300" y1="381" x2="300" y2="395" stroke="#228B22" stroke-width="2"/>
</svg>`

const rocketSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#1a1a2e"/>
  <circle cx="50" cy="50" r="2" fill="white"/>
  <circle cx="120" cy="30" r="1.5" fill="white"/>
  <circle cx="200" cy="60" r="2" fill="white"/>
  <circle cx="300" cy="40" r="1.5" fill="white"/>
  <circle cx="370" cy="80" r="2" fill="white"/>
  <circle cx="30" cy="120" r="1.5" fill="white"/>
  <circle cx="350" cy="150" r="2" fill="white"/>
  <circle cx="80" cy="200" r="1.5" fill="white"/>
  <circle cx="330" cy="250" r="2" fill="white"/>
  <circle cx="60" cy="300" r="1.5" fill="white"/>
  <circle cx="370" cy="320" r="2" fill="white"/>
  <circle cx="150" cy="350" r="1.5" fill="white"/>
  <circle cx="280" cy="370" r="2" fill="white"/>
  <circle cx="40" cy="380" r="1.5" fill="white"/>
  <circle cx="320" cy="20" r="1" fill="#FFD700"/>
  <circle cx="180" cy="150" r="1" fill="#FFD700"/>
  <circle cx="100" cy="280" r="1" fill="#FFD700"/>
  <circle cx="250" cy="100" r="1" fill="#FFD700"/>
  <circle cx="340" cy="360" r="30" fill="#4a4a6a"/>
  <circle cx="340" cy="360" r="28" fill="#3a3a5a"/>
  <circle cx="330" cy="350" r="8" fill="#4a4a6a"/>
  <circle cx="355" cy="365" r="5" fill="#4a4a6a"/>
  <circle cx="60" cy="340" r="22" fill="#4a4a6a"/>
  <circle cx="60" cy="340" r="20" fill="#3a3a5a"/>
  <circle cx="55" cy="335" r="6" fill="#4a4a6a"/>
  <path d="M200 80 L180 220 L220 220 Z" fill="#E8E8E8"/>
  <path d="M200 80 L200 220 L220 220 Z" fill="#C0C0C0"/>
  <ellipse cx="200" cy="80" rx="20" ry="30" fill="#FF4444"/>
  <ellipse cx="200" cy="80" rx="20" ry="30" fill="url(#rg1)" opacity="0.3"/>
  <circle cx="200" cy="150" r="15" fill="#4FC3F7"/>
  <circle cx="200" cy="150" r="12" fill="#29B6F6"/>
  <circle cx="196" cy="146" r="4" fill="white" opacity="0.5"/>
  <path d="M180 200 L160 240 L185 220 Z" fill="#FF4444"/>
  <path d="M220 200 L240 240 L215 220 Z" fill="#FF4444"/>
  <path d="M190 220 L185 280 Q200 300 215 280 L210 220 Z" fill="#FF6600"/>
  <path d="M192 220 L190 270 Q200 285 210 270 L208 220 Z" fill="#FFD700"/>
  <path d="M196 230 L195 260 Q200 270 205 260 L204 230 Z" fill="#FFEE58"/>
</svg>`

const fishSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#006994"/>
  <rect y="350" width="400" height="50" fill="#C2B280" rx="5"/>
  <rect y="340" width="400" height="20" fill="#D4C59A" rx="10"/>
  <path d="M30 350 Q35 320 40 350" fill="#228B22"/>
  <path d="M25 350 Q30 310 35 350" fill="#32CD32"/>
  <path d="M100 350 Q105 330 110 350" fill="#228B22"/>
  <path d="M320 350 Q328 315 336 350" fill="#228B22"/>
  <path d="M315 350 Q323 325 331 350" fill="#32CD32"/>
  <circle cx="350" cy="370" r="8" fill="#FF6347"/>
  <circle cx="355" cy="365" r="6" fill="#FF4500"/>
  <circle cx="60" cy="380" r="12" fill="#DEB887"/>
  <ellipse cx="180" cy="200" rx="80" ry="50" fill="#FF6B35"/>
  <ellipse cx="180" cy="200" rx="80" ry="50" fill="#FF8C00" opacity="0.6"/>
  <ellipse cx="180" cy="185" rx="70" ry="35" fill="#FFA500" opacity="0.4"/>
  <path d="M260 200 L300 170 L300 230 Z" fill="#FF6B35"/>
  <path d="M260 200 L300 170 L300 200 Z" fill="#FF8C00"/>
  <circle cx="145" cy="190" r="12" fill="white"/>
  <circle cx="148" cy="190" r="7" fill="#333"/>
  <circle cx="150" cy="188" r="2" fill="white"/>
  <path d="M130 215 Q150 225 170 215" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M180 155 Q185 135 175 140 Q190 130 185 155" fill="#FF6B35"/>
  <path d="M200 160 Q205 140 195 145 Q210 135 205 160" fill="#FF6B35"/>
  <path d="M130 175 Q120 165 135 165" fill="#FF8C00" stroke="#FF6B35" stroke-width="1"/>
  <path d="M160 170 Q155 158 165 160" fill="#FF8C00" stroke="#FF6B35" stroke-width="1"/>
  <path d="M210 180 Q205 168 215 170" fill="#FF8C00" stroke="#FF6B35" stroke-width="1"/>
  <circle cx="80" cy="80" r="4" fill="rgba(255,255,255,0.4)"/>
  <circle cx="300" cy="120" r="6" fill="rgba(255,255,255,0.3)"/>
  <circle cx="50" cy="250" r="5" fill="rgba(255,255,255,0.3)"/>
  <circle cx="340" cy="280" r="4" fill="rgba(255,255,255,0.4)"/>
  <circle cx="150" cy="100" r="3" fill="rgba(255,255,255,0.3)"/>
  <circle cx="280" cy="300" r="5" fill="rgba(255,255,255,0.3)"/>
  <ellipse cx="320" cy="100" rx="25" ry="12" fill="#FF69B4"/>
  <ellipse cx="320" cy="95" rx="20" ry="8" fill="#FF89C4" opacity="0.6"/>
  <path d="M345 100 L365 90 L365 110 Z" fill="#FF69B4"/>
  <circle cx="308" cy="96" r="4" fill="white"/>
  <circle cx="310" cy="96" r="2" fill="#333"/>
  <ellipse cx="70" cy="150" rx="18" ry="10" fill="#FFFF00"/>
  <path d="M88 150 L100 143 L100 157 Z" fill="#FFFF00"/>
  <circle cx="60" cy="147" r="3" fill="white"/>
  <circle cx="61" cy="147" r="1.5" fill="#333"/>
</svg>`

const houseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="200" fill="#87CEEB"/>
  <circle cx="320" cy="60" r="40" fill="#FFD700"/>
  <circle cx="320" cy="60" r="32" fill="#FFF44F"/>
  <ellipse cx="80" cy="70" rx="50" ry="25" fill="white"/>
  <ellipse cx="60" cy="70" rx="40" ry="20" fill="white"/>
  <ellipse cx="100" cy="70" rx="35" ry="18" fill="white"/>
  <rect y="200" width="400" height="200" fill="#7CCD7C"/>
  <rect x="100" y="150" width="200" height="170" fill="#E8B84B"/>
  <rect x="100" y="150" width="200" height="170" fill="#D4A43A" opacity="0.5"/>
  <polygon points="200,80 80,160 320,160" fill="#CC3333"/>
  <polygon points="200,80 200,160 320,160" fill="#AA2222"/>
  <rect x="175" y="240" width="50" height="80" fill="#8B4513" rx="3"/>
  <circle cx="215" cy="280" r="4" fill="#FFD700"/>
  <rect x="120" y="180" width="45" height="40" fill="#ADD8E6" rx="2"/>
  <rect x="120" y="198" width="45" height="3" fill="white"/>
  <rect x="141" y="180" width="3" height="40" fill="white"/>
  <rect x="235" y="180" width="45" height="40" fill="#ADD8E6" rx="2"/>
  <rect x="235" y="198" width="45" height="3" fill="white"/>
  <rect x="256" y="180" width="3" height="40" fill="white"/>
  <rect x="275" y="100" width="20" height="60" fill="#888" rx="2"/>
  <path d="M275 100 Q285 90 295 100" fill="#888"/>
  <rect x="20" y="250" width="40" height="60" fill="#228B22" rx="20"/>
  <rect x="35" y="280" width="10" height="40" fill="#8B4513"/>
  <rect x="340" y="240" width="45" height="70" fill="#228B22" rx="22"/>
  <rect x="358" y="280" width="10" height="40" fill="#8B4513"/>
  <circle cx="50" cy="360" r="8" fill="#FF6B9D"/>
  <circle cx="50" cy="360" r="4" fill="#FFD700"/>
  <line x1="50" y1="368" x2="50" y2="385" stroke="#228B22" stroke-width="2"/>
  <circle cx="150" cy="370" r="7" fill="#FF4444"/>
  <circle cx="150" cy="370" r="3.5" fill="#FFD700"/>
  <line x1="150" y1="377" x2="150" y2="392" stroke="#228B22" stroke-width="2"/>
  <circle cx="260" cy="365" r="7" fill="#9370DB"/>
  <circle cx="260" cy="365" r="3.5" fill="#FFD700"/>
  <line x1="260" y1="372" x2="260" y2="388" stroke="#228B22" stroke-width="2"/>
  <circle cx="350" cy="370" r="6" fill="#FF69B4"/>
  <circle cx="350" cy="370" r="3" fill="#FFD700"/>
  <line x1="350" y1="376" x2="350" y2="390" stroke="#228B22" stroke-width="2"/>
  <path d="M70 320 L90 320 L80 305 Z" fill="#228B22"/>
  <path d="M65 335 L95 335 L80 315 Z" fill="#2E8B2E"/>
  <rect x="77" y="335" width="6" height="15" fill="#8B4513"/>
</svg>`

const carSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="250" fill="#87CEEB"/>
  <rect y="250" width="400" height="30" fill="#666"/>
  <rect y="248" width="400" height="6" fill="#888"/>
  <rect x="0" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="40" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="80" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="120" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="160" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="200" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="240" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="280" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="320" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect x="360" y="260" width="20" height="4" fill="#FFD700" rx="1"/>
  <rect y="280" width="400" height="120" fill="#7CCD7C"/>
  <circle cx="330" cy="60" r="35" fill="#FFD700"/>
  <circle cx="330" cy="60" r="28" fill="#FFF44F"/>
  <ellipse cx="100" cy="50" rx="50" ry="22" fill="white"/>
  <ellipse cx="250" cy="40" rx="40" ry="18" fill="white"/>
  <rect x="80" y="170" width="240" height="75" rx="15" fill="#FF4444"/>
  <rect x="80" y="170" width="240" height="40" rx="15" fill="#FF6666"/>
  <path d="M130 170 L155 120 L270 120 L295 170" fill="#FF4444"/>
  <path d="M130 170 L155 120 L200 120 L200 170" fill="#FF6666"/>
  <rect x="140" y="128" width="55" height="38" rx="5" fill="#ADD8E6"/>
  <rect x="205" y="128" width="55" height="38" rx="5" fill="#ADD8E6"/>
  <rect x="140" y="128" width="55" height="38" rx="5" fill="rgba(255,255,255,0.3)"/>
  <circle cx="130" cy="248" r="28" fill="#333"/>
  <circle cx="130" cy="248" r="22" fill="#555"/>
  <circle cx="130" cy="248" r="8" fill="#888"/>
  <circle cx="270" cy="248" r="28" fill="#333"/>
  <circle cx="270" cy="248" r="22" fill="#555"/>
  <circle cx="270" cy="248" r="8" fill="#888"/>
  <rect x="75" y="195" width="12" height="25" rx="3" fill="#FFD700"/>
  <rect x="310" y="195" width="12" height="25" rx="3" fill="#FF0000"/>
  <rect x="310" y="195" width="12" height="12" rx="3" fill="#FF4444"/>
  <rect x="170" y="245" width="60" height="4" fill="#FF3333" rx="1"/>
  <circle cx="40" cy="350" r="20" fill="#228B22" rx="10"/>
  <rect x="37" y="345" width="6" height="30" fill="#8B4513"/>
  <circle cx="360" cy="340" r="22" fill="#228B22"/>
  <rect x="357" y="340" width="6" height="30" fill="#8B4513"/>
</svg>`

function svgToDataUri(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const jigsawPuzzles = [
  { name: 'Cow in Field', emoji: '🐄', image: svgToDataUri(cowSvg), rows: 4, cols: 4 },
  { name: 'Rocket Ship', emoji: '🚀', image: svgToDataUri(rocketSvg), rows: 4, cols: 4 },
  { name: 'Under the Sea', emoji: '🐠', image: svgToDataUri(fishSvg), rows: 4, cols: 4 },
  { name: 'My House', emoji: '🏠', image: svgToDataUri(houseSvg), rows: 4, cols: 4 },
  { name: 'Red Car', emoji: '🚗', image: svgToDataUri(carSvg), rows: 4, cols: 4 },
]
