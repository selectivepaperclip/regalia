class Navigator
  def initialize(map)
    @map = map
  end

  def navigation_directions(start_room, end_room)
    results = []
    compute_navigation_direction_possibilities(results, start_room, end_room)

    results.sort_by(&:length).first
  end

  def compute_navigation_direction_possibilities(results, start_room, end_room, rooms_seen = [], directions_taken = [])
    if start_room == end_room
      results << directions_taken
      return
    end

    # Stop wandering around the graph if the path is already longer than the shortest found path
    if results.length > 0 && results.sort_by(&:length).first.length < directions_taken.length
      return
    end

    directions = @map[start_room]
    unless directions
      raise "Don't know how to get anywhere from room '#{start_room}''"
    end

    directions.each do |direction, next_room|
      next if rooms_seen.include?(next_room)
      next if direction == opposite_direction(directions_taken.last)

      compute_navigation_direction_possibilities(
          results,
          next_room,
          end_room,
          rooms_seen + [next_room],
          directions_taken + [direction]
      )
    end

    nil
  end

  private

  def opposite_direction(direction)
    {
        'North' => 'South',
        'South' => 'North',
        'West' => 'East',
        'East' => 'West',
        'NorthWest' => 'SouthEast',
        'SouthEast' => 'NorthWest',
        'NorthEast' => 'SouthWest',
        'SouthWest' => 'NorthEast',
        'Up' => 'Down',
        'Down' => 'Up',
        'In' => 'Out',
        'Out' => 'In',
    }[direction]
  end
end

def clear_main_text
  page.execute_script("document.getElementById('MainText').innerHTML = ''")
end

def go_direction(direction)
  clear_main_text
  page.find(".compass-direction.active[data-direction=\"#{direction}\"]").click
end

def continue_until_unpaused
  while (continue_button = page.all('#Continue', visible: true)[0])
    click_on 'Continue'
  end
end

def click_on_character(character)
  page.find(".VisibleCharacters", text: character).click
end

def click_on_object(object)
  page.find(".RoomObjects", text: object).click
end

def act_on_object(object, action)
  click_on_object(object)
  choose_action(action)
end

def act_on_character(character, action)
  click_on_character(character)
  choose_action(action)
end

def choose_action(action)
  within '#Actionchoices' do
    page.find(".ActionChoices", text: action, match: :first).click
  end
end

def has_action?(action)
  within '#Actionchoices' do
    page.all(".ActionChoices", text: action).length > 0
  end
end

def choose_room_action(action)
  # RoomThumbImg gets occluded by layers when present
  # so capy will refuse to click on it.
  page.execute_script("$('#RoomThumbImg').trigger('click')")
  choose_action(action)
end
alias act_on_room choose_room_action

def click_on_self
  page.find('#PlayerImg').click
end

def choose_self_action(action)
  click_on_self
  choose_action(action)
end
alias act_on_self choose_self_action

def fill_in_text_input(text)
  page.fill_in 'textinput', with: text
  page.click_on 'textbutton'
end

def choose_input_action(action)
  page.find('.inputchoices', text: action).click
end

def choose_first_input_action(action)
  page.find('.inputchoices', text: action, match: :first).click
end

def set_game_variable(name, value)
  dest_property = if value.class == String
                    "sString"
                  else
                    "dNumType"
                  end
  dest_value = if value.class == String
                 "'#{value}'"
               else
                 value
               end
  page.evaluate_script("TheGame.Variables.filter(function (v) { return v.varname === '#{name}' })[0].#{dest_property} = #{dest_value}")
end

def freeze_game_variable(name)
  page.evaluate_script("cheatFreezes.variables['#{name}'] = true")
end

def skip_next_live_timer
  page.find('.live-timer-display-rows tr', match: :first).click
end

def skip_all_live_timers
  # Wait for a live timer dismiss button to actually exist
  page.find('.live-timer-display-rows tr')

  # Keep dismissing the live timers until they're all gone
  while page.all('.live-timer-display-rows tr').length > 0
    page.find('.live-timer-display-rows tr', match: :first).click
  end
end

def export_savegames(prefix = 'rspec')
  click_on 'save'
  accept_alert do
    accept_prompt(with: "#{prefix} save") do
      click_on 'Create a New Save'
    end
  end
  click_on 'save'
  now_string = DateTime.now.strftime('%Y-%m-%d-%H-%M-%S')
  filename = "#{prefix}_save_#{now_string}.json"
  File.write(filename, page.evaluate_script('retrieveExportData()'))

  puts "Exported saves as #{filename}"
  exit 0
end

def import_savegames(filename)
  page.evaluate_script("SavedGames.import(#{File.read(filename)})")
  click_on 'load'
  accept_alert do
    within '.load-menu' do
      click_on 'Load'
    end
  end
  accept_alert do
    click_on 'load'
    click_on 'Destroy All Saves'
  end
end

def run_until_condition
  Timeout.timeout(15) do
    while true
      break if yield
    end
  end
end
