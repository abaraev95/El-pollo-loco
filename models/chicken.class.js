class Chicken extends MovableObject {

    y = 350;
    height = 70;
    width = 70;
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];

    IMAGE_DEAD = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'
    ]
    dead = false;
    animateWalking;
    moving;
    deleting;

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 800; // Zahl zwischen 200 und 700
        this.speed = 0.25 + Math.random() * 0.5;

        this.animate();

    }

    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.deleting = setInterval(() => {
            this.deleteEnemy();
        }, 1000 / 60);

        this.animateWalking = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

    }

    enemyDies() {
        this.speed = 0;
        this.dead = true;

        clearInterval(this.animateWalking);
        this.loadImage(this.IMAGE_DEAD);
    }

    deleteEnemy() {

        if (this.dead) {

            clearInterval(this.deleting);

            setTimeout(() => {
                let i = world.level.enemies.indexOf(this);
                world.level.enemies.splice(i, 1);
            }, 150);
        }
    }

    enemyFlies() {
        this.speedY = 25;
        this.speed = -5;
        this.applyGravity();

        setTimeout(() => {
            let i = world.level.enemies.indexOf(this);
            world.level.enemies.splice(i, 1);
        }, 2000);
        
    }

}