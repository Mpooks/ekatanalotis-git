<?php      
    session_start();
    include('dbconn.php');

if (isset($_POST['email']) && isset($_POST['user']) && isset($_POST['pass']) && isset($_POST['rpass'])) {
    $con = openDB();
    $email = $_POST['email'];
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $rpassword = $_POST['rpass'];
    
    $email = stripcslashes($email);
    $username = stripcslashes($username);
    $email = mysqli_real_escape_string($con, $email);
    $username = mysqli_real_escape_string($con, $username);
    $password = stripcslashes($password);
    $rpassword = stripcslashes($rpassword);
    $password = mysqli_real_escape_string($con, $password);
    $rpassword = mysqli_real_escape_string($con, $rpassword);

    $users = mysqli_query($con, "select * from users where  username = '$username'");
    $count = mysqli_num_rows($users);
    $arr = array();

    if (mysqli_num_rows($users) > 0) {
        while ($u = mysqli_fetch_assoc($users)) {
            if(strcmp($u['email'], $email)===0){
                if(strcmp($u['passw'],$password)===0){
                    $arr[] = 0;
                }
                else{
                    if(strcmp($password,$rpassword)==0){
                        if (ctype_space($password)) {
                           $arr[] = 1;
                        }
                        else {
                        if(!preg_match_all('$\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])(?=\S*[\W])\S*$', $password)){
                                    $arr[] = 2;
                        }
                        else{
                            $updateuser=mysqli_query($con,"UPDATE users SET passw='$password' WHERE username='$username'");
                            $arr[] = 3;
                        }
                        } 
                    }else{
                            $arr[] = 4;
                    }
                }
            }
            else{
                $arr[] = 5;
            }
        }
    }
    else{
        $arr[] = 6;
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    closeDB($con);
}
?>  