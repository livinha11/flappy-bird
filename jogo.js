// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

//céu azul
function ceu(){
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height);
}

const som_punch = new Audio();
som_punch.src = '_./som/punch.wav';

function fazColisao(){
    
    if(flappyBird.y == ground.y-12){
        return true;
    }
    else{
        return false;
    }

}


//plano de fundo
const back = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 205,
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
        }
}
const back2 = {
    x: 276,

    desenha(){
        contexto.drawImage(
            sprites,
            back.spriteX, back.spriteY,
            back.largura, back.altura,
            back2.x, back.y,
            back.largura, back.altura,
        );
    }
}

//chão
const ground = {
    spriteX: 0,
    spriteY: 600,
    largura: 224,
    altura: 112,
    x: 0,
    y: 368,

    desenha(){
        contexto.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.largura, ground.altura,
            ground.x, ground.y,
            ground.largura, ground.altura,
        );
    }
}
const ground2 = {
    x: 224,
    desenha(){
        contexto.drawImage(
            sprites,
            ground.spriteX, ground.spriteY,
            ground.largura, ground.altura,
            ground2.x, ground.y,
            ground.largura, ground.altura,
        );
    }
}

// passarinho
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    pulo: 4.0,
    
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
        if(fazColisao()){
            som_punch.play();
            telaAtiva = TelaInicio;
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
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
        back2.desenha();
        ground.desenha();
        ground2.desenha();
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
        back2.desenha();
        ground.desenha();
        ground2.desenha();
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
}

loop();
