// assets/js/auth.js
window.auth = {
    usuarios: JSON.parse(localStorage.getItem('usuarios')) || {},
    usuarioActual: JSON.parse(localStorage.getItem('usuarioActual')) || null,

    init: function() {
        // Verificar si hay usuario actual y si aún existe
        if (this.usuarioActual) {
            if (!this.verificarUsuarioExiste()) {
                this.cerrarSesionForzada();
                return;
            }
            if (!this.verificarMembresiaActiva()) {
                this.cerrarSesionForzada();
                return;
            }
            this.mostrarContenidoPrincipal();
            this.actualizarInfoMembresia();
        } else {
            this.mostrarPantallaLogin();
        }
    },

    // ============================================
    // NUEVAS FUNCIONES DE VERIFICACIÓN
    // ============================================
    
    verificarUsuarioExiste: function() {
        if (!this.usuarioActual) return false;
        
        // Buscar el usuario en la base de datos
        const usuarioKey = this.usuarioActual.usuarioKey || this.usuarioActual.email;
        return this.usuarios[usuarioKey] ? true : false;
    },

    verificarMembresiaActiva: function() {
        if (!this.usuarioActual) return false;
        
        // Si no tiene expiración, está activo
        if (!this.usuarioActual.expiracion) return true;
        
        const hoy = new Date();
        const expiracion = new Date(this.usuarioActual.expiracion);
        return hoy <= expiracion;
    },

    cerrarSesionForzada: function() {
        console.log('Sesión cerrada: usuario no válido o membresía expirada');
        this.usuarioActual = null;
        localStorage.removeItem('usuarioActual');
        this.mostrarPantallaLogin();
        
        // Mostrar mensaje al usuario
        setTimeout(() => {
            alert('Tu sesión ha sido cerrada porque el usuario fue eliminado o la membresía expiró.');
        }, 100);
    },

    // ============================================
    // FUNCIÓN PARA VERIFICAR EN CADA CAMBIO DE PESTAÑA
    // ============================================
    
    verificarEnCadaCambio: function() {
        // Verificar cada vez que la pestaña gana foco
        window.addEventListener('focus', () => {
            if (this.usuarioActual) {
                if (!this.verificarUsuarioExiste() || !this.verificarMembresiaActiva()) {
                    this.cerrarSesionForzada();
                } else {
                    // Actualizar info por si cambió la expiración
                    this.actualizarInfoMembresia();
                }
            }
        });

        // Verificar cada 30 segundos (por si el admin eliminó al usuario)
        setInterval(() => {
            if (this.usuarioActual) {
                if (!this.verificarUsuarioExiste() || !this.verificarMembresiaActiva()) {
                    this.cerrarSesionForzada();
                } else {
                    // Actualizar días restantes
                    this.actualizarInfoMembresia();
                }
            }
        }, 30000); // 30 segundos
    },

    mostrarPantallaLogin: function() {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('membershipFooter').style.display = 'none';
    },

    mostrarContenidoPrincipal: function() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('membershipFooter').style.display = 'block';
        
        if (window.app) {
            window.app.actualizarStatsProgreso();
        }
    },

    actualizarInfoMembresia: function() {
        if (!this.usuarioActual) return;
        
        const usuarioKey = this.usuarioActual.usuarioKey || this.usuarioActual.email || 'Usuario';
        const nombre = this.usuarioActual.nombre || usuarioKey;
        
        document.getElementById('membershipUser').textContent = nombre;
        document.getElementById('membershipUser').style.color = '';
        
        if (this.usuarioActual.expiracion) {
            const expiracion = new Date(this.usuarioActual.expiracion);
            const hoy = new Date();
            const diffTime = expiracion - hoy;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            const fechaStr = expiracion.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            document.getElementById('membershipExpire').textContent = fechaStr;
            
            const daysElement = document.getElementById('membershipDays');
            
            if (diffDays < 0) {
                daysElement.textContent = 'Expirado';
                daysElement.style.color = '#e74c3c';
            } else if (diffDays <= 3) {
                daysElement.textContent = `${diffDays} días ⚠️`;
                daysElement.style.color = '#e74c3c';
            } else if (diffDays <= 7) {
                daysElement.textContent = `${diffDays} días`;
                daysElement.style.color = '#f39c12';
            } else if (diffDays <= 10) {
                daysElement.textContent = `${diffDays} días`;
                daysElement.style.color = '#f39c12';
            } else {
                daysElement.textContent = `${diffDays} días`;
                daysElement.style.color = '#00a86b';
            }
        } else {
            document.getElementById('membershipExpire').textContent = 'Sin fecha';
            document.getElementById('membershipDays').textContent = 'Ilimitado';
            document.getElementById('membershipDays').style.color = '#00a86b';
        }
    },

    iniciarSesion: function() {
        const usuario = document.getElementById('loginUsuario').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const errorDiv = document.getElementById('loginError');
        
        if (!usuario || !password) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = '❌ Completa todos los campos';
            return;
        }
        
        let usuarioEncontrado = null;
        for (let key in this.usuarios) {
            const user = this.usuarios[key];
            if (key === usuario || user.email === usuario) {
                if (user.password === password) {
                    usuarioEncontrado = user;
                    usuarioEncontrado.usuarioKey = key;
                    break;
                }
            }
        }
        
        if (usuarioEncontrado) {
            if (usuarioEncontrado.expiracion) {
                const hoy = new Date();
                const expiracion = new Date(usuarioEncontrado.expiracion);
                if (hoy > expiracion) {
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = '❌ Tu membresía ha expirado. Contacta al administrador.';
                    return;
                }
            }
            
            usuarioEncontrado.contadorAccesos = (usuarioEncontrado.contadorAccesos || 0) + 1;
            
            this.usuarioActual = usuarioEncontrado;
            localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
            localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
            
            this.mostrarContenidoPrincipal();
            this.actualizarInfoMembresia();
            
            document.getElementById('loginUsuario').value = '';
            document.getElementById('loginPassword').value = '';
            errorDiv.style.display = 'none';
        } else {
            errorDiv.style.display = 'block';
            errorDiv.textContent = '❌ Usuario o contraseña incorrectos';
        }
    },

    cerrarSesion: function() {
        if (confirm('¿Cerrar sesión?')) {
            this.usuarioActual = null;
            localStorage.removeItem('usuarioActual');
            this.mostrarPantallaLogin();
            
            const dropdown = document.getElementById('menuDropdown');
            if (dropdown) dropdown.classList.remove('show');
        }
    },

    mostrarPerfil: function() {
        if (!this.usuarioActual) {
            alert('No hay usuario activo');
            return;
        }
        
        // Verificar nuevamente antes de mostrar perfil
        if (!this.verificarUsuarioExiste() || !this.verificarMembresiaActiva()) {
            this.cerrarSesionForzada();
            return;
        }
        
        document.getElementById('perfilNombre').textContent = this.usuarioActual.nombre || 'Sin nombre';
        document.getElementById('perfilEdad').value = this.usuarioActual.edad || 30;
        document.getElementById('perfilPeso').value = this.usuarioActual.peso || 70;
        document.getElementById('perfilAltura').value = this.usuarioActual.altura || 170;
        document.getElementById('perfilSexo').value = this.usuarioActual.sexo || 'hombre';
        document.getElementById('perfilNivel').value = this.usuarioActual.nivel || 'intermedio';
        document.getElementById('perfilObjetivo').value = this.usuarioActual.objetivo || 'hipertrofia';
        document.getElementById('perfilEquipo').value = this.usuarioActual.equipo || 'gym';
        
        document.getElementById('perfilModal').classList.add('show');
        
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) dropdown.classList.remove('show');
    },

    cerrarPerfil: function() {
        document.getElementById('perfilModal').classList.remove('show');
    },

    guardarPerfil: function() {
        if (!this.usuarioActual) return;
        
        // Verificar nuevamente antes de guardar
        if (!this.verificarUsuarioExiste() || !this.verificarMembresiaActiva()) {
            this.cerrarSesionForzada();
            return;
        }
        
        this.usuarioActual.edad = document.getElementById('perfilEdad').value;
        this.usuarioActual.peso = document.getElementById('perfilPeso').value;
        this.usuarioActual.altura = document.getElementById('perfilAltura').value;
        this.usuarioActual.sexo = document.getElementById('perfilSexo').value;
        this.usuarioActual.nivel = document.getElementById('perfilNivel').value;
        this.usuarioActual.objetivo = document.getElementById('perfilObjetivo').value;
        this.usuarioActual.equipo = document.getElementById('perfilEquipo').value;
        
        const usuarioKey = this.usuarioActual.usuarioKey || this.usuarioActual.email;
        if (usuarioKey && this.usuarios[usuarioKey]) {
            this.usuarios[usuarioKey] = this.usuarioActual;
        }
        
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
        
        this.cerrarPerfil();
        alert('✅ Perfil actualizado');
        
        if (window.app) {
            window.app.actualizarStatsProgreso();
        }
        this.actualizarInfoMembresia();
    },

    crearUsuarioMembresia: function(usuario, password, nombre, datos, dias) {
        const expiracion = new Date();
        expiracion.setDate(expiracion.getDate() + dias);
        
        const nuevoUsuario = {
            email: usuario,
            password: password,
            nombre: nombre,
            sexo: datos?.sexo || 'hombre',
            edad: datos?.edad || 30,
            peso: datos?.peso || 70,
            altura: datos?.altura || 170,
            objetivo: datos?.objetivo || 'hipertrofia',
            equipo: datos?.equipo || 'gym',
            nivel: datos?.nivel || 'intermedio',
            expiracion: expiracion.toISOString(),
            contadorAccesos: 0,
            fechaRegistro: new Date().toISOString()
        };
        
        this.usuarios[usuario] = nuevoUsuario;
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        
        return nuevoUsuario;
    },

    obtenerListaUsuarios: function() {
        const lista = [];
        for (let key in this.usuarios) {
            const u = this.usuarios[key];
            lista.push({
                usuario: key,
                nombre: u.nombre || 'Sin nombre',
                password: u.password || '***',
                expiracion: u.expiracion || null,
                contadorAccesos: u.contadorAccesos || 0,
                edad: u.edad || 30,
                sexo: u.sexo || 'hombre',
                objetivo: u.objetivo || 'hipertrofia'
            });
        }
        return lista;
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    window.auth.init();
    window.auth.verificarEnCadaCambio(); // Activar verificaciones periódicas
});