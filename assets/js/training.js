// assets/js/training.js - VERSIÓN COMPLETA
window.training = {
    contador: 0,

    init: function() {
        console.log('✅ training.js inicializado');
        const tipoPlan = document.getElementById('trainingTipoPlan');
        const diasSelector = document.getElementById('diasSelector');
        const musculoSelector = document.getElementById('trainingMusculo');
        
        if (tipoPlan) {
            const actualizarVisibilidad = function() {
                if (tipoPlan.value === 'semanal') {
                    diasSelector.style.display = 'flex';
                    musculoSelector.style.display = 'none';
                } else {
                    diasSelector.style.display = 'none';
                    musculoSelector.style.display = 'block';
                }
            };
            
            actualizarVisibilidad();
            tipoPlan.addEventListener('change', actualizarVisibilidad);
        }
        
        this.cargarSelectorMusculos();
    },

    obtenerDatosUsuario: function() {
        return JSON.parse(localStorage.getItem('cliente_perfil'));
    },

    cargarSelectorMusculos: function() {
        const selector = document.getElementById('trainingMusculo');
        if (!selector) return;
        
        const categorias = [
            {
                nombre: '🔹 TORSO',
                musculos: [
                    { valor: 'pecho', texto: '🫁 Pectorales' },
                    { valor: 'dorsales', texto: '🔙 Dorsales' },
                    { valor: 'trapecios', texto: '🧥 Trapecios' },
                    { valor: 'romboides', texto: '🔹 Romboides' },
                    { valor: 'deltoides', texto: '🏋️ Deltoides' }
                ]
            },
            {
                nombre: '🔹 BRAZOS',
                musculos: [
                    { valor: 'biceps', texto: '💪 Bíceps' },
                    { valor: 'triceps', texto: '🔻 Tríceps' },
                    { valor: 'braquial', texto: '🔸 Braquial' },
                    { valor: 'antebrazos', texto: '✊ Antebrazos' }
                ]
            },
            {
                nombre: '🔹 PIERNAS',
                musculos: [
                    { valor: 'cuadriceps', texto: '🦵 Cuádriceps' },
                    { valor: 'femorales', texto: '🍗 Isquiotibiales' },
                    { valor: 'gluteos', texto: '🍑 Glúteos' },
                    { valor: 'aductores', texto: '🤸 Aductores' },
                    { valor: 'abductores', texto: '🔄 Abductores' },
                    { valor: 'gemelos', texto: '🦶 Gemelos' }
                ]
            },
            {
                nombre: '🔹 CORE',
                musculos: [
                    { valor: 'abdominales', texto: '🫀 Abdominales' },
                    { valor: 'oblicuos', texto: '↩️ Oblicuos' },
                    { valor: 'transverso', texto: '🧱 Transverso' },
                    { valor: 'lumbares', texto: '⚡ Lumbares' }
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

    getSexoEmoji: function(sexo) {
        return sexo === 'mujer' ? '👩' : '👨';
    },

    getObjetivoEmoji: function(objetivo) {
        const e = {'hipertrofia':'💪','definicion':'✨','perder peso':'🔥'};
        return e[objetivo] || '💪';
    },

    getEquipoEmoji: function(equipo) {
        const e = {'cuerpo':'🏠','mancuernas':'💪','gym':'🏋️'};
        return e[equipo] || '🏋️';
    },

    getNivelEmoji: function(nivel) {
        const e = {'principiante':'🟢','intermedio':'🟡','avanzado':'🔴'};
        return e[nivel] || '🟡';
    },

    getCategoriaFromMusculo: function(musculo) {
        return musculo;
    },

    getNombreMusculo: function(musculo) {
        const nombres = {
            'pecho':'🫁 Pectorales','dorsales':'🔙 Dorsales','trapecios':'🧥 Trapecios',
            'romboides':'🔹 Romboides','deltoides':'🏋️ Deltoides','biceps':'💪 Bíceps',
            'triceps':'🔻 Tríceps','braquial':'🔸 Braquial','antebrazos':'✊ Antebrazos',
            'cuadriceps':'🦵 Cuádriceps','femorales':'🍗 Isquiotibiales','gluteos':'🍑 Glúteos',
            'aductores':'🤸 Aductores','abductores':'🔄 Abductores','gemelos':'🦶 Gemelos',
            'abdominales':'🫀 Abdominales','oblicuos':'↩️ Oblicuos','transverso':'🧱 Transverso',
            'lumbares':'⚡ Lumbares'
        };
        return nombres[musculo] || musculo;
    },

    generarPlan: function() {
        const datos = this.obtenerDatosUsuario();
        
        if (!datos) {
            alert('❌ Completa tu perfil primero');
            return;
        }
        
        this.contador++;
        const tipo = document.getElementById('trainingTipoPlan').value;
        
        if (tipo === 'semanal') {
            const dia = window.app ? window.app.diaSeleccionado || 'L' : 'L';
            this.generarPlanSemanalPorDia(dia, datos);
        } else {
            const musculo = document.getElementById('trainingMusculo').value;
            if (!musculo) {
                alert('Selecciona un músculo');
                return;
            }
            this.generarPlanPorMusculo(musculo, datos);
        }
    },

    obtenerPlanSemanal: function(nivel) {
        const planes = {
            'principiante': {
                'L': { nombre: '🟢 Lunes - Torso', musculos: ['pecho', 'dorsales', 'deltoides'] },
                'M': { nombre: '🟢 Martes - Piernas', musculos: ['cuadriceps', 'gluteos', 'gemelos'] },
                'X': { nombre: '🟢 Miércoles - Brazos', musculos: ['biceps', 'triceps'] },
                'J': { nombre: '🟢 Jueves - Torso', musculos: ['pecho', 'dorsales', 'deltoides'] },
                'V': { nombre: '🟢 Viernes - Piernas', musculos: ['femorales', 'gluteos'] },
                'S': { nombre: '🟢 Sábado - Brazos', musculos: ['biceps', 'triceps'] },
                'D': { nombre: '🟢 Domingo - Descanso', musculos: [] }
            },
            'intermedio': {
                'L': { nombre: '🟡 Lunes - Torso', musculos: ['pecho', 'dorsales', 'deltoides'] },
                'M': { nombre: '🟡 Martes - Piernas', musculos: ['cuadriceps', 'gluteos', 'gemelos'] },
                'X': { nombre: '🟡 Miércoles - Brazos', musculos: ['biceps', 'triceps', 'antebrazos'] },
                'J': { nombre: '🟡 Jueves - Torso', musculos: ['pecho', 'dorsales', 'deltoides'] },
                'V': { nombre: '🟡 Viernes - Piernas', musculos: ['femorales', 'gluteos', 'aductores'] },
                'S': { nombre: '🟡 Sábado - Core', musculos: ['abdominales', 'oblicuos'] },
                'D': { nombre: '🟡 Domingo - Descanso', musculos: [] }
            },
            'avanzado': {
                'L': { nombre: '🔴 Lunes - Pecho', musculos: ['pecho'] },
                'M': { nombre: '🔴 Martes - Espalda', musculos: ['dorsales', 'romboides'] },
                'X': { nombre: '🔴 Miércoles - Piernas', musculos: ['cuadriceps', 'gluteos'] },
                'J': { nombre: '🔴 Jueves - Hombros', musculos: ['deltoides'] },
                'V': { nombre: '🔴 Viernes - Brazos', musculos: ['biceps', 'triceps'] },
                'S': { nombre: '🔴 Sábado - Piernas', musculos: ['femorales', 'gemelos'] },
                'D': { nombre: '🔴 Domingo - Descanso', musculos: [] }
            }
        };
        return planes[nivel] || planes['intermedio'];
    },

    generarPlanSemanalPorDia: function(dia, datos) {
        const nivel = datos.nivel || 'intermedio';
        const equipo = datos.equipo || 'cuerpo';
        
        const planSemanal = this.obtenerPlanSemanal(nivel);
        const diaInfo = planSemanal[dia] || planSemanal['L'];
        
        if (diaInfo.musculos.length === 0) {
            document.getElementById('workoutResult').innerHTML = `<h3>${diaInfo.nombre}</h3><p>¡Descanso!</p>`;
            return;
        }
        
        let html = `<h3>${diaInfo.nombre}</h3>`;
        html += `<p>${this.getEquipoEmoji(equipo)} Equipo: ${equipo}</p><hr>`;
        
        diaInfo.musculos.forEach(musculo => {
            if (!window.ejerciciosDB || !window.ejerciciosDB[musculo]) return;
            
            const ejerciciosBase = window.ejerciciosDB[musculo][equipo] || window.ejerciciosDB[musculo].cuerpo;
            if (!ejerciciosBase) return;
            
            html += `<h4>${this.getNombreMusculo(musculo)}</h4>`;
            
            for (let i = 0; i < 3; i++) {
                const e = ejerciciosBase[i % ejerciciosBase.length];
                html += `<div class="ejercicio-item"><div class="ejercicio-nombre">${e.nombre}</div>`;
                if (e.series) html += `<div class="ejercicio-detalle">${e.series}</div>`;
                html += `</div>`;
            }
        });
        
        document.getElementById('workoutResult').innerHTML = html;
    },

    generarPlanPorMusculo: function(musculo, datos) {
        const equipo = datos.equipo || 'cuerpo';
        
        if (!window.ejerciciosDB || !window.ejerciciosDB[musculo]) {
            document.getElementById('workoutResult').innerHTML = `<p>Ejercicios no disponibles</p>`;
            return;
        }
        
        const ejerciciosBase = window.ejerciciosDB[musculo][equipo] || window.ejerciciosDB[musculo].cuerpo;
        if (!ejerciciosBase) return;
        
        let html = `<h3>🎯 ${this.getNombreMusculo(musculo)}</h3>`;
        html += `<p>${this.getEquipoEmoji(equipo)} Equipo: ${equipo}</p><hr>`;
        
        for (let i = 0; i < 4; i++) {
            const e = ejerciciosBase[i % ejerciciosBase.length];
            html += `<div class="ejercicio-item"><div class="ejercicio-nombre">${e.nombre}</div>`;
            if (e.series) html += `<div class="ejercicio-detalle">${e.series}</div>`;
            html += `</div>`;
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

console.log('✅ training.js cargado');
