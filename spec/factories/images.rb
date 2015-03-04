FactoryGirl.define do
  factory :image do
    sequence(:name) { |n| "iamge_name_#{n}" }
    location
    variant 'desktop'
    image   'XXYYYZZZ'
  end

end
