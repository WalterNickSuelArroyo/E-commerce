<?php
include_once '../Models/Historial.php';
$historial = new Historial();
session_start();
if ($_POST['funcion'] == 'llenar_historial') {
    $id_usuario = $_SESSION['id'];
    $historial->llenar_historial($id_usuario);
    var_dump($historial);
}