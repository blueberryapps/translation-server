module ApiResponse
  def api_response
    Hashie::Mash.new(JSON.parse(response.body))
  end
end
