class ImageReporter
  attr_reader :page

  def initialize(game_name, page)
    @game_name = game_name
    @html_file = find_game_html(game_name)
    @page = page
  end

  def all_seen_images
    @seen_images ||= page.evaluate_script('ImageRecorder.allSeenImages()')
  end

  def all_game_images
    return @game_images if @game_images
    game_dir = File.dirname(@html_file)
    images_dir = File.join(game_dir, 'images')
    @game_images = Dir.glob("#{images_dir}/*").map { |f| File.basename(f) }
  end

  def unseen_images_for_game
    all_game_images.map(&:downcase) - all_seen_images.map(&:downcase)
  end

  def percentage_seen_for_game
    return 0 unless all_seen_images.length > 0

    (all_seen_images.length.to_f / all_game_images.length) * 100
  end

  def percentage_seen_report
    "Saw %.2f of the images in #{@game_name} this session." % percentage_seen_for_game
  end

  def report_missing_images(output_filename)
    puts "Didn't see #{unseen_images_for_game.length} images this session"
    File.open(output_filename, 'w') do |f|
      unseen_images_for_game.each { |image| f.write("#{image}\n") }
    end
  end
end