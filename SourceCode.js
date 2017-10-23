<script>
!function(a){a.Flader=function(b,c){var d={btns_classe:"",wrap_classe:"",slide_type:"slide",fixe_height:!1,speed:500,easing:"",mouse_event:"click",cycling_slide:!0,auto_slide:!1,auto_slide_delay:5e3,onSlide:function(){}},e=this;e.settings={};var g,h,i,j,k,l,m,n,o,f=a(b),b=b,p=!1,q=["slide","fade"],r=!1;e.init=function(){function o(){r=!1}e.settings=a.extend({},d,c),a.support.transition&&void 0!==a.fn.transition||(a.fn.transition=a.fn.animate),~a.inArray(e.settings.slide_type,q)||(e.settings.slide_type="slide"),e.settings.cycling_slide||"slide"!=e.settings.slide_type||(e.settings.auto_slide=!1),k=a('[data-function="slider_content"]',f).length?a('[data-function="slider_content"]',f):a("<div/>",{"data-function":"slider_content"}),l=a('[data-function="slider_item"]',f).addClass("slider_item"),g=a("<div/>",{"class":"slider_wrap"}),i=a("<button/>",{"class":"slider_nav left"}).addClass(e.settings.btns_classe).on(e.settings.mouse_event,function(){t("prev")}),j=a("<button/>",{"class":"slider_nav right"}).addClass(e.settings.btns_classe).on(e.settings.mouse_event,function(){t("next")}),k.addClass("slider_content"),f.append(g.append(k.append(l))),l.length>1&&f.append(g.append(i,j)),m=l.filter(".active"),(!m.length||m.length>1)&&(m=l.removeClass("active").first().addClass("active")),e.settings.cycling_slide||(h=null,0===m.index()&&(h=i.addClass("hide")),m.index()===l.length-1&&(h=j.addClass("hide")));var b=maxWidth=0,n=m.index();a.each(l,function(c){b=Math.max(b,a(this).outerHeight()),"slide"==e.settings.slide_type&&a(this).css({left:100.05*(c-n)+"%"})}),e.settings.fixe_height&&f.height(b),"mousehold"===e.settings.mouse_event&&(e.settings.easing="linear",i.on({mousedown:function(){r=!0,a(this).trigger("mousehold")},"mouseout mouseup":o}),j.on({mousedown:function(){r=!0,a(this).trigger("mousehold")},"mouseout mouseup":o})),f.addClass(e.settings.slide_type+" slider_container"),e.settings.auto_slide&&s()};var s=function(){o=setTimeout(function(){t()},e.settings.auto_slide_delay)},t=function(b){if(!p){void 0===b&&(b="next"),void 0!==o&&clearTimeout(o),m=l.filter(".active"),n=m[b]().length?m[b]():l.filter("next"===b?":first":":last");var c={current:m,follow:n};p=!0,a.when("fade"===e.settings.slide_type?u():v(b),e.settings.onSlide(c)).done(function(){m.removeClass("active"),p=!1,r&&t(b),e.settings.auto_slide&&!r&&s()})}},u=function(){return n.addClass("active").css({opacity:0,"z-index":20}).transition({opacity:1,duration:e.settings.speed,easing:e.settings.easing},function(){m.css({opacity:"0"}),n.css({"z-index":""})})},v=function(b){n.addClass("active"),n["next"===b?"before":"after"](m),l=a('[data-function="slider_item"]',f);var c=l.filter(m).index(),d=l.filter(n).index();return e.settings.cycling_slide||(null!==h&&h.removeClass("hide"),h=null,0===d&&(h=i.addClass("hide")),d===l.length-1&&(h=j.addClass("hide"))),l.each(function(b){a(this).css({left:100.05*(b-c)+"%"}).transition({left:100.05*(b-d)+"%",duration:e.settings.speed,easing:e.settings.easing})})};e.init()},a.fn.Flader=function(b){return this.each(function(){if(void 0==a(this).data("Flader")){var c=new a.Flader(this,b);a(this).data("Flader",c)}})}}(jQuery);

/* INITIALISE */
$('.fader').Flader({
	  slide_type: 'fade',
	  auto_slide: true
});
$('.slider_finite').Flader({
     fixe_height: true,
	  cycling_slide: false
});
$('.slider_infinite').Flader({
	  mouse_event: 'mousehold'
});



/*twitch*/
// Global variables
let usernames = ["Latt11B", "GettyTA", "Badgers801", "KingslyAG", "AgentInCommand", "elvencedor49", "rockovereesh", ];
let cb = '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?';
let url = "https://api.twitch.tv/kraken/";

