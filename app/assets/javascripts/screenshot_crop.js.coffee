$(document).ready ->

  image = $('#image_to_select')
  image.removeClass('img-responsive')
  original_width = image.width()
  image.addClass('img-responsive')
  resized_width = image.width()

  aspect = original_width / resized_width

  x      = parseInt $('#image_x').val()
  y      = parseInt $('#image_y').val()
  width  = parseInt $('#image_width').val()
  height = parseInt $('#image_height').val()

  image.Jcrop(
    setSelect: [ x / aspect, y / aspect, (x + width) / aspect, (y + height) / aspect ]
    onChange: (c) ->
      $('#image_x').val(Math.round c.x * aspect)
      $('#image_y').val(Math.round c.y * aspect)
      $('#image_width').val(Math.round c.w * aspect)
      $('#image_height').val(Math.round c.h * aspect)
  )
