<?php
	require_once __DIR__.'\database.class.php';
	$db = new Database();
	if(isset($_POST['content']))
	{
		$db->insert_task($_POST['content']);
		$pdo = $db->get_pdo();
		print $pdo->lastInsertId(); 
	}
?>

