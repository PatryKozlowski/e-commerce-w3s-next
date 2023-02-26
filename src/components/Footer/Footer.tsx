import Link from 'next/link'
import styles from './Footer.module.scss'

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.container}>
      <div className={styles.wrapper}>
        <Link
          className={styles.link}
          href={'https://www.w3schools.com/w3css/default.asp'}
          target={'_blank'}
        >
          Powered by w3.css
        </Link>
        <Link
          className={styles.sublink}
          href={'https://github.com/PatryKozlowski/e-shop-w3s'}
          target={'_blank'}
        >
          Refactoring Patryk Kozłowski
        </Link>
      </div>
    </footer >
  )
}

export default Footer
