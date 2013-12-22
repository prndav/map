class CategoriesController < ApplicationController
  respond_to :json
  before_action :set_category, only: [:show, :update, :destroy]

  def index
    respond_with Category.all
  end

  def show
    respond_with @category
  end

  def create
    category = Category.new(category_params)
    category.save
    respond_with category
  end

  def update
    @category.update_attributes(category_params)
    respond_with @category
  end

  def destroy
    @category.destroy
    respond_with @category
  end

  private

    def category_params
      params.permit(:title, :description)
    end

    def set_category
      @category = Category.find(params[:id])
    end
>>>>>>> 9bb39503067eecc324370047e74e3f2d5e140a62
end
