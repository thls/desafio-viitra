app.controller('InfoController', function($scope, $routeParams, $http, $location){
    $http.get('http://localhost:3000/api/usuarios/'+$routeParams.id)
    .then(res=>{
        var usuario = res.data.data.usuario;
        $scope.nome = usuario.nome;
        $scope.cpf = usuario.cpf;
        $scope.data = new Date(usuario.data_nascimento);
        // Ajustando fuso horário
        $scope.data.setHours($scope.data.getHours()+3);
        $scope.email = usuario.email;
        $scope.telefone = res.data.data.telefone.numero;
        $scope.cep = res.data.data.endereco.cep;
        $scope.uf = res.data.data.endereco.estado;
        $scope.cidade = res.data.data.endereco.cidade;
    });

    $scope.paraEdicao = function(){
        $location.path("/editar/"+$routeParams.id);
    }
    $scope.excluir = function(){
        $http.delete('http://localhost:3000/api/usuarios/'+$routeParams.id).then((response)=>{
            alert(response.data.message);
           $location.path("/usuarios");
        })
    }
});