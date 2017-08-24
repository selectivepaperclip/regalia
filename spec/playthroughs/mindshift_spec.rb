module MindshiftHelper
  GAME_MAP = {
    "Your apartment (#302)" => {
      'North' => 'Grand Apartments Level 3'
    },
    'Grand Apartments Level 3' => {
      'North' => "Bree's apartment (#303)",
      'South' => "Your apartment (#302)",
      'West' => 'Grand Apartments'
    },
    "Bree's apartment (#303)" => {
      'South' => 'Grand Apartments Level 3'
    },
    'Grand Apartments' => {
      'NorthWest' => 'Antique Shop',
      'NorthEast' => 'Grand Apartments Level 3',
      'SouthEast' => 'The Trails',
      'South' => 'Campus and University Ave',
      'West' => 'General Store'
    },
    'Antique Shop' => {
      'SouthEast' => 'Grand Apartments',
      'South' => 'General Store'
    },
    'General Store' => {
      'North' => 'Antique Shop',
      'East' => 'Grand Apartments',
      'SouthEast' => 'Campus and University Ave'
    },
    'Campus and University Ave' => {
      'NorthWest' => 'General Store',
      'North' => 'Grand Apartments',
      'East' => 'The Trails',
      'SouthEast' => 'University Walk'
    },
    'The Trails' => {
      'NorthWest' => 'Grand Apartments',
      'West' => 'Campus and University Ave'
    },
    'University Walk' => {
      'NorthWest' => 'University Gym',
      'North' => 'University library',
      'West' => 'Campus and University Ave',
      'South' => 'Belter Building',
      'SouthWest' => 'Student Center'
    },
    'Student Center' => {
      'NorthEast' => 'University Walk'
    },
    'University library' => {
      'South' => 'University Walk',
      'West' => 'University Gym'
    },
    'University Gym' => {
      'East' => 'University library',
      'SouthEast' => 'University Walk'
    },
    'Belter Building' => {
      'North' => 'University Walk',
      'South' => 'Belter Hall, 1st Floor',
      'West' => 'Student Center'
    },
    'Belter Hall, 1st Floor' => {
      'North' => 'Belter Building',
      'West' => 'Belter 1110'
    },
    'Belter 1110' => {
      'East' => 'Belter Hall, 1st Floor'
    }
  }

  def navigator
    @navigator ||= Navigator.new(GAME_MAP)
  end

  def go_to_room(destination_room)
    current_room = page.find('#RoomTitle').text

    unless GAME_MAP[destination_room]
      raise "Don't know anything about destination room (#{destination_room})"
    end

    directions = navigator.navigation_directions(current_room, destination_room)
    directions.each do |direction|
      go_direction(direction)
      continue_until_unpaused
    end
  end

  def quickstart(savegames_filename)
    start_game 'Mindshift'

    choose_input_action 'By loading a saved game'

    import_savegames(savegames_filename)
  end
end

describe 'mindshift', type: :feature, js: true do
  include MindshiftHelper

  it 'can play through the game' do
    start_game 'Mindshift'

    choose_input_action 'By starting a new game'
    continue_until_unpaused

    sleep 3
    act_on_object 'mirror', 'Examine'
    act_on_object 'Player 4', 'Select'
    go_to_room "Bree's apartment (#303)"
    continue_until_unpaused

    fill_in 'textinput', with: 'TestPlayer'
    click_on 'textbutton'
    act_on_room 'Examine'
    act_on_character 'Bree', "What's going on?"
    act_on_character 'Bree', "Your apartment smells nice."
    act_on_character 'Bree', "What have you been doing"
    continue_until_unpaused
    act_on_character 'Bree', "Are you seeing anyone"
    continue_until_unpaused

    go_to_room "Your apartment (#302)"
    act_on_object 'computer', 'Examine'
    continue_until_unpaused
    act_on_object 'From: Mom', 'Read'
    act_on_object 'bed', 'Sleep'
    continue_until_unpaused

    set_game_variable('player_cash', 200000)
    freeze_game_variable('player_stamina')

    go_direction 'North'
    continue_until_unpaused
    go_to_room 'University Walk'
    act_on_room 'Attend classes'
    continue_until_unpaused
    go_to_room 'Student Center'

    act_on_character 'Bree', "What's going on?"
    act_on_character 'Bree', "How were your first classes"
    act_on_character 'Bree', "What's with the landlady"
    act_on_object 'lunch special', 'Purchase'
    continue_until_unpaused

    go_to_room 'University Walk'
    act_on_object 'bulletin board', 'Examine'
    act_on_object 'Perception study', 'Read'
    act_on_object 'Perception study', 'Take'

    go_to_room 'University library'
    act_on_object 'computers', 'Class registrar'
    choose_input_action 'Western Literature'

    go_to_room 'Belter Hall, 1st Floor'
    go_direction 'SouthEast'
    act_on_character 'Researcher', 'Greet'
    continue_until_unpaused
    act_on_object 'psych exam', 'Answer'
    choose_input_action 5
    act_on_object 'psych exam', 'Answer'
    choose_input_action 5
    act_on_object 'psych exam', 'Answer'
    choose_input_action 5
    act_on_object 'psych exam', 'Answer'
    choose_input_action 6
    continue_until_unpaused
    act_on_character 'Researcher', "What's your name"
    act_on_character 'Vicky', "Where are you from"
    act_on_character 'Vicky', "What kind of research"
    go_direction 'NorthWest'

    go_to_room 'University Walk'
    act_on_object 'Psy Tech Workshop', 'Read'
    act_on_object 'Psy Tech Workshop', 'Take'

    go_to_room 'Belter 1110'
    act_on_room 'Sit down'
    continue_until_unpaused
    act_on_character 'Tyler', 'Why are you doing this'
    act_on_character 'Tyler', 'Where are you from'
    continue_until_unpaused
    act_on_character 'Tyler', 'How can I hypnotize'
    act_on_character 'Tyler', 'Where can I find a focus'
    act_on_character 'Gunther', "What's your background"
    act_on_character 'Gunther', "What's there to do"
    act_on_character 'Gunther', "How did you like being hypnotized"

    go_to_room "Bree's apartment (#303)"
    act_on_character 'Bree', 'What do you think about hypnosis'
    continue_until_unpaused

    act_on_character 'Bree', 'You should try hypnosis'
    fill_in 'textactioninput', with: 'quit smoking'
    click_on 'textactionbutton'
    continue_until_unpaused

    go_to_room "Your apartment (#302)"
    act_on_object 'bed', 'Sleep'
  end
end