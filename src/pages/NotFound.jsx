import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

function NotFound() {
  useDocumentTitle('Página no encontrada')
  return (
    <div className="state-box">
      <span className="state-box__icon" aria-hidden="true">🧭</span>
      <p className="state-box__title">Error 404 — Página no encontrada</p>
      <p>La página que buscás no existe o cambió de dirección.</p>
      <Link to="/" className="btn btn--primary">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
