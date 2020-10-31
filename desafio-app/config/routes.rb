Rails.application.routes.draw do
  namespace 'api' do
      resources :usuarios, only: [:index, :show]
  end
end
