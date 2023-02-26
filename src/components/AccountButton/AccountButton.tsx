import { MdSupervisorAccount } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { openMenu } from '@/redux/navigationSlice'
import { useRouter } from 'next/router'
import styles from './AccountButton.module.scss'

const AccountButton = (): JSX.Element => {
  const { data: session } = useSession()
  const isOpen = useAppSelector((state) => state.navigation.isUserMenuOpen)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const goToAuthPage = useCallback(async () => {
    await router.push('/auth/login')
  }, [router])

  const handleUserMenu = useCallback(() => {
    dispatch(openMenu(!isOpen))
  }, [dispatch, isOpen])

  return (
    <MdSupervisorAccount
      size={30}
      className={styles.wrapper}
      onClick={session ? handleUserMenu : goToAuthPage}
    />
  )
}

export default AccountButton
