class FriendRequestsController < ApplicationController
  before_action :set_friendship, only: [:show, :update, :destroy]

  # GET /friend_requests
  def index
    @friendships = Friendship.where(sender_id: params[:sender_id], friend_status_id: params[:friend_status_id])
    if @friendships.present?
      render json: @friendships
    else
      @friendship = Friendship.all
    end
  end

  # DELETE /friendships/1
  def destroy
    @friendship.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def friendship_params
      params.require(:friendship).permit(:sender_id, :receiver_id, :friend_status_id)
    end
end
