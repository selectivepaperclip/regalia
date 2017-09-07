#!/usr/bin/env ruby

require 'fileutils'

unless ARGV.length === 1
  puts <<-EOT
usage: #{$0} directory_to_exported_rags_project
  EOT
end

rags_project_dir = ARGV[0]
root_dir = File.expand_path(File.join(File.dirname(__FILE__), '..'))
src_dir = File.join(root_dir, 'src')
node_modules_dir = File.join(root_dir, 'node_modules')

puts "Searching '#{rags_project_dir}' for a .html file..."

html_file = Dir["#{rags_project_dir}/*.html"].reject { |path| path.match /regalia/ }[0]
unless html_file
  puts "Found nothing, giving up..."
  exit 1
end
puts "Found: '#{html_file}'"

game_title = File.basename(html_file, '.*')
puts "Copying Regalia content\n  From: '#{src_dir}'\n  To: #{rags_project_dir}"

html_content = File.read(File.join(src_dir, 'regalia.html'))
FileUtils.rm_rf(Dir[File.join(rags_project_dir, '* - regalia.html')])
File.write(File.join(rags_project_dir, "#{game_title.strip} - regalia.html"), html_content.gsub('GAME_TITLE_HERE', game_title))

FileUtils.rm_rf(File.join(rags_project_dir, 'regalia'))
FileUtils.copy_entry(File.join(src_dir, 'regalia'), File.join(rags_project_dir, 'regalia'))
FileUtils.copy(File.join(node_modules_dir, 'deep-diff', 'releases', 'deep-diff-0.3.8.min.js'), File.join(rags_project_dir, 'regalia', 'vendor'))

puts "Copying Game.js content into Regalia folder..."
FileUtils.mkdir_p(File.join(rags_project_dir, 'regalia', 'game'))

game_js_content = File.read(File.join(rags_project_dir, 'js', 'Game.js'))
if (game_js_content.match(%r(\\")))
  # replace double-backslashes followed by a double quote in Game.js text with triple-backslashes
  puts 'Found some suspicious escape sequences (\\\\") in Game.js'
  puts '  attempting to replace with (\\\\\\")'
  game_js_content.gsub!(%r(\\\\"), '\\\\\\\\\\\\"')
end
File.write(File.join(rags_project_dir, 'regalia', 'game', 'Game.js'), game_js_content)

puts "Done!"