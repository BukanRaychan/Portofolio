import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <h1 className="text-3xl font-bold">
        Welcome to Fasya Raihan Maulana Portofolio
      </h1>
    </div>
  </StrictMode>,
)
