import { cn } from '@/utils/cn'

const StatCard = ({ title, value, icon, gradient = "from-indigo-500 to-violet-500", className }) => {
  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-sm border border-slate-100", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className={cn(
            "text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
            gradient
          )}>
            {value}
          </p>
        </div>
        {icon && (
          <div className={cn(
            "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center",
            gradient.replace("to-", "to-").replace("from-", "from-") + " shadow-lg"
          )}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard