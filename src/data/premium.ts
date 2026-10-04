import type { Quiz } from '@/data/content'

export interface ClinicalCase {
  id: string
  title: string
  setting: string
  details: string[]
  question: string
  answer: string[]
}

export const clinicalCases: ClinicalCase[] = [
  {
    id: 'case1',
    title: 'Daily output reads +2.8 percent',
    setting: 'Radiotherapy department, 6 MV linear accelerator, morning QA',
    details: [
      'Daily output check reads 2.8 percent above the baseline value.',
      'The daily action level in your department is 3 percent.',
      'Yesterday the reading was +2.1 percent and the day before it was +1.4 percent.',
    ],
    question: 'The machine is within the action level today. What do you do?',
    answer: [
      'Repeat the measurement and confirm temperature and pressure correction before accepting the value.',
      'Recognise the upward trend over three days even though today is within tolerance.',
      'Inform the responsible physicist and check the monitor chamber and the previous monthly output calibration.',
      'Plan an output correction before the trend reaches the action level, and document everything.',
    ],
  },
  {
    id: 'case2',
    title: 'Prostate IMRT plan fails the rectum constraint',
    setting: 'Treatment planning review before plan approval',
    details: [
      'Target coverage is acceptable and the plan is deliverable.',
      'A rectum dose-volume constraint required by your protocol is not met.',
      'The patient had a full bladder and an empty rectum on the planning CT.',
    ],
    question: 'Should the plan be approved? What are your next steps?',
    answer: [
      'Do not approve the plan as it is. Report the failed constraint to the radiation oncologist.',
      'Check the contours, the margin around the target and the optimisation objectives.',
      'Re-optimise or re-plan, and ask whether a spacer or a different preparation protocol is useful.',
      'Approve only when the constraint is met, or when the physician documents an accepted deviation.',
    ],
  },
  {
    id: 'case3',
    title: 'Wrong wedge recorded in a breast plan',
    setting: 'Treatment unit, second fraction',
    details: [
      'The therapist notices the wedge angle on the machine does not match the plan printout.',
      'The first fraction has already been delivered.',
    ],
    question: 'What should happen immediately and afterwards?',
    answer: [
      'Stop and do not continue the treatment until the discrepancy is resolved.',
      'Inform the physicist and the physician, and compare the plan, the record and verify system.',
      'Estimate the dose delivered in the first fraction with the wrong setting and decide on corrective action.',
      'File an incident report and review the process to find the root cause.',
    ],
  },
  {
    id: 'case4',
    title: 'Brachytherapy source position error of 1.8 mm',
    setting: 'Weekly HDR afterloader QA',
    details: [
      'The source position check shows 1.8 mm deviation.',
      'The tolerance in your protocol is 1 mm.',
      'Timer accuracy and source strength are within tolerance.',
    ],
    question: 'Can the unit be used for treatment today?',
    answer: [
      'No. The unit stays out of clinical use until the error is investigated.',
      'Repeat the check with a fresh set-up, and inspect the transfer tube, the check ruler and the applicator connection.',
      'Contact the service engineer if the error is confirmed, then repeat the full QA after repair.',
      'Document the failure, the action taken and the re-verification before restarting treatments.',
    ],
  },
]

