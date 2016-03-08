========================================
ZURB FOUNDATION 5 - PRE DRUPAL 8 RELEASE
========================================

Getting Started
---------------

At the time of this writing, Twig is integrated into Drupal 8 core but a lot of theme function / render function cleanup remains. We are working diligently to keep up with the changes
as Drupal 8 development progresses towards a release.

Foundation Docs
---------------

Examples of Foundation markup can be found here: http://foundation.zurb.com/docs/

Dependencies
------------

Zurb Foundation theme dependencies are managed with a ruby Gemfile. This manages bundle dependencies and their versions for Foundation core and addons. When you run 'compass install foundation' against this
directory, the Gemfile is adhered to and Foundation is built accordingly.

The reason there is a Gemfile instead of a Composer file is because the Foundation project is built with Compass. This may change in the future to be more in line with Drupal 8 / Symfony way of managing dependencies.

The Gemfile.lock file is a generated result of installing from the Gemfile, recording each pacakge and version used to build the project.

Installing Ruby
---------------

Follow the guides at this URL for your applicable operating system:

  - http://www.ruby-lang.org/en/downloads/

There is a one click installer for Windows. If you're on OSX, we highly recommend using Homebrew to install Ruby.

You will also want to install RVM, a 'version manager' for Ruby - particularly if you are on OSX which ships with Ruby 1.8.x by default.

  - https://rvm.io/

Installing RubyGems
-------------------

RubyGems comes with RVM (above). If all went well during installation, you should be able to type this at the command line:

`gem list`

This should list the local gems currently installed. From here, you should be able to do the following:

`gem install zurb-foundation`
`gem install compass`

This will install the latest versions of Zurb Foundation gem and Compass gems required for building the Foundation core.

You can also specify gem versions with the command above. If the Gemfile in this theme changes and supports newer versions of the Zurb Foundation gem, you can install and target that specific release with:

`gem install zurb-foundation -v x.x.x`

Where x.x.x is the version number you want to install.

Installing this theme
---------------------

To install Zurb Foundation, copy zurb-foundation into the root-level themes directory, or into a sites/*/themes directory,
as zurb_foundation. The naming difference is important when using a sub-theme to include Zurb Foundation SASS files.

Once copied, you can enable the theme by visiting "/admin/appearance" and clicking "Install and set as default" under
the ZURB Foundation block.

Once installed, you can visit /admin/appearance/settings/zurb_foundation to configure the theme.

How to Use Zurb Foundation
--------------------------

# Creating a Sub-theme

To create a sub-theme, simply run the Drush command "drush fst sub_theme", where "sub_theme" is the desired machine name
of your sub-theme. Once a sub-theme is created, you can enable it at /admin/appearance/settings/zurb_foundation. Detailed
sub-theme documentation can be found in the README.txt file included in your new sub-theme.

# Theme Settings

At /admin/appearance/settings/zurb_foundation, there are a variety fo Zurb Foundation specific settings you can use to
configure and enable theme features. There are descriptions of each setting and setting group on that page.

The most popular feature by far is the Top Bar, which can be enabled under "FOUNDATION TOP BAR". This setting will theme
the Drupal-provided "Main Menu" as a Foundation Top Bar, which can be stickied to the top of a page and supports deep menu
nesting.

# The Off Canvas and Meta Header Regions

Zurb Foundation for Drupal 8 provides a few new regions compared to the Drupal 7 branches.

There are now two off canvas regions, left_off_canvas and right_off_canvas, that can be used to display content off screen.
The most common use for this is menus, and as such we've worked to theme any menu block placed in an off canvas region
using the appropriate Foundation styles. Nesting is supported, but the parent menu link will be used as a button to
move to the next menu level, and cannot also link to a page. Here's an example menu structure for this:

- Main (<front>)
- Information (#)
-- About Us (/node/1)
-- Contact Us (/contact)
--- Locations (#)
---- Boston (/locations/boston)
---- Portland (/locations/portland)
- Your Account (/user)

In this example, the menu links at the top of a new tree (Information, Locations) will simply open up a new menu level.

To expand an off canvas region, simply create a menu link with the class "left-off-canvas-toggle" or "right-off-canvas-toggle",
or a content block with an element like "<a href="#" class="left-off-canvas-toggle">Open Left Menu</a>".

More examples of this can be seen at http://foundation.zurb.com/docs/components/offcanvas.html

Lastly, we also provide a Meta Header region, which can be used to place blocks above all other page regions. This is
most useful for the Main Menu block, which can be then rendered as a Top Bar.