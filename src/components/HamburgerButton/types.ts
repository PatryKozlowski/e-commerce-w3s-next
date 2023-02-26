import type { Transition } from 'framer-motion'

export interface Props {
  isOpen?: boolean
  color?: string
  strokeWidth?: string | number
  transition?: Transition | null
  lineProps?: any
  width?: number
  height?: number
  className?: string
  onClick: () => void
}
