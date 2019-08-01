package com.pinyougou.manager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@RestController-->ResponseBody + Controller
@RestController
@RequestMapping("/login")
public class LoginController {
	/**
	 * 
	 * @方法名称:findName
	 * @描述: 回显用户姓名
	 * @创建人：liwiliam
	 * @创建时间：2019年7月24日 上午12:31:54 
	 * @return   
	 * @返回类型：Map
	 */
	@RequestMapping("/name.do")
	public Map<String,String> findName() {
		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		Map<String,String> map = new HashMap<>();
		map.put("LoginName",name);
		return map;
	}
}
