//
//  BeamCalc
//
//  Created by PeiGoiChi on 2018/07/04.
//  Copyright (c) 2018 PeiGoiChi. All rights reserved.
//

var waku_w = 550;
var waku_h = 750;

/*
 *   諸設定
 */
var SitenKozo = {
    skNONE: 0,
    skIDOU: 1,
    skKAIT: 2,
    skKOTE: 3
};
var Type = new Number(-1);
var Distributed_Load_A_0 = new Number(8.0);   //[kN/m]
var Length_AB_0 = new Number(6.0);            //[m]
var Distributed_Load_B_0 = new Number(8.0);   //[kN/m]
var Distributed_Load_A = Distributed_Load_A_0;
var Length_AB = Length_AB_0;
var Distributed_Load_B = Distributed_Load_B_0;
/*
 *   
 */
function Get_W_Pos() {
    var result = 0.0;
    if (Distributed_Load_A !== 0.0
        || Distributed_Load_B !== 0.0) {
        if (Distributed_Load_A < Distributed_Load_B) {
            result = Length_AB * (2.0 - Distributed_Load_A / (Distributed_Load_A + Distributed_Load_B)) / 3.0;
        } else {
            result = Length_AB * (1.0 + Distributed_Load_B / (Distributed_Load_A + Distributed_Load_B)) / 3.0;
        }
    }
    return result;
}
/*
 *
 */
function Get_W_Len() {
    return (Distributed_Load_A + Distributed_Load_B) * Length_AB / 2.0;
}
/*
 *  部材を描画する
 */
function Buzai_X(id,x0, y0, ll) {
    var x1 = x0 + ll;
    var y1 = y0 + 2;
    $(id+' > .layer0').Rect(x0, y0-1,x1,y1);
}
/*
 *  支点を描画する
 */
function Siten_X(id,x0, y0, msg, p_SK) {
    if (p_SK === SitenKozo.skNONE) {
        //empty
    }
    if (p_SK === SitenKozo.skIDOU
        || p_SK === SitenKozo.skKAIT) {
        $(id + ' > .layer0').sitenX({ x: x0, y: y0 }, 10, p_SK === SitenKozo.skIDOU);
    }
    if (p_SK === SitenKozo.skKOTE) {
        $(id + ' > .layer0').fixedEdge({ x: x0, y: y0 },20,4);
    }
    var kOfs = 1.2;
    $(id + ' > .layer0').TextOut(x0 - 14*kOfs - 1, y0 - 1 - 12*kOfs, msg);
}
/*
 *  作用線を描画する
 */
function Arrow_Y(id, x0, y0, ofs, num) {
    var ll = Math.abs(ofs);
    var y1 = ll > 20 ? y0 - ofs : y0 - ll*20/ofs;
    $(id + ' > .layer0').TextOutBig(x0+40, y1, "W=" + num.toFixed(2) + "[kN]");
    $(id + ' > .layer0').MoveTo(x0, y0 - ofs).LineTo(x0, y0);
    $(id +' > .layer0').MoveTo(x0, y0).LineTo(x0 - 3, y0 - 10*ofs/ll);
    $(id + ' > .layer0').MoveTo(x0, y0).LineTo(x0 + 3, y0 - 10 * ofs / ll);
}
/*
 *  寸法線を描画する
 */
function Dimension_X(id,x0, x1, y0, ofs, num) {
    $(id + ' > .layer0').sunpouX({ x: x0, y: y0 }, { x: x1, y: y0 }, ofs);
    $(id + ' > .layer0').TextOutBig(x0 + (x1 - x0) * .5, y0 + ofs * 1.2, num.toFixed(2) + "[m]");
}
/*
 *
 */
function Moment_Y(id,x0, y0, ofs, num) {
    x0 += 5;
    $(id + ' > .layer0').MoveTo(x0, y0 - ofs);
    $(id + ' > .layer0').Arc(x0 - ofs, y0 + ofs, x0 + ofs,y0 - ofs, Math.PI / 2.0, -Math.PI / 2.0);
    $(id + ' > .layer0').MoveTo(x0, y0 - ofs).LineTo(x0 + 4, y0 - ofs + 8);
    $(id + ' > .layer0').MoveTo(x0, y0 - ofs).LineTo(x0 + 5, y0 - ofs - 5);
    $(id + ' > .layer0').TextOutBig(x0 + ofs * 6, y0, num.toFixed(2) + "[Nm]");
}
/*
 *
 */
