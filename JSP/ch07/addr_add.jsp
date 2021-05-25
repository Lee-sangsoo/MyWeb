<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<% request.setCharacterEncoding("utf-8"); %>
<jsp:useBean id="abook" scope="request" class="web2021.ch07.AddrBook" />
<jsp:setProperty property="*" name="abook"/>

<jsp:useBean id="manager" scope="application" class="web2021.ch07.ABManger" />
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