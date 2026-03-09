// assets/js/auth.js - VERSIÓN CON EXPIRACIÓN EN usuarios.json
window.auth = {
    usuarios: {},
    usuarioActual: JSON.parse(localStorage.getItem('usuarioActual')) || null,
    GITHUB_TOKEN: 'TU_TOKEN_AQUI', // ¡CAMBIA ESTO!
    OWNER: 'cubano-fit',
    REPO: 'entrenador-ia',

    init: async function() {
        await this.cargarUsuarios();
        
        if (this.usuarioActual) {
            // Verificar que el usuario aún existe
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
    // REGISTRAR ACCESO EN GITHUB
    // ============================================
    registrarAccesoEnGitHub: async function(usuario) {
        const url = `https://api.github.com/repos/${this.OWNER}/${this.REPO}/contents/estadisticas.json`;
        
        try {
            const getResponse = await fetch(url, {
                headers: { 'Authorization': `token ${this.GITHUB_TOKEN}` }
            });
            const fileData = await getResponse.json();
            const sha = fileData.sha;
            const contenidoActual = JSON.parse(atob(fileData.content));
            
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
    // LOGIN (con expiración)
    // ============================================
    iniciarSesion: async function() {
        const usuario = document.getElementById('loginUsuario').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const errorDiv = document.getElementById('loginError');
        
        await this.cargarUsuarios();
        
        const userData = this.usuarios[usuario];
        
        if (userData && userData.password === password) {
            
            // ===== VALIDAR EXPIRACIÓN =====
            if (userData.expiracion) {
                const hoy = new Date();
                const expiracion = new Date(userData.expiracion);
                if (hoy > expiracion) {
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = '❌ Membresía expirada. Contacta al administrador.';
                    return;
                }
            }
            
            // Registrar acceso en GitHub
            await this.registrarAccesoEnGitHub(usuario);
            
            // Guardar datos del usuario (INCLUYE EXPIRACIÓN)
            this.usuarioActual = {
                usuario: usuario,
                nombre: usuario,
                expiracion: userData.expiracion
            };
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
    // PANTALLAS (con expiración visible)
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
            // Mostrar nombre de usuario
            document.getElementById('membershipUser').textContent = this.usuarioActual.nombre || this.usuarioActual.usuario;
            
            // ===== MOSTRAR EXPIRACIÓN =====
            const expireElement = document.getElementById('membershipExpire');
            const daysElement = document.getElementById('membershipDays');
            
            if (this.usuarioActual.expiracion) {
                const expiracion = new Date(this.usuarioActual.expiracion);
                const hoy = new Date();
                const diffTime = expiracion - hoy;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                // Formatear fecha
                expireElement.textContent = expiracion.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                
                // Días restantes con color
                if (diffDays < 0) {
                    daysElement.textContent = 'Expirado';
                    daysElement.style.color = '#e74c3c';
                } else if (diffDays <= 3) {
                    daysElement.textContent = `${diffDays} días ⚠️`;
                    daysElement.style.color = '#e74c3c';
                } else if (diffDays <= 7) {
                    daysElement.textContent = `${diffDays} días`;
                    daysElement.style.color = '#f39c12';
                } else {
                    daysElement.textContent = `${diffDays} días`;
                    daysElement.style.color = '#00a86b';
                }
            } else {
                expireElement.textContent = 'No expira';
                daysElement.textContent = 'Ilimitado';
                daysElement.style.color = '#00a86b';
            }
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
