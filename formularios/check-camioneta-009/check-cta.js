const checklistItems = [
    { section: 'DOCUMENTOS', items: ['Permiso de Circulación', 'Seguro Obligatorio', 'Certificado Antivuelco ext.', 'Certificado Antivuelco int.', 'Patente del vehículo del.', 'Patente del vehículo tras.', 'Revisión Tecnica', 'Ultima Mantención']},
    { section: 'LUCES', items: ['Interior Cabina', 'Altas', 'Bajas', 'Neblineros', 'Retroceso', 'Viraje Izquierdo', 'Viraje Derecho', 'Emergencia', 'Freno', 'Tercera Luz de Freno', 'Estacionamiento']},
    { section: 'NEUMATICOS', items: ['Delantero Izquierdo', 'Delantero Derecho', 'Trasero Izquierdo', 'Trasero Derecho', 'Repuesto']},
    { section: 'NIVELES', items: ['Agua radiador', 'Aceite', 'Liquido de frenos', 'Agua limpiaparabrisas', 'Aire acondicionado', '', '']},
    { section: 'INTERIOR CABINA', items: ['Alza Vidrios', 'Cierre Centralizado', 'Radio Comercial', 'Relojes Indicadores', 'Plumillas', 'Aire Acondicionado', 'Calefacción', 'Bocina', 'Parabrisas', 'Luneta trasera', 'Vidrio lat. delantero izq.', 'Vidrio lat. delantero der.', 'Vidrio lat. trasero izq.', 'Vidrio lat. trasero der.', 'Espejo lateral izq.', 'Espejo lateral der.', 'Espejo retrovisor']},
    { section: 'ACCESORIOS SEGURIDAD', items: ['Alarma de Retroceso', 'Freno de Mano', 'Botiquín', 'Chaleco Reflectante (1)', 'Cuñas (2)', 'Extintor PQS', 'Triangulos', 'Cinturón Seguridad chofer', 'Cinturón Seguridad acomp.', 'Cinturón Seguridad trasero', 'Barra antivuelco interior', 'Barra antivuelco exterior', 'Gata', 'Llave de reparación ruedas', 'Varillas para reparación', 'Kit de enganche (arrastre)']}
];

let canvas, ctx, isDrawing = false;
let camionetaCanvas, camionetaCtx, isCamionetaDrawing = false;
let uploadedPhotos = [];

document.addEventListener('DOMContentLoaded', function() {
    loadChecklistItems();
    setupSignature();
    setupCamionetaCanvas();
    setupPhotoUpload();
    document.getElementById('fecha').valueAsDate = new Date();
});

function loadChecklistItems() {
    const tbody = document.getElementById('checklistBody');
    let itemNumber = 1;

    checklistItems.forEach(section => {
        const sectionRow = document.createElement('tr');
        sectionRow.innerHTML = `<td colspan="8" style="background-color: #e9ecef; font-weight: bold; text-align: center;">${section.section}</td>`;
        tbody.appendChild(sectionRow);

        section.items.forEach(item => {
            const row = document.createElement('tr');
            const isEnsayoDielectrico = item.includes('Prueba Ensayo Dieléctrico');
            const placeholder = isEnsayoDielectrico ? 'vence: dd/mm/aaaa' : '';
            
            row.innerHTML = `
                <td style="width: 35%;">${item}</td>
                <td style="width: 7%;"><input type="checkbox" class="form-check-input" id="si_${itemNumber}"></td>
                <td style="width: 7%;"><input type="checkbox" class="form-check-input" id="no_${itemNumber}"></td>
                <td style="width: 7%;"><input type="checkbox" class="form-check-input" id="na1_${itemNumber}"></td>
                <td style="width: 7%;"><input type="checkbox" class="form-check-input" id="b_${itemNumber}"></td>
                <td style="width: 7%;"><input type="checkbox" class="form-check-input" id="m_${itemNumber}"></td>
                <td style="width: 7%;"><input type="checkbox" class="form-check-input" id="na2_${itemNumber}"></td>
                <td style="width: 23%;"><input type="text" class="form-control form-control-sm" id="obs_${itemNumber}" placeholder="${placeholder}"></td>
            `;
            tbody.appendChild(row);
            itemNumber++;
        });
    });
}

