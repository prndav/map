class MeppesController < ApplicationController
  respond_to :json
  before_action :set_meppe, only: [:show, :update, :destroy]

  def index
    respond_with Meppe.all
  end

  def show
    respond_with @meppe
  end

  def create
    category = Category.find(params[:category_id])
    meppe = category.meppes.build(meppe_params)
    meppe.save
    respond_with meppe
  end

  def update
    @meppe.update_attributes(meppe_params)
  end

  def destroy
    @meppe.destroy
  end

  private

    def meppe_params
      params.permit(:name, :description, :lat, :long, :category_id)
    end

    def set_meppe
      @meppe = Meppe.find(params[:id])
    end
end
