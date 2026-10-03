export interface Param {
  name: string
  measured: number
  unit: string
  nominal: number
  tolerance: number
  mode: 'relative' | 'absolute'
}

export interface Scenario {
  id: string
  machine: string
  title: string
  params: Param[]
  note: string
}

export const machines = ['LINAC QA', 'Brachytherapy Unit', 'CT Scanner'] as const

export const scenarios: Scenario[] = [
  {
    id: 'linac-1',
    machine: 'LINAC QA',
    title: 'Daily QA — 10 MV photon',
    note: 'All parameters are within tolerance.',
    params: [
      { name: 'Output', measured: 1.01, unit: '', nominal: 1.0, tolerance: 2, mode: 'relative' },
      { name: 'Energy', measured: 10.2, unit: 'MV', nominal: 10, tolerance: 2, mode: 'relative' },
      { name: 'Symmetry', measured: 1.3, unit: '%', nominal: 0, tolerance: 2, mode: 'absolute' },
      { name: 'Flatness', measured: 2.1, unit: '%', nominal: 0, tolerance: 3, mode: 'absolute' },
    ],
  },
  {
    id: 'linac-2',
    machine: 'LINAC QA',
    title: 'Monthly QA — 6 MV photon',
    note: 'Output and flatness are out of tolerance.',
    params: [
      { name: 'Output', measured: 1.035, unit: '', nominal: 1.0, tolerance: 2, mode: 'relative' },
      { name: 'Energy', measured: 6.05, unit: 'MV', nominal: 6, tolerance: 2, mode: 'relative' },
      { name: 'Symmetry', measured: 1.1, unit: '%', nominal: 0, tolerance: 2, mode: 'absolute' },
      { name: 'Flatness', measured: 3.4, unit: '%', nominal: 0, tolerance: 3, mode: 'absolute' },
    ],
  },
  {
    id: 'brachy-1',
    machine: 'Brachytherapy Unit',
    title: 'Weekly QA — HDR Ir-192',
    note: 'All parameters are within tolerance.',
    params: [
      { name: 'Source position', measured: 0.6, unit: 'mm', nominal: 0, tolerance: 1, mode: 'absolute' },
      { name: 'Timer accuracy', measured: 0.4, unit: '%', nominal: 0, tolerance: 1, mode: 'absolute' },
      { name: 'Source strength', measured: 101.8, unit: 'U', nominal: 100, tolerance: 5, mode: 'relative' },
    ],
  },
  {
    id: 'brachy-2',
    machine: 'Brachytherapy Unit',
    title: 'Weekly QA — HDR Ir-192',
    note: 'Source position error exceeds tolerance.',
    params: [
      { name: 'Source position', measured: 1.8, unit: 'mm', nominal: 0, tolerance: 1, mode: 'absolute' },
      { name: 'Timer accuracy', measured: 0.3, unit: '%', nominal: 0, tolerance: 1, mode: 'absolute' },
      { name: 'Source strength', measured: 99.2, unit: 'U', nominal: 100, tolerance: 5, mode: 'relative' },
    ],
  },
  {
    id: 'ct-1',
    machine: 'CT Scanner',
    title: 'Daily QA — Water phantom',
    note: 'All parameters are within tolerance.',
    params: [
      { name: 'CT number (water)', measured: 2, unit: 'HU', nominal: 0, tolerance: 4, mode: 'absolute' },
      { name: 'Uniformity', measured: 3.1, unit: 'HU', nominal: 0, tolerance: 5, mode: 'absolute' },
      { name: 'Slice thickness', measured: 5.2, unit: 'mm', nominal: 5, tolerance: 10, mode: 'relative' },
    ],
  },
  {
    id: 'ct-2',
    machine: 'CT Scanner',
    title: 'Daily QA — Water phantom',
    note: 'CT number and uniformity are out of tolerance.',
    params: [
      { name: 'CT number (water)', measured: 6.5, unit: 'HU', nominal: 0, tolerance: 4, mode: 'absolute' },
      { name: 'Uniformity', measured: 6.2, unit: 'HU', nominal: 0, tolerance: 5, mode: 'absolute' },
      { name: 'Slice thickness', measured: 5.1, unit: 'mm', nominal: 5, tolerance: 10, mode: 'relative' },
    ],
  },
]

export const deviation = (p: Param): number => {
  const d = p.mode === 'relative' ? ((p.measured - p.nominal) / p.nominal) * 100 : p.measured - p.nominal
  return Math.round(d * 100) / 100
}

export const isPass = (p: Param): boolean => Math.abs(deviation(p)) <= p.tolerance

export const tolText = (p: Param): string =>
  `±${p.tolerance}${p.mode === 'relative' ? '%' : p.unit ? ' ' + p.unit : '%'}`