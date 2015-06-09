
$(document).ready ->

  is_changed_state = (form) ->
    textarea = form.find('textarea')
    "#{textarea.val()}" != "#{textarea.data().original}"

  check_state = (form) ->
    if !form.hasClass('request-in-progress')
      if is_changed_state(form)
        set_state form, 'changed'
      else
        set_state form, 'not_changed'

  set_state = (form, state) ->
    root_element = form.closest('.panel')
    changing_element = root_element.find('button')

    changing_element.removeClass('btn-warning btn-success')

    if state == 'not_changed'
      changing_element.attr('title', 'Not Changed')
      changing_element.html("<i class='fa fa-check'></i>")
    if state == 'changed'
      changing_element.attr('title', 'Modified')
      changing_element.addClass 'btn-warning'
      changing_element.html("<i class='fa fa-floppy-o'></i>")
    if state == 'started'
      changing_element.attr('title', 'Saving')
      changing_element.addClass 'btn-warning'
      changing_element.html("<i class='fa fa-refresh rotating'></i>")
    if state == 'error'
      changing_element.attr('title', 'Error with saving')
      changing_element.html("<i class='fa fa-exclamation-triangle'></i>")
    if state == 'success'
      changing_element.attr('title', 'Saved')
      changing_element.addClass 'btn-success'
      changing_element.html("<i class='fa fa-check'></i>")
      textarea = form.find('textarea')
      textarea.data 'original', textarea.val()

    if state == 'error' || state == 'success'
      setTimeout ->
        check_state(form)
      , 1000

  $('.edit_translation').on 'ajax:before', (data, status, xhr) ->
    $(this).addClass('request-in-progress')
    set_state($(this), 'started')
  $('.edit_translation').on 'ajax:success', (data, status, xhr) ->
    $(this).removeClass('request-in-progress')
    set_state($(this), 'success')
  $('.edit_translation').on 'ajax:error', (data, status, xhr) ->
    $(this).removeClass('request-in-progress')
    set_state($(this), 'error')

  $('.edit_translation').each ->
    form = $(this)
    check_state(form)

    form.find('textarea').bind 'blur', (e) ->
      check_state(form)
      if is_changed_state(form)
        form.trigger('submit')

    form.find('textarea').bind 'change keyup keydown', (e) ->
      check_state(form)
      code = e.keyCode || e.which
      if "#{code}" == '9' && e.type == 'keydown'
        if is_changed_state(form)
          form.trigger('submit')

  $('.translations_submit_all').click ->
    $('.edit_translation').each ->
      form = $(this)
      if is_changed_state(form)
        form.trigger('submit')
