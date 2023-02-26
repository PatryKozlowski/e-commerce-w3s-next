import { useCallback, useEffect } from 'react'
import AccountButton from '../AccountButton/AccountButton'
import Input from '../Input/Input'
import ShoppingCartButton from '../ShoppingCartButton/ShoppingCartButton'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { handleSearch } from '@/redux/searchSlice'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const methods = useForm()
  const { register, watch } = methods
  const router = useRouter()
  const pathName = router.pathname

  const routes: string[] = [
    '', 'login', 'register',
    'profile', 'user', 'success',
    'orders', 'admin', 'create'
  ]

  const registeredSearch = register('search')

  const search = watch('search')
  const checkingRoute = useCallback((routeArray: string[], route: string): boolean => {
    const path = route.split('/')
    if (path.length > 2) {
      return true
    } else {
      return routeArray.includes(path[1])
    }
  }, [])

  const getTitle = useCallback((pathName: string) => {
    const pageName = pathName.split('/')
    if (pageName.length === 2) {
      return pageName[1]?.charAt(0).toUpperCase() + pageName[1]?.slice(1)
    }
    if (pageName.length === 3) {
      return ''
    }
  }, [])

  const isSearchEnable = checkingRoute(routes, pathName)
  const isTitleEnable = checkingRoute(routes, pathName)

  useEffect(() => {
    dispatch(handleSearch(search))
  }, [dispatch, search])

  return (
    <header className={styles.container}>
      <div className={`${isTitleEnable ? styles.wrapper_end : styles.wrapper}`}>
        {
            !isTitleEnable ?
              <p className={styles.header_title}>{getTitle(pathName)}</p>
              :
              null
        }
        <div className={styles.content}>
          {
            !isSearchEnable ?
              <Input
                containerStyle={styles.input_container}
                search
                placeholder={'Search'}
                iconInput={true}
                {...registeredSearch}
              />
              :
              null
            }
          <AccountButton />
          <ShoppingCartButton />
        </div>
      </div>
    </header>
  )
}

export default Header
