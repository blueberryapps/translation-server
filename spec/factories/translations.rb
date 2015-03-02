FactoryGirl.define do
  factory :translation do
    key
    locale
    text "translated text"
  end

end
