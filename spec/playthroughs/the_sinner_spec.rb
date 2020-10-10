module TheSinnerHelper
  GAME_MAP = {
    'South-Eastern Crossroad' => {
      'NorthWest' => "In front of Alberston's house",
      'North' => 'Mid-Eastern Crossroad',
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
      'NorthWest' => "In front of Willson's house",
      'NorthEast' => 'ME F Museum',
      'South' => 'South-West Crossroad',
      'East' => 'Liberty Square',
      'SouthEast' => 'ME F Abandoned house'
    },
    'Liberty Square' => {
      'NorthWest' => 'In front of the University',
      'NorthEast' => 'Library [LS F Library]',
      'East' => 'Mid-Eastern Crossroad',
      'SouthEast' => 'In front of Park',
      'South' => 'Mid-South Crossroad',
      'SouthWest' => 'In front of Police Station',
      'West' => 'Mid-West Crossroad'
    },
    'Mid-Eastern Crossroad' => {
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
      "NorthWest" => "Albertons's house. Rose's Room",
      "NorthEast" => "Albertons's house. Ann's Room",
      "Out" => "In front of Alberston's house"
    },
    "Albertons's house. Rose's Room" => {
      "SouthEast" => "Alberstone's house"
    },
    "Albertons's house. Ann's Room" => {
      "SouthWest" => "Alberstone's house"
    },
    'In front of supermarket' => {
      'SouthEast' => 'Mid-South Crossroad',
      'In' => 'Supermarket'
    },
    "Supermarket" => {
      "North" => "MS Supermarket Inside",
      "Out" => "In front of supermarket"
    },
    "MS Supermarket Inside" => {
      "South" => "Supermarket"
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
    "Church" => {
      "North" => "Church Backyard",
      "Out" => "In front of the church"
    },
    "Church Backyard" => {
      "South" => "Church"
    },
    'In front of the graveyard' => {
      'NorthWest' => 'South-West Crossroad',
      'In' => 'Graveyard'
    },
    'Graveyard' => {
      'Out' => 'In front of the graveyard'
    },
    "In front of the farm" => {
      "NorthEast" => "South-West Crossroad",
      "West" => "Barn",
      "In" => "Farm house. Living room"
    },
    "Barn" => {
      "East" => "In front of the farm"
    },
    "Farm house. Living room" => {
      "NorthWest" => "Farm. Mary's bedroom",
      "North" => "Farm. Simon's room",
      "NorthEast" => "Farm. Joshua and Abigail's room",
      "East" => "Pool [SE Farm - Pool]",
      "Out" => "In front of the farm"
    },
    "Farm. Mary's bedroom" => {
      "SouthEast" => "Farm house. Living room"
    },
    "Farm. Simon's room" => {
      "South" => "Farm house. Living room"
    },
    "Farm. Joshua and Abigail's room" => {
      "SouthWest" => "Farm house. Living room"
    },
    "Pool [SE Farm - Pool]" => {
      "West" => "Farm house. Living room"
    },
    "In front of Willson's house" => {
      "SouthEast" => "Mid-West Crossroad",
      "In" => "Willsons' house"
    },
    "Willsons' house" => {
      "North" => "Willsons' house. Bedroom",
      "Out" => "In front of Willson's house"
    },
    "Willsons' house. Bedroom" => {
      "South" => "Willsons' house"
    },
    "ME F Museum" => {
      "SouthWest" => "Mid-West Crossroad",
      "In" => "ME Museum"
    },
    "ME Museum" => {
      "Out" => "ME F Museum"
    },
    "ME F Abandoned house" => {
      "NorthWest" => "Mid-West Crossroad",
      "In" => "ME Abandoned house"
    },
    "ME Abandoned house" => {
      "Out" => "ME F Abandoned house"
    },
    'In front of the University' => {
      'SouthEast' => 'Liberty Square',
      'West' => "University's Sport Ground",
      'In' => 'University Entrance'
    },
    "University's Sport Ground" => {
      'East' => 'In front of the University'
    },
    "University Entrance" => {
      "NorthWest" => "Pythagoras room",
      "North" => "Linnaeus room",
      "NorthEast" => "Herodot room",
      "East" => "Teacher's room",
      "Out" => "In front of the University"
    },
    "Pythagoras room" => {
      "SouthEast" => "University Entrance"
    },
    "Linnaeus room" => {
      "South" => "University Entrance"
    },
    "Herodot room" => {
      "SouthWest" => "University Entrance"
    },
    "Teacher's room" => {
      "North" => "LS University - Principle office",
      "West" => "University Entrance"
    },
    "LS University - Principle office" => {
      "South" => "Teacher's room"
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
    "In front of Police Station" => {
      "NorthEast" => "Liberty Square",
      "In" => "Police Station"
    },
    "Police Station" => {
      "North" => "Cells",
      "Out" => "In front of Police Station"
    },
    "Cells" => {
      "South" => "Police Station"
    },
    "In front of Kingston's house" => {
      'SouthEast' => 'Mid-Eastern Crossroad'
    },
    'In front of Old Lighthouse' => {
      'SouthWest' => 'Mid-Eastern Crossroad'
    },
    "Seafront" => {
      "NorthWest" => "Mid-Eastern Crossroad",
      "East" => "Beach"
    },
    "Beach" => {
      "West" => "Seafront"
    },
    "In front of Jefferson's house" => {
      'NorthEast' => 'Mid-Eastern Crossroad',
      'In' => "Jefferson's house"
    },
    "Jefferson's house" => {
      'Out' => "In front of Jefferson's house",
      'West' => 'Pool [FME Jefferson house pool]'
    },
    'Pool [FME Jefferson house pool]' => {
      'East' => "Jefferson's house"
    },
    "Corridor" => {
      "NorthWest" => "Human Resources office",
      "North" => "Secretary office",
      "NorthEast" => "Alice Blunt's office",
      "SouthEast" => "SysAdmin room",
      "SouthWest" => "Open Office",
    },
    "Human Resources office" => {
      "SouthEast" => "Corridor"
    },
    "Secretary office" => {
      "South" => "Corridor"
    },
    "Alice Blunt's office" => {
      "SouthWest" => "Corridor"
    },
    "SysAdmin room" => {
      "NorthWest" => "Corridor"
    },
    "Open Office" => {
      "NorthEast" => "Corridor"
    },
  }

  class RetryNavigationError < StandardError; end

  def navigator
    @navigator ||= Navigator.new(GAME_MAP)
  end

  def reverse_direction(d)
    {
      "NorthWest" => "SouthEast",
      "North" => "South",
      "NorthEast" => "SouthWest",
      "East" => "West",
      "SouthEast" => "NorthWest",
      "South" => "North",
      "SouthWest" => "NorthEast",
      "West" => "East",
    }[d]
  end

  def go_to_room(destination_room, beware_creig: false)
    current_room = page.find('#RoomTitle').text
    if current_room == 'Library' || current_room == 'Pool'
      fancy_room_name = page.evaluate_script('Finder.room(TheGame.Player.CurrentRoom).Name')
      current_room = "#{current_room} [#{fancy_room_name}]"
    end

    unless GAME_MAP[destination_room]
      raise "Don't know anything about destination room (#{destination_room})"
    end

    begin
      directions = navigator.navigation_directions(current_room, destination_room)
      while (direction = directions.shift)
        menu_titles = page.all('#InputMenuTitle', minimum: 0)
        if menu_titles.length > 0 && menu_titles[0].text.include?('What should you do?')
          if page.find('#inputchoices').text.include?('Wait while the leader turns away and then hit him hard')
            choose_input_action 'Wait while the leader turns away and then hit him hard'
          else
            choose_input_action 'Run away'
          end
          continue_until_unpaused
          raise RetryNavigationError
        end
        go_direction(direction)
        continue_until_unpaused
        if beware_creig
          if page.first(".VisibleCharacters", text: "Creig Bolder", minimum: 0)
            directions.unshift(reverse_direction(direction))
          end
        end
      end
    rescue RetryNavigationError
      current_room = page.find('#RoomTitle').text
      retry
    end
  end

  def quickstart(savegames_filename)
    start_game 'TheSinner'

    act_on_object 'Game', 'Start New Game (Skip entry)'
    choose_input_action 'Easy (+5 points per sin)'
    continue_until_unpaused

    import_savegames(savegames_filename)
  end

  def wait_until_day(day)
    until page.find('#statusbartext').text.match(/#{day}/)
      act_on_self 'Next Day'
      continue_until_unpaused
    end
  end

  def wait_until_weekday
    wait_until_day "(Monday|Tuesday|Wednesday|Thursday|Friday)"
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

  def wait_until_hour(hour, janitor: false)
    if hour < current_time[:hour]
      raise 'Cannot wait for past hour'
    end
    if current_time[:minute] != 0
      if janitor
        ((60 - current_time[:minute]) / 10).times do
          act_on_self 'Quick Clean'
        end
      else
        execute_script('Finder.variable(\'CDate\').VarArray[2] = "0"')
      end
    end
    hours_to_wait = hour.to_i - current_time[:hour]

    while hours_to_wait > 0
      if janitor
        6.times { act_on_self 'Quick Clean' }
        hours_to_wait -= 1
        next
      end

      if hours_to_wait >= 6
        act_on_self 'Wait 6 hours'
        hours_to_wait -= 6
      else
        act_on_self 'Wait an hour'
        hours_to_wait -= 1
      end
    end
  end

  def set_time(hour, minute)
    execute_script("Finder.variable('CDate').VarArray[1] = \"#{hour}\"")
    execute_script("Finder.variable('CDate').VarArray[2] = \"#{minute}\"")
  end

  def buy_alcohol(alcohol, first: false)
    act_on_character 'Katie Jewel', 'Buy alcoholic beverage'
    choose_input_action alcohol
    continue_until_unpaused

    # Guy who wants to steal your bottle from the bar (random)
    if first
      while true
        go_direction 'Out'

        break if page.first('#inputmenu', text: 'Answer to him', minimum: 0)

        go_to_room 'Bar'
      end

      choose_input_action 'Lie: Distract the guy'
      choose_input_action 'Smash the bottle on his head'
      continue_until_unpaused
      go_to_room 'Bar'
      act_on_character 'Katie Jewel', 'Buy alcoholic beverage'
      choose_input_action alcohol
      continue_until_unpaused
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
    choose_input_action 'Easy (+5 points per sin)'
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
    continue_until_unpaused

    go_to_room 'Mid-South Crossroad'
    act_on_object 'litter bin', 'Kick'
    continue_until_unpaused

    go_to_room 'In front of supermarket'
    act_on_room 'Draw a dick'
    continue_until_unpaused

    go_to_room 'Church'
    act_on_object 'basin holy water', 'Wash your hands'
    continue_until_unpaused

    go_to_room 'Graveyard'
    act_on_room 'Pee'
    continue_until_unpaused

    go_to_room 'ME F Abandoned house'
    act_on_room 'Throw a stone'
    continue_until_unpaused

    go_to_room 'In front of the University'
    act_on_object 'mobile', 'Install porn image'
    continue_until_unpaused

    go_to_room "University's Sport Ground"
    act_on_room 'Peep'
    continue_until_unpaused

    go_to_room 'Library [LS Library]'
    act_on_room 'Search'
    continue_until_unpaused
    act_on_object 'Book about Sherlock Holmes', 'Tear out a page'
    continue_until_unpaused

    go_to_room 'Liberty Square'
    act_on_object 'Page', 'Throw it out'
    continue_until_unpaused

    go_to_room 'Park'
    act_on_object 'ball', 'Kick it'
    continue_until_unpaused

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
    act_on_character 'Katie Jewel', 'Examine'
    act_on_character 'Katie Jewel', 'Talk'
    choose_input_action 'What do you sell?'
    # "Buy a cup of coffee" doesn't show up unless you leave and enter
    go_direction 'Out'
    go_direction 'In'
    act_on_character 'Katie Jewel', 'Buy a cup of coffee'
    continue_until_unpaused
    choose_input_action 'Lie: shrug'
    continue_until_unpaused

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
    wait_until_hour 17
    go_to_room "In front of Willson's house"
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

    # Get Olivia on board with the party
    go_to_room 'Mid-South Crossroad'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Ask about "mission"'
    continue_until_unpaused
    act_on_character 'Olivia Osborne', 'Cast: Read Sins'
    continue_until_unpaused

    wait_until_hour 20
    go_to_room 'Mid-Eastern Crossroad'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Lets go to watch a movie'
    choose_input_action '"The Godfather"'
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

    # Learn 'Thievery'
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    # Take photos of the Kingstones
    go_to_room 'Mid-Eastern Crossroad'
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
    until (continue_button = page.all('#Continue', visible: true, minimum: 0)[0])
      act_on_room 'Spy on Kingstones'
    end
    continue_until_unpaused
    go_direction 'Out'

    # Learn 'Drinking'
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    go_to_room 'Seafront'
    continue_until_unpaused
    wait_until_hour 22
    go_direction 'East'
    act_on_room 'Peep'
    continue_until_unpaused
    act_on_object 'sexy dress', 'Steal'

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
    go_to_room 'Mid-Eastern Crossroad'
    wait_until_hour 10
    go_to_room 'Seafront'
    act_on_object 'Photos', 'Open'
    act_on_object 'Photos of Emma Kingston', 'Give'
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
      while page.all('#inputmenu', visible: true, minimum: 0).length == 0
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

    act_on_object 'sexy dress', 'Give'
    choose_input_action 'Ann Alberstone'
    continue_until_unpaused

    act_on_character 'Shady Guy', 'Talk'
    continue_until_unpaused
    act_on_character 'Shady Guy', 'Ask for a joint'
    continue_until_unpaused

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

    # Start Chloe's seduction
    go_to_room 'SW Cox house'
    act_on_character 'Chloe Cox', 'Cast: Read sins'
    continue_until_unpaused
    act_on_object 'curtain', 'Steal: Open the curtain carefully.'
    continue_until_unpaused

    # Go to next day (Monday) to open university
    act_on_self 'Next Day'
    continue_until_unpaused

    # Peep on Chloe through open curtain
    go_to_room 'SW F Coxes house'
    wait_until_hour 13
    act_on_room 'Peep'
    continue_until_unpaused

    # Learn about Vanessa's figurine
    go_to_room 'University Entrance'
    go_direction 'NorthEast'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'Introduce yourself'
    act_on_character 'Helen Coombs', 'Examine'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'Ask about figurine.'
    continue_until_unpaused
    go_direction 'SouthWest'

    # Learn next steps for Vanessa
    go_to_room 'Park'
    wait_until_hour 19
    act_on_object 'Dagon figurine', 'Give'
    choose_input_action 'Vanessa Hadwin'
    continue_until_unpaused
    act_on_character 'Vanessa Hadwin', 'Cast: Read sins'
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Ask about supernatural.'
    continue_until_unpaused

    # Get witchcraft book for Vanessa
    go_to_room 'Reception'
    act_on_character 'Norma Rowbottom', 'Talk'
    choose_input_action 'Ask about access to old books'
    choose_input_action 'Lie: I need old administrative books for a research'
    continue_until_unpaused
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

    # Get Vodka for Norma
    go_to_room 'Mid-South Crossroad'
    go_to_room 'Bar'
    buy_alcohol 'Vodka', first: true

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
    choose_input_action 'Press the handle harder to get inside'
    continue_until_unpaused
    act_on_character 'Layla Jefferson', 'Cast: Read sins'
    continue_until_unpaused
    act_on_character 'Layla Jefferson', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Who is the best sucker?'
    continue_until_unpaused

    go_direction 'North'
    act_on_character 'Isabel Jefferson', 'Search'
    continue_until_unpaused
    go_direction 'South'

    # Compromise Norma
    go_to_room 'Reception'
    act_on_character 'Norma Rowbottom', 'Compromise her'
    continue_until_unpaused

    # Get Ann to blow Quincy
    go_to_room "Alberstone's house"
    act_on_character 'Ann Alberstone', 'Cast: Read sins'

    go_to_room 'Library [LS Library]'
    act_on_room 'Search'
    act_on_object 'sex manual', 'Take'

    # Get good cognac for Quincy
    go_to_room 'MS Supermarket Inside'
    act_on_object 'Cognac shelves', 'buy a bottle of Cognac'
    choose_input_action 'Normandian Mercier La Peraudieve'

    go_to_room 'Pythagoras room'
    act_on_character 'Quincy Robson', 'Examine'
    act_on_character 'Quincy Robson', 'Talk'
    choose_input_action 'Chat'
    act_on_object 'Bottle of Cognac', 'Give'
    choose_input_action 'Quincy Robson'
    continue_until_unpaused
    act_on_character 'Quincy Robson', 'Cast: Read Sins'
    continue_until_unpaused

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
    act_on_character 'Creig Bolder', 'Talk'
    choose_input_action 'Ask about Layla\'s phone'
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

    go_to_room 'Teacher\'s room'
    act_on_object 'Key board', 'Steal a key'
    go_to_room 'University Entrance'
    act_on_object 'Door to the Herodotus Class', 'Unlock'
    continue_until_unpaused

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
    continue_until_unpaused
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
    choose_exact_input_action 'Rose'
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
    set_character_custom_property('Rachel Hollinse', 'mood', 'bad') # this interaction only works in bad mood
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
    set_game_variable('fountainDir', '01')
    set_game_variable('StatueDir', '01')
    set_game_variable('GraffitiDir', '01')
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
    choose_exact_input_action 'Rose'
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
    set_character_custom_property('Rachel Hollinse', 'mood', 'good') # this interaction only works in good mood
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

    # Burgle the ambergris
    go_direction 'Out'
    wait_until_hour 21
    act_on_room 'Burglary'
    continue_until_unpaused
    go_direction 'North'
    go_direction 'West'
    act_on_room 'Search'
    act_on_room 'Wait'
    go_direction 'North'
    go_direction 'North'
    go_direction 'East'
    act_on_room 'Search'
    act_on_object 'ambergris', 'Take'
    go_direction 'West'
    go_direction 'South'
    act_on_room 'Search'
    go_direction 'South'
    go_direction 'East'
    go_direction 'South'
    go_direction 'Out'

    # Burgle the ambroxide
    act_on_room 'Burglary'
    continue_until_unpaused
    go_direction 'North'
    go_direction 'East'
    go_direction 'East'
    go_direction 'South'
    go_direction 'West'
    act_on_room 'Search'
    continue_until_unpaused
    go_direction 'East'
    go_direction 'North'
    go_direction 'West'
    go_direction 'West'
    go_direction 'South'
    go_direction 'Out'

    # Burgle the storehouse with Wendy
    go_to_room 'Bar'
    act_on_character 'Wendy', 'Go for burglary'
    continue_until_unpaused
    act_on_object 'RowB', 'Open'
    page.find(".RoomObjects", text: 'Shelf B-I', match: :first).click
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
    set_character_custom_property('Rachel Hollinse', 'mood', 'good') # this interaction only works in good mood
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
    wait_until_hour 19
    act_on_character 'Vanessa Hadwin', 'Talk'
    choose_input_action 'Chat'
    choose_input_action 'Yes'
    choose_input_action 'Search for Vanessa'
    choose_input_action 'Wait'
    continue_until_unpaused

    # Finish Joe's seduction
    wait_until_day("Monday")

    go_to_room "University's Sport Ground"
    act_on_room 'Peep' # possible missing text here
    continue_until_unpaused
    choose_input_action 'Truth'
    act_on_room 'Peep'
    continue_until_unpaused

    # See Olivia's pics
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 11
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

    # Burgle Rachel
    go_to_room 'South-Eastern Crossroad'
    wait_until_hour 16
    go_to_room 'Rachel Hollinse\'s house'
    act_on_room 'Burglary'
    continue_until_unpaused
    choose_input_action 'Yes'
    continue_until_unpaused

    # Learn 'Cheating'
    go_to_room 'Your House'
    act_on_self 'Learn'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # See Chloe's pics
    go_to_room 'SW Cox house'
    wait_until_hour 13
    act_on_character 'Chloe Cox', 'Cast: Irresistible lust'
    choose_input_action 'Chloe'
    continue_until_unpaused

    # Play Quincy at chess
    go_to_room 'Pythagoras room'
    act_on_character 'Quincy Robson', 'Pass the test'
    continue_until_unpaused

    # Try to keep the scores even
    freeze_game_variable('QuincyChessRes')
    set_game_variable('QuincyChessRes', "99") # it acts like a number but it's stored like a string
    choose_input_action 'Play fair'
    continue_until_unpaused

    set_game_variable('QuincyChessRes', "10")
    choose_input_action 'Play fair'
    continue_until_unpaused

    set_game_variable('QuincyChessRes', "99")
    choose_input_action 'Play fair'
    continue_until_unpaused

    set_game_variable('QuincyChessRes', "10")
    choose_input_action 'Play fair'
    continue_until_unpaused

    set_game_variable('QuincyChessRes', "99")
    choose_input_action 'Play fair'
    continue_until_unpaused

    choose_input_action 'Give in'
    continue_until_unpaused

    # Learn about Coombs envy
    go_to_room 'Herodot room'
    act_on_room 'Examine'
    act_on_object 'Awards', 'Examine'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'Could you tell me more about this award, it seems important?'
    continue_until_unpaused

    # Steal figurine for Coombs
    go_to_room 'Jefferson\'s house'
    act_on_room 'Burglary: Go to Layla\'s bedroom'
    act_on_object 'Glass case', 'Examine'
    act_on_object 'Glass case', 'Take a figurine'
    continue_until_unpaused
    choose_input_action(['First', 'Second', 'Third', 'Fourth', 'Fifth'][page.evaluate_script("Finder.variable('FigurinePos').VarArray.indexOf('Astarte')")])
    continue_until_unpaused

    # Grind out Coombs' paper
    go_to_room 'Herodot room'
    act_on_object 'female figurine', 'Give'
    choose_input_action 'Helen Coombs'
    continue_until_unpaused
    act_on_character 'Helen Coombs', 'Cast: Read sins'
    continue_until_unpaused
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'How is the work on the paper going?'

    # Day 1 after paper start
    act_on_self 'Next Day'
    continue_until_unpaused

    # Tessa start
    go_to_room 'Linnaeus room'
    wait_until_hour 10
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'Introduce yourself'
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'How are your first days in the University?'
    continue_until_unpaused

    go_to_room 'University Entrance'
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'What do you think about Ms Clayton?'
    go_to_room 'Linnaeus room'
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'Students say that you...'
    choose_input_action 'too young'
    continue_until_unpaused
    go_to_room 'Herodot room'
    act_on_self 'Wait 6 hours'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'How is the work on the paper going?'

    # Day 2 after paper start
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Linnaeus room'
    act_on_room 'Hide'
    continue_until_unpaused
    wait_until_hour 10
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'Tell about Creig'
    continue_until_unpaused
    go_to_room 'Herodot room'
    act_on_self 'Wait 6 hours'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'How is the work on the paper going?'

    # Day 3 after paper start
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Linnaeus room'
    wait_until_hour 10
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'Ask about the conversation with Creig'
    continue_until_unpaused
    go_to_room 'Herodot room'
    act_on_self 'Wait 6 hours'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'How is the work on the paper going?'
    continue_until_unpaused

    # Day 4+ after paper start
    wait_until_day("Monday")
    go_to_room 'Herodot room'
    act_on_self 'Wait 6 hours'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'How is the work on the paper going?'
    continue_until_unpaused
    act_on_object 'papers', 'Make a copy'

    go_to_room 'Your House'
    act_on_object 'laptop', 'Report plagiarism'
    go_to_room 'Herodot room'
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'Was the paper accepted?'
    continue_until_unpaused

    # Investigate Helen Coombs on the computer
    go_to_room 'Your House'
    act_on_object 'laptop', 'Read eMail'
    act_on_object 'laptop', 'Search', match: :last
    fill_in_text_input 'Helen Coombs'
    act_on_object 'laptop', 'Search', match: :last
    fill_in_text_input 'Nellie UniTor'
    continue_until_unpaused

    # See Layla's pics
    go_to_room 'Mid-Eastern Crossroad'
    go_to_room 'Jefferson\'s house'
    go_direction 'West'
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_input_action 'Layla'
    continue_until_unpaused

    # Get Ann and Scarlett to sex
    go_to_room "Albertons's house. Ann's Room"
    until main_text.include?('You enter the room and see Ann')
      go_direction 'SouthWest'
      go_direction 'NorthEast'
    end
    continue_until_unpaused

    # Mary Stone 1
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Barn'
    act_on_character 'Girl', 'Talk'
    choose_input_action 'Introduce yourself'
    continue_until_unpaused

    # More Scarlett
    go_to_room "Alberstone's house"
    act_on_character 'Ann Alberstone', 'Talk'
    continue_until_unpaused
    choose_input_action 'Meet with Scarlett'
    wait_until_hour 16
    go_to_room "Albertons's house. Ann's Room"
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
    act_on_self 'Next Day'
    continue_until_unpaused
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

    # Mary Stone 2
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'Ask about the farm'

    # Finish Rubi's seduction
    go_to_room 'Library [LS Library]'
    wait_until_hour 18
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
    go_to_room 'Mid-Eastern Crossroad'
    wait_until_hour 20
    go_to_room 'Jefferson\'s house'
    act_on_character 'Scarlett Jefferson', 'Talk'
    choose_input_action 'Speak about Joe'
    continue_until_unpaused

    # See Layla party pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_input_action 'Layla'
    continue_until_unpaused

    # See Rubi party pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Rubi Patterson', 'Cast: Irresistible lust'
    choose_input_action 'Rubi'
    continue_until_unpaused

    # Mary Stone 3
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'what do you do for fun?'
    continue_until_unpaused
    go_to_room 'Park'
    act_on_object 'newspaper kiosk', 'Buy a magazine'

    # Get Joe and Scarlett to have sex
    go_to_room "University Entrance"
    wait_until_hour 16
    act_on_character 'Joe Spencer', 'Talk'
    choose_input_action 'You should visit Scarlett'
    choose_input_action 'Ask to repair computer of Scarlett for money.'
    continue_until_unpaused

    # Finish Scarlett's seduction
    go_to_room 'Mid-Eastern Crossroad'
    wait_until_hour 20
    go_to_room 'Jefferson\'s house'
    act_on_object 'Photos of Scarlett and Joe', 'Give'
    choose_input_action 'Scarlett Jefferson'
    act_on_character 'Scarlett Jefferson', 'Cast: Induce to sin'
    choose_input_action 'Pride'
    continue_until_unpaused
    act_on_character 'Scarlett Jefferson', 'Cast: Irresistible lust'
    choose_exact_input_action 'Scarlett'
    continue_until_unpaused

    # See Scarlett/Layla pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Scarlett Jefferson', 'Cast: Irresistible lust'
    choose_input_action 'Layla and Scarlett'
    continue_until_unpaused

    # Mary Stone 4
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Would you like to read some news about music industry?'
    continue_until_unpaused
    go_direction 'East'
    go_direction 'West'
    choose_input_action 'Punch him in the solar plexus'
    continue_until_unpaused
    go_to_room 'Your House'
    act_on_object 'laptop', 'Search for a trending pop clip'
    choose_input_action 'Copy'
    choose_input_action 'Fergie - MILF'
    choose_input_action 'Proceed'

    # Get Katie's request to beat up Joe
    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Cast: Induce to sin'
    choose_input_action 'Anger'
    continue_until_unpaused

    # See Scarlett university pics
    go_to_room 'University Entrance'
    act_on_character 'Scarlett Jefferson', 'Cast: Irresistible lust'
    choose_exact_input_action 'Scarlett'
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

    # Mary Stone 5 / Abigail Start
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'In front of the farm'
    act_on_character 'Girl', 'Talk'
    choose_input_action 'Introduce yourself'
    choose_input_action 'Hey, Beautiful!'
    continue_until_unpaused
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'New sexy pop video'
    choose_input_action 'Proceed'
    continue_until_unpaused
    choose_input_action 'Proceed'
    continue_until_unpaused
    act_on_room 'Burglary'
    go_to_room 'Farm. Mary\'s bedroom'
    go_to_room 'Farm. Simon\'s room'
    act_on_object 'Wardrobe_Simon', 'Open'
    act_on_object 'Bible', 'Read'
    act_on_object 'Simon\'s diary', 'Read'
    fill_in_text_input '8924'
    continue_until_unpaused

    # Eve Rock 1
    go_to_room 'Seafront'
    wait_until_hour 20
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Why did you decide to work as a prostitute?'
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Cool tattoo!'
    continue_until_unpaused
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Tell me about your work'
    choose_input_action 'Do you like it?'
    choose_input_action 'Ask about the service she offers'
    choose_input_action 'Do nothing, be as futher from the road as possible'
    continue_until_unpaused

    # Abigail 2
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'In front of the farm'
    act_on_character 'Abigail Stone', 'Talk'
    choose_input_action 'Why are you always running away from me?'
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
    wait_until_hour 19
    go_to_room 'Bar'
    buy_alcohol 'Rum'
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'May I offer something to drink to a longly girl?'
    continue_until_unpaused
    choose_input_action 'Red'
    continue_until_unpaused
    choose_input_action 'Groin'
    continue_until_unpaused
    choose_input_action 'Your parents threw you out of the house'
    continue_until_unpaused
    choose_input_action 'He discovered she was not a virgin'
    continue_until_unpaused
    choose_input_action 'Brother'
    continue_until_unpaused # Triggers next day

    # Abigail 3
    go_to_room 'In front of the farm'
    act_on_character 'Abigail Stone', 'Talk'
    choose_input_action 'Talk to her about the weather'
    continue_until_unpaused

    # Eve Rock 2
    go_to_room 'Seafront'
    wait_until_hour 20
    act_on_character 'Two thugs and Eve', 'Examine'
    act_on_character 'Two thugs and Eve', 'Do something'
    choose_input_action 'Fight'
    choose_input_action 'Hit the small thug to kidney (high chance)'
    choose_input_action 'Hit small thug to head (high chance)'
    choose_input_action 'Proceed'
    choose_input_action 'Block'
    choose_input_action 'Block'
    choose_input_action 'Hit the big thug to kidney (high chance)'
    continue_until_unpaused
    choose_input_action 'Proceed'
    continue_until_unpaused

    # Finish Lara's seduction
    go_to_room 'Mid-South Crossroad'
    go_to_room "Jewel's house"
    wait_until_hour 22
    act_on_character 'Lara Jewel', 'Talk'
    choose_input_action 'One more bottle of rum?'
    continue_until_unpaused
    choose_input_action 'more than 20'
    choose_input_action 'Did you sleep with Joe?'
    choose_input_action 'Experience'
    choose_input_action 'Why are you a virgin still?'
    choose_input_action 'A free woman'
    choose_input_action 'What are you dreaming about while masturbate?'
    continue_until_unpaused # Triggers next day

    # Abigail 4
    go_to_room 'In front of the farm'
    act_on_character 'Abigail Stone', 'Talk'
    choose_input_action 'Tell me about yourself'
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

    # See Vanessa school pics
    go_to_room 'University Entrance'
    act_on_character 'Vanessa Hadwin', 'Cast: Irresistible lust'
    choose_input_action 'Vanessa'
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
    choose_exact_input_action 'Katie'
    continue_until_unpaused

    # Get Lara's park pics
    go_to_room 'Liberty Square'
    wait_until_hour 18
    go_to_room 'Park'
    act_on_character 'Lara Jewel', 'Cast: Irresistible lust'
    choose_exact_input_action 'Lara'
    continue_until_unpaused

    # Get Katie's bar pics
    go_to_room 'Mid-South Crossroad'
    wait_until_hour 20
    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Cast: Irresistible lust'
    choose_exact_input_action 'Katie'
    continue_until_unpaused

    # Eve gets kidnapped
    go_to_room 'Seafront'
    continue_until_unpaused

    # Abigail 5
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'In front of the farm'
    act_on_character 'Abigail Stone', 'Talk'
    choose_input_action 'What do you do for fun?'
    continue_until_unpaused
    go_to_room 'MS Supermarket Inside'
    act_on_object 'Food department', 'Buy Crisps'

    act_on_self 'Next Day'
    continue_until_unpaused

    # See Scarlett indoor pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Scarlett Jefferson', 'Cast: Irresistible lust'
    choose_exact_input_action 'Scarlett'
    continue_until_unpaused

    # See Layla indoor pics
    go_to_room 'Jefferson\'s house'
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_exact_input_action 'Layla'
    continue_until_unpaused

    # See Layla Seafront pics
    go_to_room 'Seafront'
    act_on_character 'Layla Jefferson', 'Cast: Irresistible lust'
    choose_exact_input_action 'Layla'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # See remaining Ann and Rose home pics
    go_to_room "Alberstone's house"
    act_on_character 'Rose Alberstone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Rose'
    continue_until_unpaused
    act_on_character 'Ann Alberstone', 'Cast: Irresistible lust'
    choose_input_action 'Ann and Rose'
    continue_until_unpaused

    # See Rose park pics
    go_to_room 'Park'
    act_on_character 'Rose Alberstone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Rose'
    continue_until_unpaused

    # See Rubi's park pics
    go_to_room 'Liberty Square'
    wait_until_hour 16
    go_to_room 'Deeper Park'
    act_on_character 'Rubi Patterson', 'Cast: Irresistible lust'
    choose_input_action 'Rubi'
    continue_until_unpaused

    # Abigail 6
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'In front of the farm'
    act_on_character 'Abigail Stone', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'I have something tasty for you'
    choose_input_action 'Crisps'
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

    # Abigail 7
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'Ask about arranged marriage'
    continue_until_unpaused

    # Rescue Eve
    go_to_room 'Police Station'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Rescue Eve'
    continue_until_unpaused
    act_on_character 'Olivia Osborne', 'Rescue Eve'
    continue_until_unpaused
    act_on_character 'Masked man', 'Talk'
    act_on_character 'Masked man', 'Hit him'
    continue_until_unpaused
    choose_input_action 'Ok, fine! What is the deal?'
    continue_until_unpaused
    go_direction 'NorthEast'
    go_direction 'East'
    act_on_character 'Cumbucket', 'Play with her'
    choose_input_action 'humiliation+hooked ass+feet pain'
    continue_until_unpaused
    choose_input_action 'hard fix+humiliation+breast pain+stimulation+oral'
    continue_until_unpaused
    act_on_character 'Dancingass', 'Play with her'
    choose_input_action 'ass plug+cane+flaggelation+breast pain+stimulation'
    continue_until_unpaused
    choose_input_action 'flaggelation+sticked ass+stimulation'
    continue_until_unpaused
    act_on_character 'Highcunt', 'Play with her'
    choose_input_action 'humiliation+flaggelation+sigaretes+feet pain'
    continue_until_unpaused
    choose_input_action 'humiliation+sex+flaggelation+electricity+breast pain'
    continue_until_unpaused
    act_on_character 'Sisbitch', 'Play with her'
    choose_input_action 'breast pain+feet pain+stimulation'
    continue_until_unpaused
    choose_input_action 'masked+humiliation+riding crop+breast pain+stimulation'
    continue_until_unpaused
    act_on_character 'Eve Rock', 'Play with her'
    continue_until_unpaused
    choose_input_action 'Whipping+stick fuck+fisting'
    continue_until_unpaused
    choose_input_action 'Suffocation+breast pain+stimulation'
    continue_until_unpaused

    go_direction 'NorthEast'
    go_direction 'East'
    act_on_character 'Whitewhore', 'Gangbang time!'
    continue_until_unpaused
    act_on_object 'Monitoring room door', 'Knock'
    continue_until_unpaused
    act_on_character 'Tatsiana/Whitewhore, Luke, Rick and Jim', 'Participate'
    choose_input_action 'Participate'
    choose_input_action 'Participate'
    choose_input_action 'Participate'
    choose_input_action 'Participate'
    choose_input_action 'Rest'

    go_direction 'West'
    go_direction 'SouthEast'
    act_on_character 'Rob', 'Watch'
    choose_input_action 'Watch'
    choose_input_action 'Watch'
    choose_input_action 'Stop'
    act_on_character 'Rob', 'Attack'
    choose_input_action 'Whip him with the gun'
    continue_until_unpaused
    go_direction 'SouthWest'
    go_direction 'West'
    go_direction 'North'

    act_on_room 'Hide'
    act_on_self 'Wait 5 minutes'
    act_on_self 'Wait 5 minutes'
    act_on_self 'Wait 5 minutes'
    act_on_self 'Wait 5 minutes'
    act_on_self 'Wait 5 minutes'
    act_on_character 'Jim', 'Attack'
    choose_input_action 'Hit him to head'

    go_direction 'South'
    go_direction 'NorthEast'
    go_direction 'East'
    act_on_character 'Luke', 'Talk'
    choose_input_action 'Propose a double fun'
    continue_until_unpaused
    act_on_character 'Luke', 'Participate'
    choose_input_action 'Participate'
    choose_input_action 'Participate'
    choose_input_action 'Participate'
    choose_input_action 'Rest'
    act_on_character 'Luke', 'Attack'
    choose_input_action 'Hit him to head'
    choose_input_action 'Proceed'

    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'It is me!'
    act_on_character 'Eve Rock', 'Set her free'
    continue_until_unpaused
    go_direction 'NorthWest'
    go_direction 'West'
    continue_until_unpaused
    choose_input_action 'Proceed'
    continue_until_unpaused
    choose_input_action 'Point the gun at him'
    continue_until_unpaused

    # Abigail 8
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'Did your father had an arranged marriage?'
    continue_until_unpaused

    go_to_room 'Biker\'s camp'
    wait_until_hour 14
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'You are Evangelina Stone!'
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Should I call you Eve or Evangeline?'

    go_to_room 'In front of the farm'
    wait_until_hour 17
    act_on_room 'Peep'
    continue_until_unpaused

    go_to_room 'Mid-Eastern Crossroad'
    wait_until_hour 20
    go_to_room 'Seafront'
    continue_until_unpaused
    go_to_room 'Your House'
    continue_until_unpaused

    act_on_object 'Paul\'s Revolver', 'Shoot'
    continue_until_unpaused

    act_on_object 'Paul\'s Revolver', 'Give'
    choose_input_action 'Carelessly through it to him'
    act_on_object 'A revolver', 'Get it out'
    skip_next_live_timer
    skip_next_live_timer
    continue_until_unpaused
    act_on_object 'Paul\'s Revolver', 'Shoot'
    continue_until_unpaused
    act_on_object 'Paul\'s Revolver', 'Give'
    choose_input_action 'Let it fall'
    continue_until_unpaused
    act_on_object 'A revolver', 'Give'
    choose_input_action 'Paul Borowski'
    continue_until_unpaused
    act_on_object 'Paul\'s Revolver', 'Kick it to Eve'
    continue_until_unpaused # Advances day

    # Mary / Eve proof
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'I know your sister'
    continue_until_unpaused

    go_to_room 'Biker\'s camp'
    wait_until_hour 14
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Ask for the proof'
    act_on_character 'Eve Rock', 'Cast: Irresistible lust'
    choose_input_action 'Eve'
    continue_until_unpaused

    go_to_room 'Mid-South Crossroad'
    wait_until_hour 19
    go_to_room 'Bar'
    act_on_character 'Eve Rock', 'Cast: Irresistible lust'
    choose_input_action 'Eve'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # More Mary / Abigail
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'Tell Mary about Abigail'

    # Reanna's panties for Mary
    go_to_room 'In front of Willson\'s house'
    wait_until_hour 10
    act_on_room 'Burglary'
    go_to_room 'Willsons\' house. Bedroom'
    act_on_object 'wardrobe', 'Open'
    act_on_object 'Panties of Reanna', 'Take'
    go_to_room 'Barn'
    act_on_object 'Panties of Reanna', 'Give'
    choose_input_action 'Mary Stone'

    # Eve's photos for Mary
    go_to_room 'Biker\'s camp'
    wait_until_hour 14
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Ask for the proof again'

    # Abigail's photos for Mary
    go_to_room 'In front of the farm'
    wait_until_hour 17
    act_on_room 'Peep'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Share photos with Mary
    go_to_room 'Barn'
    act_on_object 'Photos of Abigail', 'Give'
    choose_input_action 'Mary Stone'
    continue_until_unpaused
    act_on_object 'Photos of Eve', 'Give'
    choose_input_action 'Mary Stone'
    continue_until_unpaused

    # Trigger Father's entrance
    go_to_room 'University Entrance'
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

    # See Vanessa's post-seduction sport pics
    go_to_room "University's Sport Ground"
    wait_until_hour 16
    act_on_character 'Vanessa Hadwin', 'Cast: Irresistible lust'
    choose_input_action 'Vanessa'
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

    act_on_self 'Next Day'
    continue_until_unpaused

    # Joshua Death Event
    go_to_room 'Barn'
    continue_until_unpaused

    # Confess Sins with Wendy
    go_to_room 'In front of the graveyard'
    wait_until_hour 16
    act_on_character 'Wendy', 'Go to confess sins'
    continue_until_unpaused

    # Confess Sins with Angela, finishing Father's seduction
    go_to_room 'Reception'
    act_on_character 'Angela Colbert', 'Go to confess sins'
    continue_until_unpaused

    # Joshua Death Peep 1
    go_to_room 'In front of the farm'
    act_on_room 'Peep'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # See confessional pics
    go_to_room 'Church'
    wait_until_hour 16
    act_on_object 'Confessional', 'Cast: Irresistible lust'
    continue_until_unpaused
    act_on_object 'Confessional', 'Cast: Irresistible lust'
    continue_until_unpaused
    act_on_object 'Confessional', 'Cast: Irresistible lust'
    continue_until_unpaused

    # Joshua Death Peep 2
    # Abigail peep scene 2
    go_to_room 'In front of the farm'
    act_on_room 'Peep'
    continue_until_unpaused

    # Mary burgle peep scene 1
    wait_until_hour 22
    execute_script("Finder.character('Simon Stone').CurrentRoom = Finder.room('SE Farm - Mary bedroom').UniqueID")
    act_on_room 'Burglary'
    go_direction 'NorthWest'
    choose_input_action 'Yes'
    continue_until_unpaused # Advances day

    # Abigail peep scene 3
    go_to_room 'In front of the farm'
    wait_until_hour 17
    act_on_room 'Peep'
    continue_until_unpaused

    # Mary burgle peep scene 2
    wait_until_hour 22
    execute_script("Finder.character('Simon Stone').CurrentRoom = Finder.room('SE Farm - Mary bedroom').UniqueID")
    act_on_room 'Burglary'
    go_direction 'NorthWest'
    choose_input_action 'Yes'
    continue_until_unpaused # Advances day

    # Abigail burgle peep scene
    go_to_room 'In front of the farm'
    wait_until_hour 22
    execute_script("Finder.character('Simon Stone').CurrentRoom = Finder.room('SE Farm - Joshua and Abigail bedroom').UniqueID")
    act_on_room 'Burglary'
    go_direction 'NorthEast'
    choose_input_action 'Yes'
    continue_until_unpaused # Advances day

    # Tell Olivia about the murder
    go_to_room 'Police Station'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Tell Olivia about Simon'
    continue_until_unpaused
    go_to_room 'In front of the farm'
    wait_until_hour 13
    act_on_room 'Peep'
    continue_until_unpaused

    # Solve the case
    go_to_room 'Mid-South Crossroad'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Propose Olivia your help with investigating Joshua\'s death'
    go_to_room 'In front of the farm'
    wait_until_hour 17
    act_on_room 'Knock'
    continue_until_unpaused
    act_on_character 'Simon Stone', 'Cast: Read mind'
    go_to_room 'Barn'
    choose_input_action 'Examine the floor'
    choose_input_action 'Examine at the ladder from below'
    choose_input_action 'Examine the place of the fall'
    choose_input_action 'Examine the entrance'
    choose_input_action 'Examine the second entrance'
    choose_input_action 'Go up'
    choose_input_action 'Examine sacks'
    choose_input_action 'Examine empty bottles'
    choose_input_action 'Examine the straw'
    choose_input_action 'Examine the upper part of the ladder'
    choose_input_action 'Examine the pitchfork'
    choose_input_action 'Go down'
    choose_input_action 'Exit'
    wait_until_hour 22
    act_on_room 'Burglary'
    # Move Simon to mary's room to interrogate abigail
    execute_script("Finder.character('Simon Stone').CurrentRoom = Finder.room('SE Farm - Mary bedroom').UniqueID")
    go_direction 'NorthEast'
    continue_until_unpaused
    choose_input_action 'Did you notice anything strange that evening?'
    continue_until_unpaused
    choose_input_action 'Leave'
    continue_until_unpaused # Advances day

    go_to_room 'In front of the farm'
    wait_until_hour 22
    act_on_room 'Burglary'
    # Move Simon to abigail's room to interrogate mary
    execute_script("Finder.character('Simon Stone').CurrentRoom = Finder.room('SE Farm - Joshua and Abigail bedroom').UniqueID")
    go_direction 'NorthWest'
    choose_input_action 'Tell me about that evening'
    continue_until_unpaused
    choose_input_action 'Ask about Joshua fears'
    continue_until_unpaused
    choose_input_action 'Leave'
    continue_until_unpaused # Advances day

    go_to_room 'In front of the farm'
    act_on_room 'Examine the bathroom window'
    wait_until_hour 22
    act_on_room 'Burglary'
    # Move Simon to mary's room to interrogate abigail
    execute_script("Finder.character('Simon Stone').CurrentRoom = Finder.room('SE Farm - Mary bedroom').UniqueID")
    go_direction 'NorthEast'
    continue_until_unpaused
    choose_input_action 'Ask about the dirt in the bathroom'
    continue_until_unpaused
    choose_input_action 'Leave'
    continue_until_unpaused # Advances day

    go_to_room 'Police Station'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Report about Stones'
    choose_input_action 'Report about footprints'
    continue_until_unpaused
    choose_input_action 'Report about the backdoor lock'
    continue_until_unpaused
    choose_input_action 'Report about the dirt behind the straw'
    continue_until_unpaused
    choose_input_action 'Report about the ladder'
    continue_until_unpaused
    choose_input_action 'Report about a pitchfork'
    continue_until_unpaused
    choose_input_action 'Report about a black man outside'
    continue_until_unpaused
    choose_input_action 'Report about Simon being out of the house'
    continue_until_unpaused
    choose_input_action 'Report about Joshua fears'
    continue_until_unpaused
    choose_input_action 'Report about dirt traces outside the bathroom'
    continue_until_unpaused
    choose_input_action 'Report about dirty clothes of Simon'
    continue_until_unpaused
    choose_input_action 'I know it was Simon!'
    choose_input_action 'Summarise the findings'
    continue_until_unpaused

    # Dildo hunt
    go_to_room 'In front of Willson\'s house'
    wait_until_hour 10
    act_on_room 'Burglary'
    go_direction 'North'
    act_on_object 'BigDildo', 'Take'
    go_direction 'South'

    go_to_room 'In front of Bolder\'s house'
    wait_until_hour 12
    act_on_room 'Burglary'
    go_direction 'NorthWest'
    act_on_object 'Wardrobe_Bolders', 'Open'
    act_on_object 'Small vibrator', 'Take'
    go_direction 'SouthEast'
    go_direction 'Out'

    act_on_self 'Next Day'
    continue_until_unpaused

    # Start mary's final steps
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'How are you?'

    # Dildo tryouts for abigail
    go_to_room 'Farm house. Living room'
    wait_until_hour 13
    act_on_character 'Abigail Stone', 'Cast: Read Mind'
    continue_until_unpaused
    go_direction 'NorthEast'
    act_on_object 'Joshua and Abigail\' wardrobe', 'Put'
    choose_input_action 'Big dildo'
    continue_until_unpaused
    go_to_room 'Farm house. Living room'
    go_direction 'NorthEast'
    act_on_object 'Joshua and Abigail\' wardrobe', 'Put'
    choose_input_action 'medium dildo'
    continue_until_unpaused
    go_to_room 'Farm house. Living room'
    go_direction 'NorthEast'
    act_on_object 'Joshua and Abigail\' wardrobe', 'Put'
    choose_input_action 'small dildo'
    continue_until_unpaused

    go_to_room 'Farm house. Living room'
    wait_until_hour 17
    act_on_character 'Abigail Stone', 'Cast: Induction to sin'
    choose_input_action 'Anger'
    continue_until_unpaused
    act_on_character 'Abigail Stone', 'Punish her'

    go_to_room 'Liberty Square'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Ask for Simon\'s tools'

    act_on_self 'Next Day'
    continue_until_unpaused

    # Mary card game
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'Would you like playing cards?'
    continue_until_unpaused
    choose_input_action 'How she lets you choosing the card'
    continue_until_unpaused
    choose_input_action 'closer to the bottom'
    continue_until_unpaused
    choose_input_action 'The way she shuffles the cards'
    continue_until_unpaused

    go_to_room 'Biker\'s camp'
    wait_until_hour 14
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Ask about Mary\'s card trick'

    # Abigail punish
    go_to_room "Farm house. Living room"
    wait_until_hour 17
    act_on_character 'Abigail Stone', 'Punish her'
    choose_input_action 'Flogger'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Mary card finish
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'Would you like playing cards?'
    continue_until_unpaused
    choose_input_action 'The way she shuffles the cards'
    continue_until_unpaused
    choose_input_action 'quickly turn the card'
    continue_until_unpaused
    choose_input_action 'How she looks for your card'
    continue_until_unpaused

    # Mary extra scene
    go_to_room 'Farm house. Living room'
    wait_until_hour 13
    act_on_character 'Mary Stone', 'Cast: Irresistible lust'
    choose_input_action 'Mary'
    continue_until_unpaused

    # Abigail punish 2
    go_to_room 'Farm house. Living room'
    wait_until_hour 17
    act_on_character 'Abigail Stone', 'Punish her'
    choose_input_action 'Flogger'
    continue_until_unpaused
    choose_input_action 'Hook her ass'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Mary extra scene
    go_to_room 'Barn'
    act_on_character 'Mary Stone', 'Cast: Irresistible lust'
    choose_input_action 'Mary'
    continue_until_unpaused

    # Abigail punish 3
    go_to_room 'Farm house. Living room'
    wait_until_hour 17
    act_on_character 'Abigail Stone', 'Punish her'
    choose_input_action 'Flogger'
    continue_until_unpaused
    choose_input_action 'Stick to her mouth'
    continue_until_unpaused
    choose_input_action 'Fuck her mouth'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    # Abigail punish 4
    go_to_room 'Farm house. Living room'
    wait_until_hour 17
    act_on_character 'Abigail Stone', 'Punish her'
    choose_input_action 'Flogger'
    continue_until_unpaused
    choose_input_action 'Hook her ass'
    continue_until_unpaused
    choose_exact_input_action 'Fuck her'
    continue_until_unpaused

    # Mary inside scene
    go_to_room 'Farm house. Living room'
    wait_until_hour 20
    act_on_character 'Mary Stone', 'Cast: Irresistible lust'
    choose_input_action 'Mary'
    continue_until_unpaused

    # Mary + abigail
    go_to_room 'Farm house. Living room'
    act_on_character 'Mary Stone', 'Talk'
    choose_input_action 'Speak about Abigail'
    continue_until_unpaused

    go_to_room 'Farm house. Living room'
    act_on_character 'Abigail Stone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Abigail'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    wait_until_hour 13
    go_to_room 'Farm house. Living room'
    act_on_character 'Abigail Stone', 'Cast: Irresistible lust'
    choose_input_action 'Abigail and Mary'
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
    continue_until_unpaused

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
    continue_until_unpaused
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

    # Reanna quest
    go_to_room "In front of Willson's house"
    wait_until_hour 20
    go_to_room 'Willsons\' house'
    act_on_character 'Reanna Willson', 'Examine'
    act_on_character 'Reanna Willson', 'Talk'
    choose_input_action 'I would like to apologise'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room "In front of Willson's house"
    wait_until_hour 17
    act_on_room 'Peep'
    continue_until_unpaused
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'Willsons\' house. Bedroom'

    act_on_character 'Reanna Willson', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Would you like to go out for a drink with me?'
    continue_until_unpaused

    go_to_room "In front of Willson's house"
    wait_until_hour 21
    go_to_room 'Willsons\' house'
    act_on_character 'Reanna Willson', 'Go to the bar'
    continue_until_unpaused
    choose_input_action 'Ask how he met Reanna'
    continue_until_unpaused
    choose_input_action 'Lick-Drink-Shake-Lick-Drink-Shake-Lick-Suck'
    choose_input_action 'Lick-Drink-Shake-Lick-Drink-Shake-Lick-Suck'
    choose_input_action 'Lick-Drink-Shake-Lick-Drink-Shake-Lick-Suck'
    continue_until_unpaused
    fill_in_text_input 'yellow submarine'
    continue_until_unpaused
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room "In front of Willson's house"
    wait_until_hour 21
    go_to_room 'Willsons\' house'
    act_on_character 'Ted Willson', 'Examine'
    act_on_character 'Ted Willson', 'Talk'
    choose_input_action 'Chat'
    act_on_object 'Photos of Reanna', 'Give'
    choose_input_action 'Ted Willson'
    continue_until_unpaused
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room "In front of Willson's house"
    act_on_room 'Burglary'
    act_on_room 'Burgle: go upstairs'
    act_on_character 'Reanna Willson', 'Examine'
    act_on_character 'Reanna Willson', 'Cast: Read sins'
    continue_until_unpaused
    act_on_object 'Reanna\'s clothes', 'Steal: search through'
    continue_until_unpaused

    go_to_room "In front of Willson's house"
    act_on_self 'Wait an hour'
    act_on_self 'Wait an hour'
    act_on_room 'Burglary'
    go_direction 'North'
    act_on_object 'wardrobe', 'Open'
    act_on_object 'box', 'Examine'
    act_on_object 'box', 'Open'
    continue_until_unpaused
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room "In front of Willson's house"
    act_on_room 'Burglary'
    act_on_room 'Burgle: go upstairs'
    go_to_room 'Willsons\' house. Bedroom'
    act_on_character 'Reanna Willson', 'Kidnap Reanna'
    continue_until_unpaused

    act_on_character 'Reanna Willson', 'Examine'
    act_on_character 'Reanna Willson', 'Question Reanna'
    continue_until_unpaused
    act_on_self 'Next Day'
    continue_until_unpaused

    # Question1 fuck pics
    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Fuck'
    continue_until_unpaused
    choose_input_action 'Leave'
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Tease'
    continue_until_unpaused
    choose_input_action 'Leave'
    act_on_self 'Next Day'
    continue_until_unpaused

    # Question2 fuck pics (requires 1 tease buildup)
    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Fuck'
    continue_until_unpaused
    choose_input_action 'Leave'
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Tease'
    continue_until_unpaused
    choose_input_action 'Leave'
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Tease'
    continue_until_unpaused
    choose_input_action 'Leave'
    continue_until_unpaused
    act_on_self 'Next Day'
    continue_until_unpaused

    # Question3 fuck pics (requires 2 tease buildup)
    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Fuck'
    continue_until_unpaused
    choose_input_action 'Leave'
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Tease'
    continue_until_unpaused
    choose_input_action 'Leave'
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Tease'
    continue_until_unpaused
    choose_input_action 'Leave'
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'ME Abandoned house'
    act_on_character 'Reanna Willson', 'Question Reanna'
    choose_input_action 'Tease'
    continue_until_unpaused
    choose_input_action 'Leave'
    continue_until_unpaused

    go_to_room "In front of Willson's house"
    wait_until_hour 21
    go_to_room 'Willsons\' house'
    act_on_character 'Ted Willson', 'Bring Ted to Reanna'
    continue_until_unpaused

    go_to_room 'Willsons\' house'
    go_direction 'North'

    act_on_character 'Reanna Willson', 'Cast: Irresistible lust'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Graveyard'
    wait_until_hour 10

    act_on_character 'Dada Blake', 'Talk'
    choose_input_action 'Introduce yourself'
    choose_input_action 'Lie: I came to visit an old friend of mine'
    continue_until_unpaused
    choose_input_action 'Andrew Brown'
    act_on_character 'Dada Blake', 'Talk'
    choose_input_action 'How was the funeral?'
    act_on_character 'Dada Blake', 'Talk'
    choose_input_action 'How was the final speech of the priest?'
    continue_until_unpaused

    go_to_room 'Church'
    wait_until_hour 12
    go_direction 'North'
    act_on_object 'Drying clothes', 'Steal'
    continue_until_unpaused

    go_to_room 'Church'
    wait_until_hour 16
    act_on_object 'Confessional', 'confess your sins'
    choose_input_action 'Egg on: I do not know how to behave'
    continue_until_unpaused

    go_to_room 'Graveyard'
    act_on_character 'Dada Blake', 'Talk'
    choose_input_action 'Lets give to the dead man what he deserves'
    continue_until_unpaused
    act_on_character 'Dada Blake', 'Cast: Read Sins'
    continue_until_unpaused

    go_to_room 'ME Abandoned house'
    act_on_object 'Drug pills', 'Take'

    go_to_room 'In front of a Bar'
    wait_until_hour 19
    go_direction 'In'
    buy_alcohol 'Vodka'

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Graveyard'
    wait_until_hour 10
    act_on_object 'Vodka', 'Give'
    choose_input_action 'Dada Blake'
    continue_until_unpaused
    choose_input_action '"Lets drink for Andrew. Rest in peace, old friend."'
    choose_input_action '"Lets drink for poor soul of Andrew again."'
    choose_input_action 'Add a pill to the bottle'
    continue_until_unpaused

    # Fuck around on the first day getting all the pictures
    go_to_room 'Graveyard'
    wait_until_hour 10
    act_on_character 'Dada Blake', 'Talk'
    choose_input_action 'How are you going to live now?'
    continue_until_unpaused
    act_on_character 'Dada Blake', 'Go to Jefferson\'s company'
    continue_until_unpaused

    go_to_room 'Secretary office'
    act_on_character 'Lisa (Secretary)', 'Examine'

    go_to_room 'Open Office'
    act_on_character 'Polly (Employee 1)', 'Examine'
    act_on_character 'Mary (Employee 2)', 'Examine'
    act_on_character 'Sandra (Employee 2)', 'Examine'

    go_to_room 'Human Resources office'
    act_on_character 'Elli (HR manager)', 'Examine'

    go_to_room 'Alice Blunt\'s office'
    act_on_character 'Alice Blunt', 'Examine'

    go_to_room 'SysAdmin room'
    act_on_character 'Kevin (SysAdmin)', 'Examine'

    go_to_room 'Secretary office'
    act_on_room 'Burglary: Boss office'
    continue_until_unpaused

    wait_until_hour(14, janitor: true)
    act_on_room 'Burglary: Alisa Blunt\'s Office'
    continue_until_unpaused

    wait_until_hour(16, janitor: true)
    act_on_room 'Burglary: HR office'
    continue_until_unpaused

    # Actually do the quest on day 2
    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'Graveyard'
    wait_until_hour 10
    act_on_character 'Dada Blake', 'Go to Jefferson\'s company'
    continue_until_unpaused

    wait_until_hour(12, janitor: true)
    act_on_room 'Burglary: IT Office'
    act_on_object 'Router', 'Unplug a wire'
    choose_input_action 'Secretary'
    continue_until_unpaused
    choose_input_action 'Yes'
    choose_input_action 'Tell that you are admin and ask for credentials'
    continue_until_unpaused

    go_to_room 'Corridor'
    wait_until_hour(13, janitor: true)
    act_on_room 'Burglary: Secretary office'
    act_on_object 'Computer', 'Enter'
    fill_in_text_input 'SuckItYourself'
    choose_input_action 'Read e-mails'
    continue_until_unpaused

    act_on_room 'Burglary: Boss office'
    act_on_object 'Wardrobe', 'Rummage'
    go_direction 'South'
    act_on_object 'Computer', 'Enter'
    choose_input_action 'Write an e-mail'
    continue_until_unpaused

    go_to_room 'Human Resources office'
    act_on_character 'Elli (HR manager)', 'Talk'
    choose_input_action 'Fuck it, bitch. Come here!'
    continue_until_unpaused

    go_to_room 'Corridor'
    go_direction 'Out'
    continue_until_unpaused

    go_to_room 'Graveyard'
    act_on_character 'Dada Blake', 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Graveyard'
    wait_until_hour 10
    act_on_character 'Dada Blake', 'Cast: Irresistible lust'
    continue_until_unpaused

    # Back to Tessa and Helen
    go_to_room 'University Entrance'
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Seduce Creig'
    continue_until_unpaused

    wait_until_day("Monday")
    go_to_room 'Linnaeus room'
    wait_until_hour 10
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'What are you going to do about Creig?'
    continue_until_unpaused
    act_on_character 'Tessa Clayton', 'Cast: Read Sins'
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Keeping Creig as an obidient student is more beneficial.'
    continue_until_unpaused
    act_on_character 'Tessa Clayton', 'Cast: Read Sins'
    continue_until_unpaused
    wait_until_hour 19
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Lets go for a drink'
    continue_until_unpaused

    act_on_character 'Tessa Clayton', 'Play Draughts'
    continue_until_unpaused
    player_piece = page.find('#MainText').text.match(/Ok, you play (white|black)/)[1]
    opponent_piece = (%w(white black) - [player_piece])[0]

    choose_input_action 'Advance'
    choose_input_action 'Ask about the award'
    act_on_object 'Captured pieces', ["Take a ", player_piece, " checker"].join
    act_on_object 'Board', ["Remove a ", opponent_piece, " piece"].join
    skip_next_live_timer
    choose_input_action 'Defend'
    choose_input_action 'Drop a piece'
    act_on_object 'Board', ["Put a ", player_piece, " piece on board"].join
    act_on_object 'Captured pieces', ["Take a ", opponent_piece, " checker"].join
    skip_next_live_timer
    choose_input_action 'Advance'
    choose_input_action 'Touch her leg'
    act_on_object 'Board', ["Remove a ", player_piece, " piece"].join
    skip_next_live_timer
    choose_input_action 'Advance'
    continue_until_unpaused

    # Learn 'Forgery'
    # Seem to need to leave and enter the house before you're able to learn
    go_direction 'Out'
    go_direction 'In'
    act_on_self 'Learn'
    continue_until_unpaused

    go_to_room 'Linnaeus room'
    wait_until_hour 10
    act_on_character 'Tessa Clayton', 'Cast: Read Sins'
    continue_until_unpaused

    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Talk'
    choose_input_action 'Do you have Hpnotiq?'

    go_to_room 'Supermarket'
    act_on_character 'Clerk', 'Talk'
    choose_input_action 'Do you have Hpnotiq?'
    continue_until_unpaused
    choose_input_action 'Because you will fuck her as a worthless whore'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'Biker\'s camp'
    wait_until_hour 14
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Invite her to a bar'
    continue_until_unpaused

    go_to_room 'Linnaeus room'
    act_on_character 'Tessa Clayton', 'Talk'
    choose_input_action 'Invite her to a small party in a bar'
    wait_until_hour 19
    act_on_character 'Tessa Clayton', 'Go to bar'
    continue_until_unpaused

    # Get the last Tessa pics
    go_to_room 'Linnaeus room'
    wait_until_hour 10
    act_on_character 'Tessa Clayton', 'Cast: Irresistible lust'
    continue_until_unpaused

    # Back to Helen Coombs
    go_to_room 'Supermarket'
    act_on_character 'Wendy\'s mother', 'Talk'
    choose_input_action 'Ask about Helen Coombs'
    continue_until_unpaused

    go_to_room 'Supermarket'
    act_on_character 'Wendy\'s mother', 'Go to Helen'
    continue_until_unpaused

    go_to_room 'Herodot room'
    wait_until_hour 13
    act_on_character 'Helen Coombs', 'Cast: Read sins'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'Supermarket'
    act_on_character 'Wendy\'s mother', 'Talk'
    choose_input_action 'Speak about Helen again'
    continue_until_unpaused
    go_to_room 'Herodot room'
    wait_until_hour 13
    act_on_character 'Helen Coombs', 'Talk'
    choose_input_action 'Lie: Mr. Bryson asked you to come'
    act_on_object 'Helen\'s handbag', 'Examine'
    act_on_object 'Helen\'s handbag', 'Rummage inner pocket'
    act_on_object 'Helen\'s handbag', 'Rummage outer pocket'
    act_on_object 'Helen\'s handbag', 'Rummage zipped pocket'
    act_on_object 'Helen\'s handbag', 'Rummage main part'
    act_on_object 'Helen\'s handbag', 'Rummage secondary part'
    skip_next_live_timer
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Supermarket'
    act_on_character 'Wendy\'s mother', 'Talk'
    choose_input_action 'Tell Anabelle about the prescription'
    act_on_character 'Wendy\'s mother', 'Forge the prescription'
    choose_input_action 'Armentadoln'
    choose_input_action 'Amberson'
    choose_input_action 'Signature 2'

    wait_until_day("Monday")
    go_to_room 'Supermarket'
    act_on_character 'Wendy\'s mother', 'Talk'
    choose_input_action 'About prescription'
    go_to_room 'Herodot room'
    wait_until_hour 13
    act_on_object 'Helen\'s handbag', 'Substitute the pills'
    continue_until_unpaused
    act_on_character 'Helen Coombs', 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Herodot room'
    wait_until_hour 13
    act_on_character 'Helen Coombs', 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Herodot room'
    wait_until_hour 13
    act_on_character 'Helen Coombs', 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Herodot room'
    continue_until_unpaused
    go_to_room 'Herodot room'
    wait_until_hour 13
    act_on_character 'Helen Coombs', 'Cast: Induce to sin'
    choose_input_action 'Lust'
    continue_until_unpaused
    act_on_character 'Helen Coombs', 'Cast: Irresistible lust'
    continue_until_unpaused

    # Back to Quincy
    go_to_room 'University Entrance'
    act_on_object 'University rules note', 'Read'
    go_to_room 'Pythagoras room'
    act_on_character 'Quincy Robson', 'Talk'
    choose_input_action 'Ask about his plan to eleminate vice-president Bryson.'
    act_on_character 'Quincy Robson', 'Talk'
    choose_input_action 'Report to Quincy'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'University\'s Sport Ground'
    wait_until_hour 10
    act_on_room 'Panty Robbery'
    continue_until_unpaused
    act_on_object 'Rubi\'s locker', 'find panties'
    choose_input_action 'in a bag'
    continue_until_unpaused
    act_on_object 'Eliza\'s locker', 'find panties'
    choose_input_action 'on the floor'
    continue_until_unpaused
    act_on_object 'Mia\'s locker', 'find panties'
    choose_input_action 'in the locker'
    continue_until_unpaused
    act_on_object 'Kate\'s locker', 'find panties'
    choose_input_action 'between clothes'
    continue_until_unpaused
    act_on_object 'Emma\'s locker', 'find panties'
    choose_input_action 'on the locker'
    continue_until_unpaused
    act_on_object 'Dakota\'s locker', 'find panties'
    choose_input_action 'on the floor'
    continue_until_unpaused

    wait_until_day("Monday")
    go_to_room 'Pythagoras room'
    act_on_character 'Quincy Robson', 'Talk'
    choose_input_action 'Ask about Mr Bryson'
    continue_until_unpaused

    # Principal
    act_on_character 'Quincy Robson', 'Talk'
    choose_input_action 'Introduce to the Principal'
    continue_until_unpaused
    go_to_room 'In front of the University'
    act_on_character 'Group of students', 'Spy on them'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'LS University - Principle office'
    act_on_character 'Jacob Rosinstein', 'Talk'
    choose_input_action 'Report on students behaviour'
    choose_input_action 'Report about students kissing each other.'
    continue_until_unpaused

    go_to_room 'University Entrance'
    act_on_character 'Group of students', 'Spy on them'
    continue_until_unpaused
    go_to_room 'LS University - Principle office'
    act_on_character 'Jacob Rosinstein', 'Talk'
    choose_input_action 'Report on students behaviour'
    choose_input_action 'Report about students touching each other.'
    continue_until_unpaused

    go_to_room 'University\'s Sport Ground'
    act_on_character 'Group of students', 'Spy on them'
    continue_until_unpaused
    go_to_room 'LS University - Principle office'
    act_on_character 'Jacob Rosinstein', 'Talk'
    choose_input_action 'Report on students behaviour'
    choose_input_action 'Report about students humiliate each other.'
    continue_until_unpaused
    choose_input_action 'Spanking'

    # See student stripping scene
    go_to_room 'University Entrance'
    act_on_character 'Group of students', 'Spy on them'
    continue_until_unpaused
    choose_input_action 'No'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'University Entrance'
    act_on_character 'Group of students', 'Spy on them'
    continue_until_unpaused
    choose_input_action 'Yes'
    continue_until_unpaused

    go_to_room 'In front of the University'
    act_on_character 'Group of students', 'Spy on them'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'University\'s Sport Ground'
    act_on_character 'Carli', 'Examine'
    freeze_game_variable('CarliRnd')
    set_game_variable('CarliRnd', "20") # force carli interaction to reveal secret
    act_on_character 'Carli', 'Spy on her'
    continue_until_unpaused
    act_on_room 'Peep'
    continue_until_unpaused
    skip_next_live_timer

    go_to_room 'LS University - Principle office'
    act_on_character 'Jacob Rosinstein', 'Talk'
    choose_input_action 'Report about Carli'
    continue_until_unpaused
    choose_input_action 'Search her'
    continue_until_unpaused
    choose_input_action 'Search her pussy'
    continue_until_unpaused

    # Leave and enter to see next scene
    go_direction 'South'
    go_direction 'North'
    continue_until_unpaused

    go_to_room 'LS University - Principle office'
    act_on_character 'Jacob Rosinstein', 'Cast: Read sins'
    continue_until_unpaused
    go_to_room 'University Entrance'
    act_on_character 'Rubi Patterson', 'Talk'
    choose_input_action 'Ask about Molly'
    continue_until_unpaused
    act_on_character 'Molly Elton', 'Examine'
    act_on_object 'camera', 'Shoot'
    choose_input_action 'Molly Elton'
    continue_until_unpaused

    go_to_room 'Your House'
    act_on_object 'laptop', 'Photoshop Molly\'s photos'
    choose_input_action 'Make a decision'
    ['Samantha Rone', 'Krystal Orchid', 'Alice March'].each do |viable_person|
      if page.all('.inputchoices', text: viable_person, minimum: 0).length > 0
        choose_input_action viable_person
        break
      end
    end
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'LS University - Principle office'
    act_on_object 'Photos of nude Molly', 'Give'
    choose_input_action 'Jacob Rosinstein'
    continue_until_unpaused
    go_to_room 'Teacher\'s room'
    wait_until_hour 12
    act_on_object 'Principle door', 'Unlock'
    continue_until_unpaused

    wait_until_day("Monday")
    go_to_room 'LS University - Principle office'
    act_on_character 'Jacob Rosinstein', 'Talk'
    choose_input_action 'Have you already tried the sweet cherry of Molly Elton?'
    continue_until_unpaused
    act_on_character 'Jacob Rosinstein', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Threaten her to expel'
    continue_until_unpaused
    act_on_character 'Jacob Rosinstein', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Give her a bad mark for a test'
    continue_until_unpaused
    act_on_character 'Jacob Rosinstein', 'Talk'
    choose_input_action 'Egg on'
    choose_input_action 'Blackmail her'
    continue_until_unpaused
    act_on_object 'Photos of nude Molly', 'Blackmail Molly'
    continue_until_unpaused

    go_to_room 'University Entrance'
    wait_until_hour 10
    act_on_object 'Envelop for Molly', 'Give'
    choose_input_action 'Molly Elton'
    continue_until_unpaused
    wait_until_hour 12
    until current_time[:minute] == 50
      act_on_self 'Wait 10 minutes'
    end
    act_on_character 'Molly Elton', 'Go to the Principal\'s office.'
    continue_until_unpaused

    wait_until_hour 20
    act_on_object 'Principle door', 'Unlock'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused

    go_to_room 'Biker\'s camp'
    act_on_character 'Gina Blaze', 'Talk'
    choose_input_action 'Pay a visit to the university'
    continue_until_unpaused

    go_to_room 'Pythagoras room'
    act_on_room 'Look for the main switch'

    go_to_room 'University Entrance'
    act_on_character 'Molly Elton', 'Talk'
    choose_input_action 'Chat'
    act_on_character 'Molly Elton', 'Talk'
    choose_input_action 'Ask Molly for help'

    go_to_room 'Pythagoras room'
    wait_until_hour 20
    act_on_object 'Main switch panel', 'Switch off the light'
    continue_until_unpaused

    # Eve start reunion
    go_to_room 'Seafront'
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Ask about family reunion'
    continue_until_unpaused

    # Tessa beach scene
    act_on_character 'Tessa Clayton', 'Cast: Irresistible lust'
    continue_until_unpaused

    # Eve farm scenes
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Farm. Mary\'s bedroom'
    act_on_character 'Eve Rock', 'Examine'
    act_on_character 'Eve Rock', 'Talk'
    choose_input_action 'Chat'
    act_on_character 'Eve Rock', 'Cast: Irresistible lust'
    choose_input_action 'Eve'
    continue_until_unpaused

    wait_until_hour 12
    go_to_room 'Pool [SE Farm - Pool]'
    act_on_character 'Eve Rock', 'Cast: Irresistible lust'
    choose_input_action 'Eve'
    continue_until_unpaused

    # More abigail scenes
    go_to_room 'Barn'
    wait_until_hour 17
    act_on_character 'Abigail Stone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Abigail'
    continue_until_unpaused
    go_to_room 'Barn'
    act_on_character 'Abigail Stone', 'Cast: Irresistible lust'
    choose_input_action 'Abigail and Mary'
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'In front of the farm'
    wait_until_hour 15
    go_to_room 'Pool [SE Farm - Pool]'
    continue_until_unpaused # In case the easter egg event fires
    go_to_room 'Pool [SE Farm - Pool]'
    act_on_character 'Mary Stone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Mary'
    continue_until_unpaused

    # Eve guest easter egg
    wait_until_day 'Tuesday'
    go_to_room 'In front of the farm'
    wait_until_hour 9
    go_direction 'In'
    continue_until_unpaused

    # Abigail prost (tuesdays only)
    go_to_room 'Seafront'
    wait_until_hour 20
    act_on_character 'Abigail Stone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Abigail'
    continue_until_unpaused

    # Abigail pool easter egg
    wait_until_day 'Thursday'
    go_to_room "Farm house. Living room"
    wait_until_hour 15
    go_to_room 'Pool [SE Farm - Pool]'
    continue_until_unpaused
    go_to_room 'Pool [SE Farm - Pool]'
    act_on_character 'Abigail Stone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Abigail'
    continue_until_unpaused

    # Abigail + eve easter egg
    go_to_room "In front of the farm"
    wait_until_hour 20
    go_direction "In"
    continue_until_unpaused

    # Mary prost (unfortunately not enough time to do it on the same thursday)
    act_on_self 'Next Day'
    continue_until_unpaused
    wait_until_day 'Thursday'
    go_to_room "Seafront"
    wait_until_hour 20
    act_on_character 'Mary Stone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Mary'
    continue_until_unpaused

    # Clive's ousting
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Police Station'
    continue_until_unpaused

    go_to_room 'Police Station'
    act_on_character 'Clive Coleman', 'Examine'
    act_on_character 'Clive Coleman', 'Talk'
    choose_input_action 'Ask about retirement'
    continue_until_unpaused
    go_to_room 'Cells'
    act_on_character 'Leo Coleman', 'Examine'
    act_on_character 'Leo Coleman', 'Talk'
    choose_input_action 'Chat'
    go_to_room 'Police Station'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Speak about Leo'
    continue_until_unpaused
    go_to_room 'Cells'
    act_on_character 'Leo Coleman', 'Talk'
    choose_input_action 'Speak about his work'
    continue_until_unpaused
    go_to_room 'Police Station'
    act_on_object 'Clive\'s table', 'Examine'
    act_on_object 'Camera manual', 'Examine'
    act_on_object 'Camera manual', 'Read'
    continue_until_unpaused
    go_to_room 'Your House'
    act_on_object 'laptop', 'Search for IP cameras'
    choose_input_action 'DCS-7513'
    wait_until_day 'Tuesday'
    go_to_room 'Mid-Eastern Crossroad'
    wait_until_hour 20
    go_to_room 'Seafront'
    continue_until_unpaused
    go_to_room 'Cells'
    act_on_character 'Abigail Stone', 'Cast: Irresistible lust'
    choose_exact_input_action 'Abigail'
    continue_until_unpaused # Advances day

    go_to_room 'Police Station'
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'About Clive Coleman'
    continue_until_unpaused

    # Creig the witcher
    go_to_room 'South-Eastern Crossroad'
    continue_until_unpaused

    go_to_room 'Police Station'
    continue_until_unpaused
    act_on_character 'Olivia Osborne', 'Talk'
    choose_input_action 'Accuse Creig'
    continue_until_unpaused

    # Olivia taken
    act_on_self 'Next Day'
    continue_until_unpaused

    # Peep creig with mom
    go_to_room "In front of Bolder's house"
    act_on_room 'Peep'
    continue_until_unpaused

    # Burgle creig
    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room "In front of Bolder's house"
    act_on_room 'Peep'
    continue_until_unpaused
    act_on_object 'Old witchraft book', 'Take'
    continue_until_unpaused
    act_on_room 'Get out'

    go_to_room 'Deeper Park'
    act_on_room 'Search'
    choose_input_action 'Oak'
    continue_until_unpaused

    go_to_room 'Church'
    act_on_object 'Ritual chalice', 'Steal'

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'Farm house. Living room'
    wait_until_hour 13
    act_on_character 'Abigail Stone', 'Talk'
    choose_input_action 'Do you squirt?'
    act_on_character 'Abigail Stone', 'Ask for some squirt'
    continue_until_unpaused

    # Keep fiddling around to see all creig ntr pics
    wait_until_hour 16
    continue_until_unpaused
    wait_until_hour 20
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    wait_until_hour 10
    continue_until_unpaused
    wait_until_hour 16
    continue_until_unpaused
    wait_until_hour 20
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    wait_until_hour 10
    continue_until_unpaused
    wait_until_hour 16
    continue_until_unpaused
    wait_until_hour 20
    continue_until_unpaused

    act_on_self 'Next Day'
    continue_until_unpaused
    wait_until_weekday
    go_to_room 'Herodot room'
    act_on_object 'chalk', 'Steal'

    go_to_room 'In front of a Bar'
    wait_until_hour 19
    go_to_room 'Bar'
    act_on_character 'Katie Jewel', 'Buy alcoholic beverage'
    choose_input_action 'Gin'

    act_on_self 'Next Day'
    continue_until_unpaused
    go_to_room 'In front of Bolder\'s house'
    act_on_room 'Peep'
    continue_until_unpaused
    act_on_object 'Old witchraft book', 'Take'
    continue_until_unpaused

    go_to_room 'In front of a Bar'
    wait_until_hour 19
    go_to_room 'Bar'
    continue_until_unpaused
    choose_input_action 'Help the Hunter'
    continue_until_unpaused

    puts image_reporter.percentage_seen_report
    if image_reporter.percentage_seen_for_game > 50
      image_reporter.report_missing_images('tmp/thesinner_missing_images.txt')
    end

    # Hunter quest
    act_on_room 'Write a denouncement letter'
    choose_input_action 'Make your choice'
    choose_input_action 'Template 1'
    choose_input_action 'Creig Bolder'
    go_to_room 'In front of the church', beware_creig: true
    act_on_object 'Church\'s mail box', 'Drop a mail'

    go_to_room 'Your House', beware_creig: true
    act_on_room 'Write a denouncement letter'
    choose_input_action 'Make your choice'
    choose_input_action 'Template 2'
    choose_input_action 'Joe Spencer'
    go_to_room 'In front of the church', beware_creig: true
    act_on_object 'Church\'s mail box', 'Drop a mail'

    go_to_room 'Your House', beware_creig: true
    act_on_room 'Write a denouncement letter'
    choose_input_action 'Make your choice'
    choose_input_action 'Template 3'
    choose_input_action 'Conrad Jefferson'
    go_to_room 'In front of the church', beware_creig: true
    act_on_object 'Church\'s mail box', 'Drop a mail'

    go_to_room 'Your House', beware_creig: true
    act_on_room 'Write a denouncement letter'
    choose_input_action 'Make your choice'
    choose_input_action 'Template 4'
    choose_input_action 'Quincy Robson'
    go_to_room 'In front of the church', beware_creig: true
    act_on_object 'Church\'s mail box', 'Drop a mail'
    # Kill the rest of the day since you're not allowed to sleep
    go_direction 'In'
    while !main_text.include?('It is too late. I should go to sleep')
      go_direction 'Out'
      go_direction 'In'
    end
    continue_until_unpaused

    # Hunter day 2 - hex bag
    act_on_room 'Look around'
    act_on_object 'kitchen', 'Open'
    act_on_object 'Knife', 'Take'
    act_on_object 'your bed', 'Look under'
    act_on_object 'Old sneakers', 'Take the laces out'
    act_on_object 'your bed', 'Look closer'
    act_on_object 'pillow', 'Cut the pillow'
    act_on_object 'Knife', 'Cut your hair'
    act_on_object 'Knife', 'Cut yourself'
    choose_input_action 'your shoulder'
    act_on_object 'Waste bin', 'Rummage the waste bin'
    choose_input_action 'Chicken bones'
    act_on_object 'Old witchraft book', 'Cast'
    choose_input_action 'Hex bags'
    choose_input_action 'your hair'
    choose_input_action 'your blood'
    choose_input_action 'tissue'
    choose_input_action 'shoelaces'
    choose_input_action 'Chicken bones'
    choose_input_action 'Finish'
    continue_until_unpaused
    act_on_object 'kitchen', 'Hide the hex bag'
    act_on_object 'Knife', 'Wash the knife'
    act_on_object 'kitchen', 'Clean Kitchen'

    # More ingredients
    go_to_room 'Beach'
    act_on_room 'Walk alone the shore'

    go_to_room 'ME Museum'
    act_on_room 'Shop'

    go_to_room 'Barn'
    act_on_room 'Search for poultry manure'

    go_to_room 'In front of Bolder\'s house'
    act_on_room 'Burglary'
    go_direction 'East'
    act_on_object 'Creig\'s comb', 'Remove hair'
    go_direction 'West'

    go_direction 'NorthWest'
    continue_until_unpaused
    go_direction 'Out'
    continue_until_unpaused
    # Kill the rest of the day since you're not allowed to sleep
    go_to_room 'In front of my house'
    set_time 23, 40
    go_direction 'In'
    while !main_text.include?('It is too late. I should go to sleep')
      go_direction 'Out'
      go_direction 'In'
    end
    continue_until_unpaused

    go_to_room 'In front of Bolder\'s house', beware_creig: true
    go_direction 'In'
    continue_until_unpaused
    act_on_room 'Peep'
    continue_until_unpaused
    go_direction 'North'
    act_on_character 'Girl in a cell', 'Examine'
    act_on_character 'Girl in a cell', 'Talk'
    choose_input_action 'Hello'
    choose_input_action 'Yes'
    act_on_character 'Girl in a cell', 'Talk'
    choose_input_action 'The master is not pleased with you! I must take his sperm!'
    go_direction 'South'
    go_direction 'Out'
    go_to_room 'Your House', beware_creig: true
    act_on_object 'Old witchraft book', 'Cast'
    choose_input_action 'Face borrowing'
    choose_input_action 'seaweeds'
    choose_input_action 'poultry manure'
    choose_input_action 'Creig\'s sperm'
    choose_input_action 'perfume'
    choose_input_action 'Finish'
    continue_until_unpaused

    go_to_room 'In front of Bolder\'s house', beware_creig: true
    act_on_room 'Burglary'
    go_direction 'NorthEast'
    continue_until_unpaused
    act_on_object 'Wardrobe', 'Hide the old witchcraft book'
    continue_until_unpaused
    go_direction 'SouthWest'
    go_direction 'Out'
    # Kill the rest of the day since you're not allowed to sleep
    go_to_room 'In front of my house', beware_creig: true
    set_time 23, 40
    go_direction 'In'
    while !main_text.include?('It is too late. I should go to sleep')
      go_direction 'Out'
      go_direction 'In'
    end
    continue_until_unpaused
    puts image_reporter.percentage_seen_report
    if image_reporter.percentage_seen_for_game > 50
      image_reporter.report_missing_images('tmp/thesinner_missing_images.txt')
    end

    export_savegames 'tmp/play_around_070'
    # TODO: lust tessa at the beach on a weekend (~17:00?)
  end
end