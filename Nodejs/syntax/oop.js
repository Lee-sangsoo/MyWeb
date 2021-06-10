// OOP (Object Oriented Programming)
// 객체 지향 프로그래밍

// 자바스크립트에서 함수는 '값'(데이터) 이기도 하다.
// 함수는 데이터로서 변수에 담길 수 있다.
var f = function(){
    console.log(1+1);
    console.log(1+2);
}
// 데이터이기에 배열에 또한 담길 수 있다.
var a = [f];
// 배열로 호출
a[0]();

// 객체에도 또한 담길 수 있다.
var o = {
    func: f
}
// 객체 함수의 호출
o.func();