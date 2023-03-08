import { MdProductionQuantityLimits } from 'react-icons/md'
import type { NoProductProps } from './types'
import styles from './NoProduct.module.scss'

const NoProduct = ({ text = 'No products in this category :(', subtext = 'Please will visit us later', center = true, productPage = false }: NoProductProps): JSX.Element => {
  return (
    <div className={`${center ? styles.container_center : styles.container} ${productPage ? styles.container_center_product_page : styles.container_center_rest_page}`}>
      <MdProductionQuantityLimits size={46}/>
      <p className={styles.title}>{text}</p>
      <p className={styles.subtitle}>{subtext}</p>
    </div>
  )
}

export default NoProduct
