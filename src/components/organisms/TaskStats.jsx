import ApperIcon from '@/components/ApperIcon'
import StatCard from '@/components/molecules/StatCard'

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
  )
}

export default TaskStats