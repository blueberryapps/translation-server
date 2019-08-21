class TransferController < AuthController
  before_action :allow_admin

  def index
    @transfer = ProjectTransfer.new
    render :index
  end

  def create
    @transfer = ProjectTransfer.new(params.to_unsafe_h[:project_transfer])

    if @transfer.valid? && @transfer.execute
      redirect_to [:transfer], flash: { notice: "Transfered #{@transfer.locales} to #{@transfer.project_name}" }
    else
      render :index, flash: { error: 'Some error in transfering project' }
    end
  end

  private

  def allow_admin
    authorize ProjectTransfer, :manage?
  end
end
