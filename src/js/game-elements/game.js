import { Background} from "./background";
import { Platform } from "./platform";
import { Controls } from "./game-controls";
import { LevelStructure } from "./level-structure";

export class Game {

    constructor() {
        this.background = new Background();
        this.platform = new Platform();
        this.control = new Controls();
        this.level_structure = new LevelStructure();
        this.bg_speed = 1;
        this.bg_vector_right = -1;
        this.bg_vector_left = 1;

        this.platform_speed = 3;
        this.platform_vector_right = -1;
        this.platform_vector_left = 1;
    }

    frame(time) {
        requestAnimationFrame(time => this.frame(time));

        if (this.control.right) {
            this.background.bgTransform(this.bg_speed, this.bg_vector_right);
            this.platform.platformTransform(this.platform_speed, this.platform_vector_right);
        }

        if (this.control.left) {
            this.background.bgTransform(this.bg_speed, this.bg_vector_left);
            this.platform.platformTransform(this.platform_speed, this.platform_vector_left);
        }

    }

    move() {
        requestAnimationFrame(time => this.frame(time));
    }

}