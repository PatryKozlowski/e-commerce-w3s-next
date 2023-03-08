import moment from 'moment'
import type { StatusOrderProps } from './types'
import styles from './OrderInfo.module.scss'

const OrderInfo = ({ orderInfo, status, delivery, payment, orderId, orderDate, orderTotal }: StatusOrderProps): JSX.Element => {
  const orderStatus = (status: string): JSX.Element => {
    if (status === 'Open') {
      return <p className={`${styles.status} ${styles.orange}`}>{status}</p>
    }

    if (status === 'Confirmed') {
      return <p className={`${styles.status} ${styles.gray}`}>{status}</p>
    }

    if (status === 'Completed') {
      return <p className={`${styles.status} ${styles.green}`}>{status}</p>
    }

    if (status === 'Cancelled') {
      return <p className={`${styles.status} ${styles.red}`}>{status}</p>
    }

    return <p className={`${styles.status} ${styles.orange}`}>{status}</p>
  }

  const paymentStatus = (payment: string): JSX.Element => {
    if (payment === 'Paid') {
      return <p className={`${styles.status} ${styles.green}`}>{payment}</p>
    }
    if (payment === 'Unpaid') {
      return <p className={`${styles.status} ${styles.orange}`}>{payment}</p>
    } else {
      return <p className={`${styles.status} ${styles.red}`}>{payment}</p>
    }
  }

  const deliveryStatus = (delivery: string): JSX.Element => {
    if (delivery === 'Unfulfilled') {
      return <p className={`${styles.status} ${styles.orange}`}>{delivery}</p>
    }
    if (delivery === 'Shipping' || delivery === 'Shipped') {
      return <p className={`${styles.status} ${styles.gray}`}>{delivery}</p>
    }
    if (delivery === 'Arrived') {
      return <p className={`${styles.status} ${styles.green}`}>{delivery}</p>
    }

    return <p className={`${styles.status} ${styles.red}`}>Failed</p>
  }
  return (
    <div className={styles.container}>
      <p className={styles.header}>{orderInfo}</p>
      <div className={styles.wrapper}>
        {
        status ?
          orderStatus(status) :
          delivery ?
            deliveryStatus(delivery) :
            payment ?
              paymentStatus(payment) :
              orderId ?
                <p className={`${styles.status} ${styles.gray}`}>{orderId}</p> :
                orderDate ?
                  <p className={`${styles.status} ${styles.gray}`}>{moment.unix(orderDate).format('DD MMM YYYY')}</p> :
                  orderTotal ?
                    <p className={`${styles.status} ${styles.gray}`}>$ {orderTotal}</p> :
                    null
       }
      </div>
    </div>
  )
}

export default OrderInfo
