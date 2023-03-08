import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { openCart } from '@/redux/cartSlice'
import { useCallback, useEffect, useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import styles from './ShoppingCartButton.module.scss'

const ShoppingCartButton = (): JSX.Element => {
  const [isAnimated, setAnimated] = useState(false)
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.productsInCart)
  const isOpen = useAppSelector((state) => state.cart.isCartOpen)

  const handleOpenCart = useCallback(() => {
    dispatch(openCart(!isOpen))
  }, [dispatch, isOpen])

  useEffect(() => {
    setAnimated(true)
  }, [items])

  return (
    <div
      onClick={handleOpenCart}
      className={styles.container}
    >
      {
        items ?
          <div

            className={styles.wrapper}
          >
            <span
              onTransitionEnd={() => setAnimated(false)}
              className={`${styles.text} ${isAnimated ? styles.is_animated : ''}`}
            >
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
        <MdShoppingCart
          className={`${isAnimated ? styles.is_animated_shopping_cart : styles.is_not_animated_shopping_cart}`}
          size={30}
        />
      </>
    </div>
  )
}

export default ShoppingCartButton
