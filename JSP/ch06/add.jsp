<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.*"%>
<%
	request.setCharacterEncoding("utf-8");
	ArrayList<String> plist = (ArrayList<String>)session.getAttribute("products");
	if(plist == null){
		plist = new ArrayList<String>();
		session.setAttribute("products", plist);
	}
	plist.add(request.getParameter("product"));
%>

<script>
	alert("<%=request.getParameter("product")%> 이 추가되었습니다!!");
	history.go(-1);
</script>