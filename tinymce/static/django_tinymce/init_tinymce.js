var django = django || {
    "jQuery": jQuery.noConflict(true)
};

(function ($) {
  function initTinyMCE($e) {
    if ($e.parents('.empty-form').length == 0) {  // Don't do empty inlines
      var mce_conf = $.parseJSON($e.attr('data-mce-conf'));
      var id = $e.attr('id');
      // disable grapelli
      if (id.indexOf('__prefix__') !== -1) {
        return
      }
      if ('elements' in mce_conf && mce_conf['mode'] == 'exact') {
        mce_conf['elements'] = id;
      }
      if ($e.attr('data-mce-gz-conf')) {
        tinyMCE_GZ.init($.parseJSON($e.attr('data-mce-gz-conf')));
      }
      if (!tinyMCE.editors[id]) {
        tinyMCE.init(mce_conf);
      }
    }
  }

  $(function () {
    // initialize the TinyMCE editors on load
    $('.tinymce').each(function () {
      initTinyMCE($(this));
    });

    // initialize the TinyMCE editor after adding an inline
    // XXX: We don't use jQuery's click event as it won't work in Django 1.4
    document.body.addEventListener("click", function(ev) {
      if (!ev.target.parentNode || (ev.target.parentNode.className.indexOf("add-row") === -1 && ev.target.parentNode.className.indexOf("grp-add-handler") === -1)) {
        return;
      }
      setTimeout(function() {  // We have to wait until the inline is added
        $('textarea.tinymce').each(function () {
          initTinyMCE($(this));
        });
      }, 0);
    }, true);
  });
}((typeof django === 'undefined' || typeof django.jQuery === 'undefined') && jQuery || django && django.jQuery));
