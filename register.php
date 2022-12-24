<?php
session_start();
include('dbconn.php');

if (isset($_POST['user']) && isset($_POST['pass']) && isset($_POST['email']) && isset($_POST['cpass'])) {
    $con = openDB();
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $cpassword = $_POST['cpass'];
    $email = $_POST['email'];

    $username = stripcslashes($username);
    $email = stripcslashes($email);
    $password = stripcslashes($password);
    $cpassword = stripcslashes($cpassword);
    $username = mysqli_real_escape_string($con, $username);
    $email = mysqli_real_escape_string($con, $email);
    $password = mysqli_real_escape_string($con, $password);
    $cpassword = mysqli_real_escape_string($con, $cpassword);
    $email = strtolower($email);


    $arr = array();
    
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $checkemail = mysqli_query($con, "select * from users where email = '$email'");
    $counte = mysqli_num_rows($checkemail);
    if ($counte == 0) {
        $checkusername = mysqli_query($con, "select * from users where username = '$username'");
         $countu = mysqli_num_rows($checkusername);
        if ($countu == 0) {
            if(strcmp($password,$cpassword)==0){
                if (ctype_space($password)) {
                   $arr[] = 5;
                }
                else {
                if(!preg_match_all('$\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])(?=\S*[\W])\S*$', $password)){
                            $arr[] = 6;
                }
                else{
                    $createuser=mysqli_query($con,"INSERT INTO users VALUES(NULL,'$email','$username','$password',DATE(NOW()),0,0,0,0,'NO')");
                    $usernow = mysqli_query($con, "select * from users where  username = '$username'");
                    while ($u = mysqli_fetch_assoc($usernow)) {
                        $_SESSION['id'] = $u["id"];
                    }
                    $arr[] = 0;
                }
                } 
            }else{
                    $arr[] = 7;
            }
        }else{
            $arr[] = 1;
        }
    }
    else{
        $checkusername = mysqli_query($con, "select * from users where username = '$username'");
                $countu = mysqli_num_rows($checkusername);
        if ($countu == 0) {
            $arr[] = 2;
        }
        else{
            $arr[] = 3;
        }
    }
    } else {
        $arr[] = 4;
    }

    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    closeDB($con);

}

?>