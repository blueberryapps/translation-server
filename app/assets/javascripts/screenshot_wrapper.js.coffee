$(document).ready ->

  $('.screenshot').each ->
    data   = $(this).data()
    x      = data.x
    y      = data.y
    width  = data.width
    height = data.height
    bounds = 200
    zoom   = 0.7

    if data.full
      if $(this).closest('.screenshot-box').length == 0
        $(this).wrap('<div class="screenshot-box"></div>')
      box = $(this).closest('.screenshot-box')

      if box.find('.screenshot-highlight').length == 0
        box.append('<div class="screenshot-highlight"></div>')
      if data.highlight
        highlight = box.find('.screenshot-highlight')
        highlight.css(left: x, top: y, width: width, height: height)

    else
      if $(this).closest('.screenshot-box').length == 0
        $(this).wrap('<div class="screenshot-box"></div>')
      box = $(this).closest('.screenshot-box')

      if $(box).closest('.screenshot-container').length == 0
        $(box).wrap('<div class="screenshot-container"></div>')
      wrapper = $(box).closest('.screenshot-container')

      if data.highlight
        if box.find('.screenshot-highlight').length == 0
          box.append('<div class="screenshot-highlight"></div>')
        highlight = box.find('.screenshot-highlight')
        highlight.css(left: bounds, top: bounds, width: width, height: height)

      if data.full
      else
        $(this).css(left: -x+bounds, top: -y+bounds)

        box.width(width + bounds * 2)
        box.height(height + bounds * 2)
        box.css 'zoom', zoom

        box.css 'left', (wrapper.width() - box.width() ) / 2 * zoom
        box.css 'top', (wrapper.height() - box.height()) / 2 * zoom
