var now = new Date();
var start = new Date("1992-02-23");

var timeDiff = now.getTime() - start.getTime();
var day = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1); // ms * s * m * d
$('#love').text(day + '일째');


var marry = new Date("2022-02-23");
var timeDiff2 = marry.getTime() - now.getTime();
var day2 = Math.floor(timeDiff2 / (1000 * 60 * 60 * 24) + 1);
$('#marry').text(day2 + '일 남음');


var ms = start.getTime() + 14999 * (1000 * 60 * 60 * 24);
var thousand = new Date(ms);
var thousandDate = thousand.getFullYear() + '.' + (thousand.getMonth() + 1) + '.' + thousand.getDate();
$('#thousand-date').text(thousandDate);

var diffDate3 = thousand - now.getTime();
var day3 = Math.floor(diffDate3 / (1000 * 60 * 60 * 24) + 1);
$('#thousand').text(day3 + '일 남음');

/*
// Date 객체 생성
var now = new Date();

// 연도를 가져오는 메서드 .getFullYear()
now.getFullYear();

// 월 정보를 가져오는 메서드 .getMonth() {0: 1월, 1: 2월, ... 10: 11월, 11: 12월}
now.getMonth();

// 일 정보를 가져오는 메서드 .getDate()
now.getDate();

// 1970년 1월 1일 00:00:00을 기준으로 흐른 시간을 밀리초로 표시하는 메서드 .getTime()
now.getTime();

// 특정 일의 Date 객체 생성
var christmas = new Date('2021-12-25');

// 특정 ms의 Date 객체 생성
// Date에 저장된 기준 시간에서 적어 준 ms(초) 만큼 흐른 시간을 저장
var ms = new Date(1000);
*/