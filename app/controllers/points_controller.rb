class PointsController < ApplicationController
  respond_to :json
  before_action :set_point, only: [:show, :update, :destroy]

  def index
    respond_with Point.all
  end

  def show
    respond_with @point
  end

  def create
    binding.pry
    point = Point.new(point_params)
    point.save
    respond_with point
  end

  def update
    @point.update_attributes(point_params)
  end

  def destroy
    @point.destroy
  end

  private

    def point_params
      params.permit(:name, :description, :lat, :long)
    end

    def set_point
      @point = Point.find(params[:id])
    end
end
