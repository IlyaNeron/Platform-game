import {Background} from '../components/background';
import {Platform} from '../components/platform';
import {Controls} from '../components/game-controls';
import {LevelStructure} from '../components/level-structure';
import {Collision} from '../components/collision';
import {CharacterMove} from '../components/character-move';

export class Game {

    constructor() {
        this.background = new Background();
        this.platform = new Platform();
        new LevelStructure();
        this.control = new Controls();
        this.character_move = new CharacterMove();
    }

    frame() {
        requestAnimationFrame(time => this.frame(time));
        this.character_move.jumpOptions();

        if (this.control.right) {
            this.background.bgTransformRight();
            this.platform.platformTransformRight();
            this.character_move.characterMoveXRight();
        }

        if (this.control.left) {
            this.background.bgTransformLeft();
            this.platform.platformTransformLeft();
            this.character_move.characterMoveXLeft();
        }

        if (this.control.up) {
            this.character_move.characterMoveY();
        }

    }

    start() {
        this.frame();
    }

}