function counter(){
    var content = document.getElementById('jasoseol').value;
    if(content.length > 200){
        content = content.substring(0, 200);
        document.getElementById('jasoseol').value = content;
    }
    document.getElementById('count').innerHTML = `(${content.length}/200)`;
}

counter();





//Document Object Model = DOM
// DOM의 역할 = HTML 코드 내용에 접근하고 변경, 추가가 가능하다.
// 태그에 클래스 추가나 속성 변화도 가능
// 화면을 구성하는 모든 요소에 접근 가능하다.

// onkeydown = 키가 눌릴때 진행되는 이벤트
// onkeyup = 키가 눌렀다 때질 때 진행되는 이벤트 (여기서는 up이 올바르다.)