import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProductDetailPage from '../pages/ProductDetailPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductDetailPage />
  </StrictMode>,
)
