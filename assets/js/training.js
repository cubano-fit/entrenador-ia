// assets/js/training.js - VERSIÓN PROFESIONAL COMPLETA
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
        // Ajuste fino por nivel y objetivo
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
        const categoriasValidas = [
            'pecho', 'dorsales', 'trapecios', 'romboides', 'deltoides',
            'biceps', 'triceps', 'braquial', 'antebrazos',
            'cuadriceps', 'femorales', 'gluteos', 'aductores', 'abductores', 'gemelos',
            'abdominales', 'oblicuos', 'transverso', 'lumbares'
        ];
        
        if (categoriasValidas.includes(musculo)) {
            return musculo;
        }
        return 'pecho';
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
    // RUTINAS PROFESIONALES POR NIVEL
    // ============================================

    obtenerRutinaSemanal: function(nivel, objetivo, sexo) {
        // PLANTILLAS DE RUTINAS PROFESIONALES
        
        // RUTINA PRINCIPIANTE (3 días Full Body)
        const principiante = {
            'L': {
                nombre: '🟢 LUNES - FULL BODY A',
                musculos: ['pecho', 'dorsales', 'cuadriceps', 'hombros', 'brazos'],
                ejercicios: [
                    { nombre: 'Press de banca con barra', musculo: 'pecho', series: 3, reps: '10-12', notas: 'Enfoque en técnica, codos a 45°' },
                    { nombre: 'Remo con barra', musculo: 'dorsales', series: 3, reps: '10-12', notas: 'Espalda recta, lleva barra al pecho' },
                    { nombre: 'Sentadilla con barra', musculo: 'cuadriceps', series: 3, reps: '10-12', notas: 'Baja hasta paralelo, espalda recta' },
                    { nombre: 'Press militar con mancuernas', musculo: 'deltoides', series: 3, reps: '10-12', notas: 'Sin arquear la espalda' },
                    { nombre: 'Curl de bíceps con barra', musculo: 'biceps', series: 2, reps: '12-15', notas: 'Sin balancear el cuerpo' },
                    { nombre: 'Extensiones de tríceps en polea', musculo: 'triceps', series: 2, reps: '12-15', notas: 'Codos pegados al cuerpo' }
                ]
            },
            'M': {
                nombre: '🟢 MARTES - DESCANSO',
                musculos: [],
                ejercicios: []
            },
            'X': {
                nombre: '🟢 MIÉRCOLES - FULL BODY B',
                musculos: ['pecho', 'dorsales', 'femorales', 'hombros', 'brazos'],
                ejercicios: [
                    { nombre: 'Press banca inclinado con mancuernas', musculo: 'pecho', series: 3, reps: '10-12', notas: 'Banco a 30°, para pecho superior' },
                    { nombre: 'Dominadas asistidas o jalón al pecho', musculo: 'dorsales', series: 3, reps: '10-12', notas: 'Agarre abierto, lleva al pecho' },
                    { nombre: 'Peso muerto rumano', musculo: 'femorales', series: 3, reps: '10-12', notas: 'Espalda recta, empuja cadera atrás' },
                    { nombre: 'Elevaciones laterales', musculo: 'deltoides', series: 3, reps: '12-15', notas: 'Peso moderado, control' },
                    { nombre: 'Curl martillo', musculo: 'biceps', series: 2, reps: '12-15', notas: 'Palmas enfrentadas' },
                    { nombre: 'Fondos en banco', musculo: 'triceps', series: 2, reps: '12-15', notas: 'Manos en banco, pies en suelo' }
                ]
            },
            'J': {
                nombre: '🟢 JUEVES - DESCANSO',
                musculos: [],
                ejercicios: []
            },
            'V': {
                nombre: '🟢 VIERNES - FULL BODY C',
                musculos: ['pecho', 'dorsales', 'gluteos', 'hombros', 'core'],
                ejercicios: [
                    { nombre: 'Press banca declinado', musculo: 'pecho', series: 3, reps: '10-12', notas: 'Para pecho inferior' },
                    { nombre: 'Remo con mancuerna a 1 mano', musculo: 'dorsales', series: 3, reps: '10-12', notas: 'Apoya rodilla en banco' },
                    { nombre: 'Hip thrust', musculo: 'gluteos', series: 3, reps: '12-15', notas: 'Sube cadera, contrae glúteos' },
                    { nombre: 'Pájaros para deltoides posterior', musculo: 'deltoides', series: 3, reps: '12-15', notas: 'Inclinado, abre brazos' },
                    { nombre: 'Plancha', musculo: 'abdominales', series: 3, reps: '30-45s', notas: 'Cuerpo recto' },
                    { nombre: 'Elevaciones de talones', musculo: 'gemelos', series: 3, reps: '15-20', notas: 'De pie, sube talones' }
                ]
            },
            'S': {
                nombre: '🟢 SÁBADO - CARDIO O DESCANSO',
                musculos: [],
                ejercicios: []
            },
            'D': {
                nombre: '🟢 DOMINGO - DESCANSO',
                musculos: [],
                ejercicios: []
            }
        };

        // RUTINA INTERMEDIO (4 días Upper/Lower)
        const intermedio = {
            'L': {
                nombre: '🟡 LUNES - UPPER A (Torso pesado)',
                musculos: ['pecho', 'dorsales', 'deltoides', 'biceps', 'triceps'],
                ejercicios: [
                    { nombre: 'Press banca inclinado con barra', musculo: 'pecho', series: 4, reps: '8-10', notas: 'Banco a 30°, 4 series pesadas' },
                    { nombre: 'Dominadas con peso o jalón al pecho', musculo: 'dorsales', series: 4, reps: '8-10', notas: 'Agarre supino (palmas hacia ti)' },
                    { nombre: 'Press militar con barra', musculo: 'deltoides', series: 3, reps: '10-12', notas: 'Sentado para mejor estabilidad' },
                    { nombre: 'Remo en T', musculo: 'dorsales', series: 3, reps: '10-12', notas: 'Para grosor de espalda' },
                    { nombre: 'Aperturas con mancuernas', musculo: 'pecho', series: 3, reps: '12-15', notas: 'Brazos ligeramente flexionados' },
                    { nombre: 'Curl con barra Z', musculo: 'biceps', series: 3, reps: '10-12', notas: 'Sin balanceo' },
                    { nombre: 'Extensiones de tríceps en polea', musculo: 'triceps', series: 3, reps: '10-12', notas: 'Con cuerda' }
                ]
            },
            'M': {
                nombre: '🟡 MARTES - LOWER A (Piernas)',
                musculos: ['cuadriceps', 'femorales', 'gluteos', 'gemelos'],
                ejercicios: [
                    { nombre: 'Sentadilla trasera con barra', musculo: 'cuadriceps', series: 4, reps: '8-10', notas: 'Profundidad completa' },
                    { nombre: 'Peso muerto rumano', musculo: 'femorales', series: 4, reps: '10-12', notas: 'Siente el estiramiento' },
                    { nombre: 'Prensa de piernas', musculo: 'cuadriceps', series: 3, reps: '12-15', notas: 'Pies anchos para glúteo' },
                    { nombre: 'Curl de isquiotibiales acostado', musculo: 'femorales', series: 3, reps: '12-15', notas: 'Control en negativa' },
                    { nombre: 'Hip thrust', musculo: 'gluteos', series: 3, reps: '12-15', notas: 'Barra sobre caderas' },
                    { nombre: 'Elevaciones de talones de pie', musculo: 'gemelos', series: 4, reps: '15-20', notas: 'En máquina o con barra' }
                ]
            },
            'X': {
                nombre: '🟡 MIÉRCOLES - DESCANSO',
                musculos: [],
                ejercicios: []
            },
            'J': {
                nombre: '🟡 JUEVES - UPPER B (Torso volumen)',
                musculos: ['pecho', 'dorsales', 'deltoides', 'biceps', 'triceps'],
                ejercicios: [
                    { nombre: 'Press banca plano con barra', musculo: 'pecho', series: 4, reps: '8-10', notas: 'Agarre medio' },
                    { nombre: 'Remo con barra', musculo: 'dorsales', series: 4, reps: '8-10', notas: 'Inclinado a 45°' },
                    { nombre: 'Press de hombros con mancuernas', musculo: 'deltoides', series: 3, reps: '10-12', notas: 'Sentado' },
                    { nombre: 'Jalón al pecho con agarre cerrado', musculo: 'dorsales', series: 3, reps: '12-15', notas: 'Para espalda media' },
                    { nombre: 'Elevaciones laterales', musculo: 'deltoides', series: 3, reps: '12-15', notas: 'Sin trampas' },
                    { nombre: 'Curl inclinado con mancuernas', musculo: 'biceps', series: 3, reps: '10-12', notas: 'Estiramiento completo' },
                    { nombre: 'Press francés con mancuerna', musculo: 'triceps', series: 3, reps: '10-12', notas: 'Acostado' }
                ]
            },
            'V': {
                nombre: '🟡 VIERNES - LOWER B (Piernas volumen)',
                musculos: ['cuadriceps', 'femorales', 'gluteos', 'abductores'],
                ejercicios: [
                    { nombre: 'Peso muerto', musculo: 'femorales', series: 4, reps: '6-8', notas: 'Técnica perfecta, espalda recta' },
                    { nombre: 'Sentadilla búlgara', musculo: 'cuadriceps', series: 3, reps: '10-12', notas: 'Por pierna, banco atrás' },
                    { nombre: 'Extensiones de cuádriceps', musculo: 'cuadriceps', series: 3, reps: '12-15', notas: 'Máquina' },
                    { nombre: 'Curl de isquiotibiales sentado', musculo: 'femorales', series: 3, reps: '12-15', notas: 'Máquina' },
                    { nombre: 'Abducción de cadera', musculo: 'abductores', series: 3, reps: '15-20', notas: 'Máquina o con liga' },
                    { nombre: 'Elevaciones de talones sentado', musculo: 'gemelos', series: 4, reps: '15-20', notas: 'Para sóleo' }
                ]
            },
            'S': {
                nombre: '🟡 SÁBADO - CARDIO O CORE',
                musculos: ['abdominales', 'oblicuos'],
                ejercicios: [
                    { nombre: 'Plancha', musculo: 'abdominales', series: 3, reps: '45-60s', notas: 'Abdomen contraído' },
                    { nombre: 'Crunch en máquina', musculo: 'abdominales', series: 3, reps: '15-20', notas: 'Control' },
                    { nombre: 'Elevaciones de piernas colgado', musculo: 'abdominales', series: 3, reps: '12-15', notas: 'Sin balanceo' },
                    { nombre: 'Russian twists con disco', musculo: 'oblicuos', series: 3, reps: '15-20', notas: 'Gira torso' }
                ]
            },
            'D': {
                nombre: '🟡 DOMINGO - DESCANSO',
                musculos: [],
                ejercicios: []
            }
        };

        // RUTINA AVANZADO (5 días Push/Pull/Legs)
        const avanzado = {
            'L': {
                nombre: '🔴 LUNES - PUSH A (Pecho, Hombros, Tríceps)',
                musculos: ['pecho', 'deltoides', 'triceps'],
                ejercicios: [
                    { nombre: 'Press banca inclinado con barra', musculo: 'pecho', series: 4, reps: '8-10', notas: 'Serie pesada, pecho superior' },
                    { nombre: 'Press banca plano con barra', musculo: 'pecho', series: 4, reps: '8-10', notas: 'Variación de ángulo' },
                    { nombre: 'Press militar con barra', musculo: 'deltoides', series: 4, reps: '8-10', notas: 'De pie o sentado' },
                    { nombre: 'Aperturas inclinadas con mancuernas', musculo: 'pecho', series: 3, reps: '12-15', notas: 'Estiramiento' },
                    { nombre: 'Elevaciones laterales', musculo: 'deltoides', series: 3, reps: '12-15', notas: 'Peso moderado' },
                    { nombre: 'Fondos en paralelas', musculo: 'triceps', series: 3, reps: '10-12', notas: 'Con peso si es necesario' },
                    { nombre: 'Extensiones de tríceps en cuerda', musculo: 'triceps', series: 3, reps: '12-15', notas: 'Quemador final' }
                ]
            },
            'M': {
                nombre: '🔴 MARTES - PULL A (Espalda, Bíceps)',
                musculos: ['dorsales', 'trapecios', 'romboides', 'biceps'],
                ejercicios: [
                    { nombre: 'Peso muerto', musculo: 'femorales', series: 4, reps: '5-7', notas: 'Ejercicio base' },
                    { nombre: 'Dominadas con peso', musculo: 'dorsales', series: 4, reps: '8-10', notas: 'Agarre supino' },
                    { nombre: 'Remo en T', musculo: 'dorsales', series: 4, reps: '8-10', notas: 'Para grosor' },
                    { nombre: 'Jalón al pecho con agarre abierto', musculo: 'dorsales', series: 3, reps: '10-12', notas: 'Para dorsal ancho' },
                    { nombre: 'Remo con mancuerna a 1 mano', musculo: 'dorsales', series: 3, reps: '10-12', notas: 'Alta calidad' },
                    { nombre: 'Curl con barra Z', musculo: 'biceps', series: 3, reps: '10-12', notas: 'Concentrado' },
                    { nombre: 'Curl martillo', musculo: 'biceps', series: 3, reps: '10-12', notas: 'Para braquial' }
                ]
            },
            'X': {
                nombre: '🔴 MIÉRCOLES - LEGS A (Piernas pesadas)',
                musculos: ['cuadriceps', 'femorales', 'gluteos', 'gemelos'],
                ejercicios: [
                    { nombre: 'Sentadilla trasera con barra', musculo: 'cuadriceps', series: 4, reps: '8-10', notas: 'Profunda' },
                    { nombre: 'Peso muerto rumano', musculo: 'femorales', series: 4, reps: '10-12', notas: 'Control' },
                    { nombre: 'Prensa de piernas', musculo: 'cuadriceps', series: 4, reps: '10-12', notas: 'Pies abajo' },
                    { nombre: 'Curl de isquiotibiales acostado', musculo: 'femorales', series: 3, reps: '12-15', notas: 'Máquina' },
                    { nombre: 'Hip thrust', musculo: 'gluteos', series: 3, reps: '12-15', notas: 'Con barra' },
                    { nombre: 'Extensiones de cuádriceps', musculo: 'cuadriceps', series: 3, reps: '12-15', notas: 'Máquina' },
                    { nombre: 'Elevaciones de talones de pie', musculo: 'gemelos', series: 4, reps: '15-20', notas: 'En máquina' }
                ]
            },
            'J': {
                nombre: '🔴 JUEVES - PUSH B (Pecho, Hombros, Tríceps)',
                musculos: ['pecho', 'deltoides', 'triceps'],
                ejercicios: [
                    { nombre: 'Press banca declinado', musculo: 'pecho', series: 4, reps: '8-10', notas: 'Para pecho inferior' },
                    { nombre: 'Press con mancuernas', musculo: 'pecho', series: 4, reps: '8-10', notas: 'Banco plano' },
                    { nombre: 'Press de hombros con mancuernas', musculo: 'deltoides', series: 4, reps: '8-10', notas: 'Sentado' },
                    { nombre: 'Crossover en polea', musculo: 'pecho', series: 3, reps: '12-15', notas: 'Brazos arriba' },
                    { nombre: 'Elevaciones frontales', musculo: 'deltoides', series: 3, reps: '12-15', notas: 'Con mancuerna' },
                    { nombre: 'Extensiones con mancuerna a 1 mano', musculo: 'triceps', series: 3, reps: '10-12', notas: 'Detrás de cabeza' },
                    { nombre: 'Press francés con barra Z', musculo: 'triceps', series: 3, reps: '10-12', notas: 'Acostado' }
                ]
            },
            'V': {
                nombre: '🔴 VIERNES - PULL B (Espalda, Bíceps)',
                musculos: ['dorsales', 'trapecios', 'romboides', 'biceps'],
                ejercicios: [
                    { nombre: 'Remo con barra', musculo: 'dorsales', series: 4, reps: '8-10', notas: 'Pesado' },
                    { nombre: 'Dominadas con agarre abierto', musculo: 'dorsales', series: 4, reps: '8-10', notas: 'Palmas al frente' },
                    { nombre: 'Jalón tras nuca', musculo: 'deltoides', series: 3, reps: '10-12', notas: 'Con cuidado' },
                    { nombre: 'Remo en máquina', musculo: 'dorsales', series: 3, reps: '10-12', notas: 'Agarre cerrado' },
                    { nombre: 'Encogimientos con barra', musculo: 'trapecios', series: 3, reps: '12-15', notas: 'Subir hombros' },
                    { nombre: 'Curl predicador', musculo: 'biceps', series: 3, reps: '10-12', notas: 'En banco' },
                    { nombre: 'Curl concentrado', musculo: 'biceps', series: 3, reps: '10-12', notas: 'Aislamiento' }
                ]
            },
            'S': {
                nombre: '🔴 SÁBADO - LEGS B (Piernas volumen)',
                musculos: ['cuadriceps', 'femorales', 'gluteos', 'gemelos'],
                ejercicios: [
                    { nombre: 'Sentadilla frontal', musculo: 'cuadriceps', series: 4, reps: '8-10', notas: 'Barra al frente' },
                    { nombre: 'Peso muerto', musculo: 'femorales', series: 4, reps: '6-8', notas: 'Variación' },
                    { nombre: 'Sentadilla búlgara', musculo: 'cuadriceps', series: 3, reps: '10-12', notas: 'Por pierna' },
                    { nombre: 'Curl de isquiotibiales sentado', musculo: 'femorales', series: 3, reps: '12-15', notas: 'Máquina' },
                    { nombre: 'Abducción de cadera', musculo: 'abductores', series: 3, reps: '15-20', notas: 'Para glúteo medio' },
                    { nombre: 'Aducción de cadera', musculo: 'aductores', series: 3, reps: '15-20', notas: 'Parte interna' },
                    { nombre: 'Elevaciones de talones sentado', musculo: 'gemelos', series: 4, reps: '15-20', notas: 'Para sóleo' }
                ]
            },
            'D': {
                nombre: '🔴 DOMINGO - DESCANSO',
                musculos: [],
                ejercicios: []
            }
        };

        // Seleccionar según nivel
        if (nivel === 'principiante') return principiante;
        if (nivel === 'intermedio') return intermedio;
        if (nivel === 'avanzado') return avanzado;
        
        return intermedio; // Por defecto
    },

    obtenerEjerciciosPorMusculo: function(musculo, nivel, objetivo, sexo, equipo) {
        // Base de datos de ejercicios para GIMNASIO COMPLETO
        const ejerciciosGym = {
            pecho: [
                { nombre: 'Press banca con barra', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Barra a la altura pezones, no rebotes' },
                { nombre: 'Press banca inclinado con barra', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Banco 30°, para pecho superior' },
                { nombre: 'Press banca declinado', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Banco -15°, para pecho inferior' },
                { nombre: 'Press con mancuernas', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Baja controlado, sube explosivo' },
                { nombre: 'Press inclinado con mancuernas', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Para pecho superior' },
                { nombre: 'Aperturas con mancuernas', series: 3, reps: '12-15', descanso: '60 seg', consejo: 'Brazos ligeramente flexionados' },
                { nombre: 'Aperturas en polea alta', series: 3, reps: '12-15', descanso: '60 seg', consejo: 'Cruza brazos frente al cuerpo' },
                { nombre: 'Crossover en polea', series: 3, reps: '12-15', descanso: '60 seg', consejo: 'Para pecho interno' },
                { nombre: 'Fondos en paralelas', series: 3, reps: '10-12', descanso: '90 seg', consejo: 'Inclínate adelante para pecho' },
                { nombre: 'Press en máquina', series: 3, reps: '10-12', descanso: '60 seg', consejo: 'Controla el movimiento' }
            ],
            dorsales: [
                { nombre: 'Dominadas con agarre abierto', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Para dorsal ancho' },
                { nombre: 'Dominadas con agarre supino', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Palmas hacia ti, más bíceps' },
                { nombre: 'Remo con barra', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Inclinado, lleva barra al pecho' },
                { nombre: 'Remo en T', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Para grosor de espalda' },
                { nombre: 'Jalón al pecho', series: 3, reps: '10-12', descanso: '60 seg', consejo: 'En polea alta' },
                { nombre: 'Remo con mancuerna a 1 mano', series: 4, reps: '8-10', descanso: '60 seg', consejo: 'Apoya rodilla en banco' },
                { nombre: 'Remo en polea baja', series: 3, reps: '10-12', descanso: '60 seg', consejo: 'Con agarre V' },
                { nombre: 'Pull-over en polea', series: 3, reps: '10-12', descanso: '60 seg', consejo: 'Con cuerda' },
                { nombre: 'Peso muerto', series: 4, reps: '6-8', descanso: '120 seg', consejo: 'Espalda recta siempre' },
                { nombre: 'Hiperextensiones', series: 3, reps: '12-15', descanso: '45 seg', consejo: 'Para espalda baja' }
            ],
            deltoides: [
                { nombre: 'Press militar con barra', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Barra al frente' },
                { nombre: 'Press militar con mancuernas', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Sentado' },
                { nombre: 'Elevaciones laterales', series: 3, reps: '12-15', descanso: '45 seg', consejo: 'Sube hasta altura hombros' },
                { nombre: 'Elevaciones frontales', series: 3, reps: '12-15', descanso: '45 seg', consejo: 'Con barra o mancuerna' },
                { nombre: 'Pájaros para deltoides posterior', series: 3, reps: '12-15', descanso: '45 seg', consejo: 'Inclinado, abre brazos' },
                { nombre: 'Face pull', series: 3, reps: '15-20', descanso: '45 seg', consejo: 'En polea, lleva a la cara' },
                { nombre: 'Press Arnold', series: 3, reps: '10-12', descanso: '60 seg', consejo: 'Rotación de muñecas' },
                { nombre: 'Elevaciones laterales en polea', series: 3, reps: '12-15', descanso: '45 seg', consejo: 'Controla la bajada' },
                { nombre: 'Remo al mentón', series: 3, reps: '10-12', descanso: '60 seg', consejo: 'Lleva barra a la barbilla' }
            ],
            biceps: [
                { nombre: 'Curl con barra Z', series: 4, reps: '8-10', descanso: '60 seg', consejo: 'Menos tensión muñecas' },
                { nombre: 'Curl con mancuernas alterno', series: 4, reps: '8-10', descanso: '60 seg', consejo: 'Alterna brazos' },
                { nombre: 'Curl inclinado con mancuernas', series: 4, reps: '8-10', descanso: '60 seg', consejo: 'Estiramiento máximo' },
                { nombre: 'Curl martillo', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Palmas enfrentadas' },
                { nombre: 'Curl concentrado', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Apoya brazo en pierna' },
                { nombre: 'Curl en predicador', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Aísla el bíceps' },
                { nombre: 'Curl en polea baja', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Con cuerda' }
            ],
            triceps: [
                { nombre: 'Press francés con barra Z', series: 4, reps: '8-10', descanso: '60 seg', consejo: 'Acostado' },
                { nombre: 'Extensiones en polea con cuerda', series: 4, reps: '10-12', descanso: '45 seg', consejo: 'Codos fijos' },
                { nombre: 'Fondos en paralelas', series: 4, reps: '8-10', descanso: '60 seg', consejo: 'Recto para tríceps' },
                { nombre: 'Press banca agarre cerrado', series: 4, reps: '8-10', descanso: '60 seg', consejo: 'Manos juntas' },
                { nombre: 'Extensiones con mancuerna a 1 mano', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Detrás de cabeza' },
                { nombre: 'Patada de tríceps', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Inclinado' },
                { nombre: 'Extensiones en polea invertidas', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Agarre prono' }
            ],
            cuadriceps: [
                { nombre: 'Sentadilla trasera con barra', series: 4, reps: '8-10', descanso: '120 seg', consejo: 'Barra sobre trampas' },
                { nombre: 'Sentadilla frontal', series: 4, reps: '8-10', descanso: '120 seg', consejo: 'Barra al frente' },
                { nombre: 'Prensa de piernas', series: 4, reps: '10-12', descanso: '60 seg', consejo: 'No bloquees rodillas' },
                { nombre: 'Extensiones de cuádriceps', series: 3, reps: '12-15', descanso: '45 seg', consejo: 'Máquina' },
                { nombre: 'Hack squat', series: 3, reps: '10-12', descanso: '60 seg', consejo: 'Máquina' },
                { nombre: 'Sentadilla búlgara', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Con mancuernas' },
                { nombre: 'Zancadas con barra', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Alterna piernas' }
            ],
            femorales: [
                { nombre: 'Peso muerto', series: 4, reps: '6-8', descanso: '120 seg', consejo: 'Excelente para femorales' },
                { nombre: 'Peso muerto rumano', series: 4, reps: '8-10', descanso: '90 seg', consejo: 'Piernas casi rectas' },
                { nombre: 'Curl de isquiotibiales acostado', series: 4, reps: '10-12', descanso: '45 seg', consejo: 'Máquina' },
                { nombre: 'Curl de isquiotibiales sentado', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Máquina' },
                { nombre: 'Buenos días con barra', series: 3, reps: '10-12', descanso: '60 seg', consejo: 'Barra sobre hombros' },
                { nombre: 'Peso muerto a una pierna', series: 3, reps: '10-12', descanso: '45 seg', consejo: 'Con mancuerna' }
            ],
            gluteos: [
                { nombre: 'Hip thrust con barra', series: 4, reps: '10-12', descanso: '90 seg', consejo: 'Mejor para glúteos' },
                { nombre: 'Peso muerto rumano', series: 4, reps: '10-12', descanso: '60 seg', consejo: 'Enfoque en glúteos' },
                { nombre: 'Sentadilla profunda', series: 4, reps: '10-12', descanso: '60 seg', consejo: 'Baja mucho' },
                { nombre: 'Prensa de piernas alto', series: 4, reps: '12-15', descanso: '45 seg', consejo: 'Pies arriba' },
                { nombre: 'Abducción en máquina', series: 3, reps: '15-20', descanso: '30 seg', consejo: 'Para glúteo medio' },
                { nombre: 'Patada de glúteo en polea', series: 3, reps: '12-15', descanso: '30 seg', consejo: 'Con tobillera' },
                { nombre: 'Puente a una pierna', series: 3, reps: '12-15', descanso: '30 seg', consejo: 'Con peso' }
            ],
            gemelos: [
                { nombre: 'Elevaciones de talones de pie', series: 4, reps: '15-20', descanso: '30 seg', consejo: 'En máquina' },
                { nombre: 'Elevaciones de talones sentado', series: 4, reps: '15-20', descanso: '30 seg', consejo: 'Para sóleo' },
                { nombre: 'Elevaciones en prensa', series: 4, reps: '15-20', descanso: '30 seg', consejo: 'En prensa de piernas' },
                { nombre: 'Paseo de granjero de puntillas', series: 3, reps: '30 seg', descanso: '45 seg', consejo: 'Con mancuernas' }
            ],
            abdominales: [
                { nombre: 'Crunch en máquina', series: 3, reps: '12-15', descanso: '30 seg', consejo: 'Control' },
                { nombre: 'Elevaciones de piernas colgado', series: 3, reps: '12-15', descanso: '45 seg', consejo: 'Sin balanceo' },
                { nombre: 'Plancha con peso', series: 3, reps: '45 seg', descanso: '45 seg', consejo: 'Disco en espalda' },
                { nombre: 'Russian twists con disco', series: 3, reps: '15-20', descanso: '30 seg', consejo: 'Gira torso' },
                { nombre: 'Bicicleta', series: 3, reps: '20', descanso: '30 seg', consejo: 'Codo a rodilla' }
            ]
        };

        // Adaptar series según objetivo y nivel
        const params = this.getSeriesRepsPorObjetivo(objetivo, nivel);
        
        if (!ejerciciosGym[musculo]) return [];
        
        // Rotar ejercicios para no repetir siempre los mismos
        const ejercicios = [...ejerciciosGym[musculo]];
        const startIdx = this.contador % ejercicios.length;
        
        // Personalizar según sexo
        return ejercicios.map((e, index) => {
            const nuevo = { ...e };
            nuevo.series = params.series;
            nuevo.reps = params.reps;
            nuevo.descanso = params.descanso;
            
            // Consejos personalizados por sexo
            if (sexo === 'mujer') {
                if (musculo === 'gluteos' || musculo === 'femorales') {
                    nuevo.consejo = "Enfoque en glúteos, siente la contracción en cada rep";
                } else if (musculo === 'abdominales') {
                    nuevo.consejo = "Para abdomen definido, controla el movimiento";
                }
            }
            
            return nuevo;
        });
    },

    generarPlan: function() {
        console.log('💪 Generando rutina...');
        
        const datos = this.obtenerDatosUsuario();
        if (!datos) {
            alert('❌ Completa tu perfil primero');
            return;
        }

        // Solo generar rutinas para equipo "gym"
        if (datos.equipo !== 'gym') {
            alert('⚠️ Esta versión está optimizada para GIMNASIO COMPLETO. Selecciona "gym" en tu perfil.');
            return;
        }
        
        this.contador++;
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

    generarPlanSemanal: function(dia, datos) {
        const nivel = datos.nivel || 'intermedio';
        const objetivo = datos.objetivo || 'hipertrofia';
        const sexo = datos.sexo || 'hombre';
        
        const rutinaSemanal = this.obtenerRutinaSemanal(nivel, objetivo, sexo);
        const diaInfo = rutinaSemanal[dia];
        
        if (!diaInfo || diaInfo.musculos.length === 0) {
            document.getElementById('workoutResult').innerHTML = `<h3>${diaInfo?.nombre || 'Descanso'}</h3><p>¡Día de recuperación! Aprovecha para descansar y comer bien.</p>`;
            return;
        }
        
        let html = `<h3 style="color:var(--primary);">${diaInfo.nombre}</h3>`;
        html += `<p style="margin-bottom:15px;">👤 ${sexo === 'mujer' ? 'Mujer' : 'Hombre'} • 🏋️ Nivel: ${nivel} • 🎯 Objetivo: ${this.getObjetivoTexto(objetivo)}</p>`;
        html += `<hr>`;
        
        diaInfo.ejercicios.forEach(ej => {
            html += `
                <div style="background:var(--card); border-radius:12px; padding:15px; margin-bottom:10px; border-left:4px solid var(--primary);">
                    <div style="font-weight:bold; font-size:1.1em; margin-bottom:5px;">${ej.nombre}</div>
                    <div style="display:flex; gap:15px; margin-bottom:5px; font-size:0.9em;">
                        <span>🔹 ${ej.series} series de ${ej.reps} reps</span>
                    </div>
                    <div style="color:var(--text-secondary); font-size:0.85em; background:var(--hover); padding:8px; border-radius:8px;">
                        💡 ${ej.notas}
                    </div>
                </div>
            `;
        });
        
        document.getElementById('workoutResult').innerHTML = html;
    },

    generarPlanPorMusculo: function(musculo, datos) {
        const nivel = datos.nivel || 'intermedio';
        const objetivo = datos.objetivo || 'hipertrofia';
        const sexo = datos.sexo || 'hombre';
        
        const ejercicios = this.obtenerEjerciciosPorMusculo(musculo, nivel, objetivo, sexo, 'gym');
        
        if (!ejercicios || ejercicios.length === 0) {
            document.getElementById('workoutResult').innerHTML = `<p>No hay ejercicios disponibles para ${musculo}</p>`;
            return;
        }
        
        // Tomar 4-6 ejercicios variados
        const numEjercicios = Math.min(6, ejercicios.length);
        const seleccionados = [];
        for (let i = 0; i < numEjercicios; i++) {
            seleccionados.push(ejercicios[(this.contador + i) % ejercicios.length]);
        }
        
        let html = `<h3 style="color:var(--primary);">🎯 RUTINA PARA ${this.getNombreMusculo(musculo).toUpperCase()}</h3>`;
        html += `<p style="margin-bottom:15px;">👤 ${sexo === 'mujer' ? 'Mujer' : 'Hombre'} • 🏋️ Nivel: ${nivel} • 🎯 Objetivo: ${this.getObjetivoTexto(objetivo)}</p>`;
        html += `<hr>`;
        
        seleccionados.forEach(ej => {
            html += `
                <div style="background:var(--card); border-radius:12px; padding:15px; margin-bottom:10px; border-left:4px solid var(--primary);">
                    <div style="font-weight:bold; font-size:1.1em; margin-bottom:5px;">${ej.nombre}</div>
                    <div style="display:flex; gap:15px; margin-bottom:5px; font-size:0.9em;">
                        <span>🔹 ${ej.series} series de ${ej.reps} reps</span>
                        <span>⏱️ Descanso: ${ej.descanso}</span>
                    </div>
                    <div style="color:var(--text-secondary); font-size:0.85em; background:var(--hover); padding:8px; border-radius:8px;">
                        💡 ${ej.consejo}
                    </div>
                </div>
            `;
        });
        
        document.getElementById('workoutResult').innerHTML = html;
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

console.log('✅ training.js - Versión Profesional cargada');
