const form = document.getElementById('probability-form');
const resultDiv = document.getElementById('result');
let myChart;
form.addEventListener('input', function () {
  const Dados = parseInt(document.getElementById('num_Dados').value);
  const Cantidad = parseInt(document.getElementById('num_Palo').value);
  const Valor = parseInt(document.getElementById('val_Palo').value);

  if (isNaN(Dados) || isNaN(Cantidad) || isNaN(Valor)) {
    resultDiv.textContent = 'Seleccione numeros validos';
    return;
  }
  if(Cantidad > Dados){
    resultDiv.textContent = 'Cantidad no puede ser mayor al numero de dados';
    return;
  }

  if(Valor >= 7 || Valor <= 0){
    resultDiv.textContent = 'Valor tiene que ser entre 1-6';
    return;
  }
  
  let Probability = 0.0;

if (Valor !== 1) {
    for (let i = Cantidad; i <= Dados; i++) {
        const ProbabilityHold = comb(Dados, i) * Math.pow(1/3, i) * Math.pow(2/3, Dados - i);
        Probability += ProbabilityHold;
    }
} else {
    for (let i = Cantidad; i <= Dados; i++) {
        const ProbabilityHold = comb(Dados, i) * Math.pow(1/6, i) * Math.pow(5/6, Dados - i);
        Probability += ProbabilityHold;
    }
}


Probability *= 100;


resultDiv.textContent = `La probabilidad de que al menos ${Cantidad} '${Valor}'s aparezca en ${Dados} es de: ${Probability.toFixed(2)}%`;
let Probabilities = []
if (Valor !== 1) {
    for(let numero = 1; numero <= Dados; numero++){
        Probability = 0
        for (let i = numero; i <= Dados; i++) {
            let ProbabilityHold = comb(Dados, i) * Math.pow(1/3, i) * Math.pow(2/3, Dados - i);
            Probability += ProbabilityHold;
        }
        Probability *= 100;
        Probabilities.push(Probability)
    }
} else {
    for(let numero = 1; numero <= Dados; numero++){
        Probability = 0;
        for (let i = numero; i <= Dados; i++) {
            let ProbabilityHold = comb(Dados, i) * Math.pow(1/6, i) * Math.pow(5/6, Dados - i);
            Probability += ProbabilityHold;
        }
        Probability *= 100;
        Probabilities.push(Probability.toFixed(2))
    }
}

function comb(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

let labels = Array.from({ length: Dados }, (_, i) => (i + 1).toString());

//setup block
const data = {
    labels: labels,
        datasets: [{
            label: "% de al menos numero de dados",
            data: Probabilities,
            borderWidth: 1
        }]
}
//config block
const config = {
    type: 'line',
    data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};
//init block (render)
if(myChart){
    myChart.destroy();
}
 myChart = new Chart(
    document.getElementById("myChart"),
    config
);

});

form.dispatchEvent(new Event('input'));
