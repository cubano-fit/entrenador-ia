// LOGICA DE NUTRICIÓN - VERSIÓN CUBA (SIN CAMBIOS)
window.nutrition = {
    contador: 0,
    USAR_NUEVA_VERSION: true,

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
            return this.generarPlanViejo();
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
        let rangoSaludable = '';
        
        if (datos.sexo === 'hombre') {
            rangoSaludable = '12-18%';
        } else {
            rangoSaludable = '20-28%';
        }
        
        switch(datos.objetivo) {
            case 'perder peso':
                mensajeMotivador = `🎯 Enfocado en perder peso. Con ${grasaEstimada}% de grasa, tu meta es alcanzar ${rangoSaludable}.`;
                color = '#e74c3c';
                break;
            case 'hipertrofia':
                mensajeMotivador = `💪 Objetivo: ganar músculo. Necesitas superávit calórico y suficiente proteína.`;
                color = '#00a86b';
                break;
            case 'definicion':
                mensajeMotivador = `✨ Buscas definir. Mantén proteína alta y déficit moderado.`;
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
            explicacionCarbos: explicacionCarbos
