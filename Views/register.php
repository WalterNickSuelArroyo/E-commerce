<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Register | Ecommerce WNSA</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../Util/Css/css/all.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="../Util/Css/adminlte.min.css">
    <link rel="stylesheet" href="../Util/Css/toastr.min.css">
</head>

<body class="hold-transition login-page">
    <div class="mt-5">
        <div class="login-logo">
            <img src="../Util/Img/logo.png" class="profile-user-img img-fluid img-circle">
            <a href="../index.php"><b>Ecommerce</b>WNSA</a>
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Registrarse</p>
                <form id="form-register">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="username">Nombre de usuario</label>
                                <input type="text" name="username" class="form-control" id="username"
                                    placeholder="Ingrese el nombre de usuario">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="pass">Contraseña</label>
                                <input type="password" name="pass" class="form-control" id="pass"
                                    placeholder="Ingrese la contraseña">
                            </div>
                            <div class="form-group">
                                <label for="nombres">Nombres</label>
                                <input type="text" name="nombres" class="form-control" id="nombres"
                                    placeholder="Ingrese sus nombres">
                            </div>
                            <div class="form-group">
                                <label for="dni">DNI</label>
                                <input type="text" name="dni" class="form-control" id="dni"
                                    placeholder="Ingrese su DNI">
                            </div>
                            <div class="form-group">
                                <label for="telefono">Telefono</label>
                                <input type="text" name="telefono" class="form-control" id="telefono"
                                    placeholder="Ingrese su telefono">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="pass_repeat">Repetir contraseña</label>
                                <input type="password" name="pass_repeat" class="form-control" id="pass_repeat"
                                    placeholder="Ingrese nuevamente la contraseña">
                            </div>
                            <div class="form-group">
                                <label for="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" class="form-control" id="apellidos"
                                    placeholder="Ingrese sus apellidos">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" name="email" class="form-control" id="email"
                                    placeholder="Ingrese su email">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group mb-0">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" name="terms" class="custom-control-input" id="terms">
                                    <label class="custom-control-label" for="terms">Estoy de acuerdo con los <a
                                            href="#">terminos de servicio</a>.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-lg bg-gradient-primary">Registrarse</button>
                    </div>
                </form>

            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="../Util/Js/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="../Util/Js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="../Util/Js/adminlte.min.js"></script>
    <script src=""></script>
    <script src="../Util/Js/toastr.min.js"></script>
    <script src="../Util/Js/jquery.validate.min.js"></script>
    <script src="../Util/Js/additional-methods.min.js"></script>
</body>

</html>
<script>
    $(function () {
        $.validator.setDefaults({
            submitHandler: function () {
                alert("Form successful submitted!");
            }
        });
        $('#form-register').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minlength: 5
                },
                terms: {
                    required: true
                },
            },
            messages: {
                email: {
                    required: "Please enter a email address",
                    email: "Please enter a valid email address"
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                terms: "Please accept our terms"
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            }
        });
    });
</script>