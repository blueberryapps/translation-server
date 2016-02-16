users = [
  { email: 'jbrhel@blueberryapps.com' },
  { email: 'apleskac@blueberryapps.com' }
]

users.each do |hsh|
  default_args = { password: 'heslo123', role: 'admin' }
  User.create!(hsh.merge(default_args))
end
