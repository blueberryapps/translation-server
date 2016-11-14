defmodule ChangesListener do
  use Boltun, otp_app: :phoenix_changes

  listen do
    channel "heartbeat", :heartbeat
    channel "translations", :translations
  end

  def translations(_, payload) do
    [action, api_token, data] = String.split(payload, ":")
    change = Base.decode64!(String.replace(data, "\n", ""))
    IO.puts "Broadcasting translations_change: #{action}, #{api_token} from pg"
    Phoenix.PubSub.broadcast PhoenixChanges.PubSub, "heartbeat", {:translations_change, %{api_token: api_token, change: change}}
  end

  def heartbeat(_, payload) do
    Phoenix.PubSub.broadcast PhoenixChanges.PubSub, "heartbeat", {:translations_heartbeat, %{}}
    IO.puts "Broadcasting heartbeat: #{payload} from pg"
  end
end
