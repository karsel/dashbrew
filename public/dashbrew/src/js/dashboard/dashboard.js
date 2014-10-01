;(function ($, window, document, undefined) {

  // Initiate sidebar
  $(document).ready(function(){
    var minwidth = 992,
        $toggler = $('#toggle-sidebar'),
        $wrapper = $('#page-wrapper');

    $toggler.click(function () {
      $wrapper.toggleClass('active');
      if($wrapper.hasClass('active'))
        $wrapper.data('sb-active', '1');
      else
        $wrapper.removeData('sb-active');
    });

    if($wrapper.hasClass('active'))
      $wrapper.data('sb-active', '1');

    var $res = function () {
      if($(window).width() <= minwidth)
        $wrapper.removeClass('active');
      else
        $wrapper.data('sb-active') && !$wrapper.hasClass('active') && $wrapper.addClass('active');
    };

    $res();
    $(window).resize($res);
  });

  function Widget(el, options) {

    var defaults = {
      title: '',
      url: '',
      class: 'medium'
    };

    var $opts = $.extend( {}, defaults, options);
    var $el  = $(el);

    $el.addClass('widget');
    $el.html('<div class="widget-header">' + $opts.title + ' \
                <button class="btn btn-sm btn-default pull-right"> \
                  <span class="glyphicon glyphicon-refresh"></span> \
                </button> \
              </div> \
              <div class="widget-body ' + $opts.class + '"> \
                <div class="data"></div>\
                <div class="loading"> \
                   <div class="double-bounce1"></div> \
                   <div class="double-bounce2"></div> \
                </div> \
              </div>');

    var $elBody = $el.children('.widget-body'),
        $elData = $elBody.children('.data'),
        $elLoading = $elBody.children('.loading');

    var $load = function (url){
      $.ajax({
        url: url || $opts.url,
        type: 'GET',
        dataType: 'html',
        beforeSend: function(xhr, settings) {
          $elData.html("");
          $elLoading.show();
        },
        success: function(data, textStatus, xhr) {
          $elData.html(data);
        },
        error: function(xhr, textStatus, errorThrown) {
          $elData.html(errorThrown);
        },
        complete: function(xhr, textStatus) {
          $elLoading.hide();
        }
      });
    };

    $load();

    $el.children('.widget-header').children('button').click(function(){
      $load();
    });
  }

  $.fn.widget = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'widget')) {
        $.data(this, 'widget', new Widget( this, options ));
      }
    });
  };

  $.switchListItemExtra = function (el){
    $el = $(el);
    $el.siblings().not($el).removeClass('active');
    $el.toggleClass('active');
  };

})(jQuery, window, document);