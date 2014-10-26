/**
 * Created by HoangVu.
 */
$(document).ready(function() {
    //Preview image before upload image
    function readUrl(input,classShow) {
        if(input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#'+classShow).css('background-image','url('+ e.target.result +')');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#manga-preview-image').change(function() {
       readUrl(this,'prev_thumb_660');
    });

    $('#manga-poster-image').change(function() {
        readUrl(this,'prev_thumb_330');
    });

    //Add chapter -- new line and edit,delete

});
