<!DOCTYPE html>
<html lang="en-US">

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Simple To Do List</title>
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>

<body>

  <div class="container">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <div class="page-header text-center">
        <h1>Simple To Do List</h1>
      </div> <!-- .page-header .text-center-->
      <div class="panel panel-primary">
        <div class="panel-body">
          <form>
            <div class="form-group">
              <div class="input-group">
                <input type="text" class="form-control" id="task-text" placeholder="New task">
                <span class="input-group-btn">
                <button type="button" class="btn btn-primary" id="add">Add</button>
                </span>
              </div> <!-- .input-group -->
            </div> <!-- .form-group -->
            <div class="alert alert-danger" role="alert" id="error-box">New task can't be empty!</div>
          </form>
          <div class="task-content">
            <ul class="list-group list-items">
              <?php
              require_once __DIR__.'\database.class.php';
              $db = new Database();
              // Fetch tasks
              $tasks = $db->get_data('tasks');
              ?>
              <?php foreach ($tasks as $task) : ?>	<li class="list-group-item clearfix">
              <div class="task-text" id="task-<?= $task['task_id']; ?>">
                <span class="entry-text"><?= $task['content']; ?></span>
                <span class="btn-group pull-right">
                  <button type="button" class="btn btn-xs btn-default edit">
                    <span class="glyphicon glyphicon-edit"></span>
                  </button>
                  <button type="button" class="btn btn-xs btn-default remove">
                    <span class="glyphicon glyphicon-remove"></span>
                  </button>
                </span>
              </div>
              </li>
            <?php endforeach; ?></ul>
          </div> <!-- .task-content -->
        </div> <!-- .panel-body -->
      </div> <!-- .panel .panel-primary -->
    </div> <!-- .col-xs-12 .col-md-8 .col-md-offset-2 -->
  </div> <!-- .container -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="js/script.js"></script>
</body>

</html>
