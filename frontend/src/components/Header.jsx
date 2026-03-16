function Header() {
  return (
    <header>
      <a href="#">
        <div className="logo">
          <img src="/images/logo-removebg-preview.png" alt="" width="70" />
        </div>
      </a>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
