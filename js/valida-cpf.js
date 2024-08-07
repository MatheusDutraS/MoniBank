export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, "");
    //Captura o valor do campo CPF e subtitui os caracteres selecionados por espaço vazio (remove-os)

    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse CPF não é válido')
    }
    //Verifica os valores lógicos de cada função e se ao menos um for true (no caso o inválido retorna true), o customValidity receberá a mensagem
}

function validaNumerosRepetidos(cpf) {
    const numeroRepetido = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numeroRepetido.includes(cpf);
}
//Não existe CPF com todos os numero repetidos, por isso se o CPF digiado for igual a algum dentro desta lista retornará true

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for(let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[9]
}
//Todas essas operações são para validar o primeiro digito, após o hifen, do CPF, caso seja diferente do esperado retornará true
//Não necessita decorrar a validação

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for(let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 1) {
        soma = 0;
    }

    return soma != cpf[10]
}
//Todas essas operações são para validar o segundo digito, após o hifen, do CPF, caso seja diferente do esperado retornará true
//Não necessita decorrar a validação
