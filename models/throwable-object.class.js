class ThrowableObject extends MovableObject {

    BOTTLE_THROW = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png',
    ];

    BOTTLE_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'
    ]

    rotateTimer;
    throwingInterval;
    splash;

    objectHit = false;

    constructor(x, world) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.world = world;
        this.loadImages(this.BOTTLE_THROW);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = 220;
        this.height = 90;
        this.width = 90;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        this.throwingInterval = setInterval(() => {
            this.x += 8;
            this.checkEnemies();
            this.stopSplashAnimation();
        }, 1000 / 60);
    }

    animate() {

        this.rotateTimer = setInterval(() => {
            this.playAnimation(this.BOTTLE_THROW);
        }, 150);
    }

    splashAnimation() {

        clearInterval(this.rotateTimer);
        this.x -= 5;
        this.speedY = 5;

        setInterval(() => {
            this.playAnimation(this.BOTTLE_SPLASH);
        }, 100);


    }

    checkEnemies() {
        world.level.enemies.forEach((enemy) => {
            if (this.isColliding(enemy) && enemy instanceof Chicken) {
                this.splashAnimation();
                this.objectHit = true;
                enemy.enemyFlies();
            } else if (this.isColliding(enemy) && enemy instanceof Chicks) {
                this.splashAnimation();
                this.objectHit = true;
                enemy.chickFlies();
            } else if (this.isColliding(enemy) && enemy instanceof Endboss) {
                this.splashAnimation();
                this.objectHit = true;
                enemy.hit();
                this.world.endbossHealthbar.setPercentage(this.world.endbossHealthbar.percentage - 25, this.world.endbossHealthbar.ENDBOSS_HEALTHBAR);
                console.log('Endboss got hit:', this.world.endbossHealthbar.percentage);
            }else if (!this.isAboveGround()) {
                this.splashAnimation();
                this.objectHit = true;
            }
        });
    }

    stopSplashAnimation() {

        if (this.objectHit) {

            clearInterval(this.throwingInterval);

            setTimeout(() => {
                let i = world.throwableObjects.indexOf(this);
                world.throwableObjects.splice(i, 1);
            }, 250);
        }
    }




}