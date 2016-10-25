require 'rails_helper'

RSpec.describe RestrictedIp, type: :model do
  it { should belong_to :user }

  describe '#cidr_prefix' do
    subject do
      RestrictedIp.new(ip: ip)
    end

    context 'returns correct cidr prefix for ip or network' do
      let(:ip) { '192.168.0.0/255.255.0.0' }
      specify { expect(subject.cidr_prefix).to eq(16) }
    end
  end

  describe '#cidr_ip' do
    subject do
      RestrictedIp.new(ip: ip)
    end

    context 'returns address including cidr prefix if network' do
      let(:ip) { '192.168.1.0/255.255.255.0' }
      specify { expect(subject.cidr_ip).to eq('192.168.1.0/24') }
    end

    context 'returns address wihtout cidr prefix if ip' do
      let(:ip) { '192.168.1.1/255.255.255.255' }
      specify { expect(subject.cidr_ip).to eq('192.168.1.1') }
    end
  end

  describe '.contains? will return' do
    before do
      create :restricted_ip, ip: '192.168.1.0/24'
    end

    context 'true when ip is contained in restricted ips and ranges' do
      specify { expect(RestrictedIp.contains?('192.168.1.1')).to be_truthy }
    end

    context 'false when ip isnt contained in restricted ips or ranges' do
      specify { expect(RestrictedIp.contains?('192.168.99.1')).to be_falsey }
    end
  end
end