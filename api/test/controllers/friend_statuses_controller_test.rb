require 'test_helper'

class FriendStatusesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @friend_status = friend_statuses(:one)
  end

  test "should get index" do
    get friend_statuses_url, as: :json
    assert_response :success
  end

  test "should create friend_status" do
    assert_difference('FriendStatus.count') do
      post friend_statuses_url, params: { friend_status: { statusname: @friend_status.statusname } }, as: :json
    end

    assert_response 201
  end

  test "should show friend_status" do
    get friend_status_url(@friend_status), as: :json
    assert_response :success
  end

  test "should update friend_status" do
    patch friend_status_url(@friend_status), params: { friend_status: { statusname: @friend_status.statusname } }, as: :json
    assert_response 200
  end

  test "should destroy friend_status" do
    assert_difference('FriendStatus.count', -1) do
      delete friend_status_url(@friend_status), as: :json
    end

    assert_response 204
  end
end
