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
                        build_elem.style.background = objC.properties.background;
                        build_elem.classList.add(objC.properties.className);
                        break;
                    case 'b':
                        const objB = new Block();
                        build_elem.style.background = objB.background;
                        build_elem.classList.add(objB.className);
                        break;
                    case 'l':
                        const objL = new Lava();
                        build_elem.style.background = objL.background;
                        break;
                }

                const obj = new BaseObject();
                build_elem.style.width = obj.objectSize.width + 'px';
                build_elem.style.height = obj.objectSize.height + 'px';

                this.level_parent.style.width = obj.objectSize.width * this.level_map[i].length + 'px';
                this.level_parent.style.height = obj.objectSize.height * this.level_map.length + 'px';

                this.level_parent.appendChild(build_elem);
            }

        }

    }

}
