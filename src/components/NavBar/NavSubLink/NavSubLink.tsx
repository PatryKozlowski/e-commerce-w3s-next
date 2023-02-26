import Link from 'next/link'
import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import type { Props } from './types'
import styles from './NavSubLink.module.scss'

const NavSubLink = ({ menu }: Props): JSX.Element => {
  const [isOpenSubMenu, setOpenSubMenu] = useState<boolean>(false)

  const handleOpenSubMenu = useCallback(() => {
    setOpenSubMenu(!isOpenSubMenu)
  }, [isOpenSubMenu])

  const { width } = useWindowDimensions()
  const SmallScreenCheck = useCallback((): boolean | undefined => {
    if (width !== null) {
      return width < 1024
    }
  }, [width])

  const isSmallScreen = SmallScreenCheck()

  const subMenuAnimate = {
    open: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.1 },
      transitionEnd: {
        display: 'none'
      }
    },
    close: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.1 },
      transitionEnd: {
        display: 'block'
      }
    }
  }
  return (
    <>
      <div className={`${styles.nav_link} ${isOpenSubMenu ? styles.open_sub_menu : ''}`}>
        <Link
          href={menu.href}

        >
          {menu.linkName}
        </Link>

        {
          isSmallScreen ?
            null :
            <MdArrowDropDown
              size={30}
              onClick={handleOpenSubMenu}
            />
        }
      </div>
      <AnimatePresence>
        {
          isOpenSubMenu && !isSmallScreen ?
            <motion.div
              className={styles.wrapper}
              initial={'open'}
              animate={isOpenSubMenu ? 'close' : 'open'}
              variants={subMenuAnimate}
              exit={'open'}
            >
              {
                menu?.subMenu.map((navLink, index) => (
                  <div
                    key={index}
                  >
                    <Link
                      href={navLink.href}
                      className={styles.nav_link}
                    >
                      <MdArrowRight size={26} />
                      {navLink.linkName}
                    </Link>
                  </div>
                ))
              }
            </motion.div>
            : null
        }
      </AnimatePresence>
    </>
  )
}

export default NavSubLink
