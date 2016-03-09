<?php
/**
 * @file
 * Contains functions only needed for drush integration.
 */

/**
 * Implementation of hook_drush_command().
 */
function zurb_foundation_drush_command() {
  $items = array();

  $items['foundation-sub-theme'] = array(
    'description' => 'Create a ZURB foundation sub-theme',
    'aliases' => array('fst'),
    'arguments' => array(
      'name'         => 'Your sub-theme name.',
      'machine_name' => 'A machine-readable name for your theme, optional only  [a-z, 0-9] ',
    ),
    'options' => array(
      'description'  => 'Your sub-theme description.',
      'machine-name' => '[a-z, 0-9] A machine-readable name for your theme.'
    ),
    'examples' => array(
      'drush fst "custom theme name"' => 'Create a sub-theme with the default options.',
      'drush fst "foo bar" "foo_bar"  --description="My supersweet awesome theme"' => 'Create a sub-theme with additional options.',
    ),
  );

  return $items;
}

/**
 * Create a Zurb foundation sub-theme.
 */
function drush_zurb_foundation_foundation_sub_theme($name = NULL, $machine_name = NULL, $description = NULL) {
  if (empty($name)) {
    drush_set_error(dt("Please provide a name for the sub-theme.\nUSAGE:\tdrush fst [name] [machine_name !OPTIONAL] [description !OPTIONAL]\n"));
    return;
  }
  //Filter everything but letters, numbers, underscores, and hyphens
  $machine_name = !empty($machine_name) ? preg_replace('/[^a-z0-9_-]+/', '', strtolower($machine_name)) : preg_replace('/[^a-z0-9_-]+/', '', strtolower($name));
  // Eliminate hyphens
  $machine_name = str_replace('-', '_', $machine_name);

  $zurb_path = drush_locate_root() . '/' . drupal_get_path('theme', 'zurb_foundation');
  $subtheme_path = explode('/', $zurb_path);
  array_pop($subtheme_path);
  $subtheme_path = implode('/', $subtheme_path) . '/' . $machine_name;

  // Make a fresh copy of the subtheme.
  $s = drush_copy_dir("$zurb_path/STARTER/", $subtheme_path);
  if (empty($s)) {
    return;
  }

  // Rename files and fill in the theme machine name
  drush_op('rename', "$subtheme_path/STARTER.info.yml.txt", "$subtheme_path/$machine_name.info.yml");
  drush_op('rename', "$subtheme_path/STARTER.libraries.yml", "$subtheme_path/$machine_name.libraries.yml");
  drush_op('rename', "$subtheme_path/STARTER.theme", "$subtheme_path/$machine_name.theme");
  drush_op('rename', "$subtheme_path/css/STARTER.css", "$subtheme_path/css/$machine_name.css");
  drush_op('rename', "$subtheme_path/scss/STARTER.scss", "$subtheme_path/scss/$machine_name.scss");
  drush_op('rename', "$subtheme_path/js/STARTER.js", "$subtheme_path/js/$machine_name.js");

  // Change the name of the theme.
  drush_op('zurb_foundation_file_str_replace', "$subtheme_path/$machine_name.info.yml", 'ZURB Foundation Sub-theme Starter', "$name");

  // Change the name of the theme.
  if (!empty($description)) {
    drush_op('zurb_foundation_file_str_replace', "$subtheme_path/$machine_name.info.yml", 'Custom sub-theme, inherits from the Foundation base theme read <a href=\"http://foundation.zurb.com/docs/index.php\">framework documentation</a>', $description);
  }

  // Replaces instances of STARTER in required files to name of the theme.
  drush_op('zurb_foundation_file_str_replace', "$subtheme_path/$machine_name.theme", 'STARTER', "$machine_name");
  drush_op('zurb_foundation_file_str_replace', "$subtheme_path/$machine_name.libraries.yml", 'STARTER', "$machine_name");
  drush_op('zurb_foundation_file_str_replace', "$subtheme_path/theme-settings.php", 'STARTER', "$machine_name");
  drush_op('zurb_foundation_file_str_replace', "$subtheme_path/$machine_name.info.yml", 'STARTER', "$machine_name");

  // Notify user of the newly created theme.
  drush_print(dt("\n!name sub-theme was created in !path. \n",
    array(
      '!name' => $name,
      '!path' => $subtheme_path,
    )
  ));
  drush_pm_enable_validate($machine_name);
  drush_pm_enable($machine_name);
}

/**
 * Internal helper: Replace strings in a file.
 */
function zurb_foundation_file_str_replace($file_path, $find, $replace) {
  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);
  file_put_contents($file_path, $file_contents);
}

/**
 * Implements hook_drush_help().
 */
function zurb_foundation_drush_help($section) {
  switch ($section) {
    case 'drush:foundation-sub-theme':
      return dt("Create a ZURB foundation custom sub-theme.");
  }
}
