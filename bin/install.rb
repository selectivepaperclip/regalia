#!/usr/bin/env ruby

require 'fileutils'

unless ARGV.length === 1
  puts <<-EOT
usage: #{$0} directory_to_exported_rags_project
  EOT
end

rags_project_dir = (ARGV[0] || '').gsub('\\', '/')
root_dir = File.expand_path(File.join(File.dirname(__FILE__), '..'))
src_dir = File.join(root_dir, 'src')
node_modules_dir = File.join(root_dir, 'node_modules')

unless File.directory?(rags_project_dir)
  puts "The path '#{rags_project_dir}' does not seem to be a directory, bailing out..."
  exit 1
end

puts "Searching '#{rags_project_dir}' for a .html file..."

html_file = Dir["#{rags_project_dir}/*{.html.bak,.html}"].reject { |path| path.match /regalia/ }[0]
unless html_file
  puts "Found nothing, giving up..."
  exit 1
end
puts "Found: '#{html_file}'"

if html_file.end_with?('.html')
  FileUtils.mv(html_file, "#{html_file}.bak")
end

puts "Copying Regalia content\n  From: '#{src_dir}'\n  To: #{rags_project_dir}"

html_content = File.read(File.join(src_dir, 'regalia.html'))
FileUtils.rm_rf(Dir[File.join(rags_project_dir, '*regalia.html')])
File.write(File.join(rags_project_dir, "regalia.html"), html_content)

FileUtils.rm_rf(File.join(rags_project_dir, 'regalia'))
FileUtils.copy_entry(File.join(src_dir, 'regalia'), File.join(rags_project_dir, 'regalia'))
FileUtils.copy(File.join(src_dir, 'Rags_32512.ico'), File.join(rags_project_dir, 'regalia'))

vendor_files = [
  File.join(node_modules_dir, 'deep-diff', 'releases', 'deep-diff-0.3.8.min.js'),
  File.join(node_modules_dir, 'react', 'umd', 'react.production.min.js'),
  File.join(node_modules_dir, 'react-dom', 'umd', 'react-dom.production.min.js'),
  File.join(node_modules_dir, 'moment', 'min', 'moment.min.js'),
]
vendor_files.each do |file_path|
  FileUtils.copy(file_path, File.join(rags_project_dir, 'regalia', 'vendor'))
end

def transpile(src, dest_dir: nil, dest_file: nil)
  root_dir = File.expand_path(File.join(File.dirname(__FILE__), '..'))
  args = [
    'node',
    File.join(root_dir, 'node_modules', 'babel-cli', 'bin', 'babel'),
    '--plugins',
    'transform-react-jsx',
    '--presets',
    'es2015',
    src
  ]
  if dest_dir
    args << '--out-dir'
    args << dest_dir
  end
  if dest_file
    args << '--out-file'
    args << dest_file
  end
  system(*args)
end

puts "Transpiling JSX..."
transpile(
  File.join(src_dir, 'regalia', 'js', 'components'),
  dest_dir: File.join(rags_project_dir, 'regalia', 'js', 'components')
)
transpile(
  File.join(src_dir, 'regalia', 'js', 'Cheat.js'),
  dest_file: File.join(rags_project_dir, 'regalia', 'js', 'Cheat.js')
)

puts "Copying Game.js content into Regalia folder..."
FileUtils.mkdir_p(File.join(rags_project_dir, 'regalia', 'game'))

game_js_content = File.read(File.join(rags_project_dir, 'js', 'Game.js'))
if game_js_content.match(%r([\r\n]+<br>))
  # replace string-breaking newlines that precede <br> tags
  puts 'Found some suspicious newlines in Game.js, attempting to remove...'
  game_js_content.gsub!(%r([\r\n]+<br>), '<br>')
end

# replace any newlines in the roomdata section
# TODO: it would be better if these were escaped or removed in RagsLib.dll, but it is more challenging
newline_in_roomdata_regexp = %r(var roomdata.*?([\r\n]+.*?)+\s*var variabledata)
if game_js_content.match(newline_in_roomdata_regexp)
  puts 'Found some suspicious newlines in Game.js, attempting to remove...'
  game_js_content.gsub!(newline_in_roomdata_regexp) do |content_with_newline|
    content_with_newline.gsub(/[\r\n]+/, '')
  end
end

if rags_project_dir.match(/Apartments/)
  if game_js_content.match(%r(\\\\"))
    # replace double-backslashes followed by a double quote in Game.js text with triple-backslashes
    puts 'Found some suspicious escape sequences (\\\\") in Game.js'
    puts '  attempting to replace with (\\\\\\")'
    game_js_content.gsub!(%r(\\\\"), '\\\\\\\\\\\\"')
  end
end
File.write(File.join(rags_project_dir, 'regalia', 'game', 'Game.js'), game_js_content)

puts "Done!"