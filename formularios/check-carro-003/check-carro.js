const checklistItems = [
    { section: '', items: ['Foco trasero derecho', 'Foco trasero izquierdo', 'Luces de frenos', 'Luces estacionamientos', 'Luces marcha atrás', 'Intermitente izquierdo', 'Intermitente derecho', 'Luz indicadora patente', 'Tercera luz de freno', 'Conector enchufe de carro', 'Rueda de repuesto', 'Neumático derecho', 'Neumático izquierdo', 'Mano conector de anclaje de carro', 'Seguro de conector anclaje de carro', 'Cadenas de seguridad de carro', 'Grilletes de seguridad de carro', 'Estado de eje de masa de carro', 'Estructura laterales de carro', 'Patente trasera', 'Permiso de circulación', 'Revisión técnica', 'Seguro obligatorio', 'Padrón de carro']}
];

let canvas, ctx, isDrawing = false;
let carroCanvas, carroCtx, isCarroDrawing = false;
let uploadedPhotos = [];

document.addEventListener('DOMContentLoaded', function() {
    loadChecklistItems();
    setupSignature();
    setupCarroCanvas();
    setupPhotoUpload();
    document.getElementById('fecha').valueAsDate = new Date();
});

function loadChecklistItems() {
    const tbody = document.getElementById('checklistBody');
    let itemNumber = 0;

    checklistItems.forEach(section => {
        // Fila de encabezado de columnas antes de cada sección
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">ELEMENTOS A INSPECCIONAR</th>
            <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">SI</th>
            <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">NO</th>
            <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">N.A</th>
            <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">OBSERVACIÓN</th>
        `;
        tbody.appendChild(headerRow);
        
        // Fila de sección (solo si tiene texto)
        if (section.section) {
            const sectionRow = document.createElement('tr');
            sectionRow.innerHTML = `<td colspan="5" style="background-color: white; font-weight: bold; text-align: center;">${section.section}</td>`;
            tbody.appendChild(sectionRow);
        }

        section.items.forEach((item, index) => {
            // Repetir encabezado a la mitad
            if (index === Math.floor(section.items.length / 2)) {
                const midHeaderRow = document.createElement('tr');
                midHeaderRow.innerHTML = `
                    <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">ELEMENTOS A INSPECCIONAR</th>
                    <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">SI</th>
                    <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">NO</th>
                    <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">N.A</th>
                    <th style="background-color: #e9ecef; font-weight: bold; text-align: center;">OBSERVACIÓN</th>
                `;
                tbody.appendChild(midHeaderRow);
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="width: 50%;">${item}</td>
                <td style="width: 8%; text-align: center;"><input type="radio" name="item${itemNumber}" value="si"></td>
                <td style="width: 8%; text-align: center;"><input type="radio" name="item${itemNumber}" value="no"></td>
                <td style="width: 8%; text-align: center;"><input type="radio" name="item${itemNumber}" value="na"></td>
                <td style="width: 26%;"><input type="text" class="form-control form-control-sm" id="obs${itemNumber}"></td>
            `;
            tbody.appendChild(row);
            itemNumber++;
        });
    });
}

