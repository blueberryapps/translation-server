class ReactController < AuthController
  layout 'react'
  def index
    @initial_state = 'initial state'
  end
end
