/**
 * @file
 * Removes whitespace from the highlighted region when an alert is closed.
 *
 */
(function ($, Drupal) {

  /**
   * Removes whitespace from the highlighted region when an alert is closed.
   */
  Drupal.behaviors.foundationAlertClose = {
    attach: function (context, settings) {
      $(document).once('foundation-alert').on('close.fndtn.alert', function(event) {
        var $target = $(event.target);
        if (typeof $target.data('alert') != 'undefined') {
          var $region = $target.parent();

          // Remove this alert from the DOM
          $(event.target).remove();

          // Trim newlines out of the highlighted region, so that our :empty
          // selector still works.
          $region.html($region.html().replace(/\n/g, ''));
        }
      });
    }
  };

})(jQuery, Drupal);
