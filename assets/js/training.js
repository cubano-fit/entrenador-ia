// ===== VARIABLES PARA RUTINAS =====
let ejerciciosSeleccionados = []; // Guarda los ejercicios que el usuario quiere conservar

// ===== ENTRENAMIENTO MEJORADO =====
document.getElementById('trainingTipoPlan').addEventListener('change', function() {
    document.getElementById('trainingMusculo').style.display = this.value === 'diario' ? 'block' : 'none';
    // Ocultar opciones avanzadas al cambiar tipo
    document.getElementById('ejercicioOpciones').style.display = 'none';
});

function generarPlan() {
    if (!usuarioActual) {
        alert('Debes iniciar sesión');
        showLoginModal();
        return;
    }

    const tipo = document.getElementById('trainingTipoPlan').value;
    const musculo = document.getElementById('trainingMusculo').value;
    const datos = usuarioActual.datos;
    
    if (tipo === 'semanal') {
        generarPlanSemanal(datos);
    } else {
        generarPlanDiario(musculo, datos);
    }
}

function generarPlanSemanal(datos) {
    const diasPorSemana = parseInt(datos.dias) || 5;
    const duracion = parseInt(datos.duracion) || 45;
    
    // Definir rutinas según días disponibles
    let rutinas = [];
    
    if (diasPorSemana === 3) {
        rutinas = [
            { dia: "Lunes", rutina: "Full Body (cuerpo completo)", ejercicios: "Pecho, Espalda, Piernas" },
            { dia: "Miércoles", rutina: "Full Body", ejercicios: "Hombros, Brazos, Core" },
            { dia: "Viernes", rutina: "Full Body", ejercicios: "Cuerpo completo + Cardio" }
        ];
    } else if (diasPorSemana === 4) {
        rutinas = [
            { dia: "Lunes", rutina: "Pecho + Tríceps", ejercicios: "Press, aperturas, fondos" },
            { dia: "Martes", rutina: "Espalda + Bíceps", ejercicios: "Remo, dominadas, curl" },
            { dia: "Jueves", rutina: "Piernas", ejercicios: "Sentadillas, zancadas, gemelos" },
            { dia: "Viernes", rutina: "Hombros + Abdomen", ejercicios: "Press, elevaciones, plancha" }
        ];
    } else {
        rutinas = [
            { dia: "Lunes", rutina: "Pecho + Tríceps", ejercicios: "Press banca 4x10, aperturas 3x15, fondos 3x12" },
            { dia: "Martes", rutina: "Espalda + Bíceps", ejercicios: "Dominadas 4x8, remo 4x12, curl 3x15" },
            { dia: "Miércoles", rutina: "Piernas", ejercicios: "Sentadillas 4x15, zancadas 3x12, gemelos 4x20" },
            { dia: "Jueves", rutina: "Hombros + Abdomen", ejercicios: "Press militar 4x12, elevaciones 3x15, plancha 4x30\"" },
            { dia: "Viernes", rutina: "Cardio + Full Body", ejercicios: "Circuito funcional 3 rondas" }
        ];
    }
    
    // Añadir días extras si son más de 5
    if (diasPorSemana === 6) {
        rutinas.push({ dia: "Sábado", rutina: "Cardio + Estiramientos", ejercicios: "30 min cardio + full stretching" });
    }
    
    let html = `
        <h3>🎯 Plan semanal para ${datos.nombre}</h3>
        <p><strong>Nivel:</strong> ${datos.nivel} | <strong>Equipo:</strong> ${datos.equipo}</p>
        <p><strong>📆 ${diasPorSemana} días/semana | ⏱️ ${duracion} minutos por sesión</strong></p>
        <hr>
    `;
    
    rutinas.forEach(r => {
        html += `
            <div class="ejercicio-item">
                <strong>📅 ${r.dia}</strong> - ${r.rutina}<br>
                <span style="color: var(--text-secondary);">${r.ejercicios}</span>
            </div>
        `;
    });
    
    html += `
        <div class="ejercicio-consejo">
            💡 Calentamiento: 5-10 min de cardio ligero + estiramientos dinámicos<br>
            💡 Vuelta a la calma: 5-10 min de estiramientos al finalizar
        </div>
        <div style="margin-top:15px; padding:10px; background:var(--primary); color:white; border-radius:8px;">
            🔄 Vuelve a generar para diferentes combinaciones
        </div>
    `;
    
    document.getElementById('workoutResult').innerHTML = html;
}

