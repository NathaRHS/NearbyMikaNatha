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
  const [activeImage, setActiveImage] = useState('')
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%')

  function handleMainImageMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const offsetX = ((event.clientX - bounds.left) / bounds.width) * 100
    const offsetY = ((event.clientY - bounds.top) / bounds.height) * 100

    setZoomOrigin(`${offsetX}% ${offsetY}%`)
  }

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
          images: ['/images/prod.avif'],
        })
        setActiveImage('/images/prod.avif')
        setIsLoading(false)
        return
      }

      try {
        const data = await fetchProductDetails(productId)

        if (isMounted && data) {
          setProduct(data)
          setActiveImage(data.images?.[0] || data.imageUrl)
          setZoomOrigin('50% 50%')
        }
      } catch {
        if (isMounted) {
          setProduct({
            nom: 'Classic Summer Straw Hat - Natural Beige',
            description: '',
            prix: 29.99,
            imageUrl: '/images/prod.avif',
            images: ['/images/prod.avif'],
          })
          setActiveImage('/images/prod.avif')
          setZoomOrigin('50% 50%')
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
            <div className="productDetailGalleryPlaceholder" aria-hidden="true">
              <div className="productDetailThumbsPlaceholder">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="productDetailThumbPlaceholder" key={index}></div>
                ))}
              </div>
              <div className="productDetailImagePlaceholder"></div>
            </div>
          ) : (
            <div className="productMedia">
              <div className="productThumbs">
                {(product.images || []).slice(0, 4).map((imageUrl, index) => (
                  <button
                    key={`${imageUrl}-${index}`}
                    type="button"
                    className={`productThumb ${activeImage === imageUrl ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveImage(imageUrl)}
                    onFocus={() => setActiveImage(imageUrl)}
                    onClick={() => setActiveImage(imageUrl)}
                  >
                    <img src={imageUrl} alt="" />
                  </button>
                ))}
              </div>
              <div
                className={`productMainImage ${isZoomed ? 'is-zoomed' : ''}`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => {
                  setIsZoomed(false)
                  setZoomOrigin('50% 50%')
                }}
                onMouseMove={handleMainImageMove}
              >
                <img
                  src={activeImage || product.imageUrl}
                  alt=""
                  style={{ transformOrigin: zoomOrigin }}
                />
              </div>
            </div>
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
