// AUTENTICACIÓN DE USUARIOS
window.auth = {
    usuarios: JSON.parse(localStorage.getItem('usuarios')) || {},
    usuarioActual: JSON.parse(localStorage.getItem('usuarioActual')) || null,

    init: function() {
        if (this.usuarioActual) {
            document.getElementById('logoutBtn').style.display = 'block';
            document.getElementById('editProfileBtn').style.display = 'block';
        }
    },

    showLoginModal: function() {
        document.getElementById('authModal').classList.add('show');
        this.showRegister();
        window.app.cerrarMenu();
    },

    closeModal: function() {
        document.getElementById('authModal').classList.remove('show');
    },

    showLogin: function() {
        document.getElementById('modalTitle').textContent = 'Iniciar sesión';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    },

    showRegister: function() {
        document.getElementById('modalTitle').textContent = 'Registrarse';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
    },

    iniciarSesion: function() {
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;
        for (let key in this.usuarios) {
            if (this.usuarios[key].email === email && this.usuarios[key].password === pass) {
                this.usuarioActual = this.usuarios[key];
                localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
                document.getElementById('logoutBtn').style.display = 'block';
                document.getElementById('editProfileBtn').style.display = 'block';
                this.closeModal();
                return;
            }
        }
        alert('Email o contraseña incorrectos');
    },

    registrarUsuario: function() {
        const email = document.getElementById('regEmail').value;
        if (!email || !document.getElementById('regPassword').value || !document.getElementById('regNombre').value) {
            alert('Completa todos los campos');
            return;
        }
        if (this.usuarios[email]) { alert('Email ya registrado'); return; }
        
        const nuevo = {
            email, password: document.getElementById('regPassword').value,
            nombre: document.getElementById('regNombre').value,
            datos: {
                nombre: document.getElementById('regNombre').value,
                sexo: document.getElementById('regSexo').value,
                edad: document.getElementById('regEdad').value || 30,
                peso: document.getElementById('regPeso').value || 70,
                altura: document.getElementById('regAltura').value || 170,
                objetivo: document.getElementById('regObjetivo').value,
                equipo: document.getElementById('regEquipo').value,
                nivel: document.getElementById('regNivel').value
            }
        };
        this.usuarios[email] = nuevo;
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        this.usuarioActual = nuevo;
        localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('editProfileBtn').style.display = 'block';
        this.closeModal();
    },

    cerrarSesion: function() {
        if (confirm('¿Cerrar sesión?')) {
            this.usuarioActual = null;
            localStorage.removeItem('usuarioActual');
            location.reload();
        }
    },

    editarPerfil: function() {
        if (!this.usuarioActual) return;
        const d = this.usuarioActual.datos;
        document.getElementById('editNombre').value = d.nombre || '';
        document.getElementById('editPeso').value = d.peso || '';
        document.getElementById('editAltura').value = d.altura || '';
        document.getElementById('editObjetivo').value = d.objetivo || 'definicion';
        document.getElementById('editEquipo').value = d.equipo || 'cuerpo';
        document.getElementById('editNivel').value = d.nivel || 'principiante';
        document.getElementById('editProfileModal').classList.add('show');
        window.app.cerrarMenu();
    },

    closeEditModal: function() {
        document.getElementById('editProfileModal').classList.remove('show');
    },

    guardarCambiosPerfil: function() {
        this.usuarioActual.datos.nombre = document.getElementById('editNombre').value;
        this.usuarioActual.datos.peso = document.getElementById('editPeso').value;
        this.usuarioActual.datos.altura = document.getElementById('editAltura').value;
        this.usuarioActual.datos.objetivo = document.getElementById('editObjetivo').value;
        this.usuarioActual.datos.equipo = document.getElementById('editEquipo').value;
        this.usuarioActual.datos.nivel = document.getElementById('editNivel').value;
        this.usuarios[this.usuarioActual.email].datos = this.usuarioActual.datos;
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
        this.closeEditModal();
        alert('Perfil actualizado');
    }
};