Testapp::Application.routes.draw do
  resources :categories, except: [:new, :edit] do
    resources :meppes, except: [:new, :edit], shallow: true
  end
  resources :points
end
