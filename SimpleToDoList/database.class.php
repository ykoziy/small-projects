<?php
class Database
{
	private $db_host = 'localhost';
	private $db_name = 'yk_todo';
	private $db_username = 'root';
	private $db_password =  'bob123';
	
	private $pdo = NULL;
	function __construct() {
		try {
			$this->pdo = new \PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name, 
							$this->db_username, 
							$this->db_password);

			$this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		} catch(Exception $e) {
			exit('Problem connecting to the database.');
		}		
	}

	function query($query, $bindings) {
		$stmt = $this->pdo->prepare($query);
		$stmt->execute($bindings);
		return ($stmt->rowCount() > 0) ? $stmt : false;
	}

	function get_pdo() {
		return $this->pdo;
	}

	function get_data($tableName) {
		try {
			$result = $this->pdo->query("SELECT * FROM $tableName ORDER BY task_id");
			return ($result->rowCount() > 0 ) ? $result : false;
		} catch (Exception $e) {
			return false;
		}
	}

	function edit_by_id($id, $content) {
		$text = htmlspecialchars($content);
		$trim = trim($text);
		$query = $this->query('UPDATE tasks SET content = :content WHERE task_id = :id',
						array(
							'content' => $trim,
							'id' => $id)
						);
	}

	function remove_by_id($id) {
		$query = $this->query('DELETE FROM tasks WHERE task_id = :id',
						array('id' => $id),
						$this->pdo
						);
	}

	function insert_task($content) {
		$text = htmlspecialchars($content);
		$trim = trim($text);
		$query = $this->query('INSERT INTO tasks (task_id, content, last_update) VALUES (NULL, :content, NULL)',
						array('content' => $trim)
						);
	}

}

?>