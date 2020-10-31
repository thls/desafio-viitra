app.controller('UsuariosController', function($http, $scope, $location){
    var page = 1;
    var url = 'http://localhost:3000/api/usuarios?page=';
    $scope.hasNext = true;
    $scope.hasPrevious = false;

    getUsersByPage(page, url)
        .then((response)=>{
            $scope.usuarios = response.data.data
    });

    $scope.excluir = function(id){
        $http.delete('http://localhost:3000/api/usuarios/'+id).then((response)=>{
            alert(response.data.message);
            getUsersByPage(page, url)
            .then((response)=>{
                if (response.data.data.length == 0 || response.data.data == null){
                    if (page == 1){
                        $location.path("/");
                        alert("Não há usuários no sistema.");
                    }
                    $scope.previous();
                }
                $scope.usuarios = response.data.data;
            });
        })
    }
    $scope.editar = function(id){
        $location.path('/editar/'+id);
    }
    $scope.criar = function(){
        $location.path('/cadastrar/');
    }

    $scope.next = function(){
        getUsersByPage(page+1, url)
        .then((response)=>{
            if (response.data.data.length == 0 || response.data.data == null){
                $scope.hasNext = false;
            }else{
                page++;
                $scope.hasNext = true;
                $scope.hasPrevious = true;
                $scope.usuarios = response.data.data;
            }
        });
    }
    $scope.previous = function(){
        getUsersByPage(page - 1, url)
        .then((response)=>{
            $scope.hasPrevious = true;
            $scope.hasNext = true;
            if (--page < 2){
                $scope.hasPrevious = false;
            }
            $scope.usuarios = response.data.data;
        });
    }


    $scope.findByName = function(){
        if ($scope.nome){
            url = "http://localhost:3000/api/usuarios/search/findByName/"+$scope.nome+"?page=";
            console.log(url);
            getUsersByPage(page = 1, url).then((response)=>{
                $scope.hasPrevious = false;
                $scope.hasNext = true;
                $scope.usuarios = response.data.data;
                $scope.nome = '';
            });
        }else{
            alert("Digite algo...")
        }
    }

    $scope.refresh = function(){
        url = 'http://localhost:3000/api/usuarios?page=';
        page = 1;
        getUsersByPage(page, url).then(response =>{
            $scope.usuarios = response.data.data;
        });
        $scope.hasNext = true;
        $scope.hasPrevious = false;
    }

    
    function getUsersByPage(page, url){
        return $http.get(url+page);
    }
})