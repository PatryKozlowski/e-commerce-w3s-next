import type { SizeL, SizeM, SizeS, SizeXL, SizeXS } from '@prisma/client'

export interface EditProdutForm {
  productName: string
  productDesc: string
  productPrice: number
  productSizeXS: number
  productSizeS: number
  productSizeM: number
  productSizeL: number
  productSizeXL: number
}

export type enabledOptions = 'productName' | 'productDesc' | 'productSize' | 'productPrice'

export interface ProductEditProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
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
