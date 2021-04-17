$('#userForm').on('submit', function () {
	var formData = $(this).serialize();
	// console.log(formData);
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			location.reload();
		},
		error: function () {
			alert('用户添加失败');
		}
	})
	return false;
});

// $('#avatar').on('change', function() {
// 	var formData = new FormData();
// 	formData.append('avatar', this.files[0]);
// 	$.ajax({
// 		type: 'post',
// 		url: '/upload',
// 		data: formData,
// 		processData: false,
// 		contentType: false,
// 		success: function(response) {
// 			// console.log(response)
// 			$('#preview').attr('src', response[0].avatar);
// 			$('#avatarData').val(response[0].avatar)
// 		}
// 	})
// });

$('#modifyBox').on('change', '#avatar', function() {
	// console.log(this.files[0])
	var formData = new FormData();
	formData.append('avatar', this.files[0]);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function(response) {
			// console.log(response)
			$('#preview').attr('src', response[0].avatar);
			$('#avatarData').val(response[0].avatar)
		}
	})
})

$.ajax({
	type: 'get',
	url: '/users',
	success: function(response) {
		// console.log(response)
		var html = template('userTpl', {
			data: response
		});
		// console.log(html)
		$('#userListBox').html(html)
	}
});

$('#userListBox').on('click', '.edit', function() {
	var id = $(this).attr('data-id');
	// alert(id)
	$.ajax({
		type: 'get',
		url: '/users/' + id,
		success: function(response) {
			// console.log(response)
			var html = template('modifyTpl', response);
			// console.log(html)
			$('#modifyBox').html(html)
		}
	})
});

$('#modifyBox').on('submit', '#modifyForm', function() {
	var formData = $(this).serialize();
	var id = $(this).attr('data-id');
	// console.log(formData);
	$.ajax({
		type: 'put',
		url: '/users/' + id,
		data: formData,
		success: function(response) {
			location.reload();
			// console.log(response)
		}
	})
	return false;
});

$('#userListBox').on('click', '.delete', function() {
	if(confirm('您真的要删除这条数据吗？')) {
		var id = $(this).attr('data-id');
		$.ajax({
			type: 'delete',
			url: '/users/' + id,
			success: function() {
				location.reload();
			}
		})
	}
});

var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany');
selectAll.on('change', function() {
	var status = $(this).prop('checked');
	if (status) {
		deleteMany.show()
	}else{
		deleteMany.hide()
	};
	$('#userListBox').find('input').prop('checked', status);
});

$('#userListBox').on('change', '.inputStatus', function() {
	var inputs = $('#userListBox').find('input');
	if(inputs.length == inputs.filter(':checked').length) {
		selectAll.prop('checked', true);
	}else{
		selectAll.prop('checked', false);
	}

	if (inputs.filter(':checked').length > 0) {
		deleteMany.show()
	}else{
		deleteMany.hide()
	};
});

deleteMany.on('click', function() {
	var ids = [];
	var deleteUser = $('#userListBox').find('input').filter(':checked');
	deleteUser.each(function(index, element) {
		ids.push($(element).attr('data-id'));
	});
	if (confirm('您确定要进行批量删除操作吗？')) {
		$.ajax({
			type: 'delete',
			url: '/users/' + ids.join('-'),
			success: function() {
				location.reload();
			}
		});
	}
});