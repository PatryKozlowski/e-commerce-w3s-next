import type { WrapperProps } from './types'
import styles from './Wrapper.module.scss'

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <section className={styles.wrapper}>{children}</section>
  )
}

export default Wrapper
