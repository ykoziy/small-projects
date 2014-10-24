<?php
	require_once __DIR__.'\database.class.php';
	$db = new Database();
	if(isset($_POST['id']))
	{
		$db->remove_by_id($_POST['id']);
	}
?>

