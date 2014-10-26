/**
 * Created by HoangVu on 10/4/2014.
 */
var chapterIndex = 0;
jQuery(document).ready(function() {
    var chapterWrapper = '.chapter-item-wrapper';
    var chapterRow = '.chapter-item-data';
    var rowTemplate = '';

    var addRow = function () {
        jQuery(chapterWrapper).append(rowTemplate);
        console.log('Added new row');
        //Setup a new row
        autoAddRow();
    }

    var autoAddRow = function() {
        var blankRowDetected = 0;
        var lastNumber = 0;
        var lastPart = -1;

        jQuery(chapterRow).each(function() {
            var set = jQuery(this).attr('data-set');
            var numberObj = jQuery(this).find('.chapter-item-number')[0];
            var chapterObj = jQuery(this).find('.chapter-item-name')[0];
            var btnDelObj = jQuery(this).find('.chapter-item-delete')[0];

            if(typeof numberObj == 'undefined') {
                console.error('Not Found .chapter-item-number');
                console.log(this);
                return false;
            }

            if(typeof chapterObj == 'undefined') {
                console.error('Not Found .chapter-item-name');
                console.log(this);
                return false;
            }

            var chapterNumber = jQuery.trim(jQuery(numberObj).val());
            var chapterName = jQuery.trim(jQuery(chapterObj).val());

            if(chapterNumber == '' && chapterName == '') {
                blankRowDetected = 1;
                console.log('Find a empty row');
                //console.log(this);
            }
            if(chapterNumber) {
                lastNumber = parseInt(chapterNumber);
            }
            //if this row not set
            if(typeof set == 'undefined' || jQuery.trim(set) == "") {
                if(!rowTemplate) {
                    rowTemplate = jQuery(this)[0].outerHTML;
                }
                jQuery(numberObj).keydown(function(e) {
                   if(e.keyCode<48 || e.keyCode>57 && (e.keyCode<96 || e.keyCode>105) && e.keyCode!=13 && e.keyCode!=8 && e.keyCode!=9 && e.keyCode!=46 && e.keyCode!=0) {
                        return false;
                    }
                });
                jQuery(chapterObj).change(autoAddRow);
                jQuery(chapterObj).focus(function() {
                    jQuery(this).select();
                });
                jQuery(this).attr('data-set',1);
                jQuery(btnDelObj).click(function() {
                   jQuery(jQuery(this).parents(chapterRow)[0]).fadeOut('fast',function() {
                       jQuery(this).remove();
                   });
                });
            }
        });
        if(!blankRowDetected) {
            console.log('Not found a empty row');
            jQuery(chapterWrapper).append(rowTemplate);
            //setup for row
            autoAddRow();
            //generate auto number
            var lastRowObj = jQuery(chapterRow + ':last-child')[0];
            if(lastRowObj != 'undefined') {
                var newNumber = lastNumber + 1;
                jQuery(lastRowObj).find('.chapter-item-number').val(newNumber);
                jQuery(lastRowObj).find('.chapter-item-name').select();
            }
        }
    }
    jQuery('.btn-chapter-add').click(function() {
        addRow();
    });
    autoAddRow();

    //Edit/Delete Chapter
    jQuery('.list-data .edit').click(function() {
        jQuery(this).parent().parent().find('input,select').prop('disabled',false);
        jQuery(this).parent().parent().find('input[type=file]').removeClass('hidden');
        jQuery(this).parent().parent().find('.btn-for-view').css('display','none');
        jQuery(this).parent().parent().find('.btn-for-edit').css('display','inline-block');
        return false;
    });
    jQuery('.list-data .btn-cancel').click(function(){
        jQuery(this).parents('form')[0].reset();
        jQuery(this).parents('form').find('input,select').prop('disabled',true);

        //jQuery(this).parents('form').find('.download-subtitle').removeClass('hidden');
        jQuery(this).parents('form').find('input[type=file]').addClass('hidden');

        jQuery(this).parents('form').find('.btn-for-view').css('display','inline-block');
        jQuery(this).parents('form').find('.btn-for-edit').css('display','none');
        return false;
    });
});
