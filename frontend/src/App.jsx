import AboutUsPage from './pages/AboutUsPage'
import FaqPage from './pages/FaqPage'
import HomePage from './pages/HomePage'
import LegalNoticePage from './pages/LegalNoticePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ProductDetailPage from './pages/ProductDetailPage'
import TermsPage from './pages/TermsPage'
import AdminPage from './pages/admin/AdminPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import { usePathname } from './router'

const routes = {
  '/': HomePage,
  '/about-us': AboutUsPage,
  '/faq': FaqPage,
  '/legal-notice': LegalNoticePage,
  '/privacy-policy': PrivacyPolicyPage,
  '/product-detail': ProductDetailPage,
  '/terms': TermsPage,
  '/admin': AdminPage,
  '/admin/login': AdminLoginPage,
}

function App() {
  const pathname = usePathname()
  const Page =
    routes[pathname] ||
    (pathname.startsWith('/product-detail/') ? ProductDetailPage : null) ||
    HomePage

  return <Page key={pathname} />
}

export default App
