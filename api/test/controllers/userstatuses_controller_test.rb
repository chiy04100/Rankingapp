require 'test_helper'

class UserstatusesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @userstatus = userstatuses(:one)
  end

  test "should get index" do
    get userstatuses_url, as: :json
    assert_response :success
  end

  test "should create userstatus" do
    assert_difference('Userstatus.count') do
      post userstatuses_url, params: { userstatus: { statusname: @userstatus.statusname } }, as: :json
    end

    assert_response 201
  end

  test "should show userstatus" do
    get userstatus_url(@userstatus), as: :json
    assert_response :success
  end

  test "should update userstatus" do
    patch userstatus_url(@userstatus), params: { userstatus: { statusname: @userstatus.statusname } }, as: :json
    assert_response 200
  end

  test "should destroy userstatus" do
    assert_difference('Userstatus.count', -1) do
      delete userstatus_url(@userstatus), as: :json
    end

    assert_response 204
  end
end
