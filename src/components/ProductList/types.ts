import { JeansType, ProductInfo, ProductType, SizeL, SizeM, SizeS, SizeXL, SizeXS } from '@prisma/client'

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

export interface SizesProps {
  sizeXS: SizeXS[]
  sizeS: SizeS[]
  sizeM: SizeM[]
  sizeL: SizeL[]
  sizeXL: SizeXL[]
}
