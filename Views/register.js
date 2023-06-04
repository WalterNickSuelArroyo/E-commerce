$(document).ready(function () {
    var funcion;
    verificar_sesion();
    function verificar_sesion(){
        funcion = 'verificar_sesion';
        $.post('../Controllers/UsuarioController.php',{funcion},(response)=>{
            if (response != '') {
                location.href = '../index.php';
            }
        })
    }
    $.validator.setDefaults({
        submitHandler: function () {
            let username = $('#username').val();
            let pass = $('#pass').val();
            let nombres = $('#nombres').val();
            let apellidos = $('#apellidos').val();
            let dni = $('#dni').val();
            let email = $('#email').val();
            let telefono = $('#telefono').val();
            funcion = "registrar_usuario";
            $.post('../Controllers/UsuarioController.php', { username, pass, nombres, apellidos, dni, email, telefono, funcion }, (response) => {
                response = response.trim(); //A veces el success viene con espacios, por eso se aplica ese metodo para elimiar el espacio
                if (response == "success") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha registrado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        $('#form-register').trigger('reset');
                        location.href = '../Views/login.php';
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
            })
        }
    });
    jQuery.validator.addMethod("usuario_existente",
        function (value, element) {
            let funcion = "verificar_usuario";
            let bandera;
            $.ajax({
                type: "POST",
                url: "../Controllers/UsuarioController.php",
                data: 'funcion=' + funcion + '&&value=' + value,
                async: false,
                success: function (response) {
                    if (response == "success") {
                        bandera = false;
                    } else {
                        bandera = true;
                    }
                }
            })
            return bandera;
        }
        , "El usuario ya existe, por favor, ingrese uno diferente");

    jQuery.validator.addMethod("letras",
        function (value, element) {
            return /^[A-Za-z]+$/.test(value);
        }
        , "Este campo solo permite letras");
    $('#form-register').validate({
        rules: {
            nombres: {
                required: true,
                letras: true
            },
            apellidos: {
                required: true,
                letras: true
            },
            username: {
                required: true,
                minlength: 7,
                maxlength: 20,
                usuario_existente: true
            },
            pass: {
                required: true,
                minlength: 8,
                maxlength: 20,
            },
            pass_repeat: {
                required: true,
                equalTo: "#pass"
            },
            dni: {
                required: true,
                digits: true,
                minlength: 8,
                maxlength: 8
            },
            email: {
                required: true,
                email: true,
            },
            telefono: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9
            },
            terms: {
                required: true
            },
        },
        messages: {
            nombres: {
                required: "Por favor, ingrese su(s) nombre(s)"
            },
            apellidos: {
                required: "Por favor, ingrese sus apellidos"
            },
            username: {
                required: "Por favor, ingrese su nombre de usuario",
                minlength: "Tu nombre de usuario debe tener al menos 7 caracteres",
                maxlength: "Tu nombre de usuario debe tener menos de 20 caracteres"
            },
            pass: {
                required: "Por favor, ingrese su contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres",
                maxlength: "Tu contraseña debe tener menos de 20 caracteres"
            },
            pass_repeat: {
                required: "Por favor, vuelva a ingresar su contraseña",
                equalTo: "Las contraseñas no coinciden"
            },
            dni: {
                required: "Por favor, ingrese su DNI",
                digits: "El DNI solo debe contener numeros",
                minlength: "El DNI debe ser de 8 caracteres",
                maxlength: "El DNI debe ser de 8 caracteres"
            },
            email: {
                required: "Por favor, ingrese su email",
                email: "Por favor, ingrese un email valido"
            },
            telefono: {
                required: "Por favor, ingrese su telefono",
                email: "Por favor, ingrese un telefono valido",
                digits: "El telefono solo debe contener numeros",
                minlength: "El telefono debe ser de 9 caracteres",
                maxlength: "El telefono debe ser de 9 caracteres"
            },
            terms: "Por favor, acepte los terminos y condiciones"
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
            $(element).removeClass('is-valid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
            $(element).addClass('is-valid');
        }
    });
})