FactoryGirl.define do
  factory :locale do
    project
    sequence(:code) { |n| "cs#{n}" }
  end

end
