def buy_object(name)
  click_on_object(name)
  choose_action('Buy?')
  choose_input_action('Yes')
end

def go_downtown
  click_on_object('Go Downtown')
  choose_action('Go Downtown')
end

def go_home
  click_on_object('Go Home')
  choose_action('Go Home')
end

def start_client_session(name)
  click_on_object('Arrange Session')
  choose_action(name)
  continue_until_unpaused
  go_direction('NorthWest')
end

def skip_to_weekend
  click_on_object('End Day')
  choose_action('Skip forward to Weekend')
  choose_cmdinput_action('Yes, go to Friday')
  continue_until_unpaused
end

def start_weekend_session(name)
  click_on_object('Arrange Weekend Session')
  choose_action(name)
end

describe 'wife trainer', type: :feature, js: true do
  it 'can play through the game' do
    start_game('Wife Trainer')

    click_on_object('Start New Game')
    choose_action('Start New Game')
    choose_input_action('Playboy')
    choose_input_action('Yes')

    set_game_variable('Money', 200000)

    click_on_object('Check Messages')
    choose_action('New Message')
    choose_cmdinput_action('Yes')

    click_on_object('Check Messages')
    choose_action('New Message')
    choose_cmdinput_action('Yes')

    click_on_object('Check Messages')
    choose_action('New Message')
    choose_cmdinput_action('Yes')

    go_downtown

    go_direction('NorthWest')
    click_on_character('the Store Clerk')
    choose_action('Examine')
    click_on_character('the Store Clerk')
    choose_action('Talk to her')
    click_on_character('Rae the Store Clerk')
    choose_action('Flirt')
    continue_until_unpaused

    buy_object('Dildos')
    buy_object('Lingerie')
    buy_object('Silk Sheets')
    buy_object('Scented Oils')
    buy_object('Ceiling Mirror')
    buy_object('Fluffy Cuffs')

    go_direction('SouthEast')
    go_direction('NorthEast')

    buy_object('Chastity Belts')
    buy_object('Butt Plugs')
    buy_object('Floggers and Paddles')
    buy_object('Suspension Gear')
    buy_object('Ball and Ring Gags')
    buy_object('Fuck Machine')

    go_direction('SouthWest')
    click_on_object('Buy a coffee')
    choose_action('Pick up a coffee to go')
    choose_cmdinput_action('Pay up')
    continue_until_unpaused

    go_home

    start_client_session('Elsa')
    act_on_character('Elsa', 'Talk to Her')
    choose_cmdinput_action('How far will you go')
    act_on_character('Elsa', 'Tell Her to Come Closer')
    act_on_character('Elsa', 'Kiss')
    continue_until_unpaused

    choose_cmdinput_action("It's lovely")
    continue_until_unpaused

    start_client_session('Chelsea')
    act_on_character('Chelsea', 'Talk to Her')
    continue_until_unpaused
    choose_cmdinput_action("For this to work, you need to let me")
    act_on_character('Chelsea', 'Work on Her Diet')
    continue_until_unpaused
    choose_cmdinput_action("How to structure")
    continue_until_unpaused

    choose_cmdinput_action("Invite her in")
    continue_until_unpaused
    choose_cmdinput_action("Show her the boudoir")
    continue_until_unpaused

    start_client_session('Jasmine')
    act_on_character('Jasmine', 'Talk to Her')
    continue_until_unpaused
    choose_cmdinput_action("Not really.")
    act_on_character('Jasmine', 'Prep Work')
    continue_until_unpaused

    skip_to_weekend
    start_weekend_session('Chelsea')
    choose_cmdinput_action("Boot Camp")
    continue_until_unpaused
  end
end