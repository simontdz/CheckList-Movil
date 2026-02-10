function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Configuración
    const margin = 10;
    const pageWidth = 210;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Encabezado - Tabla superior
    const headerHeight = 4.5;
    const col1Width = 50;
    const col2Width = contentWidth - col1Width - 50;
    const col3Width = 50;
    
    // Logo más pequeño y centrado
    const logo = new Image();
    logo.src = '../../assets/images/logo montajes.jpg';
    const logoWidth = 40;
    const logoHeight = 12;
    const logoX = margin + (col1Width - logoWidth) / 2;
    doc.addImage(logo, 'JPEG', logoX, yPos + 4, logoWidth, logoHeight);
    
    // Fila 1-2 - Logo (ocupa 4 filas), DEPARTAMENTO (ocupa 2 filas), Código
    doc.rect(margin, yPos, col1Width, headerHeight * 4);
    
    doc.rect(margin + col1Width, yPos, col2Width, headerHeight * 2);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('DEPARTAMENTO DE PREVENCION DE RIESGOS', margin + col1Width + col2Width/2, yPos + 5, { align: 'center' });
    
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.setFontSize(8);
    doc.text('Código: CHECK-MOVIL-0001', margin + col1Width + col2Width + 2, yPos + 3.5);
    
    yPos += headerHeight;
    
    // Fila 2 - Fecha
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    const fechaDoc = document.getElementById('fechaDoc').value || '';
    doc.text('Fecha: ' + fechaDoc, margin + col1Width + col2Width + 2, yPos + 3.5);
    
    yPos += headerHeight;
    
    // Fila 3-4 - CHECK LIST (ocupa 2 filas), Versión
    doc.rect(margin + col1Width, yPos, col2Width, headerHeight * 2);
    doc.setFontSize(10);
    doc.text('CHECK LIST VEHICULOS', margin + col1Width + col2Width/2, yPos + 5, { align: 'center' });
    
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.setFontSize(8);
    doc.text('Versión: 00', margin + col1Width + col2Width + 2, yPos + 3.5);
    
    yPos += headerHeight;
    
    // Fila 4 - Página
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.text('Página 1 de 1', margin + col1Width + col2Width + 2, yPos + 3.5);

    yPos += headerHeight;

    // Datos generales - Tabla
    const startX = margin;
    const dataHeight = 6;
    const halfWidth = contentWidth / 2;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    // Fila 1: Obra/Contrato y Área
    doc.rect(startX, yPos, halfWidth, dataHeight);
    doc.text('OBRA O CONTRATO: ' + document.getElementById('obraContrato').value, startX + 2, yPos + 4);
    doc.rect(startX + halfWidth, yPos, halfWidth, dataHeight);
    doc.text('ÁREA: ' + document.getElementById('area').value, startX + halfWidth + 2, yPos + 4);
    yPos += dataHeight;
    
    // Fila 2: Lugar y Fecha
    doc.rect(startX, yPos, halfWidth, dataHeight);
    doc.text('LUGAR: ' + document.getElementById('lugar').value, startX + 2, yPos + 4);
    doc.rect(startX + halfWidth, yPos, halfWidth, dataHeight);
    doc.text('FECHA: ' + document.getElementById('fecha').value, startX + halfWidth + 2, yPos + 4);
    yPos += dataHeight + 3;

    // Tabla de inspección
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    // Encabezados de tabla - ajustar anchos para que sumen contentWidth (190mm)
    const colWidths = [85, 10, 10, 10, 50, 25];
    let currentX = startX;
    
    // Encabezado - dibujar cada celda por separado
    doc.rect(startX, yPos, colWidths[0], 6);
    doc.text('ELEMENTOS A INSPECCIONAR', startX + 2, yPos + 4);
    currentX = startX + colWidths[0];
    
    doc.rect(currentX, yPos, colWidths[1], 6);
    doc.text('SI', currentX + 3, yPos + 4);
    currentX += colWidths[1];
    
    doc.rect(currentX, yPos, colWidths[2], 6);
    doc.text('NO', currentX + 2, yPos + 4);
    currentX += colWidths[2];
    
    doc.rect(currentX, yPos, colWidths[3], 6);
    doc.text('N.A', currentX + 2, yPos + 4);
    currentX += colWidths[3];
    
    doc.rect(currentX, yPos, colWidths[4], 6);
    doc.text('Responsable ejecución', currentX + 2, yPos + 4);
    currentX += colWidths[4];
    
    doc.rect(currentX, yPos, colWidths[5], 6);
    doc.text('Fecha', currentX + 2, yPos + 4);
    
    yPos += 6;

    // Preguntas
    const preguntas = [
        '¿El vehículo se encuentra con sus documentos al día?',
        '¿El vehículo tiene un programa de mantención?',
        '¿El sistema de dirección del vehículo se encuentra en buenas condiciones?',
        '¿El sistema de frenos se encuentra en buenas condiciones de operación?',
        '¿El sistema de luces se encuentra en buenas condiciones?',
        '¿Los neumáticos se encuentran en buenas condiciones de uso?',
        '¿El vehículo tiene neumático de repuesto?',
        '¿Los limpia parabrisas se encuentran en buenas condiciones?',
        '¿Los parabrisas y vidrios se encuentran en buen estado?',
        '¿La bocina del vehículo se encuentra en buen estado?',
        '¿Los cinturones de seguridad se encuentran buenas condiciones de uso?',
        '¿Los espejos se encuentran en buenas condiciones de uso?',
        '¿El vehículo cuenta con extintor, triángulos, gata y llave de rueda en buen estado?',
        '¿El vehículo cuenta con cuñas?',
        '¿Existe botiquin implementado y registro de capacitación del uso del botiquin?'
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    preguntas.forEach((pregunta, index) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = margin;
        }

        // Calcular altura necesaria según líneas de texto
        const lines = doc.splitTextToSize(pregunta, colWidths[0] - 4);
        const rowHeight = Math.max(6, lines.length * 3 + 2);
        
        // Pregunta
        currentX = startX;
        doc.rect(currentX, yPos, colWidths[0], rowHeight);
        doc.text(lines, currentX + 2, yPos + 3.5);
        currentX += colWidths[0];
        
        // Checkboxes
        const checked = getCheckboxValue('q' + (index + 1));
        
        doc.rect(currentX, yPos, colWidths[1], rowHeight);
        if (checked === 'si') doc.text('X', currentX + 3, yPos + rowHeight/2 + 1);
        currentX += colWidths[1];
        
        doc.rect(currentX, yPos, colWidths[2], rowHeight);
        if (checked === 'no') doc.text('X', currentX + 3, yPos + rowHeight/2 + 1);
        currentX += colWidths[2];
        
        doc.rect(currentX, yPos, colWidths[3], rowHeight);
        if (checked === 'na') doc.text('X', currentX + 3, yPos + rowHeight/2 + 1);
        currentX += colWidths[3];
        
        // Responsable
        doc.rect(currentX, yPos, colWidths[4], rowHeight);
        const respLines = doc.splitTextToSize(document.getElementById('resp' + (index + 1)).value || '', colWidths[4] - 4);
        doc.text(respLines, currentX + 2, yPos + 3.5);
        currentX += colWidths[4];
        
        // Fecha
        doc.rect(currentX, yPos, colWidths[5], rowHeight);
        doc.text(document.getElementById('fecha' + (index + 1)).value || '', currentX + 2, yPos + rowHeight/2 + 1);
        
        yPos += rowHeight;
    });

    // Otros
    const rowHeight = 6;
    currentX = startX;
    
    // Pregunta Otros
    doc.rect(currentX, yPos, colWidths[0], rowHeight);
    doc.text('Otros: ' + document.getElementById('otros').value, currentX + 2, yPos + 4);
    currentX += colWidths[0];
    
    const checked16 = getCheckboxValue('q16');
    doc.rect(currentX, yPos, colWidths[1], rowHeight);
    if (checked16 === 'si') doc.text('X', currentX + 3, yPos + 4);
    currentX += colWidths[1];
    doc.rect(currentX, yPos, colWidths[2], rowHeight);
    if (checked16 === 'no') doc.text('X', currentX + 3, yPos + 4);
    currentX += colWidths[2];
    doc.rect(currentX, yPos, colWidths[3], rowHeight);
    if (checked16 === 'na') doc.text('X', currentX + 3, yPos + 4);
    currentX += colWidths[3];
    doc.rect(currentX, yPos, colWidths[4], rowHeight);
    currentX += colWidths[4];
    doc.rect(currentX, yPos, colWidths[5], rowHeight);
    
    yPos += rowHeight + 5;

    // Tabla separada para vehículo
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    doc.rect(startX, yPos, 50, rowHeight);
    doc.text('Vehículo a cargo del Sr:', startX + 2, yPos + 4);
    doc.rect(startX + 50, yPos, contentWidth - 50, rowHeight);
    doc.text(document.getElementById('vehiculoCargo').value || '', startX + 52, yPos + 4);
    yPos += rowHeight;

    doc.rect(startX, yPos, 50, rowHeight);
    doc.text('Vehículo Patente:', startX + 2, yPos + 4);
    doc.rect(startX + 50, yPos, contentWidth - 50, rowHeight);
    doc.text(document.getElementById('vehiculoPatente').value || '', startX + 52, yPos + 4);
    yPos += rowHeight + 5;

    // Observaciones
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    // Tabla de observaciones
    const obsHeight = 30;
    const lineSpacing = 5;
    const numLines = 6;
    
    doc.rect(startX, yPos, contentWidth, obsHeight);
    doc.text('OBSERVACIONES:', startX + 2, yPos + 4);
    
    // Dibujar líneas horizontales
    for (let i = 1; i < numLines; i++) {
        const lineY = yPos + (i * lineSpacing);
        doc.line(startX, lineY, startX + contentWidth, lineY);
    }
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const obsText = document.getElementById('naCheckbox').checked ? 'N.A: NO APLICABLE' : document.getElementById('observaciones').value || '';
    const obsLines = doc.splitTextToSize(obsText, contentWidth - 4);
    let textY = yPos + 8.5;
    obsLines.forEach(line => {
        doc.text(line, startX + 2, textY);
        textY += 5;
    });
    yPos += obsHeight;

    // Firmas - Encabezados
    if (yPos > 240) {
        doc.addPage();
        yPos = margin;
    }

    const colWidth = contentWidth / 2;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    
    doc.rect(startX, yPos, colWidth, 6);
    doc.text('REALIZÓ', startX + colWidth/2, yPos + 4, { align: 'center' });
    doc.rect(startX + colWidth, yPos, colWidth, 6);
    doc.text('REVISÓ', startX + colWidth + colWidth/2, yPos + 4, { align: 'center' });
    yPos += 6;

    // Nombres
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
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
    doc.setFontSize(8);
    doc.text('FIRMA', startX + 2, yPos + 4);
    doc.text('FECHA: ' + document.getElementById('realizoFecha').value, startX + 40, yPos + 10);
    
    if (!isCanvasBlank(firmaRevisoCanvas)) {
        const firmaRevisoImg = firmaRevisoCanvas.toDataURL('image/png');
        doc.addImage(firmaRevisoImg, 'PNG', startX + colWidth + 2, yPos + 2, 35, 14);
    }
    doc.text('FIRMA', startX + colWidth + 2, yPos + 4);
    doc.text('FECHA: ' + document.getElementById('revisoFecha').value, startX + colWidth + 40, yPos + 10);

    // Guardar PDF
    doc.save('CHECK-MOVIL-0001_' + new Date().toISOString().split('T')[0] + '.pdf');
    
    alert('✓ PDF generado exitosamente');
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

function toggleNA() {
    const checkbox = document.getElementById('naCheckbox');
    const textarea = document.getElementById('observaciones');
    
    if (checkbox.checked) {
        textarea.value = 'N.A: NO APLICABLE';
        textarea.disabled = true;
    } else {
        textarea.value = '';
        textarea.disabled = false;
    }
}

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
