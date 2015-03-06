
$(document).ready ->

  is_changed_state = (form) ->
    textarea         = form.find('textarea')
    (textarea.val() != textarea.data().original)

  check_state = (form) ->
    if !form.hasClass('request-in-progress')
      if is_changed_state(form)
        set_state form, 'changed'
      else
        set_state form, 'not changed'

  set_state = (form, state) ->
    root_element = form.closest('tr')
    changing_element = root_element.find('td:first-child')
    changing_element.text(state)

    if state == 'success'
      textarea = form.find('textarea')
      textarea.data 'original', textarea.val()

      setTimeout ->
        check_state(form)
      , 5000

  $('.edit_translation').on 'ajax:before', (data, status, xhr) ->
    $(this).addClass('request-in-progress')
    set_state($(this), 'before')
  $('.edit_translation').on 'ajax:success', (data, status, xhr) ->
    $(this).removeClass('request-in-progress')
    set_state($(this), 'success')
  $('.edit_translation').on 'ajax:error', (data, status, xhr) ->
    set_state($(this), 'error')

  $('.edit_translation').each ->
    form = $(this)
    check_state(form)
    form.find('textarea').bind 'change keyup', ->
      check_state(form)

  $('.translations_submit_all').click ->
    $('.edit_translation').each ->
      form = $(this)
      if is_changed_state(form)
        form.trigger('submit')
