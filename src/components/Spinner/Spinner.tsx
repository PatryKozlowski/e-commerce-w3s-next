import styles from './Spinner.module.scss'

const Spinner = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  )
}

export default Spinner
