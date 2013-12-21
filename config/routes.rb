Testapp::Application.routes.draw do

  get "api/ping" => "application#ping"

  resources :notes, path: 'api/notes'
  resources :categories
  resources :meppes
  resources :points


end
