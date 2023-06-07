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
    function crear_direccion($id_usuario,$id_distrito,$direccion,$referencia)
    {
        $sql = "INSERT usuario_distrito(direccion,referencia,id_distrito,id_usuario) VALUES (:direccion,:referencia,:id_distrito,:id_usuario)";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':direccion' => $direccion,':referencia' => $referencia,':id_distrito' => $id_distrito,':id_usuario' => $id_usuario));
    }
    function llenar_direcciones($id_usuario)
    {
        $sql = "SELECT ud.id as id,direccion,referencia,d.nombre as distrito, p.nombre as provincia, dep.nombre as departamento FROM usuario_distrito ud
        JOIN distrito d ON d.id=ud.id_distrito
        JOIN provincia p ON p.id=d.id_provincia
        JOIN departamento dep ON dep.id=p.id_departamento
        WHERE id_usuario=:id and estado='A'";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id_usuario));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
    function eliminar_direccion($id_direccion)
    {
        $sql = "UPDATE usuario_distrito SET estado='I' WHERE id=:id_direccion";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id_direccion' => $id_direccion));
    }
}
