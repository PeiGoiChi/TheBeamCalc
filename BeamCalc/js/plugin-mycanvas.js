(function ($) {
    var waku_w = 0.0;
    var waku_h = 0.0;
    var scale = new Number(1.0);

    /*
     *   座標変換(X)
     */
    function getX(x) {
        return waku_w / 2 + x * scale;
    }
    /*
     *   座標変換(Y)
     */
    function getY(y) {
        return waku_h / 2 - y * scale;
    }
    /*
     *   画面消去
     */
    $.fn.clearWaku = function () {
        var context = this.Begin();
        context.clearRect(0, 0, this[0].width, this[0].height);
        return this;
    };
    /*
     *   まるすうじ描画
     */
    $.fn.showMaruSuji = function (ball, fs) {
        var context = this.Begin();
        context.storokeStyle = "#696969";
        context.lineWidth = 1;
        context.fillStyle = fs;
        context.arc(getX(ball.p.x), getY(ball.p.y), ball.r, 0, Math.PI * 2.0, true);
        context.fill();
        context.fillStyle = "#FFFFFF";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(ball.n, getX(ball.p.x), getY(ball.p.y));
        return this;
    };
    /*
     *   まる描画
     */
    $.fn.showMaru = function (ball, fs) {
        var context = this.Begin();
        context.storokeStyle = "#696969";
        context.lineWidth = 1;
        context.fillStyle = fs;
        context.arc(getX(ball.p.x), getY(ball.p.y), ball.r, 0, Math.PI * 2.0, true);
        context.fill();
        context.stroke();
        return this;
    };
    /*
     *   ぼう描画：加速度線を表示する
     */
    $.fn.showBo = function (mono) {
        var context = this.Begin();
        context.storokeStyle = "#696969";
        context.lineWidth = 1;
        context.moveTo(getX(mono.p.x), getY(mono.p.y));
        context.lineTo(getX(mono.p.x + mono.a.x), getY(mono.p.y + mono.a.y));
        context.stroke();
        return this;
    };
    /*
     * 
     */
    $.fn.Begin = function () {
        waku_w = $(this).width();
        waku_h = $(this).height();
        //この場合のthisはjQueryオブジェクトなので、複数個デフォルトなので、[0]として、そのうちの最初のひとつのJavaScriptオブジェクトにする必要がある
        var canvas = this[0];
        var context = canvas.getContext("2d");
        return context;
    };
    /*
     * 
     */
    $.fn.End = function () {
    };
    /*
     * スケーリング対応済
     */
    $.fn.Arc = function (x1, y1, x2, y2, sa,ea,fs) {
        var context = this.Begin();
        context.storokeStyle = "#696969";
        context.lineWidth = 1;
        context.fillStyle = fs;
        var x = x1 + (x2 - x1) / 2;
        var y = y1 + (y2 - y1) / 2;
        var r = (getX(x2) - getX(x1)) / 2;
        context.arc(getX(x), getY(y), r, sa, ea, true);
        //context.fill();
        context.stroke();
    };
    /*
     * スケーリング対応済
     */
    $.fn.Rect = function (x1, y1, x2, y2) {
        var context = this.Begin();
        context.fillStyle = "#000000";
        context.storokeStyle = "#000000";
        context.lineWidth = 1;
        context.fillRect(getX(x1), getY(y1), getX(x2) - getX(x1), getY(y2) - getY(y1));
        context.strokeRect(getX(x1), getY(y1), getX(x2) - getX(x1), getY(y2) - getY(y1));
        return this;
    };
    /*
     * スケーリング対応済
     */
    $.fn.MoveTo = function (x, y) {
        var context = this.Begin();
        context.beginPath();
        context.moveTo(getX(x), getY(y));
        return this;
    };
    /*
     * スケーリング対応済
     */
    $.fn.LineTo = function (x, y,cl) {
        var context = this.Begin();
        //context.fillStyle = cl ? cl :"#000000";
        context.strokeStyle = cl ? cl:"#000000";
        context.lineWidth = 1;
        context.lineTo(getX(x), getY(y));
        context.stroke();
        return this;
    };
    /*
     * スケーリング対応済※位置のみ
     */
    $.fn.TextOut = function (x, y, msg,cl) {
        var context = this.Begin();
        context.font = "13px 'Consolas'";
        context.lineWidth = 1;
        context.fillStyle = cl?cl:"#000000";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(msg, getX(x), getY(y));
    };
    /*
     * スケーリング対応済※位置のみ
     */
    $.fn.TextOutBig = function (x, y, msg, cl) {
        var context = this.Begin();
        context.font = "16px 'Consolas'";
        context.lineWidth = 1;
        context.fillStyle = cl ? cl : "#000000";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(msg, getX(x)+12, getY(y));
    };
})(jQuery);