import tasksData from '@/services/mockData/tasks.json'

let tasks = [...tasksData]

// Helper function to generate UUID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Helper function to save to localStorage
const saveToStorage = () => {
  localStorage.setItem('taskflow-tasks', JSON.stringify(tasks))
}

// Helper function to load from localStorage
const loadFromStorage = () => {
  const stored = localStorage.getItem('taskflow-tasks')
  if (stored) {
    tasks = JSON.parse(stored)
  }
}

// Initialize from localStorage
loadFromStorage()

const taskService = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        loadFromStorage()
        resolve([...tasks])
      }, 100)
    })
  },

  getById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        loadFromStorage()
        const task = tasks.find(task => task.id === id)
        resolve(task ? { ...task } : null)
      }, 100)
    })
  },

  create: (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: generateId(),
          title: taskData.title,
          description: taskData.description || "",
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        tasks.push(newTask)
        saveToStorage()
        resolve({ ...newTask })
      }, 200)
    })
  },

  update: (id, updateData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = tasks.findIndex(task => task.id === id)
        if (index !== -1) {
          tasks[index] = {
            ...tasks[index],
            ...updateData,
            updatedAt: new Date().toISOString()
          }
          saveToStorage()
          resolve({ ...tasks[index] })
        } else {
          resolve(null)
        }
      }, 200)
    })
  },

  delete: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = tasks.findIndex(task => task.id === id)
        if (index !== -1) {
          const deletedTask = tasks.splice(index, 1)[0]
          saveToStorage()
          resolve({ ...deletedTask })
        } else {
          resolve(null)
        }
      }, 200)
    })
  },

  toggleComplete: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = tasks.findIndex(task => task.id === id)
        if (index !== -1) {
          tasks[index] = {
            ...tasks[index],
            completed: !tasks[index].completed,
            updatedAt: new Date().toISOString()
          }
          saveToStorage()
          resolve({ ...tasks[index] })
        } else {
          resolve(null)
        }
      }, 200)
    })
  }
}

export default taskService