// assets/js/auth.js
window.auth = {
    usuarios: JSON.parse(localStorage.getItem('usuarios')) || {},
    usuarioActual: JSON.parse(localStorage.getItem('usuarioActual')) || null,

    init: function() {
        // Verificar si hay usuario actual
        if (this.usuarioActual) {
            this.mostrarContenidoPrincipal();
            this.actualizarInfoMembresia(); // Actualizar info de membresía
        } else {
            this.mostrarPantallaLogin();
        }
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
        
        // Actualizar estadísticas si es necesario
        if (window.app) {
            window.app.actualizarStatsProgreso();
        }
    },

    // ============================================
    // FUNCIÓN: Actualizar información de membresía en el footer (CON COLORES)
    // ============================================
    actualizarInfoMembresia: function() {
        if (!this.usuarioActual) return;
        
        const usuarioKey = this.usuarioActual.usuarioKey || this.usuarioActual.email || 'Usuario';
        const nombre = this.usuarioActual.nombre || this.usuarioActual.datos?.nombre || usuarioKey;
        
        // Mostrar nombre de usuario
        document.getElementById('membershipUser').textContent = nombre;
        document.getElementById('membershipUser').style.color = ''; // Reset color
        
        // Verificar expiración
        if (this.usuarioActual.expiracion) {
            const expiracion = new Date(this.usuarioActual.expiracion);
            const hoy = new Date();
            const diffTime = expiracion - hoy;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Formatear fecha
            const fechaStr = expiracion.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            document.getElementById('membershipExpire').textContent = fechaStr;
            
            // Mostrar días restantes con color según estado
            const daysElement = document.getElementById('membershipDays');
            
            if (diffDays < 0) {
                daysElement.textContent = 'Expirado';
                daysElement.style.color = '#e74c3c'; // Rojo
            } else if (diffDays <= 3) {
                daysElement.textContent = `${diffDays} días ⚠️`;
                daysElement.style.color = '#e74c3c'; // Rojo (alerta)
            } else if (diffDays <= 7) {
                daysElement.textContent = `${diffDays} días`;
                daysElement.style.color = '#f39c12'; // Naranja
            } else if (diffDays <= 10) {
                daysElement.textContent = `${diffDays} días`;
                daysElement.style.color = '#f39c12'; // Naranja
            } else {
                daysElement.textContent = `${diffDays} días`;
                daysElement.style.color = '#00a86b'; // Verde (primary)
            }
        } else {
            // Si no tiene expiración (usuario sin membresía)
            document.getElementById('membershipExpire').textContent = 'Sin fecha';
            document.getElementById('membershipDays').textContent = 'Ilimitado';
            document.getElementById('membershipDays').style.color = '#00a86b'; // Verde
        }
    },

    iniciarSesion: function() {
        const usuario = document.getElementById('loginUsuario').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const errorDiv = document.getElementById('loginError');
        
        // Validaciones básicas
        if (!usuario || !password) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = '❌ Completa todos los campos';
            return;
        }
        
        // Buscar usuario (puede ser por usuario o email)
        let usuarioEncontrado = null;
        for (let key in this.usuarios) {
            const user = this.usuarios[key];
            // Comparar con el campo usuario (key) o con email
            if (key === usuario || user.email === usuario) {
                if (user.password === password) {
                    usuarioEncontrado = user;
                    usuarioEncontrado.usuarioKey = key;
                    break;
                }
            }
        }
        
        if (usuarioEncontrado) {
            // Verificar membresía si tiene fecha de expiración
            if (usuarioEncontrado.expiracion) {
                const hoy = new Date();
                const expiracion = new Date(usuarioEncontrado.expiracion);
                if (hoy > expiracion) {
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = '❌ Tu membresía ha expirado. Contacta al administrador.';
                    return;
                }
            }
            
            // Incrementar contador de accesos
            usuarioEncontrado.contadorAccesos = (usuarioEncontrado.contadorAccesos || 0) + 1;
            
            // Guardar en localStorage
            this.usuarioActual = usuarioEncontrado;
            localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
            localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
            
            // Mostrar contenido principal
            this.mostrarContenidoPrincipal();
            
            // Actualizar información de membresía
            this.actualizarInfoMembresia();
            
            // Limpiar campos
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
            
            // Cerrar menú si está abierto
            const dropdown = document.getElementById('menuDropdown');
            if (dropdown) dropdown.classList.remove('show');
        }
    },

    mostrarPerfil: function() {
        if (!this.usuarioActual) {
            alert('No hay usuario activo');
            return;
        }
        
        // Obtener datos del usuario
        const datos = this.usuarioActual.datos || this.usuarioActual;
        const usuarioKey = this.usuarioActual.usuarioKey || this.usuarioActual.email;
        
        // Mostrar nombre en modo lectura
        document.getElementById('perfilNombre').textContent = datos.nombre || 'Sin nombre';
        
        // Cargar datos editables
        document.getElementById('perfilEdad').value = datos.edad || 30;
        document.getElementById('perfilPeso').value = datos.peso || 70;
        document.getElementById('perfilAltura').value = datos.altura || 170;
        document.getElementById('perfilSexo').value = datos.sexo || 'hombre';
        document.getElementById('perfilNivel').value = datos.nivel || 'intermedio';
        document.getElementById('perfilObjetivo').value = datos.objetivo || 'hipertrofia';
        document.getElementById('perfilEquipo').value = datos.equipo || 'gym';
        
        // Mostrar modal
        document.getElementById('perfilModal').classList.add('show');
        
        // Cerrar menú
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) dropdown.classList.remove('show');
    },

    cerrarPerfil: function() {
        document.getElementById('perfilModal').classList.remove('show');
    },

    guardarPerfil: function() {
        if (!this.usuarioActual) return;
        
        // Obtener datos actuales
        const datos = this.usuarioActual.datos || this.usuarioActual;
        
        // Actualizar solo campos editables
        datos.edad = document.getElementById('perfilEdad').value;
        datos.peso = document.getElementById('perfilPeso').value;
        datos.altura = document.getElementById('perfilAltura').value;
        datos.sexo = document.getElementById('perfilSexo').value;
        datos.nivel = document.getElementById('perfilNivel').value;
        datos.objetivo = document.getElementById('perfilObjetivo').value;
        datos.equipo = document.getElementById('perfilEquipo').value;
        
        // Mantener nombre original (no editable)
        datos.nombre = document.getElementById('perfilNombre').textContent;
        
        // Actualizar estructura según formato
        if (this.usuarioActual.datos) {
            this.usuarioActual.datos = datos;
        } else {
            this.usuarioActual = datos;
        }
        
        // Actualizar en el objeto de usuarios
        const usuarioKey = this.usuarioActual.usuarioKey || this.usuarioActual.email;
        if (usuarioKey && this.usuarios[usuarioKey]) {
            if (this.usuarios[usuarioKey].datos) {
                this.usuarios[usuarioKey].datos = datos;
            } else {
                this.usuarios[usuarioKey] = this.usuarioActual;
            }
        }
        
        // Guardar en localStorage
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
        
        this.cerrarPerfil();
        alert('✅ Perfil actualizado');
        
        // Actualizar estadísticas si estamos en progreso
        if (window.app) {
            window.app.actualizarStatsProgreso();
        }
        
        // Actualizar información de membresía (por si cambió el nombre)
        this.actualizarInfoMembresia();
    },

    // Función para crear usuario desde admin
    crearUsuarioMembresia: function(usuario, password, nombre, datos, dias) {
        const expiracion = new Date();
        expiracion.setDate(expiracion.getDate() + dias);
        
        const nuevoUsuario = {
            email: usuario,
            password: password,
            nombre: nombre,
            datos: datos || {
                nombre: nombre,
                sexo: 'hombre',
                edad: 30,
                peso: 70,
                altura: 170,
                objetivo: 'hipertrofia',
                equipo: 'gym',
                nivel: 'intermedio'
            },
            expiracion: expiracion.toISOString(),
            contadorAccesos: 0,
            fechaRegistro: new Date().toISOString()
        };
        
        this.usuarios[usuario] = nuevoUsuario;
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        
        return nuevoUsuario;
    },

    // Función para obtener lista de usuarios (para admin)
    obtenerListaUsuarios: function() {
        const lista = [];
        for (let key in this.usuarios) {
            const u = this.usuarios[key];
            lista.push({
                usuario: key,
                nombre: u.nombre || u.datos?.nombre || 'Sin nombre',
                password: u.password || '***',
                expiracion: u.expiracion || null,
                contadorAccesos: u.contadorAccesos || 0,
                datos: u.datos || u
            });
        }
        return lista;
    }
};

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    window.auth.init();
});