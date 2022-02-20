class Statusbar extends DrawableObject {

    height = 50;
    width = 170;
    x = 20;
    percentage = 100;

    setPercentage(percentage, statusbar) {
        this.percentage = percentage; // => 0 ... 5
        let path = statusbar[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }

}

