FactoryGirl.define do
  factory :user do
    sequence(:email)    { |n| "joe#{n}@blueberryapps.com" }
    sequence(:password) { |n| "superpass#{n}" }
  end
end
