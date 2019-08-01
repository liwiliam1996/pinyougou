package com.pinyougou.service;

import java.util.ArrayList;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbSeller;
import com.pinyougou.sellergoods.service.SellerService;

/**
 *
 * @类名称: UserDetailServiceImpl
 * @类描述: 认证类
 * @创建人：liwiliam
 * @创建时间：2019年7月24日 下午11:58:37 
 * @备注：     
 * @version V1.0
 */
public class UserDetailServiceImpl implements UserDetailsService{
	
	private SellerService SellerService;
	
	//用于依赖注入
	public void setSellerService(SellerService sellerService) {
		SellerService = sellerService;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//创建角色列表
		List<GrantedAuthority> grantAuths = new ArrayList();
		grantAuths.add(new SimpleGrantedAuthority("ROLE_SELLER"));
		//获取商家对象
		TbSeller seller = SellerService.findOne(username);
		if(seller!=null) {
			if("1".equals(seller.getStatus())) {
				return new User(username,seller.getPassword(),grantAuths);
			}else {
				return null;
			}
		}else {
			return null;
		}
	}

}
