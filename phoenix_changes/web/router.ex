defmodule PhoenixChanges.Router do
  use PhoenixChanges.Web, :router

  pipeline :browser do
    plug :accepts, ["html", "event-stream"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["event-stream"]
  end

  scope "/", PhoenixChanges do
    pipe_through :api

    get "/api/v1/changes", ChangesController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixChanges do
  #   pipe_through :api
  # end
end
