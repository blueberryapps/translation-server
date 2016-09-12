FactoryGirl.define do
  factory :location do
    project
    sequence(:path) { |n| "super/path/#{n}" }
  end

end
