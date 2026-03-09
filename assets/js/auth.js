// assets/js/auth.js - VERSIÓN CON VERIFICACIÓN CONTINUA
window.auth = {
    usuarios: {},
    usuarioActual: JSON.parse(localStorage.getItem('usuarioActual')) || null,
    GITHUB_TOKEN: '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',
    OWNER: 'cubano-fit',
    REPO: 'entrenador-ia',
    intervaloVerificacion: null,

    init: async function() {
        await this.cargarUsuarios();
        
        if (this.usuarioActual) {
            // Verificar que el usuario aún existe al iniciar
            const existe = await this.verificarUsuarioExiste(this.usuarioActual.usuario);
            if (existe) {
                // Cargar equipo guardado
                const perfilGuardado = JSON.parse(localStorage.getItem('perfil_' + this.usuarioActual.usuario));
                if (perfilGuardado && perfilGuardado.equipo) {
                    localStorage.setItem('equipo_usuario', perfilGuardado.equipo);
                }
                this.mostrarContenidoPrincipal();
                this.iniciarVerificacionPeriodica(); // ← NUEVO
            } else {
                this.cerrarSesionForzada('Usuario eliminado del sistema');
            }
        } else {
            this.mostrarPantallaLogin();
        }
    },

    // ============================================
    // NUEVO: Verificar si usuario existe en JSON
    // ============================================
    verificarUsuarioExiste: async function(usuario) {
        await this.cargarUsuarios(); // Recargar usuarios desde GitHub
        return this.usuarios[usuario] ? true : false;
    },

    // ============================================
    // NUEVO: Verificación periódica
    // ============================================
    iniciarVerificacionPeriodica: function() {
        // Limpiar intervalo anterior si existe
        if (this.intervaloVerificacion) {
            clearInterval(this.intervaloVerificacion);
        }
        
        // Verificar cada 30 segundos
        this.intervaloVerificacion = setInterval(async () => {
            if (!this.usuarioActual) return;
            
            const existe = await this.verificarUsuarioExiste(this.usuarioActual.usuario);
            if (!existe) {
                this.cerrarSesionForzada('Tu usuario ha sido eliminado del sistema');
            }
        }, 30000); // 30 segundos
        
        // También verificar cuando la pestaña recupera el foco
        window.addEventListener('focus', async () => {
            if (!this.usuarioActual) return;
            
            const existe = await this.verificarUsuarioExiste(this.usuarioActual.usuario);
            if (!existe) {
                this.cerrarSesionForzada('Tu usuario ha sido eliminado del sistema');
            }
        });
    },

    // ============================================
    // Cargar usuarios desde JSON
    // ============================================
    cargarUsuarios: async function() {
        try {
            const respuesta = await fetch('usuarios.json?_=' + Date.now());
            this.usuarios = await respuesta.json();
            console.log('✅ Usuarios cargados:', Object.keys(this.usuarios).length);
            return this.usuarios;
        } catch (error) {
            console.error('❌ Error cargando usuarios:', error);
            this.usuarios = {};
            return {};
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
            
            if (!getResponse.ok) {
                console.log('⚠️ No se pudo leer estadísticas, creando archivo...');
                const nuevoContenido = btoa(JSON.stringify({}, null, 2));
                
                await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.GITHUB_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: 'Inicializando estadísticas',
                        content: nuevoContenido
                    })
                });
                return;
            }
            
            const fileData = await getResponse.json();
            const sha = fileData.sha;
            
            let contenidoActual = {};
            try {
                contenidoActual = JSON.parse(atob(fileData.content));
            } catch (e) {
                contenidoActual = {};
            }
            
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
            
            const putResponse = await fetch(url, {
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
            
            if (putResponse.ok) {
                console.log('✅ Acceso registrado en GitHub');
            } else {
                console.log('⚠️ No se pudo registrar acceso');
            }
        } catch (error) {
            console.log('⚠️ Error registrando acceso (no crítico):', error.message);
        }
    },

    // ============================================
    // LOGIN
    // ============================================
    iniciarSesion: async function() {
        const usuario = document.getElementById('loginUsuario').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const errorDiv = document.getElementById('loginError');
        
        const usuarioLimpio = usuario.trim();
        const passwordLimpio = password.trim();
        
        await this.cargarUsuarios();
        
        const userData = this.usuarios[usuarioLimpio];
        
        if (!userData) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = '❌ Usuario no existe';
            return;
        }
        
        if (userData.password === passwordLimpio) {
            
            if (userData.expiracion) {
                const hoy = new Date();
                const expiracion = new Date(userData.expiracion);
                if (hoy > expiracion) {
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = '❌ Membresía expirada';
                    return;
                }
            }
            
            try {
                await this.registrarAccesoEnGitHub(usuarioLimpio);
            } catch (e) {
                console.log('⚠️ No se pudo registrar acceso, pero el login continúa');
            }
            
            this.usuarioActual = {
                usuario: usuarioLimpio,
                nombre: userData.nombre || usuarioLimpio,
                expiracion: userData.expiracion
            };
            localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
            
            const perfilGuardado = JSON.parse(localStorage.getItem('perfil_' + usuarioLimpio));
            if (perfilGuardado && perfilGuardado.equipo) {
                localStorage.setItem('equipo_usuario', perfilGuardado.equipo);
            }
            
            this.mostrarContenidoPrincipal();
            this.iniciarVerificacionPeriodica(); // ← Iniciar verificación
            errorDiv.style.display = 'none';
        } else {
            errorDiv.style.display = 'block';
            errorDiv.textContent = '❌ Contraseña incorrecta';
        }
    },

    // ============================================
    // CERRAR SESIÓN
    // ============================================
    cerrarSesion: function() {
        if (confirm('¿Cerrar sesión?')) {
            if (this.intervaloVerificacion) {
                clearInterval(this.intervaloVerificacion);
            }
            this.usuarioActual = null;
            localStorage.removeItem('usuarioActual');
            localStorage.removeItem('equipo_usuario');
            this.mostrarPantallaLogin();
        }
    },

    cerrarSesionForzada: function(mensaje) {
        if (this.intervaloVerificacion) {
            clearInterval(this.intervaloVerificacion);
        }
        this.usuarioActual = null;
        localStorage.removeItem('usuarioActual');
        localStorage.removeItem('equipo_usuario');
        this.mostrarPantallaLogin();
        alert(`⚠️ ${mensaje || 'Sesión cerrada'}`);
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
            
            const expireElement = document.getElementById('membershipExpire');
            const daysElement = document.getElementById('membershipDays');
            
            if (this.usuarioActual.expiracion) {
                const expiracion = new Date(this.usuarioActual.expiracion);
                const hoy = new Date();
                const diffTime = expiracion - hoy;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                expireElement.textContent = expiracion.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                
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
    // PERFIL
    // ============================================
    mostrarPerfil: function() {
        if (!this.usuarioActual) return;
        
        const key = 'perfil_' + this.usuarioActual.usuario;
        const perfil = JSON.parse(localStorage.getItem(key)) || {};
        
        document.getElementById('perfilNombre').textContent = this.usuarioActual.nombre || this.usuarioActual.usuario;
        
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
        
        localStorage.setItem('equipo_usuario', perfil.equipo);
        console.log('✅ Equipo guardado:', perfil.equipo);
        
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
