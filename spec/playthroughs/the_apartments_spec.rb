require 'spec_helper'

$game_map = {
  'Your Bedroom' => {
    'NorthWest' => 'Your Bathroom',
    'West' => 'Your Apartment'
  },
  'Your Bathroom' => {
    'SouthEast' => 'Your Bedroom',
    'SouthWest' => 'Your Apartment'
  },
  'Your Apartment' => {
    'NorthEast' => 'Your Bathroom',
    'East' => 'Your Bedroom',
    'South' => 'Hallway'
  },
  'Hallway' => {
    'NorthWest' => 'Satin\'s Apartment',
    'North' => 'Your Apartment',
    'NorthEast' => 'Samantha\'s Apartment',
    'West' => 'Sophia\'s Apartment',
    'East' => 'Jessie\'s Apartment',
    'SouthWest' => 'Riley\'s Apartment',
    'South' => 'City',
    'SouthEast' => 'Supervisors Office',
    'Up' => 'Roof Gardens',
    'Down' => 'Gym',
  },
  'Satin\'s Apartment' => {
    'SouthWest' => 'Hallway'
  },
  'Samantha\'s Apartment' => {
    'SouthEast' => 'Hallway'
  },
  'Sophia\'s Apartment' => {
    'East' => 'Hallway'
  },
  'Jessie\'s Apartment' => {
    'West' => 'Hallway'
  },
  'Riley\'s Apartment' => {
    'NorthEast' => 'Hallway'
  },
  'Supervisors Office' => {
    'NorthWest' => 'Hallway'
  },
  'Roof Gardens' => {
    'Down' => 'Hallway'
  },
  'Gym' => {
    'Up' => 'Hallway'
  },
  'City' => {
    'North' => 'Hallway',
    'West' => 'Office',
    'East' => 'Shop',
    'SouthEast' => 'Restaurant'
  },
  'Office' => {
    'East' => 'City'
  },
  'Shop' => {
    'West' => 'City'
  },
  'Restaurant' => {
    'NorthWest' => 'City'
  }
}

def navigation_directions(start_room, end_room, rooms_seen = [], directions_taken = [])
  return directions_taken if start_room == end_room

  directions = $game_map[start_room]
  unless directions
    raise "Don't know how to get anywhere from room '#{start_room}''"
  end

  directions.each do |direction, next_room|
    next if rooms_seen.include?(next_room)

    result = navigation_directions(next_room, end_room, rooms_seen + [next_room], directions_taken + [direction])
    return result if result
  end

  nil
end

def go_to_room(destination_room)
  current_room = page.find('#RoomTitle').text

  unless $game_map[destination_room]
    raise "Don't know anything about destination room (#{destination_room})"
  end

  directions = navigation_directions(current_room, destination_room)
  directions.each do |direction|
    go_direction(direction)
    continue_until_unpaused
  end
end

def chat_with(character)
  click_on_character(character)
  choose_action("Chat")
end

def flirt_with(character)
  click_on_character(character)
  choose_action("Flirt")
end

def chat_and_flirt_with(character)
  3.times { chat_with(character) }
  3.times { flirt_with(character) }
end

def talk_with(character)
  click_on_character(character)
  choose_action("Talk")
  continue_until_unpaused
end

def give_object(object)
  click_on_object(object)
  choose_action("Give")
end

def sleep_and_breakfast
  act_on_object("Bed", "Sleep")

  go_direction("West")
  act_on_object("Kitchenette", "Cook")
  go_direction("NorthEast")
  act_on_object("Shower", "Use")
  go_direction("SouthWest")
end

def buy_object(object)
  go_to_room("Shop")
  act_on_object(object, "Buy")
end

def buy_chocolate_and_flowers
  go_to_room("Shop")
  if page.first('#RoomObjectsPanel', text: 'Flowers')
    buy_object("Flowers")
  end
  if page.first('#RoomObjectsPanel', text: 'Chocolates')
    buy_object("Chocolates")
  end
end

def give_chocolate_and_flowers
  give_object("Flowers")
  give_object("Chocolates")
end

def do_some_work
  go_to_room("Office")

  act_on_object("Desk", "Work")
end

def standard_day
  sleep_and_breakfast

  yield if block_given?

  do_some_work

  buy_chocolate_and_flowers

  go_to_room("Your Bedroom")
end

def standard_flirt_day(character_room, character)
  standard_day do
    go_to_room(character_room)

    chat_and_flirt_with(character)
    give_chocolate_and_flowers
  end
end

def standard_chat_day(character_room, character)
  standard_day do
    go_to_room(character_room)

    3.times { chat_with(character) }
    give_chocolate_and_flowers
  end
end

def order_shop_item(item)
  go_to_room("Shop")
  click_on_character("Shop Assistant Amanda")
  choose_action("Ask About")
  choose_input_action(item)
end

describe 'the apartments', type: :feature, js: true do
  it 'can play through the game' do
    start_game('The Apartments')

    choose_input_action('New Game')
    fill_in 'textinput', with: 'Testplayer'
    click_on 'textbutton'

    expect(page).to have_content('The Apartments')

    continue_until_unpaused

    go_to_room("Supervisors Office")

    go_to_room("Hallway")

    chat_and_flirt_with("Riley")

    talk_with("Riley")

    do_some_work
    buy_chocolate_and_flowers

    go_to_room("Your Bedroom")

    # Day 2
    standard_flirt_day("Hallway", "Riley")
    standard_flirt_day("Hallway", "Riley")

    go_to_room("Hallway")
    talk_with("Riley")
    order_shop_item('Sharknado')
    go_to_room("Your Bedroom")

    standard_chat_day("Jessie's Apartment", "Jessie")
    standard_chat_day("Jessie's Apartment", "Jessie")

    go_to_room("Jessie's Apartment")
    talk_with("Jessie")
    go_to_room("Roof Gardens")
    act_on_object("Pink Vibrator", "Take")
    go_to_room("Jessie's Apartment")
    give_object("Pink Vibrator")
    continue_until_unpaused
    give_chocolate_and_flowers
    buy_chocolate_and_flowers
    go_to_room("Your Bedroom")

    standard_chat_day("Jessie's Apartment", "Jessie")
    go_to_room("Jessie's Apartment")
    talk_with("Jessie")
  end
end