import type { JeansType, ProductInfo, ProductType } from '@prisma/client'

export interface CreateProductForm {
  images: File[]
  imagesUrl: string
  productName: string
  productDesc: string
  productPrice: number
  productType: string
  productInfo: string
  jeansType?: string
  productSizeXS: number
  productSizeS: number
  productSizeM: number
  productSizeL: number
  productSizeXL: number
}

export interface ProductTypeProps {
  label: 'Shirts' | 'Dresses' | 'Jeans' | 'Jackets' | 'Gymwear' | 'Blazers' | 'Shoes'
  value: ProductType
}

export interface JeansTypeProps {
  label: 'Normal' | 'Skinny' | 'Relaxed' | 'Bootcut' | 'Straight'
  value: JeansType
}

export interface ProductInfoProps {
  label: 'None' | 'New' | 'Sale'
  value: ProductInfo
}
