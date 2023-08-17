interface Window {
    lup: (selector: HTMLElement | string) => HTMLElement[];
}

type EventName =
    | 'abort'
    | 'animationcancel'
    | 'animationend'
    | 'animationiteration'
    | 'animationstart'
    | 'auxclick'
    | 'beforeinput'
    | 'blur'
    | 'cancel'
    | 'canplay'
    | 'canplaythrough'
    | 'change'
    | 'click'
    | 'close'
    | 'contextmenu'
    | 'cuechange'
    | 'dblclick'
    | 'drag'
    | 'dragend'
    | 'dragenter'
    | 'dragexit'
    | 'dragleave'
    | 'dragover'
    | 'dragstart'
    | 'drop'
    | 'durationchange'
    | 'emptied'
    | 'ended'
    | 'error'
    | 'focus'
    | 'focusin'
    | 'focusout'
    | 'fullscreenchange'
    | 'fullscreenerror'
    | 'gotpointercapture'
    | 'input'
    | 'invalid'
    | 'keydown'
    | 'keypress'
    | 'keyup'
    | 'languagechange'
    | 'load'
    | 'loadeddata'
    | 'loadedmetadata'
    | 'lostpointercapture'
    | 'mousedown'
    | 'mouseenter'
    | 'mouseleave'
    | 'mousemove'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup'
    | 'pause'
    | 'play'
    | 'playing'
    | 'pointercancel'
    | 'pointerdown'
    | 'pointerenter'
    | 'pointerleave'
    | 'pointermove'
    | 'pointerout'
    | 'pointerover'
    | 'pointerup'
    | 'progress'
    | 'ratechange'
    | 'reset'
    | 'resize'
    | 'scroll'
    | 'securitypolicyviolation'
    | 'seeked'
    | 'seeking'
    | 'select'
    | 'selectionchange'
    | 'selectstart'
    | 'stalled'
    | 'submit'
    | 'suspend'
    | 'timeupdate'
    | 'toggle'
    | 'touchcancel'
    | 'touchend'
    | 'touchmove'
    | 'touchstart'
    | 'transitioncancel'
    | 'transitionend'
    | 'transitionrun'
    | 'transitionstart'
    | 'volumechange'
    | 'waiting'
    | 'wheel';

interface Array<T> {
    /**
     * Klassen umschalten
     * @function toggle
     * @memberof HTMLElementArray
     * @param {string} className - Name der CSS-Klasse, die umgeschaltet werden soll.
     */
    toggle: (className: string) => void;

    /**
     * Klassen hinzufügen
     * @function add
     * @memberof HTMLElementArray
     * @param {string[]} classList - Liste der CSS-Klassen, die hinzugefügt werden sollen.
     */
    add: (classList: string[]) => void;

    /**
     * Klassen entfernen
     * @function remove
     * @memberof HTMLElementArray
     * @param {string[]} classList - Liste der CSS-Klassen, die entfernt werden sollen.
     */
    remove: (classList: string[]) => void;

    /**
     * EventListener erstellen
     * @function event
     * @memberof HTMLElementArray
     * @param {string} eventName - Name des Events, auf das gehört werden soll.
     * @param {Function} cb - Callback-Funktion, die aufgerufen wird, wenn das Event ausgelöst wird.
     */
    event: (eventName: EventName, cb: (node: Element, event: Event) => void) => void;

    /**
     * Intersection Observer erstellen
     * @function visibilityChange
     * @memberof HTMLElementArray
     * @param {Function} cb - Callback-Funktion, die aufgerufen wird, wenn die Sichtbarkeit des Elements geändert wird.
     * @param {boolean} [initialExecution=false] - Optionaler Parameter, der angibt, ob die Callback-Funktion beim ersten Aufruf sofort ausgeführt werden soll.
     */
    visibilityChange: (cb: (el: Element, visible: boolean) => void) => void;

    /**
     * Objekt von Stilen auf Element anwenden
     * @function style
     * @memberof HTMLElementArray
     * @param {Object} styles - Objekt, das die anzuwendenden CSS-Stile enthält.
     */
    style: (styles: Record<string, string>) => void;
}
