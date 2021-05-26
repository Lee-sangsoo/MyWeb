<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<% request.setCharacterEncoding("utf-8"); %>
<jsp:useBean id="abook" scope="request" class="web2021.ch08.AddrBook" />
<jsp:setProperty property="*" name="abook"/>
<!-- property 속성에 * 를 사용하면 프로퍼티와 동일한 이름의 파라미터를 이용하여 setter 메서드를 생성한 모든 프로퍼티(필드)에 대해 값을 설정할 수 있다. -->
<!-- 즉, addr_form에서 넘어오는 name, phone, email, gender 값을 AddrBook.java에서 받아온 abook의 name, phone, email, gender에 자동으로 값을 설정한다. -->

<jsp:useBean id="manager" class="web2021.ch08.ABManger" />
<% manager.add(abook); %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>등록 내용</title>
</head>
<body>
	<div align="center">
		<h2>등록 내용</h2>
		<p>
		이름: <%= abook.getName() %><br>
		전화번호: <%= abook.getPhone() %><br>
		이메일: <%= abook.getEmail() %><br>
		성별: <%= abook.getGender() %><br>
		<br>
		<a href="addr_list.jsp">목록 보기</a>
	</div>
</body>
</html>