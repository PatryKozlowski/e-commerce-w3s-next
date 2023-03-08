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

  const searchEnabledRoutes: string[] = [
    'blazers', 'gymwear', 'jackets', 'jeans', 'bootcut', 'skinny', 'straight', 'relaxed', 'shirts', 'shoes'
  ]

  const registeredSearch = register('search')

  const search = watch('search')

  const getTitle = useCallback((pathName: string) => {
    const pageName = pathName.split('/')
    if (pageName.length === 2) {
      return pageName[1]?.charAt(0).toUpperCase() + pageName[1]?.slice(1)
    }
    if (pageName.length === 3) {
      return pageName[2]?.charAt(0).toUpperCase() + pageName[2]?.slice(1)
    }
  }, [])

  const isPageWithID = getTitle(pathName) === '[id]'

  const isSearchEnable = (searchEnabledRoutes.includes(pathName.split('/')[1]) && pathName.split('/').length <= 3) || (searchEnabledRoutes.includes(pathName.split('/')[3]) && pathName.split('/').length <= 3)
  const isTitleEnable = isSearchEnable

  useEffect(() => {
    dispatch(handleSearch(search))
  }, [dispatch, search])

  return (
    <header className={styles.container}>
      <div className={`${isTitleEnable ? styles.wrapper : styles.wrapper_end}`}>
        {
            isTitleEnable ?
              <p className={styles.header_title}>{isPageWithID ? '' : getTitle(pathName)}</p>
              :
              null
        }
        <div className={styles.content}>
          {
            isSearchEnable && !isPageWithID ?
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
