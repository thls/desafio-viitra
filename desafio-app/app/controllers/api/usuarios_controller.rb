module Api
    class UsuariosController < ApplicationController
        # Listar todos os usuarios
        def index
            usuarios = Usuario.page(params[:page]).per_page(12);
            render json: {status: 'success', message:'Usuarios encontrados.', data:usuarios},status: :ok
        end
        
        # Recuperar usuario pelo ID
        def show
            begin
                usuario = Usuario.find(params[:id]);
                render  json: {status: 'success', message:'Usuario encontrado.', 
                                 data: {usuario: usuario, telefone:usuario.telefone, endereco: usuario.endereco}}, status: :ok
            rescue Exception => e
                render json: {status: 'fail', message: e},status: :ok
            end
        end
    end
end