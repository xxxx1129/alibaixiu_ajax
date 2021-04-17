var categoryId = getUrlParams('categoryId')

$.ajax({
	type: 'get',
	url: '/posts/category/' +categoryId,
	success: function(response) {
		// console.log(response)
		var html = template('categoryTpl', {
			data: response
		});
		$('#categoryBox').html(html)
	}
});

$.ajax({
	type: 'get',
	url: '/categories/' + categoryId,
	success: function(response) {
		// console.log(response)
		
		$('#categoryTitle').html(response.title)
	}
});