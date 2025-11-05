import ApperIcon from '@/components/ApperIcon'

const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats skeleton */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-24"></div>
            <div className="h-8 bg-gradient-to-r from-indigo-200 to-violet-200 rounded-lg w-16"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-20"></div>
            <div className="h-8 bg-gradient-to-r from-emerald-200 to-green-200 rounded-lg w-16"></div>
          </div>
        </div>
      </div>

      {/* Task list skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex-shrink-0 mt-1"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg" style={{ width: `${Math.random() * 40 + 40}%` }}></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded" style={{ width: `${Math.random() * 30 + 60}%` }}></div>
                  <div className="h-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded" style={{ width: `${Math.random() * 40 + 40}%` }}></div>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex-shrink-0"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating button skeleton */}
      <div className="fixed bottom-8 right-8">
        <div className="w-14 h-14 bg-gradient-to-r from-indigo-300 to-violet-300 rounded-full shadow-lg"></div>
      </div>
    </div>
  )
}

export default Loading