class Healthbar extends Statusbar {

    HEALTH_BAR = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png'
    ];

    constructor() {
        super();
        this.loadImages(this.HEALTH_BAR);
        this.y = -10;
        this.setPercentage(100, this.HEALTH_BAR);
    }
}