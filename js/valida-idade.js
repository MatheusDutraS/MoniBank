export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    // Captura a data, em formato de data do JS, do campo aniversario

    if(!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade')
    }
    // Se a função validade idade for false (Isso se deve a ! antes da chamada da função), o customValidity receberá a mensagem
}

function validaIdade(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    // Captura a data atual, no formato de data do JS
    // Pega a dataNascimento e adiciona +18 ao ano, isto serve para determinar em qual data o usuario completou 18 anos

    return dataAtual >= dataMais18;
    // Compara a data atual com a data que o usuário completou 18 anos, caso a data atual for >= significa que o usuário já completou a maior idade, dando o valor de true
}