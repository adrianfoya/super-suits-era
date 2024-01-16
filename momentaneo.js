var records = (function () {
    var records = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./data.json",
        'dataType': "json",
        'success': function (data) {
        records = data;
        }
    });
    return records;
  })(); 
  
  let maleCounts = [];
  let femaleCounts = [];
  
  
  // Función para contar marcas por año y género
  function countSwimTimes(data, year) {
    return Object.values(data).filter(swimmer => swimmer.swim_date === year).length;
  }
  
  // Itera sobre cada evento
  for (const eventName in records.event) {
    let maleCount2008 = countSwimTimes(records.event[eventName].male, 2008);
    let maleCount2009 = countSwimTimes(records.event[eventName].male, 2009);
    
    let femaleCount2008 = countSwimTimes(records.event[eventName].female, 2008);
    let femaleCount2009 = countSwimTimes(records.event[eventName].female, 2009);
    
    // Suma las marcas de 2008 y 2009 por género
    maleCounts.push(maleCount2008 + maleCount2009);
    femaleCounts.push(femaleCount2008 + femaleCount2009);
  }
  
  let totalMarks = maleCounts.map((count, index) => count + femaleCounts[index]);
  
  const data = {
    labels: ['50free', '100free', '200free' ,'400free', '800free', '1500free', '50back', '100back' ,'200back', '50breast', '100breast', '200breast', '50fly', '100fly', '200fly', '200im', '400im'], // Etiquetas de ejemplo para el eje X
    datasets: [
      {
        label: 'Dataset 1',
        data: maleCounts, // Datos para el dataset 1
        backgroundColor: 'blue', // Color de fondo para las barras del dataset 1
        stack: 'Stack 1', // Agrupa este dataset en un stack
      },
      {
        label: 'Dataset 2',
        data: femaleCounts, // Datos para el dataset 2
        backgroundColor: 'hotpink', // Color de fondo para las barras del dataset 2
        stack: 'Stack 2', // Agrupa este dataset en otro stack
      },
      {
        label: 'Suma de Dataset 1 y 2',
        data: totalMarks, // Inicialmente vacío, se llenará con la suma de los dos datasets
        backgroundColor: 'purple', // Color de fondo para las barras de la suma
        stack: 'Stack 3', // Agrupa este dataset en un tercer stack
      },
    ]
  };
  
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
          stacked: true, // Habilita el apilamiento en el eje X
        },
        y: {
          stacked: true // Habilita el apilamiento en el eje Y
        }
      }
    }
  };
  
  const myChart2 = new Chart(
    document.getElementById('canvas3'),
    config
  );