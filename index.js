$(document).ready(function () {  
  $(function() {

    $( ".price .min-value" ).val('От ' + formatMoney(1332200)).attr('data-value', 1332200).attr('data-border', 1332200);
    $( ".price .max-value" ).val('до ' + formatMoney(19890000)).attr('data-value', 19890000).attr('data-border', 19890000);
    $( ".price .slider" ).slider({
      range: true,
      min: 1332200,
      max: 19890000,
      values: [ 1332200, 19890000 ],
      slide: function( event, ui ) {
        var wraper = $(ui.handle).parent().parent();
        wraper.children(".min-value").val('От ' + formatMoney(ui.values[ 0 ])).attr('data-value', ui.values[ 0 ]);
        wraper.children(".max-value").val('до ' + formatMoney(ui.values[ 1 ])).attr('data-value', ui.values[ 1 ]);
      }
    });

    $( ".diagonal .min-value" ).val('От ' + formatMoney(1)).attr('data-value', 1).attr('data-border', 1);
    $( ".diagonal .max-value" ).val('до ' + formatMoney(5)).attr('data-value',  5).attr('data-border', 5);
    $( ".diagonal .slider" ).slider({
      range: true,
      min: 1,
      max: 5,
      values: [ 1, 5 ],
      slide: function( event, ui ) {
        var wraper = $(ui.handle).parent().parent();
        wraper.children(".min-value").val('От ' + formatMoney(ui.values[ 0 ])).attr('data-value', ui.values[ 0 ]);
        wraper.children(".max-value").val('до ' + formatMoney(ui.values[ 1 ])).attr('data-value', ui.values[ 1 ]);
      }
    });

    $( ".resolution .min-value" ).val('От ' + formatMoney(1)).attr('data-value', 1).attr('data-border', 1);
    $( ".resolution .max-value" ).val('до ' + formatMoney(12)).attr('data-value', 12).attr('data-border', 12);
    $( ".resolution .slider" ).slider({
      range: true,
      min: 1,
      max: 12,
      values: [ 1, 12 ],
      slide: function( event, ui ) {
        var wraper = $(ui.handle).parent().parent();
        wraper.children(".min-value").val('От ' + formatMoney(ui.values[ 0 ])).attr('data-value', ui.values[ 0 ]);
        wraper.children(".max-value").val('до ' + formatMoney(ui.values[ 1 ])).attr('data-value', ui.values[ 1 ]);
      }
    });

    $('.product .price').each(function(){
      $(this).html(formatMoney($(this).html()));
    });

  });

  function formatMoney (rawNumber) {
    var result = rawNumber.toString();
    var length = result.length;
    for (var i = length - 3; i > 0; i = i - 3) {
      result = result.substring(0, i) + ' ' + result.substring(i, result.length);
    }
    return result;
  };

  function validateInput(e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || // Allow: backspace, delete, tab, escape, enter and .           
      ($.inArray(e.keyCode, [65]) !== -1 && ( e.ctrlKey === true || e.metaKey === true ) ) || // Allow: Ctrl+A, Command+A           
      (e.keyCode >= 35 && e.keyCode <= 40)) { // Allow: home, end, left, right, down, up               
         return; // let it happen, don't do anything
    }      
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) { // Ensure that it is a number and stop the keypress
      e.preventDefault();
    }
  }

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

  $('.aside-range-slider .value').focus(function(event){
    $(this).val('');
  });

  $('.aside-range-slider .value').blur(function(event){
    var newValue = $(this).val();
    var formattedValue = formatMoney(newValue);
    var minValue = parseInt($(this).parent().children('.min-value').attr('data-border'));
    var maxValue = parseInt($(this).parent().children('.max-value').attr('data-border'));
    var range = maxValue - minValue;
    var currentLeftValue = parseInt($(this).parent().children('.min-value').attr('data-value'));
    var currentRightValue = parseInt($(this).parent().children('.max-value').attr('data-value'));
    var slider = $(this).parent().children('.slider');
    var leftDot = $(slider.children('.ui-slider-handle')[0]);
    var rightDot = $(slider.children('.ui-slider-handle')[1]);
    var sliderLine = slider.children('.ui-slider-range');

    if ($(this).hasClass('min-value')) {
      if ((newValue >= minValue) && (newValue <= currentRightValue)) {
        $(this).val('От ' + formattedValue).attr('data-value', newValue);
        var newLeft = (newValue - minValue) / range * 100;
        var newWidth = (currentRightValue - newValue) / range * 100;
        sliderLine.css('left', newLeft + '%').css('width', newWidth + '%');
        leftDot.css('left', newLeft + '%');
      } else {
        $(this).val('От ' + currentLeftValue).attr('data-value', currentLeftValue);
      }
    } else {
      if ((newValue >= currentLeftValue) && (newValue <= maxValue)) {
        $(this).val('до ' + formattedValue).attr('data-value', newValue);
        var newLeft = (newValue - minValue) / range * 100;
        var newWidth = (newValue - currentLeftValue) / range * 100;
        sliderLine.css('width', newWidth + '%');
        rightDot.css('left', newLeft + '%');
      } else {
        $(this).val('до ' + currentRightValue).attr('data-value', currentRightValue);
      }
    }
  });

  $(".aside-range-slider .value").keydown(function (e) {
      validateInput(e);
  });
});
