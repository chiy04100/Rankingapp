class FriendStatusesController < ApplicationController
  before_action :set_friend_status, only: [:show, :update, :destroy]

  # GET /friend_statuses
  def index
    @friend_statuses = FriendStatus.all

    render json: @friend_statuses
  end

  # GET /friend_statuses/1
  def show
    render json: @friend_status
  end

  # POST /friend_statuses
  def create
    @friend_status = FriendStatus.new(friend_status_params)

    if @friend_status.save
      render json: @friend_status, status: :created, location: @friend_status
    else
      render json: @friend_status.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /friend_statuses/1
  def update
    if @friend_status.update(friend_status_params)
      render json: @friend_status
    else
      render json: @friend_status.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friend_statuses/1
  def destroy
    @friend_status.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend_status
      @friend_status = FriendStatus.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def friend_status_params
      params.require(:friend_status).permit(:statusname)
    end
end
