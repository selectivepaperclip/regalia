describe 'no haven', type: :feature, js: true do
  it 'can play through the game' do
    start_game 'No Haven'
    continue_until_unpaused
    choose_input_action 'Play a Scenario (for experienced players)'
    choose_input_action 'Heretic Convent'
    choose_input_action 'No Pressure'
    choose_input_action 'Confirm'
    choose_input_action 'Disable Suggestions'
    continue_until_unpaused
  end
end