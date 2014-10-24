<?php
	require_once __DIR__.'\database.class.php';
	$db = new Database();
	if(isset($_POST['id']) && isset($_POST['content']))
	{
		$db->edit_by_id($_POST['id'], $_POST['content']);
	}
?>

