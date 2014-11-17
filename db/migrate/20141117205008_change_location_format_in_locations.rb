class ChangeLocationFormatInLocations < ActiveRecord::Migration
  def up
    change_column :locations, :latitude, :decimal
    change_column :locations, :longitude, :decimal
  end

  def down
    change_column :locations, :latitude, :integer
    change_column :locations, :longitude, :integer
  end
end
