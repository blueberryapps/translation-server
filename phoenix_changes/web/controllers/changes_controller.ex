defmodule PhoenixChanges.ChangesController do
  use PhoenixChanges.Web, :controller

  def index(conn, params) do
    api_token = params["api_token"]

    if !api_token do
      send_resp(conn, 401, Poison.encode!(%{error: "You need to set ?api_token=XXX in url"}))
    else
      Phoenix.PubSub.subscribe(PhoenixChanges.PubSub, "heartbeat")
      conn
        |> put_resp_header("content-type", "text/event-stream")
        |> send_chunked(200)
        |> send_message("Listening on changes...")
        |> data_updated(api_token)
    end
  end

  defp data_updated(conn, api_token) do
    receive do
      {:translations_change, payload} ->
        if payload[:api_token] === api_token do
          IO.puts "Sending event translations_changed #{payload[:api_token]}"
          {:ok, conn} = chunk(conn, ["retry: 30", "event: translations_changed", "data: #{payload[:change]}", "\n"] |> Enum.join("\n"))
        end
      {:translations_heartbeat, payload} ->
        IO.puts "Sending event translations_heartbeat"
        {:ok, conn} = chunk(conn, ["retry: 30", "event: translations_heartbeat", "data: #{Poison.encode!(payload)}", "\n"] |> Enum.join("\n"))
      _ ->
    end
    data_updated(conn, api_token)
  end

  defp send_message(conn, message) do
    chunk(conn, "retry: 30\nevent: info\ndata: {\"message\": \"#{message}\"}\n\n")
  end
end
