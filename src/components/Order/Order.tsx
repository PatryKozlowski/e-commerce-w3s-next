import OrderInfo from '../OrderInfo/OrderInfo'
import Image from 'next/image'
import type { OrderProps } from './types'
import styles from './Order.module.scss'

const Order = ({ id, images, total, date, status, delivery, payment }: OrderProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <OrderInfo
          orderInfo={'Order number'}
          orderId={id}
        />
        <OrderInfo
          orderInfo={'Order placed'}
          orderDate={date}
        />
        <OrderInfo
          orderInfo={'Total'}
          orderTotal={total}
        />
        <OrderInfo
          orderInfo={'Order status'}
          status={status}
        />
        <OrderInfo
          orderInfo={'Payment status'}
          payment={payment}
        />
        <OrderInfo
          orderInfo={'Delivery status'}
          delivery={delivery}
        />
      </div>
      <div className={styles.image_container}>
        <div className={styles.image_wrapper}>
          {
            images.map((image, index) => (
              <Image
                key={index}
                src={`${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL as string}${image}?alt=media`}
                alt={'Product image'}
                className={'object-contain'}
                width={200}
                height={200}
              />
            ))
            }
        </div>
      </div>
    </div>
  )
}

export default Order
