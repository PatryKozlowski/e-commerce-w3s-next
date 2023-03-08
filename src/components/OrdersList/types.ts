import type { DeliveryStatus, OrderStatus, PaymentStatus } from '@prisma/client'

export interface OrderProps {
  orders: Array<{
    id: string
    productId: string[]
    images: string[]
    total: number
    date: number
    status: OrderStatus
    delivery: DeliveryStatus
    payment: PaymentStatus
  }>
}

export interface SelectedValueProps {
  status: string
  payment: string
  delivery: string
}
