// LOGICA DE ENTRENAMIENTO - VERSIÓN SIN LOGIN
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
        const perfil = JSON.parse(localStorage.getItem('cliente_perfil'));
        return perfil || null;
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
