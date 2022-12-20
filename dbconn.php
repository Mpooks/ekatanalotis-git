<?php
function openDB()
 {
 $dbhost = "localhost";
 $dbuser = "root";
 $dbpass = "12345";
 $con =mysqli_connect($dbhost, $dbuser, $dbpass,"ekatanalotis") or die("Connect failed: %s\n". $con -> error);
 
 return $con;
 }
 
function closeDB($db)
 {
 $db -> close();
 }
   
?>