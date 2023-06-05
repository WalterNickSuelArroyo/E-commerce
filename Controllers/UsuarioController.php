<?php
include_once '../Models/Usuario.php';
$usuario = new Usuario();
session_start();
if ($_POST['funcion'] == 'login') {
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $usuario->loguearse($user, $pass);
    if ($usuario->objetos != null) {
        foreach ($usuario->objetos as $objeto) {
            $_SESSION['id'] = $objeto->id;
            $_SESSION['user'] = $objeto->user;
            $_SESSION['tipo_usuario'] = $objeto->id_tipo;
            $_SESSION['avatar'] = $objeto->avatar;
        }
        echo 'logueado';
    }
}
if ($_POST['funcion'] == 'verificar_sesion') {
    if (!empty($_SESSION['id'])) {
        $json[] = array(
            'id' => $_SESSION['id'],
            'user' => $_SESSION['user'],
            'tipo_usuario' => $_SESSION['tipo_usuario'],
            'avatar' => $_SESSION['avatar']
        );
        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    } else {
        echo '';
    }
}
if ($_POST['funcion'] == 'verificar_usuario') {
    $username = $_POST['value'];
    $usuario->verificar_usuario($username);
    if ($usuario->objetos != null) {
        echo 'success';
    }
}
if ($_POST['funcion'] == 'registrar_usuario') {
    $username = $_POST['username'];
    $pass = $_POST['pass'];
    $nombres = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $dni = $_POST['dni'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $usuario->registrar_usuario($username, $pass, $nombres, $apellidos, $dni, $email, $telefono);
    echo 'success';
}
if ($_POST['funcion'] == 'obtener_datos') {
    $usuario->obtener_datos($_SESSION['id']);
    foreach ($usuario->objetos as $objeto) {
        $json[] = array(
            'username' => $objeto->user,
            'nombres' => $objeto->nombres,
            'apellidos' => $objeto->apellidos,
            'dni' => $objeto->dni,
            'email' => $objeto->email,
            'telefono' => $objeto->telefono,
            'avatar' => $objeto->avatar,
            'tipo_usuario' => $objeto->tipo,
        );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
}
