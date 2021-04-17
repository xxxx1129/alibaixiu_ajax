$('#logout').on('click', function () {
  var isLogout = confirm('您真的要退出登录吗？');
  if (isLogout) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function() {
        location.href = 'login.html';
      },
      error: function() {
        alert('退出失败')
      }
    })
    // location.href = 'login.html'
  }
});

function formateDate(date) {
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function(response) {
    // console.log(response);
    $('.avatar').attr('src', response.avatar);
    $('.profile .name').html(response.nickName);
  }
})