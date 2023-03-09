import type { WrapperProps } from './types'
import styles from './Wrapper.module.scss'

const Wrapper = ({ children, homePage = false }: WrapperProps): JSX.Element => {
  return (
    <>
      {
      homePage ?
        <section className={styles.wrapper_home_page}>{children}</section>
        :
        <section className={styles.wrapper}>{children}</section>
      }
    </>
  )
}

export default Wrapper
