import Input from '../Input/Input'
import styles from './Subscribe.module.scss'

const Subscribe = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <form className={styles.wrapper}>
        <h2 className={styles.title}>Subscribe</h2>
        <p className={styles.subtitle}>To get special offers and VIP treatment:</p>
        <Input
          containerStyle={styles.input_container}
          placeholder={'Enter e-mail'}
        />
        <div className={styles.btn_wrapper}>
          <button className={styles.btn}>
            Subscribe
          </button>
        </div>
      </form>
    </div>
  )
}

export default Subscribe
