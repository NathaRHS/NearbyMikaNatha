import { RouterLink } from '../router'

function Header() {
  return (
    <header>
      <RouterLink to="/">
        <div className="logo">
          <img src="/images/logo-removebg-preview.png" alt="" width="70" />
        </div>
      </RouterLink>
      <nav>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about-us">About</RouterLink></li>
          <li><RouterLink to="/faq">Services</RouterLink></li>
          <li><a href="#footer">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
