var postId = getUrlParams('id');
var review;

$.ajax({
	type: 'get',
	url: '/posts/' + postId,
	success: function(response) {
		// console.log(response)
		var html = template('articleDelTpl', response);
		$('#articleBox').html(html)
	}
});

$('#articleBox').on('click', '#like', function() {
	$.ajax({
		type: 'post',
		url: '/posts/fabulous/' + postId,
		success: function() {
			alert('点赞成功')
		}
	})
});

$.ajax({
	type: 'get',
	url: '/settings',
	success: function(response) {
		review = response.review;
		// console.log(response)
		if (response.comment) {
			var html = template('commentTpl');
			$('#commentListBox').html(html);
		}
	}
});

$('#commentListBox').on('submit', 'form', function() {
	var content = $(this).find('textarea').val();
	// alert(review);
	var state;
	if (review) {
		state = 0;
	}else {
		state = 1;
	}
	// alert(author)
	$.ajax({
		type: 'post',
		url: '/comments',
		data: {
			// author: postId,
			content: content,
			post: postId,
			state: state
		},
		success: function() {
			alert('评论成功');
			location.reload();
		},
		error: function() {
			alert('评论失败');
		}
	});
	return false;
});