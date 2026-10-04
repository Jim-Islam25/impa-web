export interface Plan {
  id: string
  name: string
  price: string
  period: string
  days: number
}

export const site = {
  shortName: 'IMPA',
  fullName: 'International Medical Physics Association',
  // Change this to your real email. Payment details are sent to this address.
  email: 'info@impa.example',

  // Keep null until you create your signing key on the /issue page, then paste the public key here.
  publicKey: null as JsonWebKey | null,

  plans: [
    { id: 'monthly', name: 'Monthly', price: 'USD 5', period: 'per month', days: 30 },
    { id: 'yearly', name: 'Yearly', price: 'USD 45', period: 'per year', days: 365 },
  ] as Plan[],

  // Replace with your real bank details.
  bank: {
    name: 'Your bank name',
    accountName: 'Account holder name',
    accountNumber: '0000 0000 0000',
  },
}