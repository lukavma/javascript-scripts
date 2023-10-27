/*******************QUICBAR ENTRY*************
// name         Attack Organizer with colors
// version      3.0
// author       fmthemaster, Mau Maria (V3.0)
// author       PhilipsNostrum and Kirgonix (V2.0)
// author       Diogo Rocha and Bernas (V1.0)
//Runs in [screen=overview, screeen=place, screen=commands&mode=incomings]
var font_size = 8;
var attack_layout = 'column'; //Possible layouts: 'column', 'line', 'nothing'

//{Number: ['Command name', 'button name', 'button color', 'text color']}
var settings= {0:['[Dead]','D', 'green', 'white'], 1:['[Support]','S', 'lime', 'white'], 2:['[Dodged]','D!', 'orange', 'white'], 3:['[Dodge]','D', 'dorange', 'white'], 4:['[Reconquered]','R!', 'gray', 'white'], 5:['[Reconquer]','R', 'white', 'black'], 6:['[Sniped]','S!', 'lblue', 'black'], 7:['[Snipe]','S', 'blue', 'white'], 8:['[toFUBR]','F', 'black', 'white'], 9:['[FUBRdone]','F!', 'white', 'black'], 10:['[Fake]','Fk', 'pink', 'black'], 11:[' | Stay Alert','A!', 'yellow', 'black']};

//{ColorName: ['theme color 1', 'theme color 2']}
var colors = {'red':['#e20606', '#b70707'], 'green':['#31c908', '#228c05'], 'blue':['#0d83dd', '#0860a3'], 'yellow':['#ffd91c', '#e8c30d'], 'orange':['#ef8b10', '#d3790a'], 'lblue':['#22e5db', '#0cd3c9'], 'lime':['#ffd400', '#ffd400'], 'white':['#ffffff', '#dbdbdb'], 'black':['#000000', '#2b2b2b'], 'gray':['#adb6c6', '#828891'], 'dorange':['#ff0000', '#ff0000'], 'pink':['#ff69b4', '#ff69b4']}
$.getScript('https://gitcdn.xyz/cdn/filipemiguel97/076df367a5f0f3272abc90136749c121/raw/AttackRenamerColors.js')
****************************************/
/******************PROGRAM CODE*********/
var countapikey = "renameAttacksColors";
hitCountApi();
function hitCountApi(){
    $.getJSON(`https://api.countapi.xyz/hit/fmthemasterScripts/${countapikey}`, function(response) {
        console.log(`This script has been run ${response.value} times`);
    });
}

function checkColors(color)
{
    if(!colors[color])
    {
        console.log("Please create settings for the color", color);
        throw("error");
    }
}

checkColors("red");
checkColors("yellow");
checkColors("white");
checkColors("black");

let buttonNames = $.map(settings, (obj)=> obj[0]);
let buttonIcons = $.map(settings, (obj)=> obj[1]);
let buttonColors = $.map(settings, (obj)=> obj[2]);
let buttonTextColors = $.map(settings, (obj)=> obj[3]);

function iT(nr, line) {
    var html = '';
    if (buttonNames) 
        html += '<span style="float: right;">';
    buttonIcons.forEach(function(nome, num) {
        html += '<button type="button" id="opt' + nr + '_' + num + '" class="btn" title="' + buttonNames[num] + '" style="color: ' + getFon(num) + '; font-size: ' + getSize() + 'px !important; background: linear-gradient(to bottom, ' + getTop(num) + ' 30%, ' + getBot(num) + ' 10%)">' + nome + '</button>';
    })
    html += '</span>';
    $(line).find('.quickedit-content').append(html);
    buttonNames.forEach(function(nome, num) {
        if (nome.indexOf('|') == -1) {
            $('#opt' + nr + '_' + num).click(function() {
                $(line).find('.rename-icon').click();
                $(line).find('input[type=text]').val($(line).find('input[type=text]').val().split(" ")[0] + ' ' + buttonNames[num]);
                $(line).find('input[type=button]').click();
                iT(nr, line);
            });
        } else if (nome.indexOf('|')) {
            $('#opt' + nr + '_' + num).click(function() {
                $(line).find('.rename-icon').click();
                $(line).find('input[type=text]').val($(line).find('input[type=text]').val() + buttonNames[num]);
                $(line).find('input[type=button]').click();
                iT(nr, line);
            });
        }
    });
}

function getTop(num) {
    if (buttonColors[num]) {
        if(colors[buttonColors[num]])
            return colors[buttonColors[num]][0];
    } else {
        return '#b69471';
    }
}

