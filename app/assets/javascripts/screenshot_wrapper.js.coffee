$(document).ready ->

  $('.screenshot').each ->
    if $(this).closest('.screenshot-container').length == 0
      $(this).wrap('<div class="screenshot-container"></div>')

    wrapper = $(this).closest('.screenshot-container')

    data   = $(this).data()
    x      = data.x
    y      = data.y
    width  = data.width
    height = data.height
    box    = 100

    $(this).css(left: -x+box, top: -y+box)

    wrapper.width(width + box * 2)
    wrapper.height(height + box * 2)

