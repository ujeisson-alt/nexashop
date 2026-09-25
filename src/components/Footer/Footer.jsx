import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          © {year} <strong>NexaShop S.A.</strong> — Proyecto de portfolio.
        </p>
        <p className="footer__muted">
          Datos provistos por{' '}
          <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
            FakeStoreAPI
          </a>
          . Hecho con React + Vite.
        </p>
      </div>
    </footer>
  )
}

export default Footer
