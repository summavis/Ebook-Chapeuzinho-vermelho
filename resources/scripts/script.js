var currentPage = 1;
let totalPages = 6;
var nextbutton = document.getElementById('nextPage');
var prevbutton = document.getElementById('prevPage');
let audioDescriptionEnabled = false;
let isMuted = false;
let zoomEnabled = false;  // Controla o estado global do zoom

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById(`audio${currentPage}`);
    changePage(1);

    document.getElementsByClassName('popup')[0].style.display = "block";

    audio.pause();
    // setupVLibras();
});


function gotopage(page) {
    // Seleciona o elemento de vídeo
    const videoElement = document.getElementById('librasVideo');
    const livro = document.getElementById('page-' + currentPage).querySelector('.livro');
    const btnzoom = document.getElementById("btnZoom");  // Seleciona a section atual
    livro.style = "";
    livro.classList.remove('zoom-active');
    zoomEnabled = false;  
    document.getElementById('page-' + currentPage).removeEventListener('mousemove', moveContainer); // Remove o movimento do mouse no section
    btnzoom.style.backgroundImage="url(./resources/images/lupazoomin.png)";

    document.getElementById(`page-${currentPage}`).classList.remove('active');
    zoomEnabled = false;
    document.getElementById("page-" + page).classList.add('active');
    currentPage = page;

    playAudio(page);

    if (Number(page) === 1) {
        prevbutton.style.opacity = 0;
        prevbutton.style.pointerEvents = "none";
    } else {
        prevbutton.style.opacity = 1;
        prevbutton.style.pointerEvents = "all";
    }
    if (Number(page) === totalPages) {
        nextbutton.style.opacity = 0;
        nextbutton.style.pointerEvents = "none";
    } else {
        nextbutton.style.opacity = 1;
        nextbutton.style.pointerEvents = "all";
    }

    // Define o caminho do vídeo de acordo com a página atual
    const videoFile = `./resources/videos/libras${currentPage}.mp4`;

    videoElement.src = videoFile;

    document.getElementsByClassName('popup')[0].style.display = "none";
}

function changePage(direction) {
    // Seleciona o elemento de vídeo
    const videoElement = document.getElementById('librasVideo');
    document.getElementById(`page-${currentPage}`).classList.remove('active');
    const btnzoom = document.getElementById("btnZoom");  // Seleciona a section atual
    const livro = document.getElementById('page-' + currentPage).querySelector('.livro');
    livro.style = "";
    livro.classList.remove('zoom-active');
    zoomEnabled = false;  
    document.getElementById('page-' + currentPage).removeEventListener('mousemove', moveContainer); // Remove o movimento do mouse no section
    btnzoom.style.backgroundImage="url(./resources/images/lupazoomin.png)";
    
    zoomEnabled = false;

    if (direction === 'next') {
        currentPage = (currentPage % totalPages) + 1;
    } else if (direction === 'prev') {
        currentPage = (currentPage - 2 + totalPages) % totalPages + 1;
    } else {
        currentPage = direction;
    }

    document.getElementById(`page-${currentPage}`).classList.add('active');



    if (currentPage === 1) {
        prevbutton.style.opacity = 0;
        prevbutton.style.pointerEvents = "none";
    } else {
        prevbutton.style.opacity = 1;
        prevbutton.style.pointerEvents = "all";
    }
    if (currentPage === totalPages) {
        nextbutton.style.opacity = 0;
        nextbutton.style.pointerEvents = "none";
    } else {
        nextbutton.style.opacity = 1;
        nextbutton.style.pointerEvents = "all";
    }

    playAudio(currentPage);


    // Define o caminho do vídeo de acordo com a página atual
    const videoFile = `./resources/videos/libras${currentPage}.mp4`;
    videoElement.src = videoFile;
    document.getElementsByClassName('popup')[0].style.display = "none";
}

