var app = angular.module('desafio-app', ['ngRoute', 'templates']);

app.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
    $routeProvider
    .when("/cadastrar", {
        templateUrl: 'cadastro/_cadastro.html',
        controller: 'CadastroController'
    })
    .when("/usuarios", {
        templateUrl: 'usuarios/_usuarios.html',
        controller: 'UsuariosController'
    })
    .otherwise({redirectTo: '/'});
});