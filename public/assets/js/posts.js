$.ajax({
	type: 'get',
	url: '/posts',
	success: function(response) {
		// console.log(response);
		var html = template('articleTpl', response);
		$('#articleBox').html(html);
		var pageHtml = template('pageTpl', response);
		$('#pageBox').html(pageHtml);
	}
});

function changePage(page) {
	$.ajax({
		type: 'get',
		url: '/posts',
		data: {
			page: page
		},
		success: function(response) {
			// console.log(response);
			var html = template('articleTpl', response);
			$('#articleBox').html(html);
			var pageHtml = template('pageTpl', response);
			$('#pageBox').html(pageHtml);
		}
	});
}

$.ajax({
	type: 'get',
	url: '/categories',
	success: function(response) {
		// console.log(response)
		var html = template('categoryTpl', {
			data: response
		});
		$('#categoryBox').html(html)
	}
});

$('#selectList').on('submit', function() {
	var formData = $(this).serialize();
	$.ajax({
		type: 'get',
		url: '/posts',
		data: formData,
		success: function(response) {
			// console.log(response);
			var html = template('articleTpl', response);
			$('#articleBox').html(html);
			var pageHtml = template('pageTpl', response);
			$('#pageBox').html(pageHtml);
		}
	});
	return false;
});

$('#articleBox').on('click', '.delete', function() {
	if (confirm('您真的要删除这篇文章吗？')) {
		var id = $(this).attr('data-id');
		$.ajax({
			type: 'delete',
			url: '/posts/' + id,
			success: function() {
				location.reload();
			}
		});
	}
});

