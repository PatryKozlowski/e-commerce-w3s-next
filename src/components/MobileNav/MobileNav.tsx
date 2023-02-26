import { useCallback } from 'react'
import AccountButton from '../AccountButton/AccountButton'
import HamburegerButton from '../HamburgerButton/HamburgerButton'
import { openNav } from '@/redux/navigationSlice'
import ShoppingCartButton from '../ShoppingCartButton/ShoppingCartButton'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import Logo from '../Logo/Logo'
import styles from './MobileNav.module.scss'

const MobileNav = (): JSX.Element => {
  const isOpenNav = useAppSelector((state) => state.navigation.isNavOpen)
  const dispatch = useAppDispatch()
  const handleOpenHamburgerMenu = useCallback(() => {
    dispatch(openNav(!isOpenNav))
  }, [dispatch, isOpenNav])

  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.buttons_wrapper}>
          <AccountButton />
          <ShoppingCartButton />
          <div className={styles.hamburger_btn_wrapper}>
            <HamburegerButton
              isOpen={isOpenNav}
              onClick={(handleOpenHamburgerMenu)}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MobileNav
