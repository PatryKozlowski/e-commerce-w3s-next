import NavLink from './NavLink/NavLink'
import NavSubLink from './NavSubLink/NavSubLink'
import { useAppSelector } from '@/hooks/useAppSelector'
import styles from './NavBar.module.scss'
import type { Props } from './types'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useCallback } from 'react'
import { openNav } from '@/redux/navigationSlice'

const NavBar = ({ children }: Props): JSX.Element => {
  const isOpen = useAppSelector((state) => state.navigation.isNavOpen)
  const dispatch = useAppDispatch()
  const productsNavLinks = [
    { linkName: 'Shirts', href: '/shirts' },
    { linkName: 'Jackets', href: '/jackets' },
    {
      linkName: 'Jeans',
      href: '/jeans',
      subMenu: [
        { linkName: 'Skinny', href: '/jeans/skinny' },
        { linkName: 'Relaxed', href: '/jeans/relaxed' },
        { linkName: 'Bootcut', href: '/jeans/bootcut' },
        { linkName: 'Straight', href: '/jeans/straight' }
      ]
    },
    { linkName: 'Gymwear', href: '/gymwear' },
    { linkName: 'Blazers', href: '/blazers' },
    { linkName: 'Shoes', href: '/shoes' }
  ]

  const socialNavLinks = [
    { linkName: 'Contact', href: '/' },
    { linkName: 'Newsletter', href: '/' },
    { linkName: 'Subscribe', href: '/' }
  ]

  const handleCloseNav = useCallback(() => {
    dispatch(openNav(!isOpen))
  }, [dispatch, isOpen])

  return (
    <nav className={`${styles.container} ${isOpen ? styles.close_nav : styles.open_nav}`}>
      <div className={styles.logo_warpper}>
        {children}
      </div>
      <div
        onClick={handleCloseNav}
        className={styles.products_nav_links_wrapper}
      >
        {
        productsNavLinks.map((navLink, index) => {
          if (navLink.subMenu) {
            return (
              <NavSubLink
                key={index}
                menu={navLink}
              />
            )
          }

          return (
            <NavLink
              key={index}
              {...navLink}
            />
          )
        })
        }
      </div>
      <div className={styles.social_links_wrapper}>
        {
        socialNavLinks.map((navLink, index) => (
          <NavLink
            key={index}
            {...navLink}
          />
        ))
        }
      </div>
    </nav>
  )
}

export default NavBar
