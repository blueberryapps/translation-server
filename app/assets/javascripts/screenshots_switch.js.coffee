reset_selected_screeenshots = ->
  $('.select_screenshot').removeClass('active')
  $('.panel-footer').each ->
    $(this).find('.select_screenshot:visible:first').addClass('active')

hide_mobile = ->
  $('[data-variant=mobile]').hide()
  $('[data-variant=desktop]').show()
  reset_selected_screeenshots()

hide_desktop = ->
  $('[data-variant=desktop]').hide()
  $('[data-variant=mobile]').show()
  reset_selected_screeenshots()

$("#screenshot_variant").bootstrapSwitch
  onInit: ->
    $(this).closest('.switch-wrapper').removeClass('hidden')
  onSwitchChange: (e, state) ->
    if state
      hide_mobile()
    else
      hide_desktop()

hide_mobile()
