import styles from './ProductInfoList.module.scss'
import type { Props } from './types'

const ProductInfoList = ({ label, name }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <p>{label}</p>
      <p className={styles.name_paragraph}>{name}</p>
    </div>
  )
}

export default ProductInfoList
