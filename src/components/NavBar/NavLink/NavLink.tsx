import Link from 'next/link'
import styles from './NavLink.module.scss'
import type { Props } from './types'

const NavLink = ({ href, linkName }: Props): JSX.Element => {
  return (
    <Link
      href={href}
      className={styles.nav_link}
    >
      {linkName}
    </Link>
  )
}

export default NavLink
