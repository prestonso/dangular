<?php

/**
 * Implements hook_theme_suggestions_alter().
 */
function zurb_foundation_theme_suggestions_alter(&$suggestions, $variables, $hook) {
  if ($hook == 'menu' || $hook == 'block') {
    // For menu blocks, check to see if the menu block is placed in an off-canvas
    // region, and if so use our custom template.
    $blocks = \Drupal::service('block.repository')->getVisibleBlocksPerRegion();
    $blocks = array_merge($blocks['left_off_canvas'], $blocks['right_off_canvas']);
    foreach ($blocks as $block) {
      $plugin = $block->getPlugin();
      if ($plugin->getBaseId() == 'system_menu_block') {
        $menu_name = str_replace('-', '_', $plugin->getDerivativeId());
        if ($hook == 'menu' && $variables['theme_hook_original'] == 'menu__' . $menu_name) {
          $suggestions[] = 'menu__off_canvas';
          break;
        }
        elseif ($hook == 'block' && $variables['elements']['#plugin_id'] == $plugin->getPluginId()) {
          $suggestions[] = 'block__off_canvas';
          break;
        }
      }
    }
  }
}
