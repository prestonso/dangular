<?php

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * @param $form
 *   The form.
 * @param $form_state
 *   The form state.
 */
function zurb_foundation_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['theme_ui'] = array(
    '#type' => 'details',
    '#title' => t('UI Elements'),
  );

  $form['theme_ui']['zurb_foundation_status_in_reveal'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display status messages in Reveal'),
    '#description' => t('This will display status messages in a Foundation Reveal modal instead of print them into the page output.'),
    '#default_value' => theme_get_setting('zurb_foundation_status_in_reveal'),
  );

  $form['theme_javascript'] = array(
    '#type' => 'details',
    '#title' => t('Javascript Files'),
  );

  $form['theme_javascript']['zurb_foundation_use_respondjs'] = array(
    '#type' => 'checkbox',
    '#title' => t('Implement Respond.js'),
    '#description' => t('Foundation 4.x does not support IE8, but you can include Respond.js to add additional support for Internet Explorer.'),
    '#default_value' => theme_get_setting('zurb_foundation_use_respondjs'),
  );

  $form['region_settings'] = array(
    '#type' => 'details',
    '#title' => t('Region Settings'),
  );

  $form['region_settings']['zurb_foundation_meta_header_grid'] = array(
    '#type' => 'checkbox',
    '#title' => t('Contain Meta Header Region to Grid'),
    '#description' => t('Uncheck this setting if you would like blocks in the Meta Header region to be full width.'),
    '#default_value' => theme_get_setting('zurb_foundation_meta_header_grid'),
  );

  /*
   * Foundation Top Bar.
   */
  $form['topbar'] = array(
    '#type' => 'details',
    '#title' => t('Foundation Top Bar'),
    '#description' => t('The Foundation Top Bar gives you a great way to display a complex navigation bar on small or large screens.')
  );

  $form['topbar']['zurb_foundation_top_bar_enable'] = array(
    '#type' => 'select',
    '#title' => t('Enable'),
    '#description' => t('If enabled, the site name and main menu will appear in a bar along the top of the page.'),
    '#options' => array(
      0 => t('Never'),
      1 => t('Always'),
      2 => t('Mobile only'),
    ),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_enable'),
  );

  $form['topbar']['container']['zurb_foundation_top_bar_grid'] = array(
    '#type' => 'checkbox',
    '#title' => t('Contain to grid'),
    '#description' => t('Check this for your top bar to be set to your grid width.'),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_grid'),
  );

  $form['topbar']['container']['zurb_foundation_top_bar_sticky'] = array(
    '#type' => 'checkbox',
    '#title' => t('Sticky'),
    '#description' => t("Check this for your top bar to stick to the top of the screen when the user scrolls down. If you're using the Admin Menu module and have it set to 'Keep menu at top of page', you'll need to check this option to maintain compatibility."),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_sticky'),
  );

  $form['topbar']['container']['zurb_foundation_top_bar_scrolltop'] = array(
    '#type' => 'checkbox',
    '#title' => t('Scroll to top on click'),
    '#description' => t('Jump to top when sticky nav menu toggle is clicked.'),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_scrolltop')
  );

  $form['topbar']['container']['zurb_foundation_top_bar_is_hover'] = array(
    '#type' => 'checkbox',
    '#title' => t('Hover to expand menu'),
    '#description' => t('Set this to false to require the user to click to expand the dropdown menu.'),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_is_hover'),
  );

  // Menu settings.
  $form['topbar']['container']['menu'] = array(
    '#type' => 'details',
    '#title' => t('Dropdown Menu')
  );

  $form['topbar']['container']['menu']['zurb_foundation_top_bar_menu_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Menu text'),
    '#description' => t('Specify text to go beside the mobile menu icon or leave blank for none.'),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_menu_text'),
  );

  $form['topbar']['container']['menu']['zurb_foundation_top_bar_custom_back_text'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable custom back text'),
    '#description' => t('This is the text that appears to navigate back one level in the dropdown menu. Set this to false and it will pull the top level link name as the back text.'),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_custom_back_text'),
  );

  $form['topbar']['container']['menu']['zurb_foundation_top_bar_back_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Custom back text'),
    '#description' => t('Define what you want your custom back text to be.'),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_back_text')
  );

  $form['topbar']['container']['menu']['zurb_foundation_top_bar_mobile_show_parent_link'] = array(
    '#type' => 'checkbox',
    '#title' => t('Repeat parent link on mobile'),
    '#description' => t('This provides an extra link for users to tap on the sub-menu for mobile'),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_mobile_show_parent_link'),
  );

  // Search settings.
  $form['topbar']['container']['search'] = array(
    '#type' => 'details',
    '#title' => t('Search Menu')
  );

  $form['topbar']['container']['search']['zurb_foundation_top_bar_search'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Search Menu'),
    '#description' => t('Displays the Search menu in the Top Bar.'),
    '#default_value' => theme_get_setting('zurb_foundation_top_bar_search')
  );

  /*
   * Hard-coded page elements.
   */
  $form['page_elements'] = array(
    '#type' => 'details',
    '#title' => t('Page Elements'),
    '#description' => t('Contains settings to toggle hard-coded elements in the page template.')
  );

  $form['page_elements']['zurb_foundation_page_site_name'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show site name'),
    '#description' => t('Determines if the hard-coded site name should be displayed.'),
    '#default_value' => theme_get_setting('zurb_foundation_page_site_name'),
  );

  $form['page_elements']['zurb_foundation_page_site_logo'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show site logo'),
    '#description' => t('Determines if the hard-coded site logo should be displayed.'),
    '#default_value' => theme_get_setting('zurb_foundation_page_site_logo'),
  );

  $form['page_elements']['zurb_foundation_page_account_info'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show Login/Signup information'),
    '#description' => t('Determines if the hard-coded login block should be displayed.'),
    '#default_value' => theme_get_setting('zurb_foundation_page_account_info'),
  );

  /*
   * Styles and Scripts
   */
  $form['styles_scripts'] = array(
    '#type' => 'fieldset',
    '#title' => t('Styles and Scripts'),
    '#collapsible' => TRUE,
  );

  $form['styles_scripts']['zurb_foundation_disable_base_css'] = array(
    '#type' => 'checkbox',
    '#title' => t('Disable Base Theme CSS'),
    '#description' => t('Disabling the base theme CSS is useful for using SASS in a sub-theme.<br><strong>If you select this option, uncomment the relevant CSS includes in your sub-theme\'s .info file.</strong>'),
    '#default_value' => theme_get_setting('zurb_foundation_disable_base_css'),
  );

  $form['styles_scripts']['zurb_foundation_disable_base_js'] = array(
    '#type' => 'checkbox',
    '#title' => t('Disable Base Theme JavaScript'),
    '#description' => t('Disabling the base theme JavaScript when using a sub-theme is also recommended for more flexibility over which components get included.<br><strong>If you select this option, uncomment the relevant JS includes in your sub-theme\'s .info file.</strong>'),
    '#default_value' => theme_get_setting('zurb_foundation_disable_base_js'),
  );
}
