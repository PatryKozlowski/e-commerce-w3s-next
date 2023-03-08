import type { JeansType, ProductType } from '@prisma/client'

export interface Props {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    product: ProductType | null | undefined
    jeansType?: JeansType | null | undefined
    size: string
    quantity: number
  }
}
