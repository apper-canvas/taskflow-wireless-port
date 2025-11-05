import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const DateInput = forwardRef(({ 
  className, 
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type="date"
      className={cn(
        "w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 transition-all duration-200 ease-out input-glow focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed",
        error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
        className
      )}
      {...props}
    />
  )
})

DateInput.displayName = "DateInput"

export default DateInput