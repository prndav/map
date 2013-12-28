class RenameLongColumnPoints < ActiveRecord::Migration
  def change
    rename_column :points, :long, :lng
  end
end
