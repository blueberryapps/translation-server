module ResponseHelpers
  def json
    Hashie::Mash.new(JSON.parse(body))
  end
end

[ActionController::TestResponse, ActionDispatch::TestResponse].each do |res|
  res.send(:include, ResponseHelpers)
end
