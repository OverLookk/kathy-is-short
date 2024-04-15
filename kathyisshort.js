// ==UserScript==
// @name         kathy code thing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replace 'kathy' with 'kathy is short' on every web page
// @author       overlookk
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to recursively replace text
    function replaceText(element) {
        if (element.hasChildNodes()) {
            element.childNodes.forEach(replaceText);
        } else if (element.nodeType === Text.TEXT_NODE) {
            if (element.textContent.match(/kathy/i)) {
                element.textContent = element.textContent.replace(/kathy/gi, 'kathy is short');
            }
        }
    }

    // Start replacing text
    replaceText(document.body);

    // Observe changes in the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((newNode) => {
                    if (newNode.nodeType === 1) { // Check if the type is Element
                        replaceText(newNode);
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
