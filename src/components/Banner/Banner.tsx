import Image from 'next/image'
import styles from './Banner.module.scss'

const Banner = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Image
        src={'https://www.w3schools.com/w3images/jeans.jpg'}
        alt={'Banner image'}
        width={918}
        height={612}
      />
      <div className={styles.text_wrapper}>
        <h1 className={styles.title}>New arrivals</h1>
        <h2 className={styles.subtitle}>COLLECTION 2016</h2>
        <button className={styles.btn}>SHOP NOW</button>
      </div>
    </div>
  )
}

export default Banner
