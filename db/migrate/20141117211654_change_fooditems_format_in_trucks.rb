class ChangeFooditemsFormatInTrucks < ActiveRecord::Migration
  def up
    change_column :trucks, :fooditems, :text
  end

  def down
    change_column :trucks, :fooditems, :string
  end
end
