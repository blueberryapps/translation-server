module FormHelper

  def form_project_path(subject)
    subject.persisted? ? [subject] : [subject.project || current_project, subject]
  end
end
