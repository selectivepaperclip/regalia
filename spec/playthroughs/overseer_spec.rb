describe 'overseer', type: :feature, js: true do
  it 'can play through thegame' do
    start_game('Overseer')

    act_on_object 'Teddy', 'Take'
    act_on_object 'Casual clothes', 'Wear'
    act_on_room 'Examine'
    act_on_room 'Search'
    act_on_object 'Newspaper', 'Take'
    act_on_object 'Newspaper', 'Read'
    continue_until_unpaused
    go_direction 'South'
    go_direction 'Down'
    go_direction 'East'
    act_on_object 'Telephone', 'Call'
    choose_input_action 'Celine'
    act_on_object 'Telephone', 'Call'
    choose_input_action 'Taxi'
    act_on_object 'Laptop', 'Examine'
    act_on_object 'Laptop', 'Check mail'
    choose_input_action 'From Celine'
    act_on_object 'Laptop', 'Check mail'
    choose_input_action 'From seb (?)'
    act_on_object 'Laptop', 'Check mail'
    choose_input_action 'From DM'
    go_direction 'West'
    go_direction 'Up'
    go_direction 'South'
    act_on_room 'Search'
    act_on_object 'Purse', 'Take'
    go_direction 'North'
    go_direction 'Down'
    go_direction 'Out'
    act_on_object 'Taxi', 'Hail'
    continue_until_unpaused

    act_on_character 'Old Lady', 'Help her?'
    choose_input_action 'Yes'
    act_on_object 'Broken down car', 'Examine'
    act_on_object 'Broken down car', 'Fix'
    act_on_object 'News Stand', 'Examine'
    act_on_object 'News Stand', 'Buy a scratchcard'
    go_direction 'In'
    act_on_object 'Reception Desk', 'Inquire'
    act_on_object 'Reception Desk', 'Examine'
    act_on_room 'Act nonchalant'
    act_on_object 'Steel door', 'Examine'
    act_on_object 'Steel door', 'Sneak through'
    continue_until_unpaused
    go_direction 'Up'
    continue_until_unpaused
    act_on_room 'Examine'
    act_on_room 'Search around a little'
    act_on_object 'Voices', 'Examine'
    act_on_object 'Voices', 'Listen'
    act_on_object 'Voices', 'Listen closer...'
    continue_until_unpaused
    act_on_object 'Office Laptop', 'Examine'
    act_on_object 'Office Laptop', 'Unlock'
    act_on_object 'Office Laptop', 'Check'
    choose_input_action 'Global emails'
    act_on_object 'Office Laptop', 'Check'
    choose_input_action 'First inbox message'
    act_on_object 'Office Laptop', 'Check'
    choose_input_action 'Latest inbox message'
    act_on_object 'Office Laptop', 'Check'
    choose_input_action 'Monitor 2'
    act_on_object 'Office Laptop', 'Check'
    choose_input_action 'Monitor 3'
    act_on_object 'Office Laptop', 'Check'
    choose_input_action 'Background'
    act_on_object 'Office Laptop', 'Check'
    choose_input_action 'Latest sent items'
    continue_until_unpaused
    act_on_room 'Get out of here'
    act_on_character 'Scary woman', 'Lunge past her!'
    continue_until_unpaused

    go_direction 'Out'
    act_on_object 'Taxi', 'Back home, and don\'t look back!'
    go_direction 'In'
    go_direction 'East'
    act_on_object 'Telephone', 'Call'
    choose_input_action 'Call return'
    continue_until_unpaused
    act_on_object 'Telephone', 'Call'
    choose_input_action 'Celine - Home'
    act_on_object 'Telephone', 'Reply'
    choose_input_action 'Erm...where are you?'
    act_on_object 'Telephone', 'Reply'
    choose_input_action 'Yes...'
    act_on_object 'Sofa', 'Nap'
    continue_until_unpaused

    act_on_character 'Scary woman', 'What...where...?'
    continue_until_unpaused
    act_on_character 'Scary woman', 'Who are you?'
    continue_until_unpaused
    act_on_character 'Scary woman', 'Answer her'
    choose_input_action 'I\'m not telling you anything, bitch!'
    continue_until_unpaused
    act_on_character 'Scary woman', 'Answer her'
    choose_input_action 'I don\'t remember'
    continue_until_unpaused
    act_on_character 'Scary woman', 'Answer her'
    choose_input_action 'No one'
    continue_until_unpaused
    act_on_character 'Scary woman', 'What now?'
    continue_until_unpaused
    act_on_character 'Scary woman', 'Respond'
    choose_input_action 'No'
    act_on_character 'Scary woman', 'Respond'
    choose_input_action 'The taxi driver'
    act_on_character 'Scary woman', 'Respond'
    choose_input_action 'No one'
    act_on_character 'Scary woman', 'Respond'
    choose_input_action 'I don\'t remember anything about Portsville or how I found myself in this room'
    act_on_character 'Scary woman', 'Respond'
    choose_input_action 'I am Hive property'
    continue_until_unpaused
    act_on_character 'Scary woman', 'Yes Mistress'
    continue_until_unpaused
    skip_next_live_timer
    continue_until_unpaused

    expect(page.find('#RoomTitle').text).to eq "Waiting Room"
  end
end