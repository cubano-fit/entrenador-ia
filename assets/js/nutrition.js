// LOGICA DE NUTRICIÓN - VERSIÓN CORREGIDA
window.nutrition = {
    contador: 0,

    // ============================================
    // FUNCIÓN: Obtener objetivo del usuario de forma segura
    // ============================================
    obtenerObjetivoUsuario: function() {
        // Verificar si hay usuario actual
        if (!window.auth || !window.auth.usuarioActual) {
            console.log('No hay usuario logueado');
            return null;
        }
        
        const usuario = window.auth.usuarioActual;
        console.log('Usuario actual:', usuario);
        
        // CASO 1: El usuario tiene propiedad 'datos' (formato antiguo)
        if (usuario.datos && usuario.datos.objetivo) {
            console.log('Objetivo encontrado en datos:', usuario.datos.objetivo);
            return usuario.datos.objetivo;
        }
        
        // CASO 2: El usuario tiene objetivo en la raíz (formato nuevo de admin)
        if (usuario.objetivo) {
            console.log('Objetivo encontrado en raíz:', usuario.objetivo);
            return usuario.objetivo;
        }
        
        // CASO 3: No hay objetivo, usar valor por defecto
        console.log('No se encontró objetivo, usando defecto: definicion');
        return 'definicion';
    },

    // ============================================
    // FUNCIÓN: Generar plan nutricional
    // ============================================
    generarPlan: function() {
        console.log('🎯 Generando plan nutricional...');
        
        // Verificar si hay usuario logueado
        if (!window.auth || !window.auth.usuarioActual) {
            console.log('❌ No hay usuario logueado');
            document.getElementById('nutritionResult').innerHTML = 'Inicia sesión para generar planes';
            return;
        }

        // Verificar que existen los planes nutricionales
        if (!window.planesNutricionales) {
            console.error('❌ window.planesNutricionales no está definido');
            document.getElementById('nutritionResult').innerHTML = 'Error: Planes nutricionales no disponibles';
            return;
        }

        // Obtener objetivo del usuario
        const objetivo = this.obtenerObjetivoUsuario();
        console.log('🎯 Objetivo detectado:', objetivo);
        
        // Obtener los planes según el objetivo
        const planes = window.planesNutricionales[objetivo];
        
        if (!planes) {
            console.error(`❌ No hay planes para el objetivo: ${objetivo}`);
            // Intentar con definicion como fallback
            const planesFallback = window.planesNutricionales.definicion;
            if (planesFallback) {
                console.log('Usando plan de definición como fallback');
                this.mostrarPlan(planesFallback);
                return;
            }
            document.getElementById('nutritionResult').innerHTML = 'No hay planes disponibles';
            return;
        }

        this.mostrarPlan(planes);
    },

    // ============================================
    // FUNCIÓN: Mostrar plan seleccionado
    // ============================================
    mostrarPlan: function(planes) {
        if (!planes || planes.length === 0) {
            document.getElementById('nutritionResult').innerHTML = 'No hay planes disponibles';
            return;
        }

        // Incrementar contador para rotar planes
        this.contador++;
        
        // Seleccionar un plan (rotativo)
        const indice = this.contador % planes.length;
        const plan = planes[indice];
        
        console.log(`Mostrando plan ${indice + 1} de ${planes.length}`);

        // Mostrar el plan
        document.getElementById('nutritionResult').innerHTML = `
            <h3 style="color:var(--primary); margin-bottom:15px;">🥗 Plan nutricional ${indice + 1}/${planes.length}</h3>
            <div class="ejercicio-item">
                <div style="font-weight:bold; color:var(--primary);">🌅 Desayuno</div>
                <div style="padding:8px; background:var(--hover); border-radius:8px; margin-top:5px;">${plan.des}</div>
            </div>
            <div class="ejercicio-item">
                <div style="font-weight:bold; color:var(--primary);">☀️ Almuerzo</div>
                <div style="padding:8px; background:var(--hover); border-radius:8px; margin-top:5px;">${plan.alm}</div>
            </div>
            <div class="ejercicio-item">
                <div style="font-weight:bold; color:var(--primary);">✨ Merienda</div>
                <div style="padding:8px; background:var(--hover); border-radius:8px; margin-top:5px;">${plan.mer}</div>
            </div>
            <div class="ejercicio-item">
                <div style="font-weight:bold; color:var(--primary);">🌙 Cena</div>
                <div style="padding:8px; background:var(--hover); border-radius:8px; margin-top:5px;">${plan.cena}</div>
            </div>
        `;
    }
};

console.log('✅ nutrition.js cargado correctamente');
