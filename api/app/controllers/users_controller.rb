class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.includes(:userstatus).all.as_json(include: { userstatus: { only: :statusname } })
    render json: @users
  end  
  
  # GET /users/1
  def show
    @user = User.includes(:userstatus).find(params[:id])
    render json: @user.as_json(include: { userstatus: { only: :statusname } })
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def login
    @users = User.where(email: params[:email], password: params[:password])
    if @users.present?
      render json: @users
    else
      render json: { error: 'No users found with the given email and password' }, status: :not_found
    end
  end  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :gender, :image, :password, :userstatus_id)
    end
end
