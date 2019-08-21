FactoryBot.define do
  factory :restricted_ip do
    ip { '192.168.1.0/24' }
    user { nil }
  end
end
