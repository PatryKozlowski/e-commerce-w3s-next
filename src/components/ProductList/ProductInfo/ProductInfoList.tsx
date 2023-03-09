import styles from './ProductInfoList.module.scss'
import type { Props } from './types'

const ProductInfoList = ({ label, name }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <span>{label}</span>
      <p className={styles.name_paragraph}>{name}</p>
    </div>
  )
}

export default ProductInfoList