function setupSignature() {
    canvas = document.getElementById('signatureCanvas');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    canvas.addEventListener('touchmove', handleTouch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;
    
    if (e.type === 'touchstart') {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (e.type === 'touchmove' && isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setupCamionetaCanvas() {
    const img = document.getElementById('camionetaImg');
    camionetaCanvas = document.getElementById('camionetaCanvas');
    camionetaCtx = camionetaCanvas.getContext('2d');
    
    function resizeCanvas() {
        // Guardar el contenido actual del canvas
        const imageData = camionetaCtx.getImageData(0, 0, camionetaCanvas.width, camionetaCanvas.height);
        const oldWidth = camionetaCanvas.width;
        const oldHeight = camionetaCanvas.height;
        
        camionetaCanvas.width = img.offsetWidth;
        camionetaCanvas.height = img.offsetHeight;
        
        // Restaurar el contenido si había algo dibujado
        if (oldWidth > 0 && oldHeight > 0) {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = oldWidth;
            tempCanvas.height = oldHeight;
            tempCanvas.getContext('2d').putImageData(imageData, 0, 0);
            
            camionetaCtx.drawImage(tempCanvas, 0, 0, oldWidth, oldHeight, 0, 0, camionetaCanvas.width, camionetaCanvas.height);
        }
        
        // Restaurar estilo de dibujo
        camionetaCtx.strokeStyle = '#ff0000';
        camionetaCtx.lineWidth = 3;
    }
    
    img.addEventListener('load', resizeCanvas);
    if (img.complete) resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    camionetaCtx.strokeStyle = '#ff0000';
    camionetaCtx.lineWidth = 3;
    
    function startDrawing(e) {
        isCamionetaDrawing = true;
        const rect = camionetaCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        camionetaCtx.beginPath();
        camionetaCtx.moveTo(x, y);
    }
    
    function draw(e) {
        if (!isCamionetaDrawing) return;
        e.preventDefault();
        const rect = camionetaCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        camionetaCtx.lineTo(x, y);
        camionetaCtx.stroke();
    }
    
    function stopDrawing() {
        isCamionetaDrawing = false;
    }
    
    camionetaCanvas.addEventListener('mousedown', startDrawing);
    camionetaCanvas.addEventListener('mousemove', draw);
    camionetaCanvas.addEventListener('mouseup', stopDrawing);
    camionetaCanvas.addEventListener('mouseout', stopDrawing);
    camionetaCanvas.addEventListener('touchstart', startDrawing, { passive: false });
    camionetaCanvas.addEventListener('touchmove', draw, { passive: false });
    camionetaCanvas.addEventListener('touchend', stopDrawing);
    
    document.getElementById('clearCamioneta').addEventListener('click', function() {
        camionetaCtx.clearRect(0, 0, camionetaCanvas.width, camionetaCanvas.height);
    });
}

function setupPhotoUpload() {
    document.getElementById('photoInput').addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (uploadedPhotos.length >= 16) {
                alert('Máximo 16 fotos permitidas');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const photo = {
                    id: Date.now() + Math.random(),
                    src: event.target.result,
                    rotation: 0
                };
                uploadedPhotos.push(photo);
                displayPhotos();
            };
            reader.readAsDataURL(file);
        });
    });
}

