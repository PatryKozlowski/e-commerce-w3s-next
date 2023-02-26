import Link from 'next/link'
import styles from './Logo.module.scss'

const Logo = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h3 className={styles.wrapper}>
        <Link href={'/'}>
          LOGO
        </Link>
      </h3>
    </div>
  )
}

export default Logo
