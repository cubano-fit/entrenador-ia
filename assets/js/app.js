// assets/js/app.js
window.app = {
    diaSeleccionado: 'L',

    init: function() {
        this.cargarEventos();
        this.cargarTemaGuardado(); // <-- NUEVO: Cargar tema al iniciar
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

    // ============================================
    // FUNCIONES PARA EL TEMA (MODO OSCURO/CLARO)
    // ============================================
    
    cargarTemaGuardado: function() {
        const temaGuardado = localStorage.getItem('tema');
        if (temaGuardado === 'dark') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
    },

    toggleTheme: function() {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('tema', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('tema', 'light');
        }
        this.cerrarMenu();
    },

    mostrarSeccion: function(seccion) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        if (seccion === 'entrenar') {
            document.querySelectorAll('.tab-btn')[0]?.classList.add('active');
            document.getElementById('entrenar-screen')?.classList.add('active');
        } else if (seccion === 'nutricion') {
            document.querySelectorAll('.tab-btn')[1]?.classList.add('active');
            document.getElementById('nutricion-screen')?.classList.add('active');
        } else if (seccion === 'progreso') {
            document.querySelectorAll('.tab-btn')[2]?.classList.add('active');
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
        
        const datos = window.auth.usuarioActual.datos || window.auth.usuarioActual;
        datos.peso = nuevoPeso;
        
        // Actualizar en el objeto de usuarios
        const usuarioKey = window.auth.usuarioActual.usuarioKey || window.auth.usuarioActual.email;
        if (usuarioKey && window.auth.usuarios[usuarioKey]) {
            if (window.auth.usuarios[usuarioKey].datos) {
                window.auth.usuarios[usuarioKey].datos.peso = nuevoPeso;
            } else {
                window.auth.usuarios[usuarioKey].peso = nuevoPeso;
            }
        }
        
        localStorage.setItem('usuarios', JSON.stringify(window.auth.usuarios || {}));
        localStorage.setItem('usuarioActual', JSON.stringify(window.auth.usuarioActual));
        
        this.actualizarStatsProgreso();
        document.getElementById('nuevoPeso').value = '';
    },

    actualizarStatsProgreso: function() {
        if (!window.auth || !window.auth.usuarioActual) return;
        
        const datos = window.auth.usuarioActual.datos || window.auth.usuarioActual;
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