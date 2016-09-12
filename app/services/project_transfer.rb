class ProjectTransfer
  include Virtus.value_object
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations

  attribute :url, String
  attribute :locales, String
  attribute :api_token, String
  attribute :project_name, String

  validates :url, :locales, :api_token, :project_name, presence: true

  def execute
    download_data
    create_project

    data.each do |code, locale_data|
      locale = Locale.resolve(project: project, code: code)
      create_keys(locale, locale_data)
      create_locations(locale, locale_data)
      create_releases(locale, locale_data)
    end

    true
  rescue RestClient::NotFound => e
    errors.add(:url, "Unable to download transfer data: #{e.message}")
    false
  rescue RestClient::Unauthorized => e
    errors.add(:api_token, "Unable to download transfer data: #{e.message}")
    false
  rescue SocketError => e
    errors.add(:url, "Unable to download transfer data: #{e.message}")
    false
  end

  def persisted?
    false
  end

  private

  def download_data
    uri = URI.join(url, "api/v1/transfer/#{locales}")
    uri.query = { token: api_token }.to_query
    @data ||= Yajl::Parser.parse(RestClient.get(uri.to_s), symbolize_keys: true)
  end
  alias :data :download_data

  def create_project
    @project ||= Project.where(name: project_name).first_or_create
  end
  alias :project :create_project

  def create_keys(locale, locale_data)
    locale_data[:translations].each do |key_name, text|
      key = Key.resolve(project: project, key: key_name)
      Translation.resolve({ locale: locale, key: key }, { text: text })
    end
  end

  def create_locations(locale, locale_data)
    locale_data[:locations].each do |path, images|
      location = Location.resolve(project: project, path: path)

      images.each do |image_data|
        image = Image.resolve({
          name:     image_data[:name],
          variant:  image_data[:variant],
          location: location
        }, { image: image_data[:image] })

        image_data[:highlights].each do |highlight|
          Highlight.resolve({
            key:      Key.resolve(project: project, key: highlight[:key]),
            image:    image,
            locale:   locale,
            location: location
          }, {
            x: highlight[:x],
            y: highlight[:y],
            width: highlight[:width],
            height: highlight[:height]
          })
        end
      end
    end
  end

  def create_releases(locale, locale_data)
    locale_data[:releases].each do |version, release_data|
      Release.where(locale: locale, version: version)
        .first_or_create(
          yaml: release_data[:yaml],
          created_at: release_data[:created_at]
        )
    end
  end

  def locale_codes
    locales.split(',')
  end
end
