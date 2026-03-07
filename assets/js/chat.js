window.chat = {
    historial: [],

    toggle() {
        document.getElementById('chatPanel').classList.toggle('show');
    },

    enviar() {
        const input = document.getElementById('chatInput');
        const mensaje = input.value.trim();
        if (!mensaje) return;

        const chat = document.getElementById('chatMessages');
        chat.innerHTML += `<div class="chat-message user-message">${mensaje}</div>`;
        input.value = '';

        setTimeout(() => {
            const respuesta = this.generarRespuesta(mensaje);
            chat.innerHTML += `<div class="chat-message assistant-message">🤖 ${respuesta}</div>`;
            chat.scrollTop = chat.scrollHeight;
        }, 500);
    },

    generarRespuesta(mensaje) {
        if (!window.auth.usuarioActual) return "Inicia sesión para ayuda personalizada.";
        
        const texto = mensaje.toLowerCase();
        const datos = window.auth.usuarioActual.datos;

        if (texto.includes('pecho')) {
            return "Para pecho, prueba flexiones o press. ¿Con qué equipo cuentas?";
        }
        if (texto.includes('pierna')) {
            return "Sentadillas y zancadas son excelentes para piernas.";
        }
        return "¿Ejercicios o nutrición? Pregúntame lo que necesites.";
    }
};

document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') window.chat.enviar();
});