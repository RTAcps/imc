// Adiciona um listener ao formulário para interceptar o evento de submit
document.getElementById('imcForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Previne o comportamento padrão do formulário de recarregar a página

    // Obtém os valores de peso e altura do formulário e os converte para números
    const weightDiv = document.getElementById('weight');
    const heightDiv = document.getElementById('height');
    
    let weight = parseFloat(weightDiv.value);
    let height = parseFloat(heightDiv.value) / 100;  // Converte altura de cm para metros
    
    // Verifica se os valores de peso e altura são válidos
    if (isNaN(weight) || isNaN(height) || height === 0) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerText = 'Por favor, insira valores válidos.';
        resultDiv.style.color = '#000000';  // Define a cor do texto para preto
        return;
    }

    // Calcula o IMC
    let imc = calculateIMC(weight, height);

    // Define variáveis para a mensagem, cor e imagens
    let message = `Seu IMC é ${imc.replace('.', ',')}. `;
    let color = '';
    let imageHeader = './../assets/faixas-imc.png';
    let imageFooter = '';

    // Determina a classificação do IMC e ajusta a mensagem, cor e imagens correspondentes
    if (imc < 17) {
        imageHeader = './../assets/faixas-imc1.png';
        message += 'Você está muito abaixo do peso.';
        color = '#6DB5E8';
        imageFooter = './../assets/imc1.png';
    } else if (imc >= 17 && imc <= 18.49) {
        imageHeader = './../assets/faixas-imc1.png';
        message += 'Você está abaixo do peso.';
        color = '#6DB5E8';
        imageFooter = './../assets/imc2.png';
    } else if (imc >= 18.5 && imc <= 24.99) {
        imageHeader = './../assets/faixas-imc2.png';
        message += 'Você está com o peso normal.';
        color = '#7EC395';
        imageFooter = './../assets/imc3.png';
    } else if (imc >= 25 && imc <= 29.99) {
        imageHeader = './../assets/faixas-imc3.png';
        message += 'Você está com sobrepeso.';
        color = '#DECF54';
        imageFooter = './../assets/imc4.png';
    } else if (imc >= 30 && imc <= 34.99) {
        imageHeader = './../assets/faixas-imc4.png';
        message += 'Você está com obesidade I.';
        color = '#FFA728';
        imageFooter = './../assets/imc5.png';
    } else if (imc >= 35 && imc <= 39.99) {
        imageHeader = './../assets/faixas-imc5.png';
        message += 'Você está com obesidade II.';
        color = '#FC6D40';
        imageFooter = './../assets/imc6.png';
    } else if (imc >= 40 && imc <= 100) {
        imageHeader = './../assets/faixas-imc6.png';
        message += 'Você está com obesidade III.';
        color = '#DE4D55';
        imageFooter = './../assets/imc7.png';
    } else {
        message += 'Por favor, digite um valor válido!';
    }
    
    // Atualiza a interface com os resultados
    setResultText(message, color, imageHeader, imageFooter);
});

// Função para calcular o IMC
function calculateIMC(weight, height) {
    return (weight / (height * height)).toFixed(2);
}

// Função para atualizar o texto do resultado e as imagens correspondentes
function setResultText(text, color, imgHead, imgFoot) {
    const resultDiv = document.getElementById('result');
    const mainDiv = document.getElementById('main');
    const imgHeader = document.getElementById('imgHeader');
    const imgFooter = document.getElementById('imgFooter');
    
    // Atualiza o texto do resultado e a cor do texto
    resultDiv.innerText = text;
    resultDiv.style.color = color;
    mainDiv.style.backgroundColor = color;
    
    // Atualiza a imagem do cabeçalho
    if (imgHead) {
        imgHeader.src = imgHead;
        imgHeader.alt = `imagem que indica que ${text}`; 
        imgHeader.style.display = 'block'; 
    } else {
        imgHeader.src = './../assets/faixas-imc.png';
    }

    // Atualiza a imagem do rodapé
    if (imgFoot) {
        imgFooter.src = imgFoot;
        imgFooter.alt = text; 
        imgFooter.style.display = 'block'; 
    } else {
        imgFooter.style.display = 'none'; 
    }
}

// Função de teste para verificar a função calculateIMC com diferentes valores
function testCalculateIMC() {
    let testCases = [
        { id: 1, weight: 43, height: 160, expected: "16.80", classification: 'muito abaixo do peso.' },
        { id: 2, weight: 50, height: 165, expected: "18.37", classification: 'abaixo do peso.' },
        { id: 3, weight: 57, height: 170, expected: "19.72", classification: 'peso normal.' },
        { id: 4, weight: 70, height: 175, expected: "22.86", classification: 'peso normal.' },
        { id: 5, weight: 90, height: 180, expected: "27.78", classification: 'sobrepeso.' },
        { id: 6, weight: 110, height: 185, expected: "32.14", classification: 'obesidade I.' },
        { id: 7, weight: 130, height: 190, expected: "36.01", classification: 'obesidade II.' },
        { id: 8, weight: 155, height: 195, expected: "40.76", classification: 'obesidade III.' },
        { id: 9, weight: 0, height: 0, expected: "NaN", classification: 'Por favor digite um valor válido!' },
        { id: 10, weight: 1, height: 1, expected: "10000.00", classification: 'Por favor digite um valor válido!' },
    ];

    // Executa cada caso de teste e exibe os resultados no console
    testCases.forEach(test => {
        let result = calculateIMC(test.weight, (test.height / 100));
        console.log(`Teste ${test.id}:
    Peso: ${test.weight}, 
    Altura: ${test.height}, 
    IMC esperado: ${test.expected}, 
    IMC calculado: ${result},
    Situação: ${test.classification}`);
    });
}

// Chama a função de teste
testCalculateIMC();
