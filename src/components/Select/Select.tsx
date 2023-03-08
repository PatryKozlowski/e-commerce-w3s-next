import { forwardRef } from 'react'
import { SelectProps } from './types'

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, option, ...restProps }, ref) => {
  return (
    <select
      ref={ref}
      className={className}
      {...restProps}
    >
      {
        option.map(({ label, value }, index) => (
          <option
            key={index}
            value={value}
          >{label}
          </option>
        ))
      }
    </select>
  )
})
Select.displayName = 'Select'
export default Select
