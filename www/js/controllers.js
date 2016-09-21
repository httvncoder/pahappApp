angular.module('starter.controllers', ['pascalprecht.translate'])

.controller('EvictionsCtrl', function($scope, Evictions) {
    $scope.evictions = Evictions.all();
})
.controller('EvictionDetailCtrl', function($scope, $stateParams, Evictions) {
  $scope.eviction = Evictions.get($stateParams.evictionId);
})

.controller('AssembliesCtrl', function($scope, Assemblies) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.assemblies = Assemblies.all();
  $scope.remove = function(assembly) {
    Assemblies.remove(assembly);
  };
  $scope.isFollowing=function(namegiv){
      if(localStorage.getItem(namegiv))
      {
          return(localStorage.getItem(namegiv));
      }else{
          return(false);
      }
  };
})

.controller('AssemblyDetailCtrl', function($scope, $stateParams, Assemblies) {
  $scope.assembly = Assemblies.get($stateParams.assemblyId);
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
