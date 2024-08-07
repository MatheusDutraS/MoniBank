const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");

const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const mensagem = document.querySelector("[data-mensagem]");
const canvas = document.querySelector("[data-video-canvas]");
let imagemURL = ""

const botaoEnviarFoto = document.querySelector("[data-enviar]");

botaoIniciarCamera.addEventListener("click", async function () {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    // navigator.mediaDevice.getUserMedia, serve para pedir permissão para o uso dos dispositivos do navegador

    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    video.srcObject = iniciarVideo
})
//Em geral, por hora, não há necessidade de saber a fundo todas as propriedades e métodos utilizados para usar a câmera (21/03/23)

botaoTirarFoto.addEventListener("click", function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    // getContext().drawImage(), serve para capturar uma imagem do vídeo da câmera

    imagemURL = canvas.toDataURL("image/jpeg");
    
    campoCamera.style.display = "none";
    mensagem.style.display = "block";
})
// Em geral, por hora, não há necessidade de saber a fundo todas as propriedades e métodos utilizados para usar captura de imagem (21/03/23)

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes);
    // Pega os valores que estão no localStorage e retorna para objeto JS

    converteRetorno.imagem = imagemURL;
    // Insere um novo atributo com o valor da imagem capturada dentro do objeto cadastro

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))
    // Converte o objeto para string, com finalidade e mandara para o localStorage

    window.location.href = "./abrir-conta-form-3.html"
    // Recaminha* o site para outra página
})