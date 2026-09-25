import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

function CartIcon() {
  const { totalItems } = useCart()
  return (
    <span className="cart-icon">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.2 14h9.9a2 2 0 0 0 1.8-1.1l3.1-6.4A1 1 0 0 0 21 5H6.2l-.9-2H2v2h2l3.6 7.6-1.4 2.4A2 2 0 0 0 8 18h12v-2H8l1.1-2Z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="cart-icon__badge" key={totalItems}>
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </span>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const closeMenu = () => setMenuOpen(false)

  // El menú hamburguesa se cierra al navegar (onClick en cada link) o con Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Navegación principal">
        <Link to="/" className="navbar__logo" aria-label="NexaShop, ir al inicio" onClick={closeMenu}>
          <span className="navbar__logo-mark" aria-hidden="true">N</span>
          <span className="navbar__logo-text">
            Nexa<strong>Shop</strong>
          </span>
        </Link>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul
          id="navbar-menu"
          className={`navbar__links ${menuOpen ? 'is-open' : ''}`}
        >
          <li>
            <NavLink to="/" end className="navbar__link" onClick={closeMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/carrito"
              className="navbar__link navbar__link--cart"
              onClick={closeMenu}
              aria-label={`Carrito, ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
            >
              <CartIcon />
              <span className="navbar__cart-text">Carrito</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