function setupSignature() {
    canvas = document.getElementById('signatureCanvas');
    ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas con alta resolución (solo una vez)
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
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
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
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
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
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

function setupCarroCanvas() {
    const img = document.getElementById('carroImg');
    carroCanvas = document.getElementById('carroCanvas');
    carroCtx = carroCanvas.getContext('2d');
    
    let isDrawing = false;
    
    function resizeCanvas() {
        // Guardar el contenido actual del canvas
        const imageData = carroCanvas.width > 0 ? carroCtx.getImageData(0, 0, carroCanvas.width, carroCanvas.height) : null;
        const oldWidth = carroCanvas.width;
        const oldHeight = carroCanvas.height;
        
        const rect = carroCanvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        carroCanvas.width = rect.width * dpr;
        carroCanvas.height = rect.height * dpr;
        
        carroCtx.scale(dpr, dpr);
        
        // Restaurar el contenido si había algo dibujado
        if (imageData && oldWidth > 0 && oldHeight > 0) {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = oldWidth;
            tempCanvas.height = oldHeight;
            tempCanvas.getContext('2d').putImageData(imageData, 0, 0);
            
            carroCtx.drawImage(tempCanvas, 0, 0, oldWidth / dpr, oldHeight / dpr, 0, 0, rect.width, rect.height);
        }
        
        // Restaurar estilo de dibujo
        carroCtx.strokeStyle = '#ff0000';
        carroCtx.lineWidth = 3;
        carroCtx.lineCap = 'round';
        carroCtx.lineJoin = 'round';
    }
    
    img.addEventListener('load', resizeCanvas);
    if (img.complete) resizeCanvas();
    // Removido: window.addEventListener('resize', resizeCanvas);
    
    carroCtx.strokeStyle = '#ff0000';
    carroCtx.lineWidth = 3;
    carroCtx.lineCap = 'round';
    carroCtx.lineJoin = 'round';
    
    function startDrawing(e) {
        isDrawing = true;
        const rect = carroCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        carroCtx.beginPath();
        carroCtx.moveTo(x, y);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const rect = carroCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        carroCtx.lineTo(x, y);
        carroCtx.stroke();
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    carroCanvas.addEventListener('mousedown', startDrawing);
    carroCanvas.addEventListener('mousemove', draw);
    carroCanvas.addEventListener('mouseup', stopDrawing);
    carroCanvas.addEventListener('mouseout', stopDrawing);
    carroCanvas.addEventListener('touchstart', startDrawing, { passive: false });
    carroCanvas.addEventListener('touchmove', draw, { passive: false });
    carroCanvas.addEventListener('touchend', stopDrawing);
    
    document.getElementById('clearCarro').addEventListener('click', function() {
        carroCtx.clearRect(0, 0, carroCanvas.width, carroCanvas.height);
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


function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const realizadaPor = document.getElementById('realizadaPor').value;
    const rut = document.getElementById('rut').value;
    const cargo = document.getElementById('cargo').value;
    const fecha = document.getElementById('fecha').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const patente = document.getElementById('patente').value;
    const ano = document.getElementById('ano').value;
    const kilometraje = document.getElementById('kilometraje').value;
    const clase = document.getElementById('clase').value;

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
    doc.text('CHECK LIST CARRO', margin + col1Width + col2Width/2, yPos + 7, { align: 'center' });
    doc.text('DE ARRASTRE', margin + col1Width + col2Width/2, yPos + 12, { align: 'center' });
    
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, headerHeight);
    doc.setFontSize(8);
    doc.text('Registro: CHECK-MOVIL-0003', margin + col1Width + col2Width + 2, yPos + 3.5);
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
    
    // Fila 1: Realizada por | RUT
    doc.rect(margin, yPos, col1, dataHeight);
    doc.text('Realizada por: ' + realizadaPor, margin + 2, yPos + 4);
    doc.rect(margin + col1, yPos, col2, dataHeight);
    doc.text('RUT: ' + rut, margin + col1 + 2, yPos + 4);
    yPos += dataHeight;
    
    // Fila 2: Cargo | Fecha
    doc.rect(margin, yPos, col1, dataHeight);
    doc.text('Cargo: ' + cargo, margin + 2, yPos + 4);
    doc.rect(margin + col1, yPos, col2, dataHeight);
    doc.text('Fecha: ' + fecha, margin + col1 + 2, yPos + 4);
    yPos += dataHeight;
    
    // Fila 3: Marca | Modelo | Patente | Año
    doc.rect(margin, yPos, colVeh, dataHeight);
    doc.text('Marca: ' + marca, margin + 2, yPos + 4);
    doc.rect(margin + colVeh, yPos, colVeh, dataHeight);
    doc.text('Modelo: ' + modelo, margin + colVeh + 2, yPos + 4);
    doc.rect(margin + colVeh * 2, yPos, colVeh, dataHeight);
    doc.text('Patente: ' + patente, margin + colVeh * 2 + 2, yPos + 4);
    doc.rect(margin + colVeh * 3, yPos, colVeh, dataHeight);
    doc.text('Año: ' + ano, margin + colVeh * 3 + 2, yPos + 4);
    yPos += dataHeight;
    
    // Fila 4: Kilometraje | Clase
    const halfWidth = (col1 + col2) / 2;
    doc.rect(margin, yPos, halfWidth, dataHeight);
    doc.text('Kilometraje: ' + kilometraje, margin + 2, yPos + 4);
    doc.rect(margin + halfWidth, yPos, halfWidth, dataHeight);
    doc.text('Clase: ' + clase, margin + halfWidth + 2, yPos + 4);
    yPos += dataHeight;
    
    // Firma extendida
    const firmaHeight = headerHeight * 2 + dataHeight * 4;
    doc.rect(margin + col1Width + col2Width, firmaStartY, col3Width, firmaHeight);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.text('Firma:', margin + col1Width + col2Width + 2, firmaStartY + 3.5);
    
    const sigX = margin + col1Width + col2Width + 2;
    const sigY = firmaStartY + 3;
    const sigW = col3Width - 4;
    const sigH = firmaHeight - 4;
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', sigX, sigY, sigW, sigH);
    
    yPos += 3;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const colW = [95, 15, 15, 15, 50];
    const tableX = 10;
    const rowH = 5;

    let xPos = tableX;
    ['ELEMENTOS A INSPECCIONAR', 'SI', 'NO', 'N.A', 'OBSERVACIÓN'].forEach((h, i) => {
        doc.rect(xPos, yPos, colW[i], 5);
        doc.text(h, xPos + colW[i]/2, yPos + 3.5, { align: 'center' });
        xPos += colW[i];
    });
    yPos += 5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    
    let itemNumber = 0;
    checklistItems.forEach(section => {
        // Sección
        doc.setFillColor(240, 240, 240);
        doc.rect(tableX, yPos, 190, rowH, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text(section.section, 105, yPos + 3.5, { align: 'center' });
        yPos += rowH;
        
        // Items de la sección
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        section.items.forEach(item => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            
            const si = document.querySelector(`input[name="item${itemNumber}"][value="si"]`)?.checked ? 'X' : '';
            const no = document.querySelector(`input[name="item${itemNumber}"][value="no"]`)?.checked ? 'X' : '';
            const na = document.querySelector(`input[name="item${itemNumber}"][value="na"]`)?.checked ? 'X' : '';
            const obs = document.getElementById(`obs${itemNumber}`)?.value || '';
            
            xPos = tableX;
            doc.rect(xPos, yPos, colW[0], rowH);
            doc.text(item, xPos + 2, yPos + 3.5);
            xPos += colW[0];
            doc.rect(xPos, yPos, colW[1], rowH);
            doc.text(si, xPos + colW[1]/2, yPos + 3.5, { align: 'center' });
            xPos += colW[1];
            doc.rect(xPos, yPos, colW[2], rowH);
            doc.text(no, xPos + colW[2]/2, yPos + 3.5, { align: 'center' });
            xPos += colW[2];
            doc.rect(xPos, yPos, colW[3], rowH);
            doc.text(na, xPos + colW[3]/2, yPos + 3.5, { align: 'center' });
            xPos += colW[3];
            doc.rect(xPos, yPos, colW[4], rowH);
            if (obs) {
                doc.text(obs.substring(0, 30), xPos + 2, yPos + 3.5);
            }
            
            yPos += rowH;
            itemNumber++;
        });
    });

    // Usar la posición real donde terminó la tabla
    const actualTableEnd = yPos;
    const observacionesY = actualTableEnd + 6;
    yPos = observacionesY;

    const observaciones = document.getElementById('observacionesGenerales').value;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Observaciones:', 105, yPos, { align: 'center' });
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    
    const obsHeight = 25;
    const obsWidth = 190;
    const lineSpacing = 5;
    const numLines = 5;
    
    doc.rect(10, yPos, obsWidth, obsHeight);
    
    // Dibujar líneas horizontales
    for (let i = 1; i < numLines; i++) {
        const lineY = yPos + (i * lineSpacing);
        doc.line(10, lineY, 10 + obsWidth, lineY);
    }
    
    if (observaciones) {
        const lines = doc.splitTextToSize(observaciones, 185);
        let textY = yPos + 3.5;
        lines.forEach(line => {
            doc.text(line, 12, textY);
            textY += 5;
        });
    }

    // Agregar imagen de carro con dibujos (solo si el usuario lo marca)
    const incluirDibujos = document.getElementById('incluirDibujos')?.checked;
    
    if (carroCanvas && carroCtx && incluirDibujos) {
        doc.addPage();
        
        // Logo en la nueva página
        const logoPage = new Image();
        logoPage.src = '../../assets/images/logo montajes.jpg';
        doc.addImage(logoPage, 'JPEG', 10, 10, 40, 12);
        
        let yPos2 = 30;
        
        // Sección DETALLES - IMPACTO CARROCERIA
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
        
        // Preparar imagen del carro con dibujos
        const img = document.getElementById('carroImg');
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // Usar el tamaño real del canvas (con DPR)
        tempCanvas.width = carroCanvas.width;
        tempCanvas.height = carroCanvas.height;
        
        // Fondo blanco para evitar transparencias
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        // Escalar el contexto para que coincida con el DPR
        const dpr = window.devicePixelRatio || 1;
        tempCtx.scale(dpr, dpr);
        
        // Dibujar la imagen de fondo
        const rect = carroCanvas.getBoundingClientRect();
        tempCtx.drawImage(img, 0, 0, rect.width, rect.height);
        
        // Dibujar el canvas de dibujos encima (sin escalar porque ya tiene DPR)
        tempCtx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        tempCtx.drawImage(carroCanvas, 0, 0);
        
        const imgData = tempCanvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = 120;
        const imgHeight = (tempCanvas.height / tempCanvas.width) * imgWidth;
        
        const xCentered = (210 - imgWidth) / 2; // A4 width is 210mm
        doc.addImage(imgData, 'JPEG', xCentered, yPos2, imgWidth, imgHeight);
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

    doc.save(`CHECK-MOVIL-0003-${patente || 'CARROAISLADO'}-${fecha}.pdf`);
    
    alert('✓ PDF generado exitosamente');
}
