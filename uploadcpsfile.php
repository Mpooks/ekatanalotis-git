<?php

    include 'jsontodbcategories.php';
    $currentDir = getcwd();
    $uploadDirectory = "./";

    $errors = 0; 

    $fileExtensions = ['json']; 

    $fileName = $_FILES['cpsfile']['name'];
    $fileTmpName  = $_FILES['cpsfile']['tmp_name'];
    $fileType = $_FILES['cpsfile']['type'];
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
            if (array_key_exists('products', $data)||array_key_exists('categories', $data)) {
                addCat($uploadPath);
                if ($didUpload) { 
                                  
                    $arr[] = 0;
                    } else {
                    $arr[] = 1;
                    }
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