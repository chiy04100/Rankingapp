class CreateUserstatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :userstatuses do |t|
      t.string :statusname, limit: 250

      t.timestamps
    end
  end
end
