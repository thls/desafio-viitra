module Api
    class UsuariosController < ApplicationController
        # Listar todos os usuarios
        def index
            usuarios = Usuario.page(params[:page]).per_page(12);
            render json: {status: 'success', message:'Usuarios encontrados.', data:usuarios},status: :ok
        end
    end
end