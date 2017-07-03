#!/usr/bin/env ruby

require 'fileutils'

unless ARGV.length === 1
  puts <<-EOT
usage: #{$0} directory_to_exported_rags_project
  EOT
end

rags_project_dir = ARGV[0]
src_dir = File.expand_path(File.join(File.dirname(__FILE__), '..', 'src'))

puts "Searching '#{rags_project_dir}' for a .html file..."

html_file = Dir["#{rags_project_dir}/*.html"].reject { |path| path.match /regalia/ }[0]
unless html_file
  puts "Found nothing, giving up..."
  exit 1
end
puts "Found: '#{html_file}'"

puts "Scraping title out of filename..."
content = File.read(html_file)

match = content.match(/<header.*?<b>(.*?)<\/b>.*?<\/header>/m)
unless match
  puts "Found nothing, giving up..."
  exit 1
end

game_title = match[1]
puts "Found: '#{game_title}'"
puts "Copying Regalia content\n  From: '#{src_dir}'\n  To: #{rags_project_dir}"

FileUtils.rm_rf(File.join(rags_project_dir, 'regalia.html'))
html_content = File.read(File.join(src_dir, 'regalia.html'))
File.write(File.join(rags_project_dir, 'regalia.html'), html_content.sub('GAME_TITLE_HERE', game_title))

FileUtils.rm_rf(File.join(rags_project_dir, 'regalia'))
FileUtils.copy_entry(File.join(src_dir, 'regalia'), File.join(rags_project_dir, 'regalia'))

puts "Copying Game.js content into Regalia folder..."
FileUtils.mkdir_p(File.join(rags_project_dir, 'regalia', 'game'))

puts "Done!"