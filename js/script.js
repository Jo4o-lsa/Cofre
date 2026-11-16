const containerjogo = document.getElementById('container-jogo');
const imgcofre = document.getElementById('img-cofre');
const spantentativas = document.getElementById('restantes');
const alerta = document.getElementById('alerta');
const codigo = document.getElementById('codigo');
const btntentar = document.getElementById('btn-tentar');
const mensagem = document.getElementById('mensagem');
const btnreiniciar = document.getElementById('btn-reiniciar');

const overview = document.getElementById('overview');
const sucessoconteudo = document.getElementById('sucesso-conteudo');
const sucessotitulo = document.getElementById('sucesso-titulo');
const sucessotexto = document.getElementById('sucesso-texto');
const btnjogarnovamente = document.getElementById('btn-jogarnovamente');

let numerosecreto;
let tentativasfeitas;
const maxtentativas = 7;

function iniciarjogo () {
    numerosecreto = Math.floor(Math.random() * 50) + 1;
    tentativasfeitas = 0;

    spantentativas.textcontent = maxtentativas;
    mensagem.texcontent = '';
    codigo.value = '';
    codigo.disabled = false;
    btntentar.disabled = false;

    imgcofre.src = 'img/cofrefechado.png';
    imgcofre.alt = 'Cofre fechado';
    imgcofre.classList.remove('animar-cofre');

    containerjogo.classList.remove('desbloqueado');
    alerta.classList.add('oculto');
    overview.classList.add('oculto');
    sucessoconteudo.classList.remove('derrota');

    codigo.focus();
}
function verificarpalpite() {
    const palpite = Number(codigo.value);

    if (!codigo.value || palpite < 1 || palpite > 50 || !Number.isInteger(palpite)) {
        mensagem.style.color = '#ffffff';
        mensagem.textContent = 'Digite um número válido entre 1 e 50!';
        return;
    }
    tentativasfeitas++;
    const tentativasrestantes = maxtentativas - tentativasfeitas;
    spantentativas.textContent = tentativasrestantes;

    if (palpite === numerosecreto) {
        imgcofre.src = 'img/cofreaberto.png';
        imgcofre.alt = 'Cofre aberto';
        imgcofre.classList.add('animar-cofre');

        containerjogo.classList.add('desbloqueado');
        alerta.classList.add('oculto');

        mensagem.style.color = '#00ff15';
        mensagem.textContent = 'Senha correta!';

        sucessotitulo.textContent = 'Cofre desbloqueado!';
        sucessotexto.textContent = `Você descobriu a senha (${numerosecreto}) em ${tentativasfeitas} tentativa(s).`;
        overview.classList.remove('oculto');

        encerrarrodada();
        return;
    }
    if (tentativasrestantes === 0) {
        mensagem.style.color = '#fe0000';
        mensagem.textContent = `Suas tentativas acabaram! A senha era ${numerosecreto}.`;

        sucessoconteudo.classList.add('derrota');
        sucessotitulo.textContent = 'Cofre Bloqueado!';
        sucessotexto.textContent = `Você atingiu o limite de 7 tentativas. A senha secreta era ${numerosecreto}.`;
        overview.classList.remove('oculto');

        encerrarrodada();
        return;
    }
    mensagem.style.color = '#ffffff';
    if (numerosecreto > palpite) {
        mensagem.textContent = 'A senha é maior!';
    } else {
        mensagem.textContent = 'A senha é menor!';
    }
    if (tentativasrestantes === 2) {
        alerta.classList.remove('oculto');
    }
    codigo.value = '';
    codigo.focus();
}
function encerrarrodada() {
    codigo.disabled = true;
    btntentar.disabled = true;
}
btntentar.addEventListener('click', verificarpalpite);
btnreiniciar.addEventListener('click', iniciarjogo);
btnjogarnovamente.addEventListener('click', iniciarjogo);

codigo.addEventListener('keypress', function (evento) {
    if (evento.key === 'Enter') {
        verificarpalpite();
    }
});
iniciarjogo();