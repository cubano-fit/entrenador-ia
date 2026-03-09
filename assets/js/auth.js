// assets/js/auth.js - VERSIÓN CON GITHUB API
window.auth = {
    usuarios: {},
    usuarioActual: JSON.parse(localStorage.getItem('usuarioActual')) || null,
    GITHUB_TOKEN: 'TU_TOKEN_AQUI', // ¡CAMBIA ESTO!
    OWNER: 'cubano-fit',
    REPO: 'entrenador-ia',

    init: async function() {
        await this.cargarUsuarios();
        
        if (this.usuarioActual) {
            if (this.usuarios[this.usuarioActual.usuario]) {
                this.mostrarContenidoPrincipal();
            } else {
                this.cerrarSesionForzada();
            }
        } else {
            this.mostrarPantallaLogin();
        }
    },

    // ============================================
    // Cargar usuarios desde JSON
    // ============================================
    cargarUsuarios: async function() {
        try {
            const respuesta = await fetch('usuarios.json?_=' + Date.now());
            this.usuarios = await respuesta.json();
            console.log('✅ Usuarios cargados:', Object.keys(this.usuarios).length);
        } catch (error) {
            console.error('❌ Error cargando usuarios:', error);
            this.usuarios = {};
        }
    },

    // ============================================
    // REGISTRAR ACCESO EN GITHUB (NUEVO)
    // ============================================
    registrarAccesoEnGitHub: async function(usuario) {
        const url = `https://api.github.com/repos/${this.OWNER}/${this.REPO}/contents/estadisticas.json`;
        
        try {
            // 1. Obtener archivo actual y su SHA
            const getResponse = await fetch(url, {
                headers: { 'Authorization': `token ${this.GITHUB_TOKEN}` }
            });
            const fileData = await getResponse.json();
            const sha = fileData.sha;
            
            // 2. Decodificar contenido actual
            const contenidoActual = JSON.parse(atob(fileData.content));
            
            // 3. Actualizar estadísticas
            const hoy = new Date().toISOString();
            if (!contenidoActual[usuario]) {
                contenidoActual[usuario] = {
                    accesos: 0,
                    primerAcceso: hoy,
                    ultimoAcceso: null
                };
            }
            
            contenidoActual[usuario].accesos++;
            contenidoActual[usuario].ultimoAcceso = hoy;
            
            // 4. Guardar en GitHub
            const nuevoContenido = btoa(JSON.stringify(contenidoActual, null, 2));
            
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Acceso de ${usuario}`,
                    content: nuevoContenido,
                    sha: sha
                })
            });
            
            console.log('✅ Acceso registrado en GitHub');
        } catch (error) {
            console.error('❌ Error registrando acceso:', error);
        }
    },

    // ============================================
    // LOGIN
    // ============================================
    iniciarSesion: async function() {
        const usuario = document.getElementById('loginUsuario').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const errorDiv = document.getElementById('loginError');
        
        await this.cargarUsuarios();
        
        if (this.usuarios[usuario] && this.usuarios[usuario] === password) {
            
            // REGISTRAR ACCESO EN GITHUB
            await this.registrarAccesoEnGitHub(usuario);
            
            this.usuarioActual = { usuario: usuario, nombre: usuario };
            localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
            
            this.mostrarContenidoPrincipal();
            errorDiv.style.display = 'none';
        } else {
            errorDiv.style.display = 'block';
            errorDiv.textContent = '❌ Usuario o contraseña incorrectos';
        }
    },

    // ============================================
    // CERRAR SESIÓN
    // ============================================
    cerrarSesion: function() {
        if (confirm('¿Cerrar sesión?')) {
            this.usuarioActual = null;
            localStorage.removeItem('usuarioActual');
            this.mostrarPantallaLogin();
        }
    },

    cerrarSesionForzada: function() {
        this.usuarioActual = null;
        localStorage.removeItem('usuarioActual');
        this.mostrarPantallaLogin();
        alert('⚠️ Tu usuario ya no existe. Contacta al administrador.');
    },

    // ============================================
    // PANTALLAS
    // ============================================
    mostrarPantallaLogin: function() {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('membershipFooter').style.display = 'none';
    },

    mostrarContenidoPrincipal: function() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('membershipFooter').style.display = 'block';
        
        if (this.usuarioActual) {
            document.getElementById('membershipUser').textContent = this.usuarioActual.nombre || this.usuarioActual.usuario;
        }
        if (window.app) window.app.actualizarStatsProgreso();
    },

    // ============================================
    // PERFIL (datos en localStorage del cliente)
    // ============================================
    mostrarPerfil: function() {
        if (!this.usuarioActual) return;
        
        const key = 'perfil_' + this.usuarioActual.usuario;
        const perfil = JSON.parse(localStorage.getItem(key)) || {};
        
        document.getElementById('perfilNombre').value = perfil.nombre || '';
        document.getElementById('perfilEdad').value = perfil.edad || '';
        document.getElementById('perfilPeso').value = perfil.peso || '';
        document.getElementById('perfilAltura').value = perfil.altura || '';
        document.getElementById('perfilSexo').value = perfil.sexo || 'hombre';
        document.getElementById('perfilNivel').value = perfil.nivel || 'intermedio';
        document.getElementById('perfilObjetivo').value = perfil.objetivo || 'hipertrofia';
        document.getElementById('perfilEquipo').value = perfil.equipo || 'gym';
        
        document.getElementById('perfilModal').classList.add('show');
    },

    guardarPerfil: function() {
        if (!this.usuarioActual) return;
        
        const perfil = {
            nombre: document.getElementById('perfilNombre').value,
            edad: document.getElementById('perfilEdad').value,
            peso: document.getElementById('perfilPeso').value,
            altura: document.getElementById('perfilAltura').value,
            sexo: document.getElementById('perfilSexo').value,
            nivel: document.getElementById('perfilNivel').value,
            objetivo: document.getElementById('perfilObjetivo').value,
            equipo: document.getElementById('perfilEquipo').value
        };
        
        const key = 'perfil_' + this.usuarioActual.usuario;
        localStorage.setItem(key, JSON.stringify(perfil));
        
        document.getElementById('perfilModal').classList.remove('show');
        alert('✅ Perfil guardado');
    },

    cerrarPerfil: function() {
        document.getElementById('perfilModal').classList.remove('show');
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    window.auth.init();
});
