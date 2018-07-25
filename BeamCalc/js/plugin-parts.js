(function ($) {
    /*
     *   固定端
     *   固定端の中心点p
     *   固定端の高さh
     *   固定端の斜線本数maxN
     */
    $.fn.fixedEdge = function (p, h, maxN) {
        var x = p.x;
        var y = p.y;
        $(this).MoveTo(x, y - h/2.0);
        $(this).LineTo(x, y + h/2.0);
        for (n = 0; n < maxN; ++n) {
            var dx = h / 2.0;
            var dy = -8 + n * h / 5.0;
            $(this).MoveTo(x, y +dy);
            $(this).LineTo(x + dx, y +dy+ 4);
        }
        return this;
    };
    /*
     *   X軸方向支点
     *   中心点p
     *   高さh
     *   種別k    true:移動支点、false:固定支点
     */
    $.fn.sitenX = function (p, h, k) {
        //支点の三角形の頂点
        var x = p.x;
        var y = p.y;
        //支点の三角形の左下点
        var x1 = x - h / 2.0;
        var y1 = y - h;
        //支点の三角形の右下点
        var x2 = x + h / 2.0;
        var y2 = y - h;
        $(this).MoveTo(x, y).LineTo(x1,y1).LineTo(x2,y2).LineTo(x, y);
        var ofs =k?2:0;
        $(this).MoveTo(x1 - 3, y1-ofs).LineTo(x2 +  3 , y1- ofs);
        return this;
    };
    /*
     *   X方向の寸法
     *   点p1,p2
     *   離れh
     */
    $.fn.sunpouX = function (p1, p2, h) {
        if (h / Math.abs(h) > 0) {
            //上側に表示
            y = Math.max(p1.y, p2.y) + h;
        } else {
            //下側に表示
            y = Math.min(p1.y, p2.y) + h;
        }
        $(this).MoveTo(p1.x, y).LineTo(p2.x, y);
        $(this).Arc(p1.x - 2, y + 2, p1.x+2, y - 2, 0.0, Math.PI * 2.0);
        $(this).Arc(p2.x - 2, y + 2, p2.x + 2, y - 2, 0.0, Math.PI * 2.0);
        //
        $(this).MoveTo(p1.x, y).LineTo(p1.x, p1.y + h*0.4);
        $(this).MoveTo(p2.x, y).LineTo(p2.x, p2.y + h * 0.4);
        $(this).MoveTo(p1.x, p1.y + h * 0.35).LineTo(p1.x, p1.y + h * 0.37);
        $(this).MoveTo(p2.x, p2.y + h * 0.35).LineTo(p2.x, p2.y + h * 0.37);
        return this;
    };
})(jQuery);