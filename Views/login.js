$(document).ready(function(){
    var funcion;
    $('#form-login').submit(e=>{
        funcion = 'login';
        let user = $('#user').val();
        let pass = $('#pass').val();
        $.post('../Controllers/UsuarioController.php',{user,pass,funcion},(response)=>{
            if (response == 'logueado') {
                toastr.success('Logueado');
            }else {
                toastr.error('Usuario o contraseña incorrectas');
            }
        });
        e.preventDefault();
    })
})