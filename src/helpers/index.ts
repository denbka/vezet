export const getBackgrounds = () => {
    const park = new Image()
    const city = new Image()
    park.src = './static/background-park.svg'
    city.src = './static/background-city.svg'
    return {
        park,
        city
    }
}

export const config = {
    MAX_SPEED: 13,
    RESOURCE_TEMPLATE_ID: 'audio-resources',
    SPEED: 6,
}

/**
 * Sound FX. Reference to the ID of the audio tag on interstitial page.
 * @enum {string}
 */
export const sounds = {
    BUTTON_PRESS: 'offline-sound-press',
    HIT: 'offline-sound-hit',
    SCORE: 'offline-sound-reached'
}


/**
 * Key code mapping.
 * @enum {Object}
 */
export const keycodes = {
    JUMP: { '38': 1 },  // Up
    DUCK: { '40': 1 },  // Down
    RESTART: { '13': 1 }  // Enter
}


/**
 * Runner event names.
 * @enum {string}
 */
export const events = {
    ANIM_END: 'webkitAnimationEnd',
    CLICK: 'click',
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
    MOUSEDOWN: 'mousedown',
    MOUSEUP: 'mouseup',
    RESIZE: 'resize',
    TOUCHEND: 'touchend',
    TOUCHSTART: 'touchstart',
    VISIBILITY: 'visibilitychange',
    BLUR: 'blur',
    FOCUS: 'focus',
    LOAD: 'load'
}