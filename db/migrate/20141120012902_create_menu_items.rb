class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.integer :truck_id
      t.integer :food_id

      t.timestamps
    end
  end
end
