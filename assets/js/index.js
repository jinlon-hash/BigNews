$(function () {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers:{
      'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgzNTUsInVzZXJuYW1lIjoiMTY2MjM4OTAyMiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjAzNzI1NjIzLCJleHAiOjE2MDM3NjE2MjN9.dwr9LT8qYDgZ01ZswXKOOjSFnvY-pSYTSCSF9o3DjJ0"
    },
    success: function (msg) {
      console.log(msg);
    },
  });
});
