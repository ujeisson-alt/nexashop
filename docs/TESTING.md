# 🧪 Testing manual — NexaShop

Registro del testing manual sistemático (Etapa 8). Viewports probados: **390×844** (mobile), **768×1024** (tablet) y **1366×900** (desktop).

## Checklist funcional

### Home y catálogo
- [x] Los productos de FakeStoreAPI se cargan y se ven en la grilla
- [x] El skeleton loader aparece mientras cargan los datos
- [x] El filtro por categoría muestra solo productos de esa categoría
- [x] El filtro de precio mínimo/máximo funciona correctamente
- [x] La búsqueda de texto funciona en tiempo real y es case-insensitive
- [x] Los tres filtros se pueden combinar al mismo tiempo
- [x] El botón “Limpiar filtros” resetea todos los filtros a sus valores iniciales
- [x] Se muestra el contador de resultados (“Mostrando X de Y productos”)
- [x] Cuando no hay resultados, se muestra el estado vacío

### Detalle de producto
- [x] Al hacer clic en una card, navega al detalle correcto según el ID
- [x] El breadcrumb muestra: Inicio › Categoría › Nombre del producto
- [x] El selector de cantidad funciona (mínimo 1, sin límite máximo)
- [x] El botón “Agregar al carrito” agrega la cantidad seleccionada
- [x] Los productos relacionados muestran hasta 4 items de la misma categoría
- [x] El título de la pestaña del navegador muestra el nombre del producto
- [x] Un ID inexistente (`/producto/999`) muestra “Producto no encontrado”

### Carrito de compras
- [x] El contador del Navbar se actualiza al agregar o quitar productos
- [x] Los controles +/- actualizan la cantidad y recalculan el total
- [x] Al llegar a 0 con el botón −, el item se elimina del carrito
- [x] El botón “Eliminar” remueve el item correctamente
- [x] El total se recalcula en tiempo real al modificar cantidades
- [x] El carrito persiste al recargar la página (F5)
- [x] El modal de confirmación aparece al hacer clic en “Finalizar compra”
- [x] Después de confirmar, el carrito queda vacío y redirige al Home

### Responsive design
- [x] No hay scroll horizontal en ningún tamaño de pantalla
- [x] La grilla es de 1 columna en mobile, 2 en tablet, 3-4 en desktop
- [x] El menú hamburguesa funciona y se cierra al navegar
- [x] El carrito se ve bien en mobile (lista vertical) y desktop (tabla)
- [x] El detalle de producto es una columna en mobile, dos en desktop

## Checklist técnico
- [x] No hay errores rojos en la consola del navegador
- [x] `npm run build` termina exitosamente sin errores
- [x] La app funciona en Chrome (deploy verificado) — [ ] Firefox y Edge: pendiente de prueba manual
- [x] Todas las imágenes tienen atributo `alt` descriptivo
- [x] Los botones de ícono tienen `aria-label`
- [x] El README.md está completo con descripción, tecnologías y link al deploy
- [x] El repositorio tiene al menos 20 commits con mensajes semánticos

## Bugs encontrados y corregidos

| # | Bug | Causa | Solución |
|---|---|---|---|
| 1 | El logo mostraba “Nexa Shop” separado | El `gap` del flex se aplicaba entre el texto y el `<strong>` | Envolver el texto del logo en un `<span>` |
| 2 | En mobile el separador `›` del breadcrumb quedaba pegado al nombre del producto | `display: block` en el último `<li>` anulaba el `gap` | Mantener el `li` en flex y aplicar el _ellipsis_ a un `<span>` interno |
| 3 | El botón “✓ Agregado” se veía azul al tener el mouse encima | El `:hover` de `.btn--primary` tenía más especificidad | Regla `.btn--primary.is-added:hover` con el color de éxito |
| 4 | Al pasar de un producto relacionado a otro, la cantidad elegida se mantenía | El componente no se desmontaba al cambiar el `:id` | Renderizar `<ProductDetail key={id} />` |
| 5 | Al recargar después de comprar, el aviso “¡Gracias por tu compra!” reaparecía | El `location.state` se conservaba en el historial | Reemplazar la entrada del historial sin `state` al mostrar el aviso |
| 6 | Recargar `/carrito` en producción daba 404 | El servidor no conoce las rutas de React Router | `404.html` como copia de `index.html` en GitHub Pages; `vercel.json` y `_redirects` para Vercel/Netlify |
| 7 | En GitHub Pages los assets y rutas apuntaban a la raíz del dominio | La app vive en el subdirectorio `/nexashop/` | `base` condicional en `vite.config.js` y `basename` en `BrowserRouter` |
