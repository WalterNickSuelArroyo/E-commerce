<?php
include_once 'Conexion.php';
class UsuarioDistrito
{
    var $objetos;
    private $acceso;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    function llenar_distritos($id_usuario,$id_distrito,$direccion,$referencia)
    {
        $sql = "INSERT usuario_distrito(direccion,referencia,id_distrito,id_usuario) VALUES (:direccion,:referencia,:id_distrito,:id_usuario)";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':direccion' => $direccion,':referencia' => $referencia,':id_distrito' => $id_distrito,':id_usuario' => $id_usuario));
    }
}
