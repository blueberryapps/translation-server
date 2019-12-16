module Scheduled
  class CacheTranslations < ApplicationJob
    def perform
      Project.find_each(&:cache_translations!)
    end
  end
end
