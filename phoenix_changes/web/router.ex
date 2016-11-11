defmodule PhoenixChanges.Router do
  use PhoenixChanges.Web, :router

  pipeline :browser do
    plug :accepts, ["html", "text/event-stream"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PhoenixChanges do
    pipe_through :browser # Use the default browser stack

    get "/api/v1/changes", ChangesController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixChanges do
  #   pipe_through :api
  # end
end
