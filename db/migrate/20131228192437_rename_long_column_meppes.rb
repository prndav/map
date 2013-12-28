class RenameLongColumnMeppes < ActiveRecord::Migration
  def change
    rename_column :meppes, :long, :lng
  end
end
