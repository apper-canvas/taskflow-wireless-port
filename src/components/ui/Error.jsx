import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto animate-fade-in">
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto">
          <ApperIcon name="AlertTriangle" size={40} className="text-red-600" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">
            Oops! Something went wrong
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {message}
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-violet-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <ApperIcon name="RotateCcw" size={18} />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default Error