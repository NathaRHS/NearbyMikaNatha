import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/conditionGenerale.css'

function LegalNoticePage() {
  return (
    <div className="container">
      <Header />
      <section className="generalTerms">
        <div className="termsIntro">
          <p className="eyebrow">Official information</p>
          <h1>Legal Notice</h1>
          <p>This section provides the official corporate, legal, and operational information relating to NEARBY SHOP LLC and the use of this website.</p>
        </div>

        <div className="termsGrid">
          <article className="termCard">
            <h3>1. Corporate Information</h3>
            <p>This website is owned and operated by NEARBY SHOP LLC, a Limited Liability Company organized and existing under the laws of the State of Missouri, United States.</p>
            <ul className="termList">
              <li>Registered Business Name: <span className="importantLinksSpan" style={{ fontWeight: 'bold' }}>NEARBY SHOP LLC</span></li>
              <li>Federal Employer Identification Number <span style={{ fontWeight: 'bold' }}>(EIN): 30-1452716</span></li>
              <li>Registered Office Address: 117 S LEXINGTON ST STE 100, HARRISONVILLE MO 64701, USA.</li>
              <li>Company Management: Managed by the Board of Directors of Nearby Shop LLC.</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>2. Contact Information</h3>
            <p>For any inquiries, please contact our team through the following official channels:</p>
            <ul className="termList">
              <li>Email: contact@nearbyshop.com</li>
              <li>Phone: +18165830032</li>
              <li>Mailing Address: 117 S LEXINGTON ST STE 100, HARRISONVILLE MO 64701, USA.</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>3. Hosting</h3>
            <p>This website is hosted by Shopify Inc., located at 151 O&apos;Connor Street, Ground Floor, Ottawa, ON K2P 2L8, Canada.</p>
          </article>

          <article className="termCard">
            <h3>4. Intellectual Property</h3>
            <p>All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of NEARBY SHOP LLC and is protected by United States and international copyright laws. Any unauthorized use, reproduction, or distribution of this content is strictly prohibited.</p>
          </article>

          <article className="termCard">
            <h3>5. Limitation of Liability</h3>
            <p>NEARBY SHOP LLC strives to ensure that the information provided on this website is accurate and up-to-date. However, we do not guarantee the completeness or accuracy of the information. NEARBY SHOP LLC shall not be held liable for any direct or indirect damages resulting from the use of this website or the purchase of products through this platform.</p>
          </article>

          <article className="termCard">
            <h3>6. Governing Law</h3>
            <p>These legal notices and all matters relating to the use of this website are governed by and construed in accordance with the laws of the State of Missouri, United States, without regard to its conflict of law principles. Any legal action or proceeding relating to this website shall be instituted exclusively in the federal or state courts located in Missouri.</p>
          </article>

          <article className="termCard">
            <h3>7. Data Protection</h3>
            <p>We are committed to protecting your privacy. All personal data collected through this website is processed in accordance with our Privacy Policy and international data protection standards, including the safeguards recommended by the IRS for protecting taxpayer data (Publication 4557)</p>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default LegalNoticePage
