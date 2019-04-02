export class Platform {

    constructor(platform_offset_x) {
        this.platform_offset_x = platform_offset_x;
        this.platform_offset_x = 0;
    }

    platformTransform(platform_speed, platform_vector) {
        this.platformElem = document.querySelector('.game-platform');
        this.platform_offset_x += (platform_speed * platform_vector);
        this.platformElem.style.transform = 'translate3d(' + this.platform_offset_x + 'px,' + '0px,' + '0px)';
    }

}