function playAudio(pageNumber) {
    const audio = document.getElementById(`audio${pageNumber}`);
    const audioDesc = document.getElementById(`audio${pageNumber}desc`);

    var allaudios = document.getElementsByTagName('audio');
    var allaudios = [].slice.call(allaudios);

    for (i = 0; i < allaudios.length; i++) {
        allaudios[i].pause();
        allaudios[i].currentTime = 0;
    }

    if (audioDescriptionEnabled) {
        audioDesc.play();
    } else {
        audio.play();
    }
    playPauseBtn.innerHTML = "<img src='./resources/images/pause.png'>";  // Mudar o ícone para pausa
}

function toggleAudioDescription() {
    const audioButton = document.getElementById('toggleAudioDescription');
    const audioButtondiv = audioButton.getElementsByTagName('div');
    audioDescriptionEnabled = !audioDescriptionEnabled;

    if (audioDescriptionEnabled) {
        audioButtondiv.innerHTML = "<div>Audiodescrição: Ativada</div>";
        audioButton.classList.remove('inactive');
        audioButton.classList.add('active');
    } else {
        audioButtondiv.innerHTML = "<div>Audiodescrição: Desativada</div>";
        audioButton.classList.remove('active');
        audioButton.classList.add('inactive');
    }

    // Atualiza o áudio atual com ou sem audiodescrição
    playAudio(currentPage);
}


// function setupVLibras() {
//     new window.VLibras.Widget('https://vlibras.gov.br/app');
//     document.getElementById('vlibrasButton').addEventListener('click', () => {
//         document.querySelector('[vw-access-button]').click();
//     });
// }



function toggleMute() {
    const muteButton = document.getElementById('muteButton');
    const muteButtondiv = muteButton.getElementsByTagName('div');
    const audios = document.querySelectorAll('audio');

    isMuted = !isMuted;

    audios.forEach(audio => {
        audio.muted = isMuted;
    });

    if (isMuted) {
        muteButtondiv.innerHTML = "<div>Som Desligado</div>";
        muteButton.classList.remove('unmuted');
        muteButton.classList.add('muted');
    } else {
        muteButtondiv.innerHTML = "<div>Som Ligado</div>";
        muteButton.classList.remove('muted');
        muteButton.classList.add('unmuted');
    }
}

function toggleLibras() {
    // Seleciona o elemento de vídeo
    const videoElement = document.getElementById('librasVideo');
    const videoButton = document.getElementById('librasButton');
    const videoButtondiv = videoButton.getElementsByTagName('div');

    // Define o caminho do vídeo de acordo com a página atual
    const videoFile = `./resources/videos/libras${currentPage}.mp4`;

    videoElement.src = videoFile;

    // Se o vídeo já estiver visível, esconda-o e pause
    if (videoElement.style.display === 'block') {
        videoButtondiv.innerHTML = "<div>Libras Desativada</div>";
        videoElement.style.display = 'none';
        videoButton.classList.remove('muted');
        videoButton.classList.add('unmuted');
        videoElement.pause();
    } else {
        // Se o vídeo estiver escondido, mostre-o e atualize a fonte        
        videoButtondiv.innerHTML = "<div>Libras Ativa<div>";
        videoElement.style.display = 'block';
        videoElement.src = videoFile;
        videoButton.classList.remove('unmuted');
        videoButton.classList.add('muted');
        videoElement.load(); // Carrega o novo vídeo
        videoElement.play(); // Reproduz o vídeo
    }
}

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('rotateNotification').classList.remove('hidden');
    } else {
        document.getElementById('rotateNotification').classList.add('hidden');
    }
}


// document.querySelectorAll(".livro").forEach(function(element) {
//     element.addEventListener("mouseover", function() {
//         element.style.transform = "scale(1.2)";  // Aplica o zoom
//     });

//     element.addEventListener("mouseout", function() {
//         element.style.transform = "scale(1)";  // Remove o zoom ao sair do elemento
//     });
// });
const playPauseBtn = document.getElementById('playPauseAudio');

