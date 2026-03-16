import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/productDetail.css'

function ProductDetailPage() {
  return (
    <div className="container">
      <Header />
      <section className="productDetail">
        <div className="left">
          <img src="/images/prod.avif" alt="" />
        </div>
        <div className="right">
          <h1 className="productName">Classic Summer Straw Hat â€“ Natural Beige</h1>
          <h3 className="quality">Effortless elegance for sunny days</h3>
          <div className="prices">
            <p className="DetailOldPrice"></p>
            <p className="DetailNewPrice"></p>
          </div>
          <div className="quantity-box">
            <button className="quantity-btn" id="minus">-</button>
            <div className="quantity-value" id="value">1</div>
            <button className="quantity-btn" id="plus">+</button>
          </div>
          <button className="addToBag">Add to bag</button>
          <section className="product-description">
            <p className="product-summary">
              Bring a touch of effortless elegance to your summer look with this classic straw hat in natural beige.
              Lightweight and breathable, it ensures comfort while offering reliable sun protection. Its minimalist
              design makes it versatileâ€”perfect for beach outings, vacations, or simply strolling through the city
              with style.
            </p>

            <h3 className="product-details-title">Details</h3>

            <ul className="product-details-list">
              <li><strong>Material:</strong> Woven straw</li>
              <li><strong>Color:</strong> Natural Beige</li>
              <li>Minimalist, versatile design</li>
              <li>Lightweight &amp; breathable</li>
              <li>Perfect for everyday summer wear</li>
            </ul>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ProductDetailPage
