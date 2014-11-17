class ChangeNameFormatInTrucks < ActiveRecord::Migration
  def up
    change_column :trucks, :name, :text
  end

  def down
    change_column :trucks, :name, :string
  end
end
