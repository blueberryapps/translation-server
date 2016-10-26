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

  describe '.contains?' do
    before { create :restricted_ip, ip: ip }

    context 'for IPv4 address range' do
      let(:ip) { '192.168.1.0/24' }

      specify { expect(RestrictedIp.contains?('192.168.1.1')).to be_truthy }
      specify { expect(RestrictedIp.contains?('192.168.1.250')).to be_truthy }
      specify { expect(RestrictedIp.contains?('192.168.99.1')).to be_falsey }
      specify { expect(RestrictedIp.contains?('172.22.0.1')).to be_falsey }
    end

    context 'for single IPv4 address' do
      let(:ip) { '192.168.1.50' }

      specify { expect(RestrictedIp.contains?('192.168.1.50')).to be_truthy }
      specify { expect(RestrictedIp.contains?('192.168.1.60')).to be_falsey }
      specify { expect(RestrictedIp.contains?('172.22.0.1')).to be_falsey }
    end

    context 'for IPv6 address range' do
      let(:ip) { '2001:1620:28::/48' }

      specify do
        expect(RestrictedIp.contains?('2001:1620:28:1:b6f:8bca:93:a116'))
          .to be_truthy
      end

      specify do
        expect(RestrictedIp.contains?('2001:1620:99:1:b6f:8bca:93:1'))
          .to be_falsey
      end

      specify do
        expect(RestrictedIp.contains?('fda0:a76a:68ed:1:1:1:1:1'))
          .to be_falsey
      end
    end

    context 'for single IPv6 address' do
      let(:ip) { '2001:1620:28:1:b6f:8bca:93:a116' }

      specify do
        expect(RestrictedIp.contains?('2001:1620:28:1:b6f:8bca:93:a116'))
          .to be_truthy
      end
      specify do
        expect(RestrictedIp.contains?('2001:1620:28:1:b6f:8bca:93:1'))
          .to be_falsey
      end
      specify do
        expect(RestrictedIp.contains?('fda0:a76a:68ed:1:1:1:1:1'))
          .to be_falsey
      end
    end
  end
end
