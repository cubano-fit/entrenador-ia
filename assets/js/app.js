// FUNCIONES PRINCIPALES DE LA APLICACIÓN
window.app = {
    diaSeleccionado: 'L',

    init: function() {
        this.cargarEventos();
        if (window.auth) window.auth.init();
        if (window.training) window.training.init();
    },

    cargarEventos: function() {
        window.onclick = function(event) {
            if (!event.target.matches('#menuBtn')) {
                const dropdown = document.getElementById('menuDropdown');
                if (dropdown) dropdown.classList.remove('show');
            }
        };
    },

    mostrarSeccion: function(seccion) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        if (seccion === 'entrenar') {
            document.querySelectorAll('.nav-btn')[0]?.classList.add('active');
            document.getElementById('entrenar-screen')?.classList.add('active');
        } else if (seccion === 'nutricion') {
            document.querySelectorAll('.nav-btn')[1]?.classList.add('active');
            document.getElementById('nutricion-screen')?.classList.add('active');
        } else if (seccion === 'progreso') {
            document.getElementById('progreso-screen')?.classList.add('active');
            if (window.auth && window.auth.usuarioActual) this.actualizarStatsProgreso();
        }
        this.cerrarMenu();
    },

    toggleMenu: function() {
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) dropdown.classList.toggle('show');
    },

    cerrarMenu: function() {
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) dropdown.classList.remove('show');
    },

    toggleTheme: function() {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
        this.cerrarMenu();
    },

    actualizarPeso: function() {
        if (!window.auth || !window.auth.usuarioActual) { 
            alert('Inicia sesión'); 
            return; 
        }
        const nuevoPeso = document.getElementById('nuevoPeso').value;
        if (!nuevoPeso) { 
            alert('Ingresa un peso'); 
            return; 
        }
        
        window.auth.usuarioActual.datos.peso = nuevoPeso;
        if (window.auth.usuarios && window.auth.usuarioActual.email) {
            window.auth.usuarios[window.auth.usuarioActual.email].datos.peso = nuevoPeso;
        }
        
        localStorage.setItem('usuarios', JSON.stringify(window.auth.usuarios || {}));
        localStorage.setItem('usuarioActual', JSON.stringify(window.auth.usuarioActual));
        
        document.getElementById('progresoStats').innerHTML = `
            <div class="stat-card"><div class="stat-label">⚖️ Peso</div><div class="stat-value">${nuevoPeso} kg</div></div>
        `;
        document.getElementById('nuevoPeso').value = '';
    },

    actualizarStatsProgreso: function() {
        if (!window.auth || !window.auth.usuarioActual || !window.auth.usuarioActual.datos) return;
        
        const datos = window.auth.usuarioActual.datos;
        const alturaM = datos.altura / 100;
        const imc = (datos.peso / (alturaM * alturaM)).toFixed(1);
        
        document.getElementById('progresoStats').innerHTML = `
            <div class="stat-card"><div class="stat-label">⚖️ Peso</div><div class="stat-value">${datos.peso} kg</div></div>
            <div class="stat-card"><div class="stat-label">📊 IMC</div><div class="stat-value">${imc}</div></div>
        `;
    }
};

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    window.app.init();
});