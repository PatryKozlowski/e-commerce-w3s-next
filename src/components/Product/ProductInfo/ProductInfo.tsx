import type { Props } from './types'
import styles from './ProductInfo.module.scss'

const ProductInfo = ({ title }: Props): JSX.Element => {
  return (
    <span className={styles.container}>
      {title}
    </span>
  )
}

export default ProductInfo
