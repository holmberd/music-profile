/**
 * Event Handler Module
 * Handles all browser/client events.
 */

/*jshint node: true */
/*jshint browser: true */

'use strict';

(function(controller) {
  /**
   * DOM Content Loaded Event
   * Makes sure the DOM elements are loaded before adding event handlers.
   */
  document.addEventListener('DOMContentLoaded', controller.init, false);

})(controller);

