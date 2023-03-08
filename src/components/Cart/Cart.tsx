import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { openCart } from '@/redux/cartSlice'
import { MdClose, MdShoppingBag } from 'react-icons/md'
import CartItem from '../CartItem/CartItem'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import type { HandleProduct } from '../OneProduct/types'
import Spinner from '../Spinner/Spinner'
import NoProduct from '../NoProduct/NoProduct'
import { useCheckout } from '@/hooks/api/useCheckout'
import styles from './Cart.module.scss'

const Cart = (): JSX.Element => {
  const { data: session } = useSession()
  const { mutate: checkoutMutate, isLoading } = useCheckout()
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.cart.isCartOpen)
  const products = useAppSelector((state) => state.cart.productsInCart)
  const total = useAppSelector((state) => state.cart.totalPrice)

  const handleCloseCart = useCallback(() => {
    dispatch(openCart(!isOpen))
  }, [dispatch, isOpen])

  const handleCheckout = useCallback((products: HandleProduct[]): void => {
    if (!session) {
      toast.info('You must be logged in to purchase products')
    }

    checkoutMutate(products)
  }, [checkoutMutate, session])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className={`${styles.container} ${isOpen ? styles.close_cart : styles.open_cart}`}>
      <div className={styles.wrapper}>
        <div className={styles.title_wrapper}>
          <h2>Shop cart</h2>
          <div
            onClick={handleCloseCart}
            className={styles.close_btn_wrapper}
          >
            <MdClose size={30} />
          </div>
        </div>
        {
            products.length ?
              <>
                <div className={styles.cart_item_wrapper}>
                  {
                      products.map((product) => (
                        <CartItem
                          key={`${product.id}${product.size}`}
                          product={product}
                        />
                      ))
                  }
                </div>
                <div className={styles.bottom_wrapper}>
                  <div className={styles.total_wrapper}>
                    <h3 className={styles.total}>
                      Total: ${total.toFixed(2)}
                    </h3>
                    <button
                      onClick={async () => handleCheckout(products)}
                      className={styles.btn_wrapper}
                      disabled={isLoading}
                    >
                      {
                        isLoading ?
                          <Spinner />
                          :
                          <>
                            <MdShoppingBag
                              size={30}
                            />
                            Checkout
                          </>
                      }
                    </button>
                  </div>
                </div>
              </>
              :
              <NoProduct
                text={'Your shopping cart is empty'}
                subtext={'Go ahead! Buy something'}
              />
        }
      </div>
    </div>
  )
}

export default Cart
