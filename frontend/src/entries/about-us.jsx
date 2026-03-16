import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AboutUsPage from '../pages/AboutUsPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutUsPage />
  </StrictMode>,
)
