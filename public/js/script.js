$(document).ready(function() {
  $('.delete-btn').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var well = $(this).parent();
    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function(data) {
      console.log(data);
      if (data.msg === 'success') {
        well.fadeOut(2000, function() {
          well.remove();
        });
      }
    })
  });
});