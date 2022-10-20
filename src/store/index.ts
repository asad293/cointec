import create from 'zustand'

import { devtools } from 'zustand/middleware'

type StoreState = {
  senderCurrency: string
  senderAmount?: number
  recipientCurrency: string
  recipientAmount?: number

  setSenderCurrency: (currency: string) => void
  setSenderAmount: (amount?: number) => void
  setRecipientCurrency: (currency: string) => void
  setRecipientAmount: (amount?: number) => void
}

export const useStore = create<StoreState>()(
  devtools((set) => ({
    senderCurrency: 'GBP',
    recipientCurrency: 'ETH',

    setSenderCurrency: (currency) => set({ senderCurrency: currency }),
    setSenderAmount: (amount) => set({ senderAmount: amount }),
    setRecipientCurrency: (currency) => set({ recipientCurrency: currency }),
    setRecipientAmount: (amount) => set({ recipientAmount: amount }),
  }))
)
