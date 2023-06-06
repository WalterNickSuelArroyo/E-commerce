$(document).ready(function(){
    var funcion;
    verificar_sesion();
    obtener_datos();
    llenar_departamentos();
    $('#departamento').select2({
        placeholder: 'Seleccione un departamento',
        language: {
            noResults: function(){
                return "No hay resultado";
            },
            searching: function(){
                return "Buscando...";
            }
        }
    });
    $('#provincia').select2({
        placeholder: 'Seleccione una provincia',
        language: {
            noResults: function(){
                return "No hay resultado";
            },
            searching: function(){
                return "Buscando...";
            }
        }
    });
    $('#distrito').select2({
        placeholder: 'Seleccione un distrito',
        language: {
            noResults: function(){
                return "No hay resultado";
            },
            searching: function(){
                return "Buscando...";
            }
        }
    });
    function llenar_departamentos() {
        funcion = "llenar_departamentos";
        $.post('../Controllers/DepartamentoController.php',{funcion},(response)=>{
            let departamentos = JSON.parse(response);
            let template='';
            departamentos.forEach(departamento=>{
                template+=`
                <option value="${departamento.id}">${departamento.nombre}</option>
                `;
            });
            $('#departamento').html(template);
            $('#departamento').val('').trigger('change');
        })
    }
    $('#departamento').change(function(){
        let id_departamento = $('#departamento').val();
        funcion="llenar_provincias";
        $.post('../Controllers/ProvinciaController.php',{funcion,id_departamento},(response)=>{
            let provincias = JSON.parse(response);
            let template='';
            provincias.forEach(provincia=>{
                template+=`
                <option value="${provincia.id}">${provincia.nombre}</option>
                `;
            });
            $('#provincia').html(template);
            $('#provincia').val('').trigger('change');
            
        })
    })
    $('#provincia').change(function(){
        let id_provincia = $('#provincia').val();
        funcion="llenar_distritos";
        $.post('../Controllers/DistritoController.php',{funcion,id_provincia},(response)=>{
            let distritos = JSON.parse(response);
            let template='';
            distritos.forEach(distrito=>{
                template+=`
                <option value="${distrito.id}">${distrito.nombre}</option>
                `;
            });
            $('#distrito').html(template);
            $('#distrito').val('').trigger('change');
        })
    })
    
    function verificar_sesion(){
        funcion = 'verificar_sesion';
        $.post('../Controllers/UsuarioController.php',{funcion},(response)=>{
            console.log(response);
            if (response != '') {
                let sesion = JSON.parse(response);
                $('#nav_login').hide();
                $('#nav_register').hide();
                $('#usuario_nav').text(sesion.user + ' #' + sesion.id);
                $('#avatar_nav').attr('src','../Util/Img/'+sesion.avatar);
                $('#avatar_menu').attr('src','../Util/Img/'+sesion.avatar);
                $('#usuario_menu').text(sesion.user);
            }
            else {
                $('#nav_usuario').hide();
                location.href = 'login.php';
            }
        })
    }
    function obtener_datos(){
        funcion = 'obtener_datos';
        $.post('../Controllers/UsuarioController.php',{funcion},(response)=>{
            let usuario = JSON.parse(response)
            $('#username').text(usuario.username);
            $('#tipo_usuario').text(usuario.tipo_usuario);
            $('#nombres').text(usuario.nombres + '' + usuario.apellidos);
            $('#avatar_perfil').attr('src','../Util/Img/'+usuario.avatar);
            $('#dni').text(usuario.dni);
            $('#email').text(usuario.email);
            $('#telefono').text(usuario.telefono);
        })
    }
    $('#form-direccion').submit(e=>{
        funcion = 'crear_direccion';
        let id_distrito = $('#distrito').val();
        let direccion = $('#direccion').val();
        let referencia = $('#referencia').val();
        $.post('../Controllers/UsuarioDistritoController.php',{id_distrito,direccion,referencia,funcion},(response)=>{
            if (response == "success") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se ha registrado su direccion',
                    showConfirmButton: false,
                    timer: 1000
                }).then(function(){
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