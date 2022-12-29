<?php
    include 'jsontodbimages.php';
    $currentDir = getcwd();
    $uploadDirectory = "./";

    $errors = 0; 

    $fileExtensions = ['json']; 

    $fileName = $_FILES['ifile']['name'];
    $fileTmpName  = $_FILES['ifile']['tmp_name'];
    $fileType = $_FILES['ifile']['type'];
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);

    $uploadPath = $currentDir . $uploadDirectory . basename($fileName); 

$arr = array();

    if (isset($fileName)) {

        if (! in_array($fileExtension,$fileExtensions)) {
            $errors = 1;
        }
        if ($errors==0) {
            $didUpload = move_uploaded_file($fileTmpName, $uploadPath);
            $jsondata = file_get_contents($uploadPath);
            if (!empty($jsondata)) {
                if(is_array(json_decode($jsondata, true))){
            $data = json_decode($jsondata, true);
            if (array_key_exists('images', $data)) {
                $con = openDB();
                $pr = mysqli_query($con, "SELECT * FROM product");
                    if (mysqli_num_rows($pr) > 0) {
                        addImage($uploadPath);
                        if ($didUpload) {

                            $arr[] = 0;
                        } else {
                            $arr[] = 1;
                        }
                    }
                    else{
                        unlink($uploadPath);
                      $arr[] = 5;
                    }
                    closeDB($con);
            }else{
            unlink($uploadPath);
            $arr[] = 2;
            }
        } else {
            unlink($uploadPath);
            $arr[] = 3;
        }
        }else{
            unlink($uploadPath);
            $arr[] = 4;
        }
        }  
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
    
?>