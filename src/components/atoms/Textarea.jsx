import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Textarea = forwardRef(({ 
  className,
  error = false,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all duration-200 ease-out input-glow focus:outline-none resize-none disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed",
        error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea