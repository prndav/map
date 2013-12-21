class MeppesController < ApplicationController
  respond_to :json

  def index
    respond_with Meppe.all
  end
end
