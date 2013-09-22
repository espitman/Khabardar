 document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
    var element = document.getElementById('home');

    element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
                        'Device PhoneGap: ' + device.phonegap + '<br />' + 
                        'Device Platform: ' + device.platform + '<br />' + 
                        'Device UUID: '     + device.uuid     + '<br />' + 
                        'Device Version: '  + device.version  + '<br />';
}

$(document).on('pageinit', function() {
	iNav = new navigation;
	renderTemplate("home", '', "home_content");
	startAutoUpdate = 0;
});

$( document ).on( "pageshow", function( event, ui ) {
  autoUpdate();
});

$('a').live('click', function(e) {
	e.stopPropagation();
	e.preventDefault();
	//alert(window.location);

	$.mobile.loading('show');
	var href = $(this).attr("href");
	var params = getLinkParams(href);
	if (params["page"] == "category") {
		cid = params["tid"];
		showCategory(cid);
	} else if (params["page"] == "news") {
		var id = params["id"];
		showNews(id);
	}
});

$('#goHome').live('click', function(e) {
	$.mobile.loading('show');
	var back = iNav.pop();
	if (!back || back.func == "home") {
		$.mobile.changePage("", {
			transition : "slide"
		});
	} else if (back.func == "category") {
		//showCategory(back.params);
		$.mobile.changePage("#category", {
			transition : "slide",
			reverse : false,
			changeHash : true
		});

	} else if (back.func == "news") {
		showNews(back.params);
	}
});

