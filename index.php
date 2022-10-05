<?php
ob_start();
require_once('includes/load.php');
if ($session->isUserLoggedIn(true)) {
    redirect('home.php', false);
}
?>
<?php include_once('layouts/header.php'); ?>

<body class="text-center">
    <?php echo display_msg($msg); ?>
    <main class="form-signin w-100 m-auto">
        <div class="login">


            <form method="post" action="auth.php" class="login">
                <h1 class="h1 mb-3 title">AutoSoft</h1>
                <h1 class="h3 mb-3 fw-normal">Bienvenido</h1>
                <div class="form-floating">
                    <input type="name" class="form-control" name="username" placeholder="name@example.com">
                    <label for="username">Usuario</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" name="password" placeholder="Contraseña">
                    <label for="Password">Contraseña</label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
                <p class="mt-5 mb-3 text-muted">AutoSoft &copy; 2022</p>
            </form>
        </div>
    </main>
</body>
<?php include_once('layouts/footer.php'); ?>