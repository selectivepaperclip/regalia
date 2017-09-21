describe 'superpowered', type: :feature, js: true do
  it 'can play through the intro in normal mode' do
    start_game('Superpowered')

    choose_input_action 'No'
    choose_input_action 'Teen Sister'
    choose_input_action 'Well Endowed'
    continue_until_unpaused

    go_direction 'East'
    act_on_room 'Work'
    choose_input_action 'Luggage Security lvl1'
    continue_until_unpaused

    go_direction 'NorthWest'
    continue_until_unpaused

    act_on_room 'Debate Class'
    choose_input_action 'Join a debate'
    continue_until_unpaused

    continue_until_unpaused

    act_on_room 'Training Program'
    choose_input_action 'Awareness Training'
    continue_until_unpaused

    continue_until_unpaused

    act_on_room 'Shower'
    continue_until_unpaused

    act_on_room 'Sleep'
    continue_until_unpaused
    continue_until_unpaused
    act_on_room 'Globex'
    continue_until_unpaused

    act_on_room 'Mall'
    continue_until_unpaused
    choose_input_action 'NCE'
    continue_until_unpaused

    continue_until_unpaused
    act_on_room 'The Airstrip'
    continue_until_unpaused

    act_on_room 'Shower'
    continue_until_unpaused
    act_on_room 'Sleep'
    continue_until_unpaused
    act_on_character 'Mom', 'Interact'
    choose_input_action 'Hug'
    act_on_character 'Mom', 'Interact'
    choose_input_action 'Chat'
    choose_input_action 'Fitness'

    act_on_object 'Newspaper', 'Read'
  end

  it 'can play through the game in easy mode' do
    start_game('Superpowered')

    choose_input_action 'Test Mode (easy)'
    choose_input_action 'Teen Sister'
    choose_input_action 'Well Endowed'
    continue_until_unpaused

    act_on_object 'Newspaper', 'Read'
  end
end