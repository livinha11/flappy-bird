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
    spriteY: 0,
    largura: 260,
    altura: 200,
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
            contexto.drawImage(
                sprites,
                back.spriteX, back.spriteY,
                back.largura, back.altura,
                back.x + 2*back.largura, back.y,
                back.largura, back.altura,
            );
        },

    atualiza(){
        back.x = back.x - (1/6);
        back.x = back.x % (back.largura); //erro: não está danado sensação de infinito
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

//cones
const canos = {
    largura: 52,
    altura: 400,
    ceu: {
        spriteX: 52,
        spriteY: 169,
        x: 120,
        y: -150,
    },
    chao: {
        spriteX: 0,
        spriteY: 169,
    },

    pares: [],

    desenha() {
        const espacamentoEntreCanos = 80;

        for (i=0;i<canos.pares.length;i++){
            canos.ceu.x = canos.pares[i].x;
            canos.ceu.y = canos.pares[i].y;

            //cano do céu
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canos.ceu.x, canos.ceu.y,
                canos.largura, canos.altura,
            );
            //cano do cão
            const canoChaoX = canos.ceu.x;
            const canoChaoY = canos.altura + espacamentoEntreCanos + canos.ceu.y;
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
            );
        };
    },

    atualiza() {

        for(i=0;i<canos.pares.length;i++){
            const par = canos.pares[i];
            par.x = par.x - 2;
        };

        const passou100Frames = (animation_frame % 100 === 0);
        if (passou100Frames) {
            const novoPar ={
                x: canvas.width,
                y: -150,
            }
            canos.pares.push(novoPar);
        };
        if (canos.pares<0){
            canos.pares.shift();
        } //talvez não tenha dado certo

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
        flappyBird.y = 50;
        flappyBird.velocidade = 0;
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {

    desenha(){
    
        ceu();
        back.desenha();
        back.atualiza();
        canos.desenha();
        canos.atualiza();
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
