<?php
include_once '../Models/UsuarioDistrito.php';
$usuario_distrito = new UsuarioDistrito();
session_start();
if ($_POST['funcion'] == 'crear_direccion') {
    $id_usuario=$_SESSION['id'];
    $id_distrito=$_POST['id_distrito'];
    $direccion=$_POST['direccion'];
    $referencia=$_POST['referencia'];
    $usuario_distrito->crear_direccion($id_usuario,$id_distrito,$direccion,$referencia);
    echo 'success';
}
if ($_POST['funcion'] == 'llenar_direcciones') {
    $id_usuario=$_SESSION['id'];
    $usuario_distrito->llenar_direcciones($id_usuario);
    $json=array();
    foreach ($usuario_distrito->objetos as $objeto) {
        $json[]=array(
            'id'=>$objeto->id,
            'direccion'=>$objeto->direccion,
            'referencia'=>$objeto->referencia,
            'departamento'=>$objeto->departamento,
            'provincia'=>$objeto->provincia,
            'distrito'=>$objeto->distrito,
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}
if ($_POST['funcion'] == 'eliminar_direccion') {
    $id_direccion=$_POST['id'];
    $usuario_distrito->eliminar_direccion($id_direccion);
    echo 'success';
}