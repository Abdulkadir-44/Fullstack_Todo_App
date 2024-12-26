import { useState, useEffect } from 'react'

const TodosTabs = ({ children }) => {

  /*bir önceki tab değerini almak için burda bu kodu yazdım çünkü notları her güncellediğimde activeTab 0 oluyordu ama ben activeTabın 1. veya 2.
  tabında'da olabiliyorum sürekli 0'a atması çok rahatsız edici olduğundan bu yöntemi uyguladım */
  const [activeTab, setActiveTab] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount ? JSON.parse(savedCount) : 0;
  })

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(activeTab));
  }, [activeTab])

  return (
    <div className='bg-custom-image bg-left rounded-md pb-4 min-h-80'>
      <nav className='flex items-center gap-1'>
        {
          children.map((child, index) => (
            <button
              className={` px-2 py-1  duration-200 border-b border-gray-300  ${activeTab == index ? 'bg-gray-300 rounded-tr-md rounded-tl-md text-blue-800' : 'bg-transparent text-blue-100'}`}
              onClick={() => setActiveTab(index)}
              key={index}
            >
              {child.props.title}
            </button>
          ))
        }
      </nav>
      <div
        className='mt-5 px-5 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3'>
        {children[activeTab]}
      </div>
    </div>
  )
}


TodosTabs.Panel = function ({ children }) {

  return (
    <>
      {children}
    </>

  )
}

export default TodosTabs