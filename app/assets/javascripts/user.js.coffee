$('select#user_role').on 'change', ->
  if this.value == 'admin'
    $('.form-group.check_boxes.optional.user_available_locales').hide()
  else
    $('.form-group.check_boxes.optional.user_available_locales').show()
