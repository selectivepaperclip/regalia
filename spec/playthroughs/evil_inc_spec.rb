module EvilIncHelper
  GAME_MAP = {
    'Bedroom' => {
      'South' => 'Personal Apartment'
    },
    'Personal Apartment' => {
      'North' => 'Bedroom',
      'East' => 'Apartment Hallway'
    },
    'Apartment Hallway' => {
      'West' => 'Personal Apartment',
      'Down' => 'Apartment Lobby'
    },
    'Apartment Lobby' => {
      'Up' => 'Apartment Hallway',
      'SouthWest' => "Emily's Apartment",
      'South' => 'Liberty City-East Side'
    },
    "Emily's Apartment" => {
      'NorthEast' => 'Apartment Lobby'
    },
    'Liberty City-East Side' => {
      'North' => 'Apartment Lobby',
      'East' => 'Evil Inc- Global HQ',
      'West' => 'Route 22',
      'NorthEast' => 'Route 69'
    },
    'Evil Inc- Global HQ' => {
      'West' => 'Liberty City-East Side',
      'In' => 'Evil Inc - Reception'
    },
    'Evil Inc - Reception' => {
      'Out' => 'Evil Inc- Global HQ'
    },
    'Liberty City General' => {
      'North' => 'Route 22'
    },
    'Route 22' => {
      'South' => 'Liberty City General',
      'North' => 'City Gate',
      'West' => 'Liberty City-West Side',
      'East' => 'Liberty City-East Side'
    },
    'Route 69' => {
      'SouthWest' => 'Liberty City-East Side',
      'NorthWest' => 'Church',
      'NorthEast' => 'Liberty City - Business District'
    },
    'Church' => {
      'Out' => 'Route 69'
    },
    'City Gate' => {
      'South' => 'Route 22'
    },
    'Liberty City-West Side' => {
      'East' => 'Route 22',
      'West' => 'Hall of Justice',
      'North' => 'Liberty University',
      'NorthEast' => 'Cafe',
      'South' => 'Route 7'
    },
    'Hall of Justice' => {
      'East' => 'Liberty City-West Side'
    },
    'Cafe' => {
      'SouthWest' => 'Liberty City-West Side'
    },
    'Liberty University' => {
      'South' => 'Liberty City-West Side'
    },
    'Route 7' => {
      'North' => 'Liberty City-West Side',
      'South' => 'Liberty City Harbor',
      'East' => 'Liberty City - Downtown'
    },
    'Liberty City Harbor' => {
      'North' => 'Route 7'
    },
    'Liberty City - Business District' => {
      'SouthWest' => 'Route 69',
      'West' => "Parker's Tower",
      'NorthWest' => 'Liberty City Tunnel',
      'North' => 'Acquerello',
      'East' => 'Liberty City Bank'
    },
    'Liberty City Bank' => {
      'West' => 'Liberty City - Business District'
    },
    'Acquerello' => {
      'South' => 'Liberty City - Business District'
    },
    "Parker's Tower" => {
      'East' => 'Liberty City - Business District'
    },
    'Liberty City Tunnel' => {
      'SouthEast' => 'Liberty City - Business District',
      'West' => 'Route 13'
    },
    'Route 13' => {
      'East' => 'Liberty City Tunnel',
      'SouthEast' => 'Police Station',
      'West' => 'Liberty City Mall',
      'North' => 'Liberty City - Downtown',
    },
    'Police Station' => {
      'NorthWest' => 'Route 13'
    },
    'Liberty City Mall' => {
      'East' => 'Route 13'
    },
    'Liberty City - Downtown' => {
      'South' => 'Route 13',
      'West' => 'Route 7',
      'NorthWest' => 'Uranus Lounge',
      'NorthEast' => 'Back Alley',
      'East' => 'Old Factory'
    },
    'Old Factory' => {
      'West' => 'Liberty City - Downtown'
    },
    'Uranus Lounge' => {
      'SouthEast' => 'Liberty City - Downtown'
    },
    'Back Alley' => {
      'SouthWest' => 'Liberty City - Downtown',
      'NorthEast' => 'Black Market'
    },
    'Black Market' => {
      'SouthWest' => 'Back Alley'
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
      go_direction_and_fight(direction)
      continue_until_unpaused
    end
  end

  def in_fight?
    page.find('#RoomTitle').text.match(/FIGHT/)
  end

  def powers_choice?
    input_menu_title = page.all('#InputMenuTitle')[0]
    input_menu_title && input_menu_title.text.match(/Use Powers/)
  end

  def in_event?
    page.find('#RoomTitle').text.match(/EVENT/)
  end

  def levelling_up?
    page.find('#RoomTitle').text.match(/Level Up/)
  end

  def go_direction_and_fight(direction)
    go_direction(direction)
    if powers_choice?
      choose_input_action('Yes')
    end
    if in_event?
      choose_room_action('EVENT DONE')
    end
    while in_fight?
      choose_self_action('Mental Blast')
    end
    continue_until_unpaused
    if levelling_up?
      choose_self_action('Power+1')
    end
  end
end

describe 'evil inc', type: :feature, js: true do
  include EvilIncHelper

  it 'can play through the game' do
    start_game('Evil-Inc')

    choose_input_action('Play Intro')
    continue_until_unpaused

    go_direction('In')
    act_on_character('Penny the Secretary', 'Talk')
    continue_until_unpaused

    go_direction('East')
    choose_room_action('Select Floor')
    choose_input_action('50th: Top Floor')
    go_direction('West')
    continue_until_unpaused
    go_direction('North')
    continue_until_unpaused

    act_on_object('Old desk and chair', 'Take Test')
    continue_until_unpaused

    fill_in_text_input 'johnny'
    continue_until_unpaused

    fill_in_text_input 'incorrectly'
    continue_until_unpaused

    fill_in_text_input 'meat'
    continue_until_unpaused

    act_on_character('Dr. Evil', 'Talk')
    continue_until_unpaused

    act_on_character('Dr. Evil', 'Ask')
    choose_input_action('You dont sound too freaked')
    continue_until_unpaused

    act_on_character('Dr. Evil', 'Ask')
    choose_input_action('Why go after the Justice Force')
    continue_until_unpaused

    act_on_object('Vibranium Ring', 'Take')
    act_on_object('Equipment (closed)', 'Take')
    act_on_object('Equipment (closed)', 'Open')
    act_on_object('Vibranium Ring', 'Equip')
    continue_until_unpaused
    choose_input_action('Yes')
    choose_self_action('Power+1')
    choose_self_action('Focus+1')
    choose_self_action('Stealth+1')

    act_on_character('Dr. Evil', 'Ask')
    choose_input_action("I've got no more questions")
    continue_until_unpaused

    go_to_room("Emily's Apartment")
    act_on_character('Emily', 'Hang out')
    continue_until_unpaused

    go_to_room('Evil Inc - Reception')
    act_on_character('Penny the Secretary', 'Talk')
    act_on_character('Penny the Secretary', 'Ask')
    choose_input_action('Do you know where I can find')

    go_direction('East')
    choose_room_action('Select Floor')
    choose_input_action('B1: Security Level')
    go_direction('West')
    continue_until_unpaused
    act_on_character('Dr. Evil', 'Talk')
    go_direction('South')
    act_on_character('Vadar', 'Talk')
    continue_until_unpaused
    act_on_character('Vadar', 'Ask')
    choose_input_action('Heist?')

    act_on_object('Security Badge', 'Take')

    go_direction('North')
    act_on_character('Mini Me', 'Show me to my lab')
    continue_until_unpaused

    act_on_character('Mini Me', 'Do Something')
    choose_input_action('Change desiers')
    continue_until_unpaused
    choose_self_action('Give order')
    choose_input_action('Mini Me - Stop Humping Me')
    continue_until_unpaused
    go_direction('North')
    continue_until_unpaused
    choose_self_action('Power+1')

    act_on_object('Lab Computer', 'Check Email')
    choose_input_action('List O\' Names')
    continue_until_unpaused
    go_direction('South')
    continue_until_unpaused
    act_on_character('Yes Man', 'Go to hospital?')
    continue_until_unpaused
    act_on_character('Dr. Aaron Hart', 'Talk')
    act_on_character('Dr. Aaron Hart', 'Heal?')
    continue_until_unpaused

    set_game_variable('Money', 200000)
    freeze_game_variable('energy')
    freeze_game_variable('health')

    go_to_room('Black Market')
    [
        'Thick Rubber Gloves',
        'Heavy Duty Lab Coat',
        'Steel Toe Boots',
        'Cloaking Device',
        'Force Field'
    ].each do |item|
      act_on_character('Shady Dealer', 'Talk')
      choose_input_action('Armor')
      choose_input_action(item)
      choose_input_action('Yes')
      act_on_object(item, 'Take')
      act_on_object(item, 'Equip')
    end

    go_to_room('Liberty University')
  end
end