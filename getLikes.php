<?php
    
    $host='localhost'; 
    $database='mobidev'; 
    $user='root'; 
    $pswd='';
    
    $dbh = mysql_connect($host, $user, $pswd) or die("Can't connect MySQL.");
    mysql_select_db($database) or die("Can't connet database.");
    
    if (isset($_GET['like']))
    {
        $st = ($_GET['like']=="Like")?1:0;
        $query = "SELECT * FROM `likes` WHERE `user_id` ='".$_GET['id']."'";
        $res = mysql_query($query);
        if ( mysql_fetch_array($res))
        {
            $query = "UPDATE `mobidev`.`likes` SET `status` = '".$st."' WHERE `likes`.`user_id` ='".$_GET['id']."'";
            $res = mysql_query($query);
            $res=array('status'=>$st);
        }
        else
        {
            $query="INSERT INTO `mobidev`.`likes` (`id` , `type` `user_id` , `status` ) VALUES (NULL , '".$_GET['type']."' ,'".$d."', '0')";
            $res = mysql_query($query);
            $res=array('status'=>0);
        }
        die(json_encode($res));
    }
    
    if (isset($_GET['get']))
    {
        $query = "SELECT `status` FROM `likes` WHERE `user_id` ='".$_GET['id']."'";
        $res = mysql_query($query);
       $row=mysql_fetch_array($res);
        if ($row)
        {
            die(json_encode(array('status'=>$row['status'])));
        }
        else
        {
            $s="INSERT INTO `mobidev`.`likes` (`id` , `type` `user_id` , `status` ) VALUES (NULL , 'User' ,'".$d."', '0')";
             die(json_encode(array('status'=>0)));
        }
    }
    
    
    $db_users = array();
    $users = array();
    $us = $_GET['users'];
    foreach ($us as $u)
    {
        $users[$u]=$u;
    }
    
    $query = "SELECT `user_id`,`status` FROM `likes` WHERE `type`= '".$_GET['type']."'";
    $res = mysql_query($query);
    while($row = mysql_fetch_array($res))
    {
        $db_users[$row['user_id']] = (int)$row['status'];
    }
    
    $difference = array_diff_key($users,$db_users); 
    $s='INSERT INTO `mobidev`.`likes` (`id` , `user_id` , `status` ) VALUES ';
    foreach ($difference as $d)
    {
        $s=$s."(NULL , '".$_GET['type']."', '".$d."', '0' ),";
    }
    $s2 = substr($s, 0, strlen($s)-1);
    
    
    $res = mysql_query($s2);
    
    $query = "SELECT `user_id`,`status` FROM `likes` WHERE `type`= '".$_GET['type']."'";
    $res3 = mysql_query($query);
    $result = array();
    while($row = mysql_fetch_array($res3))
    {
        $result[] = array('id'=>$row['user_id'], 'status'=>(int)$row['status']);
    }
    
    mysql_close($dbh);
die(json_encode($result));