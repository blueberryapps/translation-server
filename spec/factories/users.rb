FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "joe#{n}@example.com" }
    password         'joesthebest'
  end
end
