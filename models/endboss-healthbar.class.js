class EndbossHealthbar extends Statusbar {

    x = 530;

    ENDBOSS_HEALTHBAR = [
        'img/7.Marcadores/Barra/Marcador vida/azul/flipped/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/flipped/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/flipped/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/flipped/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/flipped/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/flipped/100_.png',
    ];

    constructor() {
        super();
        this.loadImages(this.ENDBOSS_HEALTHBAR);
        this.y = -10;
        this.setPercentage(100, this.ENDBOSS_HEALTHBAR);
    }
}