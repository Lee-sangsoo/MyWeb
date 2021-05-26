<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.sql.*" %>
    
<%
	//form을 처리하는 부분 (JDBC로)
	request.setCharacterEncoding("utf-8");
	String JDBC_URL = "jdbc:mysql://localhost/jspdb?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8";
	Connection conn = null;
	PreparedStatement pstmt = null;
	
	try{
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(JDBC_URL, "student", "1234");
		pstmt = conn.prepareStatement("insert into jdbc_table values(?,?)");
		pstmt.setString(1, request.getParameter("username"));
		pstmt.setString(2, request.getParameter("email"));
		
		if(request.getParameter("username") != null)
			pstmt.executeUpdate();
	} catch(SQLException e){
		e.printStackTrace();
	}
	if(pstmt != null)
		pstmt.close();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JDBC 사용해보기</title>
</head>
<body>
	<div align="center">
		<h2>이벤트 등록</h2>
		<hr>
		<form name="form1" action="jdbctest.jsp" method="post">
			등록 이름: <input type="text" name="username">
			이메일: <input type="email" name="email">
			<input type="submit" value="등록">
		</form>
		<hr>
		<div align="left">
			#등록 목록 <br>
			<%
				try{
					String sql = "select username, email from jdbc_table";
					pstmt = conn.prepareStatement(sql);
					ResultSet rs = pstmt.executeQuery();
					int i = 1;
					
					while(rs.next()){
						out.println(i + " : " + rs.getString("username") + ", " + rs.getString("email") + "<br>");
						i++;
					}
					
					rs.close();
					pstmt.close();
					conn.close();
				} catch(Exception e){
					System.out.println(e);
				}
			%>
		</div>
	</div>
</body>
</html>