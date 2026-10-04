import { site } from '@/data/site'

export interface Card {
  title: string
  text: string
  tag?: string
  to?: string
}

export interface LinkItem {
  label: string
  note?: string
  href?: string
  to?: string
}

export interface Section {
  heading: string
  text?: string
  items?: string[]
  cards?: Card[]
  table?: { head: string[]; rows: string[][] }
  links?: LinkItem[]
}

export interface InfoPage {
  key: string
  title: string
  subtitle: string
  kind?: 'contact' | 'join'
  sections: Section[]
  cta?: { label: string; to: string }
}

export const pages: InfoPage[] = [
  {
    key: 'about',
    title: `About ${site.shortName}`,
    subtitle: site.fullName,
    sections: [
      {
        heading: 'Who we are',
        text: `${site.shortName} stands for ${site.fullName}. We are a global community and learning hub for medical physics, built for students, residents, practising medical physicists and educators.`,
      },
      {
        heading: 'Our mission',
        text: 'To make high quality medical physics education open to everyone, and to prepare learners for real clinical decisions in radiation oncology and medical imaging.',
      },
      {
        heading: 'Our vision',
        text: 'A world where every cancer patient is treated safely and accurately by a well trained medical physics team, wherever they live.',
      },
      {
        heading: 'What we offer',
        items: [
          'Free learning hub: courses, video lectures, notes, quizzes and calculation practice',
          'Clinical preparation: clinical cases, question bank, mock exams and certificates',
          'Live classes, faculty mentoring and a research centre',
          'The IMPA Clinical Medical Physics Simulator for hands-on QA decisions',
        ],
      },
      {
        heading: 'Our values',
        items: ['Patient safety first', 'Open and affordable education', 'Evidence based practice', 'Global collaboration', 'Integrity and transparency'],
      },
    ],
    cta: { label: `Join ${site.shortName}`, to: '/join' },
  },
  {
    key: 'conferences',
    title: 'Conferences & Events',
    subtitle: 'Webinars, workshops and annual meetings.',
    sections: [
      {
        heading: 'Upcoming events',
        cards: [
          { title: 'IMPA online webinar series', tag: 'Dates to be announced', text: 'Short talks by medical physicists on clinical topics, followed by questions and answers.' },
          { title: 'Hands on QA workshop', tag: 'Dates to be announced', text: 'Practical session on LINAC daily and monthly QA with real measurement examples.' },
          { title: 'IMPA annual meeting', tag: 'Dates to be announced', text: 'Yearly gathering for students, residents and professionals, with posters and talks.' },
        ],
      },
      {
        heading: 'Types of events',
        items: ['Online webinars with expert speakers', 'Hands on workshops', 'Annual IMPA meeting', 'Student and resident sessions'],
      },
      {
        heading: 'Call for abstracts',
        text: 'Members will be able to submit abstracts for oral and poster presentations. Submission guidelines will be shared before each event.',
      },
      {
        heading: 'Want to host or speak?',
        text: 'Write to us with your topic or proposal and we will get back to you.',
      },
    ],
    cta: { label: 'Contact us about events', to: '/contact' },
  },
  
     {
    key: 'membership',
    title: 'Membership',
    subtitle: `Become part of the ${site.shortName} professional community.`,
    sections: [
      {
        heading: 'Choose your membership',
        cards: [
          {
            title: 'Free member',
            tag: 'Free',
            text: 'Full access to Phase 1: courses, video lectures, notes, quizzes and calculation practice, plus the Clinical Simulator. No sign up needed.',
            to: '/phase/phase-1',
          },
          {
            title: 'Premium member',
            tag: 'Premium',
            text: 'Everything in Free, plus clinical cases, question bank, mock exams, certificates, live classes, faculty mentoring and the research centre.',
            to: '/phase/phase-2',
          },
          {
            title: 'Institutional member',
            tag: 'Custom',
            text: 'Accounts for departments and training programmes, trainee progress reports, and custom workshops. Contact us for details.',
            to: '/contact',
          },
        ],
      },
      {
        heading: 'How to get premium access',
        items: [
          'Open any premium section and choose a plan',
          'Pay by bank transfer and send us your transfer reference',
          'We confirm your payment and email you an activation link',
          'Open the link and all premium sections unlock automatically',
        ],
      },
      {
        heading: 'Payments',
        text: 'Bank transfer is supported now. Card payments are planned for a later release.',
      },
      {
        heading: 'Member benefits',
        items: ['Learning material prepared by practising medical physicists', 'Mentoring and career guidance', 'Priority registration for events', 'A global professional network'],
      },
    ],
    cta: { label: 'Get premium access', to: '/phase/phase-2' },
  },
  {
    key: 'publications',
    title: 'Publications',
    subtitle: 'Journals, guidelines, reports and research papers.',
    sections: [
      {
        heading: 'What we publish',
        cards: [
          { title: 'IMPA newsletter', text: 'Updates, learning tips and community highlights for members.' },
          { title: 'Technical notes and guidelines', text: 'Short practical documents on QA, dosimetry and radiation safety.' },
          { title: 'Educational articles', text: 'Step by step explanations of core medical physics topics.' },
          { title: 'Member research', text: 'Abstracts and papers shared by IMPA members.' },
        ],
      },
      {
        heading: 'Submit your work',
        items: ['Prepare a short summary of your article or research', 'Send it to the IMPA team by email', 'Our reviewers reply with feedback', 'Accepted work is published here'],
      },
      {
        heading: 'Reading list',
        links: [
          { label: 'AAPM reports and task groups', href: 'https://www.aapm.org', note: 'Task group reports such as TG-51 and TG-142' },
          { label: 'IAEA human health publications', href: 'https://www.iaea.org', note: 'Including TRS-398' },
          { label: 'ICRU reports', href: 'https://www.icru.org', note: 'Dose and measurement quantities' },
        ],
      },
    ],
    cta: { label: 'Contact the editorial team', to: '/contact' },
  },
  {
    key: 'resources',
    title: 'Resources',
    subtitle: 'Useful tools, formulas, checklists and reading lists.',
    sections: [
      {
        heading: 'Quick formula sheet',
        table: {
          head: ['Topic', 'Formula', 'Note'],
          rows: [
            ['Inverse square law', 'I2 = I1 x (d1 / d2)^2', 'Point source, same medium'],
            ['Radioactive decay', 'A = A0 x e^(-lambda x t)', 'lambda = 0.693 / half-life'],
            ['Shielding', 'Transmission = (1/2)^n', 'n = number of HVLs'],
            ['TVL and HVL', 'TVL = 3.32 x HVL', 'Tenth value layer'],
            ['Monitor units', 'MU = Dose / (Output x Factors)', 'Use the correct calibration factors'],
            ['Equivalent square', 'Eq. square = 4 x Area / Perimeter', 'For rectangular fields'],
            ['CT number', 'HU = 1000 x (mu - mu_water) / mu_water', 'Water = 0 HU, air = -1000 HU'],
          ],
        },
      },
      {
        heading: 'Free downloads and practice',
        links: [
          { label: 'Lecture notes and cheat sheets', to: '/phase/phase-1/notes', note: 'PDF summaries and checklists' },
          { label: 'Free quizzes', to: '/phase/phase-1/quizzes', note: 'Chapter wise multiple choice questions' },
          { label: 'Calculation practice', to: '/phase/phase-1/calculations', note: 'Numerical problems with solutions' },
          { label: 'IMPA Clinical Medical Physics Simulator', to: '/simulator', note: 'Decide PASS or FAIL on QA measurements' },
        ],
      },
      {
        heading: 'Recommended organisations and protocols',
        links: [
          { label: 'AAPM', href: 'https://www.aapm.org', note: 'TG-51, TG-142 and other task group reports' },
          { label: 'IAEA', href: 'https://www.iaea.org', note: 'TRS-398 code of practice' },
          { label: 'ESTRO', href: 'https://www.estro.org', note: 'European radiotherapy guidelines and courses' },
          { label: 'IOMP', href: 'https://www.iomp.org', note: 'International Organization for Medical Physics' },
        ],
      },
      {
        heading: 'Study tips',
        items: ['Learn the formulas by solving problems, not only by reading', 'Always check units in calculations', 'Practise QA decisions with the simulator', 'Review wrong answers in quizzes the same day'],
      },
    ],
    cta: { label: 'Open free learning hub', to: '/phase/phase-1' },
  },
  {
    key: 'news',
    title: 'News',
    subtitle: `Latest updates from ${site.shortName} and the medical physics world.`,
    sections: [
      {
        heading: 'Latest from IMPA',
        cards: [
          { title: 'IMPA website is live', tag: 'Update', text: 'The free learning hub is open with courses, quizzes and calculation practice.', to: '/phase/phase-1' },
          { title: 'Clinical Medical Physics Simulator released', tag: 'Update', text: 'Practise PASS or FAIL decisions on LINAC, brachytherapy and CT QA measurements.', to: '/simulator' },
          { title: 'Premium sections for members', tag: 'Update', text: 'Clinical cases, question bank, mock exam, certificate preview, live classes, faculty and research pages are open to members.', to: '/membership' },
          { title: 'Phase 4 in development', tag: 'Coming soon', text: 'AI tutor, advanced learning analytics, a mobile app and a global community are being planned.', to: '/phase/phase-4' },
        ],
      },
      {
        heading: 'Stay updated',
        text: 'Join IMPA to hear about new courses, events and features first.',
      },
    ],
    cta: { label: `Join ${site.shortName}`, to: '/join' },
  },
  {
    key: 'contact',
    title: 'Contact',
    subtitle: 'Questions, partnerships or feedback? Get in touch.',
    kind: 'contact',
    sections: [
      {
        heading: 'Get in touch',
        text: `Email us at ${site.email} or use the form below. We usually reply within a few working days.`,
      },
      {
        heading: 'You can write to us about',
        items: ['Membership and premium access', 'Courses and exams', 'Partnerships and collaboration', 'Technical support', 'Feedback and suggestions'],
      },
    ],
  },
  {
    key: 'join',
    title: `Join ${site.shortName}`,
    subtitle: 'Start learning today and become part of the community.',
    kind: 'join',
    sections: [
      {
        heading: 'What you get',
        items: ['Free access to the Phase 1 learning hub and the simulator', 'Premium access to clinical preparation, live classes and mentoring', 'A global professional community'],
      },
      {
        heading: 'What happens next',
        items: ['Fill in the form below and send it', 'We reply with the next steps', 'Premium members receive an access code to unlock premium sections'],
      },
    ],
  },
]