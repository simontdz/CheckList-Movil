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
    doc.text('Check List Excavadora', pageWidth / 2, yPos + 7, { align: 'center' });
    
    doc.setFontSize(7);
    doc.text('Código:', margin + contentWidth - 48, yPos + 4);
    doc.text('CHECK-MOVIL-0005', margin + contentWidth - 48, yPos + 7);
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

    // Columna izquierda - 2.- Lista de chequeo excavadora
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('2.- Lista de chequeo excavadora', margin, leftY);
    leftY += 5;
    
    // Función para dibujar tabla sin título repetido
    const drawSimpleTable = (x, y, items, startQ) => {
        const tableWidth = colWidth;
        const colW = [tableWidth - 30, 15, 15];
        let currentY = y;
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.rect(x, currentY, colW[0], 5);
        doc.text('B', x + colW[0] + 6, currentY + 3.5);
        doc.rect(x + colW[0], currentY, colW[1], 5);
        doc.text('M', x + colW[0] + colW[1] + 5, currentY + 3.5);
        doc.rect(x + colW[0] + colW[1], currentY, colW[2], 5);
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
    
    leftY = drawSimpleTable(margin, leftY, 
        ['Estado de Vidrios', 'Presión de Aceite', 'Temperatura', 'Manómetro de nivelación', 'Espejos laterales', 'Estado de puertas', 'Estado de limpia parabrisas', 'Estado gral de cabina', 'Estado de bocina', 'Estado alarma de retroceso', 'Estado de asiento', 'Dispositivo de seguridad', 'Tabla de carga en cabina', 'Baliza', 'Frenos de servicio', 'Freno de estacionamiento', 'Sistema de dirección', 'Brazo Pigman', 'Terminal de dirección', 'Nivel aceite caja dirección', 'Fugas de aceite', 'Revisión de Niveles', 'Niveles de aceite motor', 'Niveles de aceite transmisión', 'Niveles de aceite hidráulico', 'Niveles agua radiador', 'Documentación', 'Revisión Técnica', 'Permiso de circulación', 'Seguro obligatorio', 'Certificación técnica', 'Extintor', 'Aseo', 'Conos de seguridad'], 1);

    // Columna derecha - 3.- Lista de chequeo Brazo hidráulico
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('3.- Lista de chequeo Brazo hidráulico', margin + colWidth + 4, rightY);
    rightY += 5;
    
    rightY = drawSimpleTable(margin + colWidth + 4, rightY,
        ['Estructura del Brazo', 'Existen trizaduras', 'Existen elementos doblados', 'Estado de deslizadores', 'Estado del cilindro del brazo', 'Filtraciones hidráulicas', 'Estado de balde', 'Estado de uñas de balde', 'Fugas de sistema hidráulico', 'Rodado (oruga)', 'Pasadores', 'Baliza'], 35);

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

    // Firma única después de ambas columnas
    yPos = Math.max(leftY, rightY + obsHeight - 8) + 3;

    // Firma
    if (yPos > 240) {
        doc.addPage();
        yPos = margin;
    }

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    // Firma del operador
    const firmaCanvas = document.getElementById('firmaOperador');
    if (firmaCanvas && !isCanvasBlank(firmaCanvas)) {
        doc.addImage(firmaCanvas.toDataURL('image/png'), 'PNG', margin + contentWidth - 60, yPos - 15, 50, 15);
    }
    
    // Línea para firma
    doc.line(margin + contentWidth - 60, yPos, margin + contentWidth, yPos);
    yPos += 4;
    doc.text('Firma Operador / Nombre', margin + contentWidth - 30, yPos, { align: 'center' });

    doc.save('CHECK-MOVIL-0005_' + new Date().toISOString().split('T')[0] + '.pdf');
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
    setupSignaturePad('firmaOperador');
});
