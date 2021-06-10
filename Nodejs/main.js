var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// require => 모듈을 불러오는 코드 
// require('url') == url이라는 모듈을 가져와서 내 코드에서 쓰겠다.

// template 객체 생성 후 'refactoring'
// refactoring = 처음의 프로토타입 코드에서 더 효율적이고 좋은 코드로 바꾸는 과정
var template = {
  html:(title, list, body, control) => {
    return ` 
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list:(filelist) =>{
    var list = '<ul>';
    for(var i = 0; i<filelist.length; i++){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`; 
    }
    list = list + '</ul>';
    return list;
  }
}

var app = http.createServer(function(request,response){
    var _url = request.url; // 요청받은 url을 _url에 저장
    var queryData = url.parse(_url, true).query; // url 모듈 안에 있는 'parse'와 'query'를 통해 요청받은 url을 분석하여 쿼리 스트링으로 만든다.
    var pathname = url.parse(_url, true).pathname;
    let title = queryData.id; // 쿼리 스트링의 id라는 이름을 가진 값을 title에 저장한다.

    if(pathname === '/'){
      if(title === undefined){ // undefined -> 존재하지 않는다
        fs.readdir('./data', (err, filelist) => {
          title = 'Welcome';
          var data = 'Hello, Node.js';
          var list = template.list(filelist);
          var html = template.html(title, list, `<h2>${title}</h2>
          <p>${data}</p>`, 
          `<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);
        });
      }
      else{
        fs.readdir('./data', (err1, filelist) => {
          // readFile(경로, 인코딩 타입, 콜백함수)
          fs.readFile(`data/${title}`, 'utf8', (err, data)=>{
            var list = template.list(filelist);
            var html = template.html(title, list, `<h2>${title}</h2>
            <p>${data}</p>`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
            </form>`);
            // 생성, 수정, 삭제 버튼 구현
            // 생성과 수정의 경우 get 방식을 사용하여 링크를 사용하지만
            // 삭제의 경우 링크를 사용하여 get방식으로 데이터를 받으면 보안상 큰 위험이 생긴다.
            // 그렇기 때문에 기존의 두 방식과 달리 삭제는 form을 통해 데이터를 넘긴다.

            // 생성 -> 새로운것을 만들기 때문에 따로 데이터가 필요없다.
            // 수정 -> 기존의 컨텐츠를 바꾸기 때문에 어떤것을 바꾸려는지를 URL을 통해 넘긴다.
            // 삭제 -> 삭제하기 위한 제목을 넘겨준다.
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    }else if(pathname === '/create'){ // 생성 데이터 입력
      fs.readdir('./data', (err, filelist) => {
        title = 'WEB - create';
        var list = template.list(filelist);
        var form = `
        <form action="http://localhost:3000/create_process" method="POST">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
              <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
        </form>
        `;
        // create_process페이지로 넘어가며 여기서 입력한 데이터들을 post방식으로 함께 넘겨준다.
        var html = template.html(title, list, form, ``);
        response.writeHead(200);
        response.end(html);
      });
    }else if(pathname === '/create_process'){ // 생성 처리
      var body = '';

      // 넘어온 모든 데이터를 body에 저장한다.
      // data -> 데이터가 들어오는지 확인
      request.on('data', (data)=>{ // form을 통해 넘어온 데이터를 읽는 방법 (request.on())
        body += data;
      });

      // body에 저장된 데이터들을 querystring의 파싱 함수를 통해 post에 저장한다
      // post는 객체인것 같다.
      // end => 데이터가 넘어오는것이 끝났다면 실행하는 부분.
      request.on('end', ()=>{
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
          if(err) throw err;
          response.writeHead(302,{Location: `/?id=${title}`});
          response.end();
        });
      });
      // 이렇게 data와 end로 두번 받는 이유는 data를 통해 모든 데이터를 받는 작업이 끝난 뒤에 end를 실행해야
      // 손실되는 데이터가 생기지 않기 때문이다.

    }else if(pathname === '/update'){ // 수정 데이터 입력
      fs.readdir('./data', (err1, filelist) => {
        // readFile(경로, 인코딩 타입, 콜백함수)
        fs.readFile(`data/${title}`, 'utf8', (err, data)=>{
          var list = template.list(filelist);
          var html = template.html(title, list, 
            `
            <form action="http://localhost:3000/update_process" method="POST">
              <input type="hidden" name="id" value="${title}" >
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                  <textarea name="description" placeholder="description">${data}</textarea>
              </p>
              <p>
                  <input type="submit">
              </p>
            </form>
            `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
          // 수정과 넘어가는 방식은 같으며, 이 때 id값을 hidden으로 주는 이유는
          // 제목 또한 수정이 일어날 수 있기 때문이다.
          // 제목에 수정이 생기는 경우 후에 update_process에서 파일을 찾을 수 없기 때문에 문제가 생긴다.
          response.writeHead(200);
          response.end(html);
        });
      });
    }else if(pathname === '/update_process'){ // 수정 처리
      var body = '';
      request.on('data', (data)=>{
        body += data;
      });
      request.on('end', ()=>{
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, (err)=>{ // 파일 이름 재정의
          if(err) throw err;
          fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{ // 파일 쓰기
            if(err) throw err;
            response.writeHead(302,{Location: `/?id=${title}`});
            response.end();
          });
        });
      });
    }else if(pathname === '/delete_process'){ // 삭제 처리
      var body = '';
      request.on('data', (data)=>{
        body += data;
      });
      request.on('end', ()=>{
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, (err)=>{ // 파일을 삭제하는 함수
          if(err) throw err;
          response.writeHead(302,{Location: `/`}); // 삭제 후에는 메인페이지로 돌아가도록 한다.
          response.end();
        });
      });
    }else{ // 에러 페이지
      response.writeHead(404);
      response.end('Not found');
    }

    
    
});
app.listen(3000); // 3000번 포트를 통해 열고 듣겠다.