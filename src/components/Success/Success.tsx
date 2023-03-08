import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'
import styles from './Success.module.scss'

const Success = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FaCheckCircle
          className={styles.icon}
          size={36}
        />
        <h2>Thank you, your order has been confirmed!</h2>
      </div>
      <p className={styles.content}>
        Thank you for shopping with us. We&apos;ll send a confirmation once your item has shipped,
        if you would like to check the status of your orders please press the link below
      </p>
      <Link
        href={'/orders'}
        className={styles.btn_orders}
      >Go to my orders
      </Link>
    </div>
  )
}

export default Success
