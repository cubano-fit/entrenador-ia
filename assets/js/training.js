// assets/js/training.js - VERSIÓN PROFESIONAL CORREGIDA
window.training = {
    contador: 0,
    ultimosEjercicios: {}, // Para evitar repeticiones

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
        this.cargarUltimosEjercicios();
    },

    cargarUltimosEjercicios: function() {
        const guardado = localStorage.getItem('ultimos_ejercicios');
        if (guardado) {
            this.ultimosEjercicios = JSON.parse(guardado);
        }
    },

    guardarUltimosEjercicios: function() {
        localStorage.setItem('ultimos_ejercicios', JSON.stringify(this.ultimosEjercicios));
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

    getSexoEmoji: function(sexo) {
        return sexo === 'mujer' ? '👩' : '👨';
    },

    getObjetivoEmoji: function(objetivo) {
        const emojis = {
            'hipertrofia': '💪',
            'definicion': '✨',
            'perder peso': '🔥'
        };
        return emojis[objetivo] || '💪';
    },

    getObjetivoTexto: function(objetivo) {
        const textos = {
            'hipertrofia': 'Hipertrofia (ganar músculo)',
            'definicion': 'Definición (marcar músculo)',
            'perder peso': 'Perder peso'
        };
        return textos[objetivo] || objetivo;
    },

    getEquipoEmoji: function(equipo) {
        const emojis = {
            'cuerpo': '🏠',
            'mancuernas': '💪',
            'gym': '🏋️'
        };
        return emojis[equipo] || '🏋️';
    },

    getEquipoTexto: function(equipo) {
        const textos = {
            'cuerpo': 'cuerpo',
            'mancuernas': 'mancuernas',
            'gym': 'gym'
        };
        return textos[equipo] || equipo;
    },

    getNivelEmoji: function(nivel) {
        const emojis = {
            'principiante': '🟢',
            'intermedio': '🟡',
            'avanzado': '🔴'
        };
        return emojis[nivel] || '🟡';
    },

    getSeriesRepsPorObjetivo: function(objetivo, nivel) {
        if (nivel === 'avanzado' && objetivo === 'hipertrofia') {
            return { series: 4, reps: '8-10', descanso: '90 seg' };
        } else if (nivel === 'intermedio' && objetivo === 'hipertrofia') {
            return { series: 3, reps: '10-12', descanso: '75 seg' };
        } else if (objetivo === 'definicion') {
            return { series: 4, reps: '12-15', descanso: '45 seg' };
        } else if (objetivo === 'perder peso') {
            return { series: 4, reps: '15-20', descanso: '30 seg' };
        } else {
            return { series: 3, reps: '10-12', descanso: '60 seg' };
        }
    },

    getCategoriaFromMusculo: function(musculo) {
        return musculo; // Simplificado, ya tenemos categorías directas
    },

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

    // ============================================
    // BASE DE DATOS DE EJERCICIOS POR MÚSCULO
    // ============================================

    ejerciciosDB: {
        pecho: [
            { nombre: 'Press banca con barra', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Barra a la altura pezones, no rebotes' },
            { nombre: 'Press banca inclinado con barra', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Banco 30°, para pecho superior' },
            { nombre: 'Press banca declinado', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Banco -15°, para pecho inferior' },
            { nombre: 'Press con mancuernas', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Baja controlado, sube explosivo' },
            { nombre: 'Press inclinado con mancuernas', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Para pecho superior' },
            { nombre: 'Aperturas con mancuernas', seriesBase: 3, repsBase: '12-15', descansoBase: '60 seg', consejo: 'Brazos ligeramente flexionados' },
            { nombre: 'Aperturas en polea alta', seriesBase: 3, repsBase: '12-15', descansoBase: '60 seg', consejo: 'Cruza brazos frente al cuerpo' },
            { nombre: 'Crossover en polea', seriesBase: 3, repsBase: '12-15', descansoBase: '60 seg', consejo: 'Para pecho interno' },
            { nombre: 'Fondos en paralelas', seriesBase: 3, repsBase: '10-12', descansoBase: '90 seg', consejo: 'Inclínate adelante para pecho' },
            { nombre: 'Press en máquina', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Controla el movimiento' },
            { nombre: 'Pull-over con mancuerna', seriesBase: 3, repsBase: '12-15', descansoBase: '60 seg', consejo: 'Para serrato y pecho' },
            { nombre: 'Contractor en máquina', seriesBase: 3, repsBase: '12-15', descansoBase: '60 seg', consejo: 'Aprieta al final' }
        ],
        dorsales: [
            { nombre: 'Dominadas con agarre abierto', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Para dorsal ancho' },
            { nombre: 'Dominadas con agarre supino', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Palmas hacia ti, más bíceps' },
            { nombre: 'Remo con barra', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Inclinado, lleva barra al pecho' },
            { nombre: 'Remo en T', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Para grosor de espalda' },
            { nombre: 'Jalón al pecho', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'En polea alta' },
            { nombre: 'Remo con mancuerna a 1 mano', seriesBase: 4, repsBase: '8-10', descansoBase: '60 seg', consejo: 'Apoya rodilla en banco' },
            { nombre: 'Remo en polea baja', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Con agarre V' },
            { nombre: 'Pull-over en polea', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Con cuerda' },
            { nombre: 'Peso muerto', seriesBase: 4, repsBase: '6-8', descansoBase: '120 seg', consejo: 'Espalda recta siempre' },
            { nombre: 'Hiperextensiones', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Para espalda baja' },
            { nombre: 'Remo invertido', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'En barra baja' }
        ],
        trapecios: [
            { nombre: 'Encogimientos con barra', seriesBase: 4, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Sube hombros' },
            { nombre: 'Encogimientos con mancuernas', seriesBase: 4, repsBase: '12-15', descansoBase: '45 seg', consejo: 'A los lados' },
            { nombre: 'Remo al mentón', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Lleva barra a la barbilla' },
            { nombre: 'Face pull', seriesBase: 3, repsBase: '15-20', descansoBase: '45 seg', consejo: 'En polea, lleva a la cara' },
            { nombre: 'Pájaros con mancuernas', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Para deltoides posterior y trapecios' }
        ],
        romboides: [
            { nombre: 'Pájaros con mancuernas', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Inclinado, abre brazos' },
            { nombre: 'Remo con mancuerna cerrado', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Junta omóplatos' },
            { nombre: 'Face pull', seriesBase: 3, repsBase: '15-20', descansoBase: '45 seg', consejo: 'Excelente para romboides' },
            { nombre: 'Remo en polea cerrado', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Con agarre cerrado' }
        ],
        deltoides: [
            { nombre: 'Press militar con barra', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Barra al frente' },
            { nombre: 'Press militar con mancuernas', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Sentado' },
            { nombre: 'Elevaciones laterales', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Sube hasta altura hombros' },
            { nombre: 'Elevaciones frontales', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Con barra o mancuerna' },
            { nombre: 'Pájaros para deltoides posterior', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Inclinado, abre brazos' },
            { nombre: 'Face pull', seriesBase: 3, repsBase: '15-20', descansoBase: '45 seg', consejo: 'En polea, lleva a la cara' },
            { nombre: 'Press Arnold', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Rotación de muñecas' },
            { nombre: 'Elevaciones laterales en polea', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Controla la bajada' },
            { nombre: 'Remo al mentón', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Lleva barra a la barbilla' }
        ],
        biceps: [
            { nombre: 'Curl con barra Z', seriesBase: 4, repsBase: '8-10', descansoBase: '60 seg', consejo: 'Menos tensión muñecas' },
            { nombre: 'Curl con mancuernas alterno', seriesBase: 4, repsBase: '8-10', descansoBase: '60 seg', consejo: 'Alterna brazos' },
            { nombre: 'Curl inclinado con mancuernas', seriesBase: 4, repsBase: '8-10', descansoBase: '60 seg', consejo: 'Estiramiento máximo' },
            { nombre: 'Curl martillo', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Palmas enfrentadas' },
            { nombre: 'Curl concentrado', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Apoya brazo en pierna' },
            { nombre: 'Curl en predicador', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Aísla el bíceps' },
            { nombre: 'Curl en polea baja', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Con cuerda' },
            { nombre: 'Curl 21', seriesBase: 3, repsBase: '21', descansoBase: '60 seg', consejo: '7 abajo, 7 arriba, 7 completas' }
        ],
        triceps: [
            { nombre: 'Press francés con barra Z', seriesBase: 4, repsBase: '8-10', descansoBase: '60 seg', consejo: 'Acostado' },
            { nombre: 'Extensiones en polea con cuerda', seriesBase: 4, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Codos fijos' },
            { nombre: 'Fondos en paralelas', seriesBase: 4, repsBase: '8-10', descansoBase: '60 seg', consejo: 'Recto para tríceps' },
            { nombre: 'Press banca agarre cerrado', seriesBase: 4, repsBase: '8-10', descansoBase: '60 seg', consejo: 'Manos juntas' },
            { nombre: 'Extensiones con mancuerna a 1 mano', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Detrás de cabeza' },
            { nombre: 'Patada de tríceps', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Inclinado' },
            { nombre: 'Extensiones en polea invertidas', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Agarre prono' },
            { nombre: 'Extensiones en polea a 1 mano', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Mayor aislamiento' }
        ],
        braquial: [
            { nombre: 'Curl martillo', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Excelente para braquial' },
            { nombre: 'Curl con agarre prono', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Palmas abajo' },
            { nombre: 'Curl martillo en polea', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Con cuerda' }
        ],
        antebrazos: [
            { nombre: 'Curl de muñecas con barra', seriesBase: 4, repsBase: '15-20', descansoBase: '30 seg', consejo: 'Antebrazos sobre muslos' },
            { nombre: 'Extensiones de muñecas', seriesBase: 4, repsBase: '15-20', descansoBase: '30 seg', consejo: 'Palmas abajo' },
            { nombre: 'Curl invertido', seriesBase: 4, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Con barra, agarre prono' },
            { nombre: 'Agarrar disco', seriesBase: 3, repsBase: '30 seg', descansoBase: '45 seg', consejo: 'Sostén disco con pinza' },
            { nombre: 'Colgado en barra', seriesBase: 3, repsBase: '30-45 seg', descansoBase: '45 seg', consejo: 'Solo colgado' }
        ],
        cuadriceps: [
            { nombre: 'Sentadilla trasera con barra', seriesBase: 4, repsBase: '8-10', descansoBase: '120 seg', consejo: 'Barra sobre trampas' },
            { nombre: 'Sentadilla frontal', seriesBase: 4, repsBase: '8-10', descansoBase: '120 seg', consejo: 'Barra al frente' },
            { nombre: 'Prensa de piernas', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'No bloquees rodillas' },
            { nombre: 'Extensiones de cuádriceps', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Máquina' },
            { nombre: 'Hack squat', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Máquina' },
            { nombre: 'Sentadilla búlgara', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Con mancuernas' },
            { nombre: 'Zancadas con barra', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Alterna piernas' }
        ],
        femorales: [
            { nombre: 'Peso muerto', seriesBase: 4, repsBase: '6-8', descansoBase: '120 seg', consejo: 'Excelente para femorales' },
            { nombre: 'Peso muerto rumano', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Piernas casi rectas' },
            { nombre: 'Curl de isquiotibiales acostado', seriesBase: 4, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Máquina' },
            { nombre: 'Curl de isquiotibiales sentado', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Máquina' },
            { nombre: 'Buenos días con barra', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Barra sobre hombros' },
            { nombre: 'Peso muerto a una pierna', seriesBase: 3, repsBase: '10-12', descansoBase: '45 seg', consejo: 'Con mancuerna' }
        ],
        gluteos: [
            { nombre: 'Hip thrust con barra', seriesBase: 4, repsBase: '10-12', descansoBase: '90 seg', consejo: 'Mejor para glúteos' },
            { nombre: 'Peso muerto rumano', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Enfoque en glúteos' },
            { nombre: 'Sentadilla profunda', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Baja mucho' },
            { nombre: 'Prensa de piernas alto', seriesBase: 4, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Pies arriba' },
            { nombre: 'Abducción en máquina', seriesBase: 3, repsBase: '15-20', descansoBase: '30 seg', consejo: 'Para glúteo medio' },
            { nombre: 'Patada de glúteo en polea', seriesBase: 3, repsBase: '12-15', descansoBase: '30 seg', consejo: 'Con tobillera' },
            { nombre: 'Puente a una pierna', seriesBase: 3, repsBase: '12-15', descansoBase: '30 seg', consejo: 'Con peso' }
        ],
        aductores: [
            { nombre: 'Aductores en máquina', seriesBase: 4, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Máquina de aductores' },
            { nombre: 'Sentadilla sumo con barra', seriesBase: 4, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Piernas abiertas' },
            { nombre: 'Zancadas laterales', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Alterna' },
            { nombre: 'Juntar piernas en polea', seriesBase: 3, repsBase: '15-20', descansoBase: '45 seg', consejo: 'Con tobillera' }
        ],
        abductores: [
            { nombre: 'Abductores en máquina', seriesBase: 4, repsBase: '15-20', descansoBase: '45 seg', consejo: 'Máquina de abductores' },
            { nombre: 'Concha', seriesBase: 3, repsBase: '15-20', descansoBase: '30 seg', consejo: 'De lado, abre piernas' },
            { nombre: 'Plancha lateral con abducción', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Eleva pierna arriba' }
        ],
        gemelos: [
            { nombre: 'Elevaciones de talones de pie', seriesBase: 4, repsBase: '15-20', descansoBase: '30 seg', consejo: 'En máquina' },
            { nombre: 'Elevaciones de talones sentado', seriesBase: 4, repsBase: '15-20', descansoBase: '30 seg', consejo: 'Para sóleo' },
            { nombre: 'Elevaciones en prensa', seriesBase: 4, repsBase: '15-20', descansoBase: '30 seg', consejo: 'En prensa de piernas' },
            { nombre: 'Paseo de granjero de puntillas', seriesBase: 3, repsBase: '30 seg', descansoBase: '45 seg', consejo: 'Con mancuernas' }
        ],
        abdominales: [
            { nombre: 'Crunch en máquina', seriesBase: 3, repsBase: '12-15', descansoBase: '30 seg', consejo: 'Control' },
            { nombre: 'Elevaciones de piernas colgado', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Sin balanceo' },
            { nombre: 'Plancha con peso', seriesBase: 3, repsBase: '45 seg', descansoBase: '45 seg', consejo: 'Disco en espalda' },
            { nombre: 'Russian twists con disco', seriesBase: 3, repsBase: '15-20', descansoBase: '30 seg', consejo: 'Gira torso' },
            { nombre: 'Bicicleta', seriesBase: 3, repsBase: '20', descansoBase: '30 seg', consejo: 'Codo a rodilla' },
            { nombre: 'V-ups', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Piernas y brazos arriba' }
        ],
        oblicuos: [
            { nombre: 'Russian twists con disco', seriesBase: 4, repsBase: '15-20', descansoBase: '30 seg', consejo: 'Gira torso' },
            { nombre: 'Inclinaciones laterales con mancuerna', seriesBase: 4, repsBase: '12-15', descansoBase: '30 seg', consejo: 'Mancuerna en una mano' },
            { nombre: 'Plancha lateral', seriesBase: 3, repsBase: '30-45 seg', descansoBase: '45 seg', consejo: 'Cada lado' },
            { nombre: 'Crunch lateral en máquina', seriesBase: 3, repsBase: '12-15', descansoBase: '30 seg', consejo: 'Máquina' }
        ],
        transverso: [
            { nombre: 'Vacuums', seriesBase: 3, repsBase: '30-45 seg', descansoBase: '30 seg', consejo: 'Mete ombligo hacia adentro' },
            { nombre: 'Plancha', seriesBase: 3, repsBase: '45-60 seg', descansoBase: '45 seg', consejo: 'Activa transverso' },
            { nombre: 'Perro de pájaro', seriesBase: 3, repsBase: '12-15', descansoBase: '30 seg', consejo: 'Estabilidad' }
        ],
        lumbares: [
            { nombre: 'Hiperextensiones', seriesBase: 4, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Banco de hiperextensiones' },
            { nombre: 'Peso muerto', seriesBase: 4, repsBase: '8-10', descansoBase: '90 seg', consejo: 'Fortalece lumbares' },
            { nombre: 'Buenos días con barra', seriesBase: 3, repsBase: '10-12', descansoBase: '60 seg', consejo: 'Barra sobre hombros' },
            { nombre: 'Superman', seriesBase: 3, repsBase: '12-15', descansoBase: '45 seg', consejo: 'Sube brazos y piernas' }
        ]
    },

    // ============================================
    // RUTINAS SEMANALES COMPLETAS
    // ============================================

    rutinaPrincipiante: {
        'L': { 
            nombre: '🟢 LUNES - FULL BODY A', 
            musculos: ['pecho', 'dorsales', 'cuadriceps', 'deltoides', 'biceps', 'triceps'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.pecho[0],  // Press banca
                    entrenador.ejerciciosDB.dorsales[2], // Remo con barra
                    entrenador.ejerciciosDB.cuadriceps[0], // Sentadilla
                    entrenador.ejerciciosDB.deltoides[0], // Press militar
                    entrenador.ejerciciosDB.biceps[0], // Curl barra
                    entrenador.ejerciciosDB.triceps[1] // Extensiones polea
                ];
            }
        },
        'M': { 
            nombre: '🟢 MARTES - DESCANSO ACTIVO', 
            musculos: [],
            getEjercicios: function() { return []; }
        },
        'X': { 
            nombre: '🟢 MIÉRCOLES - FULL BODY B', 
            musculos: ['pecho', 'dorsales', 'femorales', 'deltoides', 'biceps', 'triceps'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.pecho[1], // Press inclinado
                    entrenador.ejerciciosDB.dorsales[5], // Remo 1 mano
                    entrenador.ejerciciosDB.femorales[1], // Peso muerto rumano
                    entrenador.ejerciciosDB.deltoides[2], // Elevaciones laterales
                    entrenador.ejerciciosDB.biceps[3], // Curl martillo
                    entrenador.ejerciciosDB.triceps[4] // Extensiones 1 mano
                ];
            }
        },
        'J': { 
            nombre: '🟢 JUEVES - DESCANSO', 
            musculos: [],
            getEjercicios: function() { return []; }
        },
        'V': { 
            nombre: '🟢 VIERNES - FULL BODY C', 
            musculos: ['pecho', 'dorsales', 'gluteos', 'deltoides', 'abdominales', 'gemelos'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.pecho[8], // Fondos
                    entrenador.ejerciciosDB.dorsales[8], // Peso muerto
                    entrenador.ejerciciosDB.gluteos[0], // Hip thrust
                    entrenador.ejerciciosDB.deltoides[4], // Pájaros
                    entrenador.ejerciciosDB.abdominales[1], // Elevaciones piernas
                    entrenador.ejerciciosDB.gemelos[0] // Elevaciones talones
                ];
            }
        },
        'S': { 
            nombre: '🟢 SÁBADO - CARDIO SUAVE', 
            musculos: [],
            getEjercicios: function() { return []; }
        },
        'D': { 
            nombre: '🟢 DOMINGO - DESCANSO TOTAL', 
            musculos: [],
            getEjercicios: function() { return []; }
        }
    },

    rutinaIntermedio: {
        'L': { 
            nombre: '🟡 LUNES - UPPER A (Torso pesado)', 
            musculos: ['pecho', 'dorsales', 'deltoides', 'biceps', 'triceps'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.pecho[1], // Press inclinado
                    entrenador.ejerciciosDB.dorsales[3], // Remo en T
                    entrenador.ejerciciosDB.deltoides[0], // Press militar
                    entrenador.ejerciciosDB.pecho[5], // Aperturas
                    entrenador.ejerciciosDB.dorsales[6], // Remo polea baja
                    entrenador.ejerciciosDB.biceps[0], // Curl barra
                    entrenador.ejerciciosDB.triceps[1] // Extensiones polea
                ];
            }
        },
        'M': { 
            nombre: '🟡 MARTES - LOWER A (Piernas pesadas)', 
            musculos: ['cuadriceps', 'femorales', 'gluteos', 'gemelos'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.cuadriceps[0], // Sentadilla
                    entrenador.ejerciciosDB.femorales[1], // Peso muerto rumano
                    entrenador.ejerciciosDB.cuadriceps[2], // Prensa
                    entrenador.ejerciciosDB.femorales[2], // Curl femoral
                    entrenador.ejerciciosDB.gluteos[0], // Hip thrust
                    entrenador.ejerciciosDB.gemelos[0] // Elevaciones talones
                ];
            }
        },
        'X': { 
            nombre: '🟡 MIÉRCOLES - DESCANSO ACTIVO', 
            musculos: [],
            getEjercicios: function() { return []; }
        },
        'J': { 
            nombre: '🟡 JUEVES - UPPER B (Torso volumen)', 
            musculos: ['pecho', 'dorsales', 'deltoides', 'biceps', 'triceps'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.pecho[0], // Press banca
                    entrenador.ejerciciosDB.dorsales[2], // Remo barra
                    entrenador.ejerciciosDB.deltoides[1], // Press mancuernas
                    entrenador.ejerciciosDB.dorsales[4], // Jalón
                    entrenador.ejerciciosDB.deltoides[2], // Elevaciones laterales
                    entrenador.ejerciciosDB.biceps[2], // Curl inclinado
                    entrenador.ejerciciosDB.triceps[0] // Press francés
                ];
            }
        },
        'V': { 
            nombre: '🟡 VIERNES - LOWER B (Piernas volumen)', 
            musculos: ['cuadriceps', 'femorales', 'gluteos', 'aductores'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.femorales[0], // Peso muerto
                    entrenador.ejerciciosDB.cuadriceps[5], // Sentadilla búlgara
                    entrenador.ejerciciosDB.cuadriceps[3], // Extensiones
                    entrenador.ejerciciosDB.femorales[3], // Curl sentado
                    entrenador.ejerciciosDB.aductores[0], // Aductores máquina
                    entrenador.ejerciciosDB.gemelos[1] // Elevaciones sentado
                ];
            }
        },
        'S': { 
            nombre: '🟡 SÁBADO - CARDIO O CORE', 
            musculos: ['abdominales', 'oblicuos'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.abdominales[2], // Plancha peso
                    entrenador.ejerciciosDB.abdominales[0], // Crunch máquina
                    entrenador.ejerciciosDB.abdominales[1], // Elevaciones piernas
                    entrenador.ejerciciosDB.oblicuos[0] // Russian twists
                ];
            }
        },
        'D': { 
            nombre: '🟡 DOMINGO - DESCANSO', 
            musculos: [],
            getEjercicios: function() { return []; }
        }
    },

    rutinaAvanzado: {
        'L': { 
            nombre: '🔴 LUNES - PUSH A (Pecho, Hombros, Tríceps)', 
            musculos: ['pecho', 'deltoides', 'triceps'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.pecho[1], // Press inclinado
                    entrenador.ejerciciosDB.pecho[0], // Press banca
                    entrenador.ejerciciosDB.deltoides[0], // Press militar
                    entrenador.ejerciciosDB.pecho[6], // Aperturas polea
                    entrenador.ejerciciosDB.deltoides[2], // Elevaciones laterales
                    entrenador.ejerciciosDB.triceps[2], // Fondos
                    entrenador.ejerciciosDB.triceps[1] // Extensiones polea
                ];
            }
        },
        'M': { 
            nombre: '🔴 MARTES - PULL A (Espalda, Bíceps)', 
            musculos: ['dorsales', 'trapecios', 'romboides', 'biceps'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.femorales[0], // Peso muerto
                    entrenador.ejerciciosDB.dorsales[0], // Dominadas
                    entrenador.ejerciciosDB.dorsales[3], // Remo en T
                    entrenador.ejerciciosDB.dorsales[4], // Jalón
                    entrenador.ejerciciosDB.dorsales[5], // Remo 1 mano
                    entrenador.ejerciciosDB.biceps[0], // Curl barra
                    entrenador.ejerciciosDB.biceps[3] // Curl martillo
                ];
            }
        },
        'X': { 
            nombre: '🔴 MIÉRCOLES - LEGS A (Piernas pesadas)', 
            musculos: ['cuadriceps', 'femorales', 'gluteos', 'gemelos'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.cuadriceps[0], // Sentadilla
                    entrenador.ejerciciosDB.femorales[1], // Peso muerto rumano
                    entrenador.ejerciciosDB.cuadriceps[2], // Prensa
                    entrenador.ejerciciosDB.femorales[2], // Curl femoral
                    entrenador.ejerciciosDB.gluteos[0], // Hip thrust
                    entrenador.ejerciciosDB.cuadriceps[3], // Extensiones
                    entrenador.ejerciciosDB.gemelos[0] // Elevaciones talones
                ];
            }
        },
        'J': { 
            nombre: '🔴 JUEVES - PUSH B (Pecho, Hombros, Tríceps)', 
            musculos: ['pecho', 'deltoides', 'triceps'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.pecho[2], // Press declinado
                    entrenador.ejerciciosDB.pecho[3], // Press mancuernas
                    entrenador.ejerciciosDB.deltoides[1], // Press mancuernas
                    entrenador.ejerciciosDB.pecho[7], // Crossover
                    entrenador.ejerciciosDB.deltoides[3], // Elevaciones frontales
                    entrenador.ejerciciosDB.triceps[4], // Extensiones 1 mano
                    entrenador.ejerciciosDB.triceps[0] // Press francés
                ];
            }
        },
        'V': { 
            nombre: '🔴 VIERNES - PULL B (Espalda, Bíceps)', 
            musculos: ['dorsales', 'trapecios', 'romboides', 'biceps'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.dorsales[2], // Remo barra
                    entrenador.ejerciciosDB.dorsales[1], // Dominadas supinas
                    entrenador.ejerciciosDB.dorsales[7], // Pull-over
                    entrenador.ejerciciosDB.romboides[1], // Remo cerrado
                    entrenador.ejerciciosDB.trapecios[0], // Encogimientos
                    entrenador.ejerciciosDB.biceps[5], // Curl predicador
                    entrenador.ejerciciosDB.biceps[4] // Curl concentrado
                ];
            }
        },
        'S': { 
            nombre: '🔴 SÁBADO - LEGS B (Piernas volumen)', 
            musculos: ['cuadriceps', 'femorales', 'gluteos', 'abductores', 'aductores'],
            getEjercicios: function(entrenador, nivel, objetivo, sexo) {
                return [
                    entrenador.ejerciciosDB.cuadriceps[1], // Sentadilla frontal
                    entrenador.ejerciciosDB.femorales[0], // Peso muerto
                    entrenador.ejerciciosDB.cuadriceps[5], // Sentadilla búlgara
                    entrenador.ejerciciosDB.femorales[3], // Curl sentado
                    entrenador.ejerciciosDB.abductores[0], // Abductores máquina
                    entrenador.ejerciciosDB.aductores[0], // Aductores máquina
                    entrenador.ejerciciosDB.gemelos[1] // Elevaciones sentado
                ];
            }
        },
        'D': { 
            nombre: '🔴 DOMINGO - DESCANSO', 
            musculos: [],
            getEjercicios: function() { return []; }
        }
    },

    // ============================================
    // GENERAR PLAN SEMANAL
    // ============================================

    generarPlanSemanal: function(dia, datos) {
        const nivel = datos.nivel || 'intermedio';
        const objetivo = datos.objetivo || 'hipertrofia';
        const sexo = datos.sexo || 'hombre';
        
        // Seleccionar rutina según nivel
        let rutina;
        if (nivel === 'principiante') rutina = this.rutinaPrincipiante;
        else if (nivel === 'avanzado') rutina = this.rutinaAvanzado;
        else rutina = this.rutinaIntermedio;
        
        const diaInfo = rutina[dia];
        
        if (!diaInfo) {
            document.getElementById('workoutResult').innerHTML = `<h3>Día no válido</h3>`;
            return;
        }
        
        // Si no hay ejercicios, mostrar mensaje de descanso
        if (diaInfo.musculos.length === 0) {
            document.getElementById('workoutResult').innerHTML = `
                <div style="background:var(--card); border-radius:16px; padding:25px; text-align:center;">
                    <span style="font-size:3em; margin-bottom:15px; display:block;">😴</span>
                    <h3 style="color:var(--primary);">${diaInfo.nombre}</h3>
                    <p style="color:var(--text-secondary); margin-top:10px;">Aprovecha para descansar y recuperarte. ¡El crecimiento ocurre cuando descansas!</p>
                </div>
            `;
            return;
        }
        
        // Obtener ejercicios
        const ejercicios = diaInfo.getEjercicios(this, nivel, objetivo, sexo);
        
        // Ajustar series según objetivo
        const params = this.getSeriesRepsPorObjetivo(objetivo, nivel);
        
        let html = `
            <div style="background:linear-gradient(135deg, var(--primary)20, var(--bg)); border-radius:16px; padding:20px; margin-bottom:20px;">
                <h3 style="color:var(--primary); margin-bottom:10px;">${diaInfo.nombre}</h3>
                <div style="display:flex; flex-wrap:wrap; gap:15px; font-size:0.9em;">
                    <span>${this.getSexoEmoji(sexo)} ${sexo === 'mujer' ? 'Mujer' : 'Hombre'}</span>
                    <span>${this.getNivelEmoji(nivel)} Nivel: ${nivel}</span>
                    <span>${this.getObjetivoEmoji(objetivo)} Objetivo: ${this.getObjetivoTexto(objetivo)}</span>
                </div>
            </div>
            <div style="margin-bottom:15px; padding:10px; background:var(--hover); border-radius:10px;">
                <p style="margin:0; font-size:0.95em;">🎯 <strong>Protocolo:</strong> ${params.series} series de ${params.reps} repeticiones, descanso ${params.descanso}</p>
            </div>
        `;
        
        ejercicios.forEach((ej, index) => {
            // Personalizar consejo por sexo si es necesario
            let consejo = ej.consejo;
            if (sexo === 'mujer' && (diaInfo.musculos.includes('gluteos') || diaInfo.musculos.includes('femorales'))) {
                consejo = "Enfoque en glúteos, siente la contracción en cada rep. Realiza el movimiento controlado.";
            } else if (sexo === 'mujer' && diaInfo.musculos.includes('abdominales')) {
                consejo = "Para abdomen definido, controla el movimiento y concéntrate en la contracción.";
            }
            
            html += `
                <div style="background:var(--card); border-radius:12px; padding:15px; margin-bottom:12px; border-left:4px solid var(--primary);">
                    <div style="font-weight:bold; font-size:1.1em; margin-bottom:8px;">${index+1}. ${ej.nombre}</div>
                    <div style="display:flex; gap:15px; margin-bottom:8px; flex-wrap:wrap;">
                        <span style="background:var(--hover); padding:3px 10px; border-radius:20px;">🔹 ${params.series} x ${params.reps}</span>
                        <span style="background:var(--hover); padding:3px 10px; border-radius:20px;">⏱️ ${params.descanso}</span>
                    </div>
                    <div style="color:var(--text-secondary); font-size:0.9em; background:var(--bg); padding:10px; border-radius:8px; margin-top:5px;">
                        💡 ${consejo}
                    </div>
                </div>
            `;
        });
        
        document.getElementById('workoutResult').innerHTML = html;
    },

    // ============================================
    // GENERAR PLAN POR MÚSCULO
    // ============================================

    generarPlanPorMusculo: function(musculo, datos) {
        const nivel = datos.nivel || 'intermedio';
        const objetivo = datos.objetivo || 'hipertrofia';
        const sexo = datos.sexo || 'hombre';
        
        // Verificar que el músculo existe en la base de datos
        if (!this.ejerciciosDB[musculo]) {
            document.getElementById('workoutResult').innerHTML = `<p>No hay ejercicios disponibles para ${musculo}</p>`;
            return;
        }
        
        // Obtener todos los ejercicios para ese músculo
        const todosEjercicios = [...this.ejerciciosDB[musculo]];
        
        // Rotar para no repetir los mismos siempre
        const startIdx = (this.contador * 3) % todosEjercicios.length;
        
        // Seleccionar 5-6 ejercicios diferentes (dependiendo del músculo)
        const numEjercicios = Math.min(6, todosEjercicios.length);
        const seleccionados = [];
        
        for (let i = 0; i < numEjercicios; i++) {
            const idx = (startIdx + i) % todosEjercicios.length;
            seleccionados.push(todosEjercicios[idx]);
        }
        
        // Ajustar series según objetivo
        const params = this.getSeriesRepsPorObjetivo(objetivo, nivel);
        
        let html = `
            <div style="background:linear-gradient(135deg, var(--primary)20, var(--bg)); border-radius:16px; padding:20px; margin-bottom:20px;">
                <h3 style="color:var(--primary); margin-bottom:10px;">🎯 RUTINA PARA ${this.getNombreMusculo(musculo).toUpperCase()}</h3>
                <div style="display:flex; flex-wrap:wrap; gap:15px; font-size:0.9em;">
                    <span>${this.getSexoEmoji(sexo)} ${sexo === 'mujer' ? 'Mujer' : 'Hombre'}</span>
                    <span>${this.getNivelEmoji(nivel)} Nivel: ${nivel}</span>
                    <span>${this.getObjetivoEmoji(objetivo)} Objetivo: ${this.getObjetivoTexto(objetivo)}</span>
                </div>
            </div>
            <div style="margin-bottom:15px; padding:10px; background:var(--hover); border-radius:10px;">
                <p style="margin:0; font-size:0.95em;">🎯 <strong>Protocolo:</strong> ${params.series} series de ${params.reps} repeticiones, descanso ${params.descanso}</p>
            </div>
        `;
        
        seleccionados.forEach((ej, index) => {
            // Personalizar consejo por sexo
            let consejo = ej.consejo;
            if (sexo === 'mujer' && (musculo === 'gluteos' || musculo === 'femorales')) {
                consejo = "Enfoque en glúteos, siente la contracción en cada rep. Realiza el movimiento controlado.";
            } else if (sexo === 'mujer' && musculo === 'abdominales') {
                consejo = "Para abdomen definido, controla el movimiento y concéntrate en la contracción.";
            }
            
            html += `
                <div style="background:var(--card); border-radius:12px; padding:15px; margin-bottom:12px; border-left:4px solid var(--primary);">
                    <div style="font-weight:bold; font-size:1.1em; margin-bottom:8px;">${index+1}. ${ej.nombre}</div>
                    <div style="display:flex; gap:15px; margin-bottom:8px; flex-wrap:wrap;">
                        <span style="background:var(--hover); padding:3px 10px; border-radius:20px;">🔹 ${params.series} x ${params.reps}</span>
                        <span style="background:var(--hover); padding:3px 10px; border-radius:20px;">⏱️ ${params.descanso}</span>
                    </div>
                    <div style="color:var(--text-secondary); font-size:0.9em; background:var(--bg); padding:10px; border-radius:8px; margin-top:5px;">
                        💡 ${consejo}
                    </div>
                </div>
            `;
        });
        
        // Incrementar contador para próxima vez
        this.contador++;
        
        document.getElementById('workoutResult').innerHTML = html;
    },

    generarPlan: function() {
        console.log('💪 Generando rutina...');
        
        const datos = this.obtenerDatosUsuario();
        if (!datos) {
            alert('❌ Completa tu perfil primero');
            return;
        }

        // Verificar equipo
        if (datos.equipo !== 'gym') {
            alert('⚠️ Esta versión está optimizada para GIMNASIO COMPLETO. Selecciona "gym" en tu perfil.');
            return;
        }
        
        const tipo = document.getElementById('trainingTipoPlan').value;
        
        if (tipo === 'semanal') {
            const dia = window.app ? window.app.diaSeleccionado || 'L' : 'L';
            this.generarPlanSemanal(dia, datos);
        } else {
            const musculo = document.getElementById('trainingMusculo').value;
            if (!musculo) {
                alert('Selecciona un músculo');
                return;
            }
            this.generarPlanPorMusculo(musculo, datos);
        }
    },

    seleccionarDia: function(dia) {
        if (!window.app) window.app = { diaSeleccionado: dia };
        else window.app.diaSeleccionado = dia;
        
        document.querySelectorAll('.dia-btn').forEach(btn => btn.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        
        if (document.getElementById('trainingTipoPlan').value === 'semanal') {
            const datos = this.obtenerDatosUsuario();
            if (datos) {
                this.generarPlanSemanal(dia, datos);
            }
        }
    }
};

console.log('✅ training.js - Versión Profesional Corregida');
