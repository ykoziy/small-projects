$("#add").click(function() {
	var text = $("#task-text").val();
	if(text.trim()) {
		$(".alert").hide();
		$.ajax({ 
			type: "POST", 
			url: "insertItem.php", 
			data: "content=" + text, 
			success: function(response) {
				$("#task-text").val('');
				$(".task-content").find("ul").append(createListItem(text, response));		
			}
		});
	} else {
		$(".alert").show();
	}
});

$("ul").delegate(".remove", "click", function() {
	var $this = $(this);
	var id = $(this).parent().parent().attr("id");
	id = id.substr(id.lastIndexOf('-') + 1);
	var entry = $(this).parent().parent().parent();

	$.ajax({
		type: "POST",
		url: "removeItem.php",
		data: "id=" + id,
		success: function(response) {
			entry.fadeTo(800, 0.01, function(){
				$(this).slideUp("slow", function() {
					$(this).remove();
				});
			});
		}
	});
});

$("ul").delegate(".edit", "click", function() {
	var $this = $(this);
	var id = $this.parent().parent().attr("id");
	var oldText = $this.parent().parent().find(".entry-text").text();
	id = id.substr(id.lastIndexOf("-") + 1);
	$this.parent().parent().find(".entry-text").empty().append('<textarea class="new-content" cols="40">' + oldText + "</textarea>");
	$(".new-content").focus();
	$(".new-content").blur(function() {
		var newText = $(this).val();
		if(newText != oldText) {
			$.ajax({ 
				type: "POST", 
				url: "updateItem.php", 
				data: "id=" + id + "&content=" + newText, 
				success: function(response) {
					$this.parent().parent().find(".entry-text").empty().append(newText);
				} 
			});
		} else {
			$this.parent().parent().find(".entry-text").empty().append(oldText);
		}
	});

});

function createListItem(text, id) {
	html = "<li class='list-group-item list-group-item-success clearfix'> \
		<div class='task-text' id=task-" + id +"> \
			<span class='entry-text'>" + escapeHtml(text) +"</span> \
			<span class='btn-group pull-right'> \
			<button type='button' class='btn btn-xs btn-default edit'>\
				<span class='glyphicon glyphicon-edit'></span> \
			</button>\
			<button type='button' class='btn btn-xs btn-default remove'>\
				<span class='glyphicon glyphicon-remove'></span> \
			</button> \
		</span> \
		</div> \
	</li>";
	return html;
}

function escapeHtml(text) {
	return text
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;")
	.replace(/"/g, "&quot;")
	.replace(/'/g, "&#039;");
}