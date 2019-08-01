package entity;

import java.io.Serializable;
/**
 * 
 * @类名称: Result
 * @类描述: 保存数据 返回结果类
 * @创建人：liwiliam
 * @创建时间：2019年7月18日 下午2:46:17 
 * @备注：     
 * @version V1.0
 */
public class Result implements Serializable{
	
	private Boolean success;
	
    private String message;
    
	public Result(Boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	

}
