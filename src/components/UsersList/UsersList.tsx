import NoProduct from '../NoProduct/NoProduct'
import styles from './UsersList.module.scss'
import Spinner from '../Spinner/Spinner'
import { useGetUsers } from '@/hooks/api/useGetUsers'
import User from '../User/User'

const UsersList = (): JSX.Element => {
  const { data, isLoading } = useGetUsers()
  return (
    <div className={styles.container}>
      <h2>
        Edit user
      </h2>
      {
        data?.length === 0 ?
          null :
          <h3>
            Users: {data?.length}
          </h3>
      }
      <div className={styles.wrapper}>
        {
          isLoading ?
            <div className={styles.spinner_container}>
              <Spinner />
            </div>
            :
            data?.length === 0 ?
              <NoProduct
                text={'No users in database'}
                subtext={''}
              /> :
              data?.map((user) => (
                <User
                  key={user.id}
                  user={user}
                />
              ))
        }
      </div>
    </div>
  )
}

export default UsersList
