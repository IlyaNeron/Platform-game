export const character = {
    offset_x: 0,
    offset_y: 0,
    positionX: 0,
    positionY: 0,
    speed: 1,
    vector_right: 1,
    vector_left: -1,
    className: 'character',
    background: '#00f',
    move_state_right: false,
    move_state_left: false,
};

export const character_jump = {
    speed: 8,
    gravity: 0.85,
    friction: 0.8,
    distance: 0,
    jumping: false,
    landing: false,
};