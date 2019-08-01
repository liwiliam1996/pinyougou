app.controller("baseController",function($scope){
	//分页控件配置  
	$scope.paginationConf = { 
	   currentPage: 1, 
	   totalItems: 10, 
	   itemsPerPage: 10, 
	   perPageOptions: [10, 20, 30, 40, 50], 
	   onChange: function(){ 
	            $scope.reloadList();//重新加载 
	   } 
	};
	//刷新
	$scope.reloadList=function(){
	    $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
	}
	//复选框选中 
	$scope.selectIds=[];
	$scope.addSelectId=function($event,id){
	    if($event.target.checked){
	    	$scope.selectIds.push(id);
	    }else{
	     	var index = $scope.selectIds.indexOf(id);
	     	$scope.selectIds.splice(index, 1);
	    }
	}
	//Json格式转换
	$scope.jsonToString=function(jsonString,key){ 
	    var json=JSON.parse(jsonString);//将 json 字符串转换为 json 对象 
	    var value=""; 
	    for(var i=0;i<json.length;i++){   
	     if(i>0){ 
	      value+="," 
	     } 
	     value+=json[i][key];    
	    } 
	    return value; 
	   } 
})