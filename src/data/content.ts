export interface Lesson { title: string; minutes: number }
export interface Course { id: string; title: string; level: string; desc: string; lessons: Lesson[] }
export interface Lecture { id: string; title: string; topic: string; duration: string; src: string }
export interface Note { id: string; title: string; pages: number; file: string }
export interface Question { q: string; options: string[]; answer: number; explain: string }
export interface Quiz { id: string; title: string; questions: Question[] }
export interface CalcProblem { q: string; answer: number; unit: string; solution: string }

export const courses: Course[] = [
  {
    id: 'c1', title: 'Basic Radiation Physics', level: 'Beginner',
    desc: 'Atomic structure, radioactivity and interaction of radiation with matter.',
    lessons: [
      { title: 'Atomic structure and nuclear stability', minutes: 25 },
      { title: 'Radioactive decay and half-life', minutes: 30 },
      { title: 'Photon interactions: photoelectric, Compton, pair production', minutes: 40 },
      { title: 'Attenuation, HVL and TVL', minutes: 30 },
    ],
  },
  {
    id: 'c2', title: 'Radiation Dosimetry', level: 'Intermediate',
    desc: 'Dose quantities, ionization chambers and calibration protocols.',
    lessons: [
      { title: 'Dose quantities and units', minutes: 25 },
      { title: 'Ionization chambers and electrometers', minutes: 35 },
      { title: 'Beam calibration (TG-51 / TRS-398)', minutes: 45 },
      { title: 'Percent depth dose and TMR', minutes: 30 },
    ],
  },
  {
    id: 'c3', title: 'Quality Assurance in Radiotherapy', level: 'Advanced',
    desc: 'Daily, monthly and annual QA of LINAC, CT and brachytherapy units.',
    lessons: [
      { title: 'QA philosophy and tolerances', minutes: 20 },
      { title: 'LINAC daily and monthly QA', minutes: 40 },
      { title: 'CT simulator QA', minutes: 30 },
      { title: 'Brachytherapy QA', minutes: 35 },
    ],
  },
]

// Set src to an mp4 path and the video will play. Example: '/videos/lecture1.mp4' (place files in public/videos/)
export const lectures: Lecture[] = [
  { id: 'l1', title: 'Introduction to Medical Physics', topic: 'Basic Radiation Physics', duration: '18:20', src: '' },
  { id: 'l2', title: 'Radioactive Decay and Half-life', topic: 'Basic Radiation Physics', duration: '24:05', src: '' },
  { id: 'l3', title: 'Photon Interactions with Matter', topic: 'Basic Radiation Physics', duration: '32:40', src: '' },
  { id: 'l4', title: 'Ionization Chamber Dosimetry', topic: 'Radiation Dosimetry', duration: '28:15', src: '' },
]

// Place PDF files in public/notes/
export const notes: Note[] = [
  { id: 'n1', title: 'Basic Radiation Physics — Summary Sheet', pages: 12, file: '/notes/basic-radiation-physics.pdf' },
  { id: 'n2', title: 'Dosimetry Formulas Cheat Sheet', pages: 4, file: '/notes/dosimetry-formulas.pdf' },
  { id: 'n3', title: 'LINAC QA Checklist', pages: 6, file: '/notes/linac-qa-checklist.pdf' },
]

export const quizzes: Quiz[] = [
  {
    id: 'q1', title: 'Radiation Physics Basics',
    questions: [
      { q: 'What is the SI unit of absorbed dose?', options: ['Sievert', 'Gray', 'Becquerel', 'Roentgen'], answer: 1, explain: 'Absorbed dose is measured in Gray (1 Gy = 1 J/kg).' },
      { q: 'Which interaction dominates for MV photons in water?', options: ['Photoelectric effect', 'Compton scattering', 'Pair production', 'Rayleigh scattering'], answer: 1, explain: 'In the therapeutic MV range, Compton scattering is dominant in low-Z materials like water.' },
      { q: 'What is the SI unit of activity?', options: ['Curie', 'Gray', 'Becquerel', 'Sievert'], answer: 2, explain: 'Activity is measured in Becquerel (1 Bq = 1 disintegration per second).' },
    ],
  },
  {
    id: 'q2', title: 'Radiation Protection',
    questions: [
      { q: 'ALARA stands for:', options: ['As Low As Reasonably Achievable', 'All Levels Are Reasonably Acceptable', 'As Little As Required Always', 'Average Level of Annual Radiation Absorbed'], answer: 0, explain: 'ALARA means keeping exposure as low as reasonably achievable.' },
      { q: 'Which radiation has the highest radiation weighting factor?', options: ['X-rays', 'Beta particles', 'Alpha particles', 'Gamma rays'], answer: 2, explain: 'Alpha particles have a weighting factor of 20.' },
      { q: 'Which of these reduces exposure from an external source?', options: ['Increasing time', 'Decreasing distance', 'Adding shielding', 'Removing barriers'], answer: 2, explain: 'Time, distance and shielding are the three basic protection principles. Shielding reduces exposure.' },
    ],
  },
]

export const calcProblems: CalcProblem[] = [
  {
    q: 'Dose rate is 100 cGy/min at 100 cm from a source. What is the dose rate at 120 cm? (cGy/min)',
    answer: 69.44, unit: 'cGy/min',
    solution: 'Inverse square law: 100 × (100/120)² = 69.44 cGy/min.',
  },
  {
    q: 'A Co-60 source (half-life 5.27 y) has 100% activity today. What percent remains after 10.54 years?',
    answer: 25, unit: '%',
    solution: '10.54 y = 2 half-lives, so 100 × (1/2)² = 25%.',
  },
  {
    q: 'A beam passes through 3 HVLs of shielding. What percent of the beam is transmitted?',
    answer: 12.5, unit: '%',
    solution: 'Transmission = (1/2)³ = 0.125 = 12.5%.',
  },
  {
    q: 'Prescribed dose is 200 cGy and machine output is 1.01 cGy/MU. How many MU are needed? (nearest whole number)',
    answer: 198, unit: 'MU',
    solution: 'MU = 200 / 1.01 = 198.02 ≈ 198 MU.',
  },
]