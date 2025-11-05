import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto animate-fade-in">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 via-violet-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <ApperIcon name="FileQuestion" size={64} className="text-indigo-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-violet-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
            <span className="text-2xl text-white">?</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-900">
            Page Not Found
          </h2>
          <p className="text-slate-600 leading-relaxed">
            The page you're looking for doesn't exist. Let's get you back to your tasks.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoHome}
            className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-2xl group"
          >
            <ApperIcon name="Home" size={20} />
            Back to TaskFlow
          </Button>
          
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <button 
              onClick={handleGoHome}
              className="hover:text-indigo-600 transition-colors duration-200"
            >
              Home
            </button>
            <span>•</span>
            <span>TaskFlow</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound