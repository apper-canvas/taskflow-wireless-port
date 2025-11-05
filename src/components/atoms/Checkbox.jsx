import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(
          "custom-checkbox",
          checked && "checked",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={!disabled ? onChange : undefined}
      >
        <div className="checkmark">
          <ApperIcon name="Check" size={14} />
        </div>
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox