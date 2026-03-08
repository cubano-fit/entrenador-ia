// assets/js/chat.js - VERSIÓN DEFINITIVA CON DICCIONARIO COMPLETO
window.chat = {
    enviarMensaje: function(seccion) {
        const input = document.getElementById(seccion + 'ChatInput');
        const mensaje = input.value.trim();
        if (!mensaje) return;

        const chat = document.getElementById(seccion + 'Chat');
        chat.innerHTML += `<div class="chat-message user-message">${mensaje}</div>`;
        input.value = '';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.textContent = '🤖 Pensando...';
        chat.appendChild(typingDiv);

        setTimeout(() => {
            const respuesta = this.buscarRespuesta(mensaje, seccion);
            document.getElementById('typingIndicator')?.remove();
            chat.innerHTML += `<div class="chat-message assistant-message">🤖 ${respuesta}</div>`;
            chat.scrollTop = chat.scrollHeight;
        }, 300);
    },

    // ============================================
    // DICCIONARIO COMPLETO DE TÉRMINOS
    // ============================================
    terminos: {
        // ===== GRUPOS PRINCIPALES =====
        "pecho": "pecho", "pectoral": "pecho", "pectorales": "pecho", "pecs": "pecho",
        "espalda": "espalda", "dorsal": "espalda", "dorsales": "espalda", "back": "espalda",
        "hombro": "hombros", "hombros": "hombros", "deltoides": "hombros", "deltoide": "hombros",
        "pierna": "piernas", "piernas": "piernas", "legs": "piernas", "quadriceps": "piernas", "cuádriceps": "piernas", "femoral": "piernas",
        "brazo": "brazos", "brazos": "brazos", "arms": "brazos", "biceps": "brazos", "bíceps": "brazos", "triceps": "brazos", "tríceps": "brazos",
        "gluteo": "gluteos", "glúteo": "gluteos", "gluteos": "gluteos", "glúteos": "gluteos", "glutes": "gluteos",
        "abdominal": "abdominales", "abdominales": "abdominales", "abs": "abdominales", "core": "abdominales", "sixpack": "abdominales",
        
        // ===== GRUPOS ESPECÍFICOS =====
        "gemelo": "gemelos", "gemelos": "gemelos", "pantorrilla": "gemelos", "calf": "gemelos", "calves": "gemelos",
        "antebrazo": "antebrazos", "antebrazos": "antebrazos", "forearm": "antebrazos", "forearms": "antebrazos",
        "trapecio": "trapecios", "trapecios": "trapecios", "traps": "trapecios",
        "lumbar": "lumbares", "lumbares": "lumbares", "espalda baja": "lumbares", "lower back": "lumbares",
        "abductor": "abductores", "abductores": "abductores",
        "adductor": "aductores", "aductores": "aductores",
        "femoral": "femorales", "femorales": "femorales", "isquiotibial": "femorales", "hamstring": "femorales",
        "cuadriceps": "cuadriceps", "cuádriceps": "cuadriceps", "quads": "cuadriceps",
        "oblicuo": "oblicuos", "oblicuos": "oblicuos",
        "trapecios": "trapecios",
        
        // ===== GRUPOS COMPUESTOS =====
        "torso": ["pecho", "espalda", "hombros"],
        "core": "abdominales",
        "upper body": ["pecho", "espalda", "hombros", "brazos"],
        "lower body": ["piernas", "gluteos"],
        
        // ===== EJERCICIOS DE PECHO =====
        "press banca": "ejercicio_press_banca", "press de banca": "ejercicio_press_banca", "banca": "ejercicio_press_banca",
        "press inclinado": "ejercicio_press_inclinado", "inclinado": "ejercicio_press_inclinado",
        "press declinado": "ejercicio_press_declinado", "declinado": "ejercicio_press_declinado",
        "aperturas": "ejercicio_aperturas", "apertura": "ejercicio_aperturas",
        "flexiones": "ejercicio_flexiones", "flexion": "ejercicio_flexiones", "lagartijas": "ejercicio_flexiones",
        "fondos": "ejercicio_fondos", "fondo": "ejercicio_fondos", "dips": "ejercicio_fondos",
        "crossover": "ejercicio_crossover", "polea pecho": "ejercicio_crossover",
        
        // ===== EJERCICIOS DE ESPALDA =====
        "dominadas": "ejercicio_dominadas", "dominada": "ejercicio_dominadas", "pull up": "ejercicio_dominadas",
        "remo con barra": "ejercicio_remo_barra", "remo barra": "ejercicio_remo_barra",
        "remo con mancuerna": "ejercicio_remo_mancuerna", "remo mancuerna": "ejercicio_remo_mancuerna",
        "remo en t": "ejercicio_remo_t", "remo t": "ejercicio_remo_t", "remo en T": "ejercicio_remo_t",
        "jalón": "ejercicio_jalon", "jalon": "ejercicio_jalon", "polea espalda": "ejercicio_jalon",
        "peso muerto": "ejercicio_peso_muerto", "deadlift": "ejercicio_peso_muerto",
        "hiperextensiones": "ejercicio_hiperextensiones", "hiper": "ejercicio_hiperextensiones",
        "pull over": "ejercicio_pull_over", "pullover": "ejercicio_pull_over",
        
        // ===== EJERCICIOS DE PIERNAS =====
        "sentadilla": "ejercicio_sentadilla", "squat": "ejercicio_sentadilla",
        "sentadilla búlgara": "ejercicio_bulgara", "bulgara": "ejercicio_bulgara",
        "prensa": "ejercicio_prensa", "leg press": "ejercicio_prensa",
        "zancadas": "ejercicio_zancadas", "zancada": "ejercicio_zancadas", "lunges": "ejercicio_zancadas",
        "extensiones": "ejercicio_extensiones", "cuadriceps maquina": "ejercicio_extensiones",
        "curl femoral": "ejercicio_curl_femoral", "femoral maquina": "ejercicio_curl_femoral",
        "peso muerto rumano": "ejercicio_rumano", "rumano": "ejercicio_rumano",
        "hip thrust": "ejercicio_hip_thrust", "thrust": "ejercicio_hip_thrust",
        "gemelos": "ejercicio_gemelos", "elevaciones de talones": "ejercicio_gemelos",
        
        // ===== EJERCICIOS DE HOMBROS =====
        "press militar": "ejercicio_militar", "militar": "ejercicio_militar",
        "elevaciones laterales": "ejercicio_laterales", "laterales": "ejercicio_laterales",
        "elevaciones frontales": "ejercicio_frontales", "frontales": "ejercicio_frontales",
        "pájaros": "ejercicio_pajaros", "pajaros": "ejercicio_pajaros",
        "face pull": "ejercicio_face_pull", "facepull": "ejercicio_face_pull",
        "press arnold": "ejercicio_arnold", "arnold": "ejercicio_arnold",
        
        // ===== EJERCICIOS DE BRAZOS =====
        "curl": "ejercicio_curl", "biceps": "ejercicio_curl",
        "curl martillo": "ejercicio_martillo", "martillo": "ejercicio_martillo",
        "curl concentrado": "ejercicio_concentrado", "concentrado": "ejercicio_concentrado",
        "curl predicador": "ejercicio_predicador", "predicador": "ejercicio_predicador",
        "press francés": "ejercicio_frances", "frances": "ejercicio_frances", "french press": "ejercicio_frances",
        "extensiones en polea": "ejercicio_polea", "polea triceps": "ejercicio_polea",
        "patada de triceps": "ejercicio_patada", "kickback": "ejercicio_patada",
        
        // ===== EJERCICIOS DE ABDOMEN =====
        "plancha": "ejercicio_plancha", "plank": "ejercicio_plancha",
        "crunch": "ejercicio_crunch",
        "elevaciones de piernas": "ejercicio_leg_raises", "leg raises": "ejercicio_leg_raises",
        "russian twists": "ejercicio_twists", "twists": "ejercicio_twists",
        "bicicleta": "ejercicio_bicicleta", "bicycle": "ejercicio_bicicleta"
    },

    // ============================================
    // RESPUESTAS PARA EJERCICIOS ESPECÍFICOS
    // ============================================
    respuestasEjercicios: {
        "ejercicio_press_banca": "🏋️ **PRESS BANCA**\n\n**Técnica:**\n1. Acuéstate con pies firmes\n2. Barra a la altura de los pezones\n3. Baja controlado hasta el pecho\n4. Sube explosivo sin bloquear codos\n\n**Consejos:**\n• Codos a 45°\n• No rebotes\n• Mantén hombros pegados al banco\n\n**Series recomendadas:** 4x8-10",
        
        "ejercicio_press_inclinado": "🏋️ **PRESS INCLINADO**\n\n**Técnica:**\n1. Banco a 30-45°\n2. Barra hacia la parte superior del pecho\n3. Baja controlado\n4. Sube explosivo\n\n**Consejos:**\n• Ideal para pecho superior\n• No arquees demasiado la espalda\n\n**Series:** 4x8-12",
        
        "ejercicio_press_declinado": "🏋️ **PRESS DECLINADO**\n\n**Técnica:**\n1. Banco inclinado hacia abajo (-15°)\n2. Barra hacia la parte inferior del pecho\n3. Baja controlado\n4. Sube explosivo\n\n**Consejos:**\n• Para pecho inferior\n• Asegura bien los pies",
        
        "ejercicio_aperturas": "🔹 **APERTURAS CON MANCUERNAS**\n\n**Técnica:**\n1. Acostado en banco, mancuernas sobre el pecho\n2. Baja los brazos en arco, codos ligeramente flexionados\n3. Siente el estiramiento en el pecho\n4. Vuelve contrayendo\n\n**Consejos:**\n• No bajes demasiado\n• Imagina que abrazas un árbol\n\n**Series:** 3x12-15",
        
        "ejercicio_flexiones": "🤸 **FLEXIONES**\n\n**Técnica:**\n1. Cuerpo recto de cabeza a talones\n2. Manos separadas al ancho de hombros\n3. Baja hasta casi tocar el suelo\n4. Sube con fuerza\n\n**Variantes:**\n• Inclinadas (pies en alto)\n• Diamante (manos juntas)\n• Con aplauso\n\n**Series:** 4x15",
        
        "ejercicio_fondos": "🔻 **FONDOS EN PARALELAS**\n\n**Técnica:**\n1. Sujeta las paralelas con brazos extendidos\n2. Baja flexionando codos hasta 90°\n3. Sube con fuerza\n\n**Consejos:**\n• Inclínate adelante para pecho\n• Recto para tríceps\n\n**Series:** 3-4x10-12",
        
        "ejercicio_crossover": "🔹 **CROSSOVER EN POLEA**\n\n**Técnica:**\n1. De pie en poleas altas\n2. Inclínate ligeramente\n3. Junta las manos frente al pecho\n4. Contrae al final\n\n**Series:** 3x15",
        
        "ejercicio_dominadas": "💪 **DOMINADAS**\n\n**Técnica:**\n1. Agarre abierto, palmas hacia adelante\n2. Sube hasta que la barbilla pase la barra\n3. Baja controlado\n\n**Consejos:**\n• Si no llegas, haz negativas\n• No balances el cuerpo\n\n**Series:** 4x8",
        
        "ejercicio_remo_barra": "🔙 **REMO CON BARRA**\n\n**Técnica:**\n1. Inclina el torso a 45°, espalda recta\n2. Lleva la barra al pecho, juntando omóplatos\n3. Baja controlado\n\n**Consejos:**\n• Mantén la espalda recta\n• No uses impulso\n\n**Series:** 4x10-12",
        
        "ejercicio_remo_t": "🔙 **REMO EN T**\n\n**Técnica:**\n1. Apoya el pecho en el banco de remo T\n2. Agarra las barras\n3. Sube contrayendo la espalda\n4. Baja controlado\n\n**Consejos:**\n• Junta omóplatos al final\n• Espalda recta\n\n**Series:** 4x10-12",
        
        "ejercicio_peso_muerto": "🔙 **PESO MUERTO**\n\n**Técnica:**\n1. Barra sobre las espinillas\n2. Espalda recta, pecho arriba\n3. Sube con piernas y cadera\n4. Baja controlado\n\n**Consejos:**\n• Espalda recta siempre\n• Barra pegada a las piernas\n\n**Series:** 4x8",
        
        "ejercicio_sentadilla": "🦵 **SENTADILLA**\n\n**Técnica:**\n1. Pies al ancho de hombros\n2. Espalda recta, pecho arriba\n3. Baja como si fueras a sentarte\n4. Sube con fuerza\n\n**Consejos:**\n• Rodillas alineadas con puntas\n• Baja hasta paralelo\n\n**Series:** 4x10-15",
        
        "ejercicio_prensa": "🦵 **PRENSA DE PIERNAS**\n\n**Técnica:**\n1. Sentado en la máquina\n2. Empuja la plataforma\n3. No bloquees rodillas al final\n\n**Consejos:**\n• Pies arriba = más glúteo\n• Pies abajo = más cuádriceps\n\n**Series:** 4x12-15",
        
        "ejercicio_hip_thrust": "🍑 **HIP THRUST**\n\n**Técnica:**\n1. Espalda apoyada en banco\n2. Barra sobre caderas\n3. Sube la cadera hasta que cuerpo quede recto\n4. Contrae glúteos arriba\n\n**Consejos:**\n• Mejor ejercicio para glúteos\n• Apoya bien la espalda\n\n**Series:** 4x12-15",
        
        "ejercicio_militar": "🏋️ **PRESS MILITAR**\n\n**Técnica:**\n1. Barra al frente a la altura de hombros\n2. Sube hasta extender brazos\n3. Baja controlado\n\n**Consejos:**\n• Espalda recta\n• No arquear demasiado\n\n**Series:** 4x8-10",
        
        "ejercicio_laterales": "🏋️ **ELEVACIONES LATERALES**\n\n**Técnica:**\n1. Mancuernas a los lados\n2. Sube hasta altura de hombros\n3. Baja controlado\n\n**Consejos:**\n• Más peso no es mejor\n• Controla el movimiento\n\n**Series:** 4x12-15",
        
        "ejercicio_curl": "💪 **CURL DE BÍCEPS**\n\n**Técnica:**\n1. Codos pegados al cuerpo\n2. Sube contrayendo bíceps\n3. Baja controlado\n\n**Consejos:**\n• Sin balancear el cuerpo\n• No extiendas completamente\n\n**Series:** 4x10-12",
        
        "ejercicio_frances": "🔻 **PRESS FRANCÉS**\n\n**Técnica:**\n1. Acostado, barra extendida\n2. Flexiona codos llevando barra a la cabeza\n3. Extiende contrayendo tríceps\n\n**Consejos:**\n• Codos fijos\n• Para porción larga del tríceps\n\n**Series:** 4x10-12",
        
        "ejercicio_gemelos": "🦶 **GEMELOS**\n\n**Técnica:**\n1. De pie, sube talones\n2. Aguanta 1-2 seg arriba\n3. Baja controlado\n\n**Consejos:**\n• Sentado = sóleo\n• De pie = gemelos\n\n**Series:** 4x20-25",
        
        "ejercicio_plancha": "🫀 **PLANCHA**\n\n**Técnica:**\n1. Apoyo en antebrazos y puntas\n2. Cuerpo recto\n3. Abdomen contraído\n\n**Consejos:**\n• No hundas cadera\n• Respira normal\n\n**Series:** 4x45-60 seg"
    },

    // ============================================
    // MAPA DE RESPUESTAS PARA GRUPOS MUSCULARES
    // ============================================
    respuestasMusculares: {
        "pecho": () => window.respuestasChat?.pecho,
        "espalda": () => window.respuestasChat?.espalda,
        "hombros": () => window.respuestasChat?.hombros,
        "piernas": () => window.respuestasChat?.piernas,
        "brazos": () => window.respuestasChat?.brazos,
        "gluteos": () => window.respuestasChat?.gluteos,
        "abdominales": () => window.respuestasChat?.abdominales,
        "gemelos": () => this.generarRespuestaGemelos(),
        "antebrazos": () => this.generarRespuestaAntebrazos(),
        "trapecios": () => this.generarRespuestaTrapecios(),
        "lumbares": () => this.generarRespuestaLumbares(),
        "cuadriceps": () => this.generarRespuestaCuadriceps(),
        "femorales": () => this.generarRespuestaFemorales()
    },

    // ============================================
    // FUNCIÓN PRINCIPAL DE BÚSQUEDA
    // ============================================
    buscarCategoria: function(texto) {
        texto = texto.toLowerCase();
        
        // Buscar coincidencia exacta en el diccionario
        for (let termino in this.terminos) {
            if (texto.includes(termino)) {
                return this.terminos[termino];
            }
        }
        
        // Buscar por palabras sueltas (para términos más largos)
        const palabras = texto.split(' ');
        for (let palabra of palabras) {
            if (palabra.length < 3) continue;
            
            for (let termino in this.terminos) {
                if (termino.includes(palabra) || palabra.includes(termino)) {
                    return this.terminos[termino];
                }
            }
        }
        
        return null;
    },

    buscarEnEjerciciosDB: function(texto) {
        if (!window.ejerciciosDB) return null;
        
        for (let categoria in window.ejerciciosDB) {
            for (let equipo in window.ejerciciosDB[categoria]) {
                for (let ejercicio of window.ejerciciosDB[categoria][equipo]) {
                    const nombreEjercicio = ejercicio.nombre.toLowerCase();
                    if (texto.includes(nombreEjercicio)) {
                        return `🏋️ **${ejercicio.nombre.toUpperCase()}**\n\n**Series:** ${ejercicio.series}\n**Descanso:** ${ejercicio.descanso}\n\n💡 **Consejo:** ${ejercicio.consejo}\n\n📌 *Para técnica más detallada, pregunta sobre el grupo muscular*`;
                    }
                }
            }
        }
        return null;
    },

    buscarRespuesta: function(mensaje, seccion) {
        const texto = mensaje.toLowerCase();
        
        // ===== ENTRENAMIENTO =====
        if (seccion === 'entrenar') {
            // 1. Buscar en el diccionario
            const categoria = this.buscarCategoria(texto);
            
            if (categoria) {
                // Si es un array (grupo compuesto)
                if (Array.isArray(categoria)) {
                    let respuesta = "🔹 **Músculos incluidos:**\n\n";
                    for (let musculo of categoria) {
                        const resp = this.respuestasMusculares[musculo]?.();
                        if (resp && resp.titulo) {
                            respuesta += `• ${resp.titulo.replace(/\*\*/g, '')}\n`;
                        } else {
                            respuesta += `• ${musculo.charAt(0).toUpperCase() + musculo.slice(1)}\n`;
                        }
                    }
                    respuesta += "\n¿Sobre cuál de estos músculos quieres información específica?";
                    return respuesta;
                }
                
                // Si es un grupo muscular
                if (this.respuestasMusculares[categoria]) {
                    return this.formatearRespuesta(this.respuestasMusculares[categoria]());
                }
                
                // Si es un ejercicio específico
                if (categoria.startsWith("ejercicio_") && this.respuestasEjercicios[categoria]) {
                    return this.respuestasEjercicios[categoria];
                }
            }
            
            // 2. Buscar en la base de datos de ejercicios
            const desdeDB = this.buscarEnEjerciciosDB(texto);
            if (desdeDB) return desdeDB;
            
            return "Pregúntame sobre: pecho, espalda, hombros, piernas, brazos, glúteos, abdominales, gemelos, antebrazos, trapecios, lumbares, o cualquier ejercicio específico (press banca, sentadilla, dominadas, remo, etc.)";
        }
        
        // ===== NUTRICIÓN =====
        if (seccion === 'nutricion') {
            const db = window.respuestasChat;
            if (!db) return "Base de datos no disponible";
            
            if (texto.includes('perder peso')) return this.formatearRespuesta(db.perder_peso);
            if (texto.includes('ganar musculo') || texto.includes('ganar músculo')) return this.formatearRespuesta(db.ganar_musculo);
            if (texto.includes('tonificar')) return this.formatearRespuesta(db.tonificar);
            
            if (texto.includes('desayuno')) return db.nutricion_general?.proteinas + "\n\n" + db.nutricion_general?.carbohidratos;
            if (texto.includes('proteina')) return db.nutricion_general?.proteinas;
            if (texto.includes('agua')) return db.nutricion_general?.hidratacion;
            
            return this.formatearRespuesta(db.nutricion_general);
        }
        
        // ===== PROGRESO =====
        if (seccion === 'progreso') {
            if (texto.includes('imc') && window.auth?.usuarioActual?.datos) {
                const d = window.auth.usuarioActual.datos;
                const imc = (d.peso / ((d.altura/100)*(d.altura/100))).toFixed(1);
                return `📊 Tu IMC es ${imc}. Rango saludable: 18.5-24.9.`;
            }
            if (texto.includes('peso ideal') && window.auth?.usuarioActual?.datos) {
                const d = window.auth.usuarioActual.datos;
                const min = (18.5 * ((d.altura/100)*(d.altura/100))).toFixed(1);
                const max = (24.9 * ((d.altura/100)*(d.altura/100))).toFixed(1);
                return `🎯 Para tu altura (${d.altura} cm), tu peso ideal es entre ${min} kg y ${max} kg.`;
            }
            return "Pregúntame sobre IMC o peso ideal para ayudarte con tu progreso.";
        }
        
        return "¿En qué puedo ayudarte?";
    },

    // ============================================
    // RESPUESTAS PARA MÚSCULOS ESPECÍFICOS
    // ============================================
    generarRespuestaGemelos: function() {
        return {
            titulo: "🦶 **GEMELOS (PANTORRILLAS)**",
            introduccion: "Músculos de la parte posterior de la pierna, importantes para la estabilidad y el empuje.",
            ejercicios: "**Ejercicios principales:**\n• Elevaciones de talones de pie (gemelos)\n• Elevaciones de talones sentado (sóleo)\n• Paseo de granjero de puntillas",
            tecnica: "**Técnica correcta:**\n• Sube hasta quedar de puntillas\n• Aguanta 1-2 seg arriba\n• Baja controlado hasta estirar",
            rutina: "**Rutina ejemplo:**\n• Elevaciones de pie: 4 series de 20-25 reps\n• Elevaciones sentado: 4 series de 20-25 reps\n• Descanso: 30 seg entre series",
            consejos: "**Consejos clave:**\n• Altas repeticiones (20-25)\n• Estira entre series\n• Varía posición de pies",
            resumen: "📌 Elevaciones de pie (gemelo) y sentado (sóleo) con altas repeticiones."
        };
    },

    generarRespuestaAntebrazos: function() {
        return {
            titulo: "✊ **ANTEBRAZOS**",
            introduccion: "Controlan la muñeca y el agarre, esenciales para casi todos los ejercicios.",
            ejercicios: "**Ejercicios:**\n• Curl de muñecas\n• Extensiones de muñecas\n• Agarre de peso muerto\n• Colgado en barra",
            consejos: "**Consejos:**\n• Entrena 2 veces/semana\n• Usa agarres gruesos\n• No descuides extensión"
        };
    },

    generarRespuestaTrapecios: function() {
        return {
            titulo: "🧥 **TRAPECIOS**",
            introduccion: "Parte superior de la espalda y cuello, dan apariencia de 'montaña'.",
            ejercicios: "**Ejercicios:**\n• Encogimientos con mancuernas\n• Remo al mentón\n• Face pull",
            consejos: "**Consejos:**\n• Repeticiones moderadas\n• Combina con espalda"
        };
    },

    generarRespuestaLumbares: function() {
        return {
            titulo: "⚡ **LUMBARES (ESPALDA BAJA)**",
            introduccion: "Erectores espinales, fundamentales para postura y fuerza.",
            ejercicios: "**Ejercicios:**\n• Hiperextensiones\n• Peso muerto\n• Buenos días\n• Superman",
            consejos: "**Consejos:**\n• Fortalece para prevenir lesiones\n• Espalda recta siempre"
        };
    },

    generarRespuestaCuadriceps: function() {
        return {
            titulo: "🦵 **CUÁDRICEPS**",
            introduccion: "Parte frontal del muslo, esencial para empujar y saltar.",
            ejercicios: "**Ejercicios:**\n• Sentadillas\n• Prensa\n• Extensiones\n• Zancadas"
        };
    },

    generarRespuestaFemorales: function() {
        return {
            titulo: "🍗 **FEMORALES**",
            introduccion: "Parte posterior del muslo, importantes para la flexión de rodilla.",
            ejercicios: "**Ejercicios:**\n• Peso muerto rumano\n• Curl femoral\n• Buenos días"
        };
    },

    formatearRespuesta: function(obj) {
        if (!obj) return "Información no disponible";
        
        let respuesta = obj.titulo ? obj.titulo + "\n\n" : "";
        if (obj.introduccion) respuesta += obj.introduccion + "\n\n";
        if (obj.ejercicios) respuesta += obj.ejercicios + "\n\n";
        if (obj.tecnica) respuesta += obj.tecnica + "\n\n";
        if (obj.rutina) respuesta += obj.rutina + "\n\n";
        if (obj.consejos) respuesta += obj.consejos + "\n\n";
        if (obj.anatomia) respuesta += obj.anatomia + "\n\n";
        if (obj.resumen) respuesta += obj.resumen;
        
        return respuesta.replace(/\n/g, '<br>');
    }
};