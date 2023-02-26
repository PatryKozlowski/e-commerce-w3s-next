import type { Session } from 'next-auth'
import type { ReactNode } from 'react'

export interface ProvidersProps {
  children: ReactNode
  session: Session | null
}
