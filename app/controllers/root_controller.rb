class RootController < ApplicationController
  def index
  end

  # TODO: REMOVE THIS
  def delete
    Translation.delete_all
    Highlight.delete_all
    Image.delete_all
    Location.delete_all
    Key.delete_all
    Release.delete_all
    Locale.delete_all
    redirect_to root_url
  end
end
