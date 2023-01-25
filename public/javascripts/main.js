$(function() {
  // Close message on click of close button
  $('.message .close')
    .on('click', function () {
      $(this)
        .closest('.message')
        .transition('fade');
    });

  // Auto hide message after 2 seconds
  setTimeout(function() {
    $('#message').transition('fade');
  }, 2000);
});
