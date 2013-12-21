class Meppe < ActiveRecord::Base
  belongs_to :category
  has_many :points
end
