var urlapi="http://localhost:3000/api/";
//var urlapi="http://192.168.1.39:3000/api/";
//var urlapi="https://pahapp.paas.primustech.io/api/";

angular.module('starter.controllers', ['pascalprecht.translate'])
.controller('tabCtrl', function($scope) {
  $scope.assemblies={};
  $scope.getStorageData = function(){
    if(localStorage.getItem('pah_assemblies')){
      $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
    }
    if(localStorage.getItem("pah_assemblyName"))
    {
      $scope.storageAssemblyName=localStorage.getItem("pah_assemblyName");
    }
  };
  $scope.getStorageData();


})
.controller('EvictionsCtrl', function($scope, $http, $ionicLoading) {
  /*$scope.assemblies={};
  if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }*/
  $scope.getStorageData();

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
  /*$scope.assemblies={};
  if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }*/
  $scope.getStorageData();

  console.log($stateParams.assemblyId);
  $scope.assembly = $filter('filter')($scope.assemblies, $stateParams.assemblyId, true)[0];
  $scope.eviction = $filter('filter')($scope.assembly.evictions, $stateParams.evictionId, true)[0];

})

.controller('AssembliesCtrl', function($scope, $http, $ionicLoading) {

  /*$scope.assemblies={};
  if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }*/
  $scope.getStorageData();
  /*if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }*/
  console.log($scope.assemblies);

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
  /*$scope.assemblies={};
  if(localStorage.getItem('pah_assemblies')){
    $scope.assemblies=JSON.parse(localStorage.getItem('pah_assemblies'));
  }*/
  $scope.getStorageData();

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

.controller('OptionsCtrl', function($scope, $ionicPopup, $translate, $ionicModal, $http, $filter, $timeout, $window) {
  if(localStorage.getItem('pah_token')){// adding token to the headers
    $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('pah_token');
  }

  $scope.getStorageData();

  $scope.settings = {
    enableFriends: true
  };
  $scope.resetFollowing = function(){
      //window.localStorage.removeItem("following");
      //window.localStorage.setItem("following", "");
      localStorage.removeItem('pah_followingAssemblies');
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


    /*$scope.ChangeLanguage = function(lang){
        window.localStorage.setItem('lang', lang);
		$translate.use(lang);
  };*/
  if(localStorage.getItem('pah_lang'))//initialization
  {
    $scope.lang=localStorage.getItem('pah_lang');
  }else{
    localStorage.setItem('pah_lang', 'english');
    $scope.lang=localStorage.getItem('pah_lang');
  }

  $scope.langChange = function(lang){
    console.log(lang);
      window.localStorage.setItem('pah_lang', lang);
      $translate.use(lang);
  };



    // login
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalLogin = modal;
    });
    $scope.closeLogin = function() {
      $scope.modalLogin.hide();
    };
    $scope.showLogin = function() {
      $scope.modalLogin.show();
    };

    $scope.loginData={};
    $scope.doLogin = function() {
      if(($scope.loginData.assemblyName!=undefined)
        &&($scope.loginData.assemblyName!="")
        &&($scope.loginData.password!=undefined)
        &&($scope.loginData.password!=""))
      {
        $http({
            url: urlapi + 'auth',
            method: "POST",
            data: $scope.loginData
        })
        .then(function(response) {
                // success
                console.log("response: ");
                console.log(response.data);
                if(response.data.success==true)
                {
                    console.log("login successful");
                    localStorage.setItem("pah_assemblyName", response.data.assemblyName);
                    localStorage.setItem("pah_token", response.data.token);
                    localStorage.setItem("pah_assemblyId", response.data.assemblyId);
                }else{
                    console.log("login failed");
                }
                $timeout(function() {
                  $scope.closeLogin();
                  $window.location.reload(true);
                }, 1000);

        },
        function(response) { // optional
                // failed
                console.log(response);
        });
      }else{
        console.log("login data empty");
        $scope.closeLogin();
      }

    };
    $scope.doLogout = function() {
      localStorage.removeItem("pah_assemblyName");
      localStorage.removeItem("pah_assemblyId");
      localStorage.removeItem("pah_token");
      $window.location.reload(true);

    };



    /*new eviction*/
    $scope.neweviction={};
    $ionicModal.fromTemplateUrl('templates/newEviction.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalNewEviction = modal;
    });
    $scope.closeModalNewEviction = function() {
      $scope.modalNewEviction.hide();
    };
    $scope.showModalNewEviction = function(){
      $scope.modalNewEviction.show();
    };
    $scope.doNewEviction = function(){
    console.log($scope.neweviction.date);
      $http({
        url: urlapi + 'neweviction',
        method: "POST",
        data: $scope.neweviction
      })
      .then(function(response) {
              // success
              console.log("response: ");
              console.log(response);
              //$scope.newtravel._id=response.data._id;
              //$scope.travels.push($scope.newtravel);
              $scope.travels=response.data;
              localStorage.setItem('pah_assemblies', JSON.stringify($scope.travels));
              localStorage.setItem('pah_assembliesLastDate', JSON.stringify(new Date()));
              $scope.neweviction={};
              if(response.data.success==false){

                  $ionicLoading.show({ template: 'failed to generate new eviction', noBackdrop: true, duration: 2000 });
              }
      },
      function(response) { // optional
              // failed
          $ionicLoading.show({ template: 'failed to generate new publication, all input fields needed', noBackdrop: true, duration: 2000 });
      });

      $timeout(function() {
        $scope.closeModalNewEviction();
      }, 1000);
    };
});
