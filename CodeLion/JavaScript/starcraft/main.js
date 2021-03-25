// $(선택자).행위;
// $('#click').click(hello);
// click이란 id를 가진 요소를 클릭할 경우 함수 hello를 실행 
// hello는 괄호 없이 함수 명만 전달

var hp = 3;

$('#drone').click(function(){
    if(hp > 0){
        $('#spit').fadeIn();
        $('#spit').animate({ left: '+=250' });
        $('#spit').fadeOut(function(){
        hp = hp - 1;
        $('#hp').text('HP : ' + hp);

        if(hp == 0){
            $('#bunker').fadeOut();
        }
        });
        $('#spit').css('left', 150);
        //$('#spit').css({left: '150px'}); 
    } 
});