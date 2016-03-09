/**
 * @file
 * Shows status messages in a modal instead of inline.
 *
 */
(function ($, Drupal) {

  /**
   * Displays status messages in a Foundation reveal modal.
   */
  Drupal.behaviors.foundationStatusInReveal = {
    attach: function (context, settings) {
      $('#status-messages').once('foundation-reveal').each(function() {
        // Move the status messages out of the highlighted region.
        var $messages = $(this);
        var $region = $messages.parent();
        $messages.appendTo('body');
        $messages.foundation('reveal', 'open');

        // This is required as this region will likely be empty after status
        // messages are removed.
        $region.html($region.html().replace(/\n/g, ''));
      });
    }
  };

})(jQuery, Drupal);
