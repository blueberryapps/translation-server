FactoryGirl.define do
  factory :key do
    sequence(:key) { |n| "key.#{n}" }
    note "description of key"
  end

end
