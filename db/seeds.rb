users = [
  { email: 'jzajpt@blueberryapps.com' },
  { email: 'tdundacek@blueberryapps.com' },
  { email: 'mmoravcik@blueberryapps.com' },
  { email: 'jorsag@blueberryapps.com' },
  { email: 'obartas@blueberryapps.com' },
  { email: 'lvoda@blueberryapps.com' }
]

users.each do |hsh|
  default_args = { password: 'heslo123', role: 'admin' }
  User.create!(hsh.merge(default_args))
end
