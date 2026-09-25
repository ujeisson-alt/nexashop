import { useEffect, useRef } from 'react'
import './ConfirmModal.css'

function ConfirmModal({ open, title, children, confirmText = 'Confirmar', onConfirm, onCancel }) {
  const confirmRef = useRef(null)

  useEffect(() => {
    if (!open) return
    confirmRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden' // bloquear scroll de fondo
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="modal__title">
          {title}
        </h2>
        <div className="modal__body">{children}</div>
        <div className="modal__actions">
          <button type="button" className="btn btn--outline" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="btn btn--primary" onClick={onConfirm} ref={confirmRef}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
