# Dangular

A progressively decoupled Angular 2 application proof of concept within Drupal 8.

## Getting started

1. Clone this repository into a directory and create a new Drupal site at the repository root (using Acquia Dev Desktop).
2. Run `npm install` at `./profiles/dangular/modules/custom/angular` to retrieve all of Angular 2's dependencies.
3. Go to `http://localhost:8080/core/install.php` to begin the Drupal installation process, or use `drush si`.
4. If using `install.php`, you may need to execute `drush genc 24 --types=dangular_grid_item`. 
5. Select the `Dangular` installation profile for prewritten content and configuration.

## Contributors

Development is taking place as part of the Acquia Build Week 2016 Hackathon.

* Adam Balsam
* Adam Hoenich
* Kevin O'Leary
* Preston So
