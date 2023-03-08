import { useCallback, useEffect, useState } from 'react'
import NoProduct from '../NoProduct/NoProduct'
import Order from '../Order/Order'
import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/router'
import type { OrderProps, SelectedValueProps } from './types'
import styles from './OrdersList.module.scss'

const OrdersList = ({ orders }: OrderProps): JSX.Element => {
  const router = useRouter()

  const [isSelected, setSelected] = useState({
    status: '',
    payment: '',
    delivery: '',
    firstRender: true
  })
  const handleSelectStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ ...isSelected, status: e.target.value, firstRender: false })
  }, [isSelected])

  const handleSelectPaymentChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ ...isSelected, payment: e.target.value, firstRender: false })
  }, [isSelected])

  const handleSelectDeliveryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ ...isSelected, delivery: e.target.value, firstRender: false })
  }, [isSelected])

  const debuaonceSearchOrders = useDebounce(isSelected, 200)

  const handleSearch = async (data: SelectedValueProps): Promise<void> => {
    await router.push({
      pathname: '/orders',
      query: { ...data }
    }, '/orders')
  }

  useEffect(() => {
    if (isSelected.firstRender) {
      return
    }
    if (debuaonceSearchOrders) {
      void handleSearch(debuaonceSearchOrders)
    }
  // ony debouance value
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debuaonceSearchOrders])

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Your Orders</h2>
      {
        orders.length === 0 ?
          null :
          <h3>{orders.length} Orders</h3>
      }
      <form
        className={styles.from_wrapper}
      >
        <div className={styles.order_wrapper}>
          <p>Order status</p>
          <select
            value={isSelected.status}
            onChange={handleSelectStatusChange}
          >
            <option value={''}>All</option>
            <option value={'Open'}>Open</option>
            <option value={'Confirmed'}>Confirmed</option>
            <option value={'Completed'}>Completed</option>
            <option value={'Cancelled'}>Cancelled</option>
          </select>
        </div>
        <div className={styles.order_wrapper}>
          <p>Payment status</p>
          <select
            value={isSelected.payment}
            onChange={handleSelectPaymentChange}
          >
            <option value={''}>All</option>
            <option value={'Paid'}>Paid</option>
            <option value={'Unpaid'}>Unpaid</option>
            <option value={'Failed'}>Failed</option>
          </select>
        </div>
        <div className={styles.order_wrapper}>
          <p>Delivery status</p>
          <select
            value={isSelected.delivery}
            onChange={handleSelectDeliveryChange}
          >
            <option value={''}>All</option>
            <option value={'Unfulfilled'}>Unfulfilled</option>
            <option value={'Shipping'}>Shipping</option>
            <option value={'Shipped'}>Shipped</option>
            <option value={'Arrived'}>Arrived</option>
          </select>
        </div>
      </form>
      {
        orders.length === 0 ?
          <NoProduct
            text={'No orders'}
            subtext={''}
          />
          :
          <div className={styles.orders_container}>
            {
                orders?.map((order, index) => (
                  <Order
                    key={index}
                    {...order}
                  />
                ))
            }
          </div>
        }
    </div>
  )
}

export default OrdersList
