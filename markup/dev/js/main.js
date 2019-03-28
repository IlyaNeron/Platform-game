'use strict';

function GameElements() {
    this.character = document.querySelector('.character');
    this.background = Array.from(document.querySelectorAll('.background-layer'));
    this.fullBackground = document.querySelector('.game-background');
    this.platform = document.querySelector('.game-platform');
    this.level_objects = document.querySelector('.game-level-objects');
    this.test_object = document.querySelector('.test-object');
    this.platform_offset_x = null;
    this.level_offset_x = null;
    this.bg_offset_x = null;
    this.move_state_left = false;
    this.move_state_right = true;
    this.key_state = {};
    this.arrow_up_delay = 0;
    this.time_event = 300;
    this.character_position = 0;
    this.default_jump_value = -120;
    this.jump_value = this.default_jump_value;
}

GameElements.prototype = {
    init: function () {
        this.mainElementsValue();
        this.elementsDefaultValue();
        this.events();
        this.inputs();
        this.disableMoveRight();
        this.disableMoveLeft();
        this.backgroundMoveRight();
        this.backgroundMoveLeft();
        this.elementsDynamicValue();
    },

    mainElementsValue: function () {
        this.background.forEach(function (div) {
            this.bgCoordinateX = getComputedStyle(div);
            let matrix = new WebKitCSSMatrix(this.bgCoordinateX.webkitTransform);
            this.bg_offset_x = matrix.m41;
        }, this);

        this.platformWidth = parseInt(getComputedStyle(this.platform).width, 10);
        this.bgwidth = parseInt(getComputedStyle(this.fullBackground).width, 10);
        console.log('Platform width', this.platformWidth);
        console.log('Background width', this.bgwidth);
    },

    elementsDefaultValue: function () {

        this.character_value = {
            W: this.character.clientWidth,
            H: this.character.clientHeight,
            X: this.character.getBoundingClientRect().left,
            Y: this.character.getBoundingClientRect().top,
        };

        this.test_object_value = {
            W: this.test_object.clientWidth,
            H: this.test_object.clientHeight,
            Y: this.test_object.getBoundingClientRect().top,
        };

    },

    elementsDynamicValue: function () {

    },

    events: function () {
        let _this = this;

        document.addEventListener('keydown', this.jumpAnimationStart.bind(this));
        document.addEventListener('keydown', function (e) {
            _this.key_state[e.key] = true;
        });

        document.addEventListener('keyup', function (e) {
            _this.key_state[e.key] = false;
        });

        this.inputs = function inputs() {
            if (_this.key_state['ArrowRight']) {
                _this.elementsMoveRight();
            }

            if (_this.key_state['ArrowLeft']) {
                _this.elementsMoveLeft();
            }

            requestAnimationFrame(inputs);
        };

    },

    jumpAnimationStart: function (e) {
        let _this = this;

        if (this.arrow_up_delay === 0) {

            if (e.key === 'ArrowUp') {
                console.log('Jump value', this.jump_value);
                console.log('Character position', this.character_position);
                this.arrow_up_delay = this.time_event;
                this.character.style.transform = 'translateY(' + (this.character_position + this.jump_value) + 'px)';
                setTimeout(function () {
                    _this.character.style.transform = 'translateY(' + _this.character_position + 'px)';
                    setTimeout(function () {
                        _this.arrow_up_delay = 0;
                    }, _this.time_event)

                }, _this.time_event);

            }

        }

    },

    elementsCatch: function () {
        let character_Y = this.character.getBoundingClientRect().top;
        let test_object_X = this.test_object.getBoundingClientRect().left;

        if ((this.character_value.X + this.character_value.W >= test_object_X) && (this.character_value.X <= test_object_X + this.test_object_value.W)) {

            if (character_Y >= this.test_object_value.Y + this.test_object_value.H) {
                this.jump_value = this.test_object_value.Y - (this.character_value.Y - this.character_value.H);
                console.log('under object');
            }

            if (character_Y + this.character_value.H <= this.test_object_value.Y) {
                this.jump_value = this.default_jump_value;
                console.log('above object');
                this.character_position = this.test_object_value.Y - (this.character_value.Y + this.character_value.H);
                this.floor = 1;
            }

        }

        if ((this.character_value.X + this.character_value.W <= test_object_X) || (this.character_value.X >= test_object_X + this.test_object_value.W)) {

            if (character_Y >= this.test_object_value.Y + this.test_object_value.H) {
                this.jump_value = -120;
                console.log('out default');
            }

        }

        if (character_Y + this.character_value.H <= this.test_object_value.Y) {

            if ((this.character_value.X + this.character_value.W < test_object_X) || (this.character_value.X > test_object_X + this.test_object_value.W)) {

                if (this.floor >= 1) {
                    console.log('out top');
                    this.character_position -= (this.test_object_value.Y - (this.character_value.Y + this.character_value.H));
                    this.character.style.transform = 'translateY(' + this.character_position + 'px)';
                    this.floor = 0;
                }

            }

        }

        if ((character_Y < this.test_object_value.Y + this.test_object_value.H) && (character_Y + this.character_value.H > this.test_object_value.Y)) {

            if ((this.character_value.X + this.character_value.W === this.test_object_value.X - 1)) {
                console.log('stick');
            }
        }

    },

    elementsMoveRight: function () {

        if (this.move_state_right) {

            this.move_state_left = true;
            this.backgroundMoveRight();
            this.platformMoveRight();
            this.levelMoveRight();
            this.disableMoveRight();
            this.elementsCatch();
        }

    },

    elementsMoveLeft: function () {

        if (this.move_state_left) {

            this.move_state_right = true;
            this.backgroundMoveLeft();
            this.platformMoveLeft();
            this.levelMoveLeft();
            this.disableMoveLeft();
            this.elementsCatch();

        }

    },

    disableMoveLeft: function () {
        if (this.bg_offset_x === 0 || this.platform_offset_x === 0) {
            console.log('Background offset', this.bg_offset_x);
            console.log('Platform offset', this.platform_offset_x);
            this.move_state_left = false;
        }
    },

    disableMoveRight: function () {
        if (this.bg_offset_x === (this.bgwidth - screen.width)*-1 || this.platform_offset_x === (this.platformWidth - screen.width)*-1) {
            console.log(screen.width);
            console.log('Background offset', this.bg_offset_x);
            console.log('Platform offset', this.platform_offset_x);
            this.move_state_right = false;
        }
    },

    backgroundMoveRight: function () {
        this.bg_offset_x -= 0.5;
        this.background.forEach(function (div) {
            div.style.transform = 'translate3d(' + this.bg_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
        }, this);
    },

    backgroundMoveLeft: function () {
        this.bg_offset_x += 0.5;
        this.background.forEach(function (div) {
            div.style.transform = 'translate3d(' + this.bg_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
        }, this);
    },

    platformMoveRight: function () {
        this.platform_offset_x -= 0.5;
        this.platform.style.transform = 'translate3d(' + this.platform_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    platformMoveLeft: function () {
        this.platform_offset_x += 0.5;
        this.platform.style.transform = 'translate3d(' + this.platform_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    levelMoveRight: function () {
      this.level_offset_x -= 0.5;
      this.level_objects.style.transform = 'translate3d(' + this.level_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

    levelMoveLeft: function () {
      this.level_offset_x += 0.5;
      this.level_objects.style.transform = 'translate3d(' + this.level_offset_x + 'px' + ',' + '0px' + ',' + '0px' + ')';
    },

};

let game = new GameElements();
game.init();

