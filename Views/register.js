$(document).ready(function () {
    $.validator.setDefaults({
        submitHandler: function () {
            alert("Form successful submitted!");
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