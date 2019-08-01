package com.pinyougou.manager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;

import entity.PageResult;
import entity.Result;

@RestController
@RequestMapping("/brand")
public class BrandController {
	@Reference
	private BrandService brandService;
	//查询所有
	@RequestMapping("findAll.do")
	public List<TbBrand> findAll() {
		
		return brandService.findAll();
	}
	//分页查询 
	@RequestMapping("/findPage.do")
	public PageResult findPage(@RequestParam(name="page",required=true,defaultValue="1") Integer page,@RequestParam(name="size",required=true,defaultValue="4")Integer size) {
	
		return brandService.findPage(page, size);
	}
	//新增商品
	@RequestMapping("/add.do")
	public Result save(@RequestBody TbBrand brand) {
		try {
			brandService.save(brand);
			return new Result(true,"添加成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false,"添加失败");
		}
	}
	//查询一个 
	@RequestMapping("/findOne.do")
	public TbBrand findOne(Long id) {
		return brandService.findOne(id);
	}
	//更新品牌数据 
	@RequestMapping("/update.do")
	public Result update(@RequestBody TbBrand brand) {
		try {
			brandService.update(brand);
			return new Result(true,"修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false,"修改失败");
		}
	}
	//删除所选复选框的数据
	@RequestMapping("/delete.do")
	public Result delete(@RequestParam(name="ids",required=true) Long[] ids) {
		try {
			brandService.delete(ids);
			return new Result(true,"删除成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false,"删除失败");
		}
	}
	//条件查询
	@RequestMapping("/search.do")
	public PageResult search(@RequestBody TbBrand brand,@RequestParam(name="page",required=true,defaultValue="1") Integer page,@RequestParam(name="size",required=true,defaultValue="4")Integer size) {
		return brandService.findPage(brand, page, size);
	}
	//模板中显示品牌
	@RequestMapping("/selectOptionList.do")
	public List<Map> selectOptionList(){
		return brandService.selectOptionList();
	}
}
