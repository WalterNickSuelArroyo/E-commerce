<?php
include_once 'Conexion.php';
class Usuario {
    var $objetos;
    private $acceso;
    public function __construct(){
        $db = new Conexion();
        $this->acceso=$db->pdo;
    }
    function loguearse($user,$pass){
        echo 'hola';
    }
}