function generarPlanDiario(musculo, datos) {
    const ejerciciosDisponibles = ejerciciosDB[musculo]?.[datos.equipo] || ejerciciosDB.pecho.cuerpo;
    
    let html = `
        <h3>🎯 Rutina para ${musculo}</h3>
        <p><strong>Nivel:</strong> ${datos.nivel} | <strong>Equipo:</strong> ${datos.equipo}</p>
        <hr>
        <div style="margin-bottom:15px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn-primary" style="max-width:200px; margin:0;" onclick="generarRutinaCompleta('${musculo}')">🔄 Generar todo nuevo</button>
            <button class="btn-primary" style="max-width:200px; margin:0; background:var(--primary-dark);" onclick="mostrarSelectorEjercicios('${musculo}')">✏️ Cambiar solo algunos</button>
        </div>
        <div id="selectorEjercicios" style="display:none; margin-bottom:20px;"></div>
        <div id="rutinaActual">
    `;
    
    // Si no hay ejercicios seleccionados, mostrar aleatorios
    if (ejerciciosSeleccionados.length === 0) {
        ejerciciosSeleccionados = [...ejerciciosDisponibles].sort(() => 0.5 - Math.random()).slice(0, 4);
    }
    
    ejerciciosSeleccionados.forEach(e => {
        html += `
            <div class="ejercicio-item" id="ej-${e.nombre.replace(/\s/g,'')}">
                <div class="ejercicio-nombre">${e.nombre}</div>
                <div class="ejercicio-detalle">🔹 ${e.series} | Descanso: ${e.descanso}</div>
                <div class="ejercicio-consejo">💡 ${e.consejo}</div>
            </div>
        `;
    });
    
    html += `</div>`;
    
    document.getElementById('workoutResult').innerHTML = html;
}

function generarRutinaCompleta(musculo) {
    const datos = usuarioActual.datos;
    const ejerciciosDisponibles = ejerciciosDB[musculo]?.[datos.equipo] || ejerciciosDB.pecho.cuerpo;
    
    // Generar nueva rutina completa
    ejerciciosSeleccionados = [...ejerciciosDisponibles].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Actualizar vista
    generarPlanDiario(musculo, datos);
}

function mostrarSelectorEjercicios(musculo) {
    const datos = usuarioActual.datos;
    const ejerciciosDisponibles = ejerciciosDB[musculo]?.[datos.equipo] || ejerciciosDB.pecho.cuerpo;
    
    let html = `
        <h4>Selecciona los ejercicios que quieres cambiar:</h4>
        <div style="display: grid; gap:10px; margin:15px 0;">
    `;
    
    ejerciciosSeleccionados.forEach((ej, index) => {
        html += `
            <div style="display: flex; align-items: center; gap:10px; background:var(--bg); padding:10px; border-radius:8px;">
                <input type="checkbox" id="chk-${index}" value="${index}">
                <label for="chk-${index}"><strong>${ej.nombre}</strong> - ${ej.series}</label>
            </div>
        `;
    });
    
    html += `
        </div>
        <div style="display: flex; gap:10px;">
            <button class="btn-primary" style="max-width:150px; margin:0;" onclick="cambiarSeleccionados('${musculo}')">Cambiar seleccionados</button>
            <button class="btn-primary" style="max-width:150px; margin:0; background:var(--hover); color:var(--text);" onclick="cancelarCambios('${musculo}')">Cancelar</button>
        </div>
    `;
    
    document.getElementById('selectorEjercicios').innerHTML = html;
    document.getElementById('selectorEjercicios').style.display = 'block';
}

function cambiarSeleccionados(musculo) {
    const datos = usuarioActual.datos;
    const ejerciciosDisponibles = ejerciciosDB[musculo]?.[datos.equipo] || ejerciciosDB.pecho.cuerpo;
    
    // Obtener índices seleccionados
    const checkboxes = document.querySelectorAll('[id^="chk-"]:checked');
    if (checkboxes.length === 0) {
        alert('Selecciona al menos un ejercicio para cambiar');
        return;
    }
    
    // Crear nuevo array manteniendo los no seleccionados
    const indicesCambiar = Array.from(checkboxes).map(cb => parseInt(cb.value));
    const nuevosEjercicios = [];
    
    // Filtrar ejercicios disponibles que no estén ya en la rutina
    const ejerciciosRestantes = ejerciciosDisponibles.filter(ej1 => 
        !ejerciciosSeleccionados.some(ej2 => ej2.nombre === ej1.nombre)
    );
    
    // Si no hay suficientes ejercicios nuevos, usar los disponibles
    while (ejerciciosRestantes.length < indicesCambiar.length) {
        ejerciciosRestantes.push(...ejerciciosDisponibles);
    }
    
    // Mezclar y seleccionar nuevos
    const nuevosAleatorios = [...ejerciciosRestantes].sort(() => 0.5 - Math.random());
    
    // Reconstruir array
    for (let i = 0; i < ejerciciosSeleccionados.length; i++) {
        if (indicesCambiar.includes(i)) {
            nuevosEjercicios.push(nuevosAleatorios[i % nuevosAleatorios.length]);
        } else {
            nuevosEjercicios.push(ejerciciosSeleccionados[i]);
        }
    }
    
    ejerciciosSeleccionados = nuevosEjercicios;
    
    // Actualizar vista
    document.getElementById('selectorEjercicios').style.display = 'none';
    generarPlanDiario(musculo, datos);
}

function cancelarCambios(musculo) {
    document.getElementById('selectorEjercicios').style.display = 'none';
    generarPlanDiario(musculo, usuarioActual.datos);
}