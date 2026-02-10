function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Configuración
    const margin = 10;
    const pageWidth = 210;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Encabezado - Tabla superior
    const headerHeight = 4;
    const col1Width = 45;
    const col2Width = contentWidth - col1Width - 45;
    const col3Width = 45;
    
    // Logo
    const logo = new Image();
    logo.src = '../../assets/images/Ollagua Logo.png';
    doc.addImage(logo, 'PNG', margin + 3, yPos + 2, 32, 7);
    
    // Fila 1-2 - Logo, DEPARTAMENTO, Código
    doc.rect(margin, yPos, col1Width, headerHeight * 4);
    
    doc.rect(margin + col1Width, yPos, col2Width, headerHeight * 2);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DEPARTAMENTO DE PREVENCION DE RIESGOS', margin + col1Width + col2Width/2, yPos + 4.5, { align: 'center' });
    
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.setFontSize(7);
    doc.text('Código: CHECK-MOVIL-0003', margin + col1Width + col2Width + 2, yPos + 2.8);
    
    yPos += headerHeight;
    
    // Fila 2 - Fecha
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    const fechaDoc = document.getElementById('fechaDoc').value || '';
    doc.text('Fecha: ' + fechaDoc, margin + col1Width + col2Width + 2, yPos + 2.8);
    
    yPos += headerHeight;
    
    // Fila 3-4 - CHECK LIST, Versión
    doc.rect(margin + col1Width, yPos, col2Width, headerHeight * 2);
    doc.setFontSize(9);
    doc.text('CHECK LIST CARRO DE ARRASTRE', margin + col1Width + col2Width/2, yPos + 4.5, { align: 'center' });
    
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.setFontSize(7);
    doc.text('Versión: A', margin + col1Width + col2Width + 2, yPos + 2.8);
    
    yPos += headerHeight;
    
    // Fila 4 - Página
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.text('Página 1 de 1', margin + col1Width + col2Width + 2, yPos + 2.8);

    yPos += headerHeight;

    // Datos generales
    const startX = margin;
    const dataHeight = 5;
    const halfWidth = contentWidth / 2;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    
    doc.rect(startX, yPos, halfWidth, dataHeight);
    doc.text('OBRA O CONTRATO: ' + document.getElementById('obraContrato').value, startX + 2, yPos + 3.5);
    doc.rect(startX + halfWidth, yPos, halfWidth, dataHeight);
    doc.text('ÁREA: ' + document.getElementById('area').value, startX + halfWidth + 2, yPos + 3.5);
    yPos += dataHeight;
    
    doc.rect(startX, yPos, halfWidth, dataHeight);
    doc.text('LUGAR: ' + document.getElementById('lugar').value, startX + 2, yPos + 3.5);
    doc.rect(startX + halfWidth, yPos, halfWidth, dataHeight);
    doc.text('FECHA: ' + document.getElementById('fecha').value, startX + halfWidth + 2, yPos + 3.5);
    yPos += dataHeight + 3;

    // Tabla de inspección
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    const colWidths = [100, 15, 15, 15, 45];
    let currentX = startX;
    
    // Encabezados
    doc.rect(currentX, yPos, colWidths[0], 6);
    doc.text('ELEMENTOS A INSPECCIONAR', currentX + 2, yPos + 4);
    currentX += colWidths[0];
    
    doc.rect(currentX, yPos, colWidths[1], 6);
    doc.text('SI', currentX + 7, yPos + 4, { align: 'center' });
    currentX += colWidths[1];
    
    doc.rect(currentX, yPos, colWidths[2], 6);
    doc.text('NO', currentX + 7, yPos + 4, { align: 'center' });
    currentX += colWidths[2];
    
    doc.rect(currentX, yPos, colWidths[3], 6);
    doc.text('N.A', currentX + 7, yPos + 4, { align: 'center' });
    currentX += colWidths[3];
    
    doc.rect(currentX, yPos, colWidths[4], 6);
    doc.text('Observación', currentX + 2, yPos + 4);
    
    yPos += 6;

    // Sección CARROCERIA
    doc.rect(startX, yPos, contentWidth, 6);
    doc.text('CARROCERIA', startX + contentWidth/2, yPos + 4, { align: 'center' });
    yPos += 6;

    // Items
    const items = [
        'Existe Señalética de Peso Máximo (300 kilos).',
        'Acople de carro, en buen estado.',
        'Cadenas y grilletes de seguridad',
        'Grilletes de anclaje en buen estado.',
        'Enchufe de Conexión y Cordón con protección en buen Estado.',
        'Estructura general del carro, en buenas condiciones.',
        'Barandas laterales, frente y atrás, en buen estado.',
        'Eje o Ejes N° _____ en buenas Condiciones.',
        'Estado de Conexión de Eje con las Ruedas en buenas Condiciones.',
        'Estado de Neumáticos, en buenas Condiciones.',
        'El carro posee rueda de repuesto.',
        'Luces derechas en buen estado',
        'Luces izquierdas en buen estado',
        'Reflectantes en los costados, frete y trasera.',
        'Documentos del carro al día.',
        'Patente Visible y en buenas Condiciones.'
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);

    items.forEach((item, index) => {
        const rowHeight = 6;
        currentX = startX;
        
        doc.rect(currentX, yPos, colWidths[0], rowHeight);
        const lines = doc.splitTextToSize(item, colWidths[0] - 4);
        doc.text(lines, currentX + 2, yPos + 4);
        currentX += colWidths[0];
        
        const checked = getCheckboxValue('q' + (index + 1));
        
        doc.rect(currentX, yPos, colWidths[1], rowHeight);
        if (checked === 'si') doc.text('X', currentX + 7, yPos + 4, { align: 'center' });
        currentX += colWidths[1];
        
        doc.rect(currentX, yPos, colWidths[2], rowHeight);
        if (checked === 'no') doc.text('X', currentX + 7, yPos + 4, { align: 'center' });
        currentX += colWidths[2];
        
        doc.rect(currentX, yPos, colWidths[3], rowHeight);
        if (checked === 'na') doc.text('X', currentX + 7, yPos + 4, { align: 'center' });
        currentX += colWidths[3];
        
        doc.rect(currentX, yPos, colWidths[4], rowHeight);
        doc.text(document.getElementById('obs' + (index + 1)).value || '', currentX + 2, yPos + 4);
        
        yPos += rowHeight;
    });

    yPos += 3;

    // Observaciones
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    const obsHeight = 20;
    doc.rect(startX, yPos, contentWidth, obsHeight);
    doc.text('OBSERVACIONES:', startX + 2, yPos + 4);
    
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    const obsText = document.getElementById('observaciones').value || '';
    const obsLines = doc.splitTextToSize(obsText, contentWidth - 4);
    doc.text(obsLines, startX + 2, yPos);
    yPos += obsHeight - 7;

    // Firmas
    const colWidth = contentWidth / 2;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    doc.rect(startX, yPos, colWidth, 6);
    doc.text('REALIZÓ', startX + colWidth/2, yPos + 4, { align: 'center' });
    doc.rect(startX + colWidth, yPos, colWidth, 6);
    doc.text('REVISÓ', startX + colWidth + colWidth/2, yPos + 4, { align: 'center' });
    yPos += 6;

    // Nombres
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.rect(startX, yPos, colWidth, 6);
    doc.text('NOMBRE: ' + document.getElementById('realizoNombre').value, startX + 2, yPos + 4);
    doc.rect(startX + colWidth, yPos, colWidth, 6);
    doc.text('NOMBRE: ' + document.getElementById('revisoNombre').value, startX + colWidth + 2, yPos + 4);
    yPos += 6;
    
    // Cargos
    doc.rect(startX, yPos, colWidth, 6);
    doc.text('CARGO: ' + document.getElementById('realizoCargo').value, startX + 2, yPos + 4);
    doc.rect(startX + colWidth, yPos, colWidth, 6);
    doc.text('CARGO: ' + document.getElementById('revisoCargo').value, startX + colWidth + 2, yPos + 4);
    yPos += 6;
    
    // Firmas y fechas
    const firmaHeight = 20;
    doc.rect(startX, yPos, colWidth, firmaHeight);
    doc.rect(startX + colWidth, yPos, colWidth, firmaHeight);
    
    const firmaRealizoCanvas = document.getElementById('firmaRealizo');
    const firmaRevisoCanvas = document.getElementById('firmaReviso');
    
    if (!isCanvasBlank(firmaRealizoCanvas)) {
        const firmaRealizoImg = firmaRealizoCanvas.toDataURL('image/png');
        doc.addImage(firmaRealizoImg, 'PNG', startX + 2, yPos + 2, 35, 14);
    }
    doc.setFontSize(7);
    doc.text('FIRMA', startX + 2, yPos + 4);
    doc.text('FECHA: ' + document.getElementById('realizoFecha').value, startX + 40, yPos + 10);
    
    if (!isCanvasBlank(firmaRevisoCanvas)) {
        const firmaRevisoImg = firmaRevisoCanvas.toDataURL('image/png');
        doc.addImage(firmaRevisoImg, 'PNG', startX + colWidth + 2, yPos + 2, 35, 14);
    }
    doc.text('FIRMA', startX + colWidth + 2, yPos + 4);
    doc.text('FECHA: ' + document.getElementById('revisoFecha').value, startX + colWidth + 40, yPos + 10);

    // Guardar PDF
    doc.save('CHECK-MOVIL-0003_' + new Date().toISOString().split('T')[0] + '.pdf');
}

function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
}

function getCheckboxValue(name) {
    const checkboxes = document.getElementsByName(name);
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            return checkbox.value;
        }
    }
    return '';
}

// Permitir solo un checkbox por pregunta
document.addEventListener('DOMContentLoaded', function() {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                const name = this.name;
                const checkboxes = document.getElementsByName(name);
                checkboxes.forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
            }
        });
    });
});

// Funcionalidad de firma digital
function setupSignaturePad(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    });

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });
}

function limpiarFirma(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Inicializar pads de firma
document.addEventListener('DOMContentLoaded', function() {
    setupSignaturePad('firmaRealizo');
    setupSignaturePad('firmaReviso');
});
