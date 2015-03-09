module Resolvable
  extend ActiveSupport::Concern

  module ClassMethods
    def resolvs(where_args = {}, create_args = {})
      where(where_args).first_or_create(create_args)
    end
  end
end
