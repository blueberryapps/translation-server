module RSpec
  module Macros
    include ActiveSupport::Concern

    def action(options = {}, &block)
      before do |example|
        class << self
          attr_accessor :result
        end

        if example.metadata.fetch(:action, true)
          self.result = instance_eval(&block)
        end
      end
    end
  end
end

RSpec.configure do |config|
  config.extend RSpec::Macros
end
