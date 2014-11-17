class CreateTrucks < ActiveRecord::Migration
  def change
    create_table :trucks do |t|
      t.string :name
      t.integer :location
      t.string :fooditems

      t.timestamps
    end
  end
end
