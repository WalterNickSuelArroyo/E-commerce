$(document).ready(function () {
    var funcion;
    verificar_sesion();
    obtener_datos();
    llenar_departamentos();
    llenar_direcciones();
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
    function llenar_direcciones() {
        funcion = "llenar_direcciones";
        $.post('../Controllers/UsuarioDistritoController.php', { funcion }, (response) => {
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
                    console.log(response);
                })
                    /*swalWithBootstrapButtons.fire(
                        'Borrado!',
                        'La direccion fue borrada.',
                        'success'
                    )*/
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
            console.log(response);
            if (response != '') {
                let sesion = JSON.parse(response);
                $('#nav_login').hide();
                $('#nav_register').hide();
                $('#usuario_nav').text(sesion.user + ' #' + sesion.id);
                $('#avatar_nav').attr('src', '../Util/Img/' + sesion.avatar);
                $('#avatar_menu').attr('src', '../Util/Img/' + sesion.avatar);
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
            $('#nombres').text(usuario.nombres + '' + usuario.apellidos);
            $('#avatar_perfil').attr('src', '../Util/Img/' + usuario.avatar);
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
})