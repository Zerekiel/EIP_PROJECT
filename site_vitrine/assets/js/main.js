var team = [{img:"Thibaut.jpg", current:true, punchline:"Je veux vivre d'amour et de mojitos"},
            {img:"Floriane.jpg", current:false, punchline:"La motivation est la clé de la réussite, tout est possible à",punchline1:"qui rêve, ose, travaille et n'abandonne jamais."},
            {img:"Clement.jpg", current:false, punchline:"Clément"},
            {img:"Thomas.jpg", current:false, punchline:"je ne perds jamais. Soit je gagne, Soit j'apprends"},
            {img:"Joan.jpg", current:false, punchline:"Joan"},
            {img:"Adil.jpg", current:false, punchline:"Adil"},
            {img:"group.jpg", current:false, punchline:"La team"}];
var proj = [{url:"y2mate.com - presentation_projet_healthsafe_GTPTQEN4LO0_1080p.mp4", title:"<red>P</red>résentation projet <red>H</red>ealthSafe", current:true},
            {url:"y2mate.com - presentation_application_healthsafe_Pnr4CFogvcY_1080p.mp4", title:"<red>P</red>résentation application mobile", current:false},
            {url:"", title:"<red>P</red>résentation application web", current:false}];

function getIdx(tab) {
    for (let index = 0; index < tab.length; index++) {
        if (tab[index].current == true) {
            return index;
        }
    }
}

function setNext(location, tab) {
    tab.forEach(element => {
        if (element.current == true) {
            if (location == "proj") {
                $('.slide-title').html(element.title);
                var video = $('.proj-slide video')[0];
                video.src = "./assets/video/" + element.url;
                video.load();
                video.play();
            }
            else {
                $('.team-slide').css('background-image', 'url(\'./assets/img/team-pic/' + element.img + '\')')
                if (element.img.split('.')[0] == "Floriane") {
                    $('.' + location + '-slide #punch').text('').append('\"' + element.punchline + '<br/>');
                    $('.' + location + '-slide #punch').append(element.punchline1 + '\"');

                } else
                    $('.' + location + '-slide #punch').text('\"' + element.punchline + '\"');
                $('.more').addClass(element.img.split('.')[0]);
            }
        }
    });
}

function getNext(event, tab, action) {
    var idx = getIdx(tab);

    $('.' + event.target.classList[0] + '_' + idx).removeClass('current');
    if (tab.length > 3)
        $('.more').removeClass(tab[idx].img.split('.')[0]);
    if (action == '+') {
        if (idx < tab.length - 1) {
            tab[idx].current = false;
            tab[idx + 1].current = true;
        }
        else {
            tab[idx].current = false;
            tab[0].current = true;
        }
    }
    else {
        if (idx > 0) {
            tab[idx].current = false;
            tab[idx - 1].current = true;
        }
        else {
            tab[idx].current = false;
            tab[tab.length - 1].current = true;
        }
    }
    tab.length == 3 ? proj = tab : team = tab;
    $('.' + event.target.classList[0] + '_' + getIdx(tab.length == 3 ? proj : team)).addClass('current');
    setNext(tab.length == 3 ? "proj" : "team", tab.length == 3 ? proj : team);
}

function showDesc(event) {
    $.get('assets/files/profile.html', function (prof) {
        $('.profile').html("").append(prof);
    }, "text");
    $.get('assets/files/' + event.target.classList[1] + '.json', function (data) {            
        var infos = JSON.parse(data);
        $('.left-card img').attr('src', infos.img);
        $('.age').append(infos.infos_left.age);
        var idx = infos.infos_left;
        for (let index = 0; index < idx.hobby.length; index++) {
            index == idx.hobby.length - 1 ? $('.hobby').append(idx.hobby[index]) : $('.hobby').append(idx.hobby[index] + ', ');
        }
        idx = infos.infos_left.countries;
        for (let index = 0; index < idx.length; index++) {
            index == idx.length - 1 ? $('.country').append(idx[index]) : $('.country').append(idx[index] + ', ');
        }
        $('.role').append(infos.infos_left.role);
        var idx = infos.infos_right.languages;
        for (let index = 0; index < idx.length; index++) {
            $('.languages').append("<img src=\"assets/img/" + idx[index] + ".jpg\" alt=\"" + idx[index] + "\"/>");
        }
        var idx = infos.infos_right.management;
        for (let index = 0; index < idx.length; index++) {
            $('.management').append("<img src=\"assets/img/" + idx[index] + ".png\" alt=\"" + idx[index] + "\"/>");
        }
        var idx = infos.infos_right.softwares;
        for (let index = 0; index < idx.length; index++) {
            $('.softwares').append("<img src=\"assets/img/" + idx[index] + ".png\" alt=\"" + idx[index] + "\"/>");
        }
        var idx = infos.infos_right.dev_arch;
        for (let index = 0; index < idx.length; index++) {
            $('.dev_arch').append("<img src=\"assets/img/" + idx[index] + ".png\" alt=\"" + idx[index] + "\"/>");
        }
        idx = infos.infos_right.social_list;
        for (let index = 0; index < idx.length; index++) {
            switch (idx[index]) {
                case "linkedin":
                    $('.socials').append("<a href=\"" + infos.infos_right.social.linkedin + "\"><img src=\"assets/img/linkedin.png\"/></a>");
                    break;
                case "instagram":
                    $('.socials').append("<a href=\"" + infos.infos_right.social.instagram + "\"><img src=\"assets/img/instagram.png\"/></a>");
                    break;
                case "facebook":
                    $('.socials').append("<a href=\"" + infos.infos_right.social.facebook + "\"><img src=\"assets/img/facebook.png\"/></a>");
                    break;
                case "github":
                    $('.socials').append("<a href=\"" + infos.infos_right.social.github + "\"><img src=\"assets/img/github.png\"/></a>");
                    break;
                case "snapchat":
                    $('.socials').append("<a href=\"" + infos.infos_right.social.snapchat + "\"><img src=\"assets/img/snapchat.png\"/></a>");
                    break;
            }
        }
        $('.destination').append(infos.infos_right.destination);
    }, "text");
    $(event.target).addClass('less').removeClass(team[getIdx(team)].img.split('.')[0])
                   .removeClass('more').addClass(team[getIdx(team)].img.split('.')[0]).html("voir moins...");
    $('.profile').addClass('display');
}

