class RootController < ApplicationController
  def is_alive
    render text: 'Yeah Treanslation server is alive'
  end
end
