import { MdProductionQuantityLimits } from 'react-icons/md'
import styles from './NoProduct.module.scss'
import type { Props } from './types'

const NoProduct = ({ text = 'No products in this category :(', subtext = 'Please will visit us later', center = true }: Props): JSX.Element => {
  return (
    <div className={`${center ? styles.container_center : styles.container}`}>
      <MdProductionQuantityLimits size={46}/>
      <p className={styles.title}>{text}</p>
      <p className={styles.subtitle}>{subtext}</p>
    </div>
  )
}

export default NoProduct
