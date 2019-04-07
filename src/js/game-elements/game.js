import {Background} from "./background";
import {Platform} from "./platform";
import {Controls} from "./game-controls";
import {LevelStructure} from "./level-structure";
import {Character} from "./character";
import {Collision} from "./collision";

export class Game {

    constructor() {
        this.background = new Background();
        this.platform = new Platform();
        this.level_structure = new LevelStructure();
        this.control = new Controls();
        this.character = new Character();
        this.collision = new Collision();
        this.collision.blocksPos();

        this.bg_speed = 1;
        this.bg_vector_right = -1;
        this.bg_vector_left = 1;

        this.platform_speed = 3;
        this.platform_vector_right = -1;
        this.platform_vector_left = 1;
    }

    frame() {
        requestAnimationFrame(time => this.frame(time));

        if (this.control.right) {
            this.background.bgTransform(this.bg_speed, this.bg_vector_right);
            this.platform.platformTransform(this.platform_speed, this.platform_vector_right);
            this.character.characterMoveXRight();
            this.collision.characterPosition();
            this.collision.detection();
        }

        if (this.control.left) {
            this.background.bgTransform(this.bg_speed, this.bg_vector_left);
            this.platform.platformTransform(this.platform_speed, this.platform_vector_left);
            this.character.characterMoveXLeft();
            this.collision.characterPosition();
            this.collision.detection();
        }

        if (this.control.up) {
            this.character.characterMoveY();
        }

    }

    start() {
        this.frame();
    }

}