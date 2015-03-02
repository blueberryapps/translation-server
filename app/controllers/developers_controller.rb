class DevelopersController < ApplicationController

  def show
    @renderer = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    @documentation = File.read(Rails.root.join('api_docs', 'api.md'))
  rescue Errno::ENOENT
    @documentation = 'No documentation found.'
  end
end
