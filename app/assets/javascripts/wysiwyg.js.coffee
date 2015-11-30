$('textarea.wysiwyg').wysihtml5(
  toolbar: {
    'font-styles': true,  #Font styling, e.g. h1, h2, etc. Default true
    'emphasis':    true,  #Italics, bold, etc. Default true
    'lists':       true,  #(Un)ordered lists, e.g. Bullets, Numbers. Default true
    'html':        true,  #Button which allows you to edit the generated HTML. Default false
    'link':        false, #Button to insert a link. Default true
    'image':       false, #Button to insert an image. Default true,
    'color':       false, #Button to change color of font
    'blockquote':  false, #Blockquote
    'indent':      false
  },
  cleanUp: false,
  parser: (html) -> html
)
$('textarea.wysiwyg').each ->
  textarea = $(this)
  form     = textarea.closest('form')

  form.find('.wysihtml5-sandbox').contents().find('body').on 'keydown', ->
    textarea.trigger('change')
