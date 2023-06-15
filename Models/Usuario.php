<?php
include_once 'Conexion.php';
class Usuario
{
    var $objetos;
    private $acceso;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    function loguearse($user, $pass)
    {
        $sql = "SELECT * FROM usuario
                WHERE user=:user and pass=:pass";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':user' => $user, ':pass' => $pass));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
    function verificar_usuario($user)
    {
        $sql = "SELECT * FROM usuario
                WHERE user=:user";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':user' => $user));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
    function registrar_usuario($username, $pass, $nombres, $apellidos, $dni, $email, $telefono)
    {
        $sql = "INSERT usuario(user,pass,nombres,apellidos,dni,email,telefono,id_tipo) VALUES (:user,:pass,:nombres,:apellidos,:dni,:email,:telefono,:id_tipo)";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':user' => $username,':pass' => $pass,':nombres' => $nombres,':apellidos' => $apellidos,':dni' => $dni,':email' => $email,':telefono' => $telefono,':id_tipo' => 2));
    }
    function obtener_datos($user)
    {
        $sql = "SELECT * FROM usuario
                JOIN tipo_usuario ON usuario.id_tipo = tipo_usuario.id
                WHERE usuario.id=:user";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':user' => $user));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
    function editar_datos($id_usuario, $nombres, $apellidos, $dni, $email, $telefono)
    {
        $sql = "UPDATE usuario SET nombres=:nombres,
                                    apellidos=:apellidos,
                                    dni=:dni,
                                    email=:email,
                                    telefono=:telefono
                WHERE id=:id_usuario";
        $query = $this->acceso->prepare($sql);
        $variables = array(
            ':id_usuario'=>$id_usuario,
            ':nombres'=>$nombres,
            ':apellidos'=>$apellidos,
            ':dni'=>$dni,
            ':email'=>$email,
            ':telefono'=>$telefono
        );
        $query->execute($variables);
    }
}