function hideDesc(event) {
    $('.profile').removeClass('display');
    $(event.target).addClass('more').removeClass(team[getIdx(team)].img.split('.')[0])
                   .removeClass('less').addClass(team[getIdx(team)].img.split('.')[0]).html("voir plus...");
}

function init(event) {
    var idx = parseInt($(event.target)[0].classList[1].split('_')[1]);
    console.log("next: " + idx);
    var current = getIdx($(event.target)[0].classList[0].split('-')[0] == "team" ? team : proj);
    console.log("current: " + current);
    if ($(event.target).hasClass('current') == false) {
        $('.' + event.target.classList[1].split('_')[0] + '_' + current).removeClass('current');
        $(event.target).addClass('current');
        $(event.target).hasClass('proj-btn') ? proj[current].current = false : team[current].current = false;
        $(event.target).hasClass('proj-btn') ? proj[idx].current = true : team[idx].current = true;
        setNext($(event.target).hasClass('proj-btn') ? "proj" : "team", $(event.target).hasClass('proj-btn') ? proj : team);
    }
}

window.onload = function(page) {
    for (let index = 0; index < team.length; index++) {
        var html = index === 0 
        ? "<a class=\"team-btn team-btn_" + index + " current\"></a>"
        : "<a class=\"team-btn team-btn_" + index + "\"></a>";
        $('.team-picture_index div').append(html);
    }
    for (let index = 0; index < proj.length; index++) {
        var html = index === 0 
        ? "<a class=\"proj-btn proj-btn_" + index + " current\"></a>"
        : "<a class=\"proj-btn proj-btn_" + index + "\"></a>";
        $('.proj-picture_index div').append(html);
    }
    $('.picture_index div a').click(function (e) {
        init(e);
    })
    $('.switch-btn').click(function (e) {
        getNext(e, $(e.target).hasClass('proj-btn') ? proj : team, $(e.target).hasClass('left') ? '-' : '+');
        $('.profile').removeClass('display');
        $('.team-slide #more').removeClass().addClass('more').addClass(team[getIdx(team)].img.split('.')[0]).html("voir plus...")
    });
    $('.team-slide span').click(function (e) {
        $(event.target).hasClass('more') ? showDesc(e) : $(event.target).hasClass('less') ? hideDesc(e) : exit;
    });
    $('form').submit(function (e) {
        console.log(e.target);
    })    
}

window.onscroll = function topbarScroll() {
    var topbar = $('#topbar');
    var section = $(".section-accessor");

    if (document.body.scrollTop >= 600 || document.documentElement.scrollTop >= 600)
    {
        topbar.css('position', 'fixed');
        topbar.css('background', 'linear-gradient(to bottom, #ff1c4e,#ff8985)');
        topbar.css('margin-top', '0');
        topbar.css('z-index', '1');
        topbar.css('justify-content', 'space-around');
        section.css('display', 'block');
        $('fb').css('text-shadow', '1px 1px 0 white, 1px -1px 0 white, -1px -1px 0 white, -1px 1px 0 white, 1px 0px 0 white, 1px 0px 0 white, -1px 0px 0 white, -1px 0px 0 white, 0px 1px 0 white, 0px -1px 0 white, 0px -1px 0 white, 0px 1px 0 white, 0px 0px 0 white, 0px 0px 0 white, 0px 0px 0 white, 0px 0px 0 white, 0 0 0 white')
        $('#topbar h2').css('color', 'white');
        $('#topbar h1').css('display', 'none');
    }
    
    else if (document.body.scrollTop < 600)
    {
        topbar.css('position', 'absolute');
        topbar.css('background', 'transparent');
        topbar.css('margin-top', '350px');
        section.css('display', 'none');
        $('fb').css('text-shadow', 'none')
        $('#topbar h2').css('color', 'white');
        $('#topbar h1').css('display', 'block');
    }
}

// function generateFontBorder(size, color) {
//         @maxi: @stroke + 1;
//         .i-loop (@i) when (@i > 0) {
//           @maxj: @stroke + 1;
//           .j-loop (@j) when (@j > 0) {
//             text-shadow+: (@i - 1)*(1px)  (@j - 1)*(1px) 0 @color;
//             text-shadow+: (@i - 1)*(1px)  (@j - 1)*(-1px) 0 @color;
//             text-shadow+: (@i - 1)*(-1px)  (@j - 1)*(-1px) 0 @color;
//             text-shadow+: (@i - 1)*(-1px)  (@j - 1)*(1px) 0 @color;
//             .j-loop(@j - 1);
//           }
//           .j-loop (0) {}
//           .j-loop(@maxj);
//           .i-loop(@i - 1);
//         }
//         .i-loop (0) {}
//         .i-loop(@maxi);
//         text-shadow+: 0 0 0 @color;
// }