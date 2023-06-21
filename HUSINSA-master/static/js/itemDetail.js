function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function likeItem(id){
    var csrftoken = getCookie('csrftoken');
    var heartImage = document.getElementById("heartImage" + id);

    if (heartImage.src.includes("heart.png")) {
        heartImage.src = "/static/img/heart_filled.png"; // 이미 눌렀던 상태에서 다시 누를 경우 빈 하트로 변경
    }

    $.ajax({
        url: '/item/clothe/like/',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        data:JSON.stringify({
            'id' : id
        })
    })
}

function buyItem(id){
    var number = document.getElementById('num');
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/item/order/create/',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        data:JSON.stringify({
            "id" : id,
        }),
        success: function(){
            alert('성공');
            window.location = '/';
        }, error: function(){
            alert('구매 실패');
        }
    })
}

function pushCart(id) {
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/item/cart/create/',
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        },
        data: JSON.stringify({
            "id": id,
        }),
        success: function () {
            alert('성공');

            window.location = '/';
        }, error: function () {
            alert('장바구니 넣기 실패');
        }
    })
}