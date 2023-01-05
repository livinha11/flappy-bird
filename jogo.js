// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

//céu azul
function ceu(){
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height);
}

const som_punch = new Audio();
som_punch.src = 'punch.wav';

let animation_frame = 0;

//plano de fundo
const back = {
    spriteX: 390,
    spriteY: 4,
    largura: 275,
    altura: 190,
    x: 0,
    y: 280,

        desenha(){
            contexto.drawImage(
                sprites,
                back.spriteX, back.spriteY,
                back.largura, back.altura,
                back.x, back.y,
                back.largura, back.altura,
            );
            contexto.drawImage(
                sprites,
                back.spriteX, back.spriteY,
                back.largura, back.altura,
                back.x + back.largura, back.y,
                back.largura, back.altura,
            );
        },

    atualiza(){
        back.x = back.x - (1/6);
        back.x = back.x % (back.largura/2); //erro: não está danado sensação de infinito
    },
}

//chão
const ground = {
    spriteX: 0,
    spriteY: 611,
    largura: 224,
    altura: 112,
    x: 0,
    y: 370,

    desenha(){
        contexto.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.largura, ground.altura,
            ground.x, ground.y,
            ground.largura, ground.altura,
        );

        contexto.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.largura, ground.altura,
            ground.x + ground.largura, ground.y,
            ground.largura, ground.altura,
        );
    },

    atualiza(){
        ground.x = ground.x - 1;
        ground.x = ground.x % (ground.largura/2);
    }
}

// passarinho
function fazColisao(){
    
    if(flappyBird.y+flappyBird.altura > ground.y){
        return true;
    }

} 

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    pulo: 4.0,
    
    movimentos: [
        {spriteX: 0, spriteY: 0,}, //asa para cima
        {spriteX: 0, spriteY: 26,}, //asa no meio
        {spriteX: 0, spriteY: 52,}, //asa pra baixo
        {spriteX: 0, spriteY: 26,}, //asa no meio 
    ],

    pula(){
        flappyBird.velocidade = -flappyBird.pulo;
    },

    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    },   
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        if(fazColisao()==true){
            som_punch.play();
            telaAtiva = TelaInicio;
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
        flappyBird.atualizaFrame();
    },

    frameAtual: 0, 
    atualizaFrame(){
        if ((animation_frame% 10)===0){
            flappyBird.frameAtual = flappyBird.frameAtual + 1;
            flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
            flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
            flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
        }
    }
}

const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
    
    desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        )
    }
}

const TelaInicio = {

    desenha(){

        ceu();
        back.desenha();
        ground.desenha();
        flappyBird.desenha();
        inicio.desenha();

    },

    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {

    desenha(){
    
        ceu();
        back.desenha();
        back.atualiza();
        ground.desenha();
        ground.atualiza();
        flappyBird.desenha();
        flappyBird.atualiza();
        
    },

    click(){
        flappyBird.pula();
    }
}

var telaAtiva = TelaInicio;

function mudaTelaAtiva(){
    telaAtiva.click();
}

window.addEventListener("click", mudaTelaAtiva);

function loop(){

    telaAtiva.desenha()
    requestAnimationFrame(loop);
    animation_frame = animation_frame + 1;
}

loop();
