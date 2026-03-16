import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/conditionGenerale.css'

function PrivacyPolicyPage() {
  return (
    <div className="container">
      <Header />
      <section className="generalTerms">
        <div className="termsIntro">
          <p className="eyebrow">Privacy matters</p>
          <h1>Privacy Policy</h1>
          <p>LAST UPDATED: 2026</p>
          <p>Welcome to NEARBY SHOP LLC. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and purchase our products.</p>
        </div>

        <div className="termsGrid">
          <article className="termCard">
            <h3>1. Introduction</h3>
            <p>Welcome to NEARBY SHOP LLC. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and purchase our products.</p>
          </article>

          <article className="termCard">
            <h3>2. Data Controller</h3>
            <p>NEARBY SHOP LLC, a Missouri Limited Liability Company, is the controller and responsible for your personal data.</p>
            <ul className="termList">
              <li>Business Address: 117 S LEXINGTON ST STE 100, HARRISONVILLE MO 64701, USA.</li>
              <li>Federal EIN: 30-1452716.</li>
              <li>Contact Email: contact@nearby-shop.store</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>3. The Data We Collect</h3>
            <p>We may collect, use, and store different kinds of personal data about you, including:</p>
            <ul className="termList">
              <li>Identity Data: First name, last name.</li>
              <li>Contact Data: Billing address, delivery address, email address, and telephone numbers.</li>
              <li>Financial Data: Payment card details (processed securely via Shopify/Third-party processors).</li>
              <li>Transaction Data: Details about payments to and from you and other details of products you have purchased from us.</li>
              <li>Technical Data: IP address, browser type, and location (used for regional tax compliance and shipping).</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>4. How We Use Your Data</h3>
            <p>We use your data to:</p>
            <ul className="termList">
              <li>Process and deliver your order (Performance of a contract).</li>
              <li>Manage our relationship with you (Customer support).</li>
              <li>Comply with legal and tax obligations (IRS record-keeping for our EIN 30-1452716).</li>
              <li>Improve our website and marketing (Legitimate interests).</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>5. International Transfers</h3>
            <p>As a global business, we process data through Shopify Inc. (Canada/USA) and manage operations through international hubs. By using our site, you acknowledge that your information may be transferred to and processed in the United States and other global locations where our service providers operate. We ensure that all such transfers are protected by appropriate security measures.</p>
          </article>

          <article className="termCard">
            <h3>6. Data Security</h3>
            <p>In accordance with IRS Publication 4557 (Safeguarding Taxpayer Data), we have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees and partners who have a business need to know.</p>
          </article>

          <article className="termCard">
            <h3>7. Your Legal Rights</h3>
            <p>Depending on your location you may have rights to:</p>
            <ul className="termList">
              <li>Request access to your personal data.</li>
              <li>Request correction or erasure of your data.</li>
              <li>Object to processing for marketing purposes. To exercise these rights, please contact us at contact@nearbyshop-store.store</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>8. Third-Party Links</h3>
            <p>This website may include links to third-party websites (e.g., payment gateways). Clicking on those links may allow third parties to collect data about you. We do not control these third-party websites.</p>
          </article>
        </div>

        <div className="termsClosing">
          <h3>9. Contact Details</h3>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <p>NEARBY SHOP LLC 117 S LEXINGTON ST STE 100, HARRISONVILLE MO 64701, USA.</p>
          <p>Tel : +18165830032</p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default PrivacyPolicyPage
