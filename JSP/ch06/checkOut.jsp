<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.*"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>checkOut.jsp</title>
</head>
<body>
	<div align="center">
		<h2>계산</h2>
		<p>
		선택한 상품 목록
		<hr>
		<%
			ArrayList<String> plist = (ArrayList<String>)session.getAttribute("products");
			if(plist == null){
				out.println("선택한 상품이 없습니다!!!");
			}
			else{
				for(String p : plist){
					out.println(p + "<br>");
				}
			}
		%>
	</div>
</body>
</html>