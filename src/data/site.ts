export interface Plan {
  id: string
  name: string
  price: string
  period: string
  days: number
  perks: string[]
}

export const site = {
  shortName: 'IMPA',
  fullName: 'International Medical Physics Association',
  // Change this to your real email. Payment requests and forms go to this address.
  email: 'info@impa.example',

  // Paste your public signing key here (see the Issue page). Keep it as null until you create it.
publicKey: {
  "kty": "EC",
  "crv": "P-256",
  "x": "....",
  "y": "...."
} as JsonWebKey | null,
  plans: [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 'USD 5',
      period: 'per month',
      days: 30,
      perks: ['All Phase 2 and Phase 3 premium sections', 'Clinical cases, question bank and mock exam', 'Certificate, live class and mentoring access'],
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: 'USD 45',
      period: 'per year',
      days: 365,
      perks: ['Everything in Monthly', 'Best value for long term learners', 'Priority access to new features'],
    },
  ] as Plan[],

  // Replace with your real bank details.
  bankDetails: [
    { label: 'Bank name', value: 'Your bank name' },
    { label: 'Account number', value: '0000 0000 0000' },
    { label: 'SWIFT / routing code', value: 'Code (optional)' },
  ],
  bankNote: 'After you pay, submit the transfer reference number or the transaction ID from your bank receipt.',
}