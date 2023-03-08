import type { JeansType, ProductInfo, ProductType } from '@prisma/client'

export interface ResponseProps {
  status: number
  message: string
}

export interface CheckoutSessionProps extends ResponseProps {
  id: string
}

export interface ProductSizes {
  id: string
  productId: string
  size: string
  stock: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductListProps {
  id: string
  product: ProductType
  name: string
  description: string
  image: string
  price: number
  jeansType: JeansType | null | undefined
  info: ProductInfo | null | undefined
}

export interface ProductProps {
  id: string
  image: string
  name: string
  description: string
  price: number
}
