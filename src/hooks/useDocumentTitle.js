import { useEffect } from 'react'

// Actualiza el título de la pestaña del navegador
export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title) document.title = `${title} | NexaShop`
  }, [title])
}
