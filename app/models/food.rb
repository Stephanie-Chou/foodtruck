class Food < ActiveRecord::Base
  has_many :menu_items
  has_many :trucks, through: :menu_items
  validates :name, uniqueness: true
end
