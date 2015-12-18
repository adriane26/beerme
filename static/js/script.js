 /////brewmaster's choice logic ///// i don't need this

 // $('#choice').click(function(event) {
 //  event.preventDefault();

 //  var url = '/../beers/random';    /// '/show/random'

 //  // Option 1 - window.location
 //  window.location = url;
 //  });

//  $(document).ready(function() {
//   $('.delete-btn').click(function(e) {
//     e.preventDefault();
//     var url = $(this).attr('href');
//     var well = $(this).parent();
//     $.ajax({
//       url: url,
//       method: 'DELETE'
//     }).done(function(data) {
//       console.log(data);
//       if (data.msg === 'success') {
//         well.fadeOut(2000, function() {
//           well.remove();
//         });
//       }
//     })
//   });
// });