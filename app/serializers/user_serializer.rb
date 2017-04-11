class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :photo

  def photo
    current_user.photo_url(20)
  end
end
