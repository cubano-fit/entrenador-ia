// LOGICA DE NUTRICIÓN - VERSIÓN DEFINITIVA
window.nutrition = {
    contador: 0,

    // ============================================
    // FUNCIÓN: Obtener datos del usuario de forma segura
    // ============================================
    obtenerDatosUsuario: function() {
        // Verificar si hay usuario actual
        if (!window.auth || !window.auth.usuarioActual) {
            console.log('No hay usuario logueado');
            return null;
        }
        
        const usuario = window.auth.usuarioActual;
        console.log('Usuario actual:', usuario); // Para debug
        
        // CASO 1: El usuario tiene propiedad 'datos' (formato antiguo)
        if (usuario.datos) {
            console.log('Usando formato con datos');
            return usuario.datos;
        }
        
        // CASO 2: El usuario tiene los datos en la raíz (formato nuevo)
        if (usuario.nombre || usuario.edad || usuario.peso || usuario.altura) {
            console.log('Usando formato sin datos');
            return {
                nombre: usuario.nombre || 'Usuario',
                sexo: usuario.sexo || 'hombre',
                edad: usuario.edad || 30,
                peso: usuario.peso || 70,
                altura: usuario.altura || 170,
                objetivo: usuario.objetivo || 'definicion',
                equipo: usuario.equipo || 'cuerpo',
                nivel: usuario.nivel || 'intermedio'
            };
        }
        
        // CASO 3: El usuario es el objeto completo (otro formato)
        console.log('Usando usuario completo');
        return {
            nombre: usuario.nombre || 'Usuario',
            sexo: usuario.sexo || 'hombre',
            edad: usuario.edad || 30,
            peso: usuario.peso || 70,
            altura: usuario.altura || 170,
            objetivo: usuario.objetivo || 'definicion',
            equipo: usuario.equipo || 'cuerpo',
            nivel: usuario.nivel || 'intermedio'
        };
    },

    // ============================================
    // FUNCIÓN: Generar plan nutricional
    // ============================================
    generarPlan: function() {
        console.log('Generando plan nutricional...');
        
        // Verificar si hay usuario logueado
        if (!window.auth || !window.auth.usuarioActual) {
            console.log('No hay usuario - mostrando login');
            document.getElementById('nutritionResult').innerHTML = 'Inicia sesión para generar planes';
            if (window.auth && window.auth.showLoginModal) {
                window.auth.showLoginModal();
            }
            return;
        }

        // Obtener datos del usuario
        const datos = this.obtenerDatosUsuario();
        console.log('Datos obtenidos:', datos);
        
        if (!datos) {
            console.error('No se pudieron obtener datos del usuario');
            document.getElementById('nutritionResult').innerHTML = '<p style="color:#e74c3c;">❌ Error: No se pudieron cargar tus datos. Intenta cerrar sesión y volver a entrar.</p>';
            return;
        }

        // Obtener objetivo (con valor por defecto)
        const objetivo = datos.objetivo || 'definicion';
        console.log('Objetivo detectado:', objetivo);

        // Verificar que existen los planes nutricionales
        if (!window.planesNutricionales) {
            console.error('ERROR: window.planesNutricionales no está definido');
            console.log('Contenido de window:', Object.keys(window));
            document.getElementById('nutritionResult').innerHTML = '<p style="color:#e74c3c;">❌ Error: Base de datos de nutrición no disponible</p>';
            return;
        }

        console.log('Planes disponibles:', Object.keys(window.planesNutricionales));

        // Obtener los planes según el objetivo
        const planes = window.planesNutricionales[objetivo] || window.planesNutricionales.definicion;
        
        if (!planes || planes.length === 0) {
            console.error(`No hay planes para el objetivo: ${objetivo}`);
            document.getElementById('nutritionResult').innerHTML = `<p style="color:#e74c3c;">❌ No hay planes disponibles para tu objetivo: ${objetivo}</p>`;
            return;
        }

        console.log(`Encontrados ${planes.length} planes para ${objetivo}`);

        // Incrementar contador para rotar planes
        this.contador++;
        
        // Seleccionar un plan (rotativo)
        const indice = this.contador % planes.length;
        const plan = planes[indice];
        
        console.log(`Mostrando plan ${indice + 1} de ${planes.length}`);

        // Mostrar el plan con formato mejorado
        document.getElementById('nutritionResult').innerHTML = `
            <div style="margin-bottom:15px;">
                <h3 style="color:var(--primary); margin-bottom:10px;">🥗 Plan nutricional</h3>
                <div style="background:var(--primary); color:white; padding:5px 10px; border-radius:20px; display:inline-block; font-size:0.9em; margin-bottom:15px;">
                    ${indice + 1}/${planes.length} • ${objetivo}
                </div>
            </div>
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

// Para debug: Mostrar en consola cuando carga
console.log('✅ nutrition.js cargado correctamente');
console.log('planesNutricionales disponible:', !!window.planesNutricionales);
