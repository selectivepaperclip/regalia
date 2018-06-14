module LilithDeviceHelper
  GAME_MAP = {
    "Mysterious Copse" => {
      "North" => "Deep Forest"
    },
    "Deep Forest" => {
      "North" => "Misty Woods",
      "South" => "Mysterious Copse"
    },
    "Misty Woods" => {
      "North" => "Misty Woods Outskirts",
      "East" => "Forest Path",
      "South" => "Deep Forest",
      "West" => "Forest Clearing"
    },
    "Forest Clearing" => {
      "East" => "Misty Woods"
    },
    "Forest Path" => {
      "East" => "Lake Innsmouth Shore",
      "West" => "Misty Woods"
    },
    "Lake Innsmouth Shore" => {
      "NorthWest" => "Fishin' Shack",
      "West" => "Forest Path"
    },
    "Fishin' Shack" => {
      "SouthEast" => "Lake Innsmouth Shore"
    },
    "Misty Woods Outskirts" => {
      "North" => "Campus South",
      "South" => "Misty Woods"
    },
    "Campus South" => {
      "North" => "Campus Main",
      "South" => "Misty Woods Outskirts",
      "West" => "Student Store"
    },
    "Student Store" => {
      "North" => "Campus West",
      "East" => "Campus South"
    },
    "Campus West" => {
      "NorthWest" => "Callidus Library",
      "North" => "Art District",
      "East" => "Campus Main",
      "South" => "Student Store",
      "West" => "Trilby Elsehall"
    },
    "Trilby Elsehall" => {
      "North" => "Psych Offices",
      "East" => "Campus West",
      "West" => "Psych Lab"
    },
    "Psych Lab" => {
      "East" => "Trilby Elsehall"
    },
    "Psych Offices" => {
      "South" => "Trilby Elsehall"
    },
    "Callidus Library" => {
      "SouthEast" => "Campus West",
      "Up" => "Library (Second Floor)"
    },
    "Library (Second Floor)" => {
      "West" => "Study Room",
      "Down" => "Callidus Library"
    },
    "Study Room" => {
      "East" => "Library (Second Floor)"
    },
    "Art District" => {
      "East" => "Guidance Museum of Natural History",
      "South" => "Campus West",
      "West" => "Music Hall"
    },
    "Music Hall" => {
      "East" => "Art District",
      "In" => "Music Room"
    },
    "Music Room" => {
      "Out" => "Music Hall"
    },
    "Guidance Museum of Natural History" => {
      "West" => "Art District"
    },
    "Campus Main" => {
      "North" => "Tabico Labs",
      "East" => "Campus East",
      "South" => "Campus South",
      "West" => "Campus West"
    },
    "Tabico Labs" => {
      "NorthWest" => "Observation Room",
      "NorthEast" => "Office 31",
      "South" => "Campus Main"
    },
    "Observation Room" => {
      "SouthEast" => "Tabico Labs"
    },
    "Office 31" => {
      "SouthWest" => "Tabico Labs",
      "In" => "Lab 31"
    },
    "Lab 31" => {
      "Out" => "Office 31"
    },
    "Campus East" => {
      "North" => "Scepter Dorms",
      "East" => "West Guidance City",
      "South" => "Guidance Gym",
      "West" => "Campus Main"
    },
    "Scepter Dorms" => {
      "South" => "Campus East",
      "Up" => "Scepter Dorms: Sixth Floor"
    },
    "Scepter Dorms: Sixth Floor" => {
      "North" => "Your Room",
      "NorthEast" => "Room 624",
      "East" => "Room 626",
      "Up" => "Scepter Dorms: Seventh Floor",
      "Down" => "Scepter Dorms"
    },
    "Your Room" => {
      "South" => "Scepter Dorms: Sixth Floor"
    },
    "Room 624" => {
      "SouthWest" => "Scepter Dorms: Sixth Floor"
    },
    "Room 626" => {
      "West" => "Scepter Dorms: Sixth Floor"
    },
    "Scepter Dorms: Seventh Floor" => {
      "West" => "Jill's Room",
      "Down" => "Scepter Dorms: Sixth Floor"
    },
    "Jill's Room" => {
      "East" => "Scepter Dorms: Seventh Floor"
    },
    "Guidance Gym" => {
      "North" => "Campus East",
      "In" => "The Yoga Room"
    },
    "The Yoga Room" => {
      "Out" => "Guidance Gym"
    },
    "West Guidance City" => {
      "North" => "Guidance Suburbs",
      "East" => "Guidance City",
      "West" => "Campus East"
    },
    "Guidance Suburbs" => {
      "North" => "Mansion Gates",
      "South" => "West Guidance City",
      "In" => "Elaine's House"
    },
    "Mansion Gates" => {
      "South" => "Guidance Suburbs"
    },
    "Elaine's House" => {
      "Out" => "Guidance Suburbs"
    },
    "Guidance City" => {
      "North" => "Business District",
      "East" => "Guidance Shopping Center",
      "South" => "South Guidance City",
      "West" => "West Guidance City"
    },
    "Business District" => {
      "South" => "Guidance City",
      "West" => "Escort Service"
    },
    "Escort Service" => {
      "East" => "Business District"
    },
    "Guidance Shopping Center" => {
      "NorthEast" => "Demon Designs Fashion Store",
      "West" => "Guidance City"
    },
    "Demon Designs Fashion Store" => {
      "SouthWest" => "Guidance Shopping Center"
    },
    "South Guidance City" => {
      "NorthWest" => "The Blue Door",
      "North" => "Guidance City",
      "East" => "Fortune Teller",
      "SouthEast" => "Alleyway",
      "West" => "Rough Landing Bar"
    },
    "The Blue Door" => {
      "SouthEast" => "South Guidance City"
    },
    "Rough Landing Bar" => {
      "East" => "South Guidance City",
      "Up" => "Rough Landing Pool Room"
    },
    "Rough Landing Pool Room" => {
      "Down" => "Rough Landing Bar"
    },
    "Fortune Teller" => {
      "West" => "South Guidance City"
    },
    "Alleyway" => {
      "NorthWest" => "South Guidance City"
    },
    "The Lilith Device" => {
      "East" => "Security Room",
      "SouthEast" => "Mistress's Room",
      "Up" => "Research Lab",
      "Down" => "Slave Quarters"
    },
    "Mistress's Room" => {
      "NorthWest" => "The Lilith Device",
      "East" => "Device Bathroom"
    },
    "Device Bathroom" => {
      "West" => "Mistress's Room"
    },
    "Security Room" => {
      "West" => "The Lilith Device"
    },
    "Research Lab" => {
      "Down" => "The Lilith Device"
    },
    "Slave Quarters" => {
      "East" => "Brainwashing Labs",
      "Up" => "The Lilith Device"
    },
    "Brainwashing Labs" => {
      "West" => "Slave Quarters"
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
    start_game 'The Lilith Device'

    fill_in_text_input 'Testplayer'

    import_savegames(savegames_filename)
  end
end

describe 'the lilith device', type: :feature, js: true do
  include LilithDeviceHelper

  it 'can play through the game' do
    start_game 'The Lilith Device'

    fill_in 'playernametext', with: 'Testplayer'
    click_on 'playernamebutton'

    act_on_room 'Search'
    act_on_object 'Strange Stone', 'Touch'
    continue_until_unpaused
    act_on_character 'Holo', 'Talk'
    choose_input_action 'Who are you again?'
    act_on_character 'Holo', 'Talk'
    choose_input_action 'Can you give me a tour of the Lilith Device?'
    continue_until_unpaused
    act_on_character 'Holo', 'Talk'
    choose_input_action 'What\'s my first step?'
    act_on_object 'Pulsar Gun', 'Take'
    act_on_object 'Lilith Device Console', 'Dossier: Nina'
    act_on_object 'Lilith Device Console', 'Dossier: Clara'
    act_on_object 'Telepad', 'Step on the pad'

    go_to_room 'Lake Innsmouth Shore'
    act_on_character 'Miki', 'Talk to Miki'
    choose_input_action 'Say Hello'
    act_on_character 'Miki', 'Talk to Miki'
    choose_input_action 'Talk about fishing'
    continue_until_unpaused
    act_on_object 'Mysterious Amulet', 'Wear'

    go_to_room 'Student Store'
    act_on_character 'Mimi', 'Talk to Mimi'
    choose_input_action 'What do you have for sale?'
    act_on_character 'Mimi', 'Buy something'
    choose_input_action 'Large Erlenmeyer Flask ($5)'
    act_on_character 'Mimi', 'Buy something'
    choose_input_action 'Neurodesire Energy Drink ($3)'

    go_to_room 'Psych Offices'
    act_on_room 'Search'
    act_on_object 'The Intricacies of Cognitive Mind Control', 'Read'

    go_to_room 'Trilby Elsehall'
    act_on_room 'Search'
    act_on_object 'Business Book', 'Read'
    continue_until_unpaused

    go_to_room 'Guidance Museum of Natural History'
    act_on_room 'Search'

    go_to_room 'Campus Main'
    act_on_room 'Search'
    continue_until_unpaused
    act_on_object 'Sunglasses', 'Wear'

    go_to_room 'Tabico Labs'
    go_direction 'NorthWest'
    continue_until_unpaused
    go_direction 'SouthEast'
    continue_until_unpaused
    act_on_object 'Winifred\'s shopping list', 'Read'

    go_to_room 'Guidance Gym'
    act_on_character 'Abigail', 'Talk to Abigail'
    choose_input_action 'How\'s the workout going?'
    act_on_character 'Abigail', 'Talk to Abigail'
    choose_input_action 'Mind if you spot me?'
    go_direction 'In'
    continue_until_unpaused

    go_to_room 'Scepter Dorms'
    act_on_room 'Search'
    act_on_character 'Betti', 'Talk'
    choose_input_action 'What\'s up?'
    continue_until_unpaused
    act_on_character 'Betti', 'Talk'
    choose_input_action 'Can you tell me which room is Clara Colfer\'s?'
    act_on_character 'Betti', 'Talk'
    choose_input_action 'What do you do here?'
    go_direction 'Up'
    act_on_object 'Door to 626', 'Knock on the door.'
    go_direction 'North'
    act_on_room 'Search'
    act_on_object 'Strange Patch', 'Use'
    go_direction 'South'
    go_direction 'Down'
    act_on_character 'Betti', 'Talk'
    choose_input_action 'What do you know about Clara?'
    continue_until_unpaused

    go_to_room 'Escort Service'
    act_on_character 'Dr. Carin', 'Talk'
    choose_input_action 'Who are you?'
    act_on_character 'Dr. Carin', 'Talk'
    choose_input_action 'Can you tell me about one of your clients?'
    act_on_character 'Dr. Carin', 'Talk'
    choose_input_action 'Tell me about your business.'
    continue_until_unpaused
    act_on_character 'Dr. Carin', 'Talk'
    choose_input_action 'Are you hiring?'
    act_on_object 'Escort Service Computer', 'Look at the Database'
    fill_in 'textactioninput', with: 'colfer'
    click_on 'textactionbutton'

    go_to_room 'Fortune Teller'
    act_on_character 'Aisha', 'Talk to Aisha'
    choose_input_action 'Can you tell me my fortune?'
    continue_until_unpaused
    act_on_character 'Aisha', 'Talk to Aisha'
    choose_input_action 'Do you have any Magnesium Sulfate?'
    continue_until_unpaused
    act_on_character 'Aisha', 'Talk to Aisha'
    choose_input_action 'Ask for help'
    act_on_room 'Search'

    go_to_room 'Alleyway'
    act_on_room 'Search'

    go_to_room 'The Blue Door'
    act_on_character 'Chel', 'Talk to Chel'
    choose_input_action 'Tell me about your club'
    act_on_character 'Chel', 'Talk to Chel'
    choose_input_action 'Do you have a special?'
    act_on_character 'Chel', 'Talk to Chel'
    choose_input_action 'Do you have any Dancer\'s Delight?'

    go_to_room 'Rough Landing Bar'
    act_on_character 'Lynn', 'Talk to Lynn'
    choose_input_action 'Tell me about yourself.'
    act_on_character 'Lynn', 'Talk to Lynn'
    choose_input_action 'Do you have any Dancer\'s Delight?'
    continue_until_unpaused
    go_direction 'Up'
    act_on_character 'Noelle', 'Trick her out of the bar.'
    continue_until_unpaused
    act_on_object 'Finding Your Inner Warrior', 'Read'

    go_to_room 'Your Room'
    act_on_object 'Formal looking package', 'Open'
    act_on_object 'Escort Service Business Card', 'Take'
    act_on_object 'Escort Clothing', 'Take'
    act_on_object 'Wardrobe', 'Change Clothes'
    choose_input_action 'Escort Clothing'

    go_direction 'South'
    act_on_object 'Door to 626', 'Knock on the door.'
    continue_until_unpaused
    go_direction 'East'
    act_on_character 'Clara', 'Try to enslave Clara'
    choose_input_action 'Seduce her'
    continue_until_unpaused

    go_to_room 'The Lilith Device'
    act_on_object 'Telepad', 'Step on the pad'

    go_to_room 'Room 626'
    act_on_room 'Search'
    act_on_object 'Protein pills', 'Take pills'

    go_to_room 'Tabico Labs'
    act_on_character 'Winifred', 'Talk to Winifred'
    choose_input_action 'I have all the materials.'
    continue_until_unpaused

    go_to_room 'The Lilith Device'
    act_on_object 'Telepad', 'Step on the pad'
    go_to_room 'Your Room'
    act_on_object 'Your Bed', 'Rest up and Wait'
    continue_until_unpaused
    go_to_room 'Elaine\'s House'
    act_on_character 'Elaine', 'Greet'
    continue_until_unpaused

    go_to_room 'Mysterious Copse'
    act_on_object 'Strange Stone', 'Touch'
    continue_until_unpaused
    act_on_character 'Holo', "I've made my choice."
    choose_input_action 'Jill.'
    continue_until_unpaused

    act_on_object 'Telepad', 'Step on the pad'
    go_to_room 'Your Room'
    act_on_object 'Phone', 'Call Jill'
    continue_until_unpaused
    go_to_room 'Jill\'s Room'
    act_on_character 'Jill', 'Try to Enslave Jill'
    continue_until_unpaused

    go_to_room 'Your Room'
    act_on_object 'Your Bed', 'Rest up again'

    go_to_room 'Scepter Dorms'
    act_on_object 'Bulletin Board', 'Read'
    continue_until_unpaused

    go_to_room 'Guidance Gym'
    act_on_character 'Tabitha', 'Talk to Tabitha'
    choose_input_action 'How\'s it going?'
    act_on_character 'Tabitha', 'Talk to Tabitha'
    choose_input_action 'Pick a fight'
    act_on_character 'Tabitha', 'Talk to Tabitha'
    choose_input_action 'What happened?'

    go_to_room 'Mysterious Copse'
    act_on_object 'Strange Stone', 'Touch'
    go_to_room 'Mistress\'s Room'
    continue_until_unpaused
    act_on_character 'Unit 001', 'Tell your slave to...'
    choose_input_action 'Help update this room'

    go_to_room 'Security Room'
    continue_until_unpaused
    act_on_character 'Clara', 'Tell your slave to...'
    choose_input_action 'Give me a status report.'
    act_on_character 'Clara', 'Ask her about Tabitha'
    continue_until_unpaused
    act_on_character 'Clara', 'Ask about strange signal'
    continue_until_unpaused

    go_to_room 'Research Lab'
    continue_until_unpaused

    go_to_room 'The Lilith Device'
    act_on_object 'Telepad', 'Step on the pad'

    go_to_room 'Lake Innsmouth Shore'
    act_on_character 'Miki', 'Use the Collar on Miki'
    continue_until_unpaused

    go_to_room 'Library (Second Floor)'
    act_on_room 'Search'
    act_on_character 'Georgie', 'Talk to Georgie'
    choose_input_action 'How\'re things?'

    go_to_room 'Study Room'
    act_on_character 'Emily', 'Talk to Emily'
    choose_input_action 'How\'s studying going?'
    continue_until_unpaused
    act_on_character 'Emily', 'Use the Collar on Emily'
    continue_until_unpaused
    act_on_room 'Search'
    act_on_object 'Entrancing Art', 'Read'

    go_to_room 'Office 31'
    act_on_room 'Search'
    act_on_character 'Kathie', 'Talk to Kathie'
    choose_input_action 'Who are you?'
    act_on_character 'Kathie', 'Talk to Kathie'
    choose_input_action 'What\'re you working on?'
    act_on_character 'Kathie', 'Talk to Kathie'
    choose_input_action 'Seriously what are you working on?'
    act_on_character 'Kathie', 'Use the collar on Kathie'
    act_on_object 'Nanite System Manual', 'Read'
    act_on_object 'Nanite Setting System', 'Look at buttons'
    act_on_object 'Nanite Setting System', 'Press button'
    choose_input_action 'Blue Button'
    act_on_object 'Nanite Setting System', 'Press button'
    choose_input_action 'Green Button'
    act_on_object 'Nanite Setting System', 'Press button'
    choose_input_action 'Create Potion'
    act_on_object 'Nanite Potion', 'Take'
    act_on_object 'Nanite Potion', 'Drink'
    act_on_object 'Nanite Setting System', 'Press button'
    choose_input_action 'Blue Button'
    act_on_object 'Nanite Setting System', 'Press button'
    choose_input_action 'Create Potion'
    act_on_object 'Nanite Potion', 'Take'

    go_to_room 'Lab 31'
    act_on_object 'Nanite Potion', 'Give to Trish'
    continue_until_unpaused

    go_to_room 'Guidance Gym'
    act_on_character 'Tabitha', 'Talk to Tabitha'
    choose_input_action 'Make fun of her dancing.'
    continue_until_unpaused

    go_to_room 'Scepter Dorms'
    act_on_character 'Betti', 'Talk'
    choose_input_action 'What do you do for fun?'
    act_on_character 'Betti', 'Use the Collar on Betti'
    act_on_character 'Corine', 'Talk to Corine'
    choose_input_action 'What are you doing?'
    act_on_character 'Corine', 'Talk to Corine'
    choose_input_action 'Play me a song'
    act_on_character 'Corine', 'Talk to Corine'
    choose_input_action 'Play me something you wrote'
    continue_until_unpaused

    go_to_room 'Music Room'
    act_on_character 'Sybil', 'Talk to Sybil'
    choose_input_action 'What are you doing here?'
    act_on_character 'Sybil', 'Talk to Sybil'
    choose_input_action 'Can you please leave?'
    act_on_character 'Sybil', 'Use the Collar on Sybil'
    continue_until_unpaused

    go_to_room 'Scepter Dorms'
    act_on_character 'Corine', 'Talk to Corine'
    choose_input_action 'Sybil\'s gone'

    go_to_room 'Music Room'
    act_on_character 'Corine', 'Use the Collar on Corine'
    continue_until_unpaused
    act_on_object 'Guitar', 'Take'

    go_to_room 'Elaine\'s House'
    act_on_character 'Elaine', 'Ask for an autograph'

    go_to_room 'Scepter Dorms'
    act_on_character 'Betti', 'I got you something...'
    continue_until_unpaused

    go_to_room 'Fortune Teller'
    act_on_character 'Aisha', 'Use the crystal ball to enhance yourself.'

    go_to_room 'The Blue Door'
    act_on_character 'Bree', 'Ask her about the concert'

    go_to_room 'Alleyway'
    act_on_character 'Tabitha', 'Fight Tabitha'
    continue_until_unpaused
    act_on_character 'Tabitha', 'Continue fighting.'
    continue_until_unpaused
    act_on_character 'Tabitha', 'Use the collar'
    continue_until_unpaused
    act_on_object 'Bree\'s Music Equipment', 'Sabotage Guitar'

    go_to_room 'The Blue Door'
    act_on_character 'Bree', 'Ask her about the concert'
    act_on_character 'Bree', 'Offer her your guitar'
    continue_until_unpaused
    go_direction 'Out'

    go_to_room 'Escort Service'
    act_on_character 'Dr. Carin', 'Take a shift'
    act_on_character 'Dr. Carin', 'Choose a client'
    choose_input_action 'Lauren the first timer'
    act_on_object 'Massage Oil', 'Take'
    act_on_character 'Lauren', 'Approach Lauren'
    continue_until_unpaused
    go_direction 'East'

    go_to_room 'Escort Service'
    act_on_character 'Dr. Carin', 'Take another shift'
    act_on_character 'Lucinda', 'Approach Lucinda'
    choose_input_action 'Sleep with her, then enslave her'
    continue_until_unpaused
    act_on_object 'Second Slave Collar?', 'Take'
    go_direction 'East'

    go_to_room 'Student Store'
    act_on_character 'Mimi', 'Buy something'
    choose_input_action 'Neurodesire Energy Drink ($3)'
    act_on_character 'Mimi', 'Buy something'
    choose_input_action 'SexSweat Energy Drink ($10)'
    act_on_character 'Mimi', 'Buy something'
    choose_input_action 'GutPunch Energy Drink ($10)'

    go_to_room 'Mysterious Copse'
    act_on_object 'Strange Stone', 'Touch'
    go_to_room 'Brainwashing Labs'
    act_on_character 'Betti', 'Choose Designation'
    act_on_character 'Emily', 'Choose Designation'
    choose_input_action 'Research'
    act_on_character 'Kathie', 'Choose Designation'
    choose_input_action 'Research'
    act_on_character 'Lauren', 'Choose Designation'
    choose_input_action 'Research'
    act_on_character 'Trishbot', 'Choose Designation'
    choose_input_action 'Research'
    act_on_character 'Miki', 'Choose Designation'
    choose_input_action 'Research'
    act_on_character 'Sybil', 'Choose Designation'
    choose_input_action 'Research'
    act_on_character 'Lucinda', 'Choose Designation'
    choose_input_action 'Research'
    act_on_character 'Bree', 'Choose Designation'
    choose_input_action 'Work'
    act_on_character 'Corine', 'Choose Designation'
    choose_input_action 'Work'
    act_on_character 'Tabitha', 'Choose Designation'
    choose_input_action 'Security'

    go_to_room 'Research Lab'
    continue_until_unpaused
    act_on_character 'Nina', 'Designate Research'
    choose_input_action 'Neurodesire Energy Drink ($15)'

    go_to_room 'Mistress\'s Room'
    act_on_object 'Your Bed', 'Sleep'
    handle_ch1_sleep_event

    set_game_variable('Cash', 200000)
    go_to_room 'Research Lab'
    act_on_object 'NeuroPotion', 'Drink'
    act_on_character 'Nina', 'Designate Research'
    choose_input_action 'GutPunch Energy Drink ($20)'

    go_to_room 'Mistress\'s Room'
    act_on_object 'Your Bed', 'Sleep'
    handle_ch1_sleep_event

    go_to_room 'Research Lab'
    act_on_object 'Strength+ Potion', 'Drink'
    act_on_character 'Nina', 'Designate Research'
    choose_input_action 'SexSweat Energy Drink ($20)'

    go_to_room 'Mistress\'s Room'
    act_on_object 'Your Bed', 'Sleep'
    handle_ch1_sleep_event

    go_to_room 'Research Lab'
    act_on_object 'Sex+ Potion', 'Drink'
    act_on_character 'Nina', 'Designate Research'
  end

  def handle_ch1_sleep_event
    continue_until_unpaused
    if page.all('.VisibleCharacters', text: 'Rin').length > 0
      act_on_character 'Rin', 'Make your choice'
      choose_input_action 'Decline her offer'
      continue_until_unpaused
    end
  end
end