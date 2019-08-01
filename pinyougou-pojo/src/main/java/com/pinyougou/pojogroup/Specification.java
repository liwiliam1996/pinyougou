package com.pinyougou.pojogroup;

import java.io.Serializable;
import java.util.List;

import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojo.TbSpecificationOption;
/**
 * 
 * @类名称: Specification
 * @类描述: 组合pojo
 * @创建人：liwiliam
 * @创建时间：2019年7月21日 下午4:39:57 
 * @备注：     
 * @version V1.0
 */
public class Specification implements Serializable {

	private TbSpecification specification;
	private List<TbSpecificationOption> SpecificationOptionList;

	public TbSpecification getSpecification() {
		return specification;
	}

	public void setSpecification(TbSpecification specification) {
		this.specification = specification;
	}

	public List<TbSpecificationOption> getSpecificationOptionList() {
		return SpecificationOptionList;
	}

	public void setSpecificationOptionList(List<TbSpecificationOption> specificationOptionList) {
		SpecificationOptionList = specificationOptionList;
	}

}
