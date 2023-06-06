<?php
include_once '../Models/UsuarioDistrito.php';
$usuario_distrito = new UsuarioDistrito();
session_start();
if ($_POST['funcion'] == 'crear_direccion') {
    $id_usuario=$_SESSION['id'];
    $id_distrito=$_POST['id_distrito'];
    $direccion=$_POST['direccion'];
    $referencia=$_POST['referencia'];
    $usuario_distrito->llenar_distritos($id_usuario,$id_distrito,$direccion,$referencia);
    echo 'success';
}
