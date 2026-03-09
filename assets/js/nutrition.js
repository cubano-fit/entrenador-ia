// LOGICA DE NUTRICIÓN - VERSIÓN CUBA
window.nutrition = {
    contador: 0,
    USAR_NUEVA_VERSION: true,

    generarPlan: function() {
        console.log('🥗 Generando plan personalizado...');
        
        if (!window.auth || !window.auth.usuarioActual) {
            document.getElementById('nutritionResult').innerHTML = 'Inicia sesión para generar planes';
            return;
        }

        try {
            return this.generarPlanCompleto();
        } catch (error) {
            console.error('❌ ERROR:', error);
            alert('Error generando plan personalizado. Usando plan estándar.');
            return this.generarPlanViejo();
        }
    },

    // ============================================
    // OBTENER DATOS DEL USUARIO (CORREGIDO)
    // ============================================
    obtenerDatosUsuario: function() {
        if (!window.auth || !window.auth.usuarioActual) return null;
        
        const usuario = window.auth.usuarioActual;
        
        // ===== CLAVE CORRECTA =====
        const perfilGuardado = JSON.parse(localStorage.getItem('perfil_' + usuario.usuario)) || {};
        
        console.log('📊 Perfil guardado:', perfilGuardado);
        console.log('🔑 Usuario:', usuario.usuario);
        
        return {
            nombre: perfilGuardado.nombre || usuario.nombre || usuario.usuario || 'Usuario',
            sexo: perfilGuardado.sexo || 'hombre',
            edad: parseInt(perfilGuardado.edad) || 30,
            peso: parseFloat(perfilGuardado.peso) || 70,
            altura: parseInt(perfilGuardado.altura) || 170,
            objetivo: perfilGuardado.objetivo || 'hipertrofia',
            equipo: perfilGuardado.equipo || 'cuerpo',
            nivel: perfilGuardado.nivel || 'intermedio'
        };
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
        let rangoSaludable = '';
        
        if (datos.sexo === 'hombre') {
            rangoSaludable = '12-18%';
        } else {
            rangoSaludable = '20-28%';
        }
        
        switch(datos.objetivo) {
            case 'perder peso':
                mensajeMotivador = `🎯 Enfocado en perder peso. Con ${grasaEstimada}% de grasa, tu meta es alcanzar ${rangoSaludable}. Déficit controlado + entrenamiento = resultados.`;
                color = '#e74c3c';
                break;
            case 'hipertrofia':
                mensajeMotivador = `💪 Objetivo: ganar músculo. Necesitas superávit calórico y suficiente proteína. Tu masa muscular aumentará con entrenamiento de fuerza.`;
                color = '#00a86b';
                break;
            case 'definicion':
                mensajeMotivador = `✨ Buscas definir. Mantén proteína alta y déficit moderado para conservar músculo mientras reduces grasa.`;
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
            color,
            rangoSaludable
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

    calcularMacros: function(datos, analisis) {
        const tmb = this.calcularTMB(datos);
        const get = this.calcularGET(tmb, datos.nivel);
        
        let calorias = get;
        let ajuste = '';
        let explicacionAjuste = '';
        
        switch(datos.objetivo) {
            case 'hipertrofia':
                calorias = get + 400;
                ajuste = 'superávit calórico (+400 kcal)';
                explicacionAjuste = '➕ Excedente calórico para construir nuevo tejido muscular';
                break;
            case 'definicion':
                calorias = get - 300;
                ajuste = 'déficit calórico (-300 kcal)';
                explicacionAjuste = '➖ Déficit moderado para quemar grasa sin perder músculo';
                break;
            case 'perder peso':
                calorias = get - 500;
                ajuste = 'déficit calórico (-500 kcal)';
                explicacionAjuste = '⬇️ Déficit para pérdida de grasa efectiva (0.5kg/semana)';
                break;
            default:
                calorias = get;
                ajuste = 'mantenimiento';
                explicacionAjuste = '⚖️ Calorías para mantener peso actual';
        }
        
        const peso = datos.peso;
        
        let proteinas, explicacionProteinas;
        if (datos.objetivo === 'hipertrofia') {
            proteinas = Math.round(peso * 2.2);
            explicacionProteinas = 'Alta proteína para síntesis muscular';
        } else if (datos.objetivo === 'definicion') {
            proteinas = Math.round(peso * 2.0);
            explicacionProteinas = 'Proteína alta para conservar músculo en déficit';
        } else {
            proteinas = Math.round(peso * 1.8);
            explicacionProteinas = 'Proteína suficiente para saciedad y conservar músculo';
        }
        
        let grasas, explicacionGrasas;
        if (datos.objetivo === 'perder peso') {
            grasas = Math.round(peso * 0.8);
            explicacionGrasas = 'Grasa moderada para déficit calórico';
        } else {
            grasas = Math.round(peso * 1.0);
            explicacionGrasas = 'Grasa adecuada para función hormonal';
        }
        
        let caloriasProteinas = proteinas * 4;
        let caloriasGrasas = grasas * 9;
        let caloriasCarbos = calorias - (caloriasProteinas + caloriasGrasas);
        let carbohidratos = Math.round(caloriasCarbos / 4);
        
        let explicacionCarbos;
        if (datos.nivel === 'avanzado') {
            explicacionCarbos = 'Mayor cantidad para rendimiento intenso';
        } else if (datos.objetivo === 'perder peso') {
            explicacionCarbos = 'Moderados para mantener energía en déficit';
        } else {
            explicacionCarbos = 'Energía principal para entrenamientos';
        }
        
        return {
            tmb: Math.round(tmb),
            get: get,
            calorias: calorias,
            ajuste: ajuste,
            explicacionAjuste: explicacionAjuste,
            proteinas: proteinas,
            explicacionProteinas: explicacionProteinas,
            grasas: grasas,
            explicacionGrasas: explicacionGrasas,
            carbohidratos: carbohidratos,
            explicacionCarbos: explicacionCarbos,
            agua: Math.round(peso * 0.035 * 10) / 10
        };
    },

    // ============================================
    // MENÚ ADAPTADO A CUBA
    // ============================================
    generarMenu: function(datos, calculos) {
        const peso = datos.peso;
        const objetivo = datos.objetivo;
        
        const porcion = (base) => {
            if (peso > 90) return Math.round(base * 1.3);
            if (peso > 70) return Math.round(base * 1.15);
            return base;
        };
        
        // Menús con productos disponibles en Cuba
        const menus = {
            hipertrofia: {
                desayuno: [
                    { texto: `${porcion(3)} huevos fritos o revueltos + café con leche + 2 panes con mantequilla + 1 plátano fruta`, proteinas: porcion(24), carbos: porcion(65), grasas: porcion(22), proposito: 'Desayuno completo para empezar con energía' },
                    { texto: `${porcion(2)} panes con jamón o queso + jugo de naranja natural + café`, proteinas: porcion(28), carbos: porcion(55), grasas: porcion(18), proposito: 'Opción rápida y nutritiva' }
                ],
                almuerzo: [
                    { texto: `${porcion(200)}g pierna de cerdo asada + ${porcion(200)}g arroz moros + ${porcion(150)}g boniato frito + ensalada de col y tomate`, proteinas: porcion(48), carbos: porcion(95), grasas: porcion(28), proposito: 'Comida principal con proteína de calidad' },
                    { texto: `${porcion(2)} piernas de pollo asado + ${porcion(200)}g arroz blanco + ${porcion(150)}g frijoles colorados + plátano maduro frito`, proteinas: porcion(45), carbos: porcion(90), grasas: porcion(22), proposito: 'Comida completa y energética' }
                ],
                merienda: [
                    { texto: `Batido de leche con plátano y avena (vaso grande) + ${porcion(2)} galletas de avena`, proteinas: porcion(20), carbos: porcion(55), grasas: porcion(8), proposito: 'Refuerzo post-entreno' },
                    { texto: `${porcion(2)} huevos duros + 1 plátano fruta + café`, proteinas: porcion(18), carbos: porcion(30), grasas: porcion(12), proposito: 'Merienda práctica y equilibrada' }
                ],
                cena: [
                    { texto: `${porcion(200)}g pescado frito + ${porcion(200)}g yuca con mojo + ensalada de aguacate`, proteinas: porcion(42), carbos: porcion(65), grasas: porcion(22), proposito: 'Cena nutritiva, rica en omega-3' },
                    { texto: `Fricasé de pollo con ${porcion(200)}g arroz + vegetales`, proteinas: porcion(40), carbos: porcion(60), grasas: porcion(18), proposito: 'Proteína magra para la noche' }
                ],
                snack: [
                    { texto: 'Café con leche + 1 pan con mantequilla', proteinas: porcion(8), carbos: porcion(25), grasas: porcion(10), proposito: 'Snack nocturno ligero' },
                    { texto: 'Yogurt natural + 1 plátano', proteinas: porcion(10), carbos: porcion(25), grasas: porcion(4), proposito: 'Opción suave para la noche' }
                ]
            },
            definicion: {
                desayuno: [
                    { texto: `${porcion(2)} huevos revueltos + café solo + 1 plátano fruta`, proteinas: porcion(18), carbos: porcion(25), grasas: porcion(12), proposito: 'Menos calorías, misma proteína' },
                    { texto: `Batido de claras de huevo con leche y avena`, proteinas: porcion(25), carbos: porcion(30), grasas: porcion(5), proposito: 'Opción líquida y baja en grasa' }
                ],
                almuerzo: [
                    { texto: `${porcion(150)}g pechuga de pollo a la plancha + ${porcion(100)}g arroz integral + ensalada de lechuga, tomate y pepino`, proteinas: porcion(35), carbos: porcion(50), grasas: porcion(8), proposito: 'Menos carbos, más vegetales' },
                    { texto: `${porcion(200)}g pescado a la plancha + ${porcion(150)}g boniato hervido + vegetales al vapor`, proteinas: porcion(38), carbos: porcion(45), grasas: porcion(8), proposito: 'Bajo en grasa, alta proteína' }
                ],
                merienda: [
                    { texto: `1 yogurt natural + 1 manzana`, proteinas: porcion(10), carbos: porcion(20), grasas: porcion(3), proposito: 'Proteína sin calorías extras' },
                    { texto: `${porcion(2)} claras de huevo duro + café`, proteinas: porcion(12), carbos: porcion(2), grasas: porcion(1), proposito: 'Merienda casi cero grasa' }
                ],
                cena: [
                    { texto: `${porcion(150)}g pollo desmenuzado + ensalada grande + ${porcion(50)}g arroz`, proteinas: porcion(32), carbos: porcion(25), grasas: porcion(8), proposito: 'Cena ligera alta en proteína' },
                    { texto: `Tortilla de ${porcion(3)} claras con vegetales + 1 pan integral`, proteinas: porcion(22), carbos: porcion(20), grasas: porcion(6), proposito: 'Opción vegetariana baja en calorías' }
                ],
                snack: [
                    { texto: 'Infusión + 1 manzana', proteinas: porcion(1), carbos: porcion(15), grasas: porcion(1), proposito: 'Snack ligero' },
                    { texto: 'Yogurt natural', proteinas: porcion(8), carbos: porcion(10), grasas: porcion(3), proposito: 'Proteína ligera antes de dormir' }
                ]
            },
            'perder peso': {
                desayuno: [
                    { texto: `${porcion(2)} huevos duros + café solo + 1 naranja`, proteinas: porcion(14), carbos: porcion(12), grasas: porcion(10), proposito: 'Bajo en calorías, saciedad por proteína' },
                    { texto: `Batido de claras de huevo con agua + 1 manzana`, proteinas: porcion(20), carbos: porcion(20), grasas: porcion(2), proposito: 'Opción rápida y baja en calorías' }
                ],
                almuerzo: [
                    { texto: `${porcion(150)}g pechuga de pollo hervida + ${porcion(50)}g arroz + ensalada abundante`, proteinas: porcion(32), carbos: porcion(30), grasas: porcion(6), proposito: 'Comida equilibrada con déficit calórico' },
                    { texto: `Caldo de pescado con vegetales + ${porcion(100)}g malanga hervida`, proteinas: porcion(25), carbos: porcion(25), grasas: porcion(4), proposito: 'Alta proteína, baja en calorías' }
                ],
                merienda: [
                    { texto: '1 manzana o 1 naranja', proteinas: porcion(1), carbos: porcion(15), grasas: porcion(1), proposito: 'Snack ligero' },
                    { texto: 'Infusión + 1 pan integral pequeño', proteinas: porcion(3), carbos: porcion(12), grasas: porcion(1), proposito: 'Opción para media tarde' }
                ],
                cena: [
                    { texto: `${porcion(150)}g pescado a la plancha + vegetales al vapor`, proteinas: porcion(30), carbos: porcion(10), grasas: porcion(6), proposito: 'Cena ligera y saciante' },
                    { texto: `Caldo de pollo con verduras + ${porcion(100)}g pechuga desmenuzada`, proteinas: porcion(22), carbos: porcion(8), grasas: porcion(3), proposito: 'Cena caliente y baja en calorías' }
                ],
                snack: [
                    { texto: 'Infusión + gelatina sin azúcar', proteinas: porcion(2), carbos: porcion(2), grasas: porcion(0), proposito: 'Casi cero calorías' },
                    { texto: '1 yogurt natural desnatado', proteinas: porcion(8), carbos: porcion(8), grasas: porcion(2), proposito: 'Proteína ligera antes de dormir' }
                ]
            }
        };

        return menus[objetivo] || menus.definicion;
    },

    obtenerCaracteristicas: function(datos, calculos) {
        return `
            <div style="background: var(--bg); padding: 20px; border-radius: 15px; margin: 20px 0; border: 1px solid var(--border);">
                <h4 style="color: var(--primary); margin-bottom: 15px;">📋 CARACTERÍSTICAS DE LA DIETA</h4>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary);">🍽️ DISTRIBUCIÓN DE COMIDAS</div>
                    <div>• 5-6 comidas al día para mantener metabolismo activo</div>
                    <div>• Desayuno: 20-25% de calorías diarias</div>
                    <div>• Almuerzo: 30-35% de calorías diarias</div>
                    <div>• Merienda: 10-15% de calorías diarias</div>
                    <div>• Cena: 20-25% de calorías diarias</div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary);">🥩 ALIMENTOS RECOMENDADOS EN CUBA</div>
                    <div><strong>Proteínas:</strong> Pollo, cerdo, pescado, huevos, frijoles, soya</div>
                    <div><strong>Carbohidratos:</strong> Arroz, boniato, yuca, malanga, plátano, papa</div>
                    <div><strong>Grasas saludables:</strong> Aguacate, aceite de oliva (cuando hay), maní</div>
                    <div><strong>Vegetales:</strong> Col, pepino, lechuga, tomate, calabaza, pimiento</div>
                    <div><strong>Frutas:</strong> Plátano fruta, naranja, mango, papaya, guayaba</div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary);">💊 SUPLEMENTOS (OPCIONALES)</div>
                    <div>• <strong>Proteína en polvo:</strong> Si consigues en shopping o por mayorista</div>
                    <div>• <strong>Creatina:</strong> 3-5g/día (aumenta fuerza y rendimiento)</div>
                    <div>• <strong>Omega-3:</strong> Pescado azul (cuando hay) o suplemento</div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary);">💧 HIDRATACIÓN</div>
                    <div>• <strong>${calculos.agua} litros de agua al día</strong> (basado en tu peso)</div>
                    <div>• Aumentar en días de entrenamiento intenso</div>
                    <div>• Evitar bebidas azucaradas</div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary);">📊 AJUSTES Y SEGUIMIENTO</div>
                    <div>• <strong>Pesarse 1 vez por semana</strong>, mismo día y hora</div>
                    <div>• <strong>Tomar medidas</strong> (cintura, cadera) cada 2 semanas</div>
                    <div>• Si no hay cambios en 2-3 semanas, <strong>ajustar calorías</strong> (±200 kcal)</div>
                </div>
                
                <div>
                    <div style="font-weight: 600; color: var(--primary);">✨ RECOMENDACIONES ADICIONALES</div>
                    <div>• <strong>Dormir 7-8 horas</strong> para optimizar recuperación muscular</div>
                    <div>• <strong>Priorizar proteína en cada comida</strong></div>
                    <div>• <strong>Aprovechar frutas de temporada</strong> (mango, papaya, guayaba)</div>
                    <div>• <strong>El huevo es tu mejor aliado</strong> en Cuba: económico y alta proteína</div>
                    <div>• <strong>Ten frijoles preparados siempre</strong> (colorados, negros, garbanzos)</div>
                </div>
            </div>
        `;
    },

    generarPlanCompleto: function() {
        const datos = this.obtenerDatosUsuario();
        if (!datos) throw new Error('No se pudieron obtener datos');
        
        console.log('📊 Datos para nutrición:', datos);
        
        const analisis = this.analizarComposicion(datos);
        const calculos = this.calcularMacros(datos, analisis);
        const menuCategorias = this.generarMenu(datos, calculos);
        const caracteristicas = this.obtenerCaracteristicas(datos, calculos);
        
        const indice = this.contador % 2;
        
        const objetivoTexto = {
            'hipertrofia': '💪 Hipertrofia (ganar músculo)',
            'definicion': '✨ Definición (marcar músculo)',
            'perder peso': '🔥 Perder peso'
        }[datos.objetivo] || datos.objetivo;
        
        const totalProteinas = Math.round(
            menuCategorias.desayuno[indice].proteinas +
            menuCategorias.almuerzo[indice].proteinas +
            menuCategorias.merienda[indice].proteinas +
            menuCategorias.cena[indice].proteinas +
            menuCategorias.snack[indice].proteinas
        );
        
        const totalCarbos = Math.round(
            menuCategorias.desayuno[indice].carbos +
            menuCategorias.almuerzo[indice].carbos +
            menuCategorias.merienda[indice].carbos +
            menuCategorias.cena[indice].carbos +
            menuCategorias.snack[indice].carbos
        );
        
        const totalGrasas = Math.round(
            menuCategorias.desayuno[indice].grasas +
            menuCategorias.almuerzo[indice].grasas +
            menuCategorias.merienda[indice].grasas +
            menuCategorias.cena[indice].grasas +
            menuCategorias.snack[indice].grasas
        );
        
        const totalKcal = Math.round(totalProteinas*4 + totalCarbos*4 + totalGrasas*9);
        
        const html = `
            <div style="max-height: 500px; overflow-y: auto; padding-right: 5px;">
                <!-- DATOS Y ANÁLISIS -->
                <div style="background: linear-gradient(135deg, var(--primary)20, var(--bg)); padding: 20px; border-radius: 15px; margin-bottom: 20px; border: 1px solid var(--primary);">
                    <h4 style="color: var(--primary); margin-bottom: 15px;">📊 TUS DATOS Y OBJETIVO</h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 15px;">
                        <div><strong>Edad:</strong> ${datos.edad} años</div>
                        <div><strong>Peso:</strong> ${datos.peso} kg</div>
                        <div><strong>Altura:</strong> ${datos.altura} cm</div>
                        <div><strong>Objetivo:</strong> ${objetivoTexto}</div>
                    </div>
                    
                    <div style="background: var(--bg); padding: 15px; border-radius: 10px; margin: 10px 0;">
                        <div style="display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; text-align: center;">
                            <div><div style="font-size: 1.8em; font-weight: bold; color: var(--primary);">${analisis.imc}</div><div>IMC</div></div>
                            <div><div style="font-size: 1.8em; font-weight: bold; color: var(--primary);">${analisis.grasaEstimada}%</div><div>Grasa estimada</div></div>
                            <div><div style="font-size: 1.8em; font-weight: bold; color: var(--primary);">${analisis.pesoMin}-${analisis.pesoMax}</div><div>Peso ideal</div></div>
                        </div>
                    </div>
                    
                    <div style="color: ${analisis.color}; font-weight: 500; padding: 10px; background: ${analisis.color}10; border-radius: 10px;">
                        ${analisis.mensajeMotivador}
                    </div>
                </div>
                
                <!-- REQUERIMIENTOS -->
                <div style="background: var(--bg); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <h4 style="color: var(--primary); margin-bottom: 15px;">⚡ REQUERIMIENTOS DIARIOS</h4>
                    
                    <div style="background: var(--primary)10; padding: 15px; border-radius: 10px; margin-bottom: 15px; text-align:center;">
                        <div style="font-size: 2.2em; font-weight: bold; color: var(--primary);">${calculos.calorias} kcal</div>
                        <div>${calculos.ajuste} • ${calculos.explicacionAjuste}</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; text-align: center;">
                        <div style="background: var(--hover); padding: 10px; border-radius: 10px;">
                            <div style="font-weight: bold; color: var(--primary);">${calculos.proteinas}g</div>
                            <div>Proteínas</div>
                            <div style="font-size: 0.8em;">${calculos.explicacionProteinas}</div>
                        </div>
                        <div style="background: var(--hover); padding: 10px; border-radius: 10px;">
                            <div style="font-weight: bold; color: var(--primary);">${calculos.carbohidratos}g</div>
                            <div>Carbohidratos</div>
                            <div style="font-size: 0.8em;">${calculos.explicacionCarbos}</div>
                        </div>
                        <div style="background: var(--hover); padding: 10px; border-radius: 10px;">
                            <div style="font-weight: bold; color: var(--primary);">${calculos.grasas}g</div>
                            <div>Grasas</div>
                            <div style="font-size: 0.8em;">${calculos.explicacionGrasas}</div>
                        </div>
                    </div>
                </div>
                
                <!-- MENÚ DEL DÍA -->
                <h4 style="color: var(--primary); margin: 15px 0 10px;">🍽️ MENÚ DEL DÍA (${totalKcal} kcal)</h4>
                
                ${['DESAYUNO', 'ALMUERZO', 'MERIENDA', 'CENA', 'SNACK NOCTURNO'].map((titulo, i) => {
                    const comida = [menuCategorias.desayuno[indice], menuCategorias.almuerzo[indice], menuCategorias.merienda[indice], menuCategorias.cena[indice], menuCategorias.snack[indice]][i];
                    const emoji = ['🌅', '☀️', '✨', '🌙', '🌜'][i];
                    const colores = ['#f39c12', '#e67e22', '#3498db', '#2c3e50', '#95a5a6'][i];
                    
                    return `
                        <div style="background: var(--card); border-radius: 12px; padding: 15px; margin-bottom: 10px; border-left: 4px solid ${colores};">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: bold; font-size: 1.1em;">${emoji} ${titulo}</span>
                                <span style="background: var(--hover); padding: 3px 10px; border-radius: 20px; font-size: 0.85em;">
                                    ${Math.round(comida.proteinas*4 + comida.carbos*4 + comida.grasas*9)} kcal
                                </span>
                            </div>
                            <div style="padding-left: 10px;">
                                <div>${comida.texto}</div>
                                <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 0.85em;">
                                    <span>🔹 Proteínas: ${comida.proteinas}g</span>
                                    <span>🔹 Carbos: ${comida.carbos}g</span>
                                    <span>🔹 Grasas: ${comida.grasas}g</span>
                                </div>
                                <div style="font-size: 0.8em; color: var(--text-secondary); margin-top: 5px;">
                                    💡 ${comida.proposito}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
                
                <!-- RESUMEN DEL DÍA -->
                <div style="background: var(--primary)20; padding: 15px; border-radius: 15px; margin-bottom: 20px; border: 1px dashed var(--primary);">
                    <div style="font-weight: bold; margin-bottom: 10px;">📊 RESUMEN DEL DÍA</div>
                    <div style="display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; text-align: center;">
                        <div><span style="font-weight: bold;">${totalKcal}</span><br><small>kcal</small></div>
                        <div><span style="font-weight: bold;">${totalProteinas}g</span><br><small>proteínas</small></div>
                        <div><span style="font-weight: bold;">${totalCarbos}g</span><br><small>carbos</small></div>
                        <div><span style="font-weight: bold;">${totalGrasas}g</span><br><small>grasas</small></div>
                    </div>
                </div>
                
                <!-- CARACTERÍSTICAS -->
                ${caracteristicas}
                
                <!-- BOTÓN -->
                <div style="text-align: center; margin: 20px 0;">
                    <button class="btn-primary" onclick="window.nutrition.generarPlan()" style="width: auto; padding: 12px 25px;">
                        🔄 Generar otra opción de menú
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('nutritionResult').innerHTML = html;
        this.contador++;
    },

    generarPlanViejo: function() {
        const objetivo = this.obtenerObjetivoUsuario();
        if (!window.planesNutricionales) {
            document.getElementById('nutritionResult').innerHTML = 'Error: Planes no disponibles';
            return;
        }
        const planes = window.planesNutricionales[objetivo] || window.planesNutricionales.definicion;
        const plan = planes[this.contador % planes.length];
        
        document.getElementById('nutritionResult').innerHTML = `
            <h3 style="color:var(--primary);">🥗 Plan básico</h3>
            <div><strong>🌅 Desayuno:</strong> ${plan.des}</div>
            <div><strong>☀️ Almuerzo:</strong> ${plan.alm}</div>
            <div><strong>✨ Merienda:</strong> ${plan.mer}</div>
            <div><strong>🌙 Cena:</strong> ${plan.cena}</div>
        `;
    },

    obtenerObjetivoUsuario: function() {
        const datos = this.obtenerDatosUsuario();
        return datos?.objetivo || 'definicion';
    }
};

console.log('✅ nutrition.js - Versión Cuba 🇨🇺');
