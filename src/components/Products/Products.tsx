import type { ProductsProps } from './types'
import styles from './Products.module.scss'
import Product from '../Product/Product'
import { useMemo } from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'

const Products = ({ products }: ProductsProps): JSX.Element => {
  const searchPhrase = useAppSelector((state) => state?.search?.search) ?? ''
  const filteredProducts = useMemo(() => {
    const searchPhraseUpperCase = searchPhrase.toUpperCase()
    return products?.filter((p) => {
      return (
        p.name.toUpperCase().includes(searchPhraseUpperCase) ||
        p.price.toString().includes(searchPhraseUpperCase)
      )
    })
  }, [products, searchPhrase])
  return (
    <div className={styles.container}>
      {
        filteredProducts.length === 0 ?
          null
          :
          <p className={styles.title}>{filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}</p>
      }
      <div className={styles.wrapper}>
        {
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              {...product}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Products
