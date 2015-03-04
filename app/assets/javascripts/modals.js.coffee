$(document).ready ->

  if $('.highlight_modal').length

    $('.highlight_modal').click (event) ->
      data   = $(this).data()
      modal  = $(data.target)
      modal.on 'show.bs.modal', ->
        $(this).find('.screenshot-box').hide()
      modal.on 'shown.bs.modal', ->
        $(this).find('.screenshot-box').show()
        modal_width =  $(this).find('.modal-body').width()
        image_width = $(this).find('.screenshot-box img').width()

        if modal_width < image_width
          zoom = modal_width / image_width
          $(this).find('.screenshot-box').css('zoom', zoom)

      modal.modal(
        keyboard: true
        show: true
      )

      return false
