import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { initializeScrollReveal } from '../scroll'
import '../styles/style.css'

function HomePage() {
  useEffect(() => initializeScrollReveal(), [])

  return (
    <div className="container">
      <Header />
      <section className="mainImages">
        <div className="bigImageRight">
          <h3>Special offers</h3>
          <h1>Trending products</h1>
          <button className="bigButton">Shop now</button>
        </div>
        <div className="bigImageLeft">
          <h3>Special offers</h3>
          <h1>Trending products</h1>
          <button className="bigButton">Shop now</button>
        </div>
      </section>
      <section className="productClassicCasual">
        <div className="classics">
          <img src="/images/classicImage.avif" alt="" />
          <div className="card">
            <h1>Classics</h1>
            <p className="description">Timeless and elegant designs for a refined style on every occasion.</p>
            <button>See more</button>
          </div>
        </div>
        <div className="Casual">
          <img src="/images/Casualmage.avif" alt="" />
          <div className="card">
            <h1>Classics</h1>
            <p className="description">Timeless and elegant designs for a refined style on every occasion.</p>
            <button>See more</button>
          </div>
        </div>
      </section>
      <section className="pontSection">
        <h1>Our products</h1>
        <p>Discover our selection of products for all your needs.</p>
      </section>

      <section className="productsGrid">
        <div className="product">
          <a href="ProductDetail.html"><img src="/images/prod.avif" alt="" width="300" /></a>
          <div className="productInformation">
            <h2>Wide-Brim Straw Hat with Leather Band - Natural Beige</h2>
            <div className="prices">
              <p className="oldPrice">$49.99</p>
              <p className="newPrice">$29.99</p>
            </div>
          </div>
        </div>

        <div className="product">
          <img src="/images/pd2.avif" alt="" width="300" />
          <div className="productInformation">
            <h2>Wide-Brim Straw Hat with Leather Band - Natural Beige</h2>
            <div className="prices">
              <p className="oldPrice">$49.99</p>
              <p className="newPrice">$29.99</p>
            </div>
          </div>
        </div>
        <div className="product">
          <img src="/images/pd3.avif" alt="" width="300" />
          <div className="productInformation">
            <h2>Wide-Brim Straw Hat with Leather Band - Natural Beige</h2>
            <div className="prices">
              <p className="oldPrice">$49.99</p>
              <p className="newPrice">$29.99</p>
            </div>
          </div>
        </div>
        <div className="product">
          <img src="/images/pd4.avif" alt="" width="300" />
          <div className="productInformation">
            <h2>Wide-Brim Straw Hat with Leather Band - Natural Beige</h2>
            <div className="prices">
              <p className="oldPrice">$49.99</p>
              <p className="newPrice">$29.99</p>
            </div>
          </div>
        </div>
        <div className="product">
          <img src="/images/pd5.avif" alt="" width="300" />
          <div className="productInformation">
            <h2>Wide-Brim Straw Hat with Leather Band - Natural Beige</h2>
            <div className="prices">
              <p className="oldPrice">$49.99</p>
              <p className="newPrice">$29.99</p>
            </div>
          </div>
        </div>
        <div className="product">
          <img src="/images/pd6.avif" alt="" width="300" />
          <div className="productInformation">
            <h2>Wide-Brim Straw Hat with Leather Band - Natural Beige</h2>
            <div className="prices">
              <p className="oldPrice">$49.99</p>
              <p className="newPrice">$29.99</p>
            </div>
          </div>
        </div>
        <div className="product">
          <img src="/images/pd7.avif" alt="" width="300" />
          <div className="productInformation">
            <h2>Wide-Brim Straw Hat with Leather Band - Natural Beige</h2>
            <div className="prices">
              <p className="oldPrice">$49.99</p>
              <p className="newPrice">$29.99</p>
            </div>
          </div>
        </div>
        <div className="product">
          <img src="/images/imageTest.jpeg" alt="" width="300" />
          <div className="productInformation">
            <h2>Wide-Brim Straw Hat with Leather Band - Natural Beige</h2>
            <div className="prices">
              <p className="oldPrice">$49.99</p>
              <p className="newPrice">$29.99</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
