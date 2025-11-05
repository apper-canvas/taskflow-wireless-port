import ApperIcon from '@/components/ApperIcon'
import StatCard from '@/components/molecules/StatCard'
import { isToday, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns'

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Daily progress calculations
  const today = new Date()
  const todayStart = startOfDay(today)
  const todayEnd = endOfDay(today)
  
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false
    const taskDate = new Date(task.dueDate)
    return isToday(taskDate)
  })
  
  const todayCompletedTasks = todayTasks.filter(task => task.completed).length
  const todayTotalTasks = todayTasks.length
  const todayCompletionRate = todayTotalTasks > 0 ? Math.round((todayCompletedTasks / todayTotalTasks) * 100) : 0
  
  // Overdue and upcoming tasks
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false
    const taskDate = new Date(task.dueDate)
    return isBefore(taskDate, todayStart)
  }).length
  
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false
    const taskDate = new Date(task.dueDate)
    return isAfter(taskDate, todayEnd)
  }).length
return (
    <div className="mb-8 space-y-6">
      {/* Daily Progress Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <ApperIcon name="Calendar" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Today's Progress</h3>
              <p className="text-sm text-slate-500">
                {todayCompletedTasks} of {todayTotalTasks} tasks completed
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">{todayCompletionRate}%</div>
            <div className="text-sm text-slate-500">Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${todayCompletionRate}%` }}
            />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="p-1.5 bg-red-100 rounded-lg">
              <ApperIcon name="AlertTriangle" size={16} className="text-red-600" />
            </div>
            <div>
              <div className="font-semibold text-red-900">{overdueTasks}</div>
              <div className="text-xs text-red-600">Overdue</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <ApperIcon name="Calendar" size={16} className="text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-blue-900">{upcomingTasks}</div>
              <div className="text-xs text-blue-600">Upcoming</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<ApperIcon name="List" size={24} />}
          gradient="from-indigo-500 to-violet-500"
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<ApperIcon name="CheckCircle" size={24} />}
          gradient="from-emerald-500 to-green-500"
        />
        <StatCard
          title="Pending"
          value={pendingTasks}
          icon={<ApperIcon name="Clock" size={24} />}
          gradient="from-amber-500 to-orange-500"
          className="lg:block hidden"
        />
        <StatCard
          title="Complete Rate"
          value={`${completionRate}%`}
          icon={<ApperIcon name="TrendingUp" size={24} />}
          gradient="from-blue-500 to-indigo-500"
          className="lg:block hidden"
        />
      </div>
    </div>
  )
}

export default TaskStats