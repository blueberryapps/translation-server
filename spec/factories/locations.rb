FactoryGirl.define do
  factory :location do
    sequence(:path) { |n| "super/path/#{n}" }
  end

end
