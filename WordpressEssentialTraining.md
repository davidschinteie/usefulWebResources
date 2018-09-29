## Lectia 1

### Inregistrarea stilurilor de css in tema de wordpress

    // Load HTML5 Blank styles
    function html5blank_styles(){
        wp_register_style('normalize', get_template_directory_uri() . '/normalize.css', array(), '1.0', 'all');
        wp_enqueue_style('normalize'); // Enqueue it!

        wp_register_style('html5blank', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');
        wp_enqueue_style('html5blank'); // Enqueue it!
    }
    add_action('wp_enqueue_scripts', 'html5blank_styles'); // Add Theme Stylesheet

### Crearea unui nou template de pagina

    <?php /* Template Name: Demo Page Template */ --> primul rand de cod in noul fisier 'template-pagina.php' creat in fisierul temei de wordpress
    
### Customizarea descrierii temei din style.css

```
/*
	Theme Name: HTML5 Blank
	Theme URI: http://html5blank.com
	Description: HTML5 Blank WordPress Theme
	Version: 1.4.3
	Author: Todd Motto (@toddmotto)
	Author URI: http://toddmotto.com
	Tags: Blank, HTML5, CSS3

	License: MIT
	License URI: http://opensource.org/licenses/mit-license.php
*/
```
    
### Functii wordpress de baza in template-urile de pagina (partea 1):

    <?php get_header(); // chemarea header-ului in template-ul de pagina ?>
    <?php get_footer(); // chemarea footer-ului in template-ul de pagina ?>
    <?php get_template_directory_uri(); // calea catre folderul temei de wordpress ?>
    
### Crearea unui meniu nou in dashboard-ul de wordpress

    // HTML5 Blank navigation
    function html5blank_nav(){
        wp_nav_menu(
        array(
            'theme_location'  => 'header-menu',
            'menu'            => '',
            'container'       => 'div',
            'container_class' => 'menu-{menu slug}-container',
            'container_id'    => '',
            'menu_class'      => 'menu',
            'menu_id'         => '',
            'echo'            => true,
            'fallback_cb'     => 'wp_page_menu',
            'before'          => '',
            'after'           => '',
            'link_before'     => '',
            'link_after'      => '',
            'items_wrap'      => '<ul class="menu-list">%3$s</ul>',
            'depth'           => 0,
            'walker'          => ''
            )
        );
    }

### Inregistrarea acestui meniu nou

    // Register HTML5 Blank Navigation
    function register_html5_menu(){
        register_nav_menus(array( // Using array to specify more menus if needed
            'header-menu' => __('Header Menu', 'html5blank'), // Main Navigation
            'sidebar-menu' => __('Sidebar Menu', 'html5blank'), // Sidebar Navigation
            'extra-menu' => __('Extra Menu', 'html5blank'), // Extra Navigation if needed (duplicate as many as you need!)
            'mobile-menu' => __('Mobile Menu', 'html5blank') // Mobile Navigation
        ));
    }

### Folosirea acestui meniu in template-urile de pagina

    <?php html5blank_nav(); ?>

## Lectia a 2-a

### Functii wordpress de baza in template-urile de pagina (partea a 2-a):

    <?php the_title(); ?> // titlul paginii din template-ul de pagina

### Inregistrarea scripturilor de js in tema de wordpress

    // Load HTML5 Blank conditional scripts
    function html5blank_conditional_scripts(){
        if (is_page('pagenamehere')) {
            wp_register_script('scriptname', get_template_directory_uri() . '/js/scriptname.js', array('jquery'), '1.0.0'); // Conditional script(s)
            wp_enqueue_script('scriptname'); // Enqueue it!
        }
    }
    add_action('wp_print_scripts', 'html5blank_conditional_scripts'); // Add Conditional Page Scripts

### Crearea unui widget area nou

    // Define Sidebar Widget Area 1
    register_sidebar(array(
        'name' => __('Widget Area 1', 'html5blank'),
        'description' => __('Description for this widget-area...', 'html5blank'),
        'id' => 'widget-area-1',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>'
    ));

### Folosirea acestui sidebar in template-urile de footer/header sau cele de pagina

    <?php dynamic_sidebar( 'footer-area' ); ?>

### Adaugarea de setari in tema de wordpress prin ACF

    //Add Theme Settings with ACF
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page(array(
            'page_title' => 'Theme General Settings',
            'menu_title' => 'Theme Settings',
            'menu_slug' => 'theme-general-settings'
        ));
        acf_add_options_sub_page(array(
            'page_title' => 'Theme Partners Logos',
            'menu_title' => 'Partners Logos',
            'parent_slug' => 'theme-general-settings',
        ));
        acf_add_options_sub_page(array(
            'page_title' => 'Theme Footer Settings',
            'menu_title' => 'Footer',
            'parent_slug' => 'theme-general-settings',
        ));
    }

### Crearea de postare de tip custom

    // Create 1 Custom Post type for a Demo, called HTML5-Blank
    function create_post_type_html5(){
        register_taxonomy_for_object_type('category', 'html5-blank'); // Register Taxonomies for Category
        register_taxonomy_for_object_type('post_tag', 'html5-blank');
        register_post_type('html5-blank', // Register Custom Post Type
            array(
            'labels' => array(
                'name' => __('HTML5 Blank Custom Post', 'html5blank'), // Rename these to suit
                'singular_name' => __('HTML5 Blank Custom Post', 'html5blank'),
                'add_new' => __('Add New', 'html5blank'),
                'add_new_item' => __('Add New HTML5 Blank Custom Post', 'html5blank'),
                'edit' => __('Edit', 'html5blank'),
                'edit_item' => __('Edit HTML5 Blank Custom Post', 'html5blank'),
                'new_item' => __('New HTML5 Blank Custom Post', 'html5blank'),
                'view' => __('View HTML5 Blank Custom Post', 'html5blank'),
                'view_item' => __('View HTML5 Blank Custom Post', 'html5blank'),
                'search_items' => __('Search HTML5 Blank Custom Post', 'html5blank'),
                'not_found' => __('No HTML5 Blank Custom Posts found', 'html5blank'),
                'not_found_in_trash' => __('No HTML5 Blank Custom Posts found in Trash', 'html5blank')
            ),
            'public' => true,
            'hierarchical' => true, // Allows your posts to behave like Hierarchy Pages
            'has_archive' => true,
            'supports' => array(
                'title',
                'editor',
                'excerpt',
                'thumbnail'
            ), // Go to Dashboard Custom HTML5 Blank post for supports
            'can_export' => true, // Allows export in Tools > Export
            'taxonomies' => array(
                'post_tag',
                'category'
            ) // Add Category and Post Tags support
        ));
    }
    
### Chemarea postarilor simple in template-ul de pagina

    <?php 
    if (have_posts()): 
        while (have_posts()) : the_post(); ?>

            $post_id = get_the_ID();
            // echo $post_id;

            <?php the_title(); ?> // titlul postarii
            <?php the_excerpt(); ?> // excerpt-ul postarii
            <?php echo get_permalink();?> // link-ul catre articol/postare

        <?php endwhile; ?>

    <?php else: ?>

        <h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>

    <?php endif; ?>

### Chemarea postarilor custom in template-ul de pagina

    $query = new WP_Query(array(
        'post_type' => 'service',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'order' => 'ASC',
        'tax_query' => array (
            array(
                'taxonomy' => 'channel',
                'field' => 'slug',
                'terms' => $services_term->slug,
            )
        )
        // 'order' => 'DESC'
    ));

     while ($query->have_posts()) {
        $query->the_post();
        // var_dump($query->the_post());
        similar ca la simple posts ...
    } //end while posts
