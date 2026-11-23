# CheckList-Movil

Formularios web de inspección de vehículos y equipos. El trabajador completa el formulario en el celular y, al presionar **Generar y Enviar Reporte**:

1. Los datos se guardan como una fila en un Google Sheet.
2. El PDF se envía por correo a los destinatarios configurados.
3. El PDF queda en el teléfono (descarga directa en Android, menú de compartir en iPhone).

Es un sitio estático (HTML + JavaScript, sin build). El único backend es un Google Apps Script.

## Formularios activos

Son los que aparecen en `index.html`.

| Código | Formulario | Carpeta |
|---|---|---|
| CHECK-MOVIL-0001 | Furgón Carrozado | `formularios/check-vehiculos-001` |
| CHECK-MOVIL-0003 | Carro de Arrastre | `formularios/check-carro-003` |
| CHECK-MOVIL-0008 | Hidroelevador Aislado | `formularios/check-hidroaislado-008` |
| CHECK-MOVIL-0009 | Camioneta | `formularios/check-camioneta-009` |
| CHECK-MOVIL-0010 | Camión Pluma | `formularios/check-pluma-010` |

Cada carpeta tiene un `.html` (la tabla del checklist está escrita directamente en el HTML) y un `.js` (firma, fotos, PDF y envío).

### Formularios sin uso

`check-rodillo-002`, `check-retroexcavadora-004` y `check-excavadora-005` siguen en el repo, pero no están en el menú. No envían datos al Sheet ni correo, y abren el PDF en una pestaña nueva. Se pueden eliminar o actualizar si se vuelven a necesitar.

## Cómo funciona

```
Formulario (Netlify)
   ├─ fetch POST ──► Apps Script ──► Google Sheet (una pestaña por formulario)
   ├─ fetch POST ──► Apps Script ──► Correo con el PDF adjunto
   └─ Android: descarga directa · iPhone: menú de compartir
```

- La URL del Apps Script está en la constante `GOOGLE_SHEETS_URL`, al inicio del `.js` de cada formulario (5 archivos).
- Los dos envíos usan `mode: 'no-cors'`, así que la página no puede saber si el servidor los recibió. El mensaje "Reporte enviado" es optimista.
- El nombre del PDF es `CHECK-MOVIL-XXXX_PATENTE_FECHA.pdf`.
- Las fotos se comprimen antes de agregarse (máximo 1200 px, JPEG 80 %). Máximo 16 fotos.

## Publicación (deploy)

Netlify está conectado a este repositorio. Cada push a `main` publica el sitio automáticamente en 1 o 2 minutos. No hay paso de build.

## Apps Script (backend)

El backend es un Google Apps Script publicado como aplicación web. **Su código no está en este repositorio**: vive en la cuenta de Google dueña del Sheet, en Extensiones → Apps Script del propio Sheet. Quien reciba el proyecto debe asegurarse de tener acceso a esa cuenta y de conservar una copia del código.

Recibe una petición `POST` con JSON y hace una de dos cosas, según el campo `tipo`:

**1. Si `tipo` es `pdf`: envía un correo.**
- Adjunta el PDF recibido (viene codificado en base64).
- Asunto: `Nuevo Check List: <nombre del formulario>`.
- Los destinatarios están escritos en el propio script (campo `to:` de `MailApp.sendEmail`). Para cambiarlos hay que editar el script y publicar una versión nueva.
- El remitente es la cuenta dueña del script.

**2. En cualquier otro caso: guarda una fila en el Google Sheet.**
- Usa una **pestaña por formulario**, con el nombre que envía el formulario (por ejemplo `CHECK-MOVIL-0001 Furgón Carrozado`). Si la pestaña no existe, la crea.
- La primera fila de cada pestaña son los encabezados, y se crean con el primer envío. Después no se modifican.
- Columnas comunes: Fecha Envío (hora de Chile), Formulario, Fecha, Patente, Conductor, RUT, Marca, Modelo, Kilometraje, Observaciones, Impacto Carrocería.
- Columnas que solo aparecen en algunos formularios:
  - Cargo, Año y Clase: solo en los formularios que tienen esos campos (0003, 0008 y 0010).
  - Control Joystick, Estado Batería 1 y Estado Batería 2: solo en Camión Pluma (0010).
- Cada ítem del checklist ocupa 3 columnas: **Estado** (Sí/No/N/A), **Condición** (Bueno/Malo/N/A) y **Obs**. El Carro de Arrastre (0003) no tiene Condición, así que usa solo 2.
- Si en un ítem se marca más de una opción, se guardan todas separadas por coma.
- El kilometraje se guarda como texto para conservar el formato (`190.000`). Si no, Sheets lo convierte en 190.

### Reglas para modificar el Apps Script

- **Para publicar un cambio, edita la implementación existente** (Implementar → Administrar implementaciones → lápiz → Nueva versión). Si creas una implementación nueva, la URL cambia y hay que actualizarla en los 5 `.js`.
- Los encabezados del Sheet se crean solo con la primera fila. Si cambias las columnas de un formulario, borra su pestaña para que se recree.
- Con una cuenta Gmail normal, el límite es de unos 100 destinatarios de correo al día. Cada destinatario de cada reporte cuenta.

## Dependencias externas (CDN)

Los formularios cargan estas librerías desde internet. Si un CDN falla, el formulario no genera el PDF.

- Bootstrap 5.3.0 (CSS): `cdn.jsdelivr.net`
- jsPDF 2.5.1: `cdnjs.cloudflare.com`
- Bootstrap JS: solo los 3 formularios sin uso

## Estructura

```
index.html                 Menú principal
assets/css/formularios.css Estilos compartidos
assets/images/             Logos e ilustraciones de los formularios
formularios/               Un formulario por carpeta (.html + .js)
```

## Cosas a tener en cuenta

- `assets/js/jspdf.min.js` no lo usa ningún formulario (cargan jsPDF por CDN). Se puede borrar.
- La URL del Apps Script es pública (está en el JS). Cualquiera que la conozca puede enviar filas o correos falsos. Una mejora posible es agregar un token compartido que el script valide.
- Algunos correos corporativos pueden bloquear mensajes que vienen de una cuenta Gmail. Si un destinatario no recibe, revisar su spam y pedir a TI que autorice al remitente.
- Revisar que el Google Sheet esté compartido como **Lector** para quien solo consulta, no como Editor.
- Los PDFs no se archivan en ningún lugar: solo existen en el correo y en el teléfono del trabajador.
