<?php
$page_title = 'Inicio';
require_once('includes/load.php');
if (!$session->isUserLoggedIn(true)) {
    redirect('index.php', false);
}
?>
<?php include_once('layouts/header.php'); ?>
<div class="home">
    <?php echo display_msg($msg); ?>
    <div class="jumbotron text-center">
        <h1>Esta es su nueva página de inicio</h1>
    </div>

    <?php include_once('layouts/footer.php'); ?>