$(document).ready(function(){
    $('#form-login').submit(e=>{
        let user = $('#user').val();
        let pass = $('#pass').val();
        console.log(user + " " + pass)
        e.preventDefault();
    })
})