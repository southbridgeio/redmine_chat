class AddFieldsToChatMessages < ActiveRecord::Migration
  def up
    add_column :chat_messages, :user_name, :string
    add_column :chat_messages, :chat_user_id, :string
    add_column :chat_messages, :stared, :boolean, default: false, null: false

    add_index :chat_messages, :chat_user_id
    add_index :chat_messages, [:issue_id, :stared]

    remove_foreign_key :chat_messages, :users

    ChatMessage.reset_column_information
    ChatMessage.includes(:user).find_each do |chat_message|
      chat_message.update user_name: chat_message.user.try(:name), chat_user_id: chat_message.user_id
    end
  end


  def down
    remove_index :chat_messages, :chat_user_id
    remove_index :chat_messages, [:issue_id, :stared]

    remove_column :chat_messages, :user_name, :string
    remove_column :chat_messages, :chat_user_id, :string
    remove_column :chat_messages, :stared, :boolean, default: false, null: false
  end
end
