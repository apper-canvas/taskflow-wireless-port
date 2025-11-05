import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import DateInput from "@/components/atoms/DateInput";
import { cn } from "@/utils/cn";

const TaskModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
if (initialData) {
      setFormData({
title: initialData.title || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
        category: initialData.category || ''
      })
    } else {
      setFormData({
        title: '',
description: '',
        dueDate: '',
        category: ''
      })
    }
    setErrors({})
  }, [initialData, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = 'Due date cannot be in the past'
    }

    if (formData.category === 'other' && !formData.customCategory?.trim()) {
      newErrors.category = 'Please specify a custom category'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
try {
      await onSubmit(formData)
      setFormData({ title: '', description: '', dueDate: '' })
      setErrors({})
      onClose()
    } catch (error) {
      setErrors({ submit: 'Failed to save task. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-shake"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Plus" size={18} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {initialData ? 'Edit Task' : 'Create New Task'}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-8 h-8 p-0 text-white/70 hover:text-white hover:bg-white/20 rounded-lg"
                >
                  <ApperIcon name="X" size={18} />
                </Button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
                  Task Title
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your task title..."
                  error={!!errors.title}
                  autoFocus
                  maxLength={100}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <ApperIcon name="AlertCircle" size={14} />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
                  Description <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Add more details about your task..."
                  error={!!errors.description}
                  rows={3}
                  maxLength={500}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <ApperIcon name="AlertCircle" size={14} />
                    {errors.description}
                  </p>
                )}
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{formData.description.length}/500 characters</span>
                </div>
</div>

<div className="space-y-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        category: e.target.value,
                        customCategory: e.target.value === 'other' ? prev.customCategory : ''
                      }))
                      if (errors.category) {
                        setErrors(prev => ({ ...prev, category: '' }))
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-xl bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 ${
                      errors.category ? 'border-red-300 bg-red-50' : 'border-slate-200'
                    }`}
                  >
                    <option value="">Select a category (optional)</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="other">Other...</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                {formData.category === 'other' && (
                  <div>
                    <label htmlFor="customCategory" className="block text-sm font-medium text-slate-700 mb-2">
                      Custom Category
                    </label>
                    <Input
                      id="customCategory"
                      type="text"
                      placeholder="Enter custom category"
                      value={formData.customCategory || ''}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, customCategory: e.target.value }))
                        if (errors.category) {
                          setErrors(prev => ({ ...prev, category: '' }))
                        }
                      }}
                      className={errors.category ? 'border-red-300 bg-red-50' : ''}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Due Date
                </label>
                <DateInput
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  error={!!errors.dueDate}
                  placeholder="Select due date"
                />
                {errors.dueDate && (
                  <p className="text-red-500 text-xs mt-1 animate-shake">
                    {errors.dueDate}
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <ApperIcon name="AlertTriangle" size={16} />
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting || !formData.title.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <ApperIcon name="Loader2" size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Check" size={18} />
                      {initialData ? 'Update Task' : 'Create Task'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TaskModal