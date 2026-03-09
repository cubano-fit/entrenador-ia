// LOGICA DE NUTRICIÓN - VERSIÓN MEJORADA CON ANÁLISIS COMPLETO
window.nutrition = {
    contador: 0,
    USAR_NUEVA_VERSION: true,

    // ============================================
    // VERSIÓN PRINCIPAL
    // ============================================
    generarPlan: function() {
    console.log('🥗 Generando plan personalizado...');
    
    if (!window.auth || !window.auth.usuarioActual) {
        document.getElementById('nutritionResult').innerHTML = 'Inicia sesión para generar planes';
        return;
    }

    // FUERZA usar nueva versión y muestra errores
    try {
        return this.generarPlanCompleto();
    } catch (error) {
        console.error('❌ ERROR DETALLADO:', error);
        console.error('Stack trace:', error.stack);
        alert('Error: ' + error.message + '\n\nRevisa la consola (F12) para más detalles');
        return this.generarPlanViejo();
    }
},

    // ============================================
    // OBTENER DATOS DEL USUARIO
    // ============================================
    obtenerDatosUsuario: function() {
        if (!window.auth || !window.auth.usuarioActual) return null;
        
        const usuario = window.auth.usuarioActual;
        
        if (usuario.datos) return usuario.datos;
        
        return {
            nombre: usuario.nombre || 'Usuario',
            sexo: usuario.sexo || 'hombre',
            edad: parseInt(usuario.edad) || 30,
            peso: parseFloat(usuario.peso) || 70,
            altura: parseInt(usuario.altura) || 170,
            objetivo: usuario.objetivo || 'hipertrofia',
            equipo: usuario.equipo || 'cuerpo',
            nivel: usuario.nivel || 'intermedio'
        };
    },

    // ============================================
    // ANÁLISIS DE COMPOSICIÓN CORPORAL
    // ============================================
    analizarComposicion: function(datos) {
        const alturaM = datos.altura / 100;
        const imc = (datos.peso / (alturaM * alturaM)).toFixed(1);
        
        // Peso ideal (rango saludable IMC 18.5-24.9)
        const pesoMin = (18.5 * alturaM * alturaM).toFixed(1);
        const pesoMax = (24.9 * alturaM * alturaM).toFixed(1);
        
        // Estimado de grasa corporal (fórmula de la Marina de EE.UU.)
        let grasaEstimada;
        if (datos.sexo === 'hombre') {
            grasaEstimada = (1.20 * imc) + (0.23 * datos.edad) - 16.2;
        } else {
            grasaEstimada = (1.20 * imc) + (0.23 * datos.edad) - 5.4;
        }
        grasaEstimada = Math.max(8, Math.min(40, Math.round(grasaEstimada)));
        
        // Interpretación según objetivo
        let interpretacion = '';
        let mensajeMotivador = '';
        let color = '';
        let rangoSaludable = '';
        
        if (datos.sexo === 'hombre') {
            rangoSaludable = '12-18%';
            if (grasaEstimada < 12) interpretacion = '🔥 Muy bajo nivel de grasa';
            else if (grasaEstimada <= 18) interpretacion = '✅ Rango atlético saludable';
            else if (grasaEstimada <= 24) interpretacion = '⚠️ Rango aceptable, puedes mejorar';
            else interpretacion = '⚡ Exceso de grasa, ideal reducir';
        } else {
            rangoSaludable = '20-28%';
            if (grasaEstimada < 20) interpretacion = '🔥 Muy bajo nivel de grasa';
            else if (grasaEstimada <= 28) interpretacion = '✅ Rango atlético saludable';
            else if (grasaEstimada <= 32) interpretacion = '⚠️ Rango aceptable, puedes mejorar';
            else interpretacion = '⚡ Exceso de grasa, ideal reducir';
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
        }
        
        return {
            imc,
            pesoMin,
            pesoMax,
            grasaEstimada,
            interpretacion,
            mensajeMotivador,
            color,
            rangoSaludable
        };
    },

    // ============================================
    // CÁLCULOS DE CALORÍAS Y MACROS
    // ============================================
    calcularTMB: function(datos) {
        // Mifflin-St Jeor Equation
        if (datos.sexo === 'hombre') {
            return (10 * datos.peso) + (6.25 * datos.altura) - (5 * datos.edad) + 5;
        } else {
            return (10 * datos.peso) + (6.25 * datos.altura) - (5 * datos.edad) - 161;
        }
    },

    calcularGET: function(tmb, nivel) {
        const factores = {
            'principiante': 1.375, // Ejercicio ligero
            'intermedio': 1.55,     // Ejercicio moderado
            'avanzado': 1.725       // Ejercicio intenso
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
        
        // Proteínas: según objetivo
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
        
        // Grasas: 0.8-1.0 g/kg según objetivo
        let grasas, explicacionGrasas;
        if (datos.objetivo === 'perder peso') {
            grasas = Math.round(peso * 0.8);
            explicacionGrasas = 'Grasa moderada para déficit calórico';
        } else {
            grasas = Math.round(peso * 1.0);
            explicacionGrasas = 'Grasa adecuada para función hormonal';
        }
        
        // Carbohidratos: el resto de calorías
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
    // GENERAR MENÚ PERSONALIZADO
    // ============================================
    generarMenu: function(datos, calculos) {
        const peso = datos.peso;
        const objetivo = datos.objetivo;
        
        // Ajustar porciones según peso
        const porcion = (base) => {
            if (peso > 90) return Math.round(base * 1.3);
            if (peso > 70) return Math.round(base * 1.15);
            return base;
        };
        
        // Menús por objetivo
        const menus = {
            hipertrofia: {
                desayuno: [
                    {
                        texto: `${porcion(3)} huevos revueltos + ${porcion(80)}g avena + 1 plátano + ${porcion(10)}g almendras`,
                        proteinas: porcion(24),
                        carbos: porcion(65),
                        grasas: porcion(22),
                        proposito: 'Desayuno completo para empezar con energía y proteína'
                    },
                    {
                        texto: `${porcion(2)} huevos + ${porcion(2)} panes integrales + aguacate + 1 scoop proteína`,
                        proteinas: porcion(35),
                        carbos: porcion(55),
                        grasas: porcion(20),
                        proposito: 'Alto en proteína y grasas saludables'
                    }
                ],
                almuerzo: [
                    {
                        texto: `${porcion(200)}g pechuga pollo + ${porcion(150)}g arroz + ensalada + 1cda aceite oliva`,
                        proteinas: porcion(48),
                        carbos: porcion(85),
                        grasas: porcion(22),
                        proposito: 'Comida principal con proteína de calidad'
                    },
                    {
                        texto: `${porcion(250)}g pescado + ${porcion(200)}g boniato + vegetales salteados`,
                        proteinas: porcion(45),
                        carbos: porcion(90),
                        grasas: porcion(18),
                        proposito: 'Opción de pescado rico en omega-3'
                    }
                ],
                merienda: [
                    {
                        texto: `Batido: 1 scoop proteína + ${porcion(40)}g avena + 1 plátano`,
                        proteinas: porcion(28),
                        carbos: porcion(45),
                        grasas: porcion(5),
                        proposito: 'Refuerzo post-entreno de rápida absorción'
                    },
                    {
                        texto: `${porcion(2)} huevos duros + 1 manzana + ${porcion(15)}g nueces`,
                        proteinas: porcion(18),
                        carbos: porcion(25),
                        grasas: porcion(12),
                        proposito: 'Merienda práctica y equilibrada'
                    }
                ],
                cena: [
                    {
                        texto: `${porcion(200)}g salmón + ${porcion(150)}g quinoa + espárragos`,
                        proteinas: porcion(42),
                        carbos: porcion(75),
                        grasas: porcion(25),
                        proposito: 'Cena ligera pero nutritiva, rica en omega-3'
                    },
                    {
                        texto: `${porcion(200)}g pollo + ensalada grande + ${porcion(100)}g boniato`,
                        proteinas: porcion(45),
                        carbos: porcion(50),
                        grasas: porcion(15),
                        proposito: 'Proteína magra para la noche'
                    }
                ],
                snack: [
                    {
                        texto: `Yogurt griego + ${porcion(15)}g almendras + 1 cda miel`,
                        proteinas: porcion(15),
                        carbos: porcion(20),
                        grasas: porcion(12),
                        proposito: 'Caseína natural antes de dormir'
                    },
                    {
                        texto: 'Batido de caseína + leche (si tienes suplemento)',
                        proteinas: porcion(25),
                        carbos: porcion(10),
                        grasas: porcion(3),
                        proposito: 'Proteína de absorción lenta nocturna'
                    }
                ]
            },
            definicion: {
                desayuno: [
                    {
                        texto: `${porcion(2)} huevos + claras + ${porcion(40)}g avena + 1 naranja`,
                        proteinas: porcion(25),
                        carbos: porcion(40),
                        grasas: porcion(12),
                        proposito: 'Menos calorías, misma proteína'
                    },
                    {
                        texto: `Batido: 1 scoop proteína + ${porcion(30)}g avena + frutos rojos`,
                        proteinas: porcion(28),
                        carbos: porcion(30),
                        grasas: porcion(4),
                        proposito: 'Opción líquida y baja en grasa'
                    }
                ],
                almuerzo: [
                    {
                        texto: `${porcion(180)}g pechuga pollo + ${porcion(120)}g arroz + ensalada abundante`,
                        proteinas: porcion(42),
                        carbos: porcion(70),
                        grasas: porcion(10),
                        proposito: 'Menos carbos, más vegetales'
                    },
                    {
                        texto: `${porcion(200)}g pescado blanco + ${porcion(150)}g verduras + ${porcion(80)}g quinoa`,
                        proteinas: porcion(40),
                        carbos: porcion(45),
                        grasas: porcion(8),
                        proposito: 'Bajo en grasa, alta proteína'
                    }
                ],
                merienda: [
                    {
                        texto: `1 scoop proteína con agua + 1 manzana`,
                        proteinas: porcion(25),
                        carbos: porcion(20),
                        grasas: porcion(2),
                        proposito: 'Proteína pura sin calorías extras'
                    },
                    {
                        texto: `${porcion(2)} claras de huevo duro + pepino`,
                        proteinas: porcion(12),
                        carbos: porcion(5),
                        grasas: porcion(1),
                        proposito: 'Merienda casi cero grasa'
                    }
                ],
                cena: [
                    {
                        texto: `${porcion(180)}g pescado + ${porcion(150)}g brócoli + ensalada`,
                        proteinas: porcion(38),
                        carbos: porcion(25),
                        grasas: porcion(8),
                        proposito: 'Cena ligera alta en proteína'
                    },
                    {
                        texto: `Tortilla de ${porcion(3)} claras + vegetales + ensalada`,
                        proteinas: porcion(25),
                        carbos: porcion(15),
                        grasas: porcion(5),
                        proposito: 'Opción vegetariana baja en calorías'
                    }
                ],
                snack: [
                    {
                        texto: 'Yogurt griego bajo en grasa',
                        proteinas: porcion(12),
                        carbos: porcion(8),
                        grasas: porcion(3),
                        proposito: 'Saciedad sin exceso calórico'
                    },
                    {
                        texto: 'Batido de proteína con agua',
                        proteinas: porcion(25),
                        carbos: porcion(2),
                        grasas: porcion(1),
                        proposito: 'Proteína pura antes de dormir'
                    }
                ]
            },
            'perder peso': {
                desayuno: [
                    {
                        texto: `${porcion(2)} huevos duros + 1 naranja + café solo`,
                        proteinas: porcion(14),
                        carbos: porcion(15),
                        grasas: porcion(10),
                        proposito: 'Bajo en calorías, saciedad por proteína'
                    },
                    {
                        texto: `Batido: 1 scoop proteína con agua + 1 manzana`,
                        proteinas: porcion(25),
                        carbos: porcion(20),
                        grasas: porcion(2),
                        proposito: 'Opción rápida y baja en calorías'
                    }
                ],
                almuerzo: [
                    {
                        texto: `${porcion(150)}g pechuga pollo + ${porcion(80)}g arroz + ensalada grande`,
                        proteinas: porcion(35),
                        carbos: porcion(45),
                        grasas: porcion(8),
                        proposito: 'Comida equilibrada con déficit calórico'
                    },
                    {
                        texto: `Ensalada de atún (${porcion(150)}g atún) con vegetales + 1 huevo duro`,
                        proteinas: porcion(40),
                        carbos: porcion(15),
                        grasas: porcion(12),
                        proposito: 'Alta proteína, muy baja en carbos'
                    }
                ],
                merienda: [
                    {
                        texto: '1 manzana o 1 naranja',
                        proteinas: porcion(1),
                        carbos: porcion(20),
                        grasas: porcion(1),
                        proposito: 'Snack ligero para el hambre'
                    },
                    {
                        texto: 'Infusión + 1 pan integral pequeño',
                        proteinas: porcion(3),
                        carbos: porcion(15),
                        grasas: porcion(1),
                        proposito: 'Opción para media tarde'
                    }
                ],
                cena: [
                    {
                        texto: `${porcion(150)}g pescado blanco + ${porcion(200)}g verduras al vapor`,
                        proteinas: porcion(32),
                        carbos: porcion(15),
                        grasas: porcion(6),
                        proposito: 'Cena ligera y saciante'
                    },
                    {
                        texto: `Caldo de pollo con verduras + ${porcion(100)}g pechuga desmenuzada`,
                        proteinas: porcion(25),
                        carbos: porcion(10),
                        grasas: porcion(4),
                        proposito: 'Cena caliente y baja en calorías'
                    }
                ],
                snack: [
                    {
                        texto: 'Infusión + gelatina sin azúcar',
                        proteinas: porcion(2),
                        carbos: porcion(2),
                        grasas: porcion(0),
                        proposito: 'Casi cero calorías para la noche'
                    },
                    {
                        texto: '1 yogurt natural desnatado',
                        proteinas: porcion(8),
                        carbos: porcion(10),
                        grasas: porcion(2),
                        proposito: 'Proteína ligera antes de dormir'
                    }
                ]
            }
        };

        return menus[objetivo] || menus.definicion;
    },

    // ============================================
    // CARACTERÍSTICAS DE LA DIETA
    // ============================================
    obtenerCaracteristicas: function(datos, calculos) {
        return `
            <div style="background: var(--bg); padding: 20px; border-radius: 15px; margin: 20px 0; border: 1px solid var(--border);">
                <h4 style="color: var(--primary); margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                    <span>📋</span> CARACTERÍSTICAS DE LA DIETA
                </h4>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary); margin-bottom: 5px;">🍽️ DISTRIBUCIÓN DE COMIDAS</div>
                    <div style="padding-left: 15px;">
                        • 5-6 comidas al día para mantener metabolismo activo<br>
                        • Desayuno: 20-25% de calorías diarias<br>
                        • Almuerzo: 30-35% de calorías diarias<br>
                        • Merienda: 10-15% de calorías diarias<br>
                        • Cena: 20-25% de calorías diarias<br>
                        • Snack nocturno (opcional): 5-10% de calorías
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary); margin-bottom: 5px;">🥩 ALIMENTOS RECOMENDADOS</div>
                    <div style="padding-left: 15px;">
                        <strong>Proteínas:</strong> Pollo, pescado, huevos, carne magra, legumbres, atún<br>
                        <strong>Carbohidratos:</strong> Arroz, avena, boniato, plátano, papa, frutas<br>
                        <strong>Grasas saludables:</strong> Aguacate, aceite de oliva, frutos secos, semillas<br>
                        <strong>Vegetales:</strong> Espinaca, brócoli, tomate, pepino, lechuga, calabaza<br>
                        <strong>Lácteos:</strong> Leche, yogurt, queso bajo en grasa
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary); margin-bottom: 5px;">💊 SUPLEMENTOS (OPCIONALES)</div>
                    <div style="padding-left: 15px;">
                        • <strong>Proteína en polvo:</strong> Para alcanzar requerimientos proteicos si es difícil con comida<br>
                        • <strong>Creatina:</strong> 3-5g/día (aumenta fuerza, rendimiento y volumen muscular)<br>
                        • <strong>Omega-3:</strong> Antiinflamatorio y salud cardiovascular (pescado azul o suplemento)<br>
                        • <strong>Multivitamínico:</strong> Para cubrir deficiencias en dietas restrictivas<br>
                        • <strong>Vitamina D:</strong> Importante si hay poca exposición solar
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary); margin-bottom: 5px;">💧 HIDRATACIÓN</div>
                    <div style="padding-left: 15px;">
                        • <strong>${calculos.agua} litros de agua al día</strong> (basado en tu peso)<br>
                        • Aumentar 0.5L en días de entrenamiento intenso<br>
                        • Evitar bebidas azucaradas y alcohol<br>
                        • Infusiones y té sin azúcar cuentan como agua
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--primary); margin-bottom: 5px;">📊 AJUSTES Y SEGUIMIENTO</div>
                    <div style="padding-left: 15px;">
                        • <strong>Pesarse 1 vez por semana</strong>, mismo día y hora (ej. viernes en ayunas)<br>
                        • <strong>Tomar medidas</strong> (cintura, cadera, brazo) cada 2 semanas<br>
                        • <strong>Fotos de progreso</strong> cada mes (misma luz, misma ropa)<br>
                        • Si no hay cambios en 2-3 semanas, <strong>ajustar calorías</strong> (±200 kcal)<br>
                        • Registrar comidas al menos 1 semana para identificar errores
                    </div>
                </div>
                
                <div>
                    <div style="font-weight: 600; color: var(--primary); margin-bottom: 5px;">✨ RECOMENDACIONES ADICIONALES</div>
                    <div style="padding-left: 15px;">
                        • <strong>Dormir 7-8 horas</strong> para optimizar recuperación muscular y hormonal<br>
                        • <strong>No saltarse comidas</strong>, especialmente el desayuno<br>
                        • <strong>Priorizar proteína en cada comida</strong> (20-40g por comida)<br>
                        • <strong>Ser constante:</strong> los resultados visibles toman 4-6 semanas<br>
                        • <strong>1-2 comidas libres por semana</strong> para adherencia psicológica<br>
                        • <strong>Masticar despacio</strong> y comer sin distracciones para mejor saciedad
                    </div>
                </div>
            </div>
        `;
    },

    // ============================================
    // MOSTRAR PLAN COMPLETO
    // ============================================
    generarPlanCompleto: function() {
        const datos = this.obtenerDatosUsuario();
        if (!datos) throw new Error('No se pudieron obtener datos');
        
        const analisis = this.analizarComposicion(datos);
        const calculos = this.calcularMacros(datos, analisis);
        const menuCategorias = this.generarMenu(datos, calculos);
        const caracteristicas = this.obtenerCaracteristicas(datos, calculos);
        
        // Seleccionar opciones del menú (rotativo)
        const indice = this.contador % 2; // Alterna entre 2 opciones
        
        const objetivoTexto = {
            'hipertrofia': '💪 Hipertrofia (ganar músculo)',
            'definicion': '✨ Definición (marcar músculo)',
            'perder peso': '🔥 Perder peso'
        }[datos.objetivo] || datos.objetivo;
        
        // Calcular total del día
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
                            <div>
                                <div style="font-size: 1.8em; font-weight: bold; color: var(--primary);">${analisis.imc}</div>
                                <div style="font-size: 0.85em;">IMC</div>
                            </div>
                            <div>
                                <div style="font-size: 1.8em; font-weight: bold; color: var(--primary);">${analisis.grasaEstimada}%</div>
                                <div style="font-size: 0.85em;">Grasa estimada</div>
                            </div>
                            <div>
                                <div style="font-size: 1.8em; font-weight: bold; color: var(--primary);">${analisis.pesoMin}-${analisis.pesoMax}</div>
                                <div style="font-size: 0.85em;">Peso ideal (kg)</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="color: ${analisis.color}; font-weight: 500; padding: 10px; background: ${analisis.color}10; border-radius: 10px;">
                        ${analisis.mensajeMotivador}
                    </div>
                </div>
                
                <!-- REQUERIMIENTOS -->
                <div style="background: var(--bg); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <h4 style="color: var(--primary); margin-bottom: 15px;">⚡ REQUERIMIENTOS DIARIOS</h4>
                    
                    <div style="background: var(--primary)10; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <div style="font-size: 2.2em; font-weight: bold; color: var(--primary); text-align: center;">${calculos.calorias} kcal</div>
                        <div style="text-align: center; font-size: 0.9em;">${calculos.ajuste} • ${calculos.explicacionAjuste}</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; text-align: center;">
                        <div style="background: var(--hover); padding: 10px; border-radius: 10px;">
                            <div style="font-weight: bold; color: var(--primary);">${calculos.proteinas}g</div>
                            <div style="font-size: 0.8em;">Proteínas</div>
                            <div style="font-size: 0.75em; color: var(--text-secondary);">${calculos.explicacionProteinas}</div>
                        </div>
                        <div style="background: var(--hover); padding: 10px; border-radius: 10px;">
                            <div style="font-weight: bold; color: var(--primary);">${calculos.carbohidratos}g</div>
                            <div style="font-size: 0.8em;">Carbohidratos</div>
                            <div style="font-size: 0.75em; color: var(--text-secondary);">${calculos.explicacionCarbos}</div>
                        </div>
                        <div style="background: var(--hover); padding: 10px; border-radius: 10px;">
                            <div style="font-weight: bold; color: var(--primary);">${calculos.grasas}g</div>
                            <div style="font-size: 0.8em;">Grasas</div>
                            <div style="font-size: 0.75em; color: var(--text-secondary);">${calculos.explicacionGrasas}</div>
                        </div>
                    </div>
                </div>
                
                <!-- MENÚ DEL DÍA -->
                <h4 style="color: var(--primary); margin: 15px 0 10px;">🍽️ MENÚ DEL DÍA (${totalKcal} kcal)</h4>
                
                <!-- DESAYUNO -->
                <div style="background: var(--card); border-radius: 12px; padding: 15px; margin-bottom: 10px; border-left: 4px solid #f39c12;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: bold; font-size: 1.1em;">🌅 DESAYUNO</span>
                        <span style="background: var(--hover); padding: 3px 10px; border-radius: 20px; font-size: 0.85em;">
                            ${Math.round(menuCategorias.desayuno[indice].proteinas*4 + menuCategorias.desayuno[indice].carbos*4 + menuCategorias.desayuno[indice].grasas*9)} kcal
                        </span>
                    </div>
                    <div style="padding-left: 10px;">
                        <div>${menuCategorias.desayuno[indice].texto}</div>
                        <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 0.85em;">
                            <span>🔹 Proteínas: ${menuCategorias.desayuno[indice].proteinas}g</span>
                            <span>🔹 Carbos: ${menuCategorias.desayuno[indice].carbos}g</span>
                            <span>🔹 Grasas: ${menuCategorias.desayuno[indice].grasas}g</span>
                        </div>
                        <div style="font-size: 0.8em; color: var(--text-secondary); margin-top: 5px;">
                            💡 ${menuCategorias.desayuno[indice].proposito}
                        </div>
                    </div>
                </div>
                
                <!-- ALMUERZO -->
                <div style="background: var(--card); border-radius: 12px; padding: 15px; margin-bottom: 10px; border-left: 4px solid #e67e22;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: bold; font-size: 1.1em;">☀️ ALMUERZO</span>
                        <span style="background: var(--hover); padding: 3px 10px; border-radius: 20px; font-size: 0.85em;">
                            ${Math.round(menuCategorias.almuerzo[indice].proteinas*4 + menuCategorias.almuerzo[indice].carbos*4 + menuCategorias.almuerzo[indice].grasas*9)} kcal
                        </span>
                    </div>
                    <div style="padding-left: 10px;">
                        <div>${menuCategorias.almuerzo[indice].texto}</div>
                        <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 0.85em;">
                            <span>🔹 Proteínas: ${menuCategorias.almuerzo[indice].proteinas}g</span>
                            <span>🔹 Carbos: ${menuCategorias.almuerzo[indice].carbos}g</span>
                            <span>🔹 Grasas: ${menuCategorias.almuerzo[indice].grasas}g</span>
                        </div>
                        <div style="font-size: 0.8em; color: var(--text-secondary); margin-top: 5px;">
                            💡 ${menuCategorias.almuerzo[indice].proposito}
                        </div>
                    </div>
                </div>
                
                <!-- MERIENDA -->
                <div style="background: var(--card); border-radius: 12px; padding: 15px; margin-bottom: 10px; border-left: 4px solid #3498db;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: bold; font-size: 1.1em;">✨ MERIENDA</span>
                        <span style="background: var(--hover); padding: 3px 10px; border-radius: 20px; font-size: 0.85em;">
                            ${Math.round(menuCategorias.merienda[indice].proteinas*4 + menuCategorias.merienda[indice].carbos*4 + menuCategorias.merienda[indice].grasas*9)} kcal
                        </span>
                    </div>
                    <div style="padding-left: 10px;">
                        <div>${menuCategorias.merienda[indice].texto}</div>
                        <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 0.85em;">
                            <span>🔹 Proteínas: ${menuCategorias.merienda[indice].proteinas}g</span>
                            <span>🔹 Carbos: ${menuCategorias.merienda[indice].carbos}g</span>
                            <span>🔹 Grasas: ${menuCategorias.merienda[indice].grasas}g</span>
                        </div>
                        <div style="font-size: 0.8em; color: var(--text-secondary); margin-top: 5px;">
                            💡 ${menuCategorias.merienda[indice].proposito}
                        </div>
                    </div>
                </div>
                
                <!-- CENA -->
                <div style="background: var(--card); border-radius: 12px; padding: 15px; margin-bottom: 10px; border-left: 4px solid #2c3e50;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: bold; font-size: 1.1em;">🌙 CENA</span>
                        <span style="background: var(--hover); padding: 3px 10px; border-radius: 20px; font-size: 0.85em;">
                            ${Math.round(menuCategorias.cena[indice].proteinas*4 + menuCategorias.cena[indice].carbos*4 + menuCategorias.cena[indice].grasas*9)} kcal
                        </span>
                    </div>
                    <div style="padding-left: 10px;">
                        <div>${menuCategorias.cena[indice].texto}</div>
                        <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 0.85em;">
                            <span>🔹 Proteínas: ${menuCategorias.cena[indice].proteinas}g</span>
                            <span>🔹 Carbos: ${menuCategorias.cena[indice].carbos}g</span>
                            <span>🔹 Grasas: ${menuCategorias.cena[indice].grasas}g</span>
                        </div>
                        <div style="font-size: 0.8em; color: var(--text-secondary); margin-top: 5px;">
                            💡 ${menuCategorias.cena[indice].proposito}
                        </div>
                    </div>
                </div>
                
                <!-- SNACK NOCTURNO -->
                <div style="background: var(--card); border-radius: 12px; padding: 15px; margin-bottom: 20px; border-left: 4px solid #95a5a6;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: bold; font-size: 1.1em;">🌜 SNACK NOCTURNO</span>
                        <span style="background: var(--hover); padding: 3px 10px; border-radius: 20px; font-size: 0.85em;">
                            ${Math.round(menuCategorias.snack[indice].proteinas*4 + menuCategorias.snack[indice].carbos*4 + menuCategorias.snack[indice].grasas*9)} kcal
                        </span>
                    </div>
                    <div style="padding-left: 10px;">
                        <div>${menuCategorias.snack[indice].texto}</div>
                        <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 0.85em;">
                            <span>🔹 Proteínas: ${menuCategorias.snack[indice].proteinas}g</span>
                            <span>🔹 Carbos: ${menuCategorias.snack[indice].carbos}g</span>
                            <span>🔹 Grasas: ${menuCategorias.snack[indice].grasas}g</span>
                        </div>
                        <div style="font-size: 0.8em; color: var(--text-secondary); margin-top: 5px;">
                            💡 ${menuCategorias.snack[indice].proposito}
                        </div>
                    </div>
                </div>
                
                <!-- RESUMEN DEL DÍA -->
                <div style="background: var(--primary)20; padding: 15px; border-radius: 15px; margin-bottom: 20px; border: 1px dashed var(--primary);">
                    <div style="font-weight: bold; margin-bottom: 10px;">📊 RESUMEN DEL DÍA</div>
                    <div style="display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; text-align: center;">
                        <div><span style="font-weight: bold;">${totalKcal}</span><br><small>kcal totales</small></div>
                        <div><span style="font-weight: bold;">${totalProteinas}g</span><br><small>proteínas</small></div>
                        <div><span style="font-weight: bold;">${totalCarbos}g</span><br><small>carbos</small></div>
                        <div><span style="font-weight: bold;">${totalGrasas}g</span><br><small>grasas</small></div>
                    </div>
                </div>
                
                <!-- CARACTERÍSTICAS DE LA DIETA -->
                ${caracteristicas}
                
                <!-- BOTÓN PARA GENERAR OTRO PLAN -->
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

    // ============================================
    // VERSIÓN DE RESPALDO
    // ============================================
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

console.log('✅ nutrition.js - Versión Mejorada con Análisis Completo');

