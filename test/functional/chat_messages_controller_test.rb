require File.expand_path('../../test_helper', __FILE__)

class ChatMessagesControllerTest < ActionController::TestCase
  setup do
    @chat_message = chat_messages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:chat_messages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create chat_message" do
    assert_difference('ChatMessage.count') do
      post :create, chat_message: { issue_id: @chat_message.issue_id, message: @chat_message.message, user_id: @chat_message.user_id }
    end

    assert_redirected_to chat_message_path(assigns(:chat_message))
  end

  test "should show chat_message" do
    get :show, id: @chat_message
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @chat_message
    assert_response :success
  end

  test "should update chat_message" do
    patch :update, id: @chat_message, chat_message: { issue_id: @chat_message.issue_id, message: @chat_message.message, user_id: @chat_message.user_id }
    assert_redirected_to chat_message_path(assigns(:chat_message))
  end

  test "should destroy chat_message" do
    assert_difference('ChatMessage.count', -1) do
      delete :destroy, id: @chat_message
    end

    assert_redirected_to chat_messages_path
  end
end
