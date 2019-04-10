import {Background} from '../components/background';
import {Platform} from '../components/platform';
import {Controls} from '../components/game-controls';
import {LevelStructure} from '../components/level-structure';
import {CharacterMove} from '../components/character-move';
import {Collision} from '../components/collision';

export class Game {
    constructor() {
        this.background = new Background();
        this.platform = new Platform();
        new LevelStructure();
        this.control = new Controls();
        this.character_move = new CharacterMove();
        this.collision = new Collision();
    }

    frame() {
        requestAnimationFrame(time => this.frame(time));
        this.collision.playerCoordinates();
        this.collision.blocksCoordinates();
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