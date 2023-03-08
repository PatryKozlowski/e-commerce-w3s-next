import type { DeliveryStatus, OrderStatus, PaymentStatus } from '@prisma/client'

export interface OrderProps {
  id: string
  productId: string[]
  images: string[]
  total: number
  date: number
  status: OrderStatus
  delivery: DeliveryStatus
  payment: PaymentStatus
}
