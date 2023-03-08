import type { DeliveryStatus, OrderStatus, PaymentStatus } from '@prisma/client'

export interface StatusOrderProps {
  orderInfo: string
  orderId?: string
  orderDate?: number
  orderTotal?: number
  status?: OrderStatus
  delivery?: DeliveryStatus
  payment?: PaymentStatus
}
