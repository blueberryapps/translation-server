defmodule PhoenixChanges.PageController do
  use PhoenixChanges.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
