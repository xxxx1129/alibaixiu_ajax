$.ajax({
	type: 'get',
	url: '/posts/count',
	success: function(response) {
		// console.log(response);
		$('#post').html('<strong>'+ response.postCount +'</strong>篇文章（<strong>'+ response.draftCount +'</strong>篇草稿）')
	}
});

$.ajax({
	type: 'get',
	url: '/categories/count',
	success: function(response) {
		// console.log(response);
		$('#category').html('<strong>'+ response.categoryCount +'</strong>个分类')
	}
});

$.ajax({
	type: 'get',
	url: '/comments/count',
	success: function(response) {
		// console.log(response);
		$('#comment').html('<strong>'+ response.commentCount +'</strong>条评论')
	}
});