export type Access = 'free' | 'premium' | 'soon'

export interface Feature {
  key: string
  title: string
  desc: string
  icon: string
  access: Access
  preview?: string[]
}

export interface Phase {
  slug: string
  tag: string
  title: string
  subtitle: string
  features: Feature[]
}

export const phases: Phase[] = [
  {
    slug: 'phase-1',
    tag: 'Phase 1 — FREE',
    title: 'Free Learning Hub',
    subtitle: 'Open access medical physics education',
    features: [
      { key: 'courses', icon: '📚', title: 'Courses', desc: 'Structured basic and advanced medical physics curriculum modules.', access: 'free' },
      { key: 'lectures', icon: '🎬', title: 'Video Lectures', desc: 'Video lectures linked with every course chapter.', access: 'free' },
      { key: 'notes', icon: '📝', title: 'Lecture Notes', desc: 'Downloadable PDFs, handouts and revision sheets.', access: 'free' },
      { key: 'quizzes', icon: '❓', title: 'Quizzes', desc: 'Chapter-wise MCQs for self-assessment.', access: 'free' },
      { key: 'calculations', icon: '🧮', title: 'Calculation Questions', desc: 'Numerical problem-solving for clinical physics practice.', access: 'free' },
    ],
  },
  {
    slug: 'phase-2',
    tag: 'Phase 2',
    title: 'Clinical Prep & Assessment',
    subtitle: 'Premium — prepare for certification with real clinical practice',
    features: [
      {
        key: 'cases', icon: '🏥', title: 'Clinical Cases', access: 'premium',
        desc: 'Real-world patient case studies, dosimetry planning scenarios and troubleshooting.',
        preview: ['Case 1: Prostate IMRT plan — rectum constraint failed', 'Case 2: Daily QA output drifted +2.8%', 'Case 3: Wrong wedge used in breast plan', 'Case 4: Brachytherapy source position error'],
      },
      {
        key: 'qbank', icon: '🗂️', title: 'Question Bank', access: 'premium',
        desc: 'Comprehensive board-exam style practice questions.',
        preview: ['Q1. Which interaction dominates at 6 MV in water?', 'Q2. TG-142 daily output tolerance is…', 'Q3. HVL of a 6 MV beam in lead is approximately…', 'Q4. Calculate MU for 200 cGy at dmax…'],
      },
      {
        key: 'mock', icon: '⏱️', title: 'Mock Exams', access: 'premium',
        desc: 'Timed simulation tests mimicking real certification exams.',
        preview: ['Mock Exam 1 — 100 questions, 120 minutes', 'Mock Exam 2 — Radiation Physics', 'Mock Exam 3 — Treatment Planning & QA', 'Detailed score report after every exam'],
      },
      {
        key: 'certs', icon: '🎓', title: 'Certificates', access: 'premium',
        desc: 'Automated verified digital certificate after course and mock exam completion.',
        preview: ['Verified digital certificate', 'Unique certificate ID', 'Shareable on LinkedIn', 'Downloadable PDF'],
      },
    ],
  },
  {
    slug: 'phase-3',
    tag: 'Phase 3',
    title: 'Live & Research Hub',
    subtitle: 'Premium — learn directly from global faculty and researchers',
    features: [
      {
        key: 'live', icon: '📡', title: 'Live Classes', access: 'premium',
        desc: 'Interactive live lectures and Q&A sessions.',
        preview: ['Weekly live class schedule', 'Live Q&A with faculty', 'Recorded sessions for members', 'Class reminders'],
      },
      {
        key: 'faculty', icon: '👩‍🏫', title: 'Faculty Directory', access: 'premium',
        desc: 'Profiles of global medical physicists, mentors and office-hour booking.',
        preview: ['Faculty profiles and specialities', 'Book 1-to-1 office hours', 'Mentor matching', 'Career guidance sessions'],
      },
      {
        key: 'research', icon: '🔬', title: 'Research Center', access: 'premium',
        desc: 'Research projects, publication guidelines and collaboration boards.',
        preview: ['Open research projects', 'Paper writing guidelines', 'Collaboration board', 'Journal club'],
      },
      {
        key: 'accounts', icon: '👤', title: 'Student Accounts', access: 'premium',
        desc: 'Personal dashboard, progress tracker and session logs.',
        preview: ['Personal dashboard', 'Progress tracker', 'Enrolled course history', 'Session logs'],
      },
    ],
  },
  {
    slug: 'phase-4',
    tag: 'Phase 4',
    title: 'Advanced Tech & Community',
    subtitle: 'Coming soon — AI-powered learning and a worldwide network',
    features: [
      { key: 'ai', icon: '🤖', title: 'AI Tutor', access: 'soon', desc: 'Personalized AI chatbot for instant doubt-solving.', preview: ['Ask any medical physics question', 'Step-by-step calculation help', 'Personalized study plan'] },
      { key: 'lms', icon: '📊', title: 'Advanced LMS', access: 'soon', desc: 'Deep analytics dashboards.', preview: ['Learning analytics', 'Weak-topic detection', 'Cohort reports'] },
      { key: 'app', icon: '📱', title: 'Mobile App', access: 'soon', desc: 'Android/iOS app for on-the-go learning.', preview: ['Offline notes', 'Push reminders', 'Mobile quizzes'] },
      { key: 'community', icon: '🌍', title: 'Global Community', access: 'soon', desc: 'Forums and peer groups for medical physicists.', preview: ['Discussion boards', 'Country groups', 'Job and fellowship board'] },
    ],
  },
]