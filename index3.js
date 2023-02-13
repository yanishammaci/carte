
const graph = document.getElementById('graph');
var donneeBar

var graphBar=new Chart(graph, donneeBar={
type: 'bar',
data: {
  labels: ['2014', '2015', '2016', '2017', '2018', '2019'],
  datasets: [{
    label: "nombre d'accidents",
    data: [1200, 1900, 3000, 500, 2000, 3000],
    borderWidth: 1,
    borderColor: '#fff',
    barThickness:100,
    hoverBackgroundColor:"#0f0",
    backgroundColor:	"#89CFF0"    
 }]
},
options: {
    plugins:{
        title:{
            text:"le nombre d'accdients par année",
            display:true,
            color:"#000",
            font:{
                size:32,
            }
        },
        legend:{
            labels:{
                color:"#000",
                font:{
                    size:20
                }
            }
        }
    },
    elements:{
        point:{
            //radius:

        }
    },
    layout: {
        padding:{
            
        }
    },

  scales: {
    y: {
      beginAtZero: true,
      suggestedMin: 0,
        suggestedMax: 5000,
        title:{
            display:true,
            text:"le nombre d'accdient",
            color:"#000",
            font:{
                size:20,
                
            }
        }
            

    },
    x:{
        beginAtZero: true,
        title:{
            display:true,
            text:"les années",
            align:"end",
            color:"#000",
            font:{
                size:20,
                
            }
        }

    }
  },
  animation:{
    duration:500,
    text:"le nombre d'accident par année",
  }
 
  
}
});


console.log(donneeBar.data.labels)

//console.log(x)


const cercle = document.getElementById('cercle');
var donneeCercle


var graphCercle=new Chart(cercle, donneeCercle={
type: 'doughnut',
data: {
  labels: ['Homme','Femme'],
  datasets: [{
    label: "nombre d'accidents",
    data: [30000,20000],
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: [
    'rgb(0, 255, 255)',
  '#FFC0CB',
],
  }]
},
options: {
    plugins: {
        title:{
            text:"repartition des accidents par sex",
            display:true,
            color:"#000",
            font:{
                size:32,
            }
        },
        legend:{
            labels:{
                color:"#000",
                font:{
                    size:20
                }
            }
        }


    },
    layout: {
        padding:{
            left:0,
        }
    },
  animation:{
    duration:500
  }
 
  
}
});


//console.log(y)

//console.log(x)
