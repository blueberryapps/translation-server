require 'rails_helper'

RSpec.describe Translation, type: :model do
  it { is_expected.to belong_to :locale }
  it { is_expected.to have_one :project }
  it { is_expected.to belong_to :key }

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
