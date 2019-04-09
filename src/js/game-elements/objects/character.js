import {character} from '../auxiliary/character-settings';
import {character_jump} from '../auxiliary/character-settings';
import {BaseObject} from './base-object';

export class Character extends BaseObject {
    constructor() {
        super();

        this.properties = character;
        this.jump = character_jump;
    }
}