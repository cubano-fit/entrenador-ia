window.auth = {
    usuarios: JSON.parse(localStorage.getItem('usuarios')) || {},
    usuarioActual: JSON.parse(localStorage.getItem('usuarioActual')) || null,

    showLoginModal() {
        document.getElementById('authModal').classList.add('show');
        this.showLogin();
        window.app.cerrarMenu();
    },

    closeModal() {
        document.getElementById('authModal').classList.remove('show');
    },

    showLogin() {
        document.getElementById('modalTitle').textContent = 'Iniciar sesión';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    },

    showRegister() {
        document.getElementById('modalTitle').textContent = 'Registrarse';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    },

    iniciarSesion() {
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;
        
        for (let k in this.usuarios) {
            if (this.usuarios[k].email === email && this.usuarios[k].password === pass) {
                this.usuarioActual = this.usuarios[k];
                localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
                document.getElementById('logoutBtn').style.display = 'block';
                document.getElementById('editProfileBtn').style.display = 'block';
                document.getElementById('progressBtn').style.display = 'block';
                this.closeModal();
                return;
            }
        }
        alert('Email o contraseña incorrectos');
    },

    registrar() {
        const email = document.getElementById('regEmail').value;
        if (this.usuarios[email]) {
            alert('Email ya registrado');
            return;
        }

        const nuevo = {
            email: email,
            password: document.getElementById('regPassword').value,
            nombre: document.getElementById('regNombre').value,
            datos: {
                nombre: document.getElementById('regNombre').value,
                nivel: document.getElementById('regNivel').value,
                objetivo: document.getElementById('regObjetivo').value,
                equipo: document.getElementById('regEquipo').value,
                edad: document.getElementById('regEdad').value || 30,
                peso: document.getElementById('regPeso').value || 70,
                altura: document.getElementById('regAltura').value || 170
            }
        };

        this.usuarios[email] = nuevo;
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        this.usuarioActual = nuevo;
        localStorage.setItem('usuarioActual', JSON.stringify(nuevo));
        
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('editProfileBtn').style.display = 'block';
        document.getElementById('progressBtn').style.display = 'block';
        this.closeModal();
    },

    cerrarSesion() {
        if (confirm('¿Cerrar sesión?')) {
            this.usuarioActual = null;
            localStorage.removeItem('usuarioActual');
            location.reload();
        }
    },

    editarPerfil() {
        alert('Editar perfil - En desarrollo');
        window.app.cerrarMenu();
    }
};