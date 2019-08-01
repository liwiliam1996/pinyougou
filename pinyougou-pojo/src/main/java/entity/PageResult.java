package entity;

import java.io.Serializable;
import java.util.List;
/**
 * 
 * @类名称: PageResult
 * @类描述: 分页结果类
 * @创建人：liwiliam
 * @创建时间：2019年7月18日 上午2:35:10 
 * @备注：     
 * @version V1.0
 */
public class PageResult  implements Serializable {
	
	private long total;//总记录数
	private List rows;//当前记录数据
	
	public PageResult(long total, List rows) {
		super();
		this.total = total;
		this.rows = rows;
	}
	public long getTotal() {
		return total;
	}
	public void setTotal(long total) {
		this.total = total;
	}
	public List getRows() {
		return rows;
	}
	public void setRows(List rows) {
		this.rows = rows;
	}
	

}
