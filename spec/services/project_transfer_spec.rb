require 'rails_helper'

RSpec.describe ProjectTransfer do
  let(:project_name) { 'Super Duper Project' }
  let(:url) { 'http://some.translationserver.com' }
  let(:locales) { 'en' }
  let(:api_token) { 'XYZ' }
  let(:query) { { token: api_token } }

  subject do
    described_class.new(
      url: url,
      locales: locales,
      api_token: api_token,
      project_name: project_name
    )
  end

  before do
    stub_request(:get, "http://some.translationserver.com/api/v1/transfer/#{locales}")
      .with(query: query)
      .to_return(body: {
        en: {
          translations: {
            'foo.bar': 'FooBar',
            'foo.hi': 'Hello'
          },
          locations: {
            '/foo': [
              {
                name: 'image',
                variant: 'base',
                image: 'PNGGGGGG',
                highlights: [
                  {
                    x: 1,
                    y: 2,
                    width: 10,
                    height: 20,
                    key: 'foo.bar',
                  }
                ]
              }
            ]
          },
          releases: {
            'en_v001': {
              created_at: '2016-01-02T03:04:05',
              yaml: '---YAML'
            }
          }
        }
      }.to_json)

    stub_request(:get, "http://some.translationserver.com/api/v1/transfer/#{locales}")
      .with(query: {token: 'INVALID'}).to_return(status: 401)

    stub_request(:get, "http://some.translationserver.com/api/v1/transfer/unknown")
      .with(query: query).to_return(status: 404)
  end

  describe '#valid?' do
    specify { expect(subject).to be_valid }
    specify { expect(described_class.new).not_to be_valid }
  end

  describe '#execute' do
    it 'creates new project' do
      expect { subject.execute }.to change(Project, :count).by(1)
    end

    it 'creates locales to project' do
      expect { subject.execute }.to change(Locale, :count).by(1)
    end

    it 'creates 2 keys' do
      expect { subject.execute }.to change(Key, :count).by(2)
    end

    it 'creates 2 translations' do
      expect { subject.execute }.to change(Translation, :count).by(2)
    end

    it 'creates 1 location' do
      expect { subject.execute }.to change(Location, :count).by(1)
    end

    it 'creates 1 highlight' do
      expect { subject.execute }.to change(Highlight, :count).by(1)
    end

    it 'creates 1 image' do
      expect { subject.execute }.to change(Image, :count).by(1)
    end

    it 'creates 1 release' do
      expect { subject.execute }.to change(Release, :count).by(1)
    end

    context 'executed action' do
      let(:project) { Project.find_by(name: project_name) }
      let(:release) { project.locales.first.releases.first }

      action do
        subject.execute
      end

      it 'has release with same data' do
        expect(release.yaml).to eq('---YAML')
        expect(release.created_at.to_date).to eq(Time.new(2016, 1, 2, 3, 4, 5).to_date)
      end
    end

    it 'this action is indepotent' do
      subject.execute

      #run it again
      expect {
        expect {
          expect {
            expect {
              expect {
                expect {
                  expect {
                    expect {
                      described_class.new(
                        url: url,
                        locales: locales,
                        api_token: api_token,
                        project_name: project_name
                      ).execute
                    }.to change(Project, :count).by(0)
                  }.to change(Locale, :count).by(0)
                }.to change(Key, :count).by(0)
              }.to change(Translation, :count).by(0)
            }.to change(Location, :count).by(0)
          }.to change(Highlight, :count).by(0)
        }.to change(Image, :count).by(0)
      }.to change(Release, :count).by(0)
    end

    context 'invalid token' do
      let(:api_token) { 'INVALID' }

      it 'not to create project' do
        expect { subject.execute }.to change(Project, :count).by(0)
      end

      it 'has error' do
        expect(subject.errors.size).to eq(0)
        subject.execute
        expect(subject.errors.size).to eq(1)
      end
    end

    context 'non existing locale' do
      let(:locales) { 'unknown' }

      it 'not to create project' do
        expect { subject.execute }.to change(Project, :count).by(0)
      end

      it 'has error' do
        expect(subject.errors.size).to eq(0)
        subject.execute
        expect(subject.errors.size).to eq(1)
      end
    end
  end
end
