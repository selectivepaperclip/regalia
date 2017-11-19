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
    act_on_self 'Assignments around the Encampment'
    choose_input_action 'Scavenging - Forage for Supplies - (X Slavers) - (Eight Hours) - (Standard)'
    choose_input_action '1'
    page.all('.inputchoices').first.click
    choose_input_action 'Confirm Assignment'
    act_on_self 'Finish Day'
    continue_until_unpaused
  end
end