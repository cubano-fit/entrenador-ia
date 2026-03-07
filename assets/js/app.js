window.app = {
    mostrarSeccion(seccion, element) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        if (element) element.classList.add('active');
        document.getElementById(seccion + '-screen').classList.add('active');
        this.cerrarMenu();
    },

    toggleMenu() {
        document.getElementById('menuDropdown').classList.toggle('show');
    },

    cerrarMenu() {
        document.getElementById('menuDropdown').classList.remove('show');
    },

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
        this.cerrarMenu();
    }
};

window.onclick = function(event) {
    if (!event.target.matches('#menuBtn')) {
        document.getElementById('menuDropdown')?.classList.remove('show');
    }
};

if (window.auth.usuarioActual) {
    document.getElementById('logoutBtn').style.display = 'block';
    document.getElementById('editProfileBtn').style.display = 'block';
    document.getElementById('progressBtn').style.display = 'block';
}