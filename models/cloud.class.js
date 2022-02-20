class Cloud extends MovableObject {

    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');      
        
        this.x = Math.random() * 650;

        this.animate();
        
    }

    animate() {
        this.moveLeft();
    }



}