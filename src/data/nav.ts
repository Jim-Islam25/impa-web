export interface NavChild {
  label: string
  to: string
}

export interface NavItem {
  label: string
  to?: string
  children?: NavChild[]
}

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'About IMPA',
    children: [
      { label: 'About IMPA', to: '/about' },
      { label: 'Faculty', to: '/phase/phase-3/faculty' },
    ],
  },
  {
    label: 'Education & Training',
    children: [
      { label: 'Courses', to: '/phase/phase-1/courses' },
      { label: 'Free Learning', to: '/phase/phase-1' },
      { label: 'Clinical Cases', to: '/phase/phase-2/cases' },
      { label: 'Question Bank', to: '/phase/phase-2/qbank' },
      { label: 'Exams', to: '/phase/phase-2/mock' },
      { label: 'Certificates', to: '/phase/phase-2/certs' },
    ],
  },
  {
    label: 'Phases',
    children: [
      { label: 'Phase 1: Free', to: '/phase/phase-1' },
      { label: 'Phase 2: Premium', to: '/phase/phase-2' },
      { label: 'Phase 3: Premium', to: '/phase/phase-3' },
      { label: 'Phase 4: Coming soon', to: '/phase/phase-4' },
    ],
  },
  { label: 'Conferences & Events', to: '/conferences' },
  { label: 'Membership', to: '/membership' },
  { label: 'Publications', to: '/publications' },
  {
    label: 'Resources',
    children: [
      { label: 'Resources', to: '/resources' },
      { label: 'Clinical Simulator', to: '/simulator' },
    ],
  },
  { label: 'News', to: '/news' },
  { label: 'Contact', to: '/contact' },
]