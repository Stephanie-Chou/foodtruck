class RenameLocationColumnInTruck < ActiveRecord::Migration
  def change
    rename_column :trucks, :location, :location_id
  end
end
