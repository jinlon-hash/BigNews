$(function () {
  $('.regiHref').on('click', function () {
    $('.registerBox').show().prev().hide();
  });
  $('.loginHref').on('click', function () {
    $('.loginBox').show().next().hide();
  });
});
