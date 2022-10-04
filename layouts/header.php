<?php $user = current_user(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title><?php if (!empty($page_title))
                echo remove_junk($page_title);
            elseif (!empty($user))
                echo ucfirst($user['name']);
            else echo "ORBIS Cargo System"; ?>
    </title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <link rel="stylesheet" href="libs/css/main.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/jquery.validate.min.js"></script>

</head>

<body>
    <?php if ($session->isUserLoggedIn(true)) : ?>
        <header class="border-bottom header-color">
            <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
                <div>
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        <img src="https://orbislogistics.com.mx/wp-content/uploads/2021/09/LOGO@2x.png" width="150">
                    </a>
                </div>
                <div class="d-flex align-items-center">

                    <div class="w-100 me-3 header-date">
                        <?php date_default_timezone_set("America/Mexico_City"); ?>
                        <strong><?php echo date("d/m/Y"); ?></strong>
                    </div>



                    <div class="flex-shrink-0 dropdown">
                        <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
                        </a>
                        <ul class="dropdown-menu text-small">
                            <li><a class="dropdown-item" href="profile.php?id=<?php echo (int)$user['id']; ?>">Perfil</a></li>
                            <li><a class="dropdown-item" href="edit_account.php" title="edit account">Configuración</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="logout.php">Salir</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </header>
        <div class="sidebar">
            <?php if ($user['user_level'] === '1') : ?>
                <!-- admin menu -->
                <?php include_once('admin_menu.php'); ?>

            <?php elseif ($user['user_level'] === '2') : ?>
                <!-- Special user -->
                <?php include_once('special_menu.php'); ?>

            <?php elseif ($user['user_level'] === '3') : ?>
                <!-- User menu -->
                <?php include_once('user_menu.php'); ?>

            <?php endif; ?>

        </div>
    <?php endif; ?>

    <div>
        <div>