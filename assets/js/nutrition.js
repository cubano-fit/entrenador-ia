// assets/js/nutrition.js - VERSIÓN SIMPLIFICADA
window.nutrition = {
    generarPlan: function() {
        alert("🍽️ FUNCIONA! Generando plan...");
        
        // Plan de ejemplo
        const planHTML = `
            <h3>🥗 PLAN NUTRICIONAL</h3>
            <p><strong>🌅 Desayuno:</strong> 2 huevos + café + plátano</p>
            <p><strong>☀️ Almuerzo:</strong> Pollo + arroz + ensalada</p>
            <p><strong>✨ Merienda:</strong> 1 manzana</p>
            <p><strong>🌙 Cena:</strong> Pescado + vegetales</p>
            <p><strong>🔥 Total:</strong> 1650 kcal</p>
        `;
        
        document.getElementById('nutritionResult').innerHTML = planHTML;
    }
};

console.log("✅ nutrition.js cargado");