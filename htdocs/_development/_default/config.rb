#"Last Change: 19-Jun-2014."

project_path     = '../'

http_path        = "/"
css_dir          = "../css"
images_dir       = "../img"
javascripts_dir  = "../js"

sass_dir         = "_development/scss"
sprite_load_path = "_development/sprite_parts"

asset_cache_buster :none

if ( environment == :production)
  output_style = :compressed
  #output_style = :expanded
  #output_style = :nested
  #output_style = :compact
else
  output_style = :expanded
end


relative_assets = true
line_comments = false
cache = true 

extensions_dir = "_development/scss"
require "#{extensions_dir}/include_rb/_function.rb"

##スプライト画像作った時のファイル名気にする時
#on_sprite_saved do |filename|
#  if File.exists?(filename)
#    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
#  end
#end
#
#on_stylesheet_saved do |filename|
#  if File.exists?(filename)
#    css = File.read filename
#    File.open(filename, 'w+') do |f|
#      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
#    end
#  end
#end
