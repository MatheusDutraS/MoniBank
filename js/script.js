import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  // previne o comportamento padrão

  const listaResposta = {
    nome: e.target.elements["nome"].value,
    email: e.target.elements["email"].value,
    rg: e.target.elements["rg"].value,
    cpf: e.target.elements["cpf"].value,
    aniversario: e.target.elements["aniversario"].value,
  };
  // Cria uma objeto com os valores dos campos do formulário

  "localStorage".setItem("cadastro", JSON.stringify(listaResposta));
  // Guarda os valores do array no localStorage

  window.location.href = "../abrir-conta-form-2.html";
  //Redireciona para outra página
});

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});
// Para cada elemento dentro da array, campo do formulário, cria dois eventos:
// Quando o campo sair de foco, blur, verifica o seu valor é enviado para verificaCampo().
// Quando o elemento for inválido, invalid, previne o comportamento padrão. No caso o comportamento padrão do inválido seria aparecer uma mensagem definida pelo navegador quando o elemento estiver vazio, por causa do required.

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];
// Array com todos os tipos de erro para o formulário

const mensagens = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha com um nome válido.",
    tooShort: "Por favor, preencha com um nome válido2.",
  },
  email: {
    valueMissing: "O campo de email não pode estar vazio.",
    typeMismatch: "Por favor, preencha com um email válido.",
    tooShort: "Por favor, preencha com um email válido.",
  },
  rg: {
    valueMissing: "O campo de RG não pode estar vazio.",
    patternMismatch: "Por favor, preencha com um RG válido.",
    tooShort: "O campo de RG não tem caractéres suficientes.",
  },
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio.",
    patternMismatch: "Por favor, preencha com um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo de CPF não tem caractéres suficientes.",
  },
  aniversario: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior de 18 anos para se cadastrar.",
  },
  termos: {
    valueMissing: "Você deve aceitar nossos termos antes de continuar.",
  },
};
// Objeto JS que contém todas as mensagens de erro no formulário

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity("");
  // Limpa as mensagens de erro

  if (campo.name == "cpf" && campo.value.length >= 11) {
    ehUmCPF(campo);
    // Manda o campo do formulário para a função ehUmCPF()
  } else if (campo.name == "aniversario") {
    ehMaiorDeIdade(campo);
    // Manda o campo do formulário para a função ehMaiorDeIdade
  }

  tiposDeErro.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
      //Para cada tipo de erro seleciona a mensagem equivalente ao campo de formulário e tipo de erro
      //Verifica se o erro esta´como true
    }
  });

  const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
  const validadorDeInput = campo.checkValidity();
  // Seleciona a tag que ira receber a mensagem
  // .checkValidity() retorna o valor lógico true caso o elemento campo contenha informações válidas

  if (!validadorDeInput) {
    mensagemErro.textContent = mensagem;
  } else {
    mensagemErro.textContent = "";
  }
  // Insere as mensagens de erro na tag selecionada
}
