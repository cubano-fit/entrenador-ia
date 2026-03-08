// LOGICA DE NUTRICIÓN
window.nutrition = {
    contador: 0,

    generarPlan: function() {
        if (!window.auth.usuarioActual) {
            alert('Debes iniciar sesión');
            window.auth.showLoginModal();
            return;
        }
        this.contador++;
        const objetivo = window.auth.usuarioActual.datos.objetivo;
        const planes = window.planesNutricionales[objetivo] || window.planesNutricionales.definicion;
        const plan = planes[this.contador % planes.length];
        
        document.getElementById('nutritionResult').innerHTML = `
            <h3>🥗 Plan nutricional (Opción ${this.contador + 1})</h3>
            <div class="ejercicio-item"><strong>🌅 Desayuno:</strong> ${plan.des}</div>
            <div class="ejercicio-item"><strong>☀️ Almuerzo:</strong> ${plan.alm}</div>
            <div class="ejercicio-item"><strong>✨ Merienda:</strong> ${plan.mer}</div>
            <div class="ejercicio-item"><strong>🌙 Cena:</strong> ${plan.cena}</div>
        `;
    }
};