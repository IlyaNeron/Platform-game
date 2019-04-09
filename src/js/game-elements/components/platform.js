import {platformSettings} from '../auxiliary/platform-settings';

export class Platform {
    constructor() {
        this.platform_offset_x = 0;
        this.platform = platformSettings;
    }

    platformTransform() {
        this.platformElem = document.querySelector('.game-platform');
        this.platformElem.style.transform = 'translate3d(' + this.platform_offset_x + 'px,' + '0px,' + '0px)';
    }

    platformTransformRight() {
        this.platformTransform();
        this.platform_offset_x += (this.platform.speed * this.platform.vector_right);
    }

    platformTransformLeft() {
        this.platformTransform();
        this.platform_offset_x += (this.platform.speed * this.platform.vector_left);
    }
}
