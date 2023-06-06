<?php
include_once 'Conexion.php';
class Provincia
{
    var $objetos;
    private $acceso;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    function llenar_provincias($id_departamento)
    {
        $sql = "SELECT * FROM provincia
        WHERE id_departamento=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array('id'=>$id_departamento));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
}
