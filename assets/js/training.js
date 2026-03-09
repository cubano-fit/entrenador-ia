// LOGICA DE ENTRENAMIENTO - VERSIÓN CORREGIDA
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
        this.cargarSelectorMusculos();
    },

    // ============================================
    // FUNCIÓN: Obtener datos del usuario de forma segura
    // ============================================
    obtenerDatosUsuario: function() {
        if (!window.auth || !window.auth.usuarioActual) {
            console.log('No hay usuario logueado');
            return null;
        }
        
        const usuario = window.auth.usuarioActual;
        console.log('Usuario actual en training:', usuario);
        
        // CASO 1: Tiene propiedad 'datos'
        if (usuario.datos) {
            return usuario.datos;
        }
        
        // CASO 2: Datos en la raíz
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
        // ... (tu código existente de cargarSelectorMusculos) ...
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

    // ... (el resto de tus funciones: getSexoEmoji, getObjetivoEmoji, etc.) ...
    
    generarPlan: function() {
        console.log('💪 Generando rutina...');
        
        if (!window.auth || !window.auth.usuarioActual) {
            alert('Debes iniciar sesión');
            return;
        }
        
        const datos = this.obtenerDatosUsuario();
        if (!datos) {
            document.getElementById('workoutResult').innerHTML = '<p>Error: No se pudieron cargar tus datos</p>';
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

    generarPlanSemanalPorDia: function(dia, datos) {
        // Tu código existente pero usando 'datos' que ya viene resuelto
        const sexo = datos.sexo || 'hombre';
        const nivel = datos.nivel || 'intermedio';
        const objetivo = datos.objetivo || 'hipertrofia';
        const equipo = datos.equipo || 'cuerpo';
        
        // ... resto de tu código ...
        
        document.getElementById('workoutResult').innerHTML = 'Rutina generada (implementa el resto)';
    },

    generarPlanPorMusculo: function(musculo, datos) {
        // Similar a la anterior
        document.getElementById('workoutResult').innerHTML = 'Rutina generada (implementa el resto)';
    },

    seleccionarDia: function(dia) {
        if (!window.app) window.app = { diaSeleccionado: dia };
        else window.app.diaSeleccionado = dia;
        
        document.querySelectorAll('.dia-btn').forEach(btn => btn.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        
        if (document.getElementById('trainingTipoPlan').value === 'semanal') {
            const datos = this.obtenerDatosUsuario();
            if (datos) {
                this.generarPlanSemanalPorDia(dia, datos);
            }
        }
    }
};
