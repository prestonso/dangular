<?php

/**
 * Implements theme_menu_local_tasks().
 */
function zurb_foundation_menu_local_tasks(&$variables) {
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="visually-hidden">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<ul class="button-group">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="visually-hidden">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="button-group">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

/**
 * Implements theme_menu_local_task().
 */
function zurb_foundation_menu_local_task(&$variables) {
  $link = $variables['element']['#link'];
  $link_text = array(
    '#markup' => $link['title'],
  );

  if (!empty($variables['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $link_text['#suffix'] = '<span class="visually-hidden">' . t('(active tab)') . '</span>';
  }

  $link['url']->setOption('attributes', array('class' => array('button', 'secondary')));

  $a_tag = \Drupal::l($link_text, $link['url']);

  return '<li' . (!empty($variables['element']['#active']) ? ' class="active"' : '') . '>' . $a_tag. "</li>\n";
}

/**
 * Implements theme_preprocess_menu__off_canvas().
 *
 * Adds the appropriate submenu class to off canvas menus.
 */
function zurb_foundation_preprocess_menu__off_canvas(&$variables) {
  $blocks = \Drupal::service('block.repository')->getVisibleBlocksPerRegion();
  foreach (array('left', 'right') as $direction) {
    foreach ($blocks[$direction . '_off_canvas'] as $block) {
      $plugin = $block->getPlugin();
      if ($plugin->getBaseId() == 'system_menu_block') {
        $menu_name = str_replace('-', '_', $plugin->getDerivativeId());
        if ($variables['theme_hook_original'] == 'menu__' . $menu_name) {
          $variables['attributes']['class'][] = $direction . '-submenu';
          break;
        }
      }
    }
  }
}

/**
 * Implements theme_preprocess_menu__MENU_NAME().
 */
function zurb_foundation_preprocess_menu__main(&$variables) {
  if ($variables['top_bar'] = theme_get_setting('zurb_foundation_top_bar_enable')) {
    $top_bar_classes = array();

    if (theme_get_setting('zurb_foundation_top_bar_grid')) {
      $top_bar_classes[] = 'contain-to-grid';
    }

    if (theme_get_setting('zurb_foundation_top_bar_sticky')) {
      $top_bar_classes[] = 'sticky';
    }

    if ($variables['top_bar'] == 2) {
      $top_bar_classes[] = 'show-for-small';
    }

    $variables['top_bar_classes'] = implode(' ', $top_bar_classes);
    $variables['top_bar_menu_text'] = theme_get_setting('zurb_foundation_top_bar_menu_text');

    $top_bar_options = array();

    if (!theme_get_setting('zurb_foundation_top_bar_custom_back_text')) {
      $top_bar_options[] = 'custom_back_text:false';
    }

    if ($back_text = theme_get_setting('zurb_foundation_top_bar_back_text')) {
      if ($back_text !== 'Back') {
        $top_bar_options[] = "back_text:{$back_text}";
      }
    }

    if (!theme_get_setting('zurb_foundation_top_bar_is_hover')) {
      $top_bar_options[] = 'is_hover:false';
    }

    if (!theme_get_setting('zurb_foundation_top_bar_scrolltop')) {
      $top_bar_options[] = 'scrolltop:false';
    }

    if (theme_get_setting('zurb_foundation_top_bar_mobile_show_parent_link')) {
      $top_bar_options[] = 'mobile_show_parent_link:true';
    }

    $variables['top_bar_options'] = implode('; ', $top_bar_options);

    // Format the linked site name.
    $site_name = \Drupal::config('system.site')->get('name');
    $title = strip_tags($site_name) . ' ' . t('Home');
    $url = \Drupal\Core\Url::fromRoute('<front>');
    $url->setOption('attributes', array('title' => $title));

    $variables['linked_site_name'] = '';
    if (!empty($variables['site_name'])) {
      $variables['linked_site_name'] = \Drupal::l($variables['site_name'], $url);
    }

    $variables['site_name'] = \Drupal::l($site_name, $url);

    // Embed the search form inside the Top Bar.
    if (theme_get_setting('zurb_foundation_top_bar_search')) {
      if (\Drupal::moduleHandler()->moduleExists('search')) {
        $search_form = \Drupal::formBuilder()
          ->getForm('Drupal\search\Form\SearchBlockForm');

        // Wrap the search form in proper Top Bar classes.
        $search_form['#prefix'] = '<ul class="right"><li class="has-form">';
        $search_form['#suffix'] = '</ul></li>';

        $variables['top_bar_search'] = $search_form;
      }
    }
  }
}
