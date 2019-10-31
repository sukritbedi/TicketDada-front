<?php

  include '../connect.php';

  session_start();
  $custid = $_SESSION['user_id'];

  $data = json_decode(file_get_contents("php://input"));

  if(count($data) > 0){
    $movid  = mysqli_real_escape_string($connect, $data->movid);
    $movtime = mysqli_real_escape_string($connect, $data->time);
    $loc = mysqli_real_escape_string($connect, $data->loc);
    $timest = date('Y-m-d H:i:s');
  }

  $sql = "INSERT INTO transaction(mov_id,cinema,timest,cust_email,mov_time) VALUES ($movid,$loc,'$timest','$custid','$movtime')";
    
  $execution = mysqli_query($connect,$sql);
  echo($execution);
  if($execution){
    echo "Data Added";
  }
  else{
    echo "Data not Added";
  }

?>
