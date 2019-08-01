 //控制层 
app.controller('goodsController' ,function($scope,$controller,$location,goodsService,uploadService,itemCatService,typeTemplateService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){
	    var id =$location.search()['id'];
	    if(id==null){
	        return;
	    }
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;
			    //富文本框内容赋值 
				editor.html($scope.entity.goodsDesc.introduction)
				$scope.entity.goodsDesc.customAttributeItems=JSON.parse($scope.entity.goodsDesc.customAttributeItems);
				$scope.entity.goodsDesc.itemImages=JSON.parse($scope.entity.goodsDesc.itemImages);
				$scope.entity.goodsDesc.specificationItems=JSON.parse($scope.entity.goodsDesc.specificationItems);
				//规格列表
				for(var i =0;i<$scope.entity.itemList.length;i++){
				    $scope.entity.itemList[i].spec=JSON.parse( $scope.entity.itemList[i].spec);
				}
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	//保存
	$scope.save=function(){    
		 //提取文本编辑器的值 
		 $scope.entity.goodsDesc.introduction=editor.html();  
		 var serviceObject;//服务层对象     
		 if($scope.entity.goods.id!=null){//如果有 ID 
			  serviceObject=goodsService.update( $scope.entity ); //修改   
			 }else{ 
			  serviceObject=goodsService.add( $scope.entity  );//增加  
			 }     
			 serviceObject.success( 
			  function(response){ 
			   if(response.success){ 
			    location.href="goods.html";
			    $scope.entity={}; 
			    editor.html(""); 
			   }else{ 
			    alert(response.message); 
			   } 
			  }   
			 );     
			}
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//上传图片
	$scope.uploadFile=function(){
		uploadService.uploadFile().success(
			function(response){
				if(response.success){
					$scope.image_entity.url= response.message;
				}else{
					alert(response.message);					
				}
			}		
		);
		
		
	}
	
	$scope.entity={ goodsDesc:{itemImages:[],specificationItems:[]}  };
	
	//将当前上传的图片实体存入图片列表
	$scope.add_image_entity=function(){
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);			
	}
	
	//移除图片
	$scope.remove_image_entity=function(index){
		$scope.entity.goodsDesc.itemImages.splice(index,1);
	}
    
	//catagroy 分级下拉框
	$scope.selectItemCat1List=function(){
	    itemCatService.findByParentId(0).success(function(response){
	                $scope.itemCat1List=response;
	        }
	    );
	}
	//分级下拉框2
	$scope.$watch('entity.goods.category1Id',function(newValue,oldValue){
	    if(newValue!=null){
	    itemCatService.findByParentId(newValue).success(function(response){
            $scope.itemCat2List=response;
            }
        );}
	})
	//分级下拉框3
    $scope.$watch('entity.goods.category2Id',function(newValue,oldValue){
        if(newValue!=null){
        itemCatService.findByParentId(newValue).success(function(response){
            $scope.itemCat3List=response;
            }
        );}
    })
    //更新模板id
        //分级下拉框3
    $scope.$watch('entity.goods.category3Id',function(newValue,oldValue){
        if(newValue!=null){
        itemCatService.findOne(newValue).success(function(response){
            $scope.entity.goods.typeTemplateId=response.typeId;
            }
        );}
    })
    
    //读取模板ID后，读取品牌列表 扩展属性  规格列表
    $scope.$watch('entity.goods.typeTemplateId',function(newValue,oldValue){
       if(newValue!=null){
        typeTemplateService.findOne(newValue).success(
            function(response){
                $scope.typeTemplate=response;// 模板对象 
                $scope.typeTemplate.brandIds= JSON.parse($scope.typeTemplate.brandIds);//品牌列表类型转换
                //扩展属性
                if($location.search()['id']==null){
                $scope.entity.goodsDesc.customAttributeItems= JSON.parse($scope.typeTemplate.customAttributeItems);
                }
            }
        )
        //模板列表
        typeTemplateService.findSpecList(newValue).success(function(response){
            $scope.specList=response;
        })
        ;}
    })
    
    //规格复选框选中和非选中状态
    $scope.updateSpecAttribute=function($event,name,value){
	    var object =$scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems,'attributeName',name);
	    if(object!=null){//已经存在规格属性,在规格attributeValue中添加一个数据
	         if($event.target.checked){
	            object.attributeValue.push(value);
	         }else{
	             object.attributeValue.splice(object.attributeValue.indexOf(value ) ,1);//取消勾选
	             if(object.attributeValue.length==0){
	                 $scope.entity.goodsDesc.specificationItems.splice($scope.entity.goodsDesc.specificationItems.indexOf(object),1)
	             }
	         }
	    }else{//添加一个规格属性和对应的值
	        $scope.entity.goodsDesc.specificationItems.push({"attributeName":name,"attributeValue":[value]})
	    }
	    
	}
	//规格选项列表的动态生成
    $scope.creatItemList=function(){
           $scope.entity.itemList=[{spec:{},price:"0",num:"9999",status:"0",isDefault:"0"}];
           var item = $scope.entity.goodsDesc.specificationItems;
           //ite --> [{"attributeName":"网络制式","attributeValue":["移动3G","移动4G"]},{"attributeName":"屏幕尺寸","attributeValue":["6寸","5寸"]}]
           for(var i=0;i<item.length;i++){
               //item[i] -->{"attributeName":"网络制式","attributeValue":["移动3G","移动4G"]}
               $scope.entity.itemList=addColumn($scope.entity.itemList,item[i].attributeName,item[i].attributeValue);
           }    
     }
     //添加列值(向itemList中的spec属性添加对应的值)
    //传递过来的是
     addColumn=function(list,columnName,columnValue){
         var newList=[];
         for(var i=0;i<list.length;i++){
            var oldRow = list[i];
            for(var j=0;j<columnValue.length;j++){//根据attributeValue数组的长度进行深克隆
               var newRow=JSON.parse(JSON.stringify(oldRow));
               //{spec:{},price:"0",num:"9999",status:"0"}
               newRow.spec[columnName]=columnValue[j];
               newList.push(newRow);
            }
         }
         return newList;
     }
     //状态
     $scope.status=['未审核','已审核','审核未通过','关闭'];
     $scope.itemCatList=[];
     $scope.findItemCatList=function(){
         itemCatService.findAll().success(function(response){
           for(var i=0;i<response.length;i++){
               $scope.itemCatList[response[i].id]=response[i].name;
           }  
         }
         );
     }
    //规格复选框是否选中判断
     $scope.checkAttributeValue=function(specName,optionName){
        var item = $scope.entity.goodsDesc.specificationItems;
         var object =$scope.searchObjectByKey(item,'attributeName',specName);
         if(object!=null){
             if(object.attributeValue.indexOf(optionName)>=0){
                 return true;
             }else{
                 return false;
             }
         }else{
             return false;
         }
     }
});	
