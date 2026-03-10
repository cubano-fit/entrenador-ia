// assets/js/nutrition.js - VERSIÓN COMPLETA
window.nutrition = {
    contador: 0,

    generarPlan: function() {
        console.log('🥗 Generando plan personalizado...');
        
        const perfil = JSON.parse(localStorage.getItem('cliente_perfil'));
        if (!perfil) {
            document.getElementById('nutritionResult').innerHTML = 'Completa tu perfil primero';
            return;
        }

        try {
            return this.generarPlanCompleto();
        } catch (error) {
            console.error('❌ ERROR:', error);
            document.getElementById('nutritionResult').innerHTML = 'Error generando plan';
        }
    },

    obtenerDatosUsuario: function() {
        return JSON.parse(localStorage.getItem('cliente_perfil'));
    },

    analizarComposicion: function(datos) {
        const alturaM = datos.altura / 100;
        const imc = (datos.peso / (alturaM * alturaM)).toFixed(1);
        
        const pesoMin = (18.5 * alturaM * alturaM).toFixed(1);
        const pesoMax = (24.9 * alturaM * alturaM).toFixed(1);
        
        let grasaEstimada;
        if (datos.sexo === 'hombre') {
            grasaEstimada = (1.20 * imc) + (0.23 * datos.edad) - 16.2;
        } else {
            grasaEstimada = (1.20 * imc) + (0.23 * datos.edad) - 5.4;
        }
        grasaEstimada = Math.max(8, Math.min(40, Math.round(grasaEstimada)));
        
        let mensajeMotivador = '';
        let color = '';
        
        switch(datos.objetivo) {
            case 'perder peso':
                mensajeMotivador = `🎯 Enfocado en perder peso. Con ${grasaEstimada}% de grasa estimada.`;
                color = '#e74c3c';
                break;
            case 'hipertrofia':
                mensajeMotivador = `💪 Objetivo: ganar músculo. Necesitas superávit calórico.`;
                color = '#00a86b';
                break;
            case 'definicion':
                mensajeMotivador = `✨ Buscas definir. Mantén proteína alta.`;
                color = '#f39c12';
                break;
            default:
                mensajeMotivador = `🎯 Mantén consistencia en tu plan.`;
                color = '#00a86b';
        }
        
        return {
            imc,
            pesoMin,
            pesoMax,
            grasaEstimada,
            mensajeMotivador,
            color
        };
    },

    calcularTMB: function(datos) {
        if (datos.sexo === 'hombre') {
            return (10 * datos.peso) + (6.25 * datos.altura) - (5 * datos.edad) + 5;
        } else {
            return (10 * datos.peso) + (6.25 * datos.altura) - (5 * datos.edad) - 161;
        }
    },

    calcularGET: function(tmb, nivel) {
        const factores = {
            'principiante': 1.375,
            'intermedio': 1.55,
            'avanzado': 1.725
        };
        return Math.round(tmb * (factores[nivel] || 1.55));
    },

    calcularMacros: function(datos) {
        const tmb = this.calcularTMB(datos);
        const get = this.calcularGET(tmb, datos.nivel);
        
        let calorias = get;
        let ajuste = '';
        
        switch(datos.objetivo) {
            case 'hipertrofia':
                calorias = get + 400;
                ajuste = 'superávit (+400 kcal)';
                break;
            case 'definicion':
                calorias = get - 300;
                ajuste = 'déficit (-300 kcal)';
                break;
            case 'perder peso':
                calorias = get - 500;
                ajuste = 'déficit (-500 kcal)';
                break;
            default:
                calorias = get;
                ajuste = 'mantenimiento';
        }
        
        const peso = datos.peso;
        
        let proteinas;
        if (datos.objetivo === 'hipertrofia') {
            proteinas = Math.round(peso * 2.2);
        } else if (datos.objetivo === 'definicion') {
            proteinas = Math.round(peso * 2.0);
        } else {
            proteinas = Math.round(peso * 1.8);
        }
        
        let grasas;
        if (datos.objetivo === 'perder peso') {
            grasas = Math.round(peso * 0.8);
        } else {
            grasas = Math.round(peso * 1.0);
        }
        
        let caloriasProteinas = proteinas * 4;
        let caloriasGrasas = grasas * 9;
        let caloriasCarbos = calorias - (caloriasProteinas + caloriasGrasas);
        let carbohidratos = Math.round(caloriasCarbos / 4);
        
        return {
            calorias: calorias,
            ajuste: ajuste,
            proteinas: proteinas,
            grasas: grasas,
            carbohidratos: carbohidratos,
            agua: Math.round(peso * 0.035 * 10) / 10
        };
    },

    generarMenu: function(datos, calculos) {
        const peso = datos.peso;
        const objetivo = datos.objetivo;
        
        const porcion = (base) => {
            if (peso > 90) return Math.round(base * 1.3);
            if (peso > 70) return Math.round(base * 1.15);
            return base;
        };
        
        const menus = {
            hipertrofia: {
                desayuno: [
                    { texto: `${porcion(3)} huevos revueltos + ${porcion(80)}g avena + 1 plátano`, proteinas: porcion(24), carbos: porcion(65), grasas: porcion(22) },
                    { texto: `${porcion(2)} huevos + ${porcion(2)} panes + aguacate`, proteinas: porcion(28), carbos: porcion(55), grasas: porcion(20) }
                ],
                almuerzo: [
                    { texto: `${porcion(200)}g pechuga pollo + ${porcion(150)}g arroz + ensalada`, proteinas: porcion(48), carbos: porcion(85), grasas: porcion(18) },
                    { texto: `${porcion(250)}g pescado + ${porcion(200)}g boniato + vegetales`, proteinas: porcion(45), carbos: porcion(90), grasas: porcion(15) }
                ],
                merienda: [
                    { texto: `Batido: 1 scoop proteína + ${porcion(40)}g avena + 1 plátano`, proteinas: porcion(28), carbos: porcion(45), grasas: porcion(5) },
                    { texto: `${porcion(2)} huevos duros + 1 manzana`, proteinas: porcion(14), carbos: porcion(20), grasas: porcion(10) }
                ],
                cena: [
                    { texto: `${porcion(200)}g pollo + ${porcion(150)}g quinoa + vegetales`, proteinas: porcion(45), carbos: porcion(60), grasas: porcion(15) },
                    { texto: `${porcion(200)}g pescado + ensalada + ${porcion(100)}g boniato`, proteinas: porcion(42), carbos: porcion(40), grasas: porcion(12) }
                ],
                snack: [
                    { texto: `Yogurt griego + ${porcion(15)}g almendras`, proteinas: porcion(15), carbos: porcion(10), grasas: porcion(12) },
                    { texto: 'Batido de proteína con leche', proteinas: porcion(25), carbos: porcion(10), grasas: porcion(3) }
                ]
            },
            definicion: {
                desayuno: [
                    { texto: `${porcion(2)} huevos + claras + ${porcion(40)}g avena + 1 naranja`, proteinas: porcion(25), carbos: porcion(40), grasas: porcion(10) },
                    { texto: `Batido: 1 scoop proteína + ${porcion(30)}g avena`, proteinas: porcion(28), carbos: porcion(30), grasas: porcion(4) }
                ],
                almuerzo: [
                    { texto: `${porcion(180)}g pechuga pollo + ${porcion(100)}g arroz + ensalada`, proteinas: porcion(42), carbos: porcion(60), grasas: porcion(8) },
                    { texto: `${porcion(200)}g pescado blanco + ${porcion(100)}g quinoa + verduras`, proteinas: porcion(40), carbos: porcion(35), grasas: porcion(6) }
                ],
                merienda: [
                    { texto: `1 scoop proteína con agua + 1 manzana`, proteinas: porcion(25), carbos: porcion(20), grasas: porcion(2) },
                    { texto: `${porcion(2)} claras de huevo duro + pepino`, proteinas: porcion(12), carbos: porcion(5), grasas: porcion(1) }
                ],
                cena: [
                    { texto: `${porcion(180)}g pescado + ${porcion(150)}g brócoli`, proteinas: porcion(38), carbos: porcion(15), grasas: porcion(8) },
                    { texto: `Tortilla de ${porcion(3)} claras + vegetales`, proteinas: porcion(25), carbos: porcion(10), grasas: porcion(5) }
                ],
                snack: [
                    { texto: 'Yogurt griego bajo en grasa', proteinas: porcion(12), carbos: porcion(8), grasas: porcion(3) },
                    { texto: 'Batido de proteína con agua', proteinas: porcion(25), carbos: porcion(2), grasas: porcion(1) }
                ]
            },
            'perder peso': {
                desayuno: [
                    { texto: `${porcion(2)} huevos duros + 1 naranja + café`, proteinas: porcion(14), carbos: porcion(15), grasas: porcion(10) },
                    { texto: `Batido: 1 scoop proteína con agua + 1 manzana`, proteinas: porcion(25), carbos: porcion(20), grasas: porcion(2) }
                ],
                almuerzo: [
                    { texto: `${porcion(150)}g pechuga pollo + ${porcion(80)}g arroz + ensalada`, proteinas: porcion(35), carbos: porcion(40), grasas: porcion(6) },
                    { texto: `Ensalada de atún (${porcion(150)}g) con vegetales`, proteinas: porcion(35), carbos: porcion(10), grasas: porcion(8) }
                ],
                merienda: [
                    { texto: '1 manzana o 1 naranja', proteinas: porcion(1), carbos: porcion(20), grasas: porcion(1) },
                    { texto: 'Infusión + 1 pan integral', proteinas: porcion(3), carbos: porcion(15), grasas: porcion(1) }
                ],
                cena: [
                    { texto: `${porcion(150)}g pescado blanco + ${porcion(200)}g verduras`, proteinas: porcion(32), carbos: porcion(15), grasas: porcion(6) },
                    { texto: `Caldo de pollo con verduras + ${porcion(100)}g pechuga`, proteinas: porcion(25), carbos: porcion(8), grasas: porcion(3) }
                ],
                snack: [
                    { texto: 'Infusión + gelatina sin azúcar', proteinas: porcion(2), carbos: porcion(2), grasas: porcion(0) },
                    { texto: '1 yogurt natural desnatado', proteinas: porcion(8), carbos: porcion(8), grasas: porcion(2) }
                ]
            }
        };

        return menus[objetivo] || menus.definicion;
    },

    generarPlanCompleto: function() {
        const datos = this.obtenerDatosUsuario();
        if (!datos) return;
        
        const analisis = this.analizarComposicion(datos);
        const calculos = this.calcularMacros(datos);
        const menu = this.generarMenu(datos, calculos);
        
        const indice = this.contador % 2;
        
        const objetivoTexto = {
            'hipertrofia': '💪 Hipertrofia',
            'definicion': '✨ Definición',
            'perder peso': '🔥 Perder peso'
        }[datos.objetivo] || datos.objetivo;
        
        const html = `
            <div>
                <div style="background: var(--primary); color: white; padding: 15px; border-radius: 15px; margin-bottom: 20px;">
                    <h3 style="margin:0;">📊 TUS DATOS</h3>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 20px;">
                    <div><strong>Edad:</strong> ${datos.edad} años</div>
                    <div><strong>Peso:</strong> ${datos.peso} kg</div>
                    <div><strong>Altura:</strong> ${datos.altura} cm</div>
                    <div><strong>Objetivo:</strong> ${objetivoTexto}</div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 20px;">
                    <div style="text-align:center; background:var(--bg); padding:10px; border-radius:10px;">
                        <div style="font-size:1.8em; font-weight:bold; color:var(--primary);">${analisis.imc}</div>
                        <div>IMC</div>
                    </div>
                    <div style="text-align:center; background:var(--bg); padding:10px; border-radius:10px;">
                        <div style="font-size:1.8em; font-weight:bold; color:var(--primary);">${analisis.grasaEstimada}%</div>
                        <div>Grasa</div>
                    </div>
                    <div style="text-align:center; background:var(--bg); padding:10px; border-radius:10px;">
                        <div style="font-size:1.8em; font-weight:bold; color:var(--primary);">${analisis.pesoMin}-${analisis.pesoMax}</div>
                        <div>Peso ideal</div>
                    </div>
                </div>
                
                <div style="color: ${analisis.color}; padding:10px; background:${analisis.color}20; border-radius:10px; margin-bottom:20px;">
                    ${analisis.mensajeMotivador}
                </div>
                
                <div style="background: var(--bg); padding:20px; border-radius:15px; margin-bottom:20px;">
                    <h4 style="color:var(--primary);">⚡ REQUERIMIENTOS</h4>
                    <div style="font-size:2.2em; font-weight:bold; color:var(--primary); text-align:center;">${calculos.calorias} kcal</div>
                    <div style="text-align:center; margin-bottom:15px;">${calculos.ajuste}</div>
                    
                    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px;">
                        <div style="text-align:center;"><span style="font-weight:bold;">${calculos.proteinas}g</span><br>Proteínas</div>
                        <div style="text-align:center;"><span style="font-weight:bold;">${calculos.carbohidratos}g</span><br>Carbos</div>
                        <div style="text-align:center;"><span style="font-weight:bold;">${calculos.grasas}g</span><br>Grasas</div>
                    </div>
                </div>
                
                <h4 style="color:var(--primary);">🍽️ MENÚ</h4>
                
                <div style="background:var(--card); padding:15px; border-radius:12px; margin-bottom:10px; border-left:4px solid #f39c12;">
                    <div style="font-weight:bold;">🌅 DESAYUNO</div>
                    <div>${menu.desayuno[indice].texto}</div>
                    <div style="font-size:0.85em; color:var(--text-secondary);">P:${menu.desayuno[indice].proteinas}g C:${menu.desayuno[indice].carbos}g G:${menu.desayuno[indice].grasas}g</div>
                </div>
                
                <div style="background:var(--card); padding:15px; border-radius:12px; margin-bottom:10px; border-left:4px solid #e67e22;">
                    <div style="font-weight:bold;">☀️ ALMUERZO</div>
                    <div>${menu.almuerzo[indice].texto}</div>
                    <div style="font-size:0.85em; color:var(--text-secondary);">P:${menu.almuerzo[indice].proteinas}g C:${menu.almuerzo[indice].carbos}g G:${menu.almuerzo[indice].grasas}g</div>
                </div>
                
                <div style="background:var(--card); padding:15px; border-radius:12px; margin-bottom:10px; border-left:4px solid #3498db;">
                    <div style="font-weight:bold;">✨ MERIENDA</div>
                    <div>${menu.merienda[indice].texto}</div>
                    <div style="font-size:0.85em; color:var(--text-secondary);">P:${menu.merienda[indice].proteinas}g C:${menu.merienda[indice].carbos}g G:${menu.merienda[indice].grasas}g</div>
                </div>
                
                <div style="background:var(--card); padding:15px; border-radius:12px; margin-bottom:10px; border-left:4px solid #2c3e50;">
                    <div style="font-weight:bold;">🌙 CENA</div>
                    <div>${menu.cena[indice].texto}</div>
                    <div style="font-size:0.85em; color:var(--text-secondary);">P:${menu.cena[indice].proteinas}g C:${menu.cena[indice].carbos}g G:${menu.cena[indice].grasas}g</div>
                </div>
                
                <div style="background:var(--card); padding:15px; border-radius:12px; margin-bottom:20px; border-left:4px solid #95a5a6;">
                    <div style="font-weight:bold;">🌜 SNACK</div>
                    <div>${menu.snack[indice].texto}</div>
                    <div style="font-size:0.85em; color:var(--text-secondary);">P:${menu.snack[indice].proteinas}g C:${menu.snack[indice].carbos}g G:${menu.snack[indice].grasas}g</div>
                </div>
                
                <button class="btn-primary" onclick="window.nutrition.generarPlan()" style="width:100%;">🔄 Otra opción</button>
            </div>
        `;
        
        document.getElementById('nutritionResult').innerHTML = html;
        this.contador++;
    }
};

console.log('✅ nutrition.js cargado');
