// assets/js/auth.js - VERSIÓN SIN LOGIN NI ADMIN
window.auth = {
    usuarioActual: null,

    init: function() {
        // Verificar si ya hay un perfil guardado
        const perfilGuardado = localStorage.getItem('cliente_perfil');
        
        if (perfilGuardado) {
            // Ya tiene perfil, mostrar contenido principal
            this.usuarioActual = JSON.parse(perfilGuardado);
            this.mostrarContenidoPrincipal();
        } else {
            // No tiene perfil, mostrar pantalla de registro
            this.mostrarPantallaRegistro();
        }
    },

    // ============================================
    // PANTALLAS
    // ============================================
    mostrarPantallaRegistro: function() {
        document.getElementById('welcome-screen').style.display = 'flex';
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('membershipFooter').style.display = 'none';
    },

    mostrarContenidoPrincipal: function() {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('membershipFooter').style.display = 'block';
        
        if (this.usuarioActual) {
            document.getElementById('membershipUser').textContent = this.usuarioActual.nombre || 'Usuario';
        }
        
        if (window.app) window.app.actualizarProgresoCompleto();
    },

    // ============================================
    // REGISTRO DE NUEVO CLIENTE
    // ============================================
    registrarCliente: function() {
        const nombre = document.getElementById('regNombre').value.trim();
        const edad = document.getElementById('regEdad').value.trim();
        const peso = document.getElementById('regPeso').value.trim();
        const altura = document.getElementById('regAltura').value.trim();
        const sexo = document.getElementById('regSexo').value;
        const nivel = document.getElementById('regNivel').value;
        const objetivo = document.getElementById('regObjetivo').value;
        const equipo = document.getElementById('regEquipo').value;
        const errorDiv = document.getElementById('regError');
        
        // Validaciones básicas
        if (!nombre || !edad || !peso || !altura) {
            errorDiv.style.display = 'block';
            return;
        }
        
        // Crear perfil del cliente
        this.usuarioActual = {
            nombre: nombre,
            edad: parseInt(edad),
            peso: parseFloat(peso),
            altura: parseInt(altura),
            sexo: sexo,
            nivel: nivel,
            objetivo: objetivo,
            equipo: equipo
        };
        
        // Guardar en localStorage
        localStorage.setItem('cliente_perfil', JSON.stringify(this.usuarioActual));
        localStorage.setItem('equipo_usuario', equipo);
        
        // Inicializar historial de pesos
        if (!localStorage.getItem('historial_pesos')) {
            localStorage.setItem('historial_pesos', JSON.stringify([]));
        }
        
        this.mostrarContenidoPrincipal();
        errorDiv.style.display = 'none';
    },

    // ============================================
    // PERFIL
    // ============================================
    mostrarPerfil: function() {
        if (!this.usuarioActual) return;
        
        document.getElementById('perfilNombre').textContent = this.usuarioActual.nombre || '';
        document.getElementById('perfilEdad').value = this.usuarioActual.edad || '';
        document.getElementById('perfilPeso').value = this.usuarioActual.peso || '';
        document.getElementById('perfilAltura').value = this.usuarioActual.altura || '';
        document.getElementById('perfilSexo').value = this.usuarioActual.sexo || 'hombre';
        document.getElementById('perfilNivel').value = this.usuarioActual.nivel || 'intermedio';
        document.getElementById('perfilObjetivo').value = this.usuarioActual.objetivo || 'hipertrofia';
        document.getElementById('perfilEquipo').value = this.usuarioActual.equipo || 'gym';
        
        document.getElementById('perfilModal').classList.add('show');
        
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) dropdown.classList.remove('show');
    },

    guardarPerfil: function() {
        if (!this.usuarioActual) return;
        
        this.usuarioActual.edad = document.getElementById('perfilEdad').value;
        this.usuarioActual.peso = document.getElementById('perfilPeso').value;
        this.usuarioActual.altura = document.getElementById('perfilAltura').value;
        this.usuarioActual.sexo = document.getElementById('perfilSexo').value;
        this.usuarioActual.nivel = document.getElementById('perfilNivel').value;
        this.usuarioActual.objetivo = document.getElementById('perfilObjetivo').value;
        this.usuarioActual.equipo = document.getElementById('perfilEquipo').value;
        
        localStorage.setItem('cliente_perfil', JSON.stringify(this.usuarioActual));
        localStorage.setItem('equipo_usuario', this.usuarioActual.equipo);
        
        document.getElementById('perfilModal').classList.remove('show');
        alert('✅ Perfil guardado');
        
        if (window.app) window.app.actualizarProgresoCompleto();
    },

    cerrarPerfil: function() {
        document.getElementById('perfilModal').classList.remove('show');
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    window.auth.init();
});
