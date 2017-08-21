module TheSinnerHelper
  GAME_MAP = {
    'South-Eastern Crossroad' => {
      'NorthWest' => "In front of Alberston's house",
      'North' => 'First Mid-Eastern Crossroad',
      'NorthEast' => 'SW F Coxes house',
      'SouthEast' => "Rachel Hollinse's house",
      'SouthWest' => 'In front of my house',
      'West' => 'Mid-South Crossroad'
    },
    'Mid-South Crossroad' => {
      'NorthWest' => 'In front of supermarket',
      'North' => 'Liberty Square',
      'NorthEast' => 'In front of a Bar',
      'East' => 'South-Eastern Crossroad',
      'SouthEast' => "In front of Bolder's house",
      'SouthWest' => "In front of Jewel's house"
    },
    'South-West Crossroad' => {
      'North' => 'Mid-West Crossroad',
      'East' => 'Mid-South Crossroad',
      'NorthEast' => 'In front of the church',
      'SouthEast' => 'In front of the graveyard'
    },
    'Mid-West Crossroad' => {
      'NorthWest' => 'ME F Williams house',
      'NorthEast' => 'ME F Museum',
      'South' => 'South-West Crossroad',
      'East' => 'Liberty Square',
      'SouthEast' => 'ME F Abandoned house'
    },
    'Liberty Square' => {
      'NorthWest' => 'In front of the University',
      'NorthEast' => 'Library',
      'East' => 'First Mid-Eastern Crossroad',
      'SouthEast' => 'In front of Park',
      'South' => 'Mid-South Crossroad',
      'SouthWest' => 'In front of Police Station',
      'West' => 'Mid-West Crossroad'
    },
    'First Mid-Eastern Crossroad' => {
      'NorthWest' => "In front of Kingston's house",
      'NorthEast' => 'In front of Old Lighthouse',
      'SouthEast' => 'Seafront',
      'South' => 'South-Eastern Crossroad',
      'SouthWest' => "In front of Jefferson's house",
      'West' => 'Liberty Square'
    },
    'Your House' => {
      'Out' => 'In front of my house'
    },
    'In front of my house' => {
      'In' => 'Your House',
      'NorthEast' => 'South-Eastern Crossroad'
    },
    "Rachel Hollinse's house" => {
      'SouthWest' => 'South-Eastern Crossroad'
    },
    'SW F Coxes house' => {
      'SouthWest' => 'South-Eastern Crossroad',
      'In' => 'SW Cox house'
    },
    'SW Cox house' => {
      'Out' => 'SW F Coxes house'
    },
    "In front of Alberston's house" => {
      'SouthEast' => 'South-Eastern Crossroad'
    },
    'In front of supermarket' => {
      'SouthEast' => 'Mid-South Crossroad'
    },
    'In front of a Bar' => {
      'SouthWest' => 'Mid-South Crossroad'
    },
    "In front of Bolder's house" => {
      'NorthWest' => 'Mid-South Crossroad'
    },
    "In front of Jewel's house" => {
      'NorthEast' => 'Mid-South Crossroad'
    },
    'In front of the church' => {
      'SouthWest' => 'South-West Crossroad',
      'In' => 'Church'
    },
    'Church' => {
      'Out' => 'In front of the church'
    },
    'In front of the graveyard' => {
      'NorthWest' => 'South-West Crossroad',
      'In' => 'Graveyard'
    },
    'Graveyard' => {
      'Out' => 'In front of the graveyard'
    },
    'ME F Williams house' => {
      'SouthEast' => 'Mid-West Crossroad'
    },
    'ME F Museum' => {
      'SouthWest' => 'Mid-West Crossroad'
    },
    'ME F Abandoned house' => {
      'NorthWest' => 'Mid-West Crossroad'
    },
    'In front of the University' => {
      'SouthEast' => 'Liberty Square',
      'In' => 'University Entrance'
    },
    'University Entrance' => {
      'Out' => 'In front of the University'
    },
    'Library' => {
      'SouthWest' => 'Liberty Square',
      'In' => 'Reception'
    },
    'Reception' => {
      'Out' => 'Library'
    },
    'In front of Park' => {
      'NorthWest' => 'Liberty Square',
      'In' => 'Park'
    },
    'Park' => {
      'Out' => 'In front of Park'
    },
    'In front of Police Station' => {
      'NorthEast' => 'Liberty Square'
    },
    "In front of Kingston's house" => {
      'SouthEast' => 'First Mid-Eastern Crossroad'
    },
    'In front of Old Lighthouse' => {
      'SouthWest' => 'First Mid-Eastern Crossroad'
    },
    'Seafront' => {
      'NorthWest' => 'First Mid-Eastern Crossroad'
    },
    "In front of Jefferson's house" => {
      'NorthEast' => 'First Mid-Eastern Crossroad'
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
    start_game 'TheSinner'

    act_on_object 'Game', 'Start New Game (Skip entry)'
    continue_until_unpaused

    import_savegames(savegames_filename)
  end

  def current_hour
    page.find('#statusbartext').text.match(/(\d\d):(\d\d)/)[1].to_i
  end

  def wait_until_hour(hour)
    if hour < current_hour
      raise 'Cannot wait for past hour'
    end
    hours_to_wait = hour.to_i - current_hour

    while hours_to_wait > 0
      if hours_to_wait >= 6
        act_on_self 'Add 6 hours'
        hours_to_wait -= 6
      else
        act_on_self 'Wait an hour'
        hours_to_wait -= 1
      end
    end
  end
end

describe 'the sinner', type: :feature, js: true do
  include TheSinnerHelper

  it 'can play through the game' do
    start_game 'TheSinner'

    act_on_object 'Game', 'Start new game'
    continue_until_unpaused
    fill_in 'textinput', with: 'TestPlayer'
    click_on 'textbutton'

    continue_until_unpaused
    go_to_room 'SW F Coxes house'
    act_on_character 'Buffi', 'Kick the beast!'

    go_to_room 'Mid-South Crossroad'
    act_on_object 'litter bin', 'Kick'

    go_to_room 'In front of supermarket'
    act_on_room 'Draw a dick'
    continue_until_unpaused

    go_to_room 'Church'
    act_on_object 'basin holy water', 'Wash your hands'

    go_to_room 'Graveyard'
    act_on_room 'Pee'

    go_to_room 'ME F Abandoned house'
    act_on_room 'Throw a stone'

    go_to_room 'In front of the University'
    act_on_object 'mobile', 'Install porn image'
    continue_until_unpaused

    go_direction 'West'
    act_on_room 'Peep'
    continue_until_unpaused
    go_direction 'East'

    go_to_room 'Reception'
    go_direction 'NorthEast'
    act_on_room 'Search'
    act_on_object 'Book about Sherlock Holmes', 'Tear out a page'
    continue_until_unpaused
    go_direction 'SouthWest'

    go_to_room 'Liberty Square'
    act_on_object 'Page', 'Throw it out'

    go_to_room 'Park'
    act_on_object 'ball', 'Kick it'

    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    go_to_room 'In front of the University'
    go_direction 'In'
    continue_until_unpaused
    choose_input_action 'Lie: I am a new intern'

    go_to_room 'Library'
    go_direction 'In'
    go_direction 'NorthEast'
    act_on_character 'Student in the Library', 'Offer your help'
    act_on_character 'Student in the Library', 'Suggest a book'
    choose_input_action 'Lie: suggest'
    continue_until_unpaused

    go_to_room 'SW Cox house'
    act_on_character 'Chloe Cox', 'Examine'
    act_on_character 'Chloe Cox', 'Talk'
    choose_input_action 'Lie'
    continue_until_unpaused

    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'SW Cox house'
    act_on_character 'Chloe Cox', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Can Curt read?'
    continue_until_unpaused

    go_to_room 'Liberty Square'

    wait_until_hour 10
    go_to_room 'University Entrance'

    act_on_character 'Scarlett Jefferson', 'Examine'
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Ask about the party'

    go_to_room 'Mid-South Crossroad'
    wait_until_hour 12
    act_on_character 'Olivia Osborne', 'Examine'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Chat'

    go_to_room 'Mid-West Crossroad'
    wait_until_hour 16
    go_to_room 'ME F Williams house'
    act_on_room 'Peep'
    continue_until_unpaused

    go_to_room 'Liberty Square'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Lie'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'Liberty Square'
    wait_until_hour 10 
    go_to_room 'University Entrance'

    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Chat'
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Have you no fear of God?'
    continue_until_unpaused
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Bribe Olivia'
    continue_until_unpaused

    go_to_room 'Seafront'
    act_on_character 'Layla Jefferson', 'Examine'
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'Chat'
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'You are a bitch!'
    continue_until_unpaused

    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    go_to_room 'Mid-South Crossroad'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Ask about "mission"'
    continue_until_unpaused
    act_on_character 'Olivia Osborne', 'Cast: Read Sins'
    continue_until_unpaused

    wait_until_hour 20
    go_to_room 'First Mid-Eastern Crossroad'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Lets go to watch a movie'
    continue_until_unpaused

    go_to_room 'Liberty Square'
    wait_until_hour 10
    go_to_room 'University Entrance'
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Olivia allows the party!'
    continue_until_unpaused

    go_to_room 'Seafront'
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'Can I come to the party?'
    continue_until_unpaused

    go_to_room 'First Mid-Eastern Crossroad'
    wait_until_hour 13
    go_to_room "In front of Kingston's house"
    act_on_room 'Spy on the house'
    act_on_object 'wad of cash', 'Give'
    choose_input_action 'A guy'
    continue_until_unpaused
    go_direction 'In'
    continue_until_unpaused
    act_on_object 'Figurine', 'Steal'
    continue_until_unpaused
    go_direction 'North'
    act_on_object 'camera', 'Steal'
    continue_until_unpaused
    go_direction 'South'
    go_direction 'Out'

    go_to_room 'In front of Old Lighthouse'
    go_direction 'In'
    act_on_room 'Spy on Kingstones'
    act_on_room 'Spy on Kingstones'
    act_on_room 'Spy on Kingstones'
    act_on_room 'Spy on Kingstones'
    continue_until_unpaused
    go_direction 'Out'

    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'First Mid-Eastern Crossroad'
    wait_until_hour 10
    go_to_room 'Seafront'
    act_on_object 'nasty photos', 'Give'
    choose_input_action 'Layla Jefferson'
    continue_until_unpaused

    go_to_room "In front of Alberston's house"
    go_direction 'In'
    act_on_character 'Ann Alberstone', 'Examine'
    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'You should relax'
    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'Lets go to the party'
    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Do not tell your mom'
    continue_until_unpaused
    go_direction 'Out'

    go_direction 'SouthEast'
    wait_until_hour 20
    go_direction 'NorthWest'
    go_direction 'In'
    go_direction 'NorthEast'
    act_on_character 'Ann Alberstone', 'Go to the party'

    # Stall until drinking contest
    act_on_character 'Ann Alberstone', 'Examine'
    act_on_character 'Ann Alberstone', 'Examine'
    act_on_character 'Ann Alberstone', 'Examine'
    act_on_character 'Ann Alberstone', 'Examine'
    choose_input_action 'Yes'
    continue_until_unpaused
    choose_input_action 'The fifth one'
    continue_until_unpaused
    %w(Vodka Tequila Gin Absinthe).each do |drink|
      choose_input_action drink
      continue_until_unpaused
    end
    choose_input_action 'No'
    continue_until_unpaused

    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'You should relax'
    continue_until_unpaused

    go_direction 'Out'
    wait_until_hour 22
    go_to_room 'Seafront'
    go_direction 'East'
    act_on_room 'Peep'
    continue_until_unpaused
    act_on_object 'sexy dress', 'Steal'
    go_direction 'West'

    go_to_room "In front of Jefferson's house"
    go_direction 'In'
    act_on_object 'sexy dress', 'Give'
    choose_input_action 'Ann Alberstone'
    continue_until_unpaused

    act_on_character 'Shady Guy', 'Talk'
    act_on_character 'Shady Guy', 'Ask for a joint'

    act_on_object 'joint', 'Give'
    choose_input_action 'Ann Alberstone'
    continue_until_unpaused
    act_on_character 'Ann Alberstone', 'Cast: Induce her to sin'
    choose_input_action 'Lust'
    continue_until_unpaused

    act_on_self 'Learn'
    continue_until_unpaused
  end
end