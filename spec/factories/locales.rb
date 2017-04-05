FactoryGirl.define do
  factory :locale do
    project
    sequence(:code) { |n| "cs#{n}" }
    trait :with_translations do
    	after(:build) do |locale|
        create :translation, locale: locale, key: create(:key, project: locale.project), edited: true
    		create :translation, locale: locale, key: create(:key, project: locale.project)
    	end
    end
  end

end
