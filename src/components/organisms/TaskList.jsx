import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import taskService from '@/services/api/taskService'
import TaskCard from '@/components/molecules/TaskCard'
import TaskStats from '@/components/organisms/TaskStats'
import TaskModal from '@/components/organisms/TaskModal'
import DeleteConfirmModal from '@/components/organisms/DeleteConfirmModal'
import FloatingAddButton from '@/components/molecules/FloatingAddButton'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const TaskListComponent = () => {
const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [sortBy, setSortBy] = useState('dueDate')
  const loadTasks = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      toast.success("Task created successfully!", {
        icon: "✅"
      })
    } catch (err) {
      toast.error("Failed to create task. Please try again.")
      throw err
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsEditModalOpen(true)
  }

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.update(editingTask.id, taskData)
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ))
      toast.success("Task updated successfully!", {
        icon: "✅"
      })
    } catch (err) {
      toast.error("Failed to update task. Please try again.")
      throw err
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId)
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ))
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉", {
          icon: "🎉"
        })
      } else {
        toast.info("Task marked as pending")
      }
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteRequest = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    setTaskToDelete(task)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return
    
    try {
      await taskService.delete(taskToDelete.id)
      setTasks(prev => prev.filter(task => task.id !== taskToDelete.id))
      setIsDeleteModalOpen(false)
      setTaskToDelete(null)
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setTaskToDelete(null)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      {tasks.length > 0 && <TaskStats tasks={tasks} />}

      {/* Task List */}
      {tasks.length === 0 ? (
        <Empty
          title="No tasks yet"
          description="Create your first task to get started with your productivity journey"
          actionText="Create your first task"
          onAction={() => setIsTaskModalOpen(true)}
        />
      ) : (
        <div className="space-y-4">
<div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Your Tasks
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-8 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                >
                  <option value="dueDate">Sort by Due Date</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="createdAt">Sort by Created Date</option>
                  <option value="alphabetical">Sort Alphabetically</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-slate-500">
                {tasks.filter(t => !t.completed).length} pending
              </span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
{tasks
              .sort((a, b) => {
                // Sort by completion status first (incomplete tasks first)
                if (a.completed !== b.completed) {
                  return a.completed ? 1 : -1
                }
                
                // Apply selected sort method
                switch (sortBy) {
                  case 'dueDate':
                    // For tasks with the same completion status, sort by due date priority
                    if (a.completed === b.completed) {
                      const now = new Date()
                      const aOverdue = a.dueDate && new Date(a.dueDate) < now
                      const bOverdue = b.dueDate && new Date(b.dueDate) < now
                      
                      // Overdue tasks first
                      if (aOverdue !== bOverdue) {
                        return aOverdue ? -1 : 1
                      }
                      
                      // Then by due date (closest first)
                      if (a.dueDate && b.dueDate) {
                        return new Date(a.dueDate) - new Date(b.dueDate)
                      }
                      
                      // Tasks with due dates before tasks without
                      if (a.dueDate !== b.dueDate) {
                        return a.dueDate ? -1 : 1
                      }
                    }
                    break
                  
                  case 'priority':
                    // Sort by priority: overdue tasks first, then by due date proximity
                    if (a.completed === b.completed) {
                      const now = new Date()
                      const aDueDate = a.dueDate ? new Date(a.dueDate) : null
                      const bDueDate = b.dueDate ? new Date(b.dueDate) : null
                      
                      // Calculate priority scores (lower is higher priority)
                      const getPriorityScore = (task) => {
                        if (!task.dueDate) return 1000 // No due date = lowest priority
                        const dueDate = new Date(task.dueDate)
                        const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24))
                        
                        if (daysUntilDue < 0) return -Math.abs(daysUntilDue) // Overdue tasks (negative = high priority)
                        if (daysUntilDue === 0) return 0.1 // Due today
                        if (daysUntilDue <= 7) return daysUntilDue // Due this week
                        return 100 + daysUntilDue // Due later
                      }
                      
                      return getPriorityScore(a) - getPriorityScore(b)
                    }
                    break
                  
                  case 'createdAt':
                    // Sort by creation date (newest first)
                    if (a.completed === b.completed) {
                      return new Date(b.createdAt) - new Date(a.createdAt)
                    }
                    break
                  
                  case 'alphabetical':
                    // Sort alphabetically by title
                    if (a.completed === b.completed) {
                      return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
                    }
                    break
                  
                  default:
                    // Default to creation date if unknown sort method
                    if (a.completed === b.completed) {
                      return new Date(b.createdAt) - new Date(a.createdAt)
                    }
                }
                
                // Fallback to creation date for same completion status
                return new Date(b.createdAt) - new Date(a.createdAt)
              })
              .map((task) => (
<TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteRequest}
                  onEdit={handleEditTask}
                />
              ))}
          </AnimatePresence>
        </div>
      )}

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setIsTaskModalOpen(true)} />

      {/* Task Modal */}
<TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateTask}
      />

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingTask(null)
        }}
        onSubmit={handleUpdateTask}
        initialData={editingTask}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        taskTitle={taskToDelete?.title || ""}
      />
    </div>
  )
}

export default TaskListComponent