const cards = document.querySelectorAll(".cartao");

let certo = 0;
let cartao1, cartao2;
let desabilitado = false;

function girarcartao({target: clickedCard}) {
    if(cartao1 !== clickedCard && !desabilitado) {
        clickedCard.classList.add("girar");
        if(!cartao1) {
            return cartao1 = clickedCard;
        }
        cartao2 = clickedCard;
        desabilitado = true;
        let cardOneImg = cartao1.querySelector(".tras img").src,
        cardTwoImg = cartao2.querySelector(".tras img").src;
        testandocartoes(cardOneImg, cardTwoImg);
    }
}

function testandocartoes(img1, img2) {
    if(img1 === img2) {
        certo++;
        if(certo == 8) {
            setTimeout(() => {
                return embaralhar();
            }, 1000);
        }
        cartao1.removeEventListener("click", girarcartao);
        cartao2.removeEventListener("click", girarcartao);
        cartao1 = cartao2 = "";
        return desabilitado = false;
    }
    setTimeout(() => {
        cartao1.classList.add("mexer");
        cartao2.classList.add("mexer");
    }, 400);

    setTimeout(() => {
        cartao1.classList.remove("mexer", "girar");
        cartao2.classList.remove("mexer", "girar");
        cartao1 = cartao2 = "";
        desabilitado = false;
    }, 1200);
}

function embaralhar() {
    certo = 0;
    desabilitado = false;
    cartao1 = cartao2 = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("girar");
        let imgTag = card.querySelector(".tras img");
        imgTag.src = `imgs/num${arr[i]}.png`;
        card.addEventListener("click", girarcartao);
    });
}

embaralhar();
    
cards.forEach(card => {
    card.addEventListener("click", girarcartao);
});