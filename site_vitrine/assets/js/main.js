var team = [{img:"Floriane.jpg", current:false, punchline:"La motivation est la clé de la réussite, tout est possible à",punchline1:"qui rêve, ose, travaille et n'abandonne jamais."},
            {img:"Clement.jpg", current:false, punchline:"Clément"},
            {img:"Thomas.jpg", current:false, punchline:"je ne perds jamais. Soit je gagne, Soit j'apprends"},
            {img:"Joan.jpg", current:false, punchline:"Joan"},
            {img:"Adil.jpg", current:false, punchline:"Adil"},
            {img:"group.jpg", current:false, punchline:"La team"},
            {img:"Thibaut.jpg", current:true, punchline:"Je veux vivre d'amour et de mojitos"}];
var proj = [{url:"y2mate.com - presentation_projet_healthsafe_GTPTQEN4LO0_1080p.mp4", title:"<red>P</red>résentation projet <red>H</red>ealthSafe", current:true},
            {url:"y2mate.com - presentation_application_healthsafe_Pnr4CFogvcY_1080p.mp4", title:"<red>P</red>résentation application mobile", current:false}];

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
                    $('.' + location + '-slide .punch').text('').append('\"' + element.punchline + '<br/>');
                    $('.' + location + '-slide .punch').append(element.punchline1 + '\"');

                } else
                    $('.' + location + '-slide .punch').text('\"' + element.punchline + '\"');
                $('.more').addClass(element.img.split('.')[0]);
            }
        }
    });
}

function getNext(tab, action) {
    var idx = getIdx(tab);

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
    tab.length == 2 ? proj = tab : team = tab;
    setNext(tab.length == 2 ? "proj" : "team", tab.length == 2 ? proj : team);
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
        var idx = infos.infos_right.tool;
        for (let index = 0; index < idx.length; index++) {
            $('.tools_frameworks').append("<img src=\"assets/img/" + idx[index] + ".png\" alt=\"" + idx[index] + "\"/>");
        }
        idx = infos.infos_right.social_list;
        for (let index = 0; index < idx.length; index++) {
            switch (idx[index]) {
                case "linkedin":
                    $('.social').append("<a href=\"" + infos.infos_right.social.linkedin + "\"><img src=\"assets/img/linkedin.png\"/></a>");
                    break;
                case "instagram":
                    $('.social').append("<a href=\"" + infos.infos_right.social.instagram + "\"><img src=\"assets/img/instagram.png\"/></a>");
                    break;
                case "facebook":
                    $('.social').append("<a href=\"" + infos.infos_right.social.facebook + "\"><img src=\"assets/img/facebook.png\"/></a>");
                    break;
                case "github":
                    $('.social').append("<a href=\"" + infos.infos_right.social.github + "\"><img src=\"assets/img/github.png\"/></a>");
                    break;
                case "snapchat":
                    $('.social').append("<a href=\"" + infos.infos_right.social.snapchat + "\"><img src=\"assets/img/snapchat.png\"/></a>");
                    break;
            }
        }
        $('.destination').append(infos.infos_right.destination);
    }, "text");
    var tab = $(event.target).classList;
    $(event.target).removeClass('more').removeClass(tab[1]).addClass('less').addClass(tab[1]).html("voir moins...");
    $('.profile').css('display', 'flex');
}

function hideDesc(event) {
    $('.profile').html('').css('display', 'none');
    var tab = $(event.target).classList;
    $(event.target).removeClass('less').removeClass(tab[1]).addClass('more').addClass(tab[1]).html("voir plus...");
}

window.onload = function(page) {
    $('.switch-btn').click(function (e) {
        getNext($(e.target).hasClass('proj-btn') ? proj : team, $(e.target).hasClass('left') ? '-' : '+');
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
        topbar.css('background', 'linear-gradient(#0f76d9, white)');
        // topbar.css('background', 'linear-gradient(#0f76d9, #70b5f7)');
        // topbar.css('background-color', '#70b5f7');
        topbar.css('margin-top', '0');
        topbar.css('z-index', '1');
        topbar.css('justify-content', 'space-around');
        section.css('display', 'block');
        $('#topbar h2').css('color', 'white');
        $('#topbar h1').css('display', 'none');
        // $('.topbar a').css('color', 'black')
    }
    
    else if (document.body.scrollTop < 600)
    {
        topbar.css('position', 'absolute');
        topbar.css('background', 'transparent');
        // topbar.css('background-color', 'transparent');
        topbar.css('margin-top', '470px');
        section.css('display', 'none');
        $('#topbar h2').css('color', 'white');
        $('#topbar h1').css('display', 'block');
        // $('.topbar a').css('color', 'white')
    }
}