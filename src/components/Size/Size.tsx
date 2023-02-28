import type { SizeProps } from './types'
import { useFormContext } from 'react-hook-form'
import styles from './Size.module.scss'

const Size = ({ size, stock }: SizeProps): JSX.Element => {
  const methods = useFormContext()
  const { register } = methods
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <label>
          <input
            type={'radio'}
            value={size}
            {...register('size', { required: true })}
          />
          <p className={styles.size}>
            {size}
          </p>
        </label>
        <span>{stock}</span>
      </div>
    </div>
  )
}

export default Size
