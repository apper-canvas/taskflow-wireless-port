import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import { cn } from "@/utils/cn";

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit }) => {
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
    initial={{
        opacity: 0,
        y: 20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    exit={{
        opacity: 0,
        x: -100
    }}
    transition={{
        duration: 0.3,
        ease: "easeOut"
    }}
    onClick={() => onEdit && onEdit(task)}
    className={cn(
        "task-card bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer",
        task.completed && "task-completed"
    )}>
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
            <Checkbox checked={task.completed} onChange={handleToggleComplete} />
        </div>
        <div className="flex-1 min-w-0">
            <h3
                className={cn(
                    "text-lg font-semibold text-slate-900 mb-2 transition-all duration-200",
                    task.completed && "line-through text-slate-500"
                )}>
                {task.title}
            </h3>
{task.notes && <p
                className={cn(
                    "text-slate-600 leading-relaxed transition-all duration-200",
                    task.completed && "line-through text-slate-400"
                )}>
                {task.notes.length > 120 ? `${task.notes.substring(0, 120)}...` : task.notes}
            </p>}
{/* Attachments Indicators */}
            {task.attachments && task.attachments.length > 0 && (
              <div className="flex items-center gap-2 mt-2 text-xs">
                {task.attachments.some(att => att.type === 'file') && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                    <ApperIcon name="FileText" size={12} />
                    <span>{task.attachments.filter(att => att.type === 'file').length}</span>
                  </div>
                )}
                {task.attachments.some(att => att.type === 'link') && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full">
                    <ApperIcon name="ExternalLink" size={12} />
                    <span>{task.attachments.filter(att => att.type === 'link').length}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                        <ApperIcon name="Clock" size={12} />
                        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                    {task.dueDate && <div
                        className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                            (() => {
                                const dueDate = new Date(task.dueDate);
                                const today = new Date();
                                const tomorrow = new Date(today);
                                tomorrow.setDate(today.getDate() + 1);

                                if (dueDate < today.setHours(0, 0, 0, 0)) {
                                    return "text-red-600 bg-red-50 border border-red-200";
                                } else if (dueDate.toDateString() === today.toDateString()) {
                                    return "text-amber-600 bg-amber-50 border border-amber-200";
                                } else if (dueDate <= tomorrow.setHours(23, 59, 59, 999)) {
                                    return "text-emerald-600 bg-emerald-50 border border-emerald-200";
                                } else {
                                    return "text-slate-600 bg-slate-50 border border-slate-200";
                                }
                            })()
                        )}>
                        <ApperIcon name="Calendar" size={12} />
                        <span>Due {format(new Date(task.dueDate), "MMM d")}</span>
                    </div>}
                    {task.completed && <div className="flex items-center gap-1 text-emerald-500">
                        <ApperIcon name="CheckCircle" size={12} />
                        <span>Completed</span>
                    </div>}
                </div>
            </div>
            <div className="flex-shrink-0">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-10 h-10 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200">
                    {isDeleting ? <ApperIcon name="Loader2" size={18} className="animate-spin" /> : <ApperIcon name="Trash2" size={18} />}
                </Button>
            </div>
        </div>
    </div></motion.div>
  )
}

export default TaskCard