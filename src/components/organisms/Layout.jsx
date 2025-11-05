import { Outlet } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl">
              <ApperIcon name="CheckSquare" size={32} className="text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-slate-600 text-lg">Streamline your daily productivity</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <ApperIcon name="Heart" size={16} className="text-red-400" />
            <span>Built with focus and simplicity in mind</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout