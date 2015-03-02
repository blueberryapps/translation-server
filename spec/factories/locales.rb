FactoryGirl.define do
  factory :locale do
    sequence(:code) { |n| "cs#{n}" }
  end

end
