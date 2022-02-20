class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthbar = new Healthbar();
    bottlesbar = new Bottlesbar();
    coinbar = new Coinbar();
    endbossHealthbar = new EndbossHealthbar();
    throwableObjects = [];
    collectedBottles = [];
    collectedCoins = [];

    hitTimer;
    gotHit = false;
    checkX;
    enemySpawn = false;
    spawnChicks;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 150);

        this.hitTimer = setInterval(() => {
            if (!this.gotHit) {
                this.checkHits();
            }
        }, 200);

        setInterval(() => {
            this.checkJumps();
        }, 1000 / 25);


        this.checkX = setInterval(() => {
            this.spawnNewEnemies();
        }, 200);

    }

    checkThrowObjects() {
        if (this.bottlesbar.percentage > 0) {
            if (this.keyboard.SPACE) {
                let bottle = new ThrowableObject(this.character.x + 80, this);
                this.throwableObjects.push(bottle)
                this.bottlesbar.setPercentage(this.bottlesbar.percentage - 5, this.bottlesbar.BOTTLES_BAR);
            }
        }
    }

    checkJumps() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpsOnTop(enemy) && this.character.speedY < 0) {
                this.gotHit = true;
                console.log('Enemy got hit');
                if (enemy instanceof Chicken) {
                    enemy.enemyDies();
                    enemy.deleteEnemy();
                } else if (enemy instanceof Chicks) {
                    enemy.chickDies();
                    enemy.deleteChick();
                }

                setTimeout(() => {
                    this.gotHit = false;
                }, 250);

            }
        });
    }


    checkHits() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.gotHit = true;
                this.character.hit();
                this.healthbar.setPercentage(this.character.energy, this.healthbar.HEALTH_BAR);
                console.log('Character energy: ', this.character.energy);
                setTimeout(() => {
                    this.gotHit = false;
                }, 1500);
            }
        });
    }


    checkCollisions() {
        this.collectBottle();
        this.collectCoin();

    }

    collectBottle() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                console.log('bottle picked up');
                this.collectedBottles.push(bottle);
                this.bottlesbar.setPercentage(this.bottlesbar.percentage + 5, this.bottlesbar.BOTTLES_BAR);
                this.level.bottles.splice(i, 1);
            }
        });
    }

    collectCoin() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                console.log('coin picked up');
                this.collectedCoins.push(coin);
                this.coinbar.setPercentage(this.coinbar.percentage + 10, this.coinbar.COIN_BAR);
                this.level.coins.splice(i, 1);
            }
        });
    }

    drawEndbossHealthbar() {
        if (this.character.x > 1000) {
            this.addToMap(this.endbossHealthbar);
            this.enemySpawn = true;
        }
    }


    spawnNewEnemies() {

        if (this.enemySpawn) {
            clearInterval(this.checkX);
            this.level.enemies.push(new Endboss(this));
            setTimeout(() => {
                this.spawnChicks = setInterval(() => {
                    this.level.enemies.push(new Chicks(1700));
                }, 2400);
            }, 1800);
        }

    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);


        this.ctx.translate(-this.camera_x, 0); // Back
        // ---- Space for fixed objects ----
        this.addToMap(this.healthbar);
        this.addToMap(this.bottlesbar);
        this.addToMap(this.coinbar);
        this.drawEndbossHealthbar();
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);


        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}