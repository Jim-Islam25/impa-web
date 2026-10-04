export type Tone = 'free' | 'premium' | 'soon' | 'sim'

export interface Slide {
  id: number
  tag: string
  tone: Tone
  title: string
  text: string
  items: string[]
  cta: string
  to: string
}

export const slides: Slide[] = [
  {
    id: 1,
    tag: 'Phase 1 — FREE',
    tone: 'free',
    title: 'Free Learning Hub',
    text: 'Open access medical physics education for everyone.',
    items: ['Courses', 'Video Lectures', 'Lecture Notes', 'Quizzes', 'Calculation Questions'],
    cta: 'Explore Free Courses',
    to: '/phase/phase-1',
  },
  {
    id: 2,
    tag: 'Phase 2 — PREMIUM',
    tone: 'premium',
    title: 'Clinical Prep & Assessment',
    text: 'Prepare for certification with real clinical practice.',
    items: ['Clinical Cases', 'Question Bank', 'Mock Exams', 'Certificates'],
    cta: 'View Assessments',
    to: '/phase/phase-2',
  },
  {
    id: 3,
    tag: 'Phase 3 — PREMIUM',
    tone: 'premium',
    title: 'Live & Research Hub',
    text: 'Learn directly from global faculty and researchers.',
    items: ['Live Classes', 'Faculty', 'Research Center', 'Student Accounts'],
    cta: 'Meet Faculty',
    to: '/phase/phase-3',
  },
  {
    id: 4,
    tag: 'Phase 4 — COMING SOON',
    tone: 'soon',
    title: 'Advanced Tech & Community',
    text: 'AI-powered learning and a worldwide professional network.',
    items: ['AI Tutor', 'Advanced LMS', 'Mobile App', 'Global Community'],
    cta: "See What's Coming",
    to: '/phase/phase-4',
  },
  {
    id: 5,
    tag: 'Special Feature',
    tone: 'sim',
    title: 'Clinical Medical Physics Simulator',
    text: 'Get LINAC QA measurements, decide PASS or FAIL and justify your clinical reasoning.',
    items: ['Output 1.01 (±2%)', 'Energy 10.2 (±2%)', 'Symmetry 1.3% (±2%)', 'Flatness 2.1% (±3%)'],
    cta: 'Try Simulator',
    to: '/simulator',
  },
]