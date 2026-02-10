function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const margin = 8;
    const pageWidth = 210;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Encabezado con bordes
    const logo = new Image();
    logo.src = '../../assets/images/Ollagua Logo.png';
    doc.addImage(logo, 'PNG', margin + 2, yPos + 2, 30, 7);
    
    doc.rect(margin, yPos, 50, 12);
    doc.rect(margin + 50, yPos, contentWidth - 100, 12);
    doc.rect(margin + contentWidth - 50, yPos, 50, 12);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Check List Retroexcavadora', pageWidth / 2, yPos + 7, { align: 'center' });
    
    doc.setFontSize(7);
    doc.text('Código:', margin + contentWidth - 48, yPos + 4);
    doc.text('CHECK-MOVIL-0004', margin + contentWidth - 48, yPos + 7);
    doc.text('Versión: 00', margin + contentWidth - 48, yPos + 10);
    
    yPos += 16;

    // Objetivo
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('OBJETIVO:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    const objetivo = 'Diariamente todo conductor deberá chequear su vehículo de transporte y carga antes de iniciar su faena, con el fin de evitar cualquier incidente o accidente por condiciones inseguras de su vehículo.';
    const objLines = doc.splitTextToSize(objetivo, contentWidth - 20);
    doc.text(objLines, margin + 20, yPos);
    yPos += objLines.length * 3 + 3;

    // Identificación
    doc.setFont('helvetica', 'bold');
    doc.text('1.- Identificación del vehículo', margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    
    // Primera línea - Marca, Modelo, Patente
    doc.text('Marca de vehículo', margin, yPos);
    doc.line(margin + 28, yPos + 0.5, margin + 75, yPos + 0.5);
    doc.text(document.getElementById('marca').value, margin + 29, yPos);
    
    doc.text('Modelo', margin + 77, yPos);
    doc.line(margin + 88, yPos + 0.5, margin + 125, yPos + 0.5);
    doc.text(document.getElementById('modelo').value, margin + 89, yPos);
    
    doc.text('Patente', margin + 127, yPos);
    doc.line(margin + 139, yPos + 0.5, margin + 175, yPos + 0.5);
    doc.text(document.getElementById('patente').value, margin + 140, yPos);
    yPos += 5;
    
    // Segunda línea - Área de trabajo
    doc.text('Área de trabajo', margin, yPos);
    doc.line(margin + 28, yPos + 0.5, margin + 175, yPos + 0.5);
    doc.text(document.getElementById('areaTrabajo').value, margin + 29, yPos);
    yPos += 5;
    
    // Tercera línea - Operador Responsable
    doc.text('Operador Responsable Sr.', margin, yPos);
    doc.line(margin + 28, yPos + 0.5, margin + 175, yPos + 0.5);
    doc.text(document.getElementById('operador').value, margin + 29, yPos);
    yPos += 5;
    
    // Cuarta línea - Fecha y Hora
    doc.text('Fecha:', margin, yPos);
    doc.line(margin + 11, yPos + 0.5, margin + 75, yPos + 0.5);
    doc.text(document.getElementById('fecha').value, margin + 12, yPos);
    
    doc.text('Hora de Inspección', margin + 77, yPos);
    doc.line(margin + 97, yPos + 0.5, margin + 175, yPos + 0.5);
    doc.text(document.getElementById('hora').value, margin + 98, yPos);
    yPos += 6;

    // Tablas en dos columnas
    const colWidth = (contentWidth / 2) - 2;
    let leftY = yPos;
    let rightY = yPos;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('2.- Lista de chequeo', margin, leftY);
    leftY += 5;

    // Función para dibujar tabla
    const drawTable = (x, y, title, items, startQ) => {
        const tableWidth = colWidth;
        const colW = [tableWidth - 30, 15, 15];
        let currentY = y;
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.rect(x, currentY, colW[0], 5);
        doc.text(title, x + 2, currentY + 3.5);
        doc.rect(x + colW[0], currentY, colW[1], 5);
        doc.text('Bueno', x + colW[0] + 2, currentY + 3.5);
        doc.rect(x + colW[0] + colW[1], currentY, colW[2], 5);
        doc.text('Malo', x + colW[0] + colW[1] + 2, currentY + 3.5);
        currentY += 5;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6);
        items.forEach((item, idx) => {
            const checked = getCheckboxValue('q' + (startQ + idx));
            doc.rect(x, currentY, colW[0], 4);
            const lines = doc.splitTextToSize(item, colW[0] - 4);
            doc.text(lines[0], x + 2, currentY + 2.8);
            doc.rect(x + colW[0], currentY, colW[1], 4);
            if (checked === 'bueno') doc.text('X', x + colW[0] + 6, currentY + 2.8);
            doc.rect(x + colW[0] + colW[1], currentY, colW[2], 4);
            if (checked === 'malo') doc.text('X', x + colW[0] + colW[1] + 6, currentY + 2.8);
            currentY += 4;
        });
        
        return currentY;
    };

    // Columna izquierda
    leftY = drawTable(margin, leftY, 'Estado de vidrios', 
        ['Presión de Aceite', 'Temperatura', 'Manómetro de nivelación', 'Espejos laterales', 'Espejo Interior', 'Estado de Puertas', 'Estado de limpia parabrisas', 'Estado general de cabina', 'Estado de bocina', 'Estado de asiento', 'Dispositivo de seguridad', 'Cinturón de seguridad'], 1);
    leftY += 2;
    
    leftY = drawTable(margin, leftY, 'Sistema de frenos',
        ['Frenos de servicio', 'Freno de estacionamiento', 'Líneas de frenos'], 13);
    leftY += 2;
    
    leftY = drawTable(margin, leftY, 'Sistema de dirección',
        ['Brazo pigman', 'Terminal de dirección', 'Nivel aceite caja dirección', 'Fugas de aceite', 'Estados de neumáticos', 'Neumático de repuesto'], 16);
    leftY += 2;
    
    leftY = drawTable(margin, leftY, 'Revisión de niveles',
        ['Niveles de aceite motor', 'Niveles de aceite transmisión', 'Niveles de aceite sist. Hidráulico', 'Niveles agua radiador'], 22);
    leftY += 2;
    
    leftY = drawTable(margin, leftY, 'Documentación',
        ['Revisión técnica', 'Permiso de circulación', 'Seguro', 'Certificación técnica', 'Aseo', 'Conos de seguridad'], 26);

    // Sección 3
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('3.- Lista de chequeo brazo hidráulico', margin + colWidth + 4, rightY);
    rightY += 5;
    
    rightY = drawTable(margin + colWidth + 4, rightY, 'Estructura del brazo',
        ['Existen trizaduras', 'Existen elementos doblados', 'Estado de deslizadores', 'Estado del cilindro del brazo', 'Filtraciones hidráulicas', 'Estado del balde', 'Estado de calzas', 'Estados de cuchillos laterales en balde'], 32);

    // Observaciones en columna derecha
    rightY += 3;
    const obsHeight = 60;
    const rightColWidth = contentWidth - colWidth - 4;
    doc.rect(margin + colWidth + 4, rightY, rightColWidth, obsHeight);
    
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('Observaciones', margin + colWidth + 6, rightY + 4);
    rightY += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    const obs = doc.splitTextToSize(document.getElementById('observaciones').value || '', rightColWidth - 4);
    doc.text(obs, margin + colWidth + 6, rightY);

    // Firmas después de ambas columnas
    yPos = Math.max(leftY, rightY + obsHeight - 8) + 3;

    // Firmas
    if (yPos > 240) {
        doc.addPage();
        yPos = margin;
    }

    const firmaColWidth = contentWidth / 2;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    doc.rect(margin, yPos, firmaColWidth, 6);
    doc.text('REALIZÓ', margin + firmaColWidth/2, yPos + 4, { align: 'center' });
    doc.rect(margin + firmaColWidth, yPos, firmaColWidth, 6);
    doc.text('REVISÓ', margin + firmaColWidth + firmaColWidth/2, yPos + 4, { align: 'center' });
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.rect(margin, yPos, firmaColWidth, 5);
    doc.text('NOMBRE: ' + document.getElementById('realizoNombre').value, margin + 2, yPos + 3.5);
    doc.rect(margin + firmaColWidth, yPos, firmaColWidth, 5);
    doc.text('NOMBRE: ' + document.getElementById('revisoNombre').value, margin + firmaColWidth + 2, yPos + 3.5);
    yPos += 5;
    
    doc.rect(margin, yPos, firmaColWidth, 5);
    doc.text('CARGO: ' + document.getElementById('realizoCargo').value, margin + 2, yPos + 3.5);
    doc.rect(margin + firmaColWidth, yPos, firmaColWidth, 5);
    doc.text('CARGO: ' + document.getElementById('revisoCargo').value, margin + firmaColWidth + 2, yPos + 3.5);
    yPos += 5;

    doc.rect(margin, yPos, firmaColWidth, 18);
    doc.rect(margin + firmaColWidth, yPos, firmaColWidth, 18);
    
    const firmaRealizoCanvas = document.getElementById('firmaRealizo');
    const firmaRevisoCanvas = document.getElementById('firmaReviso');
    
    if (!isCanvasBlank(firmaRealizoCanvas)) {
        doc.addImage(firmaRealizoCanvas.toDataURL('image/png'), 'PNG', margin + 2, yPos + 2, 30, 12);
    }
    doc.setFontSize(6);
    doc.text('FIRMA', margin + 2, yPos + 3);
    doc.text('FECHA: ' + document.getElementById('realizoFecha').value, margin + 35, yPos + 9);
    
    if (!isCanvasBlank(firmaRevisoCanvas)) {
        doc.addImage(firmaRevisoCanvas.toDataURL('image/png'), 'PNG', margin + firmaColWidth + 2, yPos + 2, 30, 12);
    }
    doc.text('FIRMA', margin + firmaColWidth + 2, yPos + 3);
    doc.text('FECHA: ' + document.getElementById('revisoFecha').value, margin + firmaColWidth + 35, yPos + 9);

    doc.save('CHECK-MOVIL-0004_' + new Date().toISOString().split('T')[0] + '.pdf');
}

function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(context.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    return !pixelBuffer.some(color => color !== 0);
}

function getCheckboxValue(name) {
    const checkboxes = document.getElementsByName(name);
    for (let checkbox of checkboxes) {
        if (checkbox.checked) return checkbox.value;
    }
    return '';
}

document.addEventListener('DOMContentLoaded', function() {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                const name = this.name;
                document.getElementsByName(name).forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
            }
        });
    });
});

function setupSignaturePad(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0, lastY = 0;

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

    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);

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

    canvas.addEventListener('touchend', () => isDrawing = false);
}

function limpiarFirma(canvasId) {
    const canvas = document.getElementById(canvasId);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('DOMContentLoaded', function() {
    setupSignaturePad('firmaRealizo');
    setupSignaturePad('firmaReviso');
});
