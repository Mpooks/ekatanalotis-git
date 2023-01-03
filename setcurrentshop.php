<?php      
    session_start();
    include('dbconn.php');

    $con = openDB();
    $shop = $_POST['sh'];

    $shops = mysqli_query($con, "select * from shop where shopid=$shop");
    $count = mysqli_num_rows($shops);

    if ($count >0) {

        while ($s = mysqli_fetch_assoc($shops)) {
            $_SESSION['sid'] = $s["shopid"];
        }
    }
    closeDB($con);

?>  