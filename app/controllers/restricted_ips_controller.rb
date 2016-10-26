class RestrictedIpsController < AdminController
  before_action :set_restricted_ip, only: [:destroy]

  def index
    @restricted_ips = RestrictedIp.order('inet(ip)').page(params[:page])

    @restricted_ip = RestrictedIp.new
    respond_with @restricted_ips
  end

  def create
    @restricted_ip = RestrictedIp.new(restricted_ip_params)
    @restricted_ip.user = current_user

    @restricted_ip.save
    redirect_to action: :index
  end

  def destroy
    @restricted_ip.destroy
    respond_with @restricted_ip, location: [:restricted_ips]
  end

  private

  def set_restricted_ip
    @restricted_ip = RestrictedIp.find(params[:id])
  end

  def restricted_ip_params
    params.require(:restricted_ip).permit(:ip)
  end
end