function pauseAudio(pageNumber) {
    const audio = document.getElementById(`audio${pageNumber}`);
    const audioDesc = document.getElementById(`audio${pageNumber}desc`);

    if (audioDescriptionEnabled) {
        audioDesc.pause();
    } else {
        audio.pause();
    }
    playPauseBtn.innerHTML = "<img src='./resources/images/play.png'>";  // Mudar o ícone para play
}

function playAudio2(pageNumber) {
    const audio = document.getElementById(`audio${pageNumber}`);
    const audioDesc = document.getElementById(`audio${pageNumber}desc`);

    if (audioDescriptionEnabled) {
        audioDesc.play();
    } else {
        audio.play();
    }
    playPauseBtn.innerHTML = "<img src='./resources/images/pause.png'>";  // Mudar o ícone para pausa
}

function toggleAudio() {
    const pageNumber = currentPage;
    const audio = document.getElementById(`audio${pageNumber}`);
    const audioDesc = document.getElementById(`audio${pageNumber}desc`);

    // Verifica qual áudio está ativo: normal ou descrição
    const currentAudio = audioDescriptionEnabled ? audioDesc : audio;

    // Verifica se o áudio está pausado ou tocando
    if (currentAudio.paused) {
        playAudio2(pageNumber);  // Se o áudio estiver pausado, toque o áudio
    } else {
        pauseAudio(pageNumber);  // Se o áudio estiver tocando, pause-o
    }
}

playPauseBtn.addEventListener('click', toggleAudio);


function toggleZoom() {
    const section = document.getElementById('page-' + currentPage);  // Seleciona a section atual
    const btnzoom = document.getElementById("btnZoom");  // Seleciona a section atual
    const livroDiv = section.querySelector('.livro');  // Seleciona o div com a classe livro dentro da section
    
    if (zoomEnabled) {
        // Desativa o zoom
        livroDiv.classList.remove('zoom-active');
        section.removeEventListener('mousemove', moveContainer); // Remove o movimento do mouse no section
        livroDiv.style.transform = ""; // Remove o zoom e o deslocamento
        btnzoom.style.backgroundImage="url(./resources/images/lupazoomin.png)";
    } else {
        // Ativa o zoom
        livroDiv.classList.add('zoom-active');
        section.addEventListener('mousemove', moveContainer); // Adiciona o movimento do mouse ao section
        btnzoom.style.backgroundImage="url(./resources/images/lupazoomout.png)";
    }

    // Alterna o estado global do zoom
    zoomEnabled = !zoomEnabled;
}

// Função para mover o contêiner baseado na posição do mouse
function moveContainer(event) {
    const section = event.currentTarget;  // O <section> em que o mouse está
    const livroDiv = section.querySelector('.livro');  // O div ".livro" dentro do section
    const rect = section.getBoundingClientRect(); // Pega as dimensões do <section>

    // Pega as posições X e Y do mouse em relação ao section
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calcula a porcentagem da posição do mouse em relação ao tamanho da section
    const xPercent = (x / section.offsetWidth) * 100;
    const yPercent = (y / section.offsetHeight) * 100;

    // Ajusta os valores para que o canto superior esquerdo seja -25% e -25%
    const adjustedXPercent = xPercent - 50;
    const adjustedYPercent = yPercent - 50;

    // Aplica o zoom e ajusta a posição do div .livro com base na posição do mouse, corrigindo o deslocamento
    livroDiv.style.transform = `scale(3) translate(${adjustedXPercent}%, ${adjustedYPercent}%)`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos <audio> na página
    const allAudios = document.querySelectorAll('audio');
    
    // Para cada elemento <audio>, adiciona o evento ended
    allAudios.forEach(audio => {
        audio.addEventListener('ended', function() {
            // Aqui você pode definir o comportamento ao final do áudio
            playPauseBtn.innerHTML = "<img src='./resources/images/play.png'>";  // Mudar o ícone para play
        });
    });
});


window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);
