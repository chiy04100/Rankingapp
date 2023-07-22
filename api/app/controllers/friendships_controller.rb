class FriendshipsController < ApplicationController
  before_action :set_friendship, only: [:show, :update, :destroy]

  # GET /friendships
  def index
    @friendships = Friendship.where(receiver_id: params[:receiver_id], friend_status_id: params[:friend_status_id])
    if @friendships.present?
      render json: @friendships
    else
      @friendship = Friendship.all
    end
  end
  # GET /friendships/1
  def show
    render json: @friendship
  end

  # POST /friendships
  def create
    # 既存のフレンドリクエストを検索
    existing_friendship = Friendship.find_by(sender_id: friendship_params[:sender_id], receiver_id: friendship_params[:receiver_id])

    if existing_friendship
      # 既存のフレンドリクエストが存在する場合は、friend_status_idを1に更新
      existing_friendship.update(friendship_params.merge(friend_status_id: 1))
      render json: existing_friendship, status: :ok, location: existing_friendship
    else
      # 既存のフレンドリクエストが存在しない場合は新しいフレンドリクエストを作成
      @friendship = Friendship.new(friendship_params)

      if @friendship.save
        render json: @friendship, status: :created, location: @friendship
      else
        render json: @friendship.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /friendships/1
  def update
    if @friendship.update(friendship_params)
      render json: @friendship
    else
      render json: @friendship.errors, status: :unprocessable_entity
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
