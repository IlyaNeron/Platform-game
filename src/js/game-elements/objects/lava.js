import {lava} from '../auxiliary/lava-settings';
import {BaseObject} from './base-object';

export class Lava extends BaseObject {
    constructor() {
        super();
        this.lava_properties = lava;
    }
}