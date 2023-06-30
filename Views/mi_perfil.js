$(document).ready(function () {
    var funcion;
    bsCustomFileInput.init();
    verificar_sesion();
    obtener_datos();
    llenar_departamentos();
    llenar_direcciones();
    llenar_historial();
    $('#departamento').select2({
        placeholder: 'Seleccione un departamento',
        language: {
            noResults: function () {
                return "No hay resultado";
            },
            searching: function () {
                return "Buscando...";
            }
        }
    });
    $('#provincia').select2({
        placeholder: 'Seleccione una provincia',
        language: {
            noResults: function () {
                return "No hay resultado";
            },
            searching: function () {
                return "Buscando...";
            }
        }
    });
    $('#distrito').select2({
        placeholder: 'Seleccione un distrito',
        language: {
            noResults: function () {
                return "No hay resultado";
            },
            searching: function () {
                return "Buscando...";
            }
        }
    });
    function llenar_historial() {
        funcion = "llenar_historial";
        $.post('../Controllers/HistorialController.php',{funcion},(response)=>{
            console.log(response);
        })
    }
    function llenar_direcciones() {
        funcion = "llenar_direcciones";
        $.post('../Controllers/UsuarioDistritoController.php', { funcion }, (response) => {
            //console.log(response);
            let direcciones = JSON.parse(response);
            let contador = 0;
            let template = '';
            direcciones.forEach(direccion => {
                contador++;
                template += `
                <div class="callout callout-info">
                    <div class="card-header">
                        <strong>direccion ${contador}</strong>
                        <div class="card-tools">
                            <button dir_id="${direccion.id}" type="button" class="eliminar_direccion btn btn-tool">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <h2 class="lead"><b>${direccion.direccion}</b></h2>
                        <p class="text-muted text-sm"><b>Referencia: ${direccion.referencia}</b></p>
                        <ul class="ml-4 mb-0 fa-ul text-muted">
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> 
                                ${direccion.distrito}, ${direccion.provincia}, ${direccion.departamento}
                            </li>
                        </ul>
                    </div>
                </div>
`
            });
            $('#direcciones').html(template);
        })
    }
    $(document).on('click', '.eliminar_direccion', (e) => {
        let elemento = $(this)[0].activeElement;
        let id = $(elemento).attr('dir_id');
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success m-3',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Desea borrar esta direccion?',
            text: "Esta accion puede traer consecuencias!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borra esto!',
            cancelButtonText: 'No, deseo cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                funcion = "eliminar_direccion";
                $.post('../Controllers/UsuarioDistritoController.php', { funcion, id }, (response) => {
                    if (response == "success") {
                        swalWithBootstrapButtons.fire(
                            'Borrado!',
                            'La direccion fue borrada.',
                            'success'
                        )
                        llenar_direcciones();
                    } else if (response == "error") {
                        swalWithBootstrapButtons.fire(
                            'No se borro',
                            'Hubo alteraciones en la integridad de datos',
                            'error'
                        )
                    } else {
                        swalWithBootstrapButtons.fire(
                            'No se ha borrado',
                            'tenemos problemas en el sistema',
                            'error'
                        )
                    }
                })
                /**/
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'La direccion no se borro',
                    'error'
                )
            }
        })
    })
    function llenar_departamentos() {
        funcion = "llenar_departamentos";
        $.post('../Controllers/DepartamentoController.php', { funcion }, (response) => {
            let departamentos = JSON.parse(response);
            let template = '';
            departamentos.forEach(departamento => {
                template += `
                <option value="${departamento.id}">${departamento.nombre}</option>
                `;
            });
            $('#departamento').html(template);
            $('#departamento').val('').trigger('change');
        })
    }
    $('#departamento').change(function () {
        let id_departamento = $('#departamento').val();
        funcion = "llenar_provincias";
        $.post('../Controllers/ProvinciaController.php', { funcion, id_departamento }, (response) => {
            let provincias = JSON.parse(response);
            let template = '';
            provincias.forEach(provincia => {
                template += `
                <option value="${provincia.id}">${provincia.nombre}</option>
                `;
            });
            $('#provincia').html(template);
            $('#provincia').val('').trigger('change');

        })
    })
    $('#provincia').change(function () {
        let id_provincia = $('#provincia').val();
        funcion = "llenar_distritos";
        $.post('../Controllers/DistritoController.php', { funcion, id_provincia }, (response) => {
            let distritos = JSON.parse(response);
            let template = '';
            distritos.forEach(distrito => {
                template += `
                <option value="${distrito.id}">${distrito.nombre}</option>
                `;
            });
            $('#distrito').html(template);
            $('#distrito').val('').trigger('change');
        })
    })

    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('../Controllers/UsuarioController.php', { funcion }, (response) => {
            //console.log(response);
            if (response != '') {
                let sesion = JSON.parse(response);
                $('#nav_login').hide();
                $('#nav_register').hide();
                $('#usuario_nav').text(sesion.user + ' #' + sesion.id);
                $('#avatar_nav').attr('src', '../Util/Img/Users/' + sesion.avatar);
                $('#avatar_menu').attr('src', '../Util/Img/Users/' + sesion.avatar);
                $('#usuario_menu').text(sesion.user);
            }
            else {
                $('#nav_usuario').hide();
                location.href = 'login.php';
            }
        })
    }
    function obtener_datos() {
        funcion = 'obtener_datos';
        $.post('../Controllers/UsuarioController.php', { funcion }, (response) => {
            let usuario = JSON.parse(response)
            $('#username').text(usuario.username);
            $('#tipo_usuario').text(usuario.tipo_usuario);
            $('#nombres').text(usuario.nombres + ' ' + usuario.apellidos);
            $('#avatar_perfil').attr('src', '../Util/Img/Users/' + usuario.avatar);
            $('#dni').text(usuario.dni);
            $('#email').text(usuario.email);
            $('#telefono').text(usuario.telefono);
        })
    }
    $('#form-direccion').submit(e => {
        funcion = 'crear_direccion';
        let id_distrito = $('#distrito').val();
        let direccion = $('#direccion').val();
        let referencia = $('#referencia').val();
        $.post('../Controllers/UsuarioDistritoController.php', { id_distrito, direccion, referencia, funcion }, (response) => {
            if (response == "success") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se ha registrado su direccion',
                    showConfirmButton: false,
                    timer: 1000
                }).then(function () {
                    $('#form-direccion').trigger('reset');
                    $('#departamento').val('').trigger('change');
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo conflicto al crear su direccion, comuniquese con el area de sistemas',
                })
            }
        });
        e.preventDefault();
    })
    $(document).on('click', '.editar_datos',(e)=>{
        funcion="obtener_datos";
        $.post('../Controllers/UsuarioController.php',{funcion},(response)=>{
            let usuario = JSON.parse(response);
            $('#nombres_mod').val(usuario.nombres);
            $('#apellidos_mod').val(usuario.apellidos);
            $('#dni_mod').val(usuario.dni);
            $('#email_mod').val(usuario.email);
            $('#telefono_mod').val(usuario.telefono);
        })
    })
    $.validator.setDefaults({
        submitHandler: function () {
            funcion="editar_datos";
            let datos = new FormData($('#form-datos')[0]);
            datos.append("funcion",funcion);
            $.ajax({
                type:"POST",
                url: '../Controllers/UsuarioController.php',
                data: datos,
                cache: false,
                processData: false,
                contentType: false,
                success: function(response){
                    console.log(response);
                    if (response == "success") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se ha editado sus datos',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(function () {
                            verificar_sesion();
                            obtener_datos();
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Hubo conflicto al editar sus datos, comuniquese con el area de sistemas',
                        })
                    }
                    
                }
            })
        }
    });
    jQuery.validator.addMethod("letras",
        function (value, element) {
            let variable = value.replace(/ /g, "");
            return /^[A-Za-z]+$/.test(variable);
        }
        , "Este campo solo permite letras");
    $('#form-datos').validate({
        rules: {
            nombres_mod: {
                required: true,
                letras: true
            },
            apellidos_mod: {
                required: true,
                letras: true
            },
            dni_mod: {
                required: true,
                digits: true,
                minlength: 8,
                maxlength: 8
            },
            email_mod: {
                required: true,
                email: true,
            },
            telefono_mod: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9
            }
        },
        messages: {
            nombres_mod: {
                required: "Por favor, ingrese su(s) nombre(s)"
            },
            apellidos_mod: {
                required: "Por favor, ingrese sus apellidos"
            },
            dni_mod: {
                required: "Por favor, ingrese su DNI",
                digits: "El DNI solo debe contener numeros",
                minlength: "El DNI debe ser de 8 caracteres",
                maxlength: "El DNI debe ser de 8 caracteres"
            },
            email_mod: {
                required: "Por favor, ingrese su email",
                email: "Por favor, ingrese un email valido"
            },
            telefono_mod: {
                required: "Por favor, ingrese su telefono",
                email: "Por favor, ingrese un telefono valido",
                digits: "El telefono solo debe contener numeros",
                minlength: "El telefono debe ser de 9 caracteres",
                maxlength: "El telefono debe ser de 9 caracteres"
            }
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
    $.validator.setDefaults({
        submitHandler: function () {
            funcion = "cambiar_contra";
            let pass_old = $('#pass_old').val();
            let pass_new = $('#pass_new').val();
            $.post('../Controllers/UsuarioController.php', {funcion,pass_old,pass_new},(response)=>{
                if (response == "success") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha cambiado su contraseña',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(function () {
                        $('#form-contra').trigger('reset');
                    })
                } else if(response == 'error'){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Contraseña incorrecta',
                        text: 'Ingrese su contraseña actual para poder cambiarla',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo conflicto al cambiar su contraseña, comuniquese con el area de sistemas',
                    })
                }
            })
        }
    });
    jQuery.validator.addMethod("letras",
        function (value, element) {
            let variable = value.replace(/ /g, "");
            return /^[A-Za-z]+$/.test(variable);
        }
        , "Este campo solo permite letras");
    $('#form-contra').validate({
        rules: {
            pass_old: {
                required: true,
                minlength: 8,
                maxlength: 20,
            },
            pass_new: {
                required: true,
                minlength: 8,
                maxlength: 20,
            },
            pass_repeat: {
                required: true,
                equalTo: "#pass_new"
            }
        },
        messages: {
            pass_old: {
                required: "Por favor, ingrese su contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres",
                maxlength: "Tu contraseña debe tener menos de 20 caracteres"
            },
            pass_new: {
                required: "Por favor, ingrese su contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres",
                maxlength: "Tu contraseña debe tener menos de 20 caracteres"
            },
            pass_repeat: {
                required: "Por favor, vuelva a ingresar su contraseña",
                equalTo: "Las contraseñas no coinciden"
            }
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