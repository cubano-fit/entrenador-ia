// LOGICA DE NUTRICIÓN - VERSIÓN CORREGIDA
window.nutrition = {
    contador: 0,

    // ============================================
    // FUNCIÓN NUEVA: Obtener objetivo del usuario (con o sin "datos")
    // ============================================
    obtenerObjetivoUsuario: function() {
        if (!window.auth || !window.auth.usuarioActual) return null;
        
        const usuario = window.auth.usuarioActual;
        
        // Si tiene la propiedad 'datos', obtener objetivo de allí
        if (usuario.datos) {
            return usuario.datos.objetivo || 'definicion';
        }
        
        // Si no, el objetivo está en la raíz
        return usuario.objetivo || 'definicion';
    },

    generarPlan: function() {
        // Verificar si hay usuario logueado
        if (!window.auth || !window.auth.usuarioActual) {
            alert('Debes iniciar sesión');
            if (window.auth && window.auth.showLoginModal) {
                window.auth.showLoginModal();
            } else {
                // Fallback si no existe showLoginModal
                document.getElementById('nutritionResult').innerHTML = 'Inicia sesión para generar planes';
            }
            return;
        }

        // Incrementar contador para rotar planes
        this.contador++;
        
        // Obtener el objetivo del usuario
        const objetivo = this.obtenerObjetivoUsuario();
        
        // Verificar que existen los planes nutricionales
        if (!window.planesNutricionales) {
            console.error('Error: window.planesNutricionales no está definido');
            document.getElementById('nutritionResult').innerHTML = 'Error: Planes nutricionales no disponibles';
            return;
        }
        
        // Obtener los planes según el objetivo
        const planes = window.planesNutricionales[objetivo] || window.planesNutricionales.definicion;
        
        if (!planes || planes.length === 0) {
            console.error(`Error: No hay planes para el objetivo ${objetivo}`);
            document.getElementById('nutritionResult').innerHTML = 'No hay planes disponibles para tu objetivo';
            return;
        }
        
        // Seleccionar un plan (rotativo)
        const plan = planes[this.contador % planes.length];
        
        // Mostrar el plan
        document.getElementById('nutritionResult').innerHTML = `
            <h3>🥗 Plan nutricional (Opción ${this.contador})</h3>
            <div class="ejercicio-item"><strong>🌅 Desayuno:</strong> ${plan.des}</div>
            <div class="ejercicio-item"><strong>☀️ Almuerzo:</strong> ${plan.alm}</div>
            <div class="ejercicio-item"><strong>✨ Merienda:</strong> ${plan.mer}</div>
            <div class="ejercicio-item"><strong>🌙 Cena:</strong> ${plan.cena}</div>
            <p style="margin-top:10px; font-size:0.9em; color:var(--text-secondary);">Basado en objetivo: ${objetivo}</p>
        `;
    }
};