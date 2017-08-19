def find_game_html(game_name)
  games_dir = ENV['GAMES_DIR']
  unless games_dir
    raise "GAMES_DIR environment variable was not set. Please invoke the specs with GAMES_DIR set to the directory that includes #{game_name}"
  end

  game_dir = Dir.glob(File.join(games_dir.gsub('\\', '/'), '/*')).grep(/#{game_name}/)[0]
  unless game_dir
    raise "Unable to find any directories matching '#{game_name}' in '#{games_dir}'"
  end

  html_file = Dir.glob(File.join(game_dir, '/*')).grep(/regalia\.html/)[0]
  unless html_file
    raise "Unable to find regalia HTML file in '#{game_dir}'"
  end

  puts "Found HTML matching '#{game_name}': '#{html_file}'"
  html_file
end

def find_game_url(game_name)
  html_file = find_game_html(game_name)
  "file:///#{URI.escape(html_file)}"
end

def start_game(name)
  url = find_game_url(name)

  visit url
  # Disable animations
  execute_script('$.fx.off = true')

  # Hide tooltips so Capybara doesn't accidentally click them instead of compass directions
  execute_script(<<-EOT)
var css = '#tooltip { display: none; }';
var style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
  EOT
end