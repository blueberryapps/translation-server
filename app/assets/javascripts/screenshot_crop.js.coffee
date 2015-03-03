$(document).ready ->

  image = $('#image_to_select')
  image.removeClass('img-responsive')
  original_width = image.width()
  image.addClass('img-responsive')
  resized_width = image.width()

  aspect = original_width / resized_width

  x      = parseInt $('#highlight_x').val()
  y      = parseInt $('#highlight_y').val()
  width  = parseInt $('#highlight_width').val()
  height = parseInt $('#highlight_height').val()

  image.Jcrop(
    setSelect: [ x / aspect, y / aspect, (x + width) / aspect, (y + height) / aspect ]
    onChange: (c) ->
      $('#highlight_x').val(Math.round c.x * aspect)
      $('#highlight_y').val(Math.round c.y * aspect)
      $('#highlight_width').val(Math.round c.w * aspect)
      $('#highlight_height').val(Math.round c.h * aspect)
  )
