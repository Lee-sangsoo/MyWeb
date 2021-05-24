<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>구구단</title>
</head>
<body>
	<div align="center">
		<h2>구구단</h2>
		<table border="1">
			<%
				for(int i = 1; i<10; i++){
					out.println("<tr>");
					for(int j = 2; j<10; j++){
						out.println("<td>" + j + " * " + i + " = " + (j * i) + "</td>");
					}
					out.println("</tr>");
				}
			%>
		</table>
	</div>
</body>
</html>