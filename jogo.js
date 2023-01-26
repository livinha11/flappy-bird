// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');
const jogo = {};

//céu azul
function ceu(){
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height);
}

function fazColisaoObstaculo(par){
    if (jogo.flappyBird.x+jogo.flappyBird.largura >= par.x){
        const alturaCabecaFlappy = jogo.flappyBird.y;
        const alturaPeFlappy = jogo.flappyBird.y + jogo.flappyBird.altura;
        const bocaCanoCeuY = par.y + jogo.canos.altura;
        const bocaCanoChaoY = par.y + jogo.canos.altura + jogo.canos.espacamentoEntreCanos;
        if (alturaCabecaFlappy <= bocaCanoCeuY){
            return true
        }
        if (alturaPeFlappy >= bocaCanoChaoY){
            return true
        }

    }
    return false;
}

function inicializa(){
    jogo.flappyBird = criaFlappyBird();
    jogo.back = criaPlanoDeFundo();
    jogo.ground = criaChao();
    jogo.canos = criaCanos();
    jogo.placar = criaPlacar();
}

const som_punch = new Audio();
som_punch.src = 'punch.wav';

const som_jogo = new Audio();
som_jogo.src = 'natureza.mp3';

let animation_frame = 0;

//plano de fundo
function criaPlanoDeFundo(){
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
            back.x = back.x % (back.largura); 
        },
    };
    return back;
}

//chão
function criaChao(){
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
    return ground;
}

//canos
function criaCanos(){
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
        espacamentoEntreCanos: 120,

        desenha() {

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
                const canoChaoY = canos.altura + canos.espacamentoEntreCanos + canos.ceu.y;
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

            console.log("Número de obstáculos: " + canos.pares.length);

            for(i=0;i<canos.pares.length;i++){
                const par = canos.pares[i];
                par.x = par.x - 2;
                if (canos.pares.length>2){
                    canos.pares.shift();
                };
        
                //if (par.x + canos.largura <= 0){
                    //canos.pares.shift();
                //};
        
                if (fazColisaoObstaculo(par)){
                    som_punch.play();
                    telaAtiva = TelaGameOver;
                    return;
                }
            };

            const passou100Frames = (animation_frame % 100 === 0);
            if (passou100Frames) {
                const novoPar ={
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                }
                canos.pares.push(novoPar);
            };

        }
    }
    return canos;
}

//placar
function criaPlacar(){
    const placar = {
        pontos: 0,
        desenha(){
            contexto.font = '26px "Source Code Pro"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'Blue';
            contexto.fillText('Pontuação: ' + placar.pontos, 337, 35); 
        },
        atualiza(){
            const intervaloDeFrames = 15;
            const passouOIntervalo = animation_frame % intervaloDeFrames === 0;

            if(passouOIntervalo){
                placar.pontos = placar.pontos + 1;
            }
        }

    }
    return placar;
}

//gameover
const gameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: 50,
    y:70,
    desenha(){
        contexto.drawImage(
            sprites,
            gameOver.spriteX, gameOver.spriteY,
            gameOver.largura, gameOver.altura,
            gameOver.x, gameOver.y,
            gameOver.largura, gameOver.altura
        );
    }
}

const TelaGameOver = {
    desenha(){
        gameOver.desenha();
    },
    click(){
        inicializa();
        telaAtiva = TelaJogo;
    }
}

// passarinho
function fazColisao(){
    
    if(jogo.flappyBird.y+jogo.flappyBird.altura > jogo.ground.y){
        return true;
    }

} 

//passarinho
function criaFlappyBird(){
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
                telaAtiva = TelaGameOver;
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
    return flappyBird;
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
        jogo.back.desenha();
        jogo.ground.desenha();
        jogo.flappyBird.desenha();
        inicio.desenha();

    },

    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {

    desenha(){
    
        ceu();
        jogo.back.desenha();
        jogo.back.atualiza();
        jogo.canos.desenha();
        jogo.canos.atualiza();
        jogo.ground.desenha();
        jogo.ground.atualiza();
        jogo.flappyBird.desenha();
        jogo.flappyBird.atualiza();
        jogo.placar.desenha();
        jogo.placar.atualiza();
        
    },

    click(){
        jogo.flappyBird.pula();
    },

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

inicializa();
loop();
