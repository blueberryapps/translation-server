$('.select_screenshot').bind 'click', ->
  id        = $(this).data('screenshot')
  panel     = $(this).closest('.panel')
  container = panel.find('.tr-image')
  image     = container.find("[data-target='##{id}']")
  scroll    = image.offset().top - container.offset().top
  container.animate({ scrollTop: scroll }, 200);

  panel.find('.select_screenshot').removeClass('active')
  $(this).addClass('active')

$('.panel-footer').each ->
  $(this).find('.select_screenshot:first').addClass('active')
