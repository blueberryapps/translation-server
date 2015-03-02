users = [
  { email: 'jzajpt@blueberryapps.com' },
  { email: 'tdundacek@blueberryapps.com' },
  { email: 'mmoravcik@blueberryapps.com' },
  { email: 'jiri.orsag@gmail.com' },
  { email: 'obartas@blueberryapps.com' },
  { email: 'lvoda@blueberryapps.com' }
]

users.each do |hsh|
  default_args = { password: 'heslo123' }
  User.create!(hsh.merge(default_args))
end
