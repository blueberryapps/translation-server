require 'rails_helper'

RSpec.describe Translation, type: :model do
  it { should belong_to :locale }
  it { should have_one :project }
  it { should belong_to :key }
  it { should belong_to :user }

  describe '.not_approved' do
    let(:project) { create :project }
    let(:locale) { create :locale, project: project }
    let(:key) { create :key, project: project }
    let(:key2) {create :key, project: project }
    let!(:approved) { create :translation, locale: locale, project: project, key: key, text: 'A', original_text: 'A' }
    let!(:not_approved) { create :translation, locale: locale, project: project, key: key2, text: 'A', original_text: 'B' }

    it 'should return only not_approved translations' do
      expect(locale.translations.not_approved).to eq([not_approved])
    end
  end

  describe '.approve!' do
    let(:project) { create :project }
    let(:locale) { create :locale, project: project }
    let(:key) { create :key, project: project }
    let(:key2) { create :key, project: project }
    let(:user) { create :user }
    let!(:approved) { create :translation, locale: locale, project: project, key: key, text: 'A', original_text: 'A' }
    let!(:not_approved) { create :translation, locale: locale, project: project, key: key2, text: 'A', original_text: 'B' }

    it 'should approve translation' do
      expect(locale.translations.not_approved).to eq([not_approved])
      Translation.approve!([not_approved], user)
      expect(locale.translations.not_approved).to eq([])
    end

    it 'approve should update original text' do
      Translation.approve!([not_approved], user)
      expect(not_approved.reload.original_text).to eq(not_approved.reload.text)
    end

    it 'approve should add user to translation' do
      expect(not_approved.reload.user).to be_nil
      Translation.approve!([not_approved], user)
      expect(not_approved.reload.user).to eq(user)
    end
  end

  describe '#text=' do
    let(:data_type) { 'string' }
    let(:key)       { Key.new(data_type: data_type)}

    subject do
      Translation.new(key: key, text: text)
    end

    context 'sets text to integer' do
      let(:data_type) { 'integer' }
      let(:text)      { 1 }
      specify         { expect(subject.text).to eq('1') }
    end

    context 'sets text to string' do
      let(:text) { 'hello' }
      specify    { expect(subject.text).to eq('hello') }
    end

    context 'removes windows new lines' do
      let(:text) { "hello\r\n" }
      specify    { expect(subject.text).to eq("hello\n") }
    end

    context 'does not update valid html' do
      let(:text) { '<i>valid</i>' }
      specify    { expect(subject.text).to eq('<i>valid</i>') }
    end

    context 'fixes invalid html' do
      let(:text) { '<i>valid</b>' }
      specify    { expect(subject.text).to eq('<i>valid</i>') }
    end

    context 'does not remove empty element from valid html' do
      let(:text) { '<span class="hi" /><b>valid</b>' }

      specify do
        expect(subject.text).to eq('<span class="hi"></span><b>valid</b>')
      end
    end

    context 'pretty print of valid html' do
      let(:text) { '<p class="hi"><b class="bye">valid</b></p>' }

      specify do
        expect(subject.text)
          .to eq("<p class=\"hi\">\n  <b class=\"bye\">valid</b>\n</p>")
      end
    end

    context 'escapes special characters when the text contains html elements' do
      let(:text) { '<h1>Black & White</h1>' }
      specify    { expect(subject.text).to eq('<h1>Black &amp; White</h1>') }
    end

    context 'doesnt escape special characters for plain text' do
      let(:text) { 'Black & White' }
      specify    { expect(subject.text).to eq('Black & White') }
    end
  end
end
