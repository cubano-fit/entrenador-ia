// assets/js/app.js - VERSIÓN MEJORADA CON PROGRESO
window.app = {
    diaSeleccionado: 'L',
    historialPesos: [],

    init: function() {
        this.cargarEventos();
        this.cargarTemaGuardado();
        if (window.auth) window.auth.init();
        if (window.training) window.training.init();
        
        // Cargar historial de pesos si existe
        const historialGuardado = localStorage.getItem('historial_pesos');
        if (historialGuardado) {
            this.historialPesos = JSON.parse(historialGuardado);
        }
    },

    cargarEventos: function() {
        window.onclick = function(event) {
            if (!event.target.matches('#menuBtn')) {
                const dropdown = document.getElementById('menuDropdown');
                if (dropdown) dropdown.classList.remove('show');
            }
        };
    },

    cargarTemaGuardado: function() {
        const temaGuardado = localStorage.getItem('tema');
        if (temaGuardado === 'dark') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
    },

    toggleTheme: function() {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('tema', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('tema', 'light');
        }
        this.cerrarMenu();
    },

    mostrarSeccion: function(seccion) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        if (seccion === 'entrenar') {
            document.querySelectorAll('.tab-btn')[0]?.classList.add('active');
            document.getElementById('entrenar-screen')?.classList.add('active');
        } else if (seccion === 'nutricion') {
            document.querySelectorAll('.tab-btn')[1]?.classList.add('active');
            document.getElementById('nutricion-screen')?.classList.add('active');
        } else if (seccion === 'progreso') {
            document.querySelectorAll('.tab-btn')[2]?.classList.add('active');
            document.getElementById('progreso-screen')?.classList.add('active');
            if (window.auth && window.auth.usuarioActual) this.actualizarProgresoCompleto();
        }
        this.cerrarMenu();
    },

    toggleMenu: function() {
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) dropdown.classList.toggle('show');
    },

    cerrarMenu: function() {
        const dropdown = document.getElementById('menuDropdown');
        if (dropdown) dropdown.classList.remove('show');
    },

    // ============================================
    // PROGRESO MEJORADO
    // ============================================
    
    // Obtener datos actuales del usuario
    obtenerDatosActuales: function() {
        if (!window.auth || !window.auth.usuarioActual) return null;
        
        const usuario = window.auth.usuarioActual;
        const perfilGuardado = JSON.parse(localStorage.getItem('perfil_' + usuario.usuario)) || {};
        
        return {
            peso: parseFloat(perfilGuardado.peso) || parseFloat(usuario.peso) || 0,
            altura: parseInt(perfilGuardado.altura) || parseInt(usuario.altura) || 0,
            nombre: perfilGuardado.nombre || usuario.nombre || usuario.usuario || 'Usuario'
        };
    },

    // Calcular IMC con interpretación
    calcularIMC: function(peso, altura) {
        if (!peso || !altura || altura === 0) return null;
        const alturaM = altura / 100;
        return (peso / (alturaM * alturaM)).toFixed(1);
    },

    interpretarIMC: function(imc) {
        if (!imc) return { texto: 'Sin datos', color: '#666' };
        
        const valor = parseFloat(imc);
        if (valor < 18.5) return { texto: 'Bajo peso', color: '#f39c12', emoji: '⚠️' };
        if (valor < 25) return { texto: 'Normal', color: '#00a86b', emoji: '✅' };
        if (valor < 30) return { texto: 'Sobrepeso', color: '#f39c12', emoji: '⚠️' };
        return { texto: 'Obesidad', color: '#e74c3c', emoji: '🔴' };
    },

    // Calcular peso ideal (rango)
    calcularPesoIdeal: function(altura) {
        if (!altura || altura === 0) return { min: 0, max: 0 };
        const alturaM = altura / 100;
        const min = (18.5 * alturaM * alturaM).toFixed(1);
        const max = (24.9 * alturaM * alturaM).toFixed(1);
        return { min, max };
    },

    // Guardar nuevo peso con fecha
    actualizarPeso: function() {
        if (!window.auth || !window.auth.usuarioActual) { 
            alert('Inicia sesión'); 
            return; 
        }
        
        const nuevoPeso = document.getElementById('nuevoPeso').value;
        if (!nuevoPeso || nuevoPeso <= 0) { 
            alert('Ingresa un peso válido'); 
            return; 
        }
        
        const usuario = window.auth.usuarioActual;
        const perfilGuardado = JSON.parse(localStorage.getItem('perfil_' + usuario.usuario)) || {};
        
        // Actualizar peso en perfil
        perfilGuardado.peso = nuevoPeso;
        localStorage.setItem('perfil_' + usuario.usuario, JSON.stringify(perfilGuardado));
        
        // Guardar en historial con fecha
        const fecha = new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        this.historialPesos.unshift({
            fecha: fecha,
            peso: nuevoPeso,
            timestamp: new Date().getTime()
        });
        
        // Limitar historial a 10 entradas
        if (this.historialPesos.length > 10) {
            this.historialPesos.pop();
        }
        
        localStorage.setItem('historial_pesos', JSON.stringify(this.historialPesos));
        
        document.getElementById('nuevoPeso').value = '';
        this.actualizarProgresoCompleto();
    },

    // Mostrar todo el progreso mejorado
    actualizarProgresoCompleto: function() {
        const datos = this.obtenerDatosActuales();
        if (!datos) {
            document.getElementById('progresoStats').innerHTML = '<p>Completa tu perfil para ver métricas</p>';
            return;
        }
        
        const imc = this.calcularIMC(datos.peso, datos.altura);
        const interpretacion = this.interpretarIMC(imc);
        const pesoIdeal = this.calcularPesoIdeal(datos.altura);
        
        // Calcular diferencia con peso ideal
        let diferenciaPeso = '';
        let colorDiferencia = '';
        if (datos.peso > 0 && pesoIdeal.max > 0) {
            if (datos.peso > pesoIdeal.max) {
                diferenciaPeso = `🔻 Necesitas perder ${(datos.peso - pesoIdeal.max).toFixed(1)} kg`;
                colorDiferencia = '#e74c3c';
            } else if (datos.peso < pesoIdeal.min) {
                diferenciaPeso = `🔺 Necesitas ganar ${(pesoIdeal.min - datos.peso).toFixed(1)} kg`;
                colorDiferencia = '#f39c12';
            } else {
                diferenciaPeso = '✅ Estás en tu peso ideal';
                colorDiferencia = '#00a86b';
            }
        }
        
        // Generar HTML
        let html = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                <!-- Tarjeta de Peso Actual -->
                <div style="background: linear-gradient(135deg, var(--primary)20, var(--bg)); border-radius: 16px; padding: 20px; text-align: center; border: 1px solid var(--primary);">
                    <div style="font-size: 0.9em; color: var(--text-secondary); margin-bottom: 5px;">⚖️ Peso Actual</div>
                    <div style="font-size: 2.5em; font-weight: bold; color: var(--primary);">${datos.peso || '?'} kg</div>
                    <div style="font-size: 0.8em; color: ${colorDiferencia};">${diferenciaPeso || ''}</div>
                </div>
                
                <!-- Tarjeta de IMC -->
                <div style="background: var(--card); border-radius: 16px; padding: 20px; text-align: center; border: 1px solid var(--border);">
                    <div style="font-size: 0.9em; color: var(--text-secondary); margin-bottom: 5px;">📊 IMC</div>
                    <div style="font-size: 2.5em; font-weight: bold; color: ${interpretacion.color};">${imc || '?'}</div>
                    <div style="font-size: 0.9em; color: ${interpretacion.color};">${interpretacion.emoji} ${interpretacion.texto}</div>
                </div>
            </div>
            
            <!-- Peso Ideal -->
            <div style="background: var(--bg); border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-weight: 600;">🎯 Peso Ideal</span>
                    <span style="background: var(--hover); padding: 5px 10px; border-radius: 20px; font-size: 0.85em;">
                        ${pesoIdeal.min} - ${pesoIdeal.max} kg
                    </span>
                </div>
                <div style="height: 8px; background: var(--hover); border-radius: 4px; overflow: hidden;">
                    <div style="width: ${((datos.peso - pesoIdeal.min) / (pesoIdeal.max - pesoIdeal.min) * 100)}%; height: 100%; background: var(--primary);"></div>
                </div>
            </div>
        `;
        
        // Historial de pesos
        if (this.historialPesos.length > 0) {
            html += `
                <div style="background: var(--card); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="font-weight: 600; margin-bottom: 15px;">📈 Historial de Pesos</div>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
            `;
            
            this.historialPesos.slice(0, 5).forEach((item, index) => {
                const variacion = index === 0 ? 0 : this.historialPesos[index - 1].peso - item.peso;
                const variacionColor = variacion > 0 ? '#e74c3c' : variacion < 0 ? '#00a86b' : '#666';
                const variacionTexto = variacion > 0 ? `+${variacion}` : variacion < 0 ? `${variacion}` : '=';
                
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--bg); border-radius: 10px;">
                        <span style="color: var(--text-secondary);">${item.fecha}</span>
                        <span style="font-weight: bold;">${item.peso} kg</span>
                        <span style="color: ${variacionColor};">${variacionTexto}</span>
                    </div>
                `;
            });
            
            html += `</div></div>`;
        } else {
            html += `
                <div style="background: var(--card); border-radius: 16px; padding: 20px; margin-bottom: 20px; text-align: center; color: var(--text-secondary);">
                    📝 Aún no hay historial. Registra tu primer peso.
                </div>
            `;
        }
        
        // Meta personalizada
        html += `
            <div style="background: linear-gradient(135deg, var(--primary)10, var(--bg)); border-radius: 16px; padding: 20px; border: 1px dashed var(--primary);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 5px;">🏆 Próxima meta</div>
                        <div style="font-size: 0.9em; color: var(--text-secondary);">
                            ${datos.peso > pesoIdeal.max ? `Bajar a ${pesoIdeal.max} kg` : 
                              datos.peso < pesoIdeal.min ? `Subir a ${pesoIdeal.min} kg` : 
                              'Mantener peso actual'}
                        </div>
                    </div>
                    <div style="font-size: 2em;">🎯</div>
                </div>
            </div>
        `;
        
        document.getElementById('progresoStats').innerHTML = html;
    }
};

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    window.app.init();
});
