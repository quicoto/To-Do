<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package todo
 */

get_header();
?>
	<main id="primary" class="site-main container">
		<?php if (is_user_logged_in()) { ?>
			<section class="mb-4">
				<?php get_template_part( 'template-parts/create-post' ); ?>
			</section>
			<div class="todo__loading">
				<div class="d-flex justify-content-center">
					<?php get_template_part( 'template-parts/loading' ); ?>
				</div>
			</div>
			<div class="todo__counter"></div>
			<section class="todo__postsContainer mb-4"></section>
		<?php } else { ?>
			<div class="row">
				<div class="col-12">
					<h2 class="text-center mb-4">You must be logged in to use this app</h2>
				</div>
				<div class="col-12">
					<p class="text-center">
						<a href="<?=get_home_url()?>/wp-admin" class="btn btn-primary">Go to WordPress Dashboard</a>
					</p>
				</div>
			</div>
		<?php } ?>
	</main><!-- #main -->
<?php
get_footer();