function UpdateBeam1(id) {
    var ll = new Number(300.0);
    var x0 = -ll/2.0;
    var y0 = new Number(0.0);
    Buzai_X(id,x0, y0, ll);
    //
    var W = Get_W_Len();
    if (Type === -1) {
        Siten_X(id,x0, y0, "A", SitenKozo.skNONE);
        Siten_X(id,x0 + ll, y0, "B", SitenKozo.skNONE);
    }
    if (Type === 0) {
        Siten_X(id,x0, y0, "A", SitenKozo.skNONE);
        Siten_X(id,x0 + ll, y0, "B", SitenKozo.skKOTE);
    }
    var kW = 5.0;
    if (Type === 1) {
        Siten_X(id,x0, y0, "A", SitenKozo.skKAIT);
        Siten_X(id, x0 + ll, y0, "B", SitenKozo.skIDOU);
        var W1 = W * Get_W_Pos() / Length_AB;
        var W2 = W - W1;
    }
    var y0_ofs = new Number(100.0);
    Dimension_X(id, x0, x0 + ll, y0, y0 - y0_ofs, Length_AB);
    //
    var cl = "#7777aa";
    var w1 = Distributed_Load_A * 30.0;
    var w2 = Distributed_Load_B * 30.0;
    $(id+' > .layer0').TextOut(x0 - 60, y0 + w1 / 2 + 6, Distributed_Load_A.toFixed(2) + "[kN/m]", cl);
    $(id+' > .layer0').TextOut(x0 + ll + 60, y0 + w2 / 2 + 6, Distributed_Load_B.toFixed(2) + "[kN/m]", cl);
    var max_n = 20;
    for (n = 0; n < max_n; ++n) {
        $(id +' > .layer0').MoveTo(x0 + n * ll / (max_n - 1), y0);
        $(id +' > .layer0').LineTo(x0 + n * ll / (max_n - 1), y0 + n * (w2 - w1) / (max_n - 1) + w1, cl);
    }
    $(id +' > .layer0').MoveTo(x0, y0 + w1);
    $(id +' > .layer0').LineTo(x0 + ll, y0 + w2,cl);
}
/*
 *
 */
function UpdateBeam2(id) {
    var ll = new Number(300.0);
    var x0 = -ll / 2.0;
    var y0 = new Number(0.0);
    //
    var W = Get_W_Len();
    if (Type === 0) {
        if (W !== 0.0) {
            Moment_Y(id, x0 + ll, y0, 10, W * (Length_AB - Get_W_Pos()));
        }
    }
    var kW = 5.0;
    if (Type === 1) {
        var W1 = W * Get_W_Pos() / Length_AB;
        var W2 = W - W1;
        if (W !== 0.0) {
            Arrow_Y(id, x0, y0, W2 * kW, Math.abs(W2));
            Arrow_Y(id, x0 + ll, y0, W1 * kW, Math.abs(W1));
        }
    }
    var y0_ofs = new Number(100.0);
    //
    var cl = "#7777aa";
    var w1 = Distributed_Load_A * 30.0;
    var w2 = Distributed_Load_B * 30.0;
    //
    var y1_ofs = 100.0;
    var Wx = 0.0;
    if (Length_AB !== 0.0) {
        Wx = Get_W_Pos() * ll / Length_AB;
    }
    //
    Buzai_X(id, x0, y0, ll);
    //
    Siten_X(id, x0, y0, "A", SitenKozo.skNONE);
    Siten_X(id, x0 + ll, y0, "B", SitenKozo.skNONE);
    var x1 = x0 + Wx;
    if (W !== 0.0) {
        //
        Arrow_Y(id, x1, y0, -W * kW, Math.abs(W));
        //
        Dimension_X(id, x0, x1, y0 + W * kW, y0 + y1_ofs, Get_W_Pos());
    }
}
/*
 *
 */
function chgType() {
    Type = (Type + 1) % 2;
    flgDirty = true;
}
function setType(typ) {
    Type = typ;
    flgDirty = true;
}
/*
 *  設定(長さAB)
 */
function setLen(inVal) {
    Length_AB = inVal;
    flgDirty = true;
}
/*
 *  設定(荷重A)
 */
function setWA(inVal) {
    Distributed_Load_A = inVal;
    flgDirty = true;
}
/*
 *  設定(荷重B)
 */
function setWB(inVal) {
    Distributed_Load_B = inVal;
    flgDirty = true;
}
/*
 *  スライダー表示
 */
