export class LevelStructure {

    constructor() {
        this.level_parent = document.querySelector('.game-level-objects');
        this.build_elem_width = 30;
        this.build_elem_height = 30;
        this.level_parent_width = this.level_parent.offsetWidth;
        this.level_parent_height = this.level_parent.offsetHeight;
        this.row_count = this.level_parent_width / this.build_elem_width;
        this.column_count = this.level_parent_height / this.build_elem_height;
        console.log(this.level_parent_width);
        console.log(this.column_count);
        console.log(this.row_count);
        this.buildOptions();
    }

    buildOptions() {

        let n = this.row_count, m = this.column_count;
        let mas = [];
        let g = 0;
        console.log(mas);

        for (let i = 0; i < m; i++) {
            mas[i] = [];
            for (let j = 0; j < n; j++) {
                mas[i][j] = 0;
                let build_elem = document.createElement('div');
                build_elem.style.width = this.build_elem_width + 'px';
                build_elem.style.height = this.build_elem_height + 'px';
                build_elem.style.background = '#ff0000';
                build_elem.style.border = 1 + 'px solid #333';
                build_elem.style.position = 'absolute';
                build_elem.style.left = this.build_elem_width * j + 'px';
                build_elem.style.top = this.build_elem_height * i + 'px';

                this.level_parent.appendChild(build_elem);
            }

        }

    }


}