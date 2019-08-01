package com.pinyougou.sellergoods.service;

import java.util.List;
import java.util.Map;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;

/**
 * 
 * @类名称: BrandService
 * @类描述:品牌接口
 * @创建人：liwiliam
 * @创建时间：2019年7月16日 下午10:03:10 
 * @备注：     
 * @version V1.0
 */
public interface BrandService {
	
 public List<TbBrand> findAll();
 
 public PageResult findPage(Integer page,Integer size); 
 
 public void save(TbBrand brand);
 
 public TbBrand findOne(Long id);
 
 public void update(TbBrand brand);
 
 public void delete(Long[] ids);
 
 //根据条件,将条件封装到实体类中分页
 public PageResult findPage(TbBrand brand,Integer page,Integer size);  
 
 public List<Map> selectOptionList();
 
}
