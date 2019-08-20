class RootController < ApplicationController
  def is_alive
    render plain: 'Yeah Treanslation server is alive'
  end
end
