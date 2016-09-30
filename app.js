(function(){

angular.module("NarrowItDown",[])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.directive("foundItems",foundItems);

function foundItems()
{
    var ddo= {

      
    };

    return ddo;

}


NarrowItDownController.$inject = ['MenuSearchService'];
function  NarrowItDownController(MenuSearchService)
{
  var ctrl = this;

  ctrl.SearchText = "";
  ctrl.FoundList = [];

  ctrl.Search = function(){
  MenuSearchService.getMatchedMenuItems(ctrl.SearchText).then(function(result){
      console.log(result);
    });
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http)
{
  var service =this ;
  service.getMatchedMenuItems  = function(text){
      var url = "https://davids-restaurant.herokuapp.com/menu_items.json";
    var response =  $http.get(url).then(function (result) {
    // process result and only keep items that match
    var foundItems = [];
    var resp = result.data;

    for(var i=0; i<resp.menu_items.length;i++)
     {
       console.log(resp.menu_items[i]);
     }

    // return processed it
    return foundItems;
});
 return response;
  };

}

})();
