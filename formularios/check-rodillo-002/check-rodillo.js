function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Configuración - márgenes mínimos
    const margin = 5;
    const pageWidth = 210;
    const pageHeight = 297;
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
    doc.text('Código: CHECK-MOVIL-0002', margin + col1Width + col2Width + 2, yPos + 2.8);
    
    yPos += headerHeight;
    
    // Fila 2 - Fecha
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    const fechaDoc = document.getElementById('fechaDoc').value || '';
    doc.text('Fecha: ' + fechaDoc, margin + col1Width + col2Width + 2, yPos + 2.8);
    
    yPos += headerHeight;
    
    // Fila 3-4 - CHECK LIST, Versión
    doc.rect(margin + col1Width, yPos, col2Width, headerHeight * 2);
    doc.setFontSize(9);
    doc.text('CHECK LIST RODILLO COMPACTADOR', margin + col1Width + col2Width/2, yPos + 4.5, { align: 'center' });
    
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.setFontSize(7);
    doc.text('Versión: 00', margin + col1Width + col2Width + 2, yPos + 2.8);
    
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
    doc.setFontSize(7.5);
    
    doc.rect(startX, yPos, halfWidth, dataHeight);
    doc.text('OBRA O CONTRATO: ' + document.getElementById('obraContrato').value, startX + 2, yPos + 3.5);
    doc.rect(startX + halfWidth, yPos, halfWidth, dataHeight);
    doc.text('ÁREA: ' + document.getElementById('area').value, startX + halfWidth + 2, yPos + 3.5);
    yPos += dataHeight;
    
    doc.rect(startX, yPos, halfWidth, dataHeight);
    doc.text('LUGAR: ' + document.getElementById('lugar').value, startX + 2, yPos + 3.5);
    doc.rect(startX + halfWidth, yPos, halfWidth, dataHeight);
    doc.text('FECHA: ' + document.getElementById('fecha').value, startX + halfWidth + 2, yPos + 3.5);
    yPos += dataHeight;

    // Datos del equipo con imagen - reorganizado
    const leftColWidth = contentWidth * 0.6;
    const rightColWidth = contentWidth * 0.4;
    const smallRowHeight = 4;
    
    // Columna izquierda - datos del equipo
    let equipoYPos = yPos;
    doc.rect(startX, equipoYPos, leftColWidth, smallRowHeight);
    doc.text('CODIGO: ' + document.getElementById('codigo').value, startX + 2, equipoYPos + 2.8);
    equipoYPos += smallRowHeight;
    
    doc.rect(startX, equipoYPos, leftColWidth, smallRowHeight);
    doc.text('N° DE SERIE: ' + document.getElementById('serie').value, startX + 2, equipoYPos + 2.8);
    equipoYPos += smallRowHeight;
    
    doc.rect(startX, equipoYPos, leftColWidth, smallRowHeight);
    doc.text('MARCA: ' + document.getElementById('marca').value, startX + 2, equipoYPos + 2.8);
    equipoYPos += smallRowHeight;
    
    doc.rect(startX, equipoYPos, leftColWidth, smallRowHeight);
    doc.text('MODELO: ' + document.getElementById('modelo').value, startX + 2, equipoYPos + 2.8);
    equipoYPos += smallRowHeight;
    
    doc.rect(startX, equipoYPos, leftColWidth, smallRowHeight);
    doc.text('ODOMETRO: ' + document.getElementById('odometro').value, startX + 2, equipoYPos + 2.8);
    
    // Columna derecha - imagen del rodillo más pequeña y centrada
    const imageHeight = smallRowHeight * 5;
    doc.rect(startX + leftColWidth, yPos, rightColWidth, imageHeight);
    
    const rodilloImg = new Image();
    rodilloImg.src = '../../assets/images/rodillo.png';
    // Imagen más pequeña para que quepa bien en el cuadro
    const imgWidth = 30; // Reducido de 40 a 30
    const imgHeight = 18; // Reducido proporcionalmente
    const imgX = startX + leftColWidth + (rightColWidth - imgWidth) / 2; // Centrado horizontal
    const imgY = yPos + (imageHeight - imgHeight) / 2; // Centrado vertical
    doc.addImage(rodilloImg, 'PNG', imgX, imgY, imgWidth, imgHeight);
    
    yPos += imageHeight + 3;

    // Tabla de inspección
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    
    const colWidths = [13, 82, 13, 13, 13, 13, 53];
    let currentX = startX;
    
    // Encabezados
    doc.rect(currentX, yPos, colWidths[0], 5);
    doc.text('ITEM', currentX + 6.5, yPos + 3.5, { align: 'center' });
    currentX += colWidths[0];
    
    doc.rect(currentX, yPos, colWidths[1], 5);
    doc.text('DESCRIPCION', currentX + 2, yPos + 3.5);
    currentX += colWidths[1];
    
    doc.rect(currentX, yPos, colWidths[2], 5);
    doc.text('B', currentX + 6.5, yPos + 3.5, { align: 'center' });
    currentX += colWidths[2];
    
    doc.rect(currentX, yPos, colWidths[3], 5);
    doc.text('M', currentX + 6.5, yPos + 3.5, { align: 'center' });
    currentX += colWidths[3];
    
    doc.rect(currentX, yPos, colWidths[4], 5);
    doc.text('R', currentX + 6.5, yPos + 3.5, { align: 'center' });
    currentX += colWidths[4];
    
    doc.rect(currentX, yPos, colWidths[5], 5);
    doc.text('N/A', currentX + 4.5, yPos + 3.5, { align: 'center' });
    currentX += colWidths[5];
    
    doc.rect(currentX, yPos, colWidths[6], 5);
    doc.text('OBSERVACIONES', currentX + 2, yPos + 3.5);
    
    yPos += 5;

    // Items con secciones
    const items = [
        { section: 'FUNCIONAMIENTO DEL MOTOR' },
        { num: 1, desc: 'Funcionamiento del Motor' },
        { num: 2, desc: 'Tapa de llenado de aceite' },
        { num: 3, desc: 'Varilla de medicion de nivel de aceite' },
        { num: 4, desc: 'Estado del turbo alimentador' },
        { num: 5, desc: 'Estado de Radiador' },
        { num: 6, desc: 'Tapa Radiador' },
        { num: 7, desc: 'Estado de Manguera del Radiador y Enfriador' },
        { num: 8, desc: 'Freno Motor' },
        { section: 'SISTEMA DE LUBRICACION' },
        { num: 9, desc: 'Estado de aceite' },
        { num: 10, desc: 'Hodometro y fecha de la ultima mantencion' },
        { num: 11, desc: 'Estado de Filtros de Aceite' },
        { num: 12, desc: 'Consumo de aceite' },
        { num: 13, desc: 'Fugas de aceite del motor' },
        { section: 'SISTEMA ELECTRICO' },
        { num: 14, desc: 'Sistema de luces en general' },
        { num: 15, desc: 'Baliza' },
        { num: 16, desc: 'Alarma de retroceso' },
        { num: 17, desc: 'Bornes de bateria' },
        { num: 18, desc: 'Plumilla limpia parabrisas' },
        { section: 'ESTRUCTURA GENERAL DEL EQUIPO' },
        { num: 19, desc: 'Neumaticos' },
        { num: 20, desc: 'Parbrisas' },
        { num: 21, desc: 'Espejos' },
        { num: 22, desc: 'Asiento' },
        { num: 23, desc: 'Bocina' },
        { num: 24, desc: 'Cinturon de seguridad' },
        { num: 25, desc: 'Extintor' },
        { num: 26, desc: 'Puertas' },
        { num: 27, desc: 'Bomba de Agua' }
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);

    items.forEach(item => {
        const rowHeight = 4.8;

        if (item.section) {
            // Sección
            doc.setFont('helvetica', 'bold');
            doc.rect(startX, yPos, contentWidth, rowHeight);
            doc.text(item.section, startX + contentWidth/2, yPos + 3.2, { align: 'center' });
            doc.setFont('helvetica', 'normal');
            yPos += rowHeight;
        } else {
            // Item normal
            currentX = startX;
            
            doc.rect(currentX, yPos, colWidths[0], rowHeight);
            doc.text(item.num.toString(), currentX + 6.5, yPos + 3.2, { align: 'center' });
            currentX += colWidths[0];
            
            doc.rect(currentX, yPos, colWidths[1], rowHeight);
            const descLines = doc.splitTextToSize(item.desc, colWidths[1] - 4);
            doc.text(descLines[0], currentX + 2, yPos + 3.2);
            currentX += colWidths[1];
            
            const checked = getCheckboxValue('q' + item.num);
            
            doc.rect(currentX, yPos, colWidths[2], rowHeight);
            if (checked === 'b') doc.text('X', currentX + 6.5, yPos + 3.2, { align: 'center' });
            currentX += colWidths[2];
            
            doc.rect(currentX, yPos, colWidths[3], rowHeight);
            if (checked === 'm') doc.text('X', currentX + 6.5, yPos + 3.2, { align: 'center' });
            currentX += colWidths[3];
            
            doc.rect(currentX, yPos, colWidths[4], rowHeight);
            if (checked === 'r') doc.text('X', currentX + 6.5, yPos + 3.2, { align: 'center' });
            currentX += colWidths[4];
            
            doc.rect(currentX, yPos, colWidths[5], rowHeight);
            if (checked === 'na') doc.text('X', currentX + 4.5, yPos + 3.2, { align: 'center' });
            currentX += colWidths[5];
            
            doc.rect(currentX, yPos, colWidths[6], rowHeight);
            const obsText = document.getElementById('obs' + item.num).value || '';
            const obsLines = doc.splitTextToSize(obsText, colWidths[6] - 4);
            doc.text(obsLines[0] || '', currentX + 2, yPos + 3.2);
            
            yPos += rowHeight;
        }
    });

    yPos += 3;

    // Observaciones
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    const obsHeight = 20;
    doc.rect(startX, yPos, contentWidth, obsHeight);
    doc.text('Observaciones:', startX + 2, yPos + 4);
    
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
    doc.save('CHECK-MOVIL-0002_' + new Date().toISOString().split('T')[0] + '.pdf');
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
