	app.controller('brandController', function($scope,$http,brandService,$controller) {
	
	$controller('baseController',{$scope:$scope})
	 $scope.findAll=function(){
	    brandService.findAll().success(function(response){
	        $scope.list=reponse;
	    });
	}
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
	//分页
	$scope.findPage=function(page,size){
	 	brandService.findPage(page,size).success(function(response) {
	 	 	$scope.list=response.rows;
	 	 	$scope.paginationConf.totalItems=response.total;
	 	})   
	}
	//新增或者保存
	$scope.save=function(){
	    var object= null;
	    //id 不是空 为更新
	    if($scope.entity.id!=null){
	       object=brandService.update($scope.entity);
	    }else{
	       object=brandService.add($scope.entity);
	    }
	    
	    object.success(function(response) {
	     	if(response.success){
	     	  	$scope.reloadList();   
	     	}else{
	     	    alert(response.message);
	     	}
	    });
	}
	//根据id查询
	$scope.findOne=function(id){
	   brandService.findOne(id).success(function(response){
	       $scope.entity=response; 
	    });
	}
	//删除所选
	$scope.delete=function (){
	    brandService.delete($scope.selectIds).success(function(response){
	     	if(response.success){
	     		$scope.reloadList();  
	     	}else{
	     	  	alert(response.message)  
	     	}   
	    });
	}
	//初始化$scope.searchEntity
	
	$scope.searchEntity={}

	//Page by Search Content 
	$scope.search=function(page,size){
	 brandService.search(page,size,$scope.searchEntity).success(function(response) {
 	 	$scope.list=response.rows;
 	 	$scope.paginationConf.totalItems=response.total;
 	});
 }
 });