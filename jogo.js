// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

//céu azul
contexto.fillStyle = '#70c5ce';
contexto.fillRect(0,0, canvas.width, canvas.height)

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

function looping(){

    back.desenha();
    back2.desenha();

    requestAnimationFrame(looping);
}
looping();

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

function loopi(){

    ground.desenha();
    ground2.desenha();

    requestAnimationFrame(loopi);
}
loopi();

// passarinho
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,

        desenha(){
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
}

function loop(){

    flappyBird.desenha();

    requestAnimationFrame(loop);
}
loop();
