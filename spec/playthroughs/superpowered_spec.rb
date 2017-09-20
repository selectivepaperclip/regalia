describe 'superpowered', type: :feature, js: true do
  it 'can play through the game' do
    start_game('Superpowered')

    choose_input_action 'Test Mode (easy)'
    choose_input_action 'Teen Sister'
    choose_input_action 'Well Endowed'
    continue_until_unpaused

    act_on_object 'Newspaper', 'Read'
  end
end