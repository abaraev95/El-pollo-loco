class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.3;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) { // Throwable objects should always
            return this.y < 320;
        } else if(this instanceof Chicken) {
            return this.y < 500;
        } else if(this instanceof Chicks) {
            return this.y < 500;
        }else if(this instanceof Endboss) {
            return this.y < 70;
        } else {
            return this.y < 120;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

    jumpsOnTop(mo) {
        return this.y + this.height > mo.y &&
        this.y + this.height < mo.y + mo.height && 
        this.x + this.width > mo.x &&
        this.x + this.width < (mo.x + mo.width + 70);
    }

    hit(){
        this.energy -= 25;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 25;
    }
}