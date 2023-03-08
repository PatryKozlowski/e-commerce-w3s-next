import styles from './Spinner.module.scss'

const Spinner = (): JSX.Element => {
  return (
    <>
      <span className={styles.loader}></span>
    </>
  )
}

export default Spinner
