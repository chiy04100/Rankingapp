class CreateFriendStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :friend_statuses do |t|
      t.string :statusname

      t.timestamps
    end
  end
end
