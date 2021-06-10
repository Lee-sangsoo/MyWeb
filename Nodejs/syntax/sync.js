var fs = require('fs');

/*
//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

// readFile (asynchronous)
// 비동기의 경우 동기와 달리 함수에 저장이 불가능하다.
// callback 함수를 실행시켜야 한다.
// 경로의 파일을 읽는게 끝나면 callback 함수를 실행한다.
// err = 파일을 읽어오는것에 실패했다면
// result = 파일의 내용을 저장하고 있는 변수
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', (err, result)=>{
    if(err) throw err;
    console.log(result);
});
console.log('C');