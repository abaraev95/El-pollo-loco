class Endboss extends MovableObject {
    height = 370;
    width = 270;
    y = 80;
    world;
    endbossAlive;
    checkEndbossHealth;
    endbossGotHit = false;

    IMAGES_ALERT = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png', // from start: duration = 1800s // one circle = 2400s
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png'
    ];

    IMAGES_HURT = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png',
    ]

    IMAGES_DEAD = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
    ];

    constructor(world) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1600;
        this.world = world;
        this.animate();
    }

    animate() {
        this.endbossAlive = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 300);

        /*
        this.checkEndbossHealth = setInterval(() => {
            this.endbossDies();
        }, 50);
        */

        setInterval(() => {
            if (this.isHurt() && this.energy > 0) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 300);

        setInterval(() => {
            if (this.world.endbossHealthbar.percentage <= 0) {
                clearInterval(this.endbossAlive);
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    let i = this.world.level.enemies.indexOf(this);
                    this.world.level.enemies.splice(i, 1);
                    clearInterval(this.world.spawnChicks);
                }, 1200);
            }
        }, 200);
    }


    endbossDies() {
        if (this.world.endbossHealthbar.percentage <= 0) {
            clearInterval(this.checkEndbossHealth);
            clearInterval(this.endbossAlive);

            setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD);
            }, 400);

            setTimeout(() => {
                let i = this.world.level.enemies.indexOf(this);
                this.world.level.enemies.splice(i, 1);
                clearInterval(this.world.spawnChicks);
            }, 1200);
        }
    }

}