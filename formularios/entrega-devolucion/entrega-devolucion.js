// Inicialización de los SignaturePads
const canvasEntrega = document.getElementById('signature-pad-entrega');
const canvasRecepcion = document.getElementById('signature-pad-recepcion');

const signaturePadEntrega = new SignaturePad(canvasEntrega, {
    minWidth: 0.5,
    maxWidth: 1.5,
    penColor: 'rgb(0,0,0)'
});

const signaturePadRecepcion = new SignaturePad(canvasRecepcion, {
    minWidth: 0.5,
    maxWidth: 1.5,
    penColor: 'rgb(0,0,0)'
});

// Set default date to today
document.getElementById('datetime').value = new Date().toISOString().slice(0, 10);





// Ajustar el tamaño de los canvas para que coincidan con el CSS
function resizeCanvas() {
    // Canvas de entrega
    const dataEntrega = signaturePadEntrega.toData();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvasEntrega.width = canvasEntrega.offsetWidth * ratio;
    canvasEntrega.height = canvasEntrega.offsetHeight * ratio;
    canvasEntrega.getContext('2d').scale(ratio, ratio);
    signaturePadEntrega.clear();
    if (dataEntrega.length > 0) {
        signaturePadEntrega.fromData(dataEntrega);
    }
    
    // Canvas de recepción
    const dataRecepcion = signaturePadRecepcion.toData();
    canvasRecepcion.width = canvasRecepcion.offsetWidth * ratio;
    canvasRecepcion.height = canvasRecepcion.offsetHeight * ratio;
    canvasRecepcion.getContext('2d').scale(ratio, ratio);
    signaturePadRecepcion.clear();
    if (dataRecepcion.length > 0) {
        signaturePadRecepcion.fromData(dataRecepcion);
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Función para convertir imagen a base64 (removida, ahora se usa URL directa)

// Funciones para manejar los botones Limpiar
function clearSignatureEntrega() {
    signaturePadEntrega.clear();
}

function clearSignatureRecepcion() {
    signaturePadRecepcion.clear();
}



// Función para manejar el botón Descargar PDF
async function downloadPDF() {
    const name = document.getElementById('name').value.trim();

    const zona = document.getElementById('zona').value.trim();

    const fechaMant = document.getElementById('fechaMant').value.trim();

    const kmMant = document.getElementById('kmMant').value.trim();

    const datetime = document.getElementById('datetime').value;


    const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked');






    const tipo = document.getElementById('tipo').value.trim();

    const marca = document.getElementById('marca').value.trim();

    const modelo = document.getElementById('modelo').value.trim();

    const año = document.getElementById('año').value.trim();

    const patente = document.getElementById('patente').value.trim();

    const km = document.getElementById('km').value.trim();

    const horometro = document.getElementById('horometro').value.trim();

    const permisoCirculacion = document.querySelector('input[name="permisoCirculacion"]:checked');
    const fechaVencimientoPermiso = document.getElementById('fechaVencimientoPermiso').value;

    const padron = document.querySelector('input[name="padron"]:checked');
    const fechaVencimientoPadron = document.getElementById('fechaVencimientoPadron').value;

    const seguroObligatorio = document.querySelector('input[name="seguroObligatorio"]:checked');
    const fechaVencimientoSeguro = document.getElementById('fechaVencimientoSeguro').value;

    const certEmisionGases = document.querySelector('input[name="certEmisionGases"]:checked');
    const fechaVencimientoCertEmisionGases = document.getElementById('fechaVencimientoCertEmisionGases').value;

    const revisionTecnica = document.querySelector('input[name="revisionTecnica"]:checked');
    const fechaVencimientoRevisionTecnica = document.getElementById('fechaVencimientoRevisionTecnica').value;

    const nombreResEntrega = document.getElementById('nombreResEntrega').value.trim();
    const rutResEntrega = document.getElementById('rutResEntrega').value.trim();
    const nombreResRecepcion = document.getElementById('nombreResRecepcion').value.trim();
    const rutResRecepcion = document.getElementById('rutResRecepcion').value.trim();
    const lugarGeografico = document.getElementById('lugarGeografico').value.trim();

    // New fields for Equipamiento y Accesorios
    const certificacionDielectrica = document.querySelector('input[name="certificacionDielectrica"]:checked');
    const fechaCertificacionDielectrica = document.getElementById('fechaCertificacionDielectrica').value;
    const certificacionOperatividadGrua = document.querySelector('input[name="certificacionOperatividadGrua"]:checked');
    const fechaCertificacionOperatividadGrua = document.getElementById('fechaCertificacionOperatividadGrua').value;
    const aireAcondicionado = document.querySelector('input[name="aireAcondicionado"]:checked');
    const fechaAireAcondicionado = document.getElementById('fechaAireAcondicionado').value;
    const tarjetaCombustible = document.querySelector('input[name="tarjetaCombustible"]:checked');
    const fechaTarjetaCombustible = document.getElementById('fechaTarjetaCombustible').value;
    const tag = document.querySelector('input[name="tag"]:checked');
    const fechaTag = document.getElementById('fechaTag').value;
    const gps = document.querySelector('input[name="gps"]:checked');
    const fechaGps = document.getElementById('fechaGps').value;
    const camaraExterior = document.querySelector('input[name="camaraExterior"]:checked');
    const fechaCamaraExterior = document.getElementById('fechaCamaraExterior').value;
    const grabadoPatentesVidrios = document.querySelector('input[name="grabadoPatentesVidrios"]:checked');
    const fechaGrabadoPatentesVidrios = document.getElementById('fechaGrabadoPatentesVidrios').value;
    // New fields for Seguridad y Equipamiento
    const botiquin = document.querySelector('input[name="botiquin"]:checked');
    const obsBotiquin = document.getElementById('obsBotiquin').value.trim();
    const extintor = document.querySelector('input[name="extintor"]:checked');
    const obsExtintor = document.getElementById('obsExtintor').value.trim();
    const barraAntivuelco = document.querySelector('input[name="barraAntivuelco"]:checked');
    const obsBarraAntivuelco = document.getElementById('obsBarraAntivuelco').value.trim();
    const conosViales = document.querySelector('input[name="conosViales"]:checked');
    const obsConosViales = document.getElementById('obsConosViales').value.trim();
    const ruedaRepuesto = document.querySelector('input[name="ruedaRepuesto"]:checked');
    const obsRuedaRepuesto = document.getElementById('obsRuedaRepuesto').value.trim();
    const triangulo = document.querySelector('input[name="triangulo"]:checked');
    const obsTriangulo = document.getElementById('obsTriangulo').value.trim();
    const gata = document.querySelector('input[name="gata"]:checked');
    const obsGata = document.getElementById('obsGata').value.trim();
    const llaveRueda = document.querySelector('input[name="llaveRueda"]:checked');
    const obsLlaveRueda = document.getElementById('obsLlaveRueda').value.trim();
    const extintor10kg = document.querySelector('input[name="extintor10kg"]:checked');
    const obsExtintor10kg = document.getElementById('obsExtintor10kg').value.trim();
    const luz = document.querySelector('input[name="luz"]:checked');
    const obsLuz = document.getElementById('obsLuz').value.trim();
    const cinturonSeguridad = document.querySelector('input[name="cinturonSeguridad"]:checked');
    const obsCinturonSeguridad = document.getElementById('obsCinturonSeguridad').value.trim();
    const cuñasSoportesPiolas = document.querySelector('input[name="cuñasSoportesPiolas"]:checked');
    const obsCuñasSoportesPiolas = document.getElementById('obsCuñasSoportesPiolas').value.trim();
    const radioParlantes = document.querySelector('input[name="radioParlantes"]:checked');
    const obsRadioParlantes = document.getElementById('obsRadioParlantes').value.trim();
    const encendedor = document.querySelector('input[name="encendedor"]:checked');
    const obsEncendedor = document.getElementById('obsEncendedor').value.trim();
    const espejoInteriorExterior = document.querySelector('input[name="espejoInteriorExterior"]:checked');
    const obsEspejoInteriorExterior = document.getElementById('obsEspejoInteriorExterior').value.trim();
    const apoyaCabeza = document.querySelector('input[name="apoyaCabeza"]:checked');
    const obsApoyaCabeza = document.getElementById('obsApoyaCabeza').value.trim();
    const pisosGoma = document.querySelector('input[name="pisosGoma"]:checked');
    const obsPisosGoma = document.getElementById('obsPisosGoma').value.trim();

    // New fields for additional Seguridad y Equipamiento
    const bateria = document.querySelector('input[name="bateria"]:checked');
    const obsBateria = document.getElementById('obsBateria').value.trim();
    const focosOpticosTraseros = document.querySelector('input[name="focosOpticosTraseros"]:checked');
    const obsFocosOpticosTraseros = document.getElementById('obsFocosOpticosTraseros').value.trim();
    const intermitentes = document.querySelector('input[name="intermitentes"]:checked');
    const obsIntermitentes = document.getElementById('obsIntermitentes').value.trim();
    const carroceria = document.querySelector('input[name="carroceria"]:checked');
    const obsCarroceria = document.getElementById('obsCarroceria').value.trim();
    const parachoquesDelanteroTrasero = document.querySelector('input[name="parachoquesDelanteroTrasero"]:checked');
    const obsParachoquesDelanteroTrasero = document.getElementById('obsParachoquesDelanteroTrasero').value.trim();
    const focosLaterales = document.querySelector('input[name="focosLaterales"]:checked');
    const obsFocosLaterales = document.getElementById('obsFocosLaterales').value.trim();
    const neumaticos = document.querySelector('input[name="neumaticos"]:checked');
    const obsNeumaticos = document.getElementById('obsNeumaticos').value.trim();
    const engancheCarroArrastre = document.querySelector('input[name="engancheCarroArrastre"]:checked');
    const obsEngancheCarroArrastre = document.getElementById('obsEngancheCarroArrastre').value.trim();
    const carpasCapacho = document.querySelector('input[name="carpasCapacho"]:checked');
    const obsCarpasCapacho = document.getElementById('obsCarpasCapacho').value.trim();
    const carpasBrazoCortoLargo = document.querySelector('input[name="carpasBrazoCortoLargo"]:checked');
    const obsCarpasBrazoCortoLargo = document.getElementById('obsCarpasBrazoCortoLargo').value.trim();
    const barreno = document.querySelector('input[name="barreno"]:checked');
    const obsBarreno = document.getElementById('obsBarreno').value.trim();
    const cableTierra = document.querySelector('input[name="cableTierra"]:checked');
    const obsCableTierra = document.getElementById('obsCableTierra').value.trim();
    const kitAntiderrame = document.querySelector('input[name="kitAntiderrame"]:checked');
    const obsKitAntiderrame = document.getElementById('obsKitAntiderrame').value.trim();
    const bateriaJoystickCargador = document.querySelector('input[name="bateriaJoystickCargador"]:checked');
    const obsBateriaJoystickCargador = document.getElementById('obsBateriaJoystickCargador').value.trim();
    const joystick = document.querySelector('input[name="joystick"]:checked');
    const obsJoystick = document.getElementById('obsJoystick').value.trim();
    const liner = document.querySelector('input[name="liner"]:checked');
    const obsLiner = document.getElementById('obsLiner').value.trim();
    const capachoConAcople = document.querySelector('input[name="capachoConAcople"]:checked');
    const obsCapachoConAcople = document.getElementById('obsCapachoConAcople').value.trim();
    const prensaMordaza = document.querySelector('input[name="prensaMordaza"]:checked');
    const obsPrensaMordaza = document.getElementById('obsPrensaMordaza').value.trim();
    const camilla = document.querySelector('input[name="camilla"]:checked');
    const obsCamilla = document.getElementById('obsCamilla').value.trim();

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'mm' }); // Usar mm para consistencia

    try {
        const response = await fetch('../../assets/images/ActaEntrega.jpg');
        const blob = await response.blob();
        const reportImageData = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        // Agregar la imagen del reporte al PDF (tamaño A4 en mm)
        pdf.addImage(reportImageData, 'JPEG', 0, 0, 210, 297);

        pdf.setFontSize(8);
        pdf.text(name, 90, 25.5);

        pdf.text(zona, 158, 25.5);

        pdf.text(fechaMant, 90, 29.5);

        pdf.text(kmMant, 158, 29.5);

        // Posicionamiento dinámico del tipo de vehículo según cantidad de caracteres
        const tipoX = tipo.length <= 12 ? 45 : 30; // Si ≤12 caracteres: centro (45), si >12: izquierda (30)
        pdf.text(tipo, tipoX, 36);

        // Posicionamiento dinámico de marca y modelo
        const marcaX = marca.length <= 6 ? 75 : 72; // Si ≤6 caracteres: centro (75), si >6: izquierda (72)
        const modeloX = modelo.length <= 6 ? 96 : 90; // Si ≤6 caracteres: centro (96), si >6: izquierda (90)
        pdf.text(marca, marcaX, 36);
        pdf.text(modelo, modeloX, 36);

        pdf.text(año, 111, 36);

        pdf.text(patente, 128, 36);

        pdf.text(km, 147, 36);

        pdf.text(horometro, 165, 36);

        // Add new fields to PDF
        if (permisoCirculacion) {
            if (permisoCirculacion.value === 'si') {
                pdf.text('X', 122.5, 49.5); // Position for Sí
            } else if (permisoCirculacion.value === 'no') {
                pdf.text('X', 130, 49.5); // Position for No
            } else if (permisoCirculacion.value === 'na') {
                pdf.text('X', 138, 49.5); // Position for N/A
            }
        }
        if (fechaVencimientoPermiso) {
            const [year, month, day] = fechaVencimientoPermiso.split('-');
            const formattedFechaPermiso = `${day}-${month}-${year}`;
            pdf.text(formattedFechaPermiso, 150, 49.5);
        }

        if (padron) {
            if (padron.value === 'si') {
                pdf.text('X', 122.5, 53); // Position for Sí
            } else if (padron.value === 'no') {
                pdf.text('X', 130, 53); // Position for No
            } else if (padron.value === 'na') {
                pdf.text('X', 138, 53); // Position for N/A
            }
        }
        if (fechaVencimientoPadron) {
            const [year, month, day] = fechaVencimientoPadron.split('-');
            const formattedFechaPadron = `${day}-${month}-${year}`;
            pdf.text(formattedFechaPadron, 150, 53);
        }

        if (seguroObligatorio) {
            if (seguroObligatorio.value === 'si') {
                pdf.text('X', 122.5, 56.5); // Position for Sí
            } else if (seguroObligatorio.value === 'no') {
                pdf.text('X', 130, 56.5); // Position for No
            } else if (seguroObligatorio.value === 'na') {
                pdf.text('X', 138, 56.5); // Position for N/A
            }
        }
        if (fechaVencimientoSeguro) {
            const [year, month, day] = fechaVencimientoSeguro.split('-');
            const formattedFechaSeguro = `${day}-${month}-${year}`;
            pdf.text(formattedFechaSeguro, 150, 56.5);
        }


        if (certEmisionGases) {
            if (certEmisionGases.value === 'si') {
                pdf.text('X', 122.5, 59.5); // Position for Sí
            } else if (certEmisionGases.value === 'no') {
                pdf.text('X', 130, 59.5); // Position for No
            } else if (certEmisionGases.value === 'na') {
                pdf.text('X', 138, 59.5); // Position for N/A
            }
        }
        if (fechaVencimientoCertEmisionGases) {
            const [year, month, day] = fechaVencimientoCertEmisionGases.split('-');
            const formattedfechaVencimientoCertEmisionGases = `${day}-${month}-${year}`;
            pdf.text(formattedfechaVencimientoCertEmisionGases, 150, 59.5);
        }


        if (revisionTecnica) {
            if (revisionTecnica.value === 'si') {
                pdf.text('X', 122.5, 63); // Position for Sí
            } else if (revisionTecnica.value === 'no') {
                pdf.text('X', 130, 63); // Position for No
            } else if (revisionTecnica.value === 'na') {
                pdf.text('X', 138, 63); // Position for N/A
            }
        }
        if (fechaVencimientoRevisionTecnica) {
            const [year, month, day] = fechaVencimientoRevisionTecnica.split('-');
            const formattedfechaVencimientoRevisionTecnica = `${day}-${month}-${year}`;
            pdf.text(formattedfechaVencimientoRevisionTecnica, 150, 63);
        }



        // Add Equipamiento y Accesorios to PDF
        if (certificacionDielectrica) {
            if (certificacionDielectrica.value === 'si') {
                pdf.text('X', 122.5, 66.5);
            } else if (certificacionDielectrica.value === 'no') {
                pdf.text('X', 130, 66.5);
            } else if (certificacionDielectrica.value === 'na') {
                pdf.text('X', 138, 66.5);
            }
        }
        if (fechaCertificacionDielectrica) {
            const [year, month, day] = fechaCertificacionDielectrica.split('-');
            const formattedFechaCertDielectrica = `${day}-${month}-${year}`;
            pdf.text(formattedFechaCertDielectrica, 150, 66.5);
        }

        if (certificacionOperatividadGrua) {
            if (certificacionOperatividadGrua.value === 'si') {
                pdf.text('X', 122.5, 69.5);
            } else if (certificacionOperatividadGrua.value === 'no') {
                pdf.text('X', 130, 69.5);
            } else if (certificacionOperatividadGrua.value === 'na') {
                pdf.text('X', 138, 69.5);
            }
        }
        if (fechaCertificacionOperatividadGrua) {
            const [year, month, day] = fechaCertificacionOperatividadGrua.split('-');
            const formattedFechaCertOperatividad = `${day}-${month}-${year}`;
            pdf.text(formattedFechaCertOperatividad, 150, 69.5);
        }

        if (aireAcondicionado) {
            if (aireAcondicionado.value === 'si') {
                pdf.text('X', 122.5, 73);
            } else if (aireAcondicionado.value === 'no') {
                pdf.text('X', 130, 73);
            } else if (aireAcondicionado.value === 'na') {
                pdf.text('X', 138, 73);
            }
        }
        if (fechaAireAcondicionado) {
            const [year, month, day] = fechaAireAcondicionado.split('-');
            const formattedFechaAire = `${day}-${month}-${year}`;
            pdf.text(formattedFechaAire, 150, 73);
        }

        if (tarjetaCombustible) {
            if (tarjetaCombustible.value === 'si') {
                pdf.text('X', 122.5, 76.3);
            } else if (tarjetaCombustible.value === 'no') {
                pdf.text('X', 130, 76.3);
            } else if (tarjetaCombustible.value === 'na') {
                pdf.text('X', 138, 76.3);
            }
        }
        if (fechaTarjetaCombustible) {
            const [year, month, day] = fechaTarjetaCombustible.split('-');
            const formattedFechaTarjeta = `${day}-${month}-${year}`;
            pdf.text(formattedFechaTarjeta, 150, 76.3);
        }

        if (tag) {
            if (tag.value === 'si') {
                pdf.text('X', 122.5, 79.5);
            } else if (tag.value === 'no') {
                pdf.text('X', 130, 79.5);
            } else if (tag.value === 'na') {
                pdf.text('X', 138, 79.5);
            }
        }
        if (fechaTag) {
            const [year, month, day] = fechaTag.split('-');
            const formattedFechaTag = `${day}-${month}-${year}`;
            pdf.text(formattedFechaTag, 150, 79.5);
        }

        if (gps) {
            if (gps.value === 'si') {
                pdf.text('X', 122.5, 83);
            } else if (gps.value === 'no') {
                pdf.text('X', 130, 83);
            } else if (gps.value === 'na') {
                pdf.text('X', 138, 83);
            }
        }
        if (fechaGps) {
            const [year, month, day] = fechaGps.split('-');
            const formattedFechaGps = `${day}-${month}-${year}`;
            pdf.text(formattedFechaGps, 150, 83);
        }

        if (camaraExterior) {
            if (camaraExterior.value === 'si') {
                pdf.text('X', 122.5, 86);
            } else if (camaraExterior.value === 'no') {
                pdf.text('X', 130, 86);
            } else if (camaraExterior.value === 'na') {
                pdf.text('X', 138, 86);
            }
        }
        if (fechaCamaraExterior) {
            const [year, month, day] = fechaCamaraExterior.split('-');
            const formattedFechaCamara = `${day}-${month}-${year}`;
            pdf.text(formattedFechaCamara, 150, 86);
        }

        if (grabadoPatentesVidrios) {
            if (grabadoPatentesVidrios.value === 'si') {
                pdf.text('X', 122.5, 89.5);
            } else if (grabadoPatentesVidrios.value === 'no') {
                pdf.text('X', 130, 89.5);
            } else if (grabadoPatentesVidrios.value === 'na') {
                pdf.text('X', 138, 89.5);
            }
        }
        if (fechaGrabadoPatentesVidrios) {
            const [year, month, day] = fechaGrabadoPatentesVidrios.split('-');
            const formattedFechaGrabado = `${day}-${month}-${year}`;
            pdf.text(formattedFechaGrabado, 150, 89.5);
        }

        // Add Seguridad y Equipamiento to PDF
        if (botiquin) {
            if (botiquin.value === 'si') {
                pdf.text('X', 122.5, 96);
            } else if (botiquin.value === 'no') {
                pdf.text('X', 130, 96);
            } else if (botiquin.value === 'na') {
                pdf.text('X', 138, 96);
            }
        }
        if (obsBotiquin) {
            pdf.text(obsBotiquin, 150, 96);
        }

        if (extintor) {
            if (extintor.value === 'si') {
                pdf.text('X', 122.5, 99.5);
            } else if (extintor.value === 'no') {
                pdf.text('X', 130, 99.5);
            } else if (extintor.value === 'na') {
                pdf.text('X', 138, 99.5);
            }
        }
        if (obsExtintor) {
            pdf.text(obsExtintor, 150, 99.5);
        }

        if (barraAntivuelco) {
            if (barraAntivuelco.value === 'si') {
                pdf.text('X', 122.5, 103);
            } else if (barraAntivuelco.value === 'no') {
                pdf.text('X', 130, 103);
            } else if (barraAntivuelco.value === 'na') {
                pdf.text('X', 138, 103);
            }
        }
        if (obsBarraAntivuelco) {
            pdf.text(obsBarraAntivuelco, 150, 103);
        }

        if (conosViales) {
            if (conosViales.value === 'si') {
                pdf.text('X', 122.5, 106);
            } else if (conosViales.value === 'no') {
                pdf.text('X', 130, 106);
            } else if (conosViales.value === 'na') {
                pdf.text('X', 138, 106);
            }
        }
        if (obsConosViales) {
            pdf.text(obsConosViales, 150, 106);
        }

        if (ruedaRepuesto) {
            if (ruedaRepuesto.value === 'si') {
                pdf.text('X', 122.5, 109.5);
            } else if (ruedaRepuesto.value === 'no') {
                pdf.text('X', 130, 109.5);
            } else if (ruedaRepuesto.value === 'na') {
                pdf.text('X', 138, 109.5);
            }
        }
        if (obsRuedaRepuesto) {
            pdf.text(obsRuedaRepuesto, 150, 109.5);
        }

        if (triangulo) {
            if (triangulo.value === 'si') {
                pdf.text('X', 122.5, 112.7);
            } else if (triangulo.value === 'no') {
                pdf.text('X', 130, 112.7);
            } else if (triangulo.value === 'na') {
                pdf.text('X', 138, 112.7);
            }
        }
        if (obsTriangulo) {
            pdf.text(obsTriangulo, 150, 112.7);
        }

        if (gata) {
            if (gata.value === 'si') {
                pdf.text('X', 122.5, 116);
            } else if (gata.value === 'no') {
                pdf.text('X', 130, 116);
            } else if (gata.value === 'na') {
                pdf.text('X', 138, 116);
            }
        }
        if (obsGata) {
            pdf.text(obsGata, 150, 116);
        }

        if (llaveRueda) {
            if (llaveRueda.value === 'si') {
                pdf.text('X', 122.5, 119.3);
            } else if (llaveRueda.value === 'no') {
                pdf.text('X', 130, 119.3);
            } else if (llaveRueda.value === 'na') {
                pdf.text('X', 138, 119.3);
            }
        }
        if (obsLlaveRueda) {
            pdf.text(obsLlaveRueda, 150, 119.3);
        }

        if (extintor10kg) {
            if (extintor10kg.value === 'si') {
                pdf.text('X', 122.5, 122.5);
            } else if (extintor10kg.value === 'no') {
                pdf.text('X', 130, 122.5);
            } else if (extintor10kg.value === 'na') {
                pdf.text('X', 138, 122.5);
            }
        }
        if (obsExtintor10kg) {
            pdf.text(obsExtintor10kg, 150, 122.5);
        }

        if (luz) {
            if (luz.value === 'si') {
                pdf.text('X', 122.5, 125.5);
            } else if (luz.value === 'no') {
                pdf.text('X', 130, 125.5);
            } else if (luz.value === 'na') {
                pdf.text('X', 138, 125.5);
            }
        }
        if (obsLuz) {
            pdf.text(obsLuz, 150, 125.5);
        }

        if (cinturonSeguridad) {
            if (cinturonSeguridad.value === 'si') {
                pdf.text('X', 122.5, 129);
            } else if (cinturonSeguridad.value === 'no') {
                pdf.text('X', 130, 129);
            } else if (cinturonSeguridad.value === 'na') {
                pdf.text('X', 138, 129);
            }
        }
        if (obsCinturonSeguridad) {
            pdf.text(obsCinturonSeguridad, 150, 129);
        }

        if (cuñasSoportesPiolas) {
            if (cuñasSoportesPiolas.value === 'si') {
                pdf.text('X', 122.5, 132.5);
            } else if (cuñasSoportesPiolas.value === 'no') {
                pdf.text('X', 130, 132.5);
            } else if (cuñasSoportesPiolas.value === 'na') {
                pdf.text('X', 138, 132.5);
            }
        }
        if (obsCuñasSoportesPiolas) {
            pdf.text(obsCuñasSoportesPiolas, 150, 132.5);
        }

        if (radioParlantes) {
            if (radioParlantes.value === 'si') {
                pdf.text('X', 122.5, 135.5);
            } else if (radioParlantes.value === 'no') {
                pdf.text('X', 130, 135.5);
            } else if (radioParlantes.value === 'na') {
                pdf.text('X', 138, 135.5);
            }
        }
        if (obsRadioParlantes) {
            pdf.text(obsRadioParlantes, 150, 135.5);
        }

        if (encendedor) {
            if (encendedor.value === 'si') {
                pdf.text('X', 122.5, 139.5);
            } else if (encendedor.value === 'no') {
                pdf.text('X', 130, 139.5);
            } else if (encendedor.value === 'na') {
                pdf.text('X', 138, 139.5);
            }
        }
        if (obsEncendedor) {
            pdf.text(obsEncendedor, 150, 139.5);
        }

        if (espejoInteriorExterior) {
            if (espejoInteriorExterior.value === 'si') {
                pdf.text('X', 122.5, 142.5);
            } else if (espejoInteriorExterior.value === 'no') {
                pdf.text('X', 130, 142.5);
            } else if (espejoInteriorExterior.value === 'na') {
                pdf.text('X', 138, 142.5);
            }
        }
        if (obsEspejoInteriorExterior) {
            pdf.text(obsEspejoInteriorExterior, 150, 142.5);
        }

        if (apoyaCabeza) {
            if (apoyaCabeza.value === 'si') {
                pdf.text('X', 122.5, 146.5);
            } else if (apoyaCabeza.value === 'no') {
                pdf.text('X', 130, 146.5);
            } else if (apoyaCabeza.value === 'na') {
                pdf.text('X', 138, 146.5);
            }
        }
        if (obsApoyaCabeza) {
            pdf.text(obsApoyaCabeza, 150, 146);
        }

        if (pisosGoma) {
            if (pisosGoma.value === 'si') {
                pdf.text('X', 122.5, 149.3);
            } else if (pisosGoma.value === 'no') {
                pdf.text('X', 130, 149.3);
            } else if (pisosGoma.value === 'na') {
                pdf.text('X', 138, 149.3);
            }
        }
        if (obsPisosGoma) {
            pdf.text(obsPisosGoma, 150, 149.3);
        }

        // Add additional Seguridad y Equipamiento to PDF
        if (bateria) {
            if (bateria.value === 'si') {
                pdf.text('X', 122.5, 152);
            } else if (bateria.value === 'no') {
                pdf.text('X', 130, 152);
            } else if (bateria.value === 'na') {
                pdf.text('X', 138, 152);
            }
        }
        if (obsBateria) {
            pdf.text(obsBateria, 150, 152);
        }

        if (focosOpticosTraseros) {
            if (focosOpticosTraseros.value === 'si') {
                pdf.text('X', 122.5, 155.5);
            } else if (focosOpticosTraseros.value === 'no') {
                pdf.text('X', 130, 155.5);
            } else if (focosOpticosTraseros.value === 'na') {
                pdf.text('X', 138, 155.5);
            }
        }
        if (obsFocosOpticosTraseros) {
            pdf.text(obsFocosOpticosTraseros, 150, 155.5);
        }

        if (intermitentes) {
            if (intermitentes.value === 'si') {
                pdf.text('X', 122.5, 158.5);
            } else if (intermitentes.value === 'no') {
                pdf.text('X', 130, 158.5);
            } else if (intermitentes.value === 'na') {
                pdf.text('X', 138, 158.5);
            }
        }
        if (obsIntermitentes) {
            pdf.text(obsIntermitentes, 150, 158.5);
        }

        if (carroceria) {
            if (carroceria.value === 'si') {
                pdf.text('X', 122.5, 162);
            } else if (carroceria.value === 'no') {
                pdf.text('X', 130, 162);
            } else if (carroceria.value === 'na') {
                pdf.text('X', 138, 162);
            }
        }
        if (obsCarroceria) {
            pdf.text(obsCarroceria, 150, 162);
        }

        if (parachoquesDelanteroTrasero) {
            if (parachoquesDelanteroTrasero.value === 'si') {
                pdf.text('X', 122.5, 165.5);
            } else if (parachoquesDelanteroTrasero.value === 'no') {
                pdf.text('X', 130, 165.5);
            } else if (parachoquesDelanteroTrasero.value === 'na') {
                pdf.text('X', 138, 165.5);
            }
        }
        if (obsParachoquesDelanteroTrasero) {
            pdf.text(obsParachoquesDelanteroTrasero, 150, 165.5);
        }

        if (focosLaterales) {
            if (focosLaterales.value === 'si') {
                pdf.text('X', 122.5, 168.7);
            } else if (focosLaterales.value === 'no') {
                pdf.text('X', 130, 168.7);
            } else if (focosLaterales.value === 'na') {
                pdf.text('X', 138, 168.7);
            }
        }
        if (obsFocosLaterales) {
            pdf.text(obsFocosLaterales, 150, 168.7);
        }

        if (neumaticos) {
            if (neumaticos.value === 'si') {
                pdf.text('X', 122.5, 172);
            } else if (neumaticos.value === 'no') {
                pdf.text('X', 130, 172);
            } else if (neumaticos.value === 'na') {
                pdf.text('X', 138, 172);
            }
        }
        if (obsNeumaticos) {
            pdf.text(obsNeumaticos, 150, 172);
        }

        if (engancheCarroArrastre) {
            if (engancheCarroArrastre.value === 'si') {
                pdf.text('X', 122.5, 175);
            } else if (engancheCarroArrastre.value === 'no') {
                pdf.text('X', 130, 175);
            } else if (engancheCarroArrastre.value === 'na') {
                pdf.text('X', 138, 175);
            }
        }
        if (obsEngancheCarroArrastre) {
            pdf.text(obsEngancheCarroArrastre, 150, 175);
        }

        if (carpasCapacho) {
            if (carpasCapacho.value === 'si') {
                pdf.text('X', 122.5, 178.5);
            } else if (carpasCapacho.value === 'no') {
                pdf.text('X', 130, 178.5);
            } else if (carpasCapacho.value === 'na') {
                pdf.text('X', 138, 178.5);
            }
        }
        if (obsCarpasCapacho) {
            pdf.text(obsCarpasCapacho, 150, 178.5);
        }

        if (carpasBrazoCortoLargo) {
            if (carpasBrazoCortoLargo.value === 'si') {
                pdf.text('X', 122.5, 182);
            } else if (carpasBrazoCortoLargo.value === 'no') {
                pdf.text('X', 130, 182);
            } else if (carpasBrazoCortoLargo.value === 'na') {
                pdf.text('X', 138, 182);
            }
        }
        if (obsCarpasBrazoCortoLargo) {
            pdf.text(obsCarpasBrazoCortoLargo, 150, 182);
        }

        if (barreno) {
            if (barreno.value === 'si') {
                pdf.text('X', 122.5, 185);
            } else if (barreno.value === 'no') {
                pdf.text('X', 130, 185);
            } else if (barreno.value === 'na') {
                pdf.text('X', 138, 185);
            }
        }
        if (obsBarreno) {
            pdf.text(obsBarreno, 150, 185);
        }

        if (cableTierra) {
            if (cableTierra.value === 'si') {
                pdf.text('X', 122.5, 188.5);
            } else if (cableTierra.value === 'no') {
                pdf.text('X', 130, 188.5);
            } else if (cableTierra.value === 'na') {
                pdf.text('X', 138, 188.5);
            }
        }
        if (obsCableTierra) {
            pdf.text(obsCableTierra, 150, 188.5);
        }

        if (kitAntiderrame) {
            if (kitAntiderrame.value === 'si') {
                pdf.text('X', 122.5, 191.5);
            } else if (kitAntiderrame.value === 'no') {
                pdf.text('X', 130, 191.5);
            } else if (kitAntiderrame.value === 'na') {
                pdf.text('X', 138, 191.5);
            }
        }
        if (obsKitAntiderrame) {
            pdf.text(obsKitAntiderrame, 150, 191.5);
        }

        if (bateriaJoystickCargador) {
            if (bateriaJoystickCargador.value === 'si') {
                pdf.text('X', 122.5, 195);
            } else if (bateriaJoystickCargador.value === 'no') {
                pdf.text('X', 130, 195);
            } else if (bateriaJoystickCargador.value === 'na') {
                pdf.text('X', 138, 195);
            }
        }
        if (obsBateriaJoystickCargador) {
            pdf.text(obsBateriaJoystickCargador, 150, 195);
        }

        if (joystick) {
            if (joystick.value === 'si') {
                pdf.text('X', 122.5, 198.2);
            } else if (joystick.value === 'no') {
                pdf.text('X', 130, 198.2);
            } else if (joystick.value === 'na') {
                pdf.text('X', 138, 198.2);
            }
        }
        if (obsJoystick) {
            pdf.text(obsJoystick, 150, 198.2);
        }

        if (liner) {
            if (liner.value === 'si') {
                pdf.text('X', 122.5, 201.5);
            } else if (liner.value === 'no') {
                pdf.text('X', 130, 201.5);
            } else if (liner.value === 'na') {
                pdf.text('X', 138, 201.5);
            }
        }
        if (obsLiner) {
            pdf.text(obsLiner, 150, 201.5);
        }

        if (capachoConAcople) {
            if (capachoConAcople.value === 'si') {
                pdf.text('X', 122.5, 205);
            } else if (capachoConAcople.value === 'no') {
                pdf.text('X', 130, 205);
            } else if (capachoConAcople.value === 'na') {
                pdf.text('X', 138, 205);
            }
        }
        if (obsCapachoConAcople) {
            pdf.text(obsCapachoConAcople, 150, 205);
        }

         if (prensaMordaza) {
            if (prensaMordaza.value === 'si') {
                pdf.text('X', 122.5, 208);
            } else if (prensaMordaza.value === 'no') {
                pdf.text('X', 130, 208);
            } else if (prensaMordaza.value === 'na') {
                pdf.text('X', 138, 208);
            }
        }
        if (obsPrensaMordaza) {
            pdf.text(obsPrensaMordaza, 150, 208);
        }

         if (camilla) {
            if (camilla.value === 'si') {
                pdf.text('X', 122.5, 211.5);
            } else if (camilla.value === 'no') {
                pdf.text('X', 130, 211.5);
            } else if (camilla.value === 'na') {
                pdf.text('X', 138, 211.5);
            }
        }
        if (obsCamilla) {
            pdf.text(obsCamilla, 150, 211.5);
        }

        // Responsables
        pdf.text(nombreResEntrega, 80, 258.8);
        pdf.text(rutResEntrega, 133, 258.8);
        pdf.text(nombreResRecepcion, 80, 262.5);
        pdf.text(rutResRecepcion, 133, 262.5);
        
        // Lugar geográfico de entrega
        pdf.text(lugarGeografico, 80, 266.5);

        // Nivel de combustible - aguja rotada según posición del usuario
        const centerX = 153;
        const centerY = 240; // Ajustado más arriba
        const needleLength = 15;
        
        // Ajustar el ángulo para que coincida con la orientación del PDF
        const adjustedAngle = needleAngle - 90; // Rotar 90° para corregir orientación
        const radians = (adjustedAngle * Math.PI) / 180;
        const endX = centerX + needleLength * Math.cos(radians);
        const endY = centerY + needleLength * Math.sin(radians);
        
        pdf.setLineWidth(0.5);
        pdf.setDrawColor(255, 0, 0); // Color rojo
        pdf.line(centerX, centerY, endX, endY);
        pdf.setDrawColor(0, 0, 0); // Volver a negro para otras líneas

        // Fecha y tipo de entrega
        const [year, month, day] = datetime.split('-');
        pdf.text(`${day}-${month}-${year}`, 156, 15.5);
        
        if (tipoEntrega?.value === '0') pdf.text('X', 83.5, 15.5);
        if (tipoEntrega?.value === '1') pdf.text('X', 83.5, 19);



        // Agregar imagen de abolladuras con dibujos
        if (abolladurasCanvas && abolladurasCtx) {
            const img = document.getElementById('abolladurasImg');
            
            // Crear canvas temporal con escala 1:1 para mantener tamaño exacto
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            
            // Usar dimensiones exactas del canvas original
            tempCanvas.width = abolladurasCanvas.width;
            tempCanvas.height = abolladurasCanvas.height;
            
            // Copiar solo los dibujos (sin la imagen de fondo)
            tempCtx.drawImage(abolladurasCanvas, 0, 0);
            
            // Calcular escala para mantener proporción 1:1
            const htmlWidth = img.offsetWidth;
            const htmlHeight = img.offsetHeight;
            
            // Usar valores por defecto si los controles no existen
            const pdfX = 33; // Valor fijo optimizado
            const pdfY = 215; // Valor fijo optimizado
            const pdfWidth = htmlWidth * 0.21; // Escala 1:1 aproximada
            const pdfHeight = htmlHeight * 0.21;
            
            const abolladurasImgData = tempCanvas.toDataURL('image/png');
            pdf.addImage(abolladurasImgData, 'PNG', pdfX, pdfY, pdfWidth, pdfHeight);
        }

        // Agregar firmas digitales
        if (!signaturePadEntrega.isEmpty()) {
            pdf.addImage(signaturePadEntrega.toDataURL('image/png'), 'PNG', 160, 251, 15, 15);
        }
        if (!signaturePadRecepcion.isEmpty()) {
            pdf.addImage(signaturePadRecepcion.toDataURL('image/png'), 'PNG', 160, 256, 15, 15);
        }

        // Agregar páginas de fotos si hay fotos subidas
        if (uploadedPhotos.length > 0) {
            const photosPerPage = 4;
            const totalPages = Math.ceil(uploadedPhotos.length / photosPerPage);
            
            for (let page = 0; page < totalPages; page++) {
                pdf.addPage();
                
                // Cargar imagen de fondo Acta2.jpg
                try {
                    const acta2Response = await fetch('../../assets/images/Acta2.jpg');
                    const acta2Blob = await acta2Response.blob();
                    const acta2ImageData = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(acta2Blob);
                    });
                    
                    // Agregar imagen de fondo completa
                    pdf.addImage(acta2ImageData, 'JPEG', 0, 0, 210, 297);
                } catch (error) {
                    console.log('No se pudo cargar Acta2.jpg, continuando sin fondo');
                }
                
                // Agregar fotos en cuadrícula 2x2
                const startIndex = page * photosPerPage;
                const endIndex = Math.min(startIndex + photosPerPage, uploadedPhotos.length);
                
                for (let i = startIndex; i < endIndex; i++) {
                    const photo = uploadedPhotos[i];
                    const photoIndex = i - startIndex;
                    
                    // Posiciones en cuadrícula 2x2
                    const col = photoIndex % 2;
                    const row = Math.floor(photoIndex / 2);
                    
                    const x = 20 + (col * 85); // 20mm margen + 85mm ancho por foto
                    const y = 50 + (row * 85); // 50mm desde arriba + 85mm alto por foto
                    const width = 80;
                    const height = 80;
                    
                    // Crear canvas temporal para aplicar rotación
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    
                    await new Promise((resolve) => {
                        img.onload = () => {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            
                            // Aplicar rotación
                            ctx.translate(canvas.width / 2, canvas.height / 2);
                            ctx.rotate((photo.rotation * Math.PI) / 180);
                            ctx.drawImage(img, -img.width / 2, -img.height / 2);
                            
                            // Agregar foto rotada al PDF
                            const rotatedImageData = canvas.toDataURL('image/jpeg', 0.8);
                            pdf.addImage(rotatedImageData, 'JPEG', x, y, width, height);
                            resolve();
                        };
                        img.src = photo.src;
                    });
                }
            }
        }
        
        // Descargar el PDF
        pdf.save('Acta de entrega y devolución.pdf');
    } catch (error) {
        alert('Error al cargar la imagen del reporte: ' + error.message);
    }
}

