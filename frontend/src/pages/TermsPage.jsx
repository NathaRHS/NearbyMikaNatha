import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/conditionGenerale.css'

function TermsPage() {
  return (
    <div className="container">
      <Header />
      <section className="generalTerms">
        <div className="termsIntro">
          <p className="eyebrow">Shop with confidence</p>
          <h1>Terms of Service</h1>
          <p>
           This website is operated by NEARBY SHOP LLC. Throughout
                        the site, the terms “we”, “us” and “our” refer to
                        NEARBY SHOP LLC. By visiting our site and/or purchasing
                        something from us, you engage in our “Service” and agree
                        to be bound by the following terms and conditions.
          </p>
        </div>

        <div className="termsGrid">
          <article className="termCard">
            <h3>1. Legal Entity &amp; Binding Agreement</h3>
            <ul className="termList">
              <li>Company Name: NEARBY SHOP LLC.</li>
              <li>Registered Office: 117 S LEXINGTON ST STE 100, HARRISONVILLE MO 64701, USA.</li>
              <li>Federal EIN: 30-1452716.</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>2. Shipping Policy &amp; Options</h3>
            <p>To ensure a reliable experience for our customers in Australia and Asia, we offer two distinct shipping methods from our international distribution centers:</p>
            <ul className="termList">
              <li>Standard Shipping: Reliable delivery with a typical timeframe of 02 to 04 business days.</li>
              <li>VIP Priority Shipping: Our premium service including Express Delivery and Full Shipping Insurance. This option provides a shorter delivery window of 24 hours business days and covers the package against loss or damage during transit.</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>3. Customs, Duties &amp; Taxes (DDP Strategy)</h3>
            <p>NEARBY SHOP LLC manages the importation process to our regional hubs on a Delivered Duty Paid (DDP) basis.</p>
            <ul className="termList">
              <li>All-Inclusive Pricing: The final price at checkout includes all applicable import duties and local taxes (such as GST/VAT).</li>
              <li>No Hidden Fees: You will not be required to pay additional customs or clearance fees upon the arrival of your package at your doorstep.</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>4. Refund &amp; Return Policy</h3>
            <p>We strive for 100% customer satisfaction.</p>
            <ul className="termList">
              <li>Return Period: Customers have 30 days from the date of delivery to request a return.</li>
              <li>Condition: Items must be unused, in their original packaging, and in the same condition as received.</li>
              <li>Refund Process: Approved refunds will be processed to the original method of payment.</li>
              <li>VIP Insurance: For VIP Shipping customers, insurance claims for damaged items must be submitted within 48 hours of delivery.</li>
            </ul>
          </article>

          <article className="termCard">
            <h3>5. Governing Law</h3>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the State of Missouri, United States. Any disputes shall be subject to the exclusive jurisdiction of the courts in Missouri.</p>
          </article>

          <article className="termCard">
            <h3>6. Contact Information</h3>
            <ul className="termList">
              <li>Email: contact@nearby-shop.store</li>
              <li>Phone: +18165830032</li>
              <li>Mailing Address: 117 S LEXINGTON ST STE 100, HARRISONVILLE MO 64701, USA</li>
            </ul>
          </article>
        </div>

        <div className="termsClosing">
          <h3>Important Notice</h3>
          <p>By continuing to use this website and placing an order, you acknowledge that you have read and accepted these Terms of Service.</p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default TermsPage