function sliderOn(flg,id,val) {
    //スライド量の調整値
    var kk = 100;
    if (flg) {
        $(id).slider({
            min: 0,
            max: val * kk,
            value: val * kk
        });
        $(id).show();

    } else {
        $(id).hide();
    }
}
/*
 *   Tick   
 */
var flgDirty = true;
function Tick() {
    if (flgDirty) {
        $('#waku1 > .layer0').clearWaku();
        $('#waku2 > .layer0').clearWaku();
        UpdateBeam1('#waku1');
        UpdateBeam2('#waku2');
        flgDirty = false;
    }
}
/*
 *      
 */
function initWaku(id, ofs) {
    $(id).width(waku_w).height(waku_h).css('position', 'relative');
    [0].forEach(function (val) {
        $('<canvas/>').draggable().addClass("layer" + new String(val)).prop('width', waku_w).prop('height', waku_h).css('position', 'absolute').css('top', ofs).css('left', 0).css('background-color', 'transparent').appendTo(id);
    });
}
/*
 *  スタート    
 */
$(function () {
    var ofs = 0;
    initWaku('#waku1',ofs);
    initWaku('#waku2', ofs);
    $("#waku3").draggable();
    //
    chgType();
    $("#buhin1").prop("width", 20).prop("height", 40).fixedEdge({ x: 0, y: 0 }, 20, 4);
    $("#buhin2").prop("width", 20).prop("height", 40).sitenX({ x: 0, y:0 }, 10, true);
    //タイマー起動
    var timerId = setInterval(Tick, new Number(160));
    //切替え(移動端⇔固定端)
    $(document).on('click', "#tp2", function () {
        setType(1);
    });
    $(document).on('click', "#tp1", function () {
        setType(0);
    });
    //デフォルト値の設定ボタン
    $(document).on('click', "#setDefault", function () {
        $("#p1").val(Distributed_Load_A_0.toFixed(2)).css("text-align", "right");
        $("#p2").val(Length_AB_0.toFixed(2)).css("text-align", "right");
        $("#p3").val(Distributed_Load_B_0.toFixed(2)).css("text-align", "right");
        setLen(Length_AB_0);
        sliderOn(true, "#ab", Length_AB_0);
        setWA(Distributed_Load_A_0);
        sliderOn(true, "#wa", Distributed_Load_A_0);
        setWB(Distributed_Load_B_0);
        sliderOn(true, "#wb", Distributed_Load_B_0);
    });
    //スライド量の調整値
    var kk = 100;
    //長さAB:パラメータ入力欄
    $("#p2").val(Length_AB_0.toFixed(2)).css("text-align","right");
    $("#p2").blur(function () {
        setLen(new Number($(this).val()));
        sliderOn(true, "#ab", Length_AB);
     }).keypress(function (e) {
        if (e.which == 13) {
            setLen(new Number($(this).val()));
            sliderOn(true, "#ab", Length_AB);
            return false;
        }
    });
    //長さAB:スライダー
    $("#ab").width(100).slider({
        orientation: "horizontal",
        range:"min",
        min: 0,
        max: Length_AB_0 * kk,
        value: Length_AB * kk,
        step: 1,
        slide: function (event, ui) {
            setLen(Number(ui.value) / kk);
        }
    });
    //荷重A
    $("#p1").val(Distributed_Load_A_0.toFixed(2)).css("text-align", "right");
    $("#p1").blur(function () {
        setWA(new Number($(this).val()));
        sliderOn(true, "#wa", Distributed_Load_A);
    }).keypress(function (e) {
        if (e.which == 13) {
            setWA(new Number($(this).val()));
            sliderOn(true, "#wa", Distributed_Load_A);
            return false;
        }
    });
    $("#wa").width(100).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: Distributed_Load_A_0 * kk,
        value: Distributed_Load_A * kk,
        step: 1,
        slide: function (event, ui) {
            setWA(Number(ui.value) / kk);
        }
    });
    //荷重B
    $("#p3").val(Distributed_Load_B_0.toFixed(2)).css("text-align", "right");
    $("#p3").blur(function () {
        setWB(new Number($(this).val()));
        sliderOn(true, "#wb", Distributed_Load_B);
    }).keypress(function (e) {
        if (e.which == 13) {
            setWB(new Number($(this).val()));
            sliderOn(true, "#wb", Distributed_Load_B);
            return false;
        }
    });
    $("#wb").width(100).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: Distributed_Load_B_0 * kk,
        value: Distributed_Load_B * kk,
        step: 1,
        slide: function (event, ui) {
            setWB(Number(ui.value) / kk);
        }
    });
});