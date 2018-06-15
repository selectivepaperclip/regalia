module MeAgainstTheWorldHelper
  GAME_MAP = {
    "Lecturehall" => {
      "South" => "College hallway West"
    },
    "College hallway West" => {
      "North" => "Lecturehall",
      "East" => "College"
    },
    "College" => {
      "East" => "College hallway East",
      "South" => "Schoolstreet",
      "West" => "College hallway West"
    },
    "College hallway East" => {
      "East" => "College gym",
      "West" => "College"
    },
    "College gym" => {
      "East" => "Gym storage shed",
      "West" => "College hallway East"
    },
    "Gym storage shed" => {
      "West" => "College gym"
    },
    "Schoolstreet" => {
      "North" => "College",
      "SouthEast" => "Department store",
      "West" => "Cloverstreet"
    },
    "Department store" => {
      "NorthWest" => "Schoolstreet",
      "NorthEast" => "Cafe",
      "SouthEast" => "Gym",
      "SouthWest" => "Drugstore",
      "Up" => "Clothing store"
    },
    "Cafe" => {
      "SouthWest" => "Department store"
    },
    "Gym" => {
      "NorthWest" => "Department store"
    },
    "Drugstore" => {
      "NorthEast" => "Department store"
    },
    "Clothing store" => {
      "Down" => "Department store"
    },
    "Cloverstreet" => {
      "North" => "My home",
      "East" => "Schoolstreet",
      "SouthWest" => "Saya's backyard"
    },
    "Saya's backyard" => {
      "NorthEast" => "Cloverstreet",
      "In" => "Saya's room"
    },
    "Saya's room" => {
      "Out" => "Saya's backyard"
    },
    "My home" => {
      "North" => "My room",
      "South" => "Cloverstreet",
      "West" => "Study"
    },
    "My room" => {
      "South" => "My home"
    },
    "Study" => {
      "East" => "My home",
      "Down" => "Hidden study"
    },
    "Hidden study" => {
      "Up" => "Study"
    },
    "Flataustreet" => {
      "SouthEast" => "Copernicusstreet",
      "Down" => "Nerv HQ"
    },
    "Copernicusstreet" => {
      "NorthWest" => "Flataustreet",
      "East" => "Galileo bridge",
      "In" => "Fortuneteller's tent"
    },
    "Fortuneteller's tent" => {
      "Out" => "Copernicusstreet"
    },
    "Galileo bridge" => {
      "East" => "Ashford university gates",
      "West" => "Copernicusstreet",
      "Down" => "Storm drain"
    },
    "Ashford university gates" => {
      # "North" => "Ashford university campus",
      "West" => "Galileo bridge"
    },
    "Nerv HQ" => {
      "NorthWest" => "Personal room",
      "North" => "Nerv Command center",
      "SouthEast" => "Workroom",
      "South" => "Reorientation room",
      "West" => "Pilot room",
      "Up" => "Flataustreet",
      "Down" => "EVA Hanger"
    },
    "Nerv Command center" => {
      "NorthEast" => "Gendou's room",
      "South" => "Nerv HQ",
      "West" => "Nerv Lab"
    },
    "Nerv Lab" => {
      "East" => "Nerv Command center"
    },
    "Gendou's room" => {
      "SouthWest" => "Nerv Command center"
    },
    "Personal room" => {
      "SouthEast" => "Nerv HQ"
    },
    "Pilot room" => {
      "East" => "Nerv HQ"
    },
    "Workroom" => {
      "NorthWest" => "Nerv HQ"
    },
    "Reorientation room" => {
      "North" => "Nerv HQ"
    },
    "EVA Hanger" => {
      "Up" => "Nerv HQ"
    },
    "Towerstreet" => {
      "NorthWest" => "Silverstreet"
    },
    "Silverstreet" => {
      "NorthEast" => "Magnolialane",
      "SouthEast" => "Towerstreet",
      "West" => "Goldenstreet",
      "In" => "Foyer"
    },
    "Foyer" => {
      "North" => "Living room",
      "Out" => "Silverstreet"
    },
    "Living room" => {
      "South" => "Foyer",
      "West" => "bedroom",
      "Up" => "Rin's study"
    },
    "bedroom" => {
      "East" => "Living room"
    },
    "Rin's study" => {
      "Down" => "Living room"
    },
    "Magnolialane" => {
      "NorthEast" => "Chrysanthemumlane",
      "SouthWest" => "Silverstreet"
    },
    "Chrysanthemumlane" => {
      "North" => "Shinto shrine",
      "SouthWest" => "Magnolialane"
    },
    "Shinto shrine" => {
      "East" => "Graveyard",
      "South" => "Chrysanthemumlane",
      "In" => "Offertory box"
    },
    "Offertory box" => {
      "Out" => "Shinto shrine"
    },
    "Graveyard" => {
      "West" => "Shinto shrine"
    },
    "Goldenstreet" => {
      "East" => "Silverstreet"
    },
    "Little dovestreet" => {
      "North" => "Bar",
      "NorthEast" => "Dead end Alley",
      "East" => "Pigeonstreet"
    },
    "Bar" => {
      "South" => "Little dovestreet",
      "SouthWest" => "Bar toilets",
      # "Up" => "Bar VIP-room",
      "In" => "Bar interior"
    },
    "Bar toilets" => {
      "NorthEast" => "Bar"
    },
    "Bar interior" => {
      "Out" => "Bar"
    },
    "Dead end Alley" => {
      "SouthWest" => "Little dovestreet"
    },
    "Pigeonstreet" => {
      "South" => "Hawk street",
      "West" => "Little dovestreet"
    },
    "Hawk street" => {
      "North" => "Pigeonstreet"
    },
    "Warehouse" => {
      "South" => "Warehouse loading bay",
      "West" => "Warehouse locker room",
      "Up" => "Warehouse office"
    },
    "Warehouse office" => {
      "Down" => "Warehouse",
      "In" => "Sewer"
    },
    "Sewer" => {
      "NorthEast" => "Storm drain",
      "Out" => "Warehouse office"
    },
    "Storm drain" => {
      "SouthWest" => "Sewer",
      "Up" => "Galileo bridge"
    },
    "Warehouse locker room" => {
      "East" => "Warehouse"
    },
    "Warehouse loading bay" => {
      "North" => "Warehouse"
    },
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
    start_game 'Me Against the World'

    fill_in_playername_input 'Testplayer'
    continue_until_unpaused

    import_savegames(savegames_filename)
  end
end

describe 'me against the world', type: :feature, js: true do
  include MeAgainstTheWorldHelper

  it 'can play through the game' do
    start_game 'Me Against the World'

    fill_in_playername_input 'Testplayer'

    continue_until_unpaused
    go_to_room 'College hallway West'
    continue_until_unpaused
    go_to_room 'Gym storage shed'
    act_on_room 'Search'
    act_on_object 'Ropes', 'Take'
    go_to_room 'College gym'
    act_on_room 'Play a game'
    go_to_room 'My room'
    act_on_object 'Bed', 'Sleep'
    continue_until_unpaused

    act_on_room 'Check secret stash'
    go_to_room 'My home'
    act_on_object 'Your family and you', 'Take'
    go_to_room 'Study'
    act_on_object 'Desk', 'Search'
    act_on_object 'Everything about Moroccan cuisine', 'Take'
    act_on_object 'Big shelf', 'Search'
    act_on_room 'Search'
    act_on_object 'Keeping Boss and Missus Happy', 'Take'
    act_on_object 'Big shelf', 'Insert Book'
    choose_input_action 'Book A'
    choose_input_action 'Position 1'
    act_on_object 'Big shelf', 'Insert Book'
    choose_input_action 'book B'
    choose_input_action 'Position 2'
    act_on_object 'Big shelf', 'Insert Book'
    act_on_object 'Big shelf', 'Pull stuck book'
    go_to_room 'Hidden study'
    act_on_object 'Dad\'s memo', 'Read'
    continue_until_unpaused
    act_on_object 'Eye drops', 'Use'
    continue_until_unpaused

    go_to_room 'My home'
    act_on_character 'Aki', 'Hypnotize'
    act_on_character 'Aki', 'Ask'
    choose_input_action 'Allowance'
    act_on_character 'Aki', 'Ask'
    choose_input_action 'What was your old job?'
    act_on_character 'Aki', 'Ask'
    choose_input_action 'Where can I find Nerv?'

    go_to_room 'Cloverstreet'
    act_on_object 'Cloverstreet bus stop', 'Take bus'
    choose_input_action 'Fataustreet'
    act_on_room 'Search'
    act_on_object 'Heavy Door', 'Unlock'
    act_on_room 'Wait'
    act_on_room 'Wait'
    act_on_room 'Wait'
    act_on_character 'Rei Ayanami', 'Hypnotize'
    continue_until_unpaused
    act_on_object 'Heavy Door', 'Unlock'

    go_to_room 'Workroom'
    act_on_object 'Fridge', 'Open'
    act_on_object 'Pen pen', 'Take'
    go_to_room 'Nerv HQ'
    act_on_object 'Pen pen', 'Squeeze'
    act_on_character 'Misato', 'Hypnotize'
    continue_until_unpaused
    go_to_room 'Personal room'
    act_on_character 'Misato', 'Hypnotize'
    continue_until_unpaused

    act_on_character 'Gendou', 'Listen'
    act_on_character 'Gendou', 'Hypnotize'
    continue_until_unpaused

    go_to_room 'Nerv Lab'
    act_on_character 'Ritsuko', 'Hypnotize'
    continue_until_unpaused
    act_on_character 'Ritsuko', 'Command'
    choose_input_action 'Register me in MAGI'

    go_to_room 'Nerv Command center'
    act_on_object 'MAGI', 'Access'
    choose_input_action 'Upload dad\'s data'
    continue_until_unpaused
    act_on_object 'MAGI', 'Access'
    choose_input_action 'Prepare a Brainwashing room.'
    continue_until_unpaused

    go_to_room 'EVA Hanger'
    act_on_object 'Newspaper', 'Read'

    go_to_room 'Personal room'
    act_on_object 'Double king-size bed', 'Sleep'

    go_to_room 'Reorientation room'
    act_on_character 'Rei Ayanami', 'Decide role'
    act_on_character 'Gendou', 'Decide role'
    act_on_character 'Misato', 'Decide role'
    act_on_character 'Ritsuko', 'Decide role'

    go_to_room 'Gendou\'s room'
    act_on_character 'Gendou', 'Ask'
    choose_input_action 'Increase EVA strength'
    act_on_character 'Gendou', 'Ask'
    choose_input_action 'Next step'
    continue_until_unpaused
    go_to_room 'Pilot room'
    act_on_object 'Vending Machine', 'Buy'
    choose_input_action 'Soda 3$'

    go_to_room 'Flataustreet'
    act_on_object 'Flataustreet bus stop', 'Take bus'
    choose_input_action 'Towerstreet'
    go_to_room 'Silverstreet'
    act_on_object 'Fancy door', 'Knock'
    choose_input_action 'Are you Interested in a magazine subscription?'
    act_on_object 'Cellphone', 'Call'
    choose_input_action 'Order Chinese (10$).'
    continue_until_unpaused
    act_on_character 'Xian Puu', 'Hypnotize'
    act_on_character 'Xian Puu', 'Offer her a tip'
    act_on_character 'Xian Puu', 'Hypnotize'
    continue_until_unpaused
    act_on_character 'Xian Puu', 'Accept meal'
    act_on_object 'Fancy door', 'Knock'
    choose_input_action 'Complain about wrong delivery.'
    act_on_character 'Saber', 'Hypnotize'
    continue_until_unpaused
    act_on_character 'Saber', 'Complain'
    choose_input_action 'Complain about payment'
    act_on_character 'Saber', 'Complain'
    choose_input_action 'Complain about payment'
    act_on_character 'Saber', 'Complain'
    choose_input_action 'Complain about rude deliverygirls'
    go_direction 'In'
    go_to_room 'Foyer'
    act_on_character 'Saber', 'Guard the door'


    go_to_room 'Living room'
    continue_until_unpaused
    choose_input_action 'Western door'
    go_to_room 'Foyer'
    act_on_character 'Sakura Matou', 'Hypnotize'
    act_on_character 'Sakura Matou', 'Prana exchange'

    go_to_room 'Rin\'s study'
    act_on_object 'Soda can', 'Throw'
    choose_input_action 'Rider'
    act_on_character 'Rider\'s Blindfold', 'Tear off'
    act_on_character 'Rider', 'Hypnotize'
    act_on_character 'Rin Tohsaka', 'Hypnotize'
    continue_until_unpaused
    act_on_character 'Rin Tohsaka', 'Hypnotize again'

    go_to_room 'Towerstreet'
    act_on_object 'Towerstreet bus stop', 'Take bus'
    choose_input_action 'Little dovestreet'

    go_to_room 'Dead end Alley'
    act_on_object 'Dumpster', 'Open'
    act_on_object 'Dumpster', 'Search'
    act_on_object 'Short sword', 'Take'

    go_to_room 'Bar'
    act_on_character 'Tifa', 'Ask where you can find \'the good stuff\'.'
    act_on_character 'Rikku', 'Ask where you can find \'the good stuff\'.'
    act_on_character 'Tifa', 'Buy for Rikku'
    continue_until_unpaused
    choose_input_action 'Yes'
    continue_until_unpaused
    act_on_character 'Rikku', 'Give drink'
    act_on_character 'Rikku', 'Ask where you can find \'the good stuff\'.'
    act_on_character 'Tifa', 'Buy for Rikku'
    choose_input_action 'Yes'
    act_on_character 'Rikku', 'Give strong drink'
    act_on_character 'Rikku', 'Ask where you can find \'the good stuff\'.'
    continue_until_unpaused
    act_on_character 'Rei Miyamoto', 'Hypnotize'
    continue_until_unpaused
    go_to_room 'Bar toilets'
    continue_until_unpaused

    go_to_room 'Bar'
    act_on_character 'Tifa', 'Buy'
    choose_input_action 'Drink (6$)'
    act_on_character 'Yuna', 'Give Yuna a drink'
    act_on_character 'Tifa', 'Buy'
    choose_input_action 'Drink (6$)'
    act_on_character 'Yuna', 'Give Yuna a drink'
    act_on_character 'Tifa', 'Buy'
    choose_input_action 'Drink (6$)'
    act_on_character 'Yuna', 'Give Yuna a drink'
    act_on_character 'Tifa', 'Buy'
    choose_input_action 'Drink (6$)'
    act_on_character 'Yuna', 'Give Yuna a drink'
    act_on_character 'Tifa', 'Buy'
    choose_input_action 'Drink (6$)'
    act_on_character 'Yuna', 'Give Yuna a drink'
    act_on_character 'Tifa', 'Buy'
    choose_input_action 'Drink (6$)'
    continue_until_unpaused
    act_on_character 'Yuna', 'Give Yuna a drink'

    go_to_room 'Bar toilets'
    act_on_character 'Yuna', 'Hypnotize'
    continue_until_unpaused

    go_to_room 'Bar'
    go_direction 'In'
    go_to_room 'Bar interior'
    act_on_character 'Tifa', 'Hypnotize'
    continue_until_unpaused

    go_to_room 'Little dovestreet'
    act_on_object 'Little Dovestreet bus stop', 'Take bus'
    choose_input_action 'Cloverstreet'

    go_to_room 'Saya\'s backyard'
    act_on_room 'Search'
    act_on_object 'A ladder', 'Use'

    go_to_room 'Saya\'s room'
    act_on_room 'Search'
    act_on_character 'Saya', 'Hypnotize'

    go_to_room 'Cloverstreet'
    act_on_object 'Cellphone', 'Call'
    choose_input_action 'Call Saeko'

    go_to_room 'Department store'
    act_on_character 'Saeko', 'Ambush'
    act_on_character 'Saeko', 'Hypnotize'
    act_on_character 'Saeko', 'Ask about drug ring'
    continue_until_unpaused
    choose_input_action 'Yes'
    continue_until_unpaused

    go_to_room 'Warehouse locker room'
    act_on_room 'Search'
    act_on_object 'Crane key', 'Take'
    act_on_object 'Locker', 'Open'
    act_on_object 'Locker', 'Search'
    act_on_object 'Truck key', 'Take'

    go_to_room 'Warehouse loading bay'
    act_on_object 'Truck key', 'Use'
    page.find(".RoomObjects", text: 'Crane', match: :first).click
    choose_action 'Operate'
    continue_until_unpaused
    act_on_character 'Motoko', 'Search'

    go_to_room 'Warehouse locker room'
    act_on_object 'Breaker box', 'Open'
    act_on_object 'Breaker box', 'Flip the breakers'

    go_to_room 'Warehouse loading bay'
    act_on_character 'Motoko', 'Search'

    go_to_room 'Warehouse'
    act_on_object 'Warehouse door', 'Unlock'
    continue_until_unpaused
    act_on_object 'Warehouse door', 'Open'

    go_to_room 'Warehouse office'
    act_on_room 'Search'
    act_on_object 'Hidden hatch', 'Open'
    go_to_room 'Sewer'
    continue_until_unpaused

    act_on_object 'Tentacle Monster', 'Fight'
    act_on_object 'Piece of tentacle', 'Take'
    act_on_character 'Natsuki', 'Hypnotize'
  end
end