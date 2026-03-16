import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LegalNoticePage from '../pages/LegalNoticePage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalNoticePage />
  </StrictMode>,
)
