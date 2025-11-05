import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FloatingAddButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full p-0 shadow-2xl fab-pulse hover:scale-110 active:scale-95 transition-all duration-200 group"
        size="lg"
      >
        <ApperIcon 
          name="Plus" 
          size={24} 
          className="group-hover:rotate-90 transition-transform duration-200" 
        />
      </Button>
    </div>
  )
}

export default FloatingAddButton