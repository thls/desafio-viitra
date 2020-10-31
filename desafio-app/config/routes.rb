Rails.application.routes.draw do
  namespace 'api' do
      resources :usuarios, only: [:index, :show, :create, :destroy, :update]
  end
end
