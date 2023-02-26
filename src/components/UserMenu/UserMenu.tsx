import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { openMenu } from '@/redux/navigationSlice'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCallback } from 'react'
import { BiLogOut } from 'react-icons/bi'
import styles from './UserMenu.module.scss'

const UserMenu = (): JSX.Element => {
  const { data: session } = useSession()
  const isOpen = useAppSelector((state) => state.navigation.isUserMenuOpen)
  const dispatch = useAppDispatch()
  const links = [
    { link: 'Profile', href: '/profile' },
    { link: 'Orders', href: '/orders' }
  ]

  const adminLinks = [
    { link: 'Create new product', href: '/create', admin: true },
    { link: 'Edit product', href: '/edit/product', admin: true }
  ]

  const handleCloseMenu = useCallback(() => {
    dispatch(openMenu(!isOpen))
  }, [dispatch, isOpen])

  return (
    <div className={`${styles.container} ${isOpen ? styles.close_menu : styles.open_menu}`}>
      <div
        onClick={handleCloseMenu}
        className={styles.links_wrapper}
      >
        {
            links.map(({ link, href }, index) => (
              <Link
                key={index}
                href={href}
                className={styles.link}
              >
                {link}
              </Link>
            ))
        }
        {
            session?.user?.role === 'admin' ?
              <div
                onClick={handleCloseMenu}
                className={styles.admin_link_wrapper}
              >
                {
                    adminLinks.map(({ link, href }, index) => (
                      <Link
                        key={index}
                        href={href}
                        className={styles.link}
                      >
                        {link}
                      </Link>
                    ))
                }
              </div>
              :
              null
        }
        <button
          className={`${styles.bnt_logout} ${styles.link}`}
          onClick={async () => await signOut()}
        >
          Log out
          <BiLogOut size={22}/>
        </button>
      </div>
    </div>
  )
}

export default UserMenu
