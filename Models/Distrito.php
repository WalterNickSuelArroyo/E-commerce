<?php
include_once 'Conexion.php';
class Distrito
{
    var $objetos;
    private $acceso;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    function llenar_distritos($id_provincia)
    {
        $sql = "SELECT * FROM distrito
            WHERE id_provincia=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array('id'=>$id_provincia));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
}
