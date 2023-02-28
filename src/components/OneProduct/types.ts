import type { JeansType, ProductType, SizeL, SizeM, SizeS, SizeXL, SizeXS } from '@prisma/client'

export interface OneProductProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    product: ProductType | null
    jeansType?: JeansType | null
    sizeXS: SizeXS[]
    sizeS: SizeS[]
    sizeM: SizeM[]
    sizeL: SizeL[]
    sizeXL: SizeXL[]
  } | null
  sizes: Array<{
    id: string
    productId: string
    size: string
    stock: number
    createdAt: Date
    updatedAt: Date
  }>
}

export interface HandleProduct {
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
