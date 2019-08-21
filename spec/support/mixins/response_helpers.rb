module ResponseHelpers
  def json
    Hashie::Mash.new(JSON.parse(body))
  end

  def yaml
    Hashie::Mash.new(YAML.load(body))
  end
end

[ActionDispatch::TestResponse].each do |res|
  res.send(:include, ResponseHelpers)
end
