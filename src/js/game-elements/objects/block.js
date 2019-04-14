import {block} from '../auxiliary/block-settings';
import {BaseObject} from './base-object';

export class Block extends BaseObject {
    constructor() {
        super();
        this.block_properties = block;
    }
}