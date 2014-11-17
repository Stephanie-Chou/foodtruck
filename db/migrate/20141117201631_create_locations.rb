class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :longitude
      t.integer :latitude

      t.timestamps
    end
  end
end
