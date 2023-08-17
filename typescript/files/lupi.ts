/**

@fileoverview
- Diese Hilfsbibliothek namens "lup" stellt verschiedene Methoden zur Manipulation von HTML-Elementen bereit.

- Die Hauptfunktion der Bibliothek, main, ermöglicht das Abrufen von HTMLElements basierend auf einem CSS-Selektor oder einem einzelnen HTMLElement.

- Die zurückgegebenen HTMLElements haben zusätzliche Methoden wie toggle, add, remove, event, style und visibilityChange.

- Die Implementierung sollte den Pfad /// <reference path="lupi.ts"/> verwenden.
*/

declare const lup: typeof main;

const d: Document = document,
    w: Window = window;

/**
 * Checks if the given element is currently visible on the screen
 * @param element HTML-Element to be checked for visibility
 */
const inViewport = (element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * @function main
 * @description
 * Eine leichtgewichtige Alternative zu `.querySelectorAll()`, die es ermöglicht, HTMLElements auf Basis von CSS-Selektoren oder HTMLElement-Objekten auszuwählen und verschiedene Methoden auf die ausgewählten Elemente anzuwenden.
 *
 * Vorteile gegenüber .querySelectorAll():
 * - Einfachere Syntax
 * - Direktes Anwenden von Methoden auf ausgewählte Elemente
 * - Weniger Code bei der Verwendung
 *
 * Unterstützte Browser und Versionen:
 * - Chrome: 50+
 * - Firefox: 45+
 * - Safari: 10+
 * - Edge: 14+
 * - Opera: 37+
 * - Internet Explorer: Nicht unterstützt
 *
 * @param {HTMLElement|string} selector CSS-Selektor oder HTMLElement
 * @returns {HTMLElement[]} Array von übereinstimmenden HTMLElements
 *
 * @example
 * ```js
 * // Auswahl von Elementen mit der Klasse "myClass"
 * lup(".myClass"); // [HTMLElement,...]
 *
 * // Fügt "newClass" zu allen übereinstimmenden Elementen hinzu
 * lup(".myClass").add(["newClass"]);
 *
 * // Auswahl eines bestimmten Elements
 * const el = document.querySelector(".element");
 * lup(el).add(["newClass"]);
 * ```
 *
 * Methoden, die auf die ausgewählten Elemente angewendet werden können:
 * - toggle(className) – Wechselt die Klasse für jedes Element
 * - add(classList) – Fügt die angegebenen Klassen zu jedem Element hinzu
 * - remove(classList) – Entfernt die angegebenen Klassen von jedem Element
 * - event(eventName, cb) – Fügt einen Eventlistener für jedes Element hinzu
 * - style(styles) – Wendet CSS-Stile auf jedes Element an
 * - visibilityChange(cb, initialExecution) – Führt die Callback-Funktion aus, wenn die Sichtbarkeit eines Elements ändert (IntersectionObserver wird verwendet)
 */
const main = (selector: HTMLElement | string): HTMLElement[] => {
    let nodes: HTMLElement[] = [];

    if (selector instanceof HTMLElement) {
        nodes = [selector];
    } else if (typeof selector === 'string') {
        nodes = Array.from(d.querySelectorAll(selector));
    }

    nodes.toggle = function (className) {
        nodes.forEach(node => node.classList.toggle(className));
    };

    nodes.add = function (classList) {
        nodes.forEach(node => node.classList.add(...classList));
    };

    nodes.remove = function (classList) {
        nodes.forEach(node => node.classList.remove(...classList));
    };

    nodes.event = function (eventName, cb) {
        nodes.forEach(node => node.addEventListener(eventName, e => cb(node, e)));
    };

    nodes.style = function (styles) {
        nodes.forEach(node =>
            Object.entries(styles).forEach(([property, value]) => (node.style[property] = value))
        );
    };

    nodes.visibilityChange = function (cb, initialExecution = false) {
        nodes.forEach(el => {
            const observer = new IntersectionObserver(() => {
                const visible = inViewport(el);
                cb(el, visible);
            });
            observer.observe(el);
            if (initialExecution) cb(el, inViewport(el));
        });
    };

    return nodes;
};

setTimeout(() => {
    document.querySelectorAll('.preload').forEach((el: Element) => el.classList.remove('preload'));
}, 500);

w.lup = main;
