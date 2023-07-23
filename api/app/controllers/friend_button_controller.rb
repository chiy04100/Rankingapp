class FriendButtonController < ApplicationController
  before_action :set_friendship, only: [:show, :update, :destroy]

  # GET /friend_button
  def index
    @friend_button = Friendship.all
    
    render json: @friend_button
  end

  def show
    render json: @friend_button
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friend_button = Friendship.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def friendship_params
      params.require(:friendship).permit(:sender_id, :receiver_id, :friend_status_id)
    end
end
