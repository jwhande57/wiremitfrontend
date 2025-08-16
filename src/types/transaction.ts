export interface Transaction {
  id: string;
  amount: number;
  currency: 'USD';
  targetCurrency: 'GBP' | 'ZAR';
  targetAmount: number;
  fee: number;
  feePercentage: number;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  reference: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 500,
    currency: 'USD',
    targetCurrency: 'GBP',
    targetAmount: 398.50,
    fee: 50,
    feePercentage: 10,
    recipient: 'Sarah Mukamuri - University of Oxford',
    status: 'completed',
    date: '2024-01-15T10:30:00Z',
    reference: 'WM001542'
  },
  {
    id: '2',
    amount: 300,
    currency: 'USD',
    targetCurrency: 'ZAR',
    targetAmount: 4320,
    fee: 60,
    feePercentage: 20,
    recipient: 'Michael Chivambo - University of Cape Town',
    status: 'completed',
    date: '2024-01-10T14:20:00Z',
    reference: 'WM001536'
  },
  {
    id: '3',
    amount: 800,
    currency: 'USD',
    targetCurrency: 'GBP',
    targetAmount: 636.80,
    fee: 80,
    feePercentage: 10,
    recipient: 'Sarah Mukamuri - University of Oxford',
    status: 'completed',
    date: '2024-01-05T09:15:00Z',
    reference: 'WM001521'
  },
  {
    id: '4',
    amount: 250,
    currency: 'USD',
    targetCurrency: 'ZAR',
    targetAmount: 3600,
    fee: 50,
    feePercentage: 20,
    recipient: 'Michael Chivambo - University of Cape Town',
    status: 'pending',
    date: '2024-01-20T16:45:00Z',
    reference: 'WM001558'
  },
  {
    id: '5',
    amount: 600,
    currency: 'USD',
    targetCurrency: 'GBP',
    targetAmount: 477.60,
    fee: 60,
    feePercentage: 10,
    recipient: 'Grace Ndoro - King\'s College London',
    status: 'completed',
    date: '2023-12-28T11:30:00Z',
    reference: 'WM001503'
  },
  {
    id: '6',
    amount: 400,
    currency: 'USD',
    targetCurrency: 'ZAR',
    targetAmount: 5760,
    fee: 80,
    feePercentage: 20,
    recipient: 'Trust Mhondiwa - University of Witwatersrand',
    status: 'completed',
    date: '2023-12-22T08:20:00Z',
    reference: 'WM001497'
  },
  {
    id: '7',
    amount: 1000,
    currency: 'USD',
    targetCurrency: 'GBP',
    targetAmount: 796.00,
    fee: 100,
    feePercentage: 10,
    recipient: 'Sarah Mukamuri - University of Oxford',
    status: 'completed',
    date: '2023-12-15T13:45:00Z',
    reference: 'WM001485'
  },
  {
    id: '8',
    amount: 350,
    currency: 'USD',
    targetCurrency: 'ZAR',
    targetAmount: 5040,
    fee: 70,
    feePercentage: 20,
    recipient: 'Michael Chivambo - University of Cape Town',
    status: 'completed',
    date: '2023-12-10T15:30:00Z',
    reference: 'WM001472'
  },
  {
    id: '9',
    amount: 750,
    currency: 'USD',
    targetCurrency: 'GBP',
    targetAmount: 597.00,
    fee: 75,
    feePercentage: 10,
    recipient: 'Grace Ndoro - King\'s College London',
    status: 'failed',
    date: '2023-12-05T10:15:00Z',
    reference: 'WM001461'
  },
  {
    id: '10',
    amount: 450,
    currency: 'USD',
    targetCurrency: 'ZAR',
    targetAmount: 6480,
    fee: 90,
    feePercentage: 20,
    recipient: 'Trust Mhondiwa - University of Witwatersrand',
    status: 'completed',
    date: '2023-11-28T12:00:00Z',
    reference: 'WM001448'
  },
  {
    id: '11',
    amount: 550,
    currency: 'USD',
    targetCurrency: 'GBP',
    targetAmount: 437.80,
    fee: 55,
    feePercentage: 10,
    recipient: 'Sarah Mukamuri - University of Oxford',
    status: 'completed',
    date: '2023-11-20T14:30:00Z',
    reference: 'WM001432'
  },
  {
    id: '12',
    amount: 200,
    currency: 'USD',
    targetCurrency: 'ZAR',
    targetAmount: 2880,
    fee: 40,
    feePercentage: 20,
    recipient: 'Michael Chivambo - University of Cape Town',
    status: 'completed',
    date: '2023-11-15T09:45:00Z',
    reference: 'WM001425'
  },
  {
    id: '13',
    amount: 900,
    currency: 'USD',
    targetCurrency: 'GBP',
    targetAmount: 716.40,
    fee: 90,
    feePercentage: 10,
    recipient: 'Grace Ndoro - King\'s College London',
    status: 'completed',
    date: '2023-11-10T16:20:00Z',
    reference: 'WM001418'
  },
  {
    id: '14',
    amount: 650,
    currency: 'USD',
    targetCurrency: 'ZAR',
    targetAmount: 9360,
    fee: 130,
    feePercentage: 20,
    recipient: 'Trust Mhondiwa - University of Witwatersrand',
    status: 'completed',
    date: '2023-11-05T11:10:00Z',
    reference: 'WM001404'
  },
  {
    id: '15',
    amount: 425,
    currency: 'USD',
    targetCurrency: 'GBP',
    targetAmount: 338.30,
    fee: 42.50,
    feePercentage: 10,
    recipient: 'Sarah Mukamuri - University of Oxford',
    status: 'completed',
    date: '2023-10-30T13:55:00Z',
    reference: 'WM001391'
  }
];