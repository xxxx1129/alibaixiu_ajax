$.ajax({
	type: 'get',
	url: '/comments',
	success: function(response) {
		console.log(response);
		var html = template('commentsTpl', response);
		// console.log(html);
		$('#commentsBox').html(html);
		var pageHtml = template('pageTpl', response);
		$('#pageBox').html(pageHtml);
	}
});

function changePage(page) {
	$.ajax({
		type: 'get',
		url: '/comments',
		data: {
			page: page
		},
		success: function(response) {
			// console.log(response);
			var html = template('commentsTpl', response);
			// console.log(html);
			$('#commentsBox').html(html);
			var pageHtml = template('pageTpl', response);
			$('#pageBox').html(pageHtml);
		}
	});	
}

$('#commentsBox').on('click', '.status', function() {
	var status = $(this).attr('data-status');
	var id = $(this).attr('data-id');
	$.ajax({
		type: 'put',
		url: '/comments/' + id,
		data: {
			state: status == 0 ? 1 : 0
		},
		success: function() {
			location.reload();
		}
	})
});

$('#commentsBox').on('click', '.delete', function() {
	if (confirm('您真的要执行删除操作吗？')) {
		var id = $(this).attr('data-id');
		$.ajax({
			type: 'delete',
			url: '/comments/' + id,
			success: function() {
				location.reload();
			}
		})
	}
});
