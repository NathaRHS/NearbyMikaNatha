import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/AboutUs.css'

function AboutUsPage() {
  return (
    <div className="container">
      <Header />

      <section className="AboutUs">
        <div className="aboutHero">
          <p className="aboutEyebrow">About Us</p>
          <h1>Our Story - Modern Logistics, Global Reach</h1>
          <p className="aboutLead">Welcome to NEARBY SHOP LLC.</p>
        </div>

        <div className="aboutGrid">
          <article className="aboutCard aboutCardWide">
            <h2>Our Story</h2>
            <p>Nearby Shop LLC is at the forefront of the intelligent commerce era, delivering next-generation retail analytics powered by advanced AI. Our core mission is to transform everyday retail data into strategic insights that empower stores to understand customer behavior, optimize inventory, and maximize sales performance.</p>
            <p>By meticulously collecting and analyzing daily market data, we identify emerging trends to provide Nearby Shop branded products specifically engineered to meet the unique needs of consumers in the United States, Asia, and across the globe. We don't just observe the market; we use data to shape a brighter future for retail, delivering excellence to our global community through passion and precision</p>
          </article>

          <article className="aboutCard">
            <h2>Who We Are</h2>
            <p>NEARBY SHOP LLC is a registered American entity dedicated to curating and delivering high-quality goods through a sophisticated, tech-driven supply chain. Our operations are anchored at our headquarters at 117 S Lexington St, Harrisonville, MO, where we manage our global strategy, financial integrity, and customer experience.</p>
          </article>

          <article className="aboutCard">
            <h2>Our Global Logistics Edge</h2>
            <p>We understand that in 2026, speed and reliability are everything. That is why we have pioneered a "Global-Local" model:</p>
            <ul className="aboutList">
              <li>US Standards: Our business follows strict US quality and data protection standards, identified by our federal Employer Identification Number (EIN).</li>
              <li>Direct-to-Customer: We leverage strategic international distribution hubs to guarantee rapid delivery to the United States, Asia, and worldwide, ensuring our global customers receive their orders with record speed</li>
            </ul>
          </article>
        </div>

        <div className="aboutClosing">
          <h2>Our Commitment to You</h2>
          <p>At NEARBY SHOP LLC, you aren't just a customer; you are part of a global community. Whether you are in Sydney, Singapore, or Kuala Lumpur, our dedicated international support team is available to ensure your shopping experience is seamless, secure, and satisfying.</p>
          <p className="aboutSignature">Nearby Shop LLC<br />Missouri, USA</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUsPage
