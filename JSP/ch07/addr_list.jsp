<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="web2021.ch07.*"%>
<jsp:useBean id="manager" scope="application" class="web2021.ch07.ABManger" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주소록</title>
</head>
<body>
	<div align="center">
		<h2>주소록</h2>
		<hr>
		<a href="addr_form.html">주소 추가</a>
		<p>
		<table border="1">
			<tr>
				<th>이름</th> <th>전화번호</th> <th>이메일</th> <th>성별</th>
			</tr>
			<%
				for(AddrBook record : manager.getList()){
			%>
				<tr>
					<td><%=record.getName() %></td>
					<td><%=record.getPhone() %></td>
					<td><%=record.getEmail() %></td>
					<td align="center"><%=record.getGender() %></td>
				</tr>
			<%
				}
			%>
		</table>
	</div>
</body>
</html>