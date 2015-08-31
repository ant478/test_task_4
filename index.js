$(document).ready(function () {  
  $(function() {
    $( ".price .slider" ).slider({
      range: true,
      min: 1332200,
      max: 19890000,
      values: [ 1332200, 19890000 ],
      slide: function( event, ui ) {
        var wraper = $(ui.handle).parent().parent();
        wraper.children(".min-price").val('От ' + ui.values[ 0 ]);
        wraper.children(".max-price").val('до ' + ui.values[ 1 ]);
      }
    });

    $( ".diagonal .slider" ).slider({
      range: true,
      min: 1,
      max: 5,
      values: [ 1, 5 ],
      slide: function( event, ui ) {
        var wraper = $(ui.handle).parent().parent();
        wraper.children(".min-price").val('От ' + ui.values[ 0 ]);
        wraper.children(".max-price").val('до ' + ui.values[ 1 ]);
      }
    });

    $( ".resolution .slider" ).slider({
      range: true,
      min: 1,
      max: 12,
      values: [ 1, 12 ],
      slide: function( event, ui ) {
        var wraper = $(ui.handle).parent().parent();
        wraper.children(".min-price").val('От ' + ui.values[ 0 ]);
        wraper.children(".max-price").val('до ' + ui.values[ 1 ]);
      }
    });

    function formatMoney (rawNumber) {
      var result = rawNumber;
      for (var i = rawNumber.length - 3; i > 0; i = i - 3) {
        result = result.substring(0, i) + ' ' + result.substring(i, result.length);
      }
      return result;
    };

    $('.product .price').each(function(){
      $(this).html(formatMoney($(this).html()));
    });

  });

  $('.aside-select .option').mousedown( function(event) {
    var option = $(this);
    var selected = $(this).parent().siblings('.selected-option');    
    selected.attr('value', option.html());
    selected.val(option.html());
    selected.attr('data-selected-index', option.attr('data-option-index'));
    selected.parent().find('.all-options').hide();

  });

  $('.selected-option').click( function(event) {
    $(this).siblings('.all-options').toggle();
  });

  $('.custom-select .option').click( function(event) {
    $(this).parent().parent().find('.selected-option').html($(this).html());
    $(this).parent().parent().find('.hidden-value').val($(this).attr('data-index'));
    $(this).parent().parent().find('.all-options').hide();
  });

});
