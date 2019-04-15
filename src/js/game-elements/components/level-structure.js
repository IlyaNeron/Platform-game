import {map} from '../auxiliary/map';
import {BaseObject} from '../objects/base-object';
import {Block} from '../objects/block';
import {Lava} from '../objects/lava';
import {Character} from '../objects/character';

export class LevelStructure {

    constructor() {
        this.level_parent = document.querySelector('.game-level-objects');
        this.level_map = map;
        this.buildOptions();
    }

    buildOptions() {
        for (let i = 0; i < this.level_map.length; i++) {
            for (let j = 0; j < this.level_map[i].length; j++) {
                let build_elem = document.createElement('div');
                const tile_id = this.level_map[i][j];

                switch (tile_id) {
                    case 'c':
                        const objC = new Character();
                        objC.character_properties.offset_x = j * 30;
                        objC.character_properties.offset_y = i * 30;
                        build_elem.style.background = objC.character_properties.background;
                        build_elem.style.transform = 'matrix(1, 0, 0, 1,' + objC.character_properties.offset_x + ',' + objC.character_properties.offset_y + ')';
                        build_elem.style.position = 'absolute';
                        build_elem.classList.add(objC.character_properties.className);
                        break;
                    case 'b':
                        const objB = new Block();
                        objB.block_properties.offset_x = j * 30;
                        objB.block_properties.offset_y = i * 30;
                        build_elem.style.transform = 'matrix(1, 0, 0, 1,' + objB.block_properties.offset_x + ',' + objB.block_properties.offset_y + ')';
                        build_elem.style.background = objB.block_properties.background;
                        build_elem.style.position = 'absolute';
                        build_elem.classList.add(objB.block_properties.className);
                        break;
                    case 'l':
                        const objL = new Lava();
                        objL.lava_properties.offset_x = j * 30;
                        objL.lava_properties.offset_y = i * 30;
                        build_elem.style.background = objL.lava_properties.background;
                        build_elem.style.position = 'absolute';
                        build_elem.style.transform = 'matrix(1, 0, 0, 1,' + objL.lava_properties.offset_x + ',' + objL.lava_properties.offset_y + ')';
                        break;
                }

                const obj = new BaseObject();
                build_elem.style.width = obj.objectSize.width + 'px';
                build_elem.style.height = obj.objectSize.height + 'px';
                build_elem.style.position = 'absolute';
                build_elem.style.transform = 'matrix(1, 0, 0, 1,' + j * 30 + ',' + i * 30 + ')';

                this.level_parent.style.width = obj.objectSize.width * this.level_map[i].length + 'px';
                this.level_parent.style.height = obj.objectSize.height * this.level_map.length + 'px';

                this.level_parent.appendChild(build_elem);
            }
        }
    }

}
