<?php
  include '../connect.php';
  $sql = "SELECT * FROM info ;";
  $result = mysqli_query($connect,$sql);
  $json_array = array();
  while($row = mysqli_fetch_assoc($result))
  {
    $json_array[] = $row;
  }
  echo json_encode($json_array);
  exit();
?>
