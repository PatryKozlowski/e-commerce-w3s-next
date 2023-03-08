import { useAppDispatch } from '@/hooks/useAppDispatch'
import { deleteItemFromCard } from '@/redux/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import type { Props } from './types'
import styles from './CartItem.module.scss'
import { useAppSelector } from '@/hooks/useAppSelector'

const CartItem = ({ product }: Props): JSX.Element => {
  const [isAnimated, setAnimated] = useState(false)
  const { id, image, name, size, quantity, price, product: productType, jeansType } = product
  const totalPrice = price * quantity
  const numberOfItems = useAppSelector((state) => state.cart.productsInCart)
  const dispatch = useAppDispatch()
  const pageWithJeansType = `/${productType as string}/${jeansType as string}/${id}`
  const productPage = `/${productType as string}/${id}`

  const handleDelete = useCallback(() => {
    setAnimated(true)
    setTimeout(() => {
      dispatch(deleteItemFromCard(product))
    }, 350)
  }, [dispatch, product])

  useEffect(() => {
    setAnimated(false)
  }, [numberOfItems])

  return (
    <div className={`${styles.container} ${isAnimated ? styles.hidden : ''}`}>
      <Link href={productType === 'jeans' ? pageWithJeansType : productPage}>
        <Image
          src={`${process.env.NEXT_PUBLIC_FIREBASE_BUCKET_URL as string}${image}?alt=media`}
          alt={'Product image'}
          width={'100'}
          height={'100'}
        />
      </Link>
      <div className={styles.wrapper}>
        <p>Name: {name}</p>
        <p>Size: {size}</p>
        <p>Quantity: {quantity}</p>
        <p>Price: ${price}</p>
        <p className={styles.total}>
          Total: ${totalPrice}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className={styles.delete_btn}
        disabled={isAnimated}
      >
        <MdDelete size={30} />
      </button>
    </div>
  )
}

export default CartItem