export const qbankSets: Quiz[] = [
  {
    id: 'qb1',
    title: 'Radiation physics',
    questions: [
      {
        q: 'Which photon interaction depends strongly on atomic number and dominates at low energies?',
        options: ['Photoelectric effect', 'Compton scattering', 'Pair production', 'Coherent scattering'],
        answer: 0,
        explain: 'The photoelectric probability varies roughly with Z cubed divided by energy cubed.',
      },
      {
        q: 'Compton scattering probability mainly depends on:',
        options: ['Atomic number cubed', 'Electron density', 'Nuclear charge squared', 'Photon polarisation'],
        answer: 1,
        explain: 'Compton scattering is mostly independent of Z and depends on the electron density of the material.',
      },
      {
        q: 'The threshold energy for pair production is:',
        options: ['0.511 MeV', '1.022 MeV', '2.044 MeV', '10 MeV'],
        answer: 1,
        explain: 'Two electron rest masses are needed, 2 x 0.511 MeV = 1.022 MeV.',
      },
      {
        q: 'Approximate half-life of Ir-192 used in HDR brachytherapy:',
        options: ['5.27 years', '73.8 days', '30 years', '6 hours'],
        answer: 1,
        explain: 'Ir-192 has a half-life of about 73.8 days, so sources are replaced every few months.',
      },
      {
        q: 'One tenth value layer (TVL) is approximately how many half value layers?',
        options: ['2', '3.3', '5', '10'],
        answer: 1,
        explain: 'TVL = 3.32 x HVL, because 2 raised to 3.32 is about 10.',
      },
    ],
  },
  {
    id: 'qb2',
    title: 'Dosimetry',
    questions: [
      {
        q: 'Kerma stands for:',
        options: [
          'Kinetic energy released per unit mass',
          'Kinetic energy retained in the medium',
          'Known energy released in matter',
          'Kilovoltage energy rate in material',
        ],
        answer: 0,
        explain: 'Kerma is the kinetic energy released per unit mass, measured in gray.',
      },
      {
        q: 'For a vented ion chamber, if the air temperature rises, the temperature-pressure correction factor:',
        options: ['Increases', 'Decreases', 'Stays equal to 1', 'Becomes negative'],
        answer: 0,
        explain: 'CTP = (273.2 + T) / 295.2 x 101.33 / P, so a higher temperature gives a larger factor.',
      },
      {
        q: 'TRS-398 is a code of practice published by:',
        options: ['AAPM', 'IAEA', 'ICRU', 'ESTRO'],
        answer: 1,
        explain: 'TRS-398 is the IAEA code of practice for absorbed dose determination in external beam radiotherapy.',
      },
      {
        q: 'The depth of maximum dose for a 6 MV photon beam is about:',
        options: ['0.5 cm', '1.5 cm', '3 cm', '5 cm'],
        answer: 1,
        explain: 'For 6 MV photons dmax is approximately 1.5 cm.',
      },
      {
        q: 'For photon beams, percent depth dose at a given depth generally increases with:',
        options: ['Increasing beam energy', 'Decreasing beam energy', 'Decreasing SSD', 'Decreasing field size'],
        answer: 0,
        explain: 'Higher energy beams are more penetrating, so PDD at depth is higher.',
      },
    ],
  },
  {
    id: 'qb3',
    title: 'Quality assurance and safety',
    questions: [
      {
        q: 'ALARA stands for:',
        options: [
          'As Low As Reasonably Achievable',
          'All Levels Are Reasonably Acceptable',
          'As Little As Required Always',
          'Average Level of Annual Radiation Absorbed',
        ],
        answer: 0,
        explain: 'ALARA means keeping exposure as low as reasonably achievable.',
      },
      {
        q: 'Doubling the distance from a point source changes the dose rate by a factor of:',
        options: ['1/2', '1/4', '1/8', '2'],
        answer: 1,
        explain: 'Inverse square law: (1/2)^2 = 1/4.',
      },
      {
        q: 'AAPM TG-142 covers quality assurance of:',
        options: ['Brachytherapy sources', 'Medical accelerators', 'CT simulators', 'Dosimeters'],
        answer: 1,
        explain: 'TG-142 describes QA for medical accelerators.',
      },
      {
        q: 'The ICRP occupational effective dose limit, averaged over 5 years, is:',
        options: ['1 mSv per year', '5 mSv per year', '20 mSv per year', '50 mSv per year'],
        answer: 2,
        explain: 'ICRP recommends 20 mSv per year averaged over defined 5 year periods.',
      },
      {
        q: 'A QA parameter is outside tolerance. The correct first action is to:',
        options: [
          'Continue treating and monitor',
          'Repeat the measurement to confirm, then follow the department action protocol',
          'Ignore it if the deviation is small',
          'Widen the tolerance',
        ],
        answer: 1,
        explain: 'Confirm the result first, then follow the action protocol. Tolerances are never changed to make a machine pass.',
      },
    ],
  },
]

export const mockExam: Quiz = {
  id: 'mock1',
  title: 'Mock Exam 1',
  questions: qbankSets.flatMap((s) => s.questions),
}

export const liveSessions = [
  { title: 'Introduction to LINAC QA', topic: 'Daily, monthly and annual tests', level: 'Beginner' },
  { title: 'Reading a treatment plan', topic: 'DVH, constraints and plan evaluation', level: 'Intermediate' },
  { title: 'Brachytherapy physics', topic: 'Source calibration and HDR QA', level: 'Intermediate' },
  { title: 'Exam preparation clinic', topic: 'Past questions and answer technique', level: 'All levels' },
]

export const facultyRoles = [
  { role: 'Clinical medical physicist, external beam radiotherapy', focus: 'LINAC QA, IMRT and VMAT' },
  { role: 'Clinical medical physicist, brachytherapy', focus: 'HDR and LDR, source calibration' },
  { role: 'Imaging physicist', focus: 'CT, MRI and radiation protection' },
  { role: 'Researcher and educator', focus: 'Research methods and paper writing' },
]

export const researchProjects = [
  { title: 'QA tolerance trends across departments', desc: 'Collect and compare daily QA data to study drift patterns.', status: 'Open for collaborators' },
  { title: 'Medical physics education in low-resource settings', desc: 'Survey of training needs and access to learning material.', status: 'Planning' },
  { title: 'Simulator based assessment of QA decisions', desc: 'Study how simulated cases improve decision making of trainees.', status: 'Planning' },
]