function getBot(num) {
    if (buttonColors[num]) {
        if(colors[buttonColors[num]])
            return colors[buttonColors[num]][1];
    } else {
        return '#6c4d2d';
    }
}

function getFon(num) {
    if (buttonTextColors[num]) {
        if(colors[buttonTextColors[num]])
            return colors[buttonTextColors[num]][0];
    } else {
        return '#ffffff';
    }
}

function getSize() {
    if (font_size) return font_size;
    else return 12;
}

if (location.href.indexOf("screen=overview_villages") == -1 && location.href.indexOf("mode=incomings&subtype=attacks") == -1) {
    $('#commands_incomings .command-row').each(function(nr, line) {
        if (!isSupport(line)) iT(nr, line, true);
    });
} else {
    $('#incomings_table tr.nowrap').each(function(nr, line) {
        if (!isSupport(line)) {
            var name = $.trim($(line).find('.quickedit-label').text())
            var code = buttonNames.indexOf(name.indexOf(" ") >= 0 ? name.substr(name.indexOf(" ") + 1) : name)
            var dual = check(name)
            var codes = []
            codes[0] = check(name, 1);
            codes[1] = check(name, 2);
            if (code != -1) {
                var colorcode = buttonColors[code]
                var color = colors[colorcode][1]
                if(!color)
                    color = '#6c4d2d';
                if (attack_layout === 'line') {
                    $(line).find('td').each(function(nr, td) {
                        $(td).attr('style', 'background: ' + color + ' !important;')
                    })
                } else if (attack_layout === 'column') {
                    $(line).find('td:eq(0)').attr('style', 'background: ' + color + ' !important;')
                    $(line).find('a:eq(0)').attr('style', 'color: white !important; text-shadow:-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;')
                }
            } else if (dual) {
                console.log(codes, nr)
                var colorcode1 = buttonColors[codes[0]]
                var colorcode2 = buttonColors[codes[1]]
                var color1 = colors[colorcode1][0]
                if(!color1)
                    color1 = '#6c4d2d';
                var color2 = colors[colorcode2][0]
                if(!color2)
                    color2 = '#6c4d2d';
                var textcolor = colors['white'][0]
                var strokecolor = colors['black'][0]
                if (attack_layout === 'line') {
                    $(line).find('td').each(function(nr, td) {
                        $(td).attr('style', 'background: repeating-linear-gradient(45deg, ' + color1 + ', ' + color1 + ' 10px, ' + color2 + ' 10px, ' + color2 + ' 20px) !important;')
                    })
                } else if (attack_layout === 'column') {
                    $(line).find('td:eq(0)').attr('style', 'background: repeating-linear-gradient(45deg, ' + color1 + ', ' + color1 + ' 10px, ' + color2 + ' 10px, ' + color2 + ' 20px) !important;')
                    $(line).find('a:eq(0)').attr('style', 'color: ' + textcolor + ' !important; text-shadow:-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;')
                }
            } else {
                if (attack_layout === 'line') {
                    $(line).find('td').each(function(nr, td) {
                        $(td).attr('style', 'background: ' + colors['red'][1] + ' !important;')
                    })
                    $(line).find('a').each(function(nr, td) {
                        $(td).attr('style', 'color: ' + colors['white'][1] + ' !important;')
                    })
                } else if (attack_layout === 'column') {
                    $(line).find('td:eq(0)').attr('style', 'background: ' + colors['red'][1] + ' !important;')
                    $(line).find('a:eq(0)').attr('style', 'color: white !important; text-shadow:-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;')
                }
            }
        } else {
            if (attack_layout === 'line') {
                $(line).find('td').each(function(nr, td) {
                    $(td).attr('style', 'background: ' + colors['yellow'][1] + ' !important;')
                })
                $(line).find('a').each(function(nr, td) {
                    $(td).attr('style', 'color: ' + colors['white'][1] + ' !important;')
                })
            } else if (attack_layout === 'column') {
                $(line).find('td:eq(0)').attr('style', 'background: ' + colors['yellow'][1] + ' !important;')
                $(line).find('a:eq(0)').attr('style', 'color: white !important; text-shadow:-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;')
            }
        }
    })
}

function check(name, nr) {
    var i, j;
    for (i = 0; i < buttonNames.length; i++) {
        for (j = 0; j < buttonNames.length; j++) {
            if (name.indexOf(buttonNames[i] + buttonNames[j]) != -1) {
                if (nr == 1) return i;
                else if (nr == 2) return j;
                else return true;
            }
        }
    }
    return false;
}

function isSupport(line) {
    var scr = $(line).find('img:eq(0)').attr('src')
    if (scr.indexOf('support') >= 0) return true;
    return false;
}
