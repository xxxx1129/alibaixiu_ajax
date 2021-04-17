$('#logo').on('change', function() {
	var file = this.files[0];
	var formData = new FormData();
	formData.append('logo', file);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function(response) {
			// console.log(response);
			$('#hiddenLogo').val(response[0].logo);
			// 将图片展示在页面中
			$('#settingsImg').attr('src', response[0].logo);
		}
	})
});

$('#settingsForm').on('submit', function() {
	var formData = $(this).serialize();
	$.ajax({
		type: 'post',
		url: '/settings',
		data: formData,
		success: function() {
			location.reload()
		}
	})
	return false;
});

$.ajax({
	type: 'get',
	url: '/settings',
	success: function(response) {
		// console.log(response)
		if (response) {
			$('#hiddenLogo').val(response.logo);
			$('#settingsImg').attr('src', response.logo);
			$('input[name="title"]').val(response.title);
			$('input[name="comment"]').prop('checked', response.comment);
			$('input[name="review"]').prop('checked', response.review);
		}
	}
});