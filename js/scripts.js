$(document).on('pageinit', function() {

	iNav = new navigation;
	renderTemplate("home", '', "home_content");
	startAutoUpdate = 0;


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
	if (back.func == "home") {
		$.mobile.changePage("", {
			transition : "slide"
		});
	} else if (back.func == "category") {
		showCategory(back.params);
	} else if (back.func == "news") {
		showNews(back.params);
	}
});

