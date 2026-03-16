import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { initializeScrollReveal } from '../scroll'
import '../styles/compte.css'

function FaqPage() {
  useEffect(() => initializeScrollReveal(), [])

  return (
    <div className="container">
      <Header />

      <main className="questions">
        <section className="faqHero">
          <h1 id="title">FAQ</h1>
        </section>

        <section className="faqSection">
          <article className="question">
            <h2>Do I have to create an account to order?</h2>
            <p>No, it is not a requirement. You can place an order as a guest. All you need to do is enter your delivery information (Last name, First name, Address, Phone number) and your email address to receive your confirmation and tracking of your package.</p>
          </article>

          <article className="question">
            <h2>How do I know if my order has been successfully processed?</h2>
            <p>Once your payment is validated, you will receive a confirmation email containing the summary of your purchases and your order number. Remember to check your spam if you do not see it appear in your inbox.</p>
          </article>

          <article className="question">
            <h2>Can I modify or cancel my order after validation?</h2>
            <p>We process orders quickly to guarantee you a fast delivery. You have a short period (approximately 24 hours) to contact us by [email/phone] in order to modify information or cancel the purchase. Once the package is shipped, no modification is possible.</p>
          </article>

          <article className="question">
            <h2>How to track my order if I donâ€™t have an account?</h2>
            <p>Itâ€™s very simple! As soon as your package leaves our warehouse, you receive a shipping email containing a carrier tracking link. You will be able to follow each step of the delivery in real time.</p>
          </article>
        </section>

        <section className="faqSection faqSectionAccent">
          <div className="sectionHeading">
            <h2>Payment (Finalizing)</h2>
          </div>

          <article className="question">
            <h2>What are the accepted means of payment?</h2>
            <p>We accept the following payment methods, all 100% secure:</p>
            <ul className="answerList">
              <li>Bank cards: Visa, Mastercard, Carte Bleue.</li>
              <li>Mobile payments: Apple Pay, Google Pay.</li>
              <li>Optional: PayPal.</li>
            </ul>
          </article>

          <article className="question">
            <h2>Is the payment secure?</h2>
            <p>Absolutely. We use the SSL (Secure Socket Layer) encryption protocol which guarantees the protection of your banking data. Your payment information is never stored on our servers.</p>
          </article>

          <article className="question">
            <h2>Is my personal information protected?</h2>
            <p>In accordance with the GDPR, the information collected during your order (name, address, phone number, email) is only used for the processing and delivery of your package. We never resell your data to third parties.</p>
          </article>

          <article className="question">
            <h2>Why was my payment declined?</h2>
            <p>A refusal may be due to several factors (card limit reached, security code entry error, 3D Secure authentication not validated). We advise you to contact your bank or try again with another payment method.</p>
          </article>
        </section>

        <section className="faqSection">
          <article className="question">
            <h2>What are the different existing deliveries?</h2>
            <p>Shipping option: Standard Shipping Reliable delivery with a typical timeframe of 02 to 04 business days and VIP Priority Shipping â€“ It is our premium service including Express Delivery and Full Shipping Insurance. This option provides a shorter delivery window of 24 hours business days and covers the package against loss or damage during transit.</p>
          </article>

          <article className="question">
            <h2>Do I have to pay a tax when ordering ?</h2>
            <p>The final price at checkout includes all applicable import duties and local taxes. You will not be required to pay additional customs or clearance fees upon the arrival of your package at your doorstep</p>
          </article>

          <article className="question">
            <h2>What are the conditions for a refund and return of goods?</h2>
            <ul className="answerList">
              <li>Return Period: Customers have 30 days from the date of delivery to request a return.</li>
              <li>Condition: Items must be unused, in their original packaging, and in the same condition as received.</li>
              <li>Refund Process: Approved refunds will be processed to the original method of payment.</li>
              <li>VIP Insurance: For VIP Shipping customers, insurance claims for damaged items must be submitted within 48 hours of delivery</li>
            </ul>
          </article>
        </section>

        <section className="faqContact">
          <p>You havenâ€™t found your answer? Contact our team here: contact@nearby-shop.store or send sms to +18165830032</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default FaqPage
