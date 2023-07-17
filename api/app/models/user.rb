class User < ApplicationRecord
  belongs_to :userstatus

  validates :email, uniqueness: true, presence: true

  def userstatus_name
    userstatus.name
  end
end
