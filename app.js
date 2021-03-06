(function () {
    angular.module("NarrowItDown", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .controller("directiveController", directiveController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", foundItems);

    function directiveController() {
      //directive controller
    }


    function foundItems() {
        var ddo = {
            templateUrl: "SearchList.html",
            bindToController: true,
            controller: "directiveController as dirCtrl",
            scope: {
                found: "<foundList",
                error: "<errorMessasge",//boolen to display error message
                onRemove: '&'
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.SearchText = "";
        ctrl.errorMessage = false;
        ctrl.FoundList = [];
        ctrl.Search = function () {
            if (ctrl.SearchText != undefined && ctrl.SearchText != "")
            {
                MenuSearchService.getMatchedMenuItems(ctrl.SearchText).then(function (result) {
                    ctrl.FoundList = result;
                    ctrl.displayError = ctrl.FoundList.length < 1;//boolean to display error message
                });
            }
            else {
                  ctrl.FoundList=[];//clear list in case of empty
                  ctrl.displayError = ctrl.FoundList.length < 1;//boolean to display error message
            }


        };

        ctrl.removeItem = function (index) {
            ctrl.FoundList.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;
        service.getMatchedMenuItems = function (text)
        {
            var url = "https://davids-restaurant.herokuapp.com/menu_items.json";

            var response = $http.get(url).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];
                var records = result.data;

                for (var i = 0; i < records.menu_items.length; i++) {
                    if (records.menu_items[i].description.includes(text)) {
                        var record = {
                            short_name: records.menu_items[i].short_name,
                            name: records.menu_items[i].name,
                            description: records.menu_items[i].description,
                        };
                        foundItems.push(record);
                    }
                }

                // return processed it
                return foundItems;
            });
            return response;
        };

    }

})();
