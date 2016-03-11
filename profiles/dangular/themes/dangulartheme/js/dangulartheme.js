/**
 * @file
 * Placeholder file for custom sub-theme behaviors.
 *
 */
(function ($, Drupal) {

  /**
   * Use this behavior as a template for custom Javascript.
   */
  Drupal.behaviors.closeOffCanvas = {
    attach: function (context, settings) {
      $('.close-off-canvas').on('click', function () {
        console.log('clicked');
        $('.off-canvas-wrap').removeClass('move-left');
      });
    }
  };

})(jQuery, Drupal);
