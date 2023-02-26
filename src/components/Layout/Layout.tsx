import MobileNav from '../MobileNav/MobileNav'
import NavBar from '../NavBar/NavBar'
import type { LayoutProps } from './types'
import Logo from '../Logo/Logo'
import Header from '../Header/Header'
import UserMenu from '../UserMenu/UserMenu'
import styles from './Layout.module.scss'

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <main className={styles.container}>
      <MobileNav />
      <NavBar>
        <Logo />
      </NavBar>
      <Header />

      {/* UserMenu */}
      <UserMenu />

      {/* Cart */}
      {/* <div className={styles.cart_wrapper}>
        <Cart />
      </div> */}
      <>
        {children}
      </>
    </main>
  )
}

export default Layout
