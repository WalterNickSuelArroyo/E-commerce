<?php
include_once '../Models/Distrito.php';
$distrito = new Distrito();
session_start();
if ($_POST['funcion'] == 'llenar_distritos') {
    $id_provincia = $_POST['id_provincia'];
    $distrito->llenar_distritos($id_provincia);
    $json=array();
    foreach ($distrito->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id,
            'nombre' => $objeto->nombre,
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