function displayPhotos() {
    const container = document.getElementById('photoPreview');
    container.innerHTML = '';
    
    uploadedPhotos.forEach((photo, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-3 mb-3';
        
        col.innerHTML = `
            <div class="card">
                <div style="height: 150px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                    <img src="${photo.src}" style="max-width: 100%; max-height: 100%; object-fit: contain; transform: rotate(${photo.rotation}deg);">
                </div>
                <div class="card-body p-2 text-center">
                    <button class="btn btn-sm btn-secondary me-1" onclick="rotatePhoto(${index})">↻</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePhoto(${index})">✖</button>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

function rotatePhoto(index) {
    uploadedPhotos[index].rotation += 90;
    if (uploadedPhotos[index].rotation >= 360) {
        uploadedPhotos[index].rotation = 0;
    }
    displayPhotos();
}

function deletePhoto(index) {
    uploadedPhotos.splice(index, 1);
    displayPhotos();
}

let needleAngle = 0;
const needle = document.getElementById('fuelNeedle');
const aforadorImg = document.getElementById('aforadorImg');

if (aforadorImg && needle) {
    function initFuelNeedle() {
        function handleMove(clientX, clientY) {
            const img = document.getElementById('aforadorImg');
            const rect = img.getBoundingClientRect();
            const centerX = rect.left + (rect.width * 0.47);
            const centerY = rect.top + (rect.height * 0.30);
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;
            let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            angle = Math.max(-90, Math.min(90, angle));
            needleAngle = angle;
            needle.style.transform = `rotate(${angle}deg)`;
        }

        needle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            function onMouseMove(e) { handleMove(e.clientX, e.clientY); }
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });

        needle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            function onTouchMove(e) {
                const touch = e.touches[0];
                handleMove(touch.clientX, touch.clientY);
            }
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', () => {
                document.removeEventListener('touchmove', onTouchMove);
            }, { once: true });
        }, { passive: false });
    }

    if (aforadorImg.complete) {
        initFuelNeedle();
    } else {
        aforadorImg.addEventListener('load', initFuelNeedle);
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const fecha = document.getElementById('fecha').value;
    const marca = document.getElementById('marca').value;
    const chofer = document.getElementById('chofer').value;
    const patente = document.getElementById('patente').value;
    const rut = document.getElementById('rut').value;
    const modelo = document.getElementById('modelo').value;
    const kilometraje = document.getElementById('kilometraje').value;

    const margin = 10;
    const contentWidth = 190;
    let yPos = margin;

    const headerHeight = 4.5;
    const col1Width = 50;
    const col2Width = contentWidth - col1Width - 50;
    const col3Width = 50;
    
    const logo = new Image();
    logo.src = '../../assets/images/logo montajes.jpg';
    const logoWidth = 40;
    const logoHeight = 12;
    const logoX = margin + (col1Width - logoWidth) / 2;
    doc.addImage(logo, 'JPEG', logoX, yPos + 4, logoWidth, logoHeight);
    
    doc.rect(margin, yPos, col1Width, headerHeight * 4);
    doc.rect(margin + col1Width, yPos, col2Width, headerHeight * 4);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CHECK LIST CAMIONETAS', margin + col1Width + col2Width/2, yPos + 9, { align: 'center' });
    
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.setFontSize(8);
    doc.text('Registro: CHECK-MOVIL-0009', margin + col1Width + col2Width + 2, yPos + 3.5);
    yPos += headerHeight;
    
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.text('Versión: 01', margin + col1Width + col2Width + 2, yPos + 3.5);
    yPos += headerHeight;
    
    const firmaStartY = yPos;
    yPos += headerHeight * 2;

    const dataHeight = 6;
    const firmaX = margin + col1Width + col2Width;
    const totalWidth = firmaX - margin;
    const colVeh = totalWidth / 4;
    const col1 = colVeh * 2;
    const col2 = colVeh * 2;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    
    // Fila 1: Fecha | Marca
    doc.rect(margin, yPos, col1, dataHeight);
    doc.text('Fecha: ' + fecha, margin + 2, yPos + 4);
    doc.rect(margin + col1, yPos, col2, dataHeight);
    doc.text('Marca: ' + marca, margin + col1 + 2, yPos + 4);
    yPos += dataHeight;
    
    // Fila 2: Chofer | Patente
    doc.rect(margin, yPos, col1, dataHeight);
    doc.text('Chofer: ' + chofer, margin + 2, yPos + 4);
    doc.rect(margin + col1, yPos, col2, dataHeight);
    doc.text('Patente: ' + patente, margin + col1 + 2, yPos + 4);
    yPos += dataHeight;
    
    // Fila 3: Rut | Modelo | Kilometraje
    const col3 = (col1 + col2) / 3;
    doc.rect(margin, yPos, col3, dataHeight);
    doc.text('Rut: ' + rut, margin + 2, yPos + 4);
    doc.rect(margin + col3, yPos, col3, dataHeight);
    doc.text('Modelo: ' + modelo, margin + col3 + 2, yPos + 4);
    doc.rect(margin + col3 * 2, yPos, col3, dataHeight);
    doc.text('Kilometraje: ' + kilometraje, margin + col3 * 2 + 2, yPos + 4);
    yPos += dataHeight;
    
    // Firma extendida
    const firmaHeight = headerHeight * 2 + dataHeight * 3;
    doc.rect(margin + col1Width + col2Width, firmaStartY, col3Width, firmaHeight);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('Firma:', margin + col1Width + col2Width + 2, firmaStartY + 3.5);
    
    const sigX = margin + col1Width + col2Width + 2;
    const sigY = firmaStartY + 3;
    const sigW = col3Width - 4;
    const sigH = firmaHeight - 4;
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', sigX, sigY, sigW, sigH);
    
    yPos += 3;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const colW = [32, 6, 6, 6, 6, 6, 6, 26];
    const leftX = 10;
    const rightX = 108;
    const rowH = 4;

    let xPos = leftX;
    ['REQUERIMIENTO', 'SI', 'NO', 'NA', 'B', 'M', 'NA', 'OBSERVACIONES'].forEach((h, i) => {
        doc.rect(xPos, yPos, colW[i], 5);
        doc.text(h, xPos + 1, yPos + 3.5);
        xPos += colW[i];
    });
    xPos = rightX;
    ['REQUERIMIENTO', 'SI', 'NO', 'NA', 'B', 'M', 'NA', 'OBSERVACIONES'].forEach((h, i) => {
        doc.rect(xPos, yPos, colW[i], 5);
        doc.text(h, xPos + 1, yPos + 3.5);
        xPos += colW[i];
    });

    const tableStartY = yPos + 5;
    const tableEndY = 220;
    
    yPos = tableStartY;
    let itemNumber = 1;
    let allItems = [];
    checklistItems.forEach(section => {
        allItems.push({ type: 'section', name: section.section });
        section.items.forEach(item => allItems.push({ type: 'item', name: item }));
    });

    const midPoint = Math.ceil(allItems.length / 2);
    const leftItems = allItems.slice(0, midPoint);
    const rightItems = allItems.slice(midPoint);

    let leftY = yPos;
    let rightY = yPos;
    
    // Contar items reales en la columna izquierda
    let leftItemCount = 0;
    leftItems.forEach(item => {
        if (item.type === 'item') leftItemCount++;
    });
    
    let leftItemNum = 1;
    let rightItemNum = leftItemCount + 1;

    leftItems.forEach(item => {
        if (item.type === 'section') {
            doc.setFillColor(240, 240, 240);
            doc.rect(leftX, leftY, 94, rowH, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.text(item.name, leftX + 47, leftY + 3, { align: 'center' });
            leftY += rowH;
        } else {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            xPos = leftX;
            
            doc.rect(xPos, leftY, colW[0], rowH);
            doc.text(item.name, xPos + 1, leftY + 3);
            xPos += colW[0];
            
            const si = document.getElementById(`si_${leftItemNum}`)?.checked ? 'X' : '';
            const no = document.getElementById(`no_${leftItemNum}`)?.checked ? 'X' : '';
            const na1 = document.getElementById(`na1_${leftItemNum}`)?.checked ? 'X' : '';
            const b = document.getElementById(`b_${leftItemNum}`)?.checked ? 'X' : '';
            const m = document.getElementById(`m_${leftItemNum}`)?.checked ? 'X' : '';
            const na2 = document.getElementById(`na2_${leftItemNum}`)?.checked ? 'X' : '';
            const obs = document.getElementById(`obs_${leftItemNum}`)?.value || '';
            
            doc.rect(xPos, leftY, colW[1], rowH);
            doc.text(si, xPos + 2, leftY + 3);
            xPos += colW[1];
            doc.rect(xPos, leftY, colW[2], rowH);
            doc.text(no, xPos + 2, leftY + 3);
            xPos += colW[2];
            doc.rect(xPos, leftY, colW[3], rowH);
            doc.text(na1, xPos + 2, leftY + 3);
            xPos += colW[3];
            doc.rect(xPos, leftY, colW[4], rowH);
            doc.text(b, xPos + 2, leftY + 3);
            xPos += colW[4];
            doc.rect(xPos, leftY, colW[5], rowH);
            doc.text(m, xPos + 2, leftY + 3);
            xPos += colW[5];
            doc.rect(xPos, leftY, colW[6], rowH);
            doc.text(na2, xPos + 2, leftY + 3);
            xPos += colW[6];
            doc.rect(xPos, leftY, colW[7], rowH);
            if (item.name.includes('Prueba Ensayo Dieléctrico')) {
                doc.text('vence: ' + obs, xPos + 1, leftY + 3);
            } else if (obs) {
                doc.text(obs.substring(0, 20), xPos + 1, leftY + 3);
            }
            
            leftY += rowH;
            leftItemNum++;
        }
    });

    rightItems.forEach(item => {
        if (item.type === 'section') {
            doc.setFillColor(240, 240, 240);
            doc.rect(rightX, rightY, 94, rowH, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.text(item.name, rightX + 47, rightY + 3, { align: 'center' });
            rightY += rowH;
        } else {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            xPos = rightX;
            
            doc.rect(xPos, rightY, colW[0], rowH);
            doc.text(item.name, xPos + 1, rightY + 3);
            xPos += colW[0];
            
            const si = document.getElementById(`si_${rightItemNum}`)?.checked ? 'X' : '';
            const no = document.getElementById(`no_${rightItemNum}`)?.checked ? 'X' : '';
            const na1 = document.getElementById(`na1_${rightItemNum}`)?.checked ? 'X' : '';
            const b = document.getElementById(`b_${rightItemNum}`)?.checked ? 'X' : '';
            const m = document.getElementById(`m_${rightItemNum}`)?.checked ? 'X' : '';
            const na2 = document.getElementById(`na2_${rightItemNum}`)?.checked ? 'X' : '';
            const obs = document.getElementById(`obs_${rightItemNum}`)?.value || '';
            
            doc.rect(xPos, rightY, colW[1], rowH);
            doc.text(si, xPos + 2, rightY + 3);
            xPos += colW[1];
            doc.rect(xPos, rightY, colW[2], rowH);
            doc.text(no, xPos + 2, rightY + 3);
            xPos += colW[2];
            doc.rect(xPos, rightY, colW[3], rowH);
            doc.text(na1, xPos + 2, rightY + 3);
            xPos += colW[3];
            doc.rect(xPos, rightY, colW[4], rowH);
            doc.text(b, xPos + 2, rightY + 3);
            xPos += colW[4];
            doc.rect(xPos, rightY, colW[5], rowH);
            doc.text(m, xPos + 2, rightY + 3);
            xPos += colW[5];
            doc.rect(xPos, rightY, colW[6], rowH);
            doc.text(na2, xPos + 2, rightY + 3);
            xPos += colW[6];
            doc.rect(xPos, rightY, colW[7], rowH);
            if (item.name.includes('Prueba Ensayo Dieléctrico')) {
                doc.text('vence: ' + obs, xPos + 1, rightY + 3);
            } else if (obs) {
                doc.text(obs.substring(0, 20), xPos + 1, rightY + 3);
            }
            
            rightY += rowH;
            rightItemNum++;
        }
    });

    yPos = tableEndY + 10;

    const observaciones = document.getElementById('observacionesGenerales').value;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Observaciones:', 10, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    
    const obsHeight = 25;
    const obsWidth = 94;
    const lineSpacing = 5;
    const numLines = 5;
    
    doc.rect(10, yPos, obsWidth, obsHeight);
    
    // Dibujar líneas horizontales
    for (let i = 1; i < numLines; i++) {
        const lineY = yPos + (i * lineSpacing);
        doc.line(10, lineY, 10 + obsWidth, lineY);
    }
    
    if (observaciones) {
        const lines = doc.splitTextToSize(observaciones, 90);
        let textY = yPos + 3.5;
        lines.forEach(line => {
            doc.text(line, 12, textY);
            textY += 5;
        });
    }

    const fuelX = 150;
    const fuelY = tableEndY + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Nivel de combustible:', fuelX, fuelY);
    
    const aforador = new Image();
    aforador.src = '../../assets/images/aforador2.png';
    doc.addImage(aforador, 'PNG', fuelX, fuelY + 5, 25, 18);
    
    const centerX = fuelX + 12.5;
    const centerY = fuelY + 5 + 13;
    const needleLength = 11;
    
    const adjustedAngle = needleAngle - 90;
    const radians = (adjustedAngle * Math.PI) / 180;
    const endX = centerX + needleLength * Math.cos(radians);
    const endY = centerY + needleLength * Math.sin(radians);
    
    doc.setDrawColor(255, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(centerX, centerY, endX, endY);
    doc.setDrawColor(0, 0, 0);

    // Agregar imagen de camioneta con dibujos (solo si el usuario lo marca)
    const incluirDibujos = document.getElementById('incluirDibujos')?.checked;
    
    if (camionetaCanvas && camionetaCtx && incluirDibujos) {
        doc.addPage();
        
        // Logo en la nueva página
        const logoPage = new Image();
        logoPage.src = '../../assets/images/logo montajes.jpg';
        doc.addImage(logoPage, 'JPEG', 10, 10, 40, 12);
        
        // Sección DETALLES - IMPACTO CARROCERIA en la segunda página
        let yPos2 = 30;
        doc.setFillColor(240, 240, 240);
        doc.rect(10, yPos2, 190, rowH, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text('DETALLES - IMPACTO CARROCERIA', 105, yPos2 + 3, { align: 'center' });
        yPos2 += rowH;
        
        const impactoWidth = 190 / 3;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        
        const abolladura = document.getElementById('abolladura')?.checked ? 'X' : '';
        const rayadura = document.getElementById('rayadura')?.checked ? 'X' : '';
        const piezaRota = document.getElementById('piezaRota')?.checked ? 'X' : '';
        
        doc.rect(10, yPos2, impactoWidth, rowH);
        doc.text(abolladura ? '[X] ABOLLADURA' : '[ ] ABOLLADURA', 10 + impactoWidth/2, yPos2 + 3, { align: 'center' });
        doc.rect(10 + impactoWidth, yPos2, impactoWidth, rowH);
        doc.text(rayadura ? '[X] RAYADURA' : '[ ] RAYADURA', 10 + impactoWidth + impactoWidth/2, yPos2 + 3, { align: 'center' });
        doc.rect(10 + impactoWidth * 2, yPos2, impactoWidth, rowH);
        doc.text(piezaRota ? '[X] PIEZA ROTA' : '[ ] PIEZA ROTA', 10 + impactoWidth * 2 + impactoWidth/2, yPos2 + 3, { align: 'center' });
        yPos2 += rowH + 10;
        
        const img = document.getElementById('camionetaImg');
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCanvas.width = camionetaCanvas.width;
        tempCanvas.height = camionetaCanvas.height;
        
        // Dibujar imagen de fondo
        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        // Dibujar los trazos encima
        tempCtx.drawImage(camionetaCanvas, 0, 0);
        
        const pdfWidth = 120;
        const pdfHeight = (tempCanvas.height / tempCanvas.width) * pdfWidth;
        
        const xCentered = (210 - pdfWidth) / 2; // A4 width is 210mm
        const camionetaImgData = tempCanvas.toDataURL('image/jpeg', 0.8);
        doc.addImage(camionetaImgData, 'JPEG', xCentered, yPos2, pdfWidth, pdfHeight);
    }
    
    // Agregar fotos
    if (uploadedPhotos.length > 0) {
        let photoIndex = 0;
        
        while (photoIndex < uploadedPhotos.length) {
            doc.addPage();
            
            // Logo en cada página de fotos
            const logoPhoto = new Image();
            logoPhoto.src = '../../assets/images/logo montajes.jpg';
            doc.addImage(logoPhoto, 'JPEG', 10, 10, 40, 12);
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text('Evidencia:', 10, 30);
            
            let yPhoto = 40;
            const photosPerRow = 2;
            const photoWidth = 90;
            const photoHeight = 67.5;
            const spacing = 10;
            
            for (let row = 0; row < 2 && photoIndex < uploadedPhotos.length; row++) {
                for (let col = 0; col < photosPerRow && photoIndex < uploadedPhotos.length; col++) {
                    const photo = uploadedPhotos[photoIndex];
                    const xPhoto = 10 + col * (photoWidth + spacing);
                    const yPhotoPos = yPhoto + row * (photoHeight + spacing);
                    
                    // Crear canvas temporal para rotar la foto
                    const tempPhotoCanvas = document.createElement('canvas');
                    const tempPhotoCtx = tempPhotoCanvas.getContext('2d');
                    const photoImg = new Image();
                    photoImg.src = photo.src;
                    
                    if (photo.rotation === 90 || photo.rotation === 270) {
                        tempPhotoCanvas.width = photoImg.height;
                        tempPhotoCanvas.height = photoImg.width;
                    } else {
                        tempPhotoCanvas.width = photoImg.width;
                        tempPhotoCanvas.height = photoImg.height;
                    }
                    
                    tempPhotoCtx.translate(tempPhotoCanvas.width / 2, tempPhotoCanvas.height / 2);
                    tempPhotoCtx.rotate((photo.rotation * Math.PI) / 180);
                    tempPhotoCtx.drawImage(photoImg, -photoImg.width / 2, -photoImg.height / 2);
                    
                    doc.addImage(tempPhotoCanvas.toDataURL('image/jpeg', 0.8), 'JPEG', xPhoto, yPhotoPos, photoWidth, photoHeight);
                    photoIndex++;
                }
            }
        }
    }

    doc.save(`CHECK-MOVIL-0009-${patente || 'CTA'}-${fecha}.pdf`);
    
    alert('✓ PDF generado exitosamente');
}
