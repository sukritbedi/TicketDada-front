<?php
  include '../connect.php';
  $data = json_decode(file_get_contents("php://input"));
  if(count($data) > 0){
    $movie  = mysqli_real_escape_string($connect, $data->mov_id);
  }

  $sql = "SELECT * FROM movies WHERE mov_id=$movie";

  $result = mysqli_query($connect,$sql);
  $json_array = array();
  while($row = mysqli_fetch_assoc($result))
  {
    $json_array[] = $row;
  }
  echo json_encode($json_array);
?>
