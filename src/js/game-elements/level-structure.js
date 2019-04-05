export class LevelStructure {

    constructor() {
        this.level_parent = document.querySelector('.game-level-objects');
        this.build_elem_width = 30;
        this.build_elem_height = 30;
        this.level();
        this.buildOptions();
    }

    level() {
        this.level_map = [
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                              ',
            '                     bbbbb    ',
            '                              ',
            '                              ',
            '            bbbbbbb           ',
            '                          b   ',
            '                          b   ',
            '        c                 blll',
        ];

        this.tile_properties = {
            ' ': { name: 'empty', bgcolor: ''},
            'c': { name: 'character', bgcolor: '#2861ff'},
            'b': { name: 'block', bgcolor: '#333'},
            'l': { name: 'lava', bgcolor: '#ff4424'},
        };
    }



    buildOptions() {
        
        for (let i = 0; i < this.level_map.length; i++) {

            for (let j = 0; j < this.level_map[i].length; j++) {
                const tile_id = this.level_map[i][j];
                const tile_type = this.tile_properties[tile_id];

                this.level_parent.style.width = this.build_elem_width * this.level_map[i].length + 'px';
                this.level_parent.style.height = this.build_elem_height * this.level_map.length + 'px';

                let build_elem = document.createElement('div');

                build_elem.classList.add(tile_type['name']);
                build_elem.style.background = tile_type['bgcolor'];

                build_elem.style.width = this.build_elem_width + 'px';
                build_elem.style.height = this.build_elem_height + 'px';
                this.level_parent.appendChild(build_elem);

            }

        }

    }

}
