class Friendship < ApplicationRecord
  belongs_to :sender, class_name: 'User', foreign_key: 'sender_id'
  belongs_to :receiver, class_name: 'User', foreign_key: 'receiver_id'
  belongs_to :friend_status, class_name: 'FriendStatus', foreign_key: 'friend_status_id'

  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  validates :friend_status_id, presence: true
end