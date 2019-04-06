export class Background {
    constructor(bg_width, bg_offset_x) {
        this.bg_width = bg_width;
        this.bg_offset_x = bg_offset_x;
        this.bgProperties();
    }

    bgProperties() {
        this.bg_layers = Array.from(document.querySelectorAll('.background-layer'));
        const fullBg = document.querySelector('.game-background');

        this.bg_width = parseInt(getComputedStyle(fullBg).width, 10);

        this.bg_layers.forEach((layer) => {
            let bg_style = getComputedStyle(layer);
            let matrix = new WebKitCSSMatrix(bg_style.webkitTransform);
            this.bg_offset_x = matrix.m41;
        }, this);
    }

    bgTransform(bg_speed, bg_vector) {
        this.bg_offset_x += (bg_speed * bg_vector);
        this.bg_layers.forEach((layer) => {
            layer.style.transform = 'translate3d(' + this.bg_offset_x + 'px,' + '0px,' + '0px)';
        });
    }

}