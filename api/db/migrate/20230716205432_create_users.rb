class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username, limit: 250
      t.string :email, limit: 250
      t.string :gender, limit: 5, null: true
      t.binary :image, null: true
      t.references :userstatus, null: false, foreign_key: true, default: 1
      t.string :password

      t.timestamps
    end
  end
end
