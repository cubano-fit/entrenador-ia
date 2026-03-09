// LOGICA DE ENTRENAMIENTO - VERSIÓN CORREGIDA
window.training = {
    contador: 0,

    init: function() {
        console.log('✅ training.js inicializado');
        const tipoPlan = document.getElementById('trainingTipoPlan');
        if (tipoPlan) {
            tipoPlan.addEventListener('change', function() {
                const diasSelector = document.getElementById('diasSelector');
                const musculoSelector = document.getElementById('trainingMusculo');
                
                if (this.value === 'semanal') {
                    diasSelector.style.display = 'flex';
                    musculoSelector.style.display = 'none';
                } else {
                    diasSelector.style.display = 'none';
                    musculoSelector.style.display = 'block';
                }
            });
            
            // Forzar evento inicial
            tipoPlan.dispatchEvent(new Event('change'));
        }
        this.cargarSelectorMusculos();
    },

    obtenerDatosUsuario: function() {
        if (!window.auth || !window.auth.usuarioActual) return null;
        const usuario = window.auth.usuarioActual;
        if (usuario.datos) return usuario.datos;
        return {
            nombre: usuario.nombre || 'Usuario',
            sexo: usuario.sexo || 'hombre',
            edad: usuario.edad || 30,
            peso: usuario.peso || 70,
            altura: usuario.altura || 170,
            objetivo: usuario.objetivo || 'hipertrofia',
            equipo: usuario.equipo || 'cuerpo',
            nivel: usuario.nivel || 'intermedio'
        };
    },

    cargarSelectorMusculos: function() {
        const selector = document.getElementById('trainingMusculo');
        if (!selector) return;
        
        const categorias = [
            {
                nombre: '🔹 TORSO',
                musculos: [
                    { valor: 'pecho', texto: '🫁 Pectorales (pecho)' },
                    { valor: 'dorsales', texto: '🔙 Dorsales (espalda ancha)' },
                    { valor: 'trapecios', texto: '🧥 Trapecios (parte superior)' },
                    { valor: 'romboides', texto: '🔹 Romboides (entre omóplatos)' },
                    { valor: 'deltoides', texto: '🏋️ Deltoides (hombros)' }
                ]
            },
            {
                nombre: '🔹 BRAZOS',
                musculos: [
                    { valor: 'biceps', texto: '💪 Bíceps braquial' },
                    { valor: 'triceps', texto: '🔻 Tríceps braquial' },
                    { valor: 'braquial', texto: '🔸 Braquial anterior' },
                    { valor: 'antebrazos', texto: '✊ Antebrazos' }
                ]
            },
            {
                nombre: '🔹 PIERNAS',
                musculos: [
                    { valor: 'cuadriceps', texto: '🦵 Cuádriceps (frontal)' },
                    { valor: 'femorales', texto: '🍗 Isquiotibiales/femorales' },
                    { valor: 'gluteos', texto: '🍑 Glúteos' },
                    { valor: 'aductores', texto: '🤸 Aductores (parte interna)' },
                    { valor: 'abductores', texto: '🔄 Abductores (cadera)' },
                    { valor: 'gemelos', texto: '🦶 Gemelos/pantorrillas' }
                ]
            },
            {
                nombre: '🔹 CORE',
                musculos: [
                    { valor: 'abdominales', texto: '🫀 Recto abdominal (six pack)' },
                    { valor: 'oblicuos', texto: '↩️ Oblicuos' },
                    { valor: 'transverso', texto: '🧱 Transverso abdominal' },
                    { valor: 'lumbares', texto: '⚡ Erectores espinales (zona lumbar)' }
                ]
            }
        ];
        
        selector.innerHTML = '';
        
        categorias.forEach(cat => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = cat.nombre;
            
            cat.musculos.forEach(m => {
                const option = document.createElement('option');
                option.value = m.valor;
                option.textContent = m.texto;
                optgroup.appendChild(option);
            });
            
            selector.appendChild(optgroup);
        });
    },

    // ... (el resto de funciones: getSexoEmoji, getObjetivoEmoji, etc. IGUAL que antes)
    getSexoEmoji: function(sexo) { return sexo === 'mujer' ? '👩' : '👨'; },
    getObjetivoEmoji: function(objetivo) { const e={'hipertrofia':'💪','definicion':'✨','perder peso':'🔥'}; return e[objetivo]||'💪'; },
    getObjetivoTexto: function(objetivo) { const t={'hipertrofia':'Hipertrofia','definicion':'Definición','perder peso':'Perder peso'}; return t[objetivo]||objetivo; },
    getEquipoEmoji: function(equipo) { const e={'cuerpo':'🏠','mancuernas':'💪','gym':'🏋️'}; return e[equipo]||'🏋️'; },
    getEquipoTexto: function(equipo) { return equipo; },
    getNivelEmoji: function(nivel) { const e={'principiante':'🟢','intermedio':'🟡','avanzado':'🔴'}; return e[nivel]||'🟡'; },
    getSeriesPorObjetivo: function(objetivo) { const s={'hipertrofia':{reps:'8-10',descanso:'90 seg'},'definicion':{reps:'12-15',descanso:'60 seg'},'perder peso':{reps:'15-20',descanso:'45 seg'}}; return s[objetivo]||s.hipertrofia; },
    getCategoriaFromMusculo: function(musculo) { return musculo; },
    getNombreMusculo: function(musculo) { return musculo; },

    personalizarEjercicios: function(ejercicios, sexo, musculo, objetivo) {
        const serieObj = this.getSeriesPorObjetivo(objetivo);
        return ejercicios.map(e => {
            const nuevo = {...e};
            nuevo.series = nuevo.series.replace(/\d+[x-]\d+/, `4x${serieObj.reps}`);
            nuevo.descanso = serieObj.descanso;
            return nuevo;
        });
    },

    generarPlan: function() {
        if (!window.auth || !window.auth.usuarioActual) { alert('Debes iniciar sesión'); return; }
        const datos = this.obtenerDatosUsuario();
        if (!datos) { document.getElementById('workoutResult').innerHTML = '<p>Error: No se pudieron cargar tus datos</p>'; return; }
        this.contador++;
        const tipo = document.getElementById('trainingTipoPlan').value;
        if (tipo === 'semanal') {
            const dia = window.app ? window.app.diaSeleccionado || 'L' : 'L';
            this.generarPlanSemanalPorDia(dia, datos);
        } else {
            const musculo = document.getElementById('trainingMusculo').value;
            if (!musculo) { alert('Selecciona un músculo'); return; }
            this.generarPlanPorMusculo(musculo, datos);
        }
    },

    obtenerPlanSemanal: function(nivel) {
        const planes = {
            'principiante': {
                'L': { nombre: '🟢 Lunes - Torso', musculos: ['pecho', 'dorsales', 'deltoides'] },
                'M': { nombre: '🟢 Martes - Piernas', musculos: ['cuadriceps', 'gluteos', 'gemelos'] },
                'X': { nombre: '🟢 Miércoles - Brazos y Core', musculos: ['biceps', 'triceps', 'abdominales'] },
                'J': { nombre: '🟢 Jueves - Torso', musculos: ['pecho', 'dorsales', 'deltoides'] },
                'V': { nombre: '🟢 Viernes - Piernas', musculos: ['femorales', 'gluteos', 'aductores'] },
                'S': { nombre: '🟢 Sábado - Brazos y Core', musculos: ['biceps', 'triceps', 'lumbares'] },
                'D': { nombre: '🟢 Domingo - Descanso', musculos: [] }
            },
            'intermedio': {
                'L': { nombre: '🟡 Lunes - Torso (pecho, dorsales, hombros)', musculos: ['pecho', 'dorsales', 'deltoides'] },
                'M': { nombre: '🟡 Martes - Piernas (cuádriceps, glúteos, gemelos)', musculos: ['cuadriceps', 'gluteos', 'gemelos'] },
                'X': { nombre: '🟡 Miércoles - Brazos (bíceps, tríceps, antebrazos)', musculos: ['biceps', 'triceps', 'antebrazos'] },
                'J': { nombre: '🟡 Jueves - Torso', musculos: ['pecho', 'dorsales', 'deltoides'] },
                'V': { nombre: '🟡 Viernes - Piernas (femorales, glúteos, aductores)', musculos: ['femorales', 'gluteos', 'aductores'] },
                'S': { nombre: '🟡 Sábado - Core (abdominales, oblicuos, lumbares)', musculos: ['abdominales', 'oblicuos', 'lumbares'] },
                'D': { nombre: '🟡 Domingo - Descanso', musculos: [] }
            },
            'avanzado': {
                'L': { nombre: '🔴 Lunes - Torso (pecho y dorsales)', musculos: ['pecho', 'dorsales'] },
                'M': { nombre: '🔴 Martes - Piernas (cuádriceps y glúteos)', musculos: ['cuadriceps', 'gluteos'] },
                'X': { nombre: '🔴 Miércoles - Brazos (bíceps y tríceps)', musculos: ['biceps', 'triceps'] },
                'J': { nombre: '🔴 Jueves - Hombros y trapecios', musculos: ['deltoides', 'trapecios'] },
                'V': { nombre: '🔴 Viernes - Espalda (dorsales, romboides, lumbares)', musculos: ['dorsales', 'romboides', 'lumbares'] },
                'S': { nombre: '🔴 Sábado - Piernas (femorales, gemelos, aductores)', musculos: ['femorales', 'gemelos', 'aductores'] },
                'D': { nombre: '🔴 Domingo - Descanso', musculos: [] }
            }
        };
        return planes[nivel] || planes['intermedio'];
    },

    generarPlanSemanalPorDia: function(dia, datos) {
        const sexo = datos.sexo || 'hombre';
        const nivel = datos.nivel || 'intermedio';
        const objetivo = datos.objetivo || 'hipertrofia';
        const equipo = datos.equipo || 'cuerpo';
        
        const sexoEmoji = this.getSexoEmoji(sexo);
        const nivelEmoji = this.getNivelEmoji(nivel);
        const objetivoEmoji = this.getObjetivoEmoji(objetivo);
        const objetivoTexto = this.getObjetivoTexto(objetivo);
        const equipoEmoji = this.getEquipoEmoji(equipo);
        
        const planSemanal = this.obtenerPlanSemanal(nivel);
        const diaInfo = planSemanal[dia] || planSemanal['L'];
        
        if (diaInfo.musculos.length === 0) {
            document.getElementById('workoutResult').innerHTML = `<h3>${diaInfo.nombre}</h3><p>¡Día de descanso!</p>`;
            return;
        }
        
        let html = `<h3>${diaInfo.nombre}</h3>`;
        html += `<p>${sexoEmoji} ${nivelEmoji} ${equipoEmoji} ${objetivoEmoji}</p><hr>`;
        
        diaInfo.musculos.forEach(musculo => {
            if (!window.ejerciciosDB || !window.ejerciciosDB[musculo]) return;
            const ejerciciosBase = window.ejerciciosDB[musculo][equipo] || window.ejerciciosDB[musculo].cuerpo;
            if (!ejerciciosBase) return;
            
            html += `<h4>${musculo}</h4>`;
            for (let i = 0; i < 3; i++) {
                const e = ejerciciosBase[i % ejerciciosBase.length];
                html += `<div class="ejercicio-item"><div class="ejercicio-nombre">${e.nombre}</div></div>`;
            }
        });
        
        document.getElementById('workoutResult').innerHTML = html;
    },

    generarPlanPorMusculo: function(musculo, datos) {
        const equipo = datos.equipo || 'cuerpo';
        if (!window.ejerciciosDB || !window.ejerciciosDB[musculo]) {
            document.getElementById('workoutResult').innerHTML = `<p>Ejercicios no disponibles para ${musculo}</p>`;
            return;
        }
        const ejerciciosBase = window.ejerciciosDB[musculo][equipo] || window.ejerciciosDB[musculo].cuerpo;
        if (!ejerciciosBase) return;
        
        let html = `<h3>🎯 Rutina para ${musculo}</h3><hr>`;
        for (let i = 0; i < 4; i++) {
            const e = ejerciciosBase[i % ejerciciosBase.length];
            html += `<div class="ejercicio-item"><div class="ejercicio-nombre">${e.nombre}</div></div>`;
        }
        document.getElementById('workoutResult').innerHTML = html;
    },

    seleccionarDia: function(dia) {
        if (!window.app) window.app = { diaSeleccionado: dia };
        else window.app.diaSeleccionado = dia;
        document.querySelectorAll('.dia-btn').forEach(btn => btn.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        if (document.getElementById('trainingTipoPlan').value === 'semanal') {
            const datos = this.obtenerDatosUsuario();
            if (datos) this.generarPlanSemanalPorDia(dia, datos);
        }
    }
};

console.log('✅ training.js cargado correctamente');
