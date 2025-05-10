document.addEventListener('DOMContentLoaded', function() {
    const toolHeaders = document.querySelectorAll('.tool-header');
    
    toolHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tool = this.parentElement;
            tool.classList.toggle('active');
        });
    });

    // Matriz de Evaluación de Riesgos
 document.getElementById('calculate-risk').addEventListener('click', function() {
        const riskLevel = parseInt(document.getElementById('risk-level').value);
        const probability = parseInt(document.getElementById('risk-probability').value);
        
        const riskLevelText = document.getElementById('risk-level').options[document.getElementById('risk-level').selectedIndex].text;
        const probabilityText = document.getElementById('risk-probability').options[document.getElementById('risk-probability').selectedIndex].text;
        
        const riskValue = riskLevel * probability;
        let riskCategory = '';
        
        if (riskValue <= 6) {
            riskCategory = '🟢 Bajo';
        } else if (riskValue <= 14) {
            riskCategory = '🟡 Medio';
        } else {
            riskCategory = '🔴 Alto';
        }
  
        document.getElementById('risk-value').textContent = `${riskValue} (${riskLevelText} - ${probabilityText})`;
        document.getElementById('risk-level-result').textContent = riskCategory;
    });

    // Índice de Siniestralidad
    document.getElementById('calculate-accident').addEventListener('click', function() {
        const workedHours = parseFloat(document.getElementById('worked-hours').value);
        const accidents = parseInt(document.getElementById('accidents').value);
        const lostDays = parseInt(document.getElementById('lost-days').value);
        const injuryType = parseInt(document.getElementById('injury-type').value);
        
        if (!workedHours || isNaN(workedHours) || workedHours <= 0) {
            alert('Por favor, ingrese un valor válido para las horas trabajadas.');
            return;
        }
        
        const gravityFactor = {
            1: 1,  
            2: 2,  
            3: 4, 
            4: 6  
        };
        
        const frequencyIndex = (accidents * 1000000) / workedHours;
        const severityIndex = (lostDays * gravityFactor[injuryType] * 1000) / workedHours;
        
        document.getElementById('frequency-index').textContent = frequencyIndex.toFixed(2);
        document.getElementById('severity-index').textContent = severityIndex.toFixed(2);
    });

    //  Índice de Masa Corporal
    document.getElementById('calculate-bmi').addEventListener('click', function() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        
        if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert('Por favor, ingrese valores válidos para peso y altura.');
            return;
        }
        
        const bmi = weight / (height * height);
        let category = '';
        
        if (bmi < 18.5) {
            category = 'Bajo peso';
        } else if (bmi < 25) {
            category = 'Peso normal';
        } else if (bmi < 30) {
            category = 'Sobrepeso';
        } else if (bmi < 35) {
            category = 'Obesidad grado I';
        } else if (bmi < 40) {
            category = 'Obesidad grado II';
        } else {
            category = 'Obesidad grado III';
        }
        
        document.getElementById('bmi-value').textContent = bmi.toFixed(2);
        document.getElementById('bmi-category').textContent = category;
    });

    //  Extintor Capacidad Nivel
    document.getElementById('calculate-extinguisher').addEventListener('click', function() {
        const extinguisherType = document.getElementById('extinguisher-type').value;
        const protectedArea = parseFloat(document.getElementById('protected-area').value);
        
        if (!protectedArea || isNaN(protectedArea) || protectedArea <= 0) {
            alert('Por favor, ingrese un valor válido para el área a proteger.');
            return;
        }
        
        let capacity = '';
        
        switch(extinguisherType) {
            case 'abc':
                if (protectedArea <= 50) {
                    capacity = '2.5 kg';
                } else if (protectedArea <= 150) {
                    capacity = '5 kg';
                } else if (protectedArea <= 300) {
                    capacity = '10 kg';
                } else {
                    capacity = 'Se requieren múltiples extintores o sistemas fijos';
                }
                break;
            case 'co2':
                if (protectedArea <= 30) {
                    capacity = '2 kg';
                } else if (protectedArea <= 80) {
                    capacity = '5 kg';
                } else if (protectedArea <= 150) {
                    capacity = '10 kg';
                } else {
                    capacity = 'Se requieren múltiples extintores o sistemas fijos';
                }
                break;
            case 'agua':
                if (protectedArea <= 70) {
                    capacity = '6 L';
                } else if (protectedArea <= 200) {
                    capacity = '9 L';
                } else {
                    capacity = 'Se requieren múltiples extintores o sistemas fijos';
                }
                break;
            case 'espuma':
                if (protectedArea <= 50) {
                    capacity = '6 L';
                } else if (protectedArea <= 150) {
                    capacity = '9 L';
                } else if (protectedArea <= 250) {
                    capacity = '50 L (carrito)';
                } else {
                    capacity = 'Se requieren múltiples extintores o sistemas fijos';
                }
                break;
        }
        
        document.getElementById('extinguisher-capacity').textContent = capacity;
    });

    //  Carga de Fuego
    document.getElementById('calculate-fire-load').addEventListener('click', function() {
        const materialType = document.getElementById('material').value;
        const materialQuantity = parseFloat(document.getElementById('material-quantity').value);
        const surfaceArea = parseFloat(document.getElementById('surface-area').value);
        
        if (!materialQuantity || !surfaceArea || isNaN(materialQuantity) || isNaN(surfaceArea) || materialQuantity <= 0 || surfaceArea <= 0) {
            alert('Por favor, ingrese valores válidos para cantidad y superficie.');
            return;
        }
        
        const calorificPower = {
            'madera': 4.5,
            'papel': 4.0,
            'textil': 4.0,
            'plastico': 10.0,
            'combustible': 11.0
        };
        
        const fireLoad = (materialQuantity * calorificPower[materialType]) / surfaceArea;
        
        document.getElementById('fire-load-value').textContent = fireLoad.toFixed(2);
    });

    //  Cálculo de Evacuación
    document.getElementById('calculate-evacuation').addEventListener('click', function() {
        const occupants = parseInt(document.getElementById('occupants').value);
        const exits = parseInt(document.getElementById('exits').value);
        const maxDistance = parseFloat(document.getElementById('max-distance').value);
        
        if (!occupants || !exits || !maxDistance || isNaN(occupants) || isNaN(exits) || isNaN(maxDistance) || occupants <= 0 || exits <= 0 || maxDistance <= 0) {
            alert('Por favor, ingrese valores válidos para todos los campos.');
            return;
        }
        
    
        const walkingSpeed = 30;
        
    
        const reactionTime = 1;
        
       
        const travelTime = maxDistance / walkingSpeed;
        
     
        const exitFactor = Math.min(1, Math.sqrt(exits / Math.ceil(occupants / 50)));
        
        
        const evacuationTime = reactionTime + (travelTime / exitFactor);
        
        document.getElementById('evacuation-time').textContent = evacuationTime.toFixed(2);
    });

    //  Concentración Máxima Permisible
    document.getElementById('calculate-tlv').addEventListener('click', function() {
        const substance = document.getElementById('substance').value;
        const measuredConcentration = parseFloat(document.getElementById('measured-concentration').value);
        
        if (!measuredConcentration && measuredConcentration !== 0 || isNaN(measuredConcentration) || measuredConcentration < 0) {
            alert('Por favor, ingrese un valor válido para la concentración medida.');
            return;
        }
        
     
        const tlvLimits = {
            'co': 25,
            'co2': 5000,
            'no2': 3,
            'so2': 2,
            'h2s': 10
        };
        
        const limit = tlvLimits[substance];
        let status = '';
        
        if (measuredConcentration <= limit * 0.5) {
            status = '✅ Por debajo del límite recomendado';
        } else if (measuredConcentration <= limit) {
            status = '⚠️ Cercano al límite permisible';
        } else {
            status = '❌ Por encima del límite permisible';
        }
        
        document.getElementById('permissible-limit').textContent = limit;
        document.getElementById('tlv-status').textContent = status;
    });

    //  Unidad de Ancho de Salida
    document.getElementById('calculate-exit-width').addEventListener('click', function() {
        const peopleCount = parseInt(document.getElementById('people-count').value);
        const buildingType = document.getElementById('building-type').value;
        
        if (!peopleCount || isNaN(peopleCount) || peopleCount <= 0) {
            alert('Por favor, ingrese un valor válido para el número de personas.');
            return;
        }
        
     
        const buildingFactor = {
            'residential': 100,
            'commercial': 100,
            'educational': 100,
            'industrial': 60
        };
        
    
        const exitUnits = Math.ceil(peopleCount / buildingFactor[buildingType]);
        
   
        const minWidth = exitUnits * 0.55;
        
        document.getElementById('exit-units').textContent = exitUnits;
        document.getElementById('min-width').textContent = minWidth.toFixed(2);
    });
});