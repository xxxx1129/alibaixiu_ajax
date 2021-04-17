$.ajax({
	type: 'get',
	url: '/categories',
	success: function(response) {
		// console.log(response)
		var html = template('categoryTpl', {
			data: response
		});
		$('#category').html(html);
	}
});

$('#feature').on('change', function () {
	var file = this.files[0];
	var formData = new FormData();
	formData.append('cover', file);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function(response) {
			// console.log(response)
			$('#thumbnail').val(response[0].cover)
		}
	});
});

// $('#modifyForm').on('submit', '#addArticleForm', function() {
// 	var formData = $(this).serialize();
// 	// console.log(formData);
// 	$.ajax({
// 		type: 'post',
// 		url: '/posts',
// 		data: formData,
// 		success: function() {
// 			location.href = '/admin/posts.html';
// 			// console.log(ok)
// 		}
// 	})
// 	return false;
// })

$('#addArticleForm').on('submit', function() {
	var formData = $(this).serialize();
	// console.log(formData);
	$.ajax({
		type: 'post',
		url: '/posts',
		data: formData,
		success: function() {
			location.href = '/admin/posts.html';
		}
	})
	return false;
});

// console.log(getUrlParams('id'))
var id = getUrlParams('id');

if (id != -1) {
	$.ajax({
		type: 'get',
		url: '/posts/' + id,
		success: function(response) {
			// console.log(response);
			$.ajax({
				type: 'get',
				url: '/categories',
				success: function(categories) {
					response.categories = categories
					// console.log(response)
					var html = template('modifyFormTpl', response);
					// console.log(html)
					$('#modifyForm').html(html)
				}
			});		
		}
	})
}

function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split('&');
	// console.log(paramsAry);
	for(i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		// console.log(tmp)
		if (tmp[0] == name) {
			return tmp[1]
		}
	}
	return -1
}

$('#modifyForm').on('submit', '#modifyArticleForm', function() {
	var formData = $(this).serialize();
	var id = $(this).attr('data-id');
	$.ajax({
		type: 'put',
		url: '/posts/' + id,
		data: formData,
		success: function() {
			// console.log('ok')
			location.href = '/admin/posts.html';
		}
	})
	return false;
});