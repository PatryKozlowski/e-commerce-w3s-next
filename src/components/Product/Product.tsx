import Image from 'next/image'
import Link from 'next/link'
import styles from './Product.module.scss'
import ProductInfo from './ProductInfo/ProductInfo'
import type { ProductProps } from './types'

const Product = ({ id, name, price, info, image, product, jeansType }: ProductProps): JSX.Element => {
  const pageWithJeansType = `/${product}/${jeansType as string}/${id}`
  const productPage = `/${product}/${id}`
  return (
    <div className={styles.container}>
      {
        info !== 'none' ?
          <div className={styles.product_info_wrapper}>
            {
                info === 'sale' ?
                  <ProductInfo title={'Sale'}/>
                  :
                  info === 'new' ?
                    <ProductInfo title={'New'} />
                    : null
                }
          </div>
          :
          null
      }
      <Link href={product === 'jeans' ? pageWithJeansType : productPage}>
        <div className={styles.img_wrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL as string}${image}?alt=media`}
            alt={'Product image'}
            width={'0'}
            height={'0'}
            sizes={'100vw'}
          />
        </div>
      </Link>
      <div className={styles.wrapper}>
        <p>{name}</p>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  )
}

export default Product
