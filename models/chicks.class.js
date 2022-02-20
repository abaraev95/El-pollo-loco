class Chicks extends MovableObject {

    height = 60;
    width= 60;

    IMAGES_ATTACKING = [
        'img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png'
    ];
    animateChickWalking;
    deadChick = false;

    constructor(x) {
        super().loadImage(this.IMAGES_ATTACKING[0]);
        this.loadImages(this.IMAGES_ATTACKING);
        this.speed = 3.5;
        this.x = x;
        this.y = 360;
        this.animate();
        
    }

    animate() {

        this.animateChickWalking = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACKING);
        }, 300);


        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        
        this.deletingChick = setInterval(() => {
            this.deleteChick();
        }, 1000 / 60);
        
    }

    
    chickDies() {
        this.speed = 0;
        this.deadChick = true;

        
        clearInterval(this.animateChickWalking);
        
        this.loadImage('img/3.Secuencias_Enemy_básico/Versión_pollito/4.Muerte.png');
        
    }
    
    
    deleteChick() {

        if (this.deadChick) {

            clearInterval(this.deletingChick);

            setTimeout(() => {
                let i = world.level.enemies.indexOf(this);
                world.level.enemies.splice(i, 1);
            }, 150);
        }
    }
    
    chickFlies() {
        this.speedY = 25;
        this.speed = -5;
        this.applyGravity();

        setTimeout(() => {
            let i = world.level.enemies.indexOf(this);
            world.level.enemies.splice(i, 1);
        }, 2000);
        
    }
    
    
}