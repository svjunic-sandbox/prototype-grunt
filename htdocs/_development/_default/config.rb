#"Last Change: 09-Feb-2014."

http_path = "./"
css_dir = "../css"
sass_dir = "./scss"
images_dir = "../img"
sprite_load_path = "sprite_parts"
javascripts_dir = "../js"

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

# extensions_dir = "./scss"
# require "#{extensions_dir}/include_rb/_function.rb"


#  on_sprite_saved do |filename|
#    if File.exists?(filename)
#      FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
#    end
#  end
#  
#  on_stylesheet_saved do |filename|
#    if File.exists?(filename)
#      css = File.read filename
#      File.open(filename, 'w+') do |f|
#        f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
#      end
#    end
#  end
