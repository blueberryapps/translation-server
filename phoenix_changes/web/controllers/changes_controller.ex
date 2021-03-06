defmodule PhoenixChanges.ChangesController do
  use PhoenixChanges.Web, :controller

  def index(conn, params) do
    api_token = params["api_token"] || params["token"]

    if !api_token do
      conn |> send_resp(401, Poison.encode!(%{error: "You need to set ?api_token=XXX in url"}))
    else
      conn = put_resp_header(conn, "content-type", "text/event-stream")
      conn = send_chunked(conn, 200)
      send_message(conn, "Listening on changes...")

      Phoenix.PubSub.subscribe(PhoenixChanges.PubSub, "heartbeat")
      Phoenix.PubSub.subscribe(PhoenixChanges.PubSub, "changes")

      data_updated(conn, api_token)

      send_message(conn, "Bye now!")
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
      _ -> IO.puts "Received unknown message"
    end
    data_updated(conn, api_token)
  end

  defp send_message(conn, message) do
    chunk(conn, "retry: 30\nevent: info\ndata: {\"message\": \"#{message}\"}\n\n")
  end
end
