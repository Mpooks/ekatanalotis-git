<?php      
    session_start();
    include('dbconn.php');

if (isset($_POST['shop'])) {
    $con = openDB();
    $s = $_POST['shop'];
    $arr = array();
    $par = array();

    $ex= mysqli_query($con, "SELECT * from shop where sname='$s'");
    if (mysqli_num_rows($ex) > 0) {
        $is = mysqli_query($con, "SELECT count(offer_id),shopid,sname,latitude,longitude,shopid,0 as color from offer inner join shop on offer.sid=shop.shopid where shop.sname='$s' AND offer.active_offer='ACTIVE' GROUP BY offer.sid;");
        if (mysqli_num_rows($is) > 0) {

            while ($i = mysqli_fetch_assoc($is)) {
                $arr[] = $i;
                $par[] = $i['shopid'];         
            }
            foreach($par as $op)
            {
                $sh = mysqli_query($con, "SELECT shopid,sname,latitude,longitude,1 as color FROM shop WHERE sname='$s' and shopid!=$op");
                $count = mysqli_num_rows($sh);
        
                if ($count > 0) {
        
                    while ($s = mysqli_fetch_assoc($sh)) {
                        $arr[] = $s;
                    }
                }
            }

        }
        else{
            $sh = mysqli_query($con, "SELECT sname,latitude,longitude,1 as color FROM shop WHERE sname='$s'");
                $count = mysqli_num_rows($sh);
        
                if ($count > 0) {
        
                    while ($s = mysqli_fetch_assoc($sh)) {
                        $arr[] = $s;
                    }
                }
        }
        
    }

    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    closeDB($con);
}
?>  