// Event listeners
document.getElementById('clear-entrega').addEventListener('click', clearSignatureEntrega);
document.getElementById('clear-recepcion').addEventListener('click', clearSignatureRecepcion);
document.getElementById('download-pdf').addEventListener('click', downloadPDF);

// Control visual del medidor
let needleAngle = 0;
const needle = document.getElementById('fuelNeedle');

// Función para manejar movimiento (mouse y touch)
function handleMove(clientX, clientY) {
    const img = document.getElementById('pdfPreview');
    const rect = img.getBoundingClientRect();
    const centerX = rect.left + (rect.width * 0.47);
    const centerY = rect.top + (rect.height * 0.30) + 70;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = Math.max(-90, Math.min(90, angle));
    
    needleAngle = angle;
    needle.style.transform = `rotate(${angle}deg)`;
}

// Eventos mouse
needle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    function onMouseMove(e) {
        handleMove(e.clientX, e.clientY);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
});

// Eventos touch para móviles
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
});

// Canvas para dibujar abolladuras
let abolladurasCanvas, abolladurasCtx;
let isDrawing = false;

// Inicializar canvas de abolladuras
function initAbolladurasCanvas() {
    const img = document.getElementById('abolladurasImg');
    abolladurasCanvas = document.getElementById('abolladurasCanvas');
    abolladurasCtx = abolladurasCanvas.getContext('2d');
    
    function resizeCanvas() {
        abolladurasCanvas.width = img.offsetWidth;
        abolladurasCanvas.height = img.offsetHeight;
        abolladurasCanvas.style.width = img.offsetWidth + 'px';
        abolladurasCanvas.style.height = img.offsetHeight + 'px';
        
        abolladurasCtx.strokeStyle = 'red';
        abolladurasCtx.lineWidth = 2;
        abolladurasCtx.lineCap = 'round';
    }
    
    img.onload = resizeCanvas;
    if (img.complete) resizeCanvas();
}

// Eventos de dibujo
function setupDrawingEvents() {
    // Función para obtener coordenadas
    function getCoords(e, rect) {
        if (e.touches) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    
    // Eventos mouse
    abolladurasCanvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = abolladurasCanvas.getBoundingClientRect();
        const coords = getCoords(e, rect);
        abolladurasCtx.beginPath();
        abolladurasCtx.moveTo(coords.x, coords.y);
    });
    
    abolladurasCanvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const rect = abolladurasCanvas.getBoundingClientRect();
        const coords = getCoords(e, rect);
        abolladurasCtx.lineTo(coords.x, coords.y);
        abolladurasCtx.stroke();
    });
    
    abolladurasCanvas.addEventListener('mouseup', () => isDrawing = false);
    
    // Eventos touch para móviles
    abolladurasCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const rect = abolladurasCanvas.getBoundingClientRect();
        const coords = getCoords(e, rect);
        abolladurasCtx.beginPath();
        abolladurasCtx.moveTo(coords.x, coords.y);
    });
    
    abolladurasCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const rect = abolladurasCanvas.getBoundingClientRect();
        const coords = getCoords(e, rect);
        abolladurasCtx.lineTo(coords.x, coords.y);
        abolladurasCtx.stroke();
    });
    
    abolladurasCanvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isDrawing = false;
    });
}

// Limpiar dibujos
document.getElementById('clearAbolladuras').addEventListener('click', () => {
    abolladurasCtx.clearRect(0, 0, abolladurasCanvas.width, abolladurasCanvas.height);
});

// Variables para manejo de fotos
let uploadedPhotos = [];

// Manejo de fotos
document.getElementById('photoInput').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (uploadedPhotos.length >= 16) { // 4 fotos x 4 páginas máximo
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
                <div class="card-body p-2">
                    <button class="btn btn-sm btn-warning me-1" onclick="rotatePhoto(${index})">Rotar</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePhoto(${index})">Eliminar</button>
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

// Inicializar cuando cargue la página
window.addEventListener('load', () => {
    initAbolladurasCanvas();
    setTimeout(setupDrawingEvents, 100);
});