// Loop for each username
  usernames.forEach(function(channel) {
    function makeURL(type, name) {
      return url + type + "/" + name + cb;
    };
    $.getJSON(makeURL("streams", channel), function(data) {
      let game,
      status;
      if(data.stream === null) {
        game = "Offline";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(makeURL("channels", channel), function(data) {
          var logo = data.logo != null ? data.logo : "images/twitch-favicon.png",
            name = data.display_name != null ? data.display_name : channel,
            description = status === "online" ? ": " + data.status : "";
            var html = '<div class="row channel ' + status + '"><div class="col-xs-2 col-sm-3" id="icon"><img src="' + logo + '" class="logo"></div><div class="col-xs-10 col-sm-8 name" id="name"><a href="' + data.url + '" target="_blank">' + name + '</a></div><div class="col-xs-10 col-sm-8 game" id="streaming">' + game + '<span class="hidden-xs">' + description + '</span></div></div>';
          status === "online" ? $("#users").prepend(html) : $("#users").append(html);
      });
    });
  });

// On Load
$(document).ready(function() {

  // Active Status Box
  $(" .square").click(function() {
    var category = $(this).attr("id");
    var button = $(".square");

    // & Hide Streams (Status)
    if(category === "all") {
      button.removeClass("active");
      $("#all").addClass("active");
      $(".online, .offline").removeClass("hidden");
    } else if(category === "online") {
      button.removeClass("active");
      $("#online").addClass("active");
      $(".offline").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else if (category === "offline") {
      button.removeClass("active");
      $("#offline").addClass("hidden");
      $(".offline").removeClass("active");
      $(".online").addClass("hidden");
    }
  });
});

/***relocated teams scoreboard images****/
$('a>span:contains("CHO")').replaceWith('<img src="http://i1178.photobucket.com/albums/x364/garza21lions/since%202-17/cho_zpsohepgyem.png" width="20" height="16""> CHI</span>');
$('a>span:contains("MEX")').replaceWith('<img src="http://i1178.photobucket.com/albums/x364/garza21lions/since%202-17/mexicocity2_zpsajzp0hck.png" width="20" height="16""> MEX</span>');


/**STANDINGS: RELOCATED TEAMS***/
$('.data-table1 td:contains("Blues")').prepend('<img src="http://www.daddyleagues.com/img/nfl/teams/left/143.png" width="25" height="21" border="0" alt="Team logo" class="teamLogo">').addClass("cho");
$('.data-table1 td:contains("Conquistadors")').prepend('<img src="http://www.daddyleagues.com/img/nfl/teams/left/148.png" width="25" height="21" border="0" alt="Team logo" class="teamLogo">').addClass("mex");


/***GOW HOME TEAMS***/
$('.gameoftheweek .ng-scope').wrapInner('<div class="record"></div>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/0.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">chicago</div><span class="chi gowh">bears</span><span class="home use">JustinTime952</span>');

$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/143.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">chicago</div><span class="cho gowh">blues</span><span class="home use">GamerTag</span>');
	
$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/1.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team ">Cincinnati</div><span class="cin gowh">bengals</span><span class="home use">TrigggaTrev9</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/2.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team ">buffalo</div><span class="but gowh">bills</span><span class="home use">UrMomsEngineer</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/3.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">denver</div><span class="den gowh">broncos</span><span class="home use">TheViciousFew</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/4.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">Cleveland</div><span class="cle gowh">browns</span><span class="home use">TomBradysBallz</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/5.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">tampa bay</div><span class="tb gowh">buccaneers</span><span class="home use">CPU</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/6.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">arizona</div><span class="ari gowh">cardinals</span><span class="home use">WigglyEmu17033</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/7.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">Los Angeles</div><span class="sd gowh">chargers</span><span class="home use">AgentInCommand</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/8.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">Kansas City</div><span class="kc gowh">Chiefs</span><span class="home use">Staticfear24</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/9.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">Indianapolis</div><span class="ind gowh">colts</span><span class="home use">NJ 89 bdub</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/10.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">dallas</div><span class="dal gowh">cowboys</span><span class="home use">ElVencedor49</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/11.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">miami</div><span class="mia gowh">dolphins</span><span class="home use">Jlizzle4shizzle</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/12.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">philadelphia</div><span class="phi gowh">eagles</span><span class="home use">FRIG0FF69</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/13.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">atlanta</div><span class="atl gowh">falcons</span></span><span class="home use">BlazingGecko405</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/14.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">San Francisco</div><span class="sf gowh">49ers</span><span class="home use">Buttermeelk</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/15.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">new york</div><span class="nyg gowh">giants</span><span class="home use">toddsgladjo77</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/16.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">Jacksonville</div><span class="jac gowh">Jaguars</span><span class="home use">Flems506</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/17.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">new york</div><span class="nyj gowh">jets</span><span class="home use">xGraber</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/18.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">Detroit</div><span class="det gowh">Lions</span><span class="home use">Jordan 23 Goat6</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/19.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class=" home team">green bay</div><span class="gb gowh">packers</span><span class="home use">N0rth5TARR</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/20.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">carolina</div><span class="car gowh">panthers</span><span class="home use">bennybackwoods</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/21.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">new england</div><span class="ne gowh">patriots</span><span class="home use">l bruins l</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/22.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">oakland</div><span class="oak gowh">raiders</span><span class="home use">JBdaDude</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/23.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">Los Angeles</div><span class="stl gowh">rams</span><span class="home use">Agent 00000000</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/24.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">baltimore</div><span class="bal gowh">ravens</span><span class="home use">JohFloorWalker</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/25.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">washington</div><span class="was gowh">redskins</span><span class="home use">Crankguined3737</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/26.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">new orleans</div><span class="no gowh">saints</span><span class="home use">Teriyaki Boss</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/27.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">seattle</div><span class="sea gowh">seahawks</span><span class="home use">bluemyself1</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/28.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">pittsburgh</div><span class="pit gowh">steelers</span><span class="home use">XRAMBOonROIDSX</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/29.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">tennessee</div><span class="ten gowh">titans</span><span class="home use">thebigZ33</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/30.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">minnesota</div><span class="min gowh">vikings</span><span class="home use">Kingsly AG</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/right/31.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="home team">houston</div><span class="hou gowh">texans</span><span class="home use">AceOfCircles</span>');

	
/***GOW Vistor teams***/
	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/0.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">chicago</div><span class="chi-away gowa ">bears</span><span class="away use">JustinTime952</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/143.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">chicago</div><span class="cho-away gowa ">blues</span><span class="away use">GamerTag</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/1.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Cincinnati</div><span class="cin-away gowa">bengals</span><span class="away use">TrigggaTrev9</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/2.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">buffalo</div><span class="buf-away gowa">bills</span><span class="away use">UrMomsEngineer</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/3.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">denver</div><span class="den-away gowa">broncos</span><span class="away use">TheViciousFew</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/4.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Cleveland</div><span class="cle-away gowa">browns</span><span class="away use">TomBradysBallz</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/5.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">tampa bay</div><span class="tb-away gowa">buccaneers</span><span class="away use">CPU</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/6.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">arizona</div><span class="ari-away gowa">cardinals</span><span class="away use">WigglyEmu17033</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/7.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Los Angeles</div><span class="sd-away gowa">chargers</span><span class="away use">AgentInCommand</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/8.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Kansas City</div><span class="kc-away gowa">Chiefs</span><span class="away use">Staticfear24</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/9.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Indianapolis</div><span class="ind-away gowa">colts</span><span class="away use">NJ 89 BDUB</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/10.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Dallas</div><span class="dal-away gowa gowa">Cowboys</span><span class="away use">ElVencedor49</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/11.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Miami</div><span class="mia-away gowa">Dolphins</span><span class="away use">Jlizzle4shizzle</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/12.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">philadelphia</div><span class="phi-away gowa">eagles</span><span class="away use">FRIG0FF69</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/13.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team ">Atlanta</div><span class="atl-away gowa">Falcons</span></span><span class="away use">BlazingGecko405</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/14.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">San Francisco</div><span class="sf-away gowa">49ers</span><span class="away use">Buttermeelk</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/15.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">new york</div><span class="nyg-away gowa">giants</span><span class="away use">toddsgladjo77</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/16.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team ">Jacksonville</div><span class="jac-away gowa">Jaguars</span><span class="away use"> Flems506</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/17.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">new york</div><span class="nyj-away gowa">jets</span><span class="away use">xGraber</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/18.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Detroit</div><span class="det-away gowa">Lions</span><span class="away use">Jordan 23 Goat6</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/19.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">green bay</div><span class="gb-away gowa">packers</span><span class="away use">N0rth5TARR</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/20.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Carolina</div><span class="car-away gowa">Panthers</span><span class="away use">bennybackwoods</span>');

      $('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/21.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">new england</div><span class="ne-away gowa">patriots</span><span class="away use">l bruins l</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/22.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">oakland</div><span class="oak-away gowa">raiders</span><span class="away use">JBdaDude</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/23.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Los Angeles</div><span class="stl-away gowa">rams</span><span class="away use">Agent 00000000</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/24.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">baltimore</div><span class="bal-away gowa">ravens</span><span class="away use">JohFloorWalker</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/25.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">washington</div><span class="was-away gowa">redskins</span><span class="away use">Crankguined3737</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/26.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">new orleans</div><span class="no-away gowa">saints</span><span class="away use">Teriyaki Boss</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/27.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">seattle</div><span class="sea-away gowa">seahawks</span><span class="away use">bluemyself1</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/28.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Pittsburgh</div><span class="pit-away gowa">Steelers</span><span class="away use">XRAMBOonROIDSX</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/29.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Tennessee</div><span class="ten-away gowa">Titans</span><span class="away use">thebigZ33</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/30.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">minnesota</div><span class="min-away gowa">vikings</span><span class="away use">Kingsly AG</span>');

	$('.gameoftheweek .ng-scope[style*="/img/nfl/teams/left/31.png"]').attr( "style", "" ).css( 'background-image', 'url("")').prepend('<div class="away team">Houston</div><span class="hou-away gowa">Texans</span><span class="away use">AceOfCircles</span>');

</script>
