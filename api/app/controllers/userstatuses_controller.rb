class UserstatusesController < ApplicationController
  before_action :set_userstatus, only: [:show, :update, :destroy]

  # GET /userstatuses
  def index
    @userstatuses = Userstatus.all

    render json: @userstatuses
  end

  # GET /userstatuses/1
  def show
    render json: @userstatus
  end

  # POST /userstatuses
  def create
    @userstatus = Userstatus.new(userstatus_params)

    if @userstatus.save
      render json: @userstatus, status: :created, location: @userstatus
    else
      render json: @userstatus.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /userstatuses/1
  def update
    if @userstatus.update(userstatus_params)
      render json: @userstatus
    else
      render json: @userstatus.errors, status: :unprocessable_entity
    end
  end

  # DELETE /userstatuses/1
  def destroy
    @userstatus.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_userstatus
      @userstatus = Userstatus.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def userstatus_params
      params.require(:userstatus).permit(:statusname)
    end
end
