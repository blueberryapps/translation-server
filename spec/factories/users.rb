FactoryBot.define do
  factory :user do
    sequence(:email)    { |n| "joe#{n}@blueberryapps.com" }
    sequence(:password) { |n| "superpass#{n}" }
    role { 'admin' }

    trait :with_project do
      after(:build) do |user|
        create :project, users: [user]
      end
    end
  end
end
