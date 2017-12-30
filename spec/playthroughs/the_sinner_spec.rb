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
      "NorthWest" => "In front of the bikers' camp",
      'North' => 'Mid-West Crossroad',
      'East' => 'Mid-South Crossroad',
      'NorthEast' => 'In front of the church',
      'SouthEast' => 'In front of the graveyard',
      'SouthWest' => 'In front of the farm'
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
      'NorthEast' => 'Library [LS F Library]',
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
      'In' => "Rachel Hollinse's house",
      'NorthWest' => 'South-Eastern Crossroad'
    },
    'SW Rachel house' => {
      'Out' => "Rachel Hollinse's house",
      'North' => "Rachel's house. Bedroom"
    },
    "Rachel's house. Bedroom" => {
      'South' => 'SW Rachel house'
    },
    'SW F Coxes house' => {
      'SouthWest' => 'South-Eastern Crossroad',
      'In' => 'SW Cox house'
    },
    'SW Cox house' => {
      'Out' => 'SW F Coxes house'
    },
    "In front of Alberston's house" => {
      'SouthEast' => 'South-Eastern Crossroad',
      'In' => "Alberstone's house"
    },
    "Alberstone's house" => {
      'Out' => 'In front of Alberston\'s house'
    },
    'In front of supermarket' => {
      'SouthEast' => 'Mid-South Crossroad',
      'In' => 'Supermarket'
    },
    'Supermarket' => {
      'Out' => 'In front of supermarket'
    },
    'In front of a Bar' => {
      'SouthWest' => 'Mid-South Crossroad',
      'In' => 'Bar'
    },
    'Bar' => {
      'Out' => 'In front of a Bar'
    },
    "In front of Bolder's house" => {
      'NorthWest' => 'Mid-South Crossroad'
    },
    "In front of Jewel's house" => {
      'NorthEast' => 'Mid-South Crossroad',
      'In' => 'Jewel\'s house'
    },
    "Jewel's house" => {
      'Out' => "In front of Jewel's house"
    },
    "In front of the bikers' camp" => {
      "SouthEast" => "South-West Crossroad",
      "In" => "Biker's camp"
    },
    "Biker's camp" => {
      "North" => "Immortals' camp",
      "East" => "Unruly's camp",
      "South" => "Biker gym",
      "West" => "Dragon rider's camp",
      "Out" => "In front of the bikers' camp"
    },
    "Dragon rider's camp" => {
      "East" => "Biker's camp"
    },
    "Immortals' camp" => {
      "South" => "Biker's camp"
    },
    "Unruly's camp" => {
      "West" => "Biker's camp"
    },
    "Biker gym" => {
      "North" => "Biker's camp"
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
    'In front of the farm' => {
      'NorthEast' => 'South-West Crossroad'
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
      'West' => "University's Sport Ground",
      'In' => 'University Entrance'
    },
    "University's Sport Ground" => {
      'East' => 'In front of the University'
    },
    'University Entrance' => {
      'Out' => 'In front of the University'
    },
    'Library [LS F Library]' => {
      'SouthWest' => 'Liberty Square',
      'In' => 'Reception'
    },
    'Reception' => {
      'Out' => 'Library [LS F Library]',
      'NorthEast' => 'Library [LS Library]'
    },
    'Library [LS Library]' => {
      'SouthWest' => 'Reception'
    },
    'In front of Park' => {
      'NorthWest' => 'Liberty Square',
      'In' => 'Park'
    },
    'Park' => {
      'North' => 'Deeper Park',
      'Out' => 'In front of Park'
    },
    'Deeper Park' => {
      'South' => 'Park'
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
    "Seafront" => {
      "NorthWest" => "First Mid-Eastern Crossroad",
      "East" => "Beach"
    },
    "Beach" => {
      "West" => "Seafront"
    },
    "In front of Jefferson's house" => {
      'NorthEast' => 'First Mid-Eastern Crossroad',
      'In' => "Jefferson's house"
    },
    "Jefferson's house" => {
      'Out' => "In front of Jefferson's house",
      'West' => 'Pool'
    },
    'Pool' => {
      'East' => "Jefferson's house"
    }
  }

  def navigator
    @navigator ||= Navigator.new(GAME_MAP)
  end

  def go_to_room(destination_room)
    current_room = page.find('#RoomTitle').text
    if current_room == 'Library'
      fancy_room_name = page.evaluate_script('Finder.room(TheGame.Player.CurrentRoom).Name')
      current_room = "Library [#{fancy_room_name}]"
    end

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
    choose_input_action 'Easy (+5 points per sin)'
    continue_until_unpaused

    import_savegames(savegames_filename)
  end

  def current_time
    time_match = page.find('#statusbartext').text.match(/(\d\d):(\d\d)/)
    {
      hour: time_match[1].to_i,
      minute: time_match[2].to_i
    }
  end

  def current_minute
    page.find('#statusbartext').text.match(/(\d\d):(\d\d)/)[2].to_i
  end

  def wait_until_hour(hour)
    if hour < current_time[:hour]
      raise 'Cannot wait for past hour'
    end
    if current_time[:minute] != 0
      (current_time[:minute] / 10).times { act_on_self 'Wait 10 minutes' }
    end
    hours_to_wait = hour.to_i - current_time[:hour]

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

  def buy_alcohol(alcohol)
    act_on_character 'Katie Jewel', 'Buy alcoholic beverage'
    choose_input_action alcohol
    continue_until_unpaused

    go_direction 'Out'
    # Guy who wants to steal your bottle from the bar (random)
    if page.first('#inputmenu', text: 'Answer to him')
      choose_input_action 'Lie: Distruct the guy'
      choose_input_action 'Smash the bottle on his head'
      continue_until_unpaused
      go_to_room 'Bar'
      act_on_character 'Katie Jewel', 'Buy alcoholic beverage'
      choose_input_action alcohol
      continue_until_unpaused
    else
      go_to_room 'Bar'
    end
  end
end

# Tested with TheSinner 0.17
describe 'the sinner', type: :feature, js: true do
  let!(:image_reporter) { ImageReporter.new('TheSinner', page) }

  include TheSinnerHelper

  it 'successfully blocks entry into the university when you do not have the right powers' do
    # this is implemented as a CT_CANCELMOVE that happens during a timer, and has
    # regressed a whole bunch of times, so the test will try to ensure it does not regress again

    start_game 'TheSinner'

    act_on_object 'Game', 'Start new game'
    continue_until_unpaused
    fill_in_text_input 'TestPlayer'
    continue_until_unpaused

    go_to_room 'In front of the University'
    go_direction 'In'
    continue_until_unpaused
    choose_input_action 'I just need to get in'
    expect(page.find('#RoomTitle').text.strip).to eq('In front of the University')
  end

  it 'can play through the game' do
    start_game 'TheSinner'

    act_on_object 'Game', 'Start new game'
    continue_until_unpaused
    fill_in_text_input 'TestPlayer'
    # choose_input_action 'Normal (+2 points per sin)'
    choose_input_action 'Easy (+5 points per sin)'
    continue_until_unpaused

    # Gain the first level of 'Bad Boy'
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

    go_to_room "University's Sport Ground"
    act_on_room 'Peep'
    continue_until_unpaused

    go_to_room 'Library [LS Library]'
    act_on_room 'Search'
    act_on_object 'Book about Sherlock Holmes', 'Tear out a page'
    continue_until_unpaused

    go_to_room 'Liberty Square'
    act_on_object 'Page', 'Throw it out'

    go_to_room 'Park'
    act_on_object 'ball', 'Kick it'

    # Learn 'Lie'
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    # Lie into University
    go_to_room 'In front of the University'
    go_direction 'In'
    continue_until_unpaused
    choose_input_action 'Lie: I am a new intern'

    # Lie about books
    go_to_room 'Library [LS Library]'
    act_on_character 'Student in the Library', 'Offer your help'
    act_on_character 'Student in the Library', 'Suggest a book'
    choose_input_action 'Lie: suggest'
    continue_until_unpaused

    # Lie to Chloe
    go_to_room 'SW Cox house'
    act_on_character 'Chloe Cox', 'Examine'
    act_on_character 'Chloe Cox', 'Talk'
    choose_input_action 'Lie'
    continue_until_unpaused

    # Learn about Wendy
    go_to_room 'In front of the graveyard'
    act_on_character 'Wendy', 'Examine'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Introduce yourself'
    act_on_character 'Wendy', 'Prove that you are cool'
    choose_input_action 'Lie: rap'
    continue_until_unpaused
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Chat'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'What are you doing here?'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'What are you cool at?'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Everyone can draw graffiti'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Learn about Katie
    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Buy a cup of coffee'
    continue_until_unpaused
    choose_input_action 'Lie: shrug'
    continue_until_unpaused
    act_on_character 'Katie Jewel', 'Examine'
    act_on_character 'Katie Jewel', 'Talk'
    choose_input_action 'What do you sell?'

    # Learn 'Egg On'
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    # Egg on Chloe
    go_to_room 'SW Cox house'
    act_on_character 'Chloe Cox', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Can Curt read?'
    continue_until_unpaused

    # Start learning about the party
    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_character 'Scarlett Jefferson', 'Examine'
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Ask about the party'

    # Start talking to Olivia
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 12
    act_on_character 'Olivia Osborne', 'Examine'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Chat'

    # Learn about the Williams sex lives
    go_to_room 'Mid-West Crossroad'
    wait_until_hour 16
    go_to_room 'ME F Williams house'
    act_on_room 'Peep'
    continue_until_unpaused

    # Get Olivia to observe the Williams
    go_to_room 'Liberty Square'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Lie'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Get Scarlett thinking about bribes
    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Chat'
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Have you no fear of God?'
    continue_until_unpaused
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Bribe Olivia'
    continue_until_unpaused

    # Start talking to Layla
    go_to_room 'Seafront'
    act_on_character 'Layla Jefferson', 'Examine'
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'Chat'
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'You are a bitch!'
    continue_until_unpaused

    # Learn 'Thievery'
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    # Get Olivia on board with the party
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

    # Tell Scarlett that Olivia is on board
    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Olivia allows the party!'
    continue_until_unpaused

    # Ask Layla about the party
    go_to_room 'Seafront'
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'Can I come to the party?'
    continue_until_unpaused

    # Take photos of the Kingstones
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
    until (continue_button = page.all('#Continue', visible: true)[0])
      act_on_room 'Spy on Kingstones'
    end
    continue_until_unpaused
    go_direction 'Out'

    # Learn 'Drinking'
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Increase Rose's sin
    go_to_room "Alberstone's house"
    act_on_character 'Rose Alberstone', 'Examine'
    act_on_character 'Rose Alberstone', 'Talk'
    choose_input_action 'Lie: It is too muddy for jogging'
    continue_until_unpaused
    act_on_character 'Rose Alberstone', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Skip the housework.'
    continue_until_unpaused
    act_on_character 'Rose Alberstone', 'Cast: Read sins'

    # Give Kingstones photos to Layla
    go_to_room 'First Mid-Eastern Crossroad'
    wait_until_hour 10
    go_to_room 'Seafront'
    act_on_object 'nasty photos', 'Give'
    choose_input_action 'Layla Jefferson'
    continue_until_unpaused

    # Get Ann to come to the party
    go_to_room "Alberstone's house"
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
    Timeout.timeout(5) do
      while page.all('#inputmenu', visible: true).length == 0
        act_on_character 'Ann Alberstone', 'Examine'
      end
    end
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

    # Get Ann to show off at the party
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

    # Learn 'Fighting'
    act_on_self 'Learn'
    continue_until_unpaused

    # Learn about Norma and Angela
    go_to_room 'Library [LS Library]'
    act_on_character 'Angela Colbert', 'Examine'
    act_on_character 'Angela Colbert', 'Talk'
    choose_input_action 'Tell me about Norma'
    continue_until_unpaused
    act_on_character 'Angela Colbert', 'Talk'
    choose_input_action 'Do you like your job?'
    continue_until_unpaused
    act_on_character 'Angela Colbert', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Leave earlier'
    continue_until_unpaused

    # Learn about Rubi
    go_to_room 'Deeper Park'
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Introduce yourself'
    continue_until_unpaused
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Do you like reading?'
    continue_until_unpaused

    # Learn about Vanessa and get her figurine
    go_to_room 'In front of Park'
    act_on_self 'Wait an hour'
    go_to_room 'Park'
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Introduce yourself'
    continue_until_unpaused
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Where do you live?'
    continue_until_unpaused
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Why are you so sad?'
    continue_until_unpaused
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Ask about "the gods".'
    continue_until_unpaused
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Do you worship some gods?'
    continue_until_unpaused

    go_to_room 'Your House'
    act_on_self 'Next Day'
    continue_until_unpaused

    # Ask Angela about sexy books
    go_to_room 'Library [LS Library]'
    act_on_character 'Angela Colbert', 'Talk'
    choose_input_action 'Ask about the figurine.'
    continue_until_unpaused
    act_on_character 'Angela Colbert', 'Talk'
    choose_input_action 'Access to erotic books for Rubi'
    continue_until_unpaused

    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Buy the pastry'

    # Increase Angela's sins
    go_to_room 'Library [LS Library]'
    act_on_object 'big pack of pastry', 'Give'
    choose_input_action 'Angela Colbert'
    continue_until_unpaused
    act_on_character 'Angela Colbert', 'Cast: Read sins'

    # Tell Rubi about sexy books
    go_to_room 'Deeper Park'
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Did you like the books in the library?'
    continue_until_unpaused
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Read something hotter.'
    continue_until_unpaused
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Were you able to "borrow" an interesting book?'
    continue_until_unpaused

    go_to_room 'In front of the farm'
    choose_input_action 'Wait while the leader turns away and then hit him hard'

    # Start Chloe's seduction
    go_to_room 'SW Cox house'
    act_on_character 'Chloe Cox', 'Cast: Read sins'
    continue_until_unpaused
    act_on_object 'curtain', 'Steal: Open the curtain carefully.'
    continue_until_unpaused

    # Learn about Vanessa's figurine
    go_to_room 'University Entrance'
    go_direction 'NorthEast'
    act_on_character 'Helen Coombs', 'Examine'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'Ask about figurine.'
    continue_until_unpaused
    go_direction 'SouthWest'

    # Learn next steps for Vanessa
    go_to_room 'Park'
    act_on_object 'Dagon figurine', 'Give'
    choose_input_action 'Vanessa Hadwin'
    continue_until_unpaused
    act_on_character 'Vanessa Hadwin', 'Cast: Read sins'
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Ask about supernatural.'
    continue_until_unpaused

    # Get witchcraft book for Vanessa
    go_to_room 'Library [LS Library]'
    act_on_character 'Angela Colbert', 'Talk'
    choose_input_action 'Ask about access to old books'
    continue_until_unpaused
    act_on_room 'Search'
    act_on_object 'witchcraft book', 'Steal'
    go_direction 'SouthEast'
    go_direction 'NorthEast'
    act_on_character 'Angela Colbert', 'Talk'
    choose_input_action 'Tell me about Norma'
    continue_until_unpaused

    go_to_room 'SW F Coxes house'
    act_on_room 'Peep'
    continue_until_unpaused

    # Get Vodka for Norma
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 19
    go_to_room 'Bar'
    buy_alcohol 'Vodka'

    # Increase Layla's sin
    go_to_room 'Jefferson\'s house'
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'Lets drink!'
    choose_input_action 'For the cool party!'
    choose_input_action 'For you!'
    choose_input_action 'Let the Kingston bitch burn!'
    choose_input_action 'For good sex!'
    choose_input_action 'For the Queen of the Party!'
    continue_until_unpaused
    act_on_room 'Press the handle harder to get inside'
    continue_until_unpaused
    act_on_character 'Layla Jefferson', 'Cast: Read sins'
    continue_until_unpaused
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Who is the best sucker?'
    continue_until_unpaused

    go_direction 'North'
    act_on_character 'Isabel Jefferson', 'Search'
    go_direction 'South'

    # Compromise Norma
    go_to_room 'Liberty Square'
    wait_until_hour 21
    go_to_room 'Reception'
    act_on_character 'Norma Rowbottom', 'Compromise her'
    continue_until_unpaused

    # Get Ann to blow Quincy
    go_to_room "Alberstone's house"
    act_on_character 'Ann Alberstone', 'Cast: Read sins'

    go_to_room 'Library [LS Library]'
    act_on_room 'Search'
    act_on_object 'sex manual', 'Take'

    go_to_room 'University Entrance'
    go_direction 'NorthWest'

    act_on_character 'Quincy Robson', 'Examine'
    act_on_character 'Quincy Robson', 'Talk'
    act_on_character 'Quincy Robson', 'Cast: Read Sins'
    continue_until_unpaused
    go_direction 'SouthEast'

    go_to_room "Alberstone's house"
    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'Chat'
    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'There is a way...'
    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Blowjob for Quincy'
    continue_until_unpaused

    act_on_character 'Scarlett Jefferson', 'Cast: Read sins'

    # Learn about Joe
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'Introduce yourself'
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'Who is the best?'
    choose_input_action 'Rubi Patterson'
    continue_until_unpaused

    # Learn about Layla's phone
    go_to_room 'Seafront'
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'Chat'
    continue_until_unpaused

    # Ask around for Layla's phone
    go_to_room 'University Entrance'
    wait_until_hour 13
    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'Ask about Layla\'s phone'
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Ask about Layla\'s phone'
    act_on_character 'Creig Bolder', 'Ask about Layla\'s phone'
    continue_until_unpaused

    # Learn 'Burgling'
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    # Get Layla's phone and finish her seduction
    go_to_room 'Jefferson\'s house'
    act_on_room 'Burglary: Go to Scarlett\'s bedroom'
    act_on_object 'Wardrobe', 'Open'
    act_on_object 'Layla\'s mobile', 'watch photos'
    continue_until_unpaused
    act_on_object 'Layla\'s mobile', 'Take'
    continue_until_unpaused
    go_direction 'SouthWest'
    go_direction 'West'
    act_on_object 'Layla\'s mobile', 'Give'
    choose_input_action 'Layla Jefferson'
    continue_until_unpaused
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_input_action 'Layla'
    continue_until_unpaused

    go_to_room 'University Entrance'
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'Go to park with Lara'
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'You are a bookworm'
    continue_until_unpaused

    # Get Rubi to steal a book
    go_to_room 'Liberty Square'
    wait_until_hour 18
    go_to_room 'Library [LS Library]'
    act_on_character 'Angela Colbert', 'Cast: Read sins'
    continue_until_unpaused
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Were you able to "borrow" an interesting book?'
    continue_until_unpaused

    # Wendy's Graffiti Quest
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 22
    go_to_room 'Bar'
    act_on_character 'Wendy', 'Make graffiti'
    continue_until_unpaused
    choose_input_action 'Lie: I fucked my own sister'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused


    # Add to Rose's sins with Ann's Sex Manual
    go_to_room 'Alberstone\'s house'
    go_direction 'NorthEast'
    act_on_object 'Wardrobe', 'Hide Sex Manual'
    go_direction 'SouthWest'
    act_on_character 'Rose Alberstone', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Tell Rose about a book in Ann\'s wardrobe.'
    continue_until_unpaused
    act_on_character 'Rose Alberstone', 'Cast: Read sins'
    continue_until_unpaused

    # Add to Joe's sins
    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'Chat'
    continue_until_unpaused

    act_on_object 'Door to the Herodotus Class', 'Skill: Burglary'
    continue_until_unpaused
    act_on_object 'Door to the Herodotus Class', 'Open'
    go_direction 'North'
    go_direction 'South'
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'Tell Joe about unlocked room'
    continue_until_unpaused
    go_direction 'Out'

    # Start Wendy's darts quest
    go_to_room 'In front of the graveyard'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Where are your parents?'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Ask about her dad\'s death'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Ask about her mother'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'I do not believe that your mother is such a whore'
    continue_until_unpaused
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Darts challenge'
    continue_until_unpaused

    # Get Rose more riled up
    wait_until_hour 12
    go_to_room 'Supermarket'
    act_on_character 'Rose Alberstone', 'Cast: Induce to sin'
    choose_input_action 'Stealing'
    continue_until_unpaused

    # Find what's on Chloe's laptop
    go_to_room 'SW F Coxes house'
    act_on_character 'Buffi', 'Attach empty cans'
    continue_until_unpaused
    act_on_room 'Burglary'
    go_to_room 'SW Cox house'
    act_on_object 'laptop', 'Check Browser history'
    continue_until_unpaused

    # Complete Rose's seduction
    go_to_room 'In front of Alberston\'s house'
    wait_until_hour 14
    act_on_room 'Peep'
    continue_until_unpaused
    act_on_room 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused
    go_to_room "Alberstone's house"
    act_on_character 'Rose Alberstone', 'Cast: Irresistible lust'
    choose_first_input_action 'Rose'
    continue_until_unpaused

    # Learn Advanced Sex
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    # Beat Wendy at Darts
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 21
    go_to_room 'Bar'
    act_on_character 'Wendy', 'Play Darts'
    choose_input_action 'Yes'
    continue_until_unpaused
    # Cheeze the score to zero to avoid having to randomly play over and over
    set_game_variable('WendyDartsScoreYou', 0)
    choose_input_action 'Just throw (10% / 10% / 60%)'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Start Rachel's seduction
    go_to_room 'Park'
    act_on_character 'Rachel Hollinse', 'Examine'
    act_on_character 'Rachel Hollinse', 'Talk'
    choose_input_action 'Chat'
    go_to_room 'Liberty Square'
    go_to_room 'Park'
    act_on_character 'Rachel Hollinse', 'Talk'
    choose_input_action 'Go-Go-Go!'
    continue_until_unpaused

    # Start Lara's sins
    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_character 'Lara Jewel', 'Examine'
    act_on_object 'Pastry', 'Give'
    choose_input_action 'Lara Jewel'
    act_on_character 'Lara Jewel', 'Talk'
    choose_input_action 'Lie: This pastry is fat-free'
    continue_until_unpaused

    # Plan Vanessa's ritual
    act_on_object 'witchcraft book', 'Give'
    choose_input_action 'Vanessa Hadwin'
    continue_until_unpaused
    act_on_character 'Lara Jewel', 'Talk'
    choose_input_action 'Ask about taking part in a witchcraft ritual.'
    continue_until_unpaused
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Ask about taking part in a witchcraft ritual.'
    continue_until_unpaused
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Rubi and Lara are on board.'
    continue_until_unpaused

    # Start Chloe's laptop actions
    go_to_room 'Your House'
    wait_until_hour 13

    act_on_object 'laptop', 'Go to BDSM site'
    choose_input_action 'Polite "hello"'
    choose_input_action 'Simple chat'
    choose_input_action 'Ask for preferences'
    continue_until_unpaused
    choose_input_action 'Start an action'
    choose_input_action 'Submission'
    choose_input_action 'Use her'
    continue_until_unpaused
    choose_input_action 'Fuck her brains out'
    choose_input_action 'Intensive play'
    continue_until_unpaused

    # Watch Vanessa's ritual
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 21
    go_to_room "Jewel's house"
    act_on_character 'Lara Jewel', 'Meet Vanessa and Rubi'
    continue_until_unpaused
    # Cheeze the statue-finding mission by setting a particular destination (VVV_H8)
    set_game_variable('fountainDir', '1')
    set_game_variable('StatueDir', '1')
    set_game_variable('GraffitiDir', '1')
    go_direction 'East'
    go_direction 'North'
    go_direction 'NorthEast'
    act_on_room 'Peep'
    continue_until_unpaused

    # Learn Vanessa's and friends next steps
    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'How was the ritual?'
    act_on_character 'Vanessa Hadwin', 'Cast: Read sins'
    continue_until_unpaused
    act_on_character 'Lara Jewel', 'Cast: Read Sins'
    continue_until_unpaused
    act_on_character 'Joe Spencer', 'Cast: Read Sins'
    continue_until_unpaused
    act_on_character 'Rubi Patterson', 'Cast: Read sins'
    continue_until_unpaused

    # Get Olivia in trouble with the drug dealer
    go_to_room 'In front of the graveyard'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Ask about a dealer'
    continue_until_unpaused
    go_to_room 'Mid-South Crossroad'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Tell about drug dealer'
    continue_until_unpaused

    # Get the Supermarket quest from Wendy
    go_to_room 'In front of the graveyard'
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Ask about a dealer'
    continue_until_unpaused
    act_on_character 'Wendy', 'Cast: Read Sins'
    continue_until_unpaused
    act_on_character 'Wendy', 'Talk'
    choose_input_action 'Propose to help with her troubles'
    continue_until_unpaused

    # Get the Supermarket key from Rose
    go_to_room 'Supermarket'
    act_on_character 'Rose Alberstone', 'Talk'
    choose_input_action 'Ask about a job'
    go_to_room 'In front of supermarket'
    act_on_room 'Work'
    continue_until_unpaused
    wait_until_hour 16
    go_to_room 'Supermarket'
    act_on_character 'Rose Alberstone', 'Cast: Irresistible lust'
    choose_first_input_action 'Rose'
    continue_until_unpaused

    # Watch Vanessa do some sex
    go_to_room "University's Sport Ground"
    act_on_character 'Vanessa Hadwin', 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Chat'
    continue_until_unpaused

    # Peep on Lara
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 19
    go_to_room "In front of Jewel's house"
    act_on_room 'Peep'
    continue_until_unpaused

    # Drink with Rachel
    go_to_room 'Bar'
    act_on_character 'Rachel Hollinse', 'Talk'
    choose_input_action 'Do you fancy a drink?'
    continue_until_unpaused

    # Start Katie's seduction
    go_to_room 'Bar'
    act_on_object 'briefcase', 'Steal'
    act_on_character 'Katie Jewel', 'Buy a cup of coffee'
    continue_until_unpaused
    act_on_character 'Katie Jewel', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Spice his coffee'
    continue_until_unpaused
    act_on_character 'Katie Jewel', 'Cast: Read sins'
    continue_until_unpaused
    act_on_object 'porn journal', 'Give'
    choose_input_action 'Katie Jewel'
    continue_until_unpaused

    # Continue Chloe's seduction
    go_to_room 'South-Eastern Crossroad'
    go_to_room 'Your House'
    wait_until_hour 13
    act_on_object 'laptop', 'Go to BDSM site'
    choose_input_action 'Hello'
    choose_input_action 'Start an action'
    choose_input_action 'Submission'
    choose_input_action 'Use her'
    choose_input_action 'Fuck her brains out'
    choose_input_action 'Say she is a "bitch"'
    continue_until_unpaused

    # Get Rubi to ask for Ambergris
    go_to_room 'Deeper Park'
    act_on_character 'Rubi Patterson', 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Ask how she is doing.'
    continue_until_unpaused

    # Peep on Katie
    go_to_room 'In front of Jewel\'s house'
    act_on_room 'Peep'
    continue_until_unpaused

    # Go on the museum tour just to prove we can
    go_to_room 'ME F Museum'
    go_direction 'In'
    act_on_room 'Buy a guided tour.'
    continue_until_unpaused

    # Burgle the ambroxide
    go_direction 'Out'
    wait_until_hour 21
    act_on_room 'Burglary'
    continue_until_unpaused
    go_direction 'North'
    go_direction 'East'
    go_direction 'East'
    go_direction 'South'
    go_direction 'West'
    # Perfumery hall
    act_on_room 'Search'
    act_on_room 'Search'
    go_direction 'East'
    act_on_room 'Search'
    go_direction 'North'
    go_direction 'West'
    go_direction 'West'
    go_direction 'South'
    go_direction 'Out'

    # Burgle the ambergris, not needed but since we're here...
    act_on_room 'Burglary'
    continue_until_unpaused
    go_direction 'North'
    go_direction 'West'
    act_on_room 'Search'
    act_on_room 'Wait'
    go_direction 'North'
    go_direction 'North'
    go_direction 'East'
    act_on_object 'ambergris', 'Take'
    go_direction 'West'
    go_direction 'South'
    act_on_room 'Search'
    go_direction 'South'
    go_direction 'East'
    go_direction 'South'
    go_direction 'Out'

    # Burgle the storehouse with Wendy
    go_to_room 'Bar'
    act_on_character 'Wendy', 'Go for burglary'
    continue_until_unpaused
    act_on_object 'RowB', 'Open'
    page.find(".RoomObjects", text: 'StelB-I', match: :first).click
    choose_action('Open')
    # the third box
    page.all(".RoomObjects", text: 'box').last.click
    choose_action('Search')
    continue_until_unpaused
    act_on_character 'Wendy', 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Increase Rachel's lust
    go_to_room 'Park'
    act_on_character 'Rachel Hollinse', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Tell the boss about the facebook page.'
    continue_until_unpaused
    act_on_character 'Rachel Hollinse', 'Cast: Read sins'

    # Tell Rubi about the Ambergris
    go_to_room 'Deeper Park'
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'I have found ambergris!'
    choose_input_action 'No'
    continue_until_unpaused

    # Find the dealer and finish Olivia's seduction
    go_to_room 'In front of the graveyard'
    act_on_character 'Wendy', 'Cast: Irresistible lust'
    continue_until_unpaused
    go_to_room 'In front of the graveyard'
    while page.find('#RoomTitle').text != 'ME F Abandoned house'
      act_on_character 'Wendy', 'Spy on Wendy'
    end
    act_on_room 'Peep'
    continue_until_unpaused
    act_on_room 'Cast: Irresistible lust on Wendy'
    continue_until_unpaused
    choose_input_action 'Have a sex with her'
    continue_until_unpaused

    # Finish Vanessa's seduction
    go_to_room 'Park'
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Chat'
    choose_input_action 'Yes'
    choose_input_action 'Search for Vanessa'
    choose_input_action 'Wait'
    continue_until_unpaused

    # Finish Joe's seduction
    go_to_room "University's Sport Ground"
    act_on_room 'Peep'
    choose_input_action 'Truth'
    act_on_room 'Peep'
    continue_until_unpaused

    # See Olivia's pics
    go_to_room 'Mid-South Crossroad'
    act_on_character 'Olivia Osborne', 'Cast: Irresistible lust'
    continue_until_unpaused

    # Complete Chloe's seduction
    go_to_room 'Your House'
    wait_until_hour 13
    act_on_object 'laptop', 'Go to BDSM site'
    choose_input_action 'Hello'
    choose_input_action 'Start an action'
    choose_input_action 'Submission'
    choose_input_action 'Use her'
    choose_input_action 'Fuck her brains out'
    choose_input_action 'Intensive play'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # See Chloe's pics
    go_to_room 'SW Cox house'
    wait_until_hour 13
    act_on_character 'Chloe Cox', 'Cast: Irresistible lust'
    choose_input_action 'Chloe'
    continue_until_unpaused

    # See Layla's pics
    go_to_room 'First Mid-Eastern Crossroad'
    wait_until_hour 14
    go_to_room 'Jefferson\'s house'
    go_direction 'West'
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_input_action 'Layla'
    continue_until_unpaused

    # Get Ann and Scarlett to sex
    go_to_room "Alberstone's house"
    go_direction 'NorthEast'
    act_on_character 'Ann Alberstone', 'Talk'
    choose_input_action 'Meet with Scarlett'
    act_on_character 'Ann Alberstone', 'Go to Jeffersons'
    continue_until_unpaused

    # Talk to Scarlett about Ann
    go_to_room 'Jefferson\'s house'
    go_direction 'West'
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Speak about Ann'
    continue_until_unpaused
    go_direction 'East'

    # Try to convince Joe to see Scarlett
    go_to_room "University's Sport Ground"
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'Speak about Scarlett'
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'You should visit Scarlett'
    choose_input_action 'Go the the party'
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'You should visit Scarlett'
    choose_input_action 'Help Scarlett with homework'
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'You should visit Scarlett'
    choose_input_action 'Scarlett wants to fuck with you'

    # Finish Rubi's seduction
    go_to_room 'Library [LS Library]'
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Chat'
    continue_until_unpaused
    choose_input_action 'No'
    continue_until_unpaused
    choose_input_action 'Ambroxide'
    continue_until_unpaused

    # Get Rubi and Angela to bang
    act_on_character 'Rubi Patterson', 'Cast: Irresistible lust'
    choose_input_action 'Rubi'
    continue_until_unpaused

    # See Angela's pics
    go_direction 'SouthWest'
    act_on_character 'Angela Colbert', 'Cast: Irresistible lust'
    continue_until_unpaused

    # Peep on Lara
    go_to_room "In front of Jewel's house"
    act_on_room 'Peep'
    continue_until_unpaused

    # Get Scarlett to suggest Joe repair computers
    go_to_room 'First Mid-Eastern Crossroad'
    wait_until_hour 20
    go_to_room 'Jefferson\'s house'
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Speak about Joe'
    continue_until_unpaused

    # See Layla party pics
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_input_action 'Layla'
    continue_until_unpaused

    # See Rubi party pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Rubi Patterson', 'Cast: Irresistible lust'
    choose_input_action 'Rubi'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Burgle Rachel
    go_to_room 'South-Eastern Crossroad'
    wait_until_hour 16
    go_to_room 'Rachel Hollinse\'s house'
    act_on_room 'Burglary'
    continue_until_unpaused
    choose_input_action 'Yes'
    continue_until_unpaused

    # Get Joe and Scarlett to have sex
    go_to_room "University Entrance"
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'You should visit Scarlett'
    choose_input_action 'Ask to repair computer of Scarlett for money.'
    continue_until_unpaused

    # Finish Scarlett's seduction
    go_to_room 'First Mid-Eastern Crossroad'
    wait_until_hour 20
    go_to_room 'Jefferson\'s house'
    act_on_object 'Photos of Scarlett and Joe', 'Give'
    choose_input_action 'Scarlett Jefferson'
    act_on_character 'Scarlett Jefferson', 'Cast: Induce to sin'
    choose_input_action 'Pride'
    continue_until_unpaused
    act_on_character 'Scarlett Jefferson', 'Cast: Irresistible lust'
    choose_first_input_action 'Scarlett'
    continue_until_unpaused

    # See Scarlett/Layla pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Scarlett Jefferson', 'Cast: Irresistible lust'
    choose_input_action 'Layla and Scarlett'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Get Katie's request to beat up Joe
    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Cast: Induce to sin'
    choose_input_action 'Anger'
    continue_until_unpaused

    # See Scarlett university pics
    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_character 'Scarlett Jefferson', 'Cast: Irresistible lust'
    choose_first_input_action 'Scarlett'
    continue_until_unpaused

    # See Rubi university pics
    go_to_room 'University Entrance'
    act_on_character 'Rubi Patterson', 'Cast: Irresistible lust'
    choose_input_action 'Rubi'
    continue_until_unpaused

    # Find out that Lara wants booze
    act_on_character 'Lara Jewel', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Come to drink a cup of tea with sweets'
    continue_until_unpaused

    # Burgle Rachel again
    go_to_room 'South-Eastern Crossroad'
    wait_until_hour 16
    go_to_room 'Rachel Hollinse\'s house'
    act_on_room 'Burglary'
    continue_until_unpaused
    choose_input_action 'Yes'
    continue_until_unpaused

    # Beat up Joe to satisfy Katie
    go_to_room 'Liberty Square'
    wait_until_hour 19
    go_to_room 'Park'
    act_on_character 'Joe Spencer', 'Beat him'
    continue_until_unpaused

    # Get Lara drunk
    go_to_room 'Bar'
    buy_alcohol 'Rum'

    go_to_room 'Mid-South Crossroad'
    wait_until_hour 21
    go_to_room "Jewel's house"
    act_on_object 'Rum', 'Give'
    choose_input_action 'Lara Jewel'
    continue_until_unpaused

    # Get Rachel park pics
    go_to_room 'Park'
    act_on_character 'Rachel Hollinse', 'Cast: Irresistible lust'
    choose_input_action 'Rachel'
    continue_until_unpaused

    # See Rachel home pics
    go_to_room 'South-Eastern Crossroad'
    wait_until_hour 16
    go_to_room 'Rachel Hollinse\'s house'
    act_on_room 'Burglary'
    continue_until_unpaused
    choose_input_action 'Yes'
    continue_until_unpaused
    act_on_character 'Rachel Hollinse', 'Cast: Irresistible lust'
    choose_input_action 'Rachel'
    continue_until_unpaused
    go_direction 'South'
    go_direction 'Out'
    go_direction 'NorthWest'

    # See Rachel bar pics and progress Katie quest
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 20
    go_to_room 'Bar'
    act_on_character 'Rachel Hollinse', 'Cast: Irresistible lust'
    choose_input_action 'Rachel'
    continue_until_unpaused
    buy_alcohol 'Rum'
    act_on_character 'Katie Jewel', 'Talk'
    choose_input_action 'Tell that you know about Katie\'s desire for Lara'
    continue_until_unpaused

    # See Wendy bar pics
    act_on_character 'Wendy', 'Cast: Irresistible lust'
    continue_until_unpaused

    # See 'tame' Rachel pics
    go_to_room 'South-Eastern Crossroad'
    go_direction 'SouthEast'
    go_direction 'In'
    act_on_character 'Rachel Hollinse', 'Cast: Irresistible lust'
    choose_input_action 'Rachel'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # See Scarlett indoor pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Scarlett Jefferson', 'Cast: Irresistible lust'
    choose_first_input_action 'Scarlett'
    continue_until_unpaused

    # See Layla indoor pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_first_input_action 'Layla'
    continue_until_unpaused

    # See Layla Seafront pics
    go_to_room 'Seafront'
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_first_input_action 'Layla'
    continue_until_unpaused

    # See Vanessa school pics
    go_to_room 'University Entrance'
    act_on_character 'Vanessa Hadwin', 'Cast: Irresistible lust'
    choose_input_action 'Vanessa'
    continue_until_unpaused

    # Get Katie blackmail pics
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 16
    go_to_room "In front of Jewel's house"
    act_on_room 'Peep'
    continue_until_unpaused
    go_direction 'In'
    act_on_character 'Katie Jewel', 'Talk'
    continue_until_unpaused

    # Get more Rum
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 20
    go_to_room 'Bar'
    buy_alcohol 'Rum'

    # Finish Lara's seduction
    go_to_room 'Mid-South Crossroad'
    go_to_room "Jewel's house"
    act_on_character 'Lara Jewel', 'Talk'
    choose_input_action 'One more bottle of rum?'
    continue_until_unpaused
    choose_input_action 'more than 20'
    choose_input_action 'Did you sleep with Joe?'
    choose_input_action 'Experience'
    choose_input_action 'Why are you a virgin still?'
    choose_input_action 'A free woman'
    choose_input_action 'What are you dreaming about while masturbate?'
    continue_until_unpaused

    # Get Lara's home pics
    go_to_room 'Jewel\'s house'
    act_on_character 'Lara Jewel', 'Cast: Irresistible lust'
    choose_input_action 'Lara'
    continue_until_unpaused

    # Get Lara's school pics
    go_to_room 'Liberty Square'
    wait_until_hour 10
    go_to_room 'University Entrance'
    go_direction 'North'
    continue_until_unpaused
    go_direction 'South'
    act_on_character 'Lara Jewel', 'Cast: Irresistible lust'
    choose_input_action 'Lara'
    continue_until_unpaused

    # Finish Katie's seduction
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 16
    go_to_room 'Jewel\'s house'
    act_on_character 'Lara Jewel', 'Cast: Irresistible lust'
    choose_input_action 'Lara'
    continue_until_unpaused
    act_on_character 'Katie Jewel', 'Cast: Irresistible lust'
    choose_input_action 'Katie and Lara'
    continue_until_unpaused
    act_on_character 'Katie Jewel', 'Cast: Irresistible lust'
    choose_first_input_action 'Katie'
    continue_until_unpaused

    # Get Lara's park pics
    go_to_room 'Liberty Square'
    wait_until_hour 18
    go_to_room 'Park'
    act_on_character 'Lara Jewel', 'Cast: Irresistible lust'
    choose_first_input_action 'Lara'
    continue_until_unpaused

    # Get Katie's bar pics
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 20
    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Cast: Irresistible lust'
    choose_first_input_action 'Katie'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # See remaining Ann and Rose home pics
    go_to_room "Alberstone's house"
    act_on_character 'Rose Alberstone', 'Cast: Irresistible lust'
    choose_first_input_action 'Rose'
    continue_until_unpaused
    act_on_character 'Ann Alberstone', 'Cast: Irresistible lust'
    choose_input_action 'Ann and Rose'
    continue_until_unpaused

    # See Rose park pics
    go_to_room 'Park'
    act_on_character 'Rose Alberstone', 'Cast: Irresistible lust'
    choose_first_input_action 'Rose'
    continue_until_unpaused

    # See Rubi's park pics
    go_to_room 'Liberty Square'
    wait_until_hour 16
    go_to_room 'Deeper Park'
    act_on_character 'Rubi Patterson', 'Cast: Irresistible lust'
    choose_input_action 'Rubi'
    continue_until_unpaused

    # See Vanessa's post-seduction sport pics
    go_to_room "University's Sport Ground"
    act_on_character 'Vanessa Hadwin', 'Cast: Irresistible lust'
    choose_input_action 'Vanessa'
    continue_until_unpaused

    # See Rubi's post-seduction library pics
    go_to_room 'Liberty Square'
    wait_until_hour 18
    go_to_room 'Library [LS Library]'
    act_on_character 'Rubi Patterson', 'Cast: Irresistible lust'
    choose_input_action 'Rubi'
    continue_until_unpaused

    # Get a Dildo
    go_to_room 'Jefferson\'s house'
    act_on_room 'Burglary: Go to Layla\'s bedroom'
    act_on_object 'Wardrobe', 'Open'
    act_on_object 'Dildo', 'Take'
    go_direction 'SouthEast'

    # Wait till Monday
    act_on_self 'Next Day'
    continue_until_unpaused
    act_on_self 'Next Day'
    continue_until_unpaused
    act_on_self 'Next Day'
    continue_until_unpaused

    # Trigger Father's entrance
    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_character 'Rubi Patterson', 'Cast: Irresistible lust'
    choose_input_action 'Rubi'
    continue_until_unpaused
    act_on_character 'Father Becker', 'Listen'
    continue_until_unpaused

    # Get a Drone
    go_to_room 'Beach'
    act_on_character 'Guy on the beach', 'Talk'
    choose_input_action 'Can I play with your drone?'
    choose_input_action 'Punch him in solar plexus'
    continue_until_unpaused
    act_on_object 'DildoDrone', 'Examine'

    # Prank father
    go_to_room 'University Entrance'
    act_on_character 'Father Becker', 'Prank'
    continue_until_unpaused

    # Get Father drunk
    go_to_room 'In front of a Bar'
    wait_until_hour 20
    go_to_room 'Bar'
    buy_alcohol 'Beer'
    act_on_object 'Beer', 'Give'
    choose_input_action 'Father Becker'
    continue_until_unpaused
    buy_alcohol 'Whiskey'
    act_on_object 'Whiskey', 'Give'
    choose_input_action 'Father Becker'
    continue_until_unpaused
    buy_alcohol 'Beer'
    act_on_object 'Beer', 'Give'
    choose_input_action 'Father Becker'
    continue_until_unpaused

    # Confess Sins with Wendy
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'In front of the graveyard'
    wait_until_hour 16
    act_on_character 'Wendy', 'Go to confess sins'
    continue_until_unpaused

    # Confess Sins with Angela, finishing Father's seduction
    go_to_room 'Reception'
    act_on_character 'Angela Colbert', 'Go to confess sins'
    continue_until_unpaused

    # See confessional pics
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Church'
    wait_until_hour 16
    act_on_object 'Confessional', 'Cast: Irresistible lust'
    continue_until_unpaused
    act_on_object 'Confessional', 'Cast: Irresistible lust'
    continue_until_unpaused
    act_on_object 'Confessional', 'Cast: Irresistible lust'
    continue_until_unpaused

    # Meet Gina
    go_to_room "Biker's camp"
    act_on_character 'Girl', 'Examine'
    while evaluate_script('Globals.currentImage') != "GinaNorm.jpg"
      go_direction 'Out'
      go_direction 'In'
      act_on_character 'Girl', 'Examine'
    end

    act_on_character 'Girl', 'Talk'
    choose_input_action 'Introduce yourself'
    choose_input_action 'Compliment the bike'

    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'You are not like other girls here'
    continue_until_unpaused
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'Tell me about the camp'
    continue_until_unpaused
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'Which gang is yours?'
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'How do you plan to join the gang?'
    act_on_character 'Black Jack', 'Talk'
    choose_input_action 'Race'

    go_to_room 'Dragon rider\'s camp'
    act_on_character 'Nessa', 'Talk'
    choose_input_action 'Introduce yourself'
    choose_input_action 'when you shut up and stop playing a bitch'
    act_on_object 'Nessa\'s bike', 'Steal: Cut the wire'

    go_to_room 'Biker\'s camp'
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'Tell that Nessa is out of race'
    continue_until_unpaused
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'What will you do now?'
    continue_until_unpaused
    act_on_character 'Gina Blaze', 'Cast: Read Sins'
    continue_until_unpaused
    act_on_object 'camera', 'Shoot'
    choose_input_action 'Gina Blaze'

    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'University Entrance'
    go_direction 'NorthWest'
    act_on_object 'Photos of Gina', 'Give'
    choose_input_action 'Quincy Robson'
    go_direction 'SouthEast'
    go_direction 'East'
    act_on_character 'Xavier Bryson', 'Examine'
    act_on_object 'Photos of Gina', 'Give'
    choose_input_action 'Xavier Bryson'
    continue_until_unpaused
    go_direction 'West'

    go_to_room 'In front of a Bar'
    go_direction 'In'
    go_to_room 'Bar'
    act_on_object 'Photos of Gina', 'Give'
    choose_input_action 'Katie Jewel'
    continue_until_unpaused

    go_to_room 'Reception'
    act_on_object 'Photos of Gina', 'Give'
    choose_input_action 'Angela Colbert'
    continue_until_unpaused

    go_to_room 'Biker\'s camp'
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'Ask about her father'
    continue_until_unpaused

    go_direction 'East'
    choose_input_action 'Try to pass'
    continue_until_unpaused

    go_to_room 'Biker\'s camp'
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'What will you do now?'

    go_to_room 'Dragon rider\'s camp'
    act_on_character 'Nessa', 'Talk'
    choose_input_action 'What would you say about Gina Blaze?'

    go_to_room 'Biker\'s camp'
    act_on_character 'Black Jack', 'Talk'
    choose_input_action 'What would you say about Gina Blaze?'
    continue_until_unpaused

    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'Tell Gina about the invitation of Jack'
    continue_until_unpaused
    go_to_room 'Dragon rider\'s camp'
    wait_until_hour 20
    act_on_character 'Gina Blaze', 'Cast: Induce to sin'
    choose_input_action 'Anger'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'In front of the bikers\' camp'
    go_direction 'In'
    continue_until_unpaused

    go_to_room 'Reception'
    act_on_character 'Angela Colbert', 'Talk'
    choose_input_action 'Ask about Gina'
    continue_until_unpaused

    go_to_room 'Immortals\' camp'
    act_on_character 'Maryam', 'Talk'
    choose_input_action 'Tell Maryam that Gina is a lesbian'
    continue_until_unpaused

    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Talk'
    choose_input_action 'Ask to seduce Gina'

    go_to_room 'Biker\'s camp'
    wait_until_hour 14
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'Visit Katie'
    continue_until_unpaused

    go_to_room 'Biker gym'
    act_on_character 'Gina Blaze', 'Cast: Irresistible Lust'
    continue_until_unpaused

    go_to_room 'Biker\'s camp'
    wait_until_hour 20
    act_on_character 'Gina Blaze', 'Cast: Irresistible Lust'
    continue_until_unpaused

    puts image_reporter.percentage_seen_report
    if image_reporter.percentage_seen_for_game > 50
      image_reporter.report_missing_images('tmp/thesinner_missing_images.txt')
    end
  end
end