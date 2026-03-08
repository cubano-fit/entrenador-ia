// LOGICA DE ENTRENAMIENTO - CON CATEGORÍAS Y MÚSCULOS DETALLADOS
window.training = {
    contador: 0,

    init: function() {
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
        }
        
        // Cargar selector de músculos con categorías
        this.cargarSelectorMusculos();
    },

    // Cargar selector de músculos organizado por categorías
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
        
        // Limpiar selector
        selector.innerHTML = '';
        
        // Agregar opciones por categoría
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

    // Obtener emoji según sexo
    getSexoEmoji: function(sexo) {
        return sexo === 'mujer' ? '👩' : '👨';
    },

    // Obtener emoji según objetivo
    getObjetivoEmoji: function(objetivo) {
        const emojis = {
            'hipertrofia': '💪',
            'definicion': '✨',
            'perder peso': '🔥'
        };
        return emojis[objetivo] || '💪';
    },

    // Obtener texto del objetivo
    getObjetivoTexto: function(objetivo) {
        const textos = {
            'hipertrofia': 'Hipertrofia (ganar músculo)',
            'definicion': 'Definición (marcar músculo)',
            'perder peso': 'Perder peso'
        };
        return textos[objetivo] || objetivo;
    },

    // Obtener emoji según equipo
    getEquipoEmoji: function(equipo) {
        const emojis = {
            'cuerpo': '🏠',
            'mancuernas': '💪',
            'gym': '🏋️'
        };
        return emojis[equipo] || '🏋️';
    },

    // Obtener texto del equipo
    getEquipoTexto: function(equipo) {
        const textos = {
            'cuerpo': 'cuerpo',
            'mancuernas': 'mancuernas',
            'gym': 'gym'
        };
        return textos[equipo] || equipo;
    },

    // Obtener emoji según nivel
    getNivelEmoji: function(nivel) {
        const emojis = {
            'principiante': '🟢',
            'intermedio': '🟡',
            'avanzado': '🔴'
        };
        return emojis[nivel] || '🟡';
    },

    // Obtener series según objetivo
    getSeriesPorObjetivo: function(objetivo) {
        const series = {
            'hipertrofia': { reps: '8-10', descanso: '90 seg' },
            'definicion': { reps: '12-15', descanso: '60 seg' },
            'perder peso': { reps: '15-20', descanso: '45 seg' }
        };
        return series[objetivo] || series['hipertrofia'];
    },

    // Mapear músculos a categorías en ejercicios.js (CORREGIDO)
    getCategoriaFromMusculo: function(musculo) {
        // Los nuevos músculos ya tienen su propia categoría en ejercicios.js
        const categoriasValidas = [
            'pecho', 'dorsales', 'trapecios', 'romboides', 'deltoides',
            'biceps', 'triceps', 'braquial', 'antebrazos',
            'cuadriceps', 'femorales', 'gluteos', 'aductores', 'abductores', 'gemelos',
            'abdominales', 'oblicuos', 'transverso', 'lumbares'
        ];
        
        // Si el músculo ya es una categoría válida, devolverlo directamente
        if (categoriasValidas.includes(musculo)) {
            return musculo;
        }
        
        // Mapeos de respaldo para compatibilidad
        const mapaRespaldo = {
            'pecho': 'pecho',
            'dorsales': 'dorsales',
            'trapecios': 'trapecios',
            'romboides': 'romboides',
            'deltoides': 'deltoides',
            'biceps': 'biceps',
            'triceps': 'triceps',
            'braquial': 'braquial',
            'antebrazos': 'antebrazos',
            'cuadriceps': 'cuadriceps',
            'femorales': 'femorales',
            'gluteos': 'gluteos',
            'aductores': 'aductores',
            'abductores': 'abductores',
            'gemelos': 'gemelos',
            'abdominales': 'abdominales',
            'oblicuos': 'oblicuos',
            'transverso': 'transverso',
            'lumbares': 'lumbares'
        };
        
        return mapaRespaldo[musculo] || 'pecho'; // fallback a pecho
    },

    // Obtener nombre bonito del músculo
    getNombreMusculo: function(musculo) {
        const nombres = {
            'pecho': '🫁 Pectorales',
            'dorsales': '🔙 Dorsales',
            'trapecios': '🧥 Trapecios',
            'romboides': '🔹 Romboides',
            'deltoides': '🏋️ Deltoides',
            'biceps': '💪 Bíceps',
            'triceps': '🔻 Tríceps',
            'braquial': '🔸 Braquial',
            'antebrazos': '✊ Antebrazos',
            'cuadriceps': '🦵 Cuádriceps',
            'femorales': '🍗 Isquiotibiales',
            'gluteos': '🍑 Glúteos',
            'aductores': '🤸 Aductores',
            'abductores': '🔄 Abductores',
            'gemelos': '🦶 Gemelos',
            'abdominales': '🫀 Abdominales',
            'oblicuos': '↩️ Oblicuos',
            'transverso': '🧱 Transverso',
            'lumbares': '⚡ Lumbares'
        };
        return nombres[musculo] || musculo;
    },

    // Personalizar ejercicios según sexo, músculo y objetivo
    personalizarEjercicios: function(ejercicios, sexo, musculo, objetivo) {
        const serieObj = this.getSeriesPorObjetivo(objetivo);
        
        return ejercicios.map(e => {
            const nuevo = {...e};
            
            // Ajustar series y repeticiones según objetivo
            nuevo.series = nuevo.series.replace(/\d+[x-]\d+/, `4x${serieObj.reps}`);
            nuevo.descanso = serieObj.descanso;
            
            // Personalizar según sexo y músculo
            if (sexo === 'mujer') {
                if (musculo === 'gluteos' || musculo === 'femorales' || musculo === 'aductores' || musculo === 'abductores') {
                    nuevo.consejo = "Enfoque en glúteos, siente la contracción en cada rep";
                } else if (musculo === 'abdominales' || musculo === 'oblicuos') {
                    nuevo.consejo = "Para abdomen definido, controla el movimiento";
                } else if (musculo === 'deltoides') {
                    nuevo.consejo = "Para hombros tonificados, peso moderado";
                }
            } else { // Hombre
                if (musculo === 'pecho' || musculo === 'dorsales' || musculo === 'biceps' || musculo === 'triceps') {
                    nuevo.consejo = "Busca el fallo, buen peso y técnica para volumen";
                }
            }
            
            return nuevo;
        });
    },

    generarPlan: function() {
        if (!window.auth || !window.auth.usuarioActual) {
            alert('Debes iniciar sesión');
            if (window.auth) window.auth.showLoginModal();
            return;
        }
        this.contador++;
        const tipo = document.getElementById('trainingTipoPlan').value;
        if (tipo === 'semanal') {
            const dia = window.app ? window.app.diaSeleccionado || 'L' : 'L';
            this.generarPlanSemanalPorDia(dia);
        } else {
            const musculo = document.getElementById('trainingMusculo').value;
            if (!musculo) {
                alert('Selecciona un músculo');
                return;
            }
            this.generarPlanPorMusculo(musculo);
        }
    },

    // PLANES SEMANALES SEGÚN NIVEL
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

    generarPlanSemanalPorDia: function(dia) {
        if (!window.auth || !window.auth.usuarioActual || !window.auth.usuarioActual.datos) {
            document.getElementById('workoutResult').innerHTML = '<p>Error: Datos de usuario no disponibles</p>';
            return;
        }
        
        const datos = window.auth.usuarioActual.datos;
        const sexo = datos.sexo || 'hombre';
        const nivel = datos.nivel || 'intermedio';
        const objetivo = datos.objetivo || 'hipertrofia';
        const equipo = datos.equipo || 'cuerpo';
        
        const sexoEmoji = this.getSexoEmoji(sexo);
        const nivelEmoji = this.getNivelEmoji(nivel);
        const objetivoEmoji = this.getObjetivoEmoji(objetivo);
        const objetivoTexto = this.getObjetivoTexto(objetivo);
        const equipoEmoji = this.getEquipoEmoji(equipo);
        const equipoTexto = this.getEquipoTexto(equipo);
        
        const planSemanal = this.obtenerPlanSemanal(nivel);
        const diaInfo = planSemanal[dia] || planSemanal['L'];
        
        if (diaInfo.musculos.length === 0) {
            document.getElementById('workoutResult').innerHTML = `<h3>${diaInfo.nombre}</h3><p>¡Día de descanso! Recupérate bien.</p>`;
            return;
        }
        
        let html = `<h3>${diaInfo.nombre}</h3>`;
        html += `<p>${sexoEmoji} <strong>${sexo === 'mujer' ? 'Mujer' : 'Hombre'}</strong> | ${nivelEmoji} <strong>Nivel:</strong> ${nivel} | ${equipoEmoji} <strong>Equipo:</strong> ${equipoTexto} | ${objetivoEmoji} <strong>Objetivo:</strong> ${objetivoTexto}</p>`;
        html += `<hr>`;
        
        diaInfo.musculos.forEach(musculo => {
            const categoria = this.getCategoriaFromMusculo(musculo);
            if (!window.ejerciciosDB || !window.ejerciciosDB[categoria]) {
                console.warn(`Categoría no encontrada: ${categoria} para músculo ${musculo}`);
                return;
            }
            
            const ejerciciosBase = window.ejerciciosDB[categoria][equipo] || window.ejerciciosDB[categoria].cuerpo;
            if (!ejerciciosBase || ejerciciosBase.length === 0) {
                console.warn(`Ejercicios no encontrados para ${categoria}/${equipo}`);
                return;
            }
            
            // Personalizar según sexo y objetivo
            const ejercicios = this.personalizarEjercicios(ejerciciosBase, sexo, musculo, objetivo);
            
            html += `<h4 style="margin-top:10px; color:var(--primary);">${this.getNombreMusculo(musculo)}</h4>`;
            
            // Mostrar 3 ejercicios por músculo
            const startIdx = this.contador % ejercicios.length;
            for (let i = 0; i < 3; i++) {
                const e = ejercicios[(startIdx + i) % ejercicios.length];
                html += `
                    <div class="ejercicio-item">
                        <div class="ejercicio-nombre">${e.nombre}</div>
                        <div class="ejercicio-detalle">🔹 ${e.series} | Descanso: ${e.descanso}</div>
                        <div class="ejercicio-consejo">💡 ${e.consejo}</div>
                    </div>
                `;
            }
        });
        
        document.getElementById('workoutResult').innerHTML = html;
    },

    generarPlanPorMusculo: function(musculo) {
        if (!window.auth || !window.auth.usuarioActual || !window.auth.usuarioActual.datos) {
            document.getElementById('workoutResult').innerHTML = '<p>Error: Datos de usuario no disponibles</p>';
            return;
        }
        
        const datos = window.auth.usuarioActual.datos;
        const sexo = datos.sexo || 'hombre';
        const nivel = datos.nivel || 'intermedio';
        const objetivo = datos.objetivo || 'hipertrofia';
        const equipo = datos.equipo || 'cuerpo';
        
        const sexoEmoji = this.getSexoEmoji(sexo);
        const nivelEmoji = this.getNivelEmoji(nivel);
        const objetivoEmoji = this.getObjetivoEmoji(objetivo);
        const objetivoTexto = this.getObjetivoTexto(objetivo);
        const equipoEmoji = this.getEquipoEmoji(equipo);
        const equipoTexto = this.getEquipoTexto(equipo);
        
        const categoria = this.getCategoriaFromMusculo(musculo);
        
        if (!window.ejerciciosDB || !window.ejerciciosDB[categoria]) {
            document.getElementById('workoutResult').innerHTML = `<p>Ejercicios no disponibles para ${musculo}</p>`;
            return;
        }
        
        const ejerciciosBase = window.ejerciciosDB[categoria][equipo] || window.ejerciciosDB[categoria].cuerpo;
        if (!ejerciciosBase || ejerciciosBase.length === 0) {
            document.getElementById('workoutResult').innerHTML = `<p>No hay ejercicios disponibles para ${musculo} con equipo ${equipo}</p>`;
            return;
        }
        
        // Personalizar según sexo y objetivo
        const ejercicios = this.personalizarEjercicios(ejerciciosBase, sexo, musculo, objetivo);
        
        const startIdx = this.contador % ejercicios.length;
        let html = `<h3>🎯 Rutina para ${this.getNombreMusculo(musculo)}</h3>`;
        html += `<p>${sexoEmoji} <strong>${sexo === 'mujer' ? 'Mujer' : 'Hombre'}</strong> | ${nivelEmoji} <strong>Nivel:</strong> ${nivel} | ${equipoEmoji} <strong>Equipo:</strong> ${equipoTexto} | ${objetivoEmoji} <strong>Objetivo:</strong> ${objetivoTexto}</p>`;
        html += `<hr>`;
        
        for (let i = 0; i < 4; i++) {
            const e = ejercicios[(startIdx + i) % ejercicios.length];
            html += `
                <div class="ejercicio-item">
                    <div class="ejercicio-nombre">${e.nombre}</div>
                    <div class="ejercicio-detalle">🔹 ${e.series} | Descanso: ${e.descanso}</div>
                    <div class="ejercicio-consejo">💡 ${e.consejo}</div>
                </div>
            `;
        }
        
        document.getElementById('workoutResult').innerHTML = html;
    },

    seleccionarDia: function(dia) {
        if (!window.app) window.app = { diaSeleccionado: dia };
        else window.app.diaSeleccionado = dia;
        
        document.querySelectorAll('.dia-btn').forEach(btn => btn.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        
        if (document.getElementById('trainingTipoPlan').value === 'semanal') {
            this.generarPlanSemanalPorDia(dia);
        }
    }
};