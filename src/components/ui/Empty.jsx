import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with your productivity journey",
  actionText = "Add your first task",
  onAction
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto animate-fade-in">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 via-violet-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <ApperIcon name="CheckSquare" size={48} className="text-indigo-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
            <ApperIcon name="Plus" size={18} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-2xl hover:from-indigo-600 hover:to-violet-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
          >
            <ApperIcon name="Plus" size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            {actionText}
          </button>
        )}
      </div>
    </div>
  )
}

export default Empty