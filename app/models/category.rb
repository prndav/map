class Category < ActiveRecord::Base
  has_many :meppes
  has_many :points, through: :meppes
end
