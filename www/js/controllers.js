var urlapi="http://localhost:3000/api/";
//var urlapi="https://pahapp.paas.primustech.io/api/";

angular.module('starter.controllers', ['pascalprecht.translate'])

.controller('EvictionsCtrl', function($scope, $http, $ionicLoading) {
  $scope.assemblies={};
  if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }
  $scope.doRefresh = function(assembly) {
    $http.get(urlapi + 'assemblies')
    .success(function(data, status, headers,config){
        console.log('data success');
        console.log(data); // for browser console
        $scope.assemblies = data; // for UI
        localStorage.setItem('pah_assemblies', JSON.stringify($scope.assemblies));
        $scope.$broadcast('scroll.refreshComplete');//refresher stop
    })
    .error(function(data, status, headers,config){
        console.log('data error');
        $scope.$broadcast('scroll.refreshComplete');//refresher stop
        $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

    })
    .then(function(result){
        travels = result.data;
        $ionicLoading.show({ template: 'Assemblies actualized from server!', noBackdrop: true, duration: 2000 });
    });
  };
})
.controller('EvictionDetailCtrl', function($scope, $stateParams, $filter) {
  $scope.assemblies={};
  if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }
  console.log($stateParams.assemblyId);
  $scope.assembly = $filter('filter')($scope.assemblies, $stateParams.assemblyId, true)[0];
  $scope.eviction = $filter('filter')($scope.assembly.evictions, $stateParams.evictionId, true)[0];

})

.controller('AssembliesCtrl', function($scope, $http, $ionicLoading) {

  $scope.assemblies={};
  if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }

  $scope.isFollowing=function(namegiv){
      if(localStorage.getItem(namegiv))
      {
          return(localStorage.getItem(namegiv));
      }else{
          return(false);
      }
  };
})

.controller('AssemblyDetailCtrl', function($scope, $stateParams, $filter) {
  $scope.assemblies={};
  if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }

  $scope.assembly = $filter('filter')($scope.assemblies, $stateParams.assemblyId, true)[0];
  console.log($scope.assembly);
  $scope.followAssembly= function(){
      /*var oldFollowing = window.localStorage.getItem("following");
      oldFollowing = oldFollowing + ", " + $scope.assembly.name;
      window.localStorage.setItem("following", oldFollowing);*/
      window.localStorage.setItem($scope.assembly.name, true);
  };
  $scope.unfollowAssembly= function(){
      /*var oldFollowing = window.localStorage.getItem("following");
      oldFollowing = oldFollowing + ", " + $scope.assembly.name;
      window.localStorage.setItem("following", oldFollowing);*/

      //window.localStorage.setItem($scope.assembly.name, false);
      window.localStorage.removeItem($scope.assembly.name);
  };
  $scope.isFollowing=function(){
      if(localStorage.getItem($scope.assembly.name))
      {
          return($scope.assembly.name);
      }else{
          return(false);
      }
  };

})

.controller('OptionsCtrl', function($scope, $ionicPopup, $translate) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.resetFollowing = function(){
      //window.localStorage.removeItem("following");
      //window.localStorage.setItem("following", "");
      window.localStorage.clear();
  };

  //confirm box to reset follow data
  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Oju!',
     template: 'Segur que vols esborrar les opcions de seguiment?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
       $scope.resetFollowing();
     } else {
       console.log('You are not sure');
     }
   });
 };


    $scope.ChangeLanguage = function(lang){
        window.localStorage.setItem('lang', lang);
		$translate.use(lang);
    };
});
