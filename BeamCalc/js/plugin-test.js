(function ($) {
    $.fn.seikeiStr = function (keta, num) {
        this.text((Array(keta + 1).join(' ') + Math.round(num).toString()).slice(-keta));
        return this;
    };
})(jQuery);