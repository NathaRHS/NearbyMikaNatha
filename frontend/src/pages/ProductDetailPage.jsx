import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { fetchProductDetails } from '../services/catalogApi'
import '../styles/productDetail.css'

function getProductIdFromPath() {
  const segments = window.location.pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  if (!lastSegment || lastSegment === 'product-detail') {
    return null
  }

  const parsed = Number(lastSegment)
  return Number.isNaN(parsed) ? null : parsed
}

function formatPrice(value) {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return ''
  }

  return `$${numericValue.toFixed(2)}`
}

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const productId = getProductIdFromPath()

    async function loadProduct() {
      if (!productId) {
        setProduct({
          nom: 'Classic Summer Straw Hat - Natural Beige',
          description: '',
          prix: 29.99,
          imageUrl: '/images/prod.avif',
        })
        setIsLoading(false)
        return
      }

      try {
        const data = await fetchProductDetails(productId)

        if (isMounted && data) {
          setProduct(data)
        }
      } catch {
        if (isMounted) {
          setProduct({
            nom: 'Classic Summer Straw Hat - Natural Beige',
            description: '',
            prix: 29.99,
            imageUrl: '/images/prod.avif',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadProduct()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="container">
      <Header />
      <section className="productDetail">
        <div className="left">
          {isLoading || !product ? (
            <div className="productDetailImagePlaceholder" aria-hidden="true"></div>
          ) : (
            <img src={product.imageUrl} alt="" />
          )}
        </div>
        <div className="right">
          <h1 className="productName">{product?.nom ?? ''}</h1>
          <h3 className="quality">Effortless elegance for sunny days</h3>
          <div className="prices">
            <p className="DetailOldPrice"></p>
            <p className="DetailNewPrice">{formatPrice(product?.prix)}</p>
          </div>
          <div className="quantity-box">
            <button
              className="quantity-btn"
              id="minus"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              -
            </button>
            <div className="quantity-value" id="value">{quantity}</div>
            <button
              className="quantity-btn"
              id="plus"
              onClick={() => setQuantity((value) => value + 1)}
            >
              +
            </button>
          </div>
          <button className="addToBag">Add to bag</button>
          <section className="product-description">
            <p className="product-summary">{product?.description || ''}</p>

            <h3 className="product-details-title">Details</h3>

            <ul className="product-details-list">
              <li><strong>Product:</strong> {product?.nom || '-'}</li>
              <li><strong>Price:</strong> {formatPrice(product?.prix) || '-'}</li>
            </ul>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ProductDetailPage
