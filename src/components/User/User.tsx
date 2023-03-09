import { useBlockUser } from '@/hooks/api/useBlockUser'
import { useDeleteUser } from '@/hooks/api/useDeleteUser'
import { useGetOrders } from '@/hooks/api/useGetOrders'
import { usePremissionUser } from '@/hooks/api/usePremissionUser'
import type { DeleteUserId } from '@/lib/services/admin/user/deleteUser'
import { User as UserProps } from '@prisma/client'
import moment from 'moment'
import { Fragment, useCallback } from 'react'
import Spinner from '../Spinner/Spinner'
import styles from './User.module.scss'

interface Props {
  user: UserProps
}

const User = ({ user }: Props): JSX.Element => {
  const userId = user.id
  const deleteUserId = userId as unknown as DeleteUserId
  const { mutate: blockUser, isLoading: isLodaingBlockUser } = useBlockUser(userId)
  const { mutate: premissionUser, isLoading: isLoadingPremissionUser } = usePremissionUser(userId)
  const { mutate: deleteUser, isLoading: isLoadingDeleteUser } = useDeleteUser(deleteUserId)
  const { data: orders, isLoading } = useGetOrders(userId)

  const userInfo = [
    { header: 'ID', data: user.id },
    { header: 'Email', data: user.email },
    { header: 'Role', data: user.role },
    { header: 'Is block', data: user.blocked ? 'Blocked' : 'No blocked' },
    { header: 'Created', data: moment(user.createdAt).format('DD MMM YYYY, h:mm:ss a') }
  ]

  const handleBlock = useCallback(() => { blockUser({ id: userId }) }, [blockUser, userId])

  const handlePremission = useCallback(() => { premissionUser({ id: userId }) }, [premissionUser, userId])

  const handleDelete = useCallback(() => {
    deleteUser(userId)
  }, [deleteUser, userId])

  if (isLoadingDeleteUser) {
    return (
      <div className={styles.spinner_container}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {
        isLoadingDeleteUser ?
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
          :
          <>
            <div className={styles.user_info_wrapper}>
              <h3 className={styles.category_name}>User info</h3>
              {
                isLoading ?
                  <div className={styles.spinner_container}>
                    <Spinner />
                  </div>
                  :
                  userInfo.map((user, index) => {
                    return (
                      <Fragment key={index}>
                        <div className={styles.info}>
                          <p>{user.header}</p>
                          <span>{user.data}</span>
                        </div>
                      </Fragment>
                    )
                  })
              }
            </div>
            <div className={styles.orders_info_wrapper}>
              {
              orders?.length ?
                <h3 className={styles.category_name}>Orders info | {orders?.length}</h3>
                :
                <h3 className={styles.category_name}>Orders info</h3>
              }
              {
              isLoading ?
                <div className={styles.spinner_container}>
                  <Spinner />
                </div>
                :
                  !orders?.length ?
                    <div className={styles.no_order}>
                      <p>No orders</p>
                    </div>
                    :
                    <div className={styles.order_wrapper_scroll}>
                      {
                      orders?.map((order) => {
                        return (
                          <Fragment key={order.id}>
                            <div className={styles.order_wrapper}>
                              <p>ID</p>
                              <span>{order.id}</span>
                              <p>Total price</p>
                              <span>{order.total} $</span>
                              <div className={styles.order_status}>
                                <p>Status</p>
                                <span>{order.status}</span>
                                <span>{order.payment}</span>
                                <span>{order.delivery}</span>
                              </div>
                              <p>Created</p>
                              <span>{moment(order.date).format('DD MMM YYYY, h:mm:ss a')}</span>
                            </div>
                          </Fragment>
                        )
                      })
                }
                    </div>
        }
            </div>
            <div className={styles.actions_wrapper}>
              <h3 className={styles.category_name}>Actions</h3>
              <div className={styles.btn_wrapper}>
                <button
                  onClick={handleBlock}
                  className={`${user.blocked ? styles.unblock : styles.block}`}
                >
                  {
                    isLodaingBlockUser ?
                      <Spinner />
                      :
                      <>
                        {
                          user.blocked ? 'Unblock user' : 'Block user'
                        }
                      </>
                  }
                </button>
                <button
                  onClick={handlePremission}
                  className={styles.violet_color}
                >
                  {
                    isLoadingPremissionUser ?
                      <Spinner />
                      :
                      <>
                        {
                          user.role === 'admin' ? 'User permission' : 'Admin permission'
                        }
                      </>
                  }
                </button>
                <button
                  onClick={handleDelete}
                  className={styles.red_color}
                >
                  DELETE USER
                </button>
              </div>
            </div>
          </>
          }
    </div>
  )
}

export default User
