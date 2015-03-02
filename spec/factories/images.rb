FactoryGirl.define do
  factory :image do
    location
    key
    variant 'desktop'
    x       1
    y       1
    width   1
    height  1
    image  'XXYYYZZZ'
  end

end
