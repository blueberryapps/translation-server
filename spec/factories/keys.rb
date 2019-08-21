FactoryBot.define do
  factory :key do
    project
    sequence(:key) { |n| "key.#{n}" }
    note { 'description of key' }
  end

end
