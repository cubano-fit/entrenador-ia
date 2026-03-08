// BASE DE DATOS COMPLETA DE EJERCICIOS
window.ejerciciosDB = {
    // ==================== TORSO ====================
    
    // ----- PECHO -----
    pecho: {
        cuerpo: [
            { nombre: "Flexiones de pecho", series: "4x15", descanso: "60 seg", consejo: "Mantén el cuerpo recto, baja hasta casi tocar suelo" },
            { nombre: "Flexiones inclinadas", series: "4x12", descanso: "60 seg", consejo: "Pies en alto, enfatiza pecho superior" },
            { nombre: "Flexiones declinadas", series: "4x10", descanso: "60 seg", consejo: "Manos en alto, enfatiza pecho inferior" },
            { nombre: "Flexiones diamante", series: "3x10", descanso: "60 seg", consejo: "Manos juntas, enfoca tríceps y pecho interno" },
            { nombre: "Flexiones abiertas", series: "4x12", descanso: "60 seg", consejo: "Manos más separadas que hombros" },
            { nombre: "Flexiones cerradas", series: "4x10", descanso: "60 seg", consejo: "Manos debajo del pecho" },
            { nombre: "Flexiones con palmada", series: "3x8", descanso: "90 seg", consejo: "Explosivas, para potencia" },
            { nombre: "Flexiones archer", series: "3x8", descanso: "90 seg", consejo: "Un brazo se estira mientras el otro flexiona" },
            { nombre: "Flexiones en pica", series: "3x10", descanso: "60 seg", consejo: "Cadera arriba, para hombros y pecho" },
            { nombre: "Flexiones Spiderman", series: "3x10", descanso: "60 seg", consejo: "Lleva rodilla al codo en cada rep" },
            { nombre: "Plancha con toque de hombro", series: "3x30 seg", descanso: "45 seg", consejo: "Alterna tocándote los hombros" },
            { nombre: "Flexiones con rodillas", series: "3x15", descanso: "45 seg", consejo: "Para principiantes o para quemar" },
            { nombre: "Flexiones con pies elevados", series: "4x12", descanso: "60 seg", consejo: "Más difícil, enfoca pecho superior" },
            { nombre: "Flexiones con aplauso trasero", series: "3x6", descanso: "90 seg", consejo: "Máxima explosividad" },
            { nombre: "Dips en suelo", series: "3x12", descanso: "60 seg", consejo: "Manos detrás, dedos hacia glúteos" }
        ],
        mancuernas: [
            { nombre: "Press banca con mancuernas", series: "4x10", descanso: "90 seg", consejo: "Baja controlado, sube explosivo" },
            { nombre: "Press inclinado con mancuernas", series: "4x10", descanso: "90 seg", consejo: "Banco a 30-45° para pecho superior" },
            { nombre: "Press declinado con mancuernas", series: "4x10", descanso: "90 seg", consejo: "Banco inclinado hacia abajo" },
            { nombre: "Aperturas con mancuernas", series: "3x12", descanso: "60 seg", consejo: "Brazos ligeramente flexionados" },
            { nombre: "Aperturas inclinadas", series: "3x12", descanso: "60 seg", consejo: "En banco inclinado" },
            { nombre: "Aperturas declinadas", series: "3x12", descanso: "60 seg", consejo: "En banco declinado" },
            { nombre: "Pull-over con mancuerna", series: "3x12", descanso: "60 seg", consejo: "Acostado, pasa la mancuerna detrás" },
            { nombre: "Press alterno con mancuernas", series: "4x10", descanso: "60 seg", consejo: "Alterna brazos para más estabilidad" },
            { nombre: "Contractor isométrico", series: "3x20 seg", descanso: "45 seg", consejo: "Junta mancuernas frente al pecho" },
            { nombre: "Press con agarre neutro", series: "4x10", descanso: "90 seg", consejo: "Palmas enfrentadas" },
            { nombre: "Flexiones con mancuernas", series: "4x12", descanso: "60 seg", consejo: "Manos sobre mancuernas, más rango" },
            { nombre: "Remo al pecho con mancuernas", series: "4x10", descanso: "60 seg", consejo: "Acostado en banco, variante de pecho" },
            { nombre: "Cruce de mancuernas", series: "3x12", descanso: "60 seg", consejo: "De pie, cruza brazos frente al pecho" },
            { nombre: "Press con mancuernas en suelo", series: "4x10", descanso: "60 seg", consejo: "Limita el rango, protege hombros" },
            { nombre: "Flexiones con remo", series: "3x10", descanso: "90 seg", consejo: "Flexión + remo, combinación" }
        ],
        gym: [
            { nombre: "Press banca con barra", series: "4x8", descanso: "120 seg", consejo: "Barra a la altura pezones, no rebotes" },
            { nombre: "Press banca inclinado", series: "4x8", descanso: "120 seg", consejo: "Banco 30°, para pecho superior" },
            { nombre: "Press banca declinado", series: "4x8", descanso: "120 seg", consejo: "Banco -15°, para pecho inferior" },
            { nombre: "Press en máquina", series: "4x10", descanso: "60 seg", consejo: "Controla el movimiento" },
            { nombre: "Aperturas en polea alta", series: "3x12", descanso: "60 seg", consejo: "Cruza brazos frente al cuerpo" },
            { nombre: "Aperturas en polea baja", series: "3x12", descanso: "60 seg", consejo: "Para pecho superior" },
            { nombre: "Cruces en polea", series: "3x15", descanso: "60 seg", consejo: "Brazos ligeramente flexionados" },
            { nombre: "Fondos en paralelas", series: "4x10", descanso: "90 seg", consejo: "Inclínate adelante para pecho" },
            { nombre: "Fondos asistidos", series: "4x12", descanso: "60 seg", consejo: "Máquina de contrapeso" },
            { nombre: "Press en máquina inclinado", series: "4x10", descanso: "60 seg", consejo: "Para pecho superior" },
            { nombre: "Contractor en máquina", series: "3x15", descanso: "60 seg", consejo: "Aprieta al final del movimiento" },
            { nombre: "Pull-over en polea", series: "3x12", descanso: "60 seg", consejo: "Con cuerda, para serrato y pecho" },
            { nombre: "Press banca con agarre cerrado", series: "4x8", descanso: "90 seg", consejo: "Para pecho interno y tríceps" },
            { nombre: "Press banca con agarre abierto", series: "4x8", descanso: "90 seg", consejo: "Para pecho externo" },
            { nombre: "Flexiones en máquina Smith", series: "4x10", descanso: "60 seg", consejo: "Apoya manos en barra fija" }
        ]
    },

    // ----- DORSALES (Espalda ancha) -----
    dorsales: {
        cuerpo: [
            { nombre: "Dominadas negativas", series: "4x6", descanso: "90 seg", consejo: "Sube con salto, baja lento (3-5 seg)" },
            { nombre: "Remo con sábana", series: "4x12", descanso: "60 seg", consejo: "Sujeta sábana a barra o puerta" },
            { nombre: "Superman", series: "3x15", descanso: "45 seg", consejo: "Acostado boca abajo, sube brazos y piernas" },
            { nombre: "Remo invertido", series: "4x12", descanso: "60 seg", consejo: "Debajo de mesa, hazte hacia arriba" },
            { nombre: "Plancha con remo", series: "3x12", descanso: "60 seg", consejo: "En plancha, toca hombro contrario" },
            { nombre: "Remo a una mano con toalla", series: "4x12", descanso: "60 seg", consejo: "Toalla en puerta, tira de ella" },
            { nombre: "Puente de glúteos", series: "3x20", descanso: "45 seg", consejo: "También trabaja espalda baja" },
            { nombre: "Pájaro sin peso", series: "3x15", descanso: "45 seg", consejo: "Inclinado, abre brazos como alas" },
            { nombre: "Remo con mochila", series: "4x12", descanso: "60 seg", consejo: "Mochila con libros, inclinado" },
            { nombre: "Dominadas australianas", series: "4x12", descanso: "60 seg", consejo: "En barra baja, cuerpo inclinado" }
        ],
        mancuernas: [
            { nombre: "Remo con mancuerna", series: "4x12", descanso: "60 seg", consejo: "Apoya rodilla y mano en banco" },
            { nombre: "Remo a dos manos", series: "4x12", descanso: "60 seg", consejo: "Inclinado, con ambas mancuernas" },
            { nombre: "Pull-over con mancuerna", series: "3x12", descanso: "60 seg", consejo: "Acostado, para dorsal" },
            { nombre: "Peso muerto con mancuernas", series: "4x10", descanso: "90 seg", consejo: "Espalda recta siempre" },
            { nombre: "Remo con apoyo de pecho", series: "4x12", descanso: "60 seg", consejo: "Acostado en banco inclinado" },
            { nombre: "Remo en banco plano", series: "4x12", descanso: "60 seg", consejo: "Acostado boca abajo en banco" },
            { nombre: "Encogimientos con mancuernas", series: "4x15", descanso: "45 seg", consejo: "Para trapecios" },
            { nombre: "Pájaros con mancuernas", series: "3x15", descanso: "45 seg", consejo: "Inclinado, eleva brazos" },
            { nombre: "Remo en posición de puente", series: "4x12", descanso: "60 seg", consejo: "En puente de glúteos, rema" },
            { nombre: "Remo a un brazo en banco", series: "4x12", descanso: "60 seg", consejo: "Variante con banco" }
        ],
        gym: [
            { nombre: "Dominadas con agarre abierto", series: "4x8", descanso: "90 seg", consejo: "Para dorsal ancho" },
            { nombre: "Dominadas con agarre cerrado", series: "4x8", descanso: "90 seg", consejo: "Para espalda media" },
            { nombre: "Dominadas tras nuca", series: "4x8", descanso: "90 seg", consejo: "Cuidado con hombros" },
            { nombre: "Remo con barra", series: "4x12", descanso: "60 seg", consejo: "Inclinado, lleva barra al pecho" },
            { nombre: "Remo en T", series: "4x10", descanso: "90 seg", consejo: "Máquina de remo T" },
            { nombre: "Remo en máquina", series: "4x12", descanso: "60 seg", consejo: "Controla el movimiento" },
            { nombre: "Jalón al pecho", series: "4x12", descanso: "60 seg", consejo: "En polea alta, lleva al pecho" },
            { nombre: "Jalón tras nuca", series: "4x10", descanso: "90 seg", consejo: "Solo si tienes movilidad" },
            { nombre: "Jalón con agarre cerrado", series: "4x12", descanso: "60 seg", consejo: "Para espalda media" },
            { nombre: "Pull-over en polea", series: "3x12", descanso: "60 seg", consejo: "Con cuerda, para dorsal" },
            { nombre: "Remo en polea baja", series: "4x12", descanso: "60 seg", consejo: "Con agarre V" },
            { nombre: "Remo en polea alta", series: "4x12", descanso: "60 seg", consejo: "De pie, jalón hacia abajo" },
            { nombre: "Hiperextensiones", series: "3x15", descanso: "45 seg", consejo: "Para espalda baja" },
            { nombre: "Peso muerto", series: "4x8", descanso: "120 seg", consejo: "Espalda recta siempre" },
            { nombre: "Peso muerto sumo", series: "4x8", descanso: "120 seg", consejo: "Piernas abiertas, más glúteo" }
        ]
    },

    // ----- TRAPECIOS -----
    trapecios: {
        cuerpo: [
            { nombre: "Encogimientos de hombros", series: "4x20", descanso: "45 seg", consejo: "Sube y baja hombros" },
            { nombre: "Plancha con elevación de hombros", series: "3x30 seg", descanso: "45 seg", consejo: "En plancha, eleva hombros" },
            { nombre: "Círculos de hombros", series: "3x20", descanso: "30 seg", consejo: "Grandes círculos hacia atrás" },
            { nombre: "Remo invertido con énfasis", series: "4x12", descanso: "60 seg", consejo: "En barra baja, sube hombros" }
        ],
        mancuernas: [
            { nombre: "Encogimientos con mancuernas", series: "4x15", descanso: "45 seg", consejo: "Mancuernas a los lados, sube hombros" },
            { nombre: "Remo alto con mancuernas", series: "4x12", descanso: "60 seg", consejo: "Lleva mancuernas a la barbilla" },
            { nombre: "Pájaros con mancuernas", series: "3x15", descanso: "45 seg", consejo: "También trabaja trapecios" },
            { nombre: "Press militar", series: "4x10", descanso: "60 seg", consejo: "Trabaja trapecios indirectamente" }
        ],
        gym: [
            { nombre: "Encogimientos con barra", series: "4x12", descanso: "45 seg", consejo: "Barra al frente, sube hombros" },
            { nombre: "Encogimientos tras nuca", series: "4x12", descanso: "45 seg", consejo: "Barra detrás" },
            { nombre: "Remo al cuello con barra", series: "4x10", descanso: "90 seg", consejo: "Cuidado con hombros" },
            { nombre: "Face pull", series: "3x15", descanso: "60 seg", consejo: "En polea, lleva a la cara" },
            { nombre: "Remo en máquina con énfasis", series: "4x12", descanso: "60 seg", consejo: "Enfoca en subir hombros" }
        ]
    },

    // ----- ROMBOIDES -----
    romboides: {
        cuerpo: [
            { nombre: "Pájaros sin peso", series: "3x15", descanso: "45 seg", consejo: "Inclinado, abre brazos" },
            { nombre: "Plancha con aperturas", series: "3x12", descanso: "45 seg", consejo: "En plancha, abre y cierra brazos" },
            { nombre: "Remo invertido cerrado", series: "4x12", descanso: "60 seg", consejo: "Agarrar cerrado, junta omóplatos" }
        ],
        mancuernas: [
            { nombre: "Pájaros con mancuernas", series: "3x15", descanso: "45 seg", consejo: "Inclinado, abre brazos" },
            { nombre: "Remo con mancuerna cerrado", series: "4x12", descanso: "60 seg", consejo: "Enfoca en juntar omóplatos" },
            { nombre: "Y raises", series: "3x12", descanso: "45 seg", consejo: "Acostado boca abajo, brazos en Y" }
        ],
        gym: [
            { nombre: "Pájaros en máquina", series: "3x15", descanso: "60 seg", consejo: "Para deltoides posterior y romboides" },
            { nombre: "Remo en polea cerrado", series: "4x12", descanso: "60 seg", consejo: "Con agarre cerrado, junta omóplatos" },
            { nombre: "Face pull", series: "3x15", descanso: "60 seg", consejo: "Excelente para romboides" }
        ]
    },

    // ----- DELTOIDES (Hombros) -----
    deltoides: {
        cuerpo: [
            { nombre: "Flexiones pike", series: "4x10", descanso: "60 seg", consejo: "Cadera arriba, forma V invertida" },
            { nombre: "Plancha invertida", series: "3x30 seg", descanso: "45 seg", consejo: "Mira al techo, empuja con brazos" },
            { nombre: "Círculos de brazos", series: "3x20", descanso: "30 seg", consejo: "Grandes círculos" },
            { nombre: "Pájaros sin peso", series: "3x15", descanso: "45 seg", consejo: "Inclinado, abre brazos" },
            { nombre: "Plancha lateral", series: "3x30 seg", descanso: "45 seg", consejo: "Apoyo en antebrazo" },
            { nombre: "Flexiones parado de manos", series: "3x5", descanso: "120 seg", consejo: "Contra la pared" },
            { nombre: "Aperturas de pie", series: "3x15", descanso: "45 seg", consejo: "Sin peso, abre brazos" },
            { nombre: "Elevaciones frontales", series: "3x15", descanso: "45 seg", consejo: "Sin peso, sube brazos al frente" },
            { nombre: "Elevaciones laterales", series: "3x15", descanso: "45 seg", consejo: "Sin peso, sube brazos a los lados" }
        ],
        mancuernas: [
            { nombre: "Press militar con mancuernas", series: "4x10", descanso: "90 seg", consejo: "Sentado o de pie" },
            { nombre: "Press Arnold", series: "4x10", descanso: "90 seg", consejo: "Rotación de muñecas" },
            { nombre: "Elevaciones laterales", series: "3x15", descanso: "45 seg", consejo: "Sube hasta altura hombros" },
            { nombre: "Elevaciones frontales", series: "3x12", descanso: "45 seg", consejo: "Alterna o con ambas" },
            { nombre: "Pájaros con mancuernas", series: "3x15", descanso: "45 seg", consejo: "Para deltoides posterior" },
            { nombre: "Press de hombros a una mano", series: "4x10", descanso: "60 seg", consejo: "Mayor estabilidad" },
            { nombre: "Elevaciones inclinadas", series: "3x12", descanso: "45 seg", consejo: "Acostado de lado" },
            { nombre: "Remo al mentón", series: "4x12", descanso: "60 seg", consejo: "Lleva mancuernas a la barbilla" },
            { nombre: "Círculos con mancuernas", series: "3x12", descanso: "45 seg", consejo: "Brazos extendidos, círculos" }
        ],
        gym: [
            { nombre: "Press militar con barra", series: "4x8", descanso: "120 seg", consejo: "Barra al frente" },
            { nombre: "Press tras nuca", series: "4x8", descanso: "120 seg", consejo: "Solo si tienes movilidad" },
            { nombre: "Press en máquina", series: "4x10", descanso: "60 seg", consejo: "Controla el movimiento" },
            { nombre: "Elevaciones laterales en polea", series: "3x15", descanso: "45 seg", consejo: "Controla la bajada" },
            { nombre: "Elevaciones frontales en polea", series: "3x12", descanso: "45 seg", consejo: "Con cuerda" },
            { nombre: "Pájaros en máquina", series: "3x15", descanso: "60 seg", consejo: "Para deltoides posterior" },
            { nombre: "Face pull", series: "3x15", descanso: "60 seg", consejo: "En polea, a la cara" },
            { nombre: "Remo al mentón en polea", series: "4x12", descanso: "60 seg", consejo: "Con barra recta" },
            { nombre: "Press con agarre neutro", series: "4x10", descanso: "90 seg", consejo: "Menos tensión en hombros" }
        ]
    },

    // ==================== BRAZOS ====================
    
    // ----- BÍCEPS -----
    biceps: {
        cuerpo: [
            { nombre: "Curl de bíceps sin peso", series: "3x20", descanso: "45 seg", consejo: "Contracción máxima" },
            { nombre: "Curl de agarre martillo", series: "3x15", descanso: "45 seg", consejo: "Palmas enfrentadas" },
            { nombre: "Dominadas con agarre supino", series: "4x8", descanso: "90 seg", consejo: "Palmas hacia ti, más bíceps" },
            { nombre: "Remo invertido supino", series: "4x12", descanso: "60 seg", consejo: "En barra baja, palmas hacia ti" },
            { nombre: "Curl con toalla", series: "3x15", descanso: "45 seg", consejo: "Toalla en puerta, tira" }
        ],
        mancuernas: [
            { nombre: "Curl de bíceps", series: "4x12", descanso: "60 seg", consejo: "No balances el cuerpo" },
            { nombre: "Curl martillo", series: "4x12", descanso: "60 seg", consejo: "Palmas enfrentadas" },
            { nombre: "Curl concentrado", series: "3x15", descanso: "45 seg", consejo: "Apoya brazo en pierna" },
            { nombre: "Curl en banco inclinado", series: "4x12", descanso: "60 seg", consejo: "Estiramiento máximo" },
            { nombre: "Curl alterno", series: "4x12", descanso: "60 seg", consejo: "Alterna brazos" },
            { nombre: "Curl 21", series: "3x21", descanso: "60 seg", consejo: "7 abajo, 7 arriba, 7 completas" },
            { nombre: "Curl con agarre prono", series: "3x12", descanso: "60 seg", consejo: "Palmas abajo, para braquial" },
            { nombre: "Curl spider", series: "4x12", descanso: "60 seg", consejo: "Acostado en banco inclinado" }
        ],
        gym: [
            { nombre: "Curl con barra Z", series: "4x10", descanso: "60 seg", consejo: "Barra Z, menos tensión muñecas" },
            { nombre: "Curl con barra recta", series: "4x10", descanso: "60 seg", consejo: "Barra recta, clásico" },
            { nombre: "Curl en predicador", series: "4x12", descanso: "60 seg", consejo: "Aísla el bíceps" },
            { nombre: "Curl en polea baja", series: "4x12", descanso: "60 seg", consejo: "Con cuerda o barra" },
            { nombre: "Curl en máquina", series: "4x12", descanso: "60 seg", consejo: "Máquina de bíceps" },
            { nombre: "Curl con cable a una mano", series: "4x12", descanso: "60 seg", consejo: "Para mayor aislamiento" },
            { nombre: "Curl inclinado en polea", series: "4x12", descanso: "60 seg", consejo: "En banco inclinado" }
        ]
    },

    // ----- TRÍCEPS -----
    triceps: {
        cuerpo: [
            { nombre: "Flexiones cerradas", series: "4x12", descanso: "60 seg", consejo: "Manos juntas para tríceps" },
            { nombre: "Fondos en silla", series: "4x15", descanso: "60 seg", consejo: "Manos en silla, pies en suelo" },
            { nombre: "Fondos con pies elevados", series: "4x12", descanso: "60 seg", consejo: "Más difícil" },
            { nombre: "Extensiones de tríceps", series: "3x15", descanso: "45 seg", consejo: "Detrás de la cabeza, sin peso" },
            { nombre: "Patada de tríceps sin peso", series: "3x15", descanso: "45 seg", consejo: "Inclinado, extiende brazo" },
            { nombre: "Plancha con movimiento", series: "3x12", descanso: "45 seg", consejo: "En plancha, flexiona codos" }
        ],
        mancuernas: [
            { nombre: "Extensiones de tríceps", series: "4x12", descanso: "60 seg", consejo: "Detrás de la cabeza" },
            { nombre: "Patada de tríceps", series: "4x12", descanso: "60 seg", consejo: "Inclinado, brazo paralelo" },
            { nombre: "Press francés", series: "4x10", descanso: "60 seg", consejo: "Acostado, con mancuernas" },
            { nombre: "Press francés a una mano", series: "4x10", descanso: "60 seg", consejo: "Mayor aislamiento" },
            { nombre: "Extensiones con dos manos", series: "4x12", descanso: "60 seg", consejo: "Misma mancuerna con dos manos" },
            { nombre: "Press de banca cerrado", series: "4x10", descanso: "60 seg", consejo: "Con mancuernas, manos juntas" }
        ],
        gym: [
            { nombre: "Press francés con barra", series: "4x10", descanso: "60 seg", consejo: "Acostado, barra Z" },
            { nombre: "Press banca agarre cerrado", series: "4x8", descanso: "90 seg", consejo: "Barra, manos juntas" },
            { nombre: "Extensiones en polea", series: "4x15", descanso: "45 seg", consejo: "Con cuerda" },
            { nombre: "Extensiones en polea a una mano", series: "4x12", descanso: "60 seg", consejo: "Mayor aislamiento" },
            { nombre: "Extensiones en polea invertidas", series: "4x12", descanso: "60 seg", consejo: "Agarre prono" },
            { nombre: "Fondos en máquina", series: "4x12", descanso: "60 seg", consejo: "Máquina de fondos" },
            { nombre: "Fondos con peso", series: "4x10", descanso: "90 seg", consejo: "Añade disco" },
            { nombre: "Extensiones en máquina", series: "4x12", descanso: "60 seg", consejo: "Máquina de tríceps" }
        ]
    },

    // ----- BRAQUIAL (Músculo entre bíceps y tríceps) -----
    braquial: {
        cuerpo: [
            { nombre: "Curl martillo sin peso", series: "3x15", descanso: "45 seg", consejo: "Palmas enfrentadas" },
            { nombre: "Curl con agarre prono", series: "3x15", descanso: "45 seg", consejo: "Palmas abajo" }
        ],
        mancuernas: [
            { nombre: "Curl martillo", series: "4x12", descanso: "60 seg", consejo: "Excelente para braquial" },
            { nombre: "Curl con agarre prono", series: "4x12", descanso: "60 seg", consejo: "Palmas abajo" },
            { nombre: "Curl cruzado", series: "4x12", descanso: "60 seg", consejo: "Mancuerna cruzando el cuerpo" }
        ],
        gym: [
            { nombre: "Curl martillo en polea", series: "4x12", descanso: "60 seg", consejo: "Con cuerda" },
            { nombre: "Curl con barra prono", series: "4x10", descanso: "60 seg", consejo: "Barra, agarre prono" }
        ]
    },

    // ----- ANTEBRAZOS -----
    antebrazos: {
        cuerpo: [
            { nombre: "Colgado en barra", series: "3x30 seg", descanso: "45 seg", consejo: "Solo colgado" },
            { nombre: "Curl de muñecas sin peso", series: "3x20", descanso: "30 seg", consejo: "Con palmas arriba" },
            { nombre: "Extensiones de muñecas", series: "3x20", descanso: "30 seg", consejo: "Con palmas abajo" },
            { nombre: "Agarre de toalla", series: "3x30 seg", descanso: "45 seg", consejo: "Aprieta toalla" }
        ],
        mancuernas: [
            { nombre: "Curl de muñecas", series: "4x15", descanso: "30 seg", consejo: "Antebrazos sobre muslos" },
            { nombre: "Extensiones de muñecas", series: "4x15", descanso: "30 seg", consejo: "Palmas abajo" },
            { nombre: "Curl invertido", series: "4x12", descanso: "45 seg", consejo: "Con mancuernas, palmas abajo" },
            { nombre: "Agarrar y sostener", series: "3x30 seg", descanso: "45 seg", consejo: "Sostén mancuerna pesada" }
        ],
        gym: [
            { nombre: "Curl de muñecas con barra", series: "4x15", descanso: "30 seg", consejo: "Barra, palmas arriba" },
            { nombre: "Extensiones con barra", series: "4x15", descanso: "30 seg", consejo: "Barra, palmas abajo" },
            { nombre: "Curl invertido con barra", series: "4x12", descanso: "45 seg", consejo: "Barra, agarre prono" },
            { nombre: "Agarrar disco", series: "3x30 seg", descanso: "45 seg", consejo: "Sostén disco con pinza" }
        ]
    },

    // ==================== PIERNAS ====================
    
    // ----- CUÁDRICEPS -----
    cuadriceps: {
        cuerpo: [
            { nombre: "Sentadillas", series: "4x20", descanso: "60 seg", consejo: "Baja como si fueras a sentarte" },
            { nombre: "Sentadillas búlgaras", series: "3x12", descanso: "60 seg", consejo: "Pie trasero en silla" },
            { nombre: "Zancadas alternas", series: "4x15", descanso: "45 seg", consejo: "Alterna piernas" },
            { nombre: "Zancadas laterales", series: "3x12", descanso: "45 seg", consejo: "Para aductores también" },
            { nombre: "Sentadillas sumo", series: "4x15", descanso: "60 seg", consejo: "Piernas abiertas" },
            { nombre: "Sentadillas con salto", series: "3x12", descanso: "60 seg", consejo: "Explosivas" },
            { nombre: "Step ups", series: "3x15", descanso: "45 seg", consejo: "Sube a una silla" },
            { nombre: "Sentadilla isométrica", series: "3x45 seg", descanso: "45 seg", consejo: "Contra la pared" },
            { nombre: "Patada de glúteo", series: "3x15", descanso: "30 seg", consejo: "A cuatro patas" }
        ],
        mancuernas: [
            { nombre: "Sentadillas con mancuernas", series: "4x15", descanso: "60 seg", consejo: "Mancuernas a los lados" },
            { nombre: "Sentadilla copa", series: "4x12", descanso: "60 seg", consejo: "Mancuerna al pecho" },
            { nombre: "Sentadilla búlgara con peso", series: "3x12", descanso: "60 seg", consejo: "Con mancuernas" },
            { nombre: "Zancadas con mancuernas", series: "4x12", descanso: "45 seg", consejo: "Mancuernas a los lados" },
            { nombre: "Step ups con peso", series: "3x12", descanso: "60 seg", consejo: "Sube a banco con peso" },
            { nombre: "Sentadilla frontal", series: "4x12", descanso: "60 seg", consejo: "Mancuerna al pecho" }
        ],
        gym: [
            { nombre: "Sentadilla con barra", series: "4x10", descanso: "120 seg", consejo: "Barra sobre trampas" },
            { nombre: "Sentadilla frontal", series: "4x10", descanso: "120 seg", consejo: "Barra al frente" },
            { nombre: "Hack squat", series: "4x12", descanso: "90 seg", consejo: "Máquina" },
            { nombre: "Prensa de piernas", series: "4x15", descanso: "60 seg", consejo: "No bloquees rodillas" },
            { nombre: "Extensiones de cuádriceps", series: "4x15", descanso: "45 seg", consejo: "Máquina" },
            { nombre: "Sentadilla en máquina Smith", series: "4x10", descanso: "90 seg", consejo: "Controla el movimiento" },
            { nombre: "Zancadas con barra", series: "3x12", descanso: "60 seg", consejo: "Barra sobre hombros" }
        ]
    },

    // ----- ISQUIOTIBIALES / FEMORALES -----
    femorales: {
        cuerpo: [
            { nombre: "Peso muerto a una pierna", series: "3x12", descanso: "45 seg", consejo: "Sin peso, equilibrio" },
            { nombre: "Puente de glúteos", series: "4x20", descanso: "45 seg", consejo: "Sube cadera" },
            { nombre: "Puente a una pierna", series: "3x15", descanso: "45 seg", consejo: "Más difícil" },
            { nombre: "Patada de glúteo", series: "3x15", descanso: "30 seg", consejo: "A cuatro patas" },
            { nombre: "Buenos días", series: "3x12", descanso: "60 seg", consejo: "Inclinado, sin peso" }
        ],
        mancuernas: [
            { nombre: "Peso muerto rumano", series: "4x12", descanso: "60 seg", consejo: "Espalda recta" },
            { nombre: "Peso muerto a una pierna", series: "3x12", descanso: "45 seg", consejo: "Con mancuerna" },
            { nombre: "Buenos días con mancuerna", series: "4x12", descanso: "60 seg", consejo: "Mancuerna en pecho" },
            { nombre: "Curl femoral tumbado", series: "3x12", descanso: "45 seg", consejo: "Con mancuerna entre pies" }
        ],
        gym: [
            { nombre: "Peso muerto", series: "4x8", descanso: "120 seg", consejo: "Excelente para femorales" },
            { nombre: "Peso muerto rumano", series: "4x10", descanso: "90 seg", consejo: "Piernas casi rectas" },
            { nombre: "Curl femoral tumbado", series: "4x15", descanso: "45 seg", consejo: "Máquina" },
            { nombre: "Curl femoral sentado", series: "4x15", descanso: "45 seg", consejo: "Máquina sentado" },
            { nombre: "Buenos días con barra", series: "4x10", descanso: "90 seg", consejo: "Barra sobre hombros" }
        ]
    },

    // ----- GLÚTEOS -----
    gluteos: {
        cuerpo: [
            { nombre: "Puente de glúteos", series: "4x20", descanso: "45 seg", consejo: "Sube cadera, contrae" },
            { nombre: "Puente a una pierna", series: "3x15", descanso: "45 seg", consejo: "Más intenso" },
            { nombre: "Patada de glúteo", series: "4x15", descanso: "30 seg", consejo: "A cuatro patas" },
            { nombre: "Abducción de cadera", series: "3x15", descanso: "30 seg", consejo: "De lado" },
            { nombre: "Sentadillas", series: "4x20", descanso: "60 seg", consejo: "Baja profundo" },
            { nombre: "Zancadas", series: "4x15", descanso: "45 seg", consejo: "Pasos largos" },
            { nombre: "Sentadilla sumo", series: "4x15", descanso: "60 seg", consejo: "Piernas abiertas" },
            { nombre: "Patada de glúteo con rodilla", series: "3x15", descanso: "30 seg", consejo: "Eleva rodilla también" }
        ],
        mancuernas: [
            { nombre: "Hip thrust con mancuerna", series: "4x15", descanso: "60 seg", consejo: "Mancuerna sobre cadera" },
            { nombre: "Peso muerto rumano", series: "4x12", descanso: "60 seg", consejo: "Enfoque en glúteos" },
            { nombre: "Sentadillas con peso", series: "4x15", descanso: "60 seg", consejo: "Mancuernas" },
            { nombre: "Zancadas con peso", series: "4x12", descanso: "45 seg", consejo: "Pasos largos" },
            { nombre: "Abducción con mancuerna", series: "3x15", descanso: "30 seg", consejo: "Mancuerna en muslo" }
        ],
        gym: [
            { nombre: "Hip thrust con barra", series: "4x12", descanso: "90 seg", consejo: "Mejor para glúteos" },
            { nombre: "Peso muerto", series: "4x8", descanso: "120 seg", consejo: "Enfoque en glúteos" },
            { nombre: "Sentadilla profunda", series: "4x10", descanso: "90 seg", consejo: "Baja mucho" },
            { nombre: "Prensa de piernas alto", series: "4x15", descanso: "60 seg", consejo: "Pies arriba" },
            { nombre: "Abducción en máquina", series: "4x15", descanso: "45 seg", consejo: "Máquina de glúteos" },
            { nombre: "Patada de glúteo en polea", series: "3x15", descanso: "45 seg", consejo: "Con tobillera" }
        ]
    },

    // ----- ADUCTORES (Parte interna muslo) -----
    aductores: {
        cuerpo: [
            { nombre: "Sentadillas sumo", series: "4x15", descanso: "60 seg", consejo: "Piernas abiertas" },
            { nombre: "Zancadas laterales", series: "4x12", descanso: "45 seg", consejo: "Alterna" },
            { nombre: "Apertura de piernas", series: "3x15", descanso: "30 seg", consejo: "Acostado boca arriba" },
            { nombre: "Juntar piernas", series: "3x20", descanso: "30 seg", consejo: "Con banda elástica" }
        ],
        mancuernas: [
            { nombre: "Sentadilla sumo con peso", series: "4x12", descanso: "60 seg", consejo: "Mancuerna entre piernas" },
            { nombre: "Zancadas laterales con peso", series: "3x12", descanso: "45 seg", consejo: "Mancuerna" }
        ],
        gym: [
            { nombre: "Aductores en máquina", series: "4x15", descanso: "45 seg", consejo: "Máquina de aductores" },
            { nombre: "Sentadilla sumo con barra", series: "4x10", descanso: "90 seg", consejo: "Barra sobre hombros" }
        ]
    },

    // ----- ABDUCTORES (Parte externa cadera) -----
    abductores: {
        cuerpo: [
            { nombre: "Abducción de cadera", series: "3x15", descanso: "30 seg", consejo: "De lado" },
            { nombre: "Concha", series: "3x15", descanso: "30 seg", consejo: "Rodillas flexionadas, abre piernas" },
            { nombre: "Plancha con abducción", series: "3x12", descanso: "45 seg", consejo: "En plancha lateral" }
        ],
        mancuernas: [
            { nombre: "Abducción con mancuerna", series: "3x15", descanso: "30 seg", consejo: "Mancuerna en muslo" }
        ],
        gym: [
            { nombre: "Abductores en máquina", series: "4x15", descanso: "45 seg", consejo: "Máquina de abductores" }
        ]
    },

    // ----- GEMELOS / PANTORRILLAS -----
    gemelos: {
        cuerpo: [
            { nombre: "Elevaciones de talones", series: "4x25", descanso: "30 seg", consejo: "De pie" },
            { nombre: "Elevaciones sentado", series: "4x20", descanso: "30 seg", consejo: "En silla" },
            { nombre: "Saltos a la cuerda", series: "3x1 min", descanso: "30 seg", consejo: "Cardio y gemelos" },
            { nombre: "Paseo de granjero", series: "3x30 seg", descanso: "45 seg", consejo: "De puntillas" }
        ],
        mancuernas: [
            { nombre: "Elevaciones con mancuernas", series: "4x20", descanso: "30 seg", consejo: "De pie" },
            { nombre: "Elevaciones sentado con peso", series: "4x15", descanso: "30 seg", consejo: "Mancuernas en muslos" },
            { nombre: "Paseo de granjero con peso", series: "3x30 seg", descanso: "45 seg", consejo: "De puntillas" }
        ],
        gym: [
            { nombre: "Elevaciones en máquina", series: "4x20", descanso: "30 seg", consejo: "Máquina de gemelos" },
            { nombre: "Elevaciones en prensa", series: "4x25", descanso: "30 seg", consejo: "En prensa de piernas" },
            { nombre: "Elevaciones con barra", series: "4x15", descanso: "30 seg", consejo: "Barra sobre hombros" }
        ]
    },

    // ==================== CORE ====================
    
    // ----- ABDOMINALES -----
    abdominales: {
        cuerpo: [
            { nombre: "Crunch", series: "4x20", descanso: "30 seg", consejo: "En suelo, sube hombros" },
            { nombre: "Crunch invertido", series: "4x15", descanso: "30 seg", consejo: "Eleva piernas" },
            { nombre: "Plancha", series: "4x45 seg", descanso: "45 seg", consejo: "Mantén cuerpo recto" },
            { nombre: "Plancha lateral", series: "3x30 seg", descanso: "45 seg", consejo: "Cada lado" },
            { nombre: "Elevación de piernas", series: "4x15", descanso: "30 seg", consejo: "Acostado" },
            { nombre: "Bicicleta", series: "4x20", descanso: "30 seg", consejo: "Codo a rodilla contraria" },
            { nombre: "Russian twists", series: "4x20", descanso: "30 seg", consejo: "Gira torso" },
            { nombre: "Mountain climbers", series: "3x30 seg", descanso: "30 seg", consejo: "Cardio y core" },
            { nombre: "V-ups", series: "3x12", descanso: "45 seg", consejo: "Forma V" },
            { nombre: "Abdominales en V", series: "3x15", descanso: "45 seg", consejo: "Piernas y brazos arriba" },
            { nombre: "Toque de talones", series: "4x20", descanso: "30 seg", consejo: "Acostado, toca talones" },
            { nombre: "Escaladores", series: "3x30 seg", descanso: "30 seg", consejo: "Rápidos" }
        ],
        mancuernas: [
            { nombre: "Russian twists con peso", series: "4x20", descanso: "30 seg", consejo: "Con mancuerna" },
            { nombre: "Crunch con mancuerna", series: "4x15", descanso: "45 seg", consejo: "Mancuerna al pecho" },
            { nombre: "Plancha con peso", series: "3x30 seg", descanso: "45 seg", consejo: "Disco en espalda" },
            { nombre: "Elevaciones con peso", series: "4x12", descanso: "45 seg", consejo: "Mancuerna entre pies" }
        ],
        gym: [
            { nombre: "Crunch en máquina", series: "4x15", descanso: "30 seg", consejo: "Máquina de abdominales" },
            { nombre: "Elevaciones en máquina", series: "4x15", descanso: "30 seg", consejo: "Para abdominales inferiores" },
            { nombre: "Plancha con peso", series: "3x45 seg", descanso: "45 seg", consejo: "Disco en espalda" },
            { nombre: "Russian twists en polea", series: "4x15", descanso: "30 seg", consejo: "Con cuerda" }
        ]
    },

    // ----- OBLICUOS -----
    oblicuos: {
        cuerpo: [
            { nombre: "Crunch lateral", series: "4x15", descanso: "30 seg", consejo: "Acostado de lado" },
            { nombre: "Plancha lateral", series: "3x30 seg", descanso: "45 seg", consejo: "Cada lado" },
            { nombre: "Russian twists", series: "4x20", descanso: "30 seg", consejo: "Gira bien" },
            { nombre: "Bicicleta", series: "4x20", descanso: "30 seg", consejo: "Para oblicuos" },
            { nombre: "Inclinaciones laterales", series: "4x15", descanso: "30 seg", consejo: "De pie, inclínate" }
        ],
        mancuernas: [
            { nombre: "Inclinaciones laterales con peso", series: "4x15", descanso: "30 seg", consejo: "Mancuerna en una mano" },
            { nombre: "Russian twists con peso", series: "4x20", descanso: "30 seg", consejo: "Mancuerna" }
        ],
        gym: [
            { nombre: "Inclinaciones en polea", series: "4x15", descanso: "30 seg", consejo: "En polea baja" },
            { nombre: "Crunch lateral en máquina", series: "4x15", descanso: "30 seg", consejo: "Máquina" }
        ]
    },

    // ----- TRANSVERSO ABDOMINAL -----
    transverso: {
        cuerpo: [
            { nombre: "Vacuums", series: "3x30 seg", descanso: "30 seg", consejo: "Mete el ombligo hacia adentro" },
            { nombre: "Plancha", series: "4x30 seg", descanso: "30 seg", consejo: "Activa transverso" },
            { nombre: "Perro de pájaro", series: "3x12", descanso: "30 seg", consejo: "Estabilidad" }
        ],
        mancuernas: [
            { nombre: "Plancha con peso", series: "3x30 seg", descanso: "45 seg", consejo: "Activa transverso" }
        ],
        gym: []
    },

    // ----- LUMBARES (Erectores espinales) -----
    lumbares: {
        cuerpo: [
            { nombre: "Superman", series: "4x15", descanso: "45 seg", consejo: "Sube brazos y piernas" },
            { nombre: "Puente de glúteos", series: "4x20", descanso: "45 seg", consejo: "También lumbar" },
            { nombre: "Perro de pájaro", series: "3x12", descanso: "30 seg", consejo: "Brazo y pierna contrarios" },
            { nombre: "Buenos días sin peso", series: "3x15", descanso: "60 seg", consejo: "Inclínate" }
        ],
        mancuernas: [
            { nombre: "Buenos días con mancuerna", series: "4x12", descanso: "60 seg", consejo: "Mancuerna al pecho" },
            { nombre: "Peso muerto", series: "4x10", descanso: "90 seg", consejo: "Fortalece lumbares" }
        ],
        gym: [
            { nombre: "Hiperextensiones", series: "4x15", descanso: "45 seg", consejo: "Banco de hiperextensiones" },
            { nombre: "Hiperextensiones con peso", series: "4x12", descanso: "60 seg", consejo: "Con disco" },
            { nombre: "Peso muerto", series: "4x8", descanso: "120 seg", consejo: "Fortalece lumbares" }
        ]
    }
};