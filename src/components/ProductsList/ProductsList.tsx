import ProductList from '../ProductList/ProductList'
import NoProduct from '../NoProduct/NoProduct'
import { useGetProductInfo } from '@/hooks/api/useGetProductsList'
import styles from './ProductsList.module.scss'
import Spinner from '../Spinner/Spinner'

const ProductsList = (): JSX.Element => {
  const { data, isLoading } = useGetProductInfo()
  return (
    <div className={styles.container}>
      <h2>
        Edit product
      </h2>
      {
        data?.length === 0 ?
          null :
          <h3>
            Total products: {data?.length}
          </h3>
      }
      <div className={styles.wrapper}>
        {
          isLoading ?
            <div className={styles.spinner_container}>
              <Spinner />
            </div>
            :
            data?.length === 0 ?
              <NoProduct
                text={'No products in database'}
                subtext={'Add some products first !'}
              /> :
              data?.map((product) => (
                <ProductList
                  key={product.id}
                  {...product}
                />
              ))
        }
      </div>
    </div>
  )
}

export default ProductsList
