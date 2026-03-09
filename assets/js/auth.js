iniciarSesion: async function() {
    const usuario = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    // Limpiar espacios
    const usuarioLimpio = usuario.trim();
    const passwordLimpio = password.trim();
    
    console.log('1. Intentando login con:', { usuario: usuarioLimpio, password: passwordLimpio });
    
    // FORZAR recarga de usuarios
    await this.cargarUsuarios();
    console.log('2. Usuarios después de cargar:', this.usuarios);
    
    const userData = this.usuarios[usuarioLimpio];
    console.log('3. Datos del usuario encontrado:', userData);
    
    if (!userData) {
        console.log('4. Usuario NO existe');
        errorDiv.style.display = 'block';
        errorDiv.textContent = '❌ Usuario no existe';
        return;
    }
    
    console.log('5. Comparando contraseñas:');
    console.log('   - Ingresada:', passwordLimpio);
    console.log('   - En archivo:', userData.password);
    console.log('   - Coinciden?', userData.password === passwordLimpio);
    
    if (userData.password === passwordLimpio) {
        console.log('6. ✅ Contraseña correcta');
        
        // Validar expiración
        if (userData.expiracion) {
            const hoy = new Date();
            const expiracion = new Date(userData.expiracion);
            if (hoy > expiracion) {
                errorDiv.style.display = 'block';
                errorDiv.textContent = '❌ Membresía expirada';
                return;
            }
        }
        
        // Registrar acceso
        await this.registrarAccesoEnGitHub(usuarioLimpio);
        
        // Guardar sesión
        this.usuarioActual = {
            usuario: usuarioLimpio,
            nombre: usuarioLimpio,
            expiracion: userData.expiracion
        };
        localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
        
        this.mostrarContenidoPrincipal();
        errorDiv.style.display = 'none';
    } else {
        console.log('6. ❌ Contraseña incorrecta');
        errorDiv.style.display = 'block';
        errorDiv.textContent = '❌ Contraseña incorrecta';
    }
}
