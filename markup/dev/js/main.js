'use strict';

function GameElements() {
    this.box = HTMLElement;
    this.background = HTMLElement;
    this.move_state_left = Boolean;
    this.move_state_right = Boolean;
}

GameElements.prototype = {

    init: function () {
        this.box = document.querySelector('.box');
        this.background = Array.from(document.querySelectorAll('.background-layer'));
        this.bgwidth = this.background.offsetWidth;
        this.bg_offset = 100;
        this.move_state_left = true;
        this.move_state_right = true;
        this.events();
    },

    events: function () {
        document.addEventListener('keydown', this.backgroundMove.bind(this));
    },

    backgroundMove: function (e) {
        if (this.move_state_right) {

            if (e.key === 'ArrowRight') {
                this.move_state_left = true;
                this.bg_offset += 2;
                this.background.forEach(function (div) {
                    div.style.transform = 'translate3d(' + -this.bg_offset + '%' + ',' + '0px' + ',' + '0px' + ')';
                }, this);
                this.disableMoveRight();
                // if (this.bg_offset === -100) {
                //     this.bg_offset = 10;
                // }
            }

        }

        if (this.move_state_left) {

            if (e.key === 'ArrowLeft') {
                this.move_state_right = true;
                this.bg_offset -= 2;
                this.background.forEach(function (div) {
                    div.style.transform = 'translate3d(' + -this.bg_offset + '%' + ',' + '0px' + ',' + '0px' + ')';
                }, this);
                this.disableMoveLeft();
                // if (this.bg_offset === 100) {
                //     this.bg_offset = -10;
                // }
            }

        }

    },

    disableMoveLeft: function () {
        if (this.bg_offset === 0) {
            console.log(this.bg_offset);
            this.move_state_left = false;
        }
    },

    disableMoveRight: function () {
        if (this.bg_offset === 200) {
            console.log(this.bg_offset);
            this.move_state_right = false;
        }
    },

};

let game = new GameElements();
game.init();