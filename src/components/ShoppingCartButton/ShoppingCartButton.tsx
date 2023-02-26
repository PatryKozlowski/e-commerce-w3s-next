import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { openCart } from '@/redux/cartSlice'
import { useCallback } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import styles from './ShoppingCartButton.module.scss'

const ShoppingCartButton = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.productsInCart)
  const isOpen = useAppSelector((state) => state.cart.isCartOpen)

  const handleOpenCart = useCallback(() => {
    dispatch(openCart(!isOpen))
  }, [dispatch, isOpen])

  return (
    <div
      onClick={handleOpenCart}
      className={styles.container}
    >
      {
        items ?
          <div className={styles.wrapper}>
            <span className={styles.text}>
              {
                items.length === 0 ?
                  null
                  :
                  items.length
              }
            </span>
          </div>
          :
          null
        }
      <>
        <MdShoppingCart size={30} />
      </>
    </div>
  )
}

export default ShoppingCartButton
