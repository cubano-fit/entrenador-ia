// assets/js/app.js - VERSIÓN CORREGIDA CON LÓGICA POR OBJETIVO
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
    // FUNCIONES PARA OBTENER DATOS DEL USUARIO
    // ============================================
    
    obtenerDatosActuales: function() {
        if (!window.auth || !window.auth.usuarioActual) {
            console.log('No hay usuario actual');
            return null;
        }
        
        const usuario = window.auth.usuarioActual;
        console.log('Usuario actual:', usuario);
        
        // Obtener perfil guardado
        const perfilGuardado = JSON.parse(localStorage.getItem('perfil_' + usuario.usuario)) || {};
        console.log('Perfil guardado:', perfilGuardado);
        
        // Si no hay perfil guardado, intentar con usuario.datos
        if (Object.keys(perfilGuardado).length === 0 && usuario.datos) {
            console.log('Usando usuario.datos');
            return {
                peso: parseFloat(usuario.datos.peso) || 0,
                altura: parseInt(usuario.datos.altura) || 0,
                nombre: usuario.datos.nombre || usuario.usuario || 'Usuario'
            };
        }
        
        return {
            peso: parseFloat(perfilGuardado.peso) || 0,
            altura: parseInt(perfilGuardado.altura) || 0,
            nombre: perfilGuardado.nombre || usuario.usuario || 'Usuario'
        };
    },

    obtenerObjetivoUsuario: function() {
        if (!window.auth || !window.auth.usuarioActual) return 'hipertrofia';
        
        const usuario = window.auth.usuarioActual;
        const perfilGuardado = JSON.parse(localStorage.getItem('perfil_' + usuario.usuario)) || {};
        
        return perfilGuardado.objetivo || usuario.objetivo || 'hipertrofia';
    },

    // ============================================
    // CÁLCULOS DE PROGRESO
    // ============================================
    
    calcularIMC: function(peso, altura) {
        if (!peso || peso <= 0 || !altura || altura <= 0) return null;
        const alturaM = altura / 100;
        return (peso / (alturaM * alturaM)).toFixed(1);
    },

    interpretarIMC: function(imc) {
        if (!imc) return { texto: 'Sin datos', color: '#666', emoji: '❓' };
        
        const valor = parseFloat(imc);
        if (valor < 18.5) return { texto: 'Bajo peso', color: '#f39c12', emoji: '⚠️' };
        if (valor < 25) return { texto: 'Normal', color: '#00a86b', emoji: '✅' };
        if (valor < 30) return { texto: 'Sobrepeso', color: '#f39c12', emoji: '⚠️' };
        return { texto: 'Obesidad', color: '#e74c3c', emoji: '🔴' };
    },

    calcularPesoIdeal: function(altura) {
        if (!altura || altura <= 0) return { min: 0, max: 0 };
        const alturaM = altura / 100;
        const min = (18.5 * alturaM * alturaM).toFixed(1);
        const max = (24.9 * alturaM * alturaM).toFixed(1);
        return { min, max };
    },

    // ============================================
    // GESTIÓN DE PESO
    // ============================================
    
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
        console.log('Actualizando peso para:', usuario.usuario);
        
        // Cargar perfil existente o crear uno nuevo
        let perfilGuardado = JSON.parse(localStorage.getItem('perfil_' + usuario.usuario)) || {};
        
        // Si no hay perfil pero hay datos en usuario.datos, conservarlos
        if (Object.keys(perfilGuardado).length === 0 && usuario.datos) {
            perfilGuardado = { ...usuario.datos };
        }
        
        // Actualizar peso
        perfilGuardado.peso = nuevoPeso;
        
        // Guardar en localStorage
        localStorage.setItem('perfil_' + usuario.usuario, JSON.stringify(perfilGuardado));
        console.log('Perfil actualizado:', perfilGuardado);
        
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
        alert('✅ Peso guardado correctamente');
    },

    // ============================================
    // RECOMENDACIONES PERSONALIZADAS
    // ============================================
    
    obtenerRecomendacion: function(objetivo, datos) {
        const pesoIdeal = this.calcularPesoIdeal(datos.altura);
        const proteinas = Math.round(datos.peso * 2.2);
        
        const recomendaciones = {
            'hipertrofia': `
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: var(--primary)10; border-radius: 8px;">
                        <span style="font-size: 1.3em;">💪</span>
                        <span><strong>Superávit calórico:</strong> 300-500 kcal extras</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: var(--primary)10; border-radius: 8px;">
                        <span style="font-size: 1.3em;">🥩</span>
                        <span><strong>Proteína:</strong> ${proteinas}g/día (2.2g por kg)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: var(--primary)10; border-radius: 8px;">
                        <span style="font-size: 1.3em;">🏋️</span>
                        <span><strong>Entrenamiento:</strong> 4-5 veces/semana, pesado</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: var(--primary)10; border-radius: 8px;">
                        <span style="font-size: 1.3em;">📈</span>
                        <span><strong>Progresión:</strong> Aumenta peso cada semana</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: var(--primary)10; border-radius: 8px;">
                        <span style="font-size: 1.3em;">⚠️</span>
                        <span><strong>Nota:</strong> El peso puede subir, pero que sea músculo, no grasa</span>
                    </div>
                </div>
            `,
            'definicion': `
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #f39c1220; border-radius: 8px;">
                        <span style="font-size: 1.3em;">⚖️</span>
                        <span><strong>Déficit calórico:</strong> 300-400 kcal menos</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #f39c1220; border-radius: 8px;">
                        <span style="font-size: 1.3em;">🥩</span>
                        <span><strong>Proteína alta:</strong> ${proteinas}g/día para conservar músculo</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #f39c1220; border-radius: 8px;">
                        <span style="font-size: 1.3em;">🏃</span>
                        <span><strong>Cardio:</strong> 2-3 veces/semana</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #f39c1220; border-radius: 8px;">
                        <span style="font-size: 1.3em;">🎯</span>
                        <span><strong>Meta:</strong> Perder ${datos.peso > pesoIdeal.max ? (datos.peso - pesoIdeal.max).toFixed(1) : '0'} kg</span>
                    </div>
                </div>
            `,
            'perder peso': `
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #e74c3c20; border-radius: 8px;">
                        <span style="font-size: 1.3em;">🔥</span>
                        <span><strong>Déficit calórico:</strong> 500 kcal menos</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #e74c3c20; border-radius: 8px;">
                        <span style="font-size: 1.3em;">🥩</span>
                        <span><strong>Proteína:</strong> ${Math.round(datos.peso * 1.8)}g/día para saciedad</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #e74c3c20; border-radius: 8px;">
                        <span style="font-size: 1.3em;">🥗</span>
                        <span><strong>Vegetales:</strong> Abundantes en cada comida</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: #e74c3c20; border-radius: 8px;">
                        <span style="font-size: 1.3em;">💧</span>
                        <span><strong>Agua:</strong> ${Math.round(datos.peso * 0.035)}L al día</span>
                    </div>
                </div>
            `
        };
        
        return recomendaciones[objetivo] || recomendaciones.hipertrofia;
    },

    // ============================================
    // MOSTRAR PROGRESO COMPLETO
    // ============================================
    
    actualizarProgresoCompleto: function() {
        console.log('Actualizando progreso...');
        const datos = this.obtenerDatosActuales();
        const objetivo = this.obtenerObjetivoUsuario();
        console.log('Datos obtenidos:', datos, 'Objetivo:', objetivo);
        
        if (!datos || (!datos.peso && !datos.altura)) {
            document.getElementById('progresoStats').innerHTML = `
                <div style="text-align: center; padding: 40px; background: var(--card); border-radius: 16px;">
                    <div style="font-size: 3em; margin-bottom: 15px;">📝</div>
                    <h3 style="margin-bottom: 10px;">Completa tu perfil</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">
                        Ve a ✏️ Perfil y completa tus datos para ver tu progreso
                    </p>
                    <button class="btn-primary" onclick="window.auth.mostrarPerfil()" style="width: auto;">
                        Ir a Perfil
                    </button>
                </div>
            `;
            return;
        }
        
        const imc = this.calcularIMC(datos.peso, datos.altura);
        const interpretacion = this.interpretarIMC(imc);
        const pesoIdeal = this.calcularPesoIdeal(datos.altura);
        
        // Determinar mensaje según objetivo
        let mensajeObjetivo = '';
        let colorMensaje = '';
        let metaTexto = '';
        let diferenciaPeso = '';
        let colorDiferencia = '';
        
        // Emoji y color según objetivo
        const objetivoEmoji = {
            'hipertrofia': '💪',
            'definicion': '✨',
            'perder peso': '🔥'
        }[objetivo] || '🎯';
        
        const objetivoColor = {
            'hipertrofia': '#00a86b',
            'definicion': '#f39c12',
            'perder peso': '#e74c3c'
        }[objetivo] || '#666';
        
        switch(objetivo) {
            case 'hipertrofia':
                mensajeObjetivo = 'Ganar masa muscular';
                metaTexto = `Ganar masa muscular (peso actual: ${datos.peso} kg)`;
                
                if (datos.peso > pesoIdeal.max) {
                    diferenciaPeso = `ℹ️ Peso superior al rango saludable, pero para hipertrofia puede ser beneficioso si es músculo`;
                    colorDiferencia = '#f39c12';
                } else {
                    diferenciaPeso = `✅ Peso adecuado para hipertrofia`;
                    colorDiferencia = '#00a86b';
                }
                break;
                
            case 'definicion':
                mensajeObjetivo = 'Definir músculo';
                if (datos.peso > pesoIdeal.max) {
                    diferenciaPeso = `🔻 Necesitas perder ${(datos.peso - pesoIdeal.max).toFixed(1)} kg para definir`;
                    colorDiferencia = '#e74c3c';
                    metaTexto = `Bajar a ${pesoIdeal.max} kg manteniendo músculo`;
                } else {
                    diferenciaPeso = `✅ Peso adecuado para definición`;
                    colorDiferencia = '#00a86b';
                    metaTexto = `Mantener peso y definir`;
                }
                break;
                
            case 'perder peso':
                mensajeObjetivo = 'Perder peso';
                if (datos.peso > pesoIdeal.max) {
                    diferenciaPeso = `🔻 Necesitas perder ${(datos.peso - pesoIdeal.max).toFixed(1)} kg`;
                    colorDiferencia = '#e74c3c';
                    metaTexto = `Bajar a ${pesoIdeal.max} kg`;
                } else {
                    diferenciaPeso = `✅ Estás en tu peso ideal`;
                    colorDiferencia = '#00a86b';
                    metaTexto = `Mantener peso saludable`;
                }
                break;
        }
        
        // Calcular porcentaje para barra de progreso (solo si no es hipertrofia)
        let porcentaje = 50;
        if (objetivo !== 'hipertrofia' && pesoIdeal.max > pesoIdeal.min && datos.peso > 0) {
            if (datos.peso < pesoIdeal.min) {
                porcentaje = ((datos.peso - pesoIdeal.min) / (pesoIdeal.max - pesoIdeal.min) * 50) + 50;
            } else if (datos.peso > pesoIdeal.max) {
                porcentaje = 50 - ((datos.peso - pesoIdeal.max) / (datos.peso - pesoIdeal.min) * 50);
            } else {
                porcentaje = 50 + ((datos.peso - pesoIdeal.min) / (pesoIdeal.max - pesoIdeal.min) * 50);
            }
            porcentaje = Math.min(100, Math.max(0, porcentaje));
        }
        
        // Generar HTML
        let html = `
            <!-- Mensaje de objetivo -->
            <div style="background: ${objetivoColor}20; border-radius: 16px; padding: 15px; margin-bottom: 20px; border-left: 4px solid ${objetivoColor};">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5em;">${objetivoEmoji}</span>
                    <span style="font-weight: 500;">Objetivo: <strong>${mensajeObjetivo}</strong></span>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                <!-- Tarjeta de Peso Actual -->
                <div style="background: linear-gradient(135deg, var(--primary)20, var(--bg)); border-radius: 16px; padding: 20px; text-align: center; border: 1px solid var(--primary);">
                    <div style="font-size: 1.2em; margin-bottom: 5px;">⚖️</div>
                    <div style="font-size: 0.9em; color: var(--text-secondary); margin-bottom: 5px;">Peso Actual</div>
                    <div style="font-size: 2.5em; font-weight: bold; color: var(--primary);">${datos.peso || '?'} kg</div>
                    <div style="font-size: 0.8em; color: ${colorDiferencia};">${diferenciaPeso || ''}</div>
                </div>
                
                <!-- Tarjeta de IMC -->
                <div style="background: var(--card); border-radius: 16px; padding: 20px; text-align: center; border: 1px solid var(--border);">
                    <div style="font-size: 1.2em; margin-bottom: 5px;">📊</div>
                    <div style="font-size: 0.9em; color: var(--text-secondary); margin-bottom: 5px;">IMC</div>
                    <div style="font-size: 2.5em; font-weight: bold; color: ${interpretacion.color};">${imc || '?'}</div>
                    <div style="font-size: 0.9em; color: ${interpretacion.color};">${interpretacion.emoji} ${interpretacion.texto}</div>
                </div>
            </div>
        `;
        
        // Peso Ideal (solo si hay altura)
        if (pesoIdeal.min > 0) {
            html += `
                <div style="background: var(--bg); border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px solid var(--border);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-weight: 600; display: flex; align-items: center; gap: 5px;">
                            <span>🎯</span> Peso Saludable (IMC)
                        </span>
                        <span style="background: var(--hover); padding: 5px 15px; border-radius: 20px; font-size: 0.9em; font-weight: bold;">
                            ${pesoIdeal.min} - ${pesoIdeal.max} kg
                        </span>
                    </div>
            `;
            
            if (objetivo === 'hipertrofia') {
                html += `
                    <div style="margin-top: 10px; padding: 15px; background: var(--primary)10; border-radius: 10px; font-size: 0.95em;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                            <span style="font-size: 1.2em;">💪</span>
                            <span><strong>Para hipertrofia:</strong> El peso puede estar por encima del rango saludable</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.2em;">📊</span>
                            <span>Lo importante es la composición corporal (músculo vs grasa)</span>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div style="height: 10px; background: var(--hover); border-radius: 5px; overflow: hidden; margin-top: 10px;">
                        <div style="width: ${porcentaje}%; height: 100%; background: var(--primary); border-radius: 5px;"></div>
                    </div>
                `;
            }
            
            html += `</div>`;
        }
        
        // Recomendación según objetivo
        html += `
            <div style="background: var(--card); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 15px;">
                    <span style="font-size: 1.3em;">💡</span>
                    <span style="font-weight: 600;">Recomendación para ${mensajeObjetivo}</span>
                </div>
                <div style="padding: 5px;">
                    ${this.obtenerRecomendacion(objetivo, datos)}
                </div>
            </div>
        `;
        
        // Historial de pesos
        if (this.historialPesos.length > 0) {
            html += `
                <div style="background: var(--card); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 15px;">
                        <span style="font-size: 1.3em;">📈</span>
                        <span style="font-weight: 600;">Historial de Pesos</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
            `;
            
            this.historialPesos.slice(0, 5).forEach((item, index) => {
                const variacion = index === 0 ? 0 : this.historialPesos[index - 1].peso - item.peso;
                const variacionColor = variacion > 0 ? '#e74c3c' : variacion < 0 ? '#00a86b' : '#666';
                const variacionTexto = variacion > 0 ? `+${variacion}` : variacion < 0 ? `${variacion}` : '=';
                
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg); border-radius: 10px;">
                        <span style="color: var(--text-secondary);">${item.fecha}</span>
                        <span style="font-weight: bold;">${item.peso} kg</span>
                        <span style="color: ${variacionColor}; font-weight: 500;">${variacionTexto}</span>
                    </div>
                `;
            });
            
            html += `</div></div>`;
        }
        
        // Meta personalizada según objetivo
        html += `
            <div style="background: linear-gradient(135deg, ${objetivoColor}10, var(--bg)); border-radius: 16px; padding: 20px; border: 1px dashed ${objetivoColor};">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
                            <span style="font-size: 1.3em;">🏆</span>
                            <span style="font-weight: 600;">Próxima meta</span>
                        </div>
                        <div style="font-size: 1.1em; color: ${objetivoColor}; font-weight: bold;">
                            ${metaTexto}
                        </div>
                    </div>
                    <div style="font-size: 2.5em; opacity: 0.5;">${objetivoEmoji}</div>
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
