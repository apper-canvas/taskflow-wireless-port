import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Checkbox from '@/components/atoms/Checkbox'
import Button from '@/components/atoms/Button'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggleComplete = () => {
    onToggleComplete(task.id)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(task.id)
    setIsDeleting(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "task-card bg-white rounded-2xl p-6 shadow-sm border border-slate-100",
        task.completed && "task-completed"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-lg font-semibold text-slate-900 mb-2 transition-all duration-200",
            task.completed && "line-through text-slate-500"
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={cn(
              "text-slate-600 leading-relaxed transition-all duration-200",
              task.completed && "line-through text-slate-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <ApperIcon name="Clock" size={12} />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            {task.completed && (
              <div className="flex items-center gap-1 text-emerald-500">
                <ApperIcon name="CheckCircle" size={12} />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-10 h-10 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            {isDeleting ? (
              <ApperIcon name="Loader2" size={18} className="animate-spin" />
            ) : (
              <ApperIcon name="Trash2" size={18} />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard