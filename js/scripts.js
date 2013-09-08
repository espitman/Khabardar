$(document).on('pageinit', function() {
	renderTemplate("home", '', "home_content");
});



$('a').live('click', function(e) {
	e.stopPropagation();
	e.preventDefault();

	$.mobile.loading('show');

	var href = $(this).attr("href");
	var params = getLinkParams(href);
	if (params["page"] == "category") {
		cat = params["cat"];
		tid = params["tid"];

		$.ajax({
			type : "POST",
			dataType : "jsonp",
			url : "http://api.khabarfarsi.net/api/news/latest/1?tid=" + tid + "&output=json",
			async : true,
			success : function(response) {
				var data = {};
				data.slides = {};
				data.news = {};

				var i = 0;
				for (var x in response.items) {
					data.news[i] = response.items[x];
					i++;
				}
				renderTemplate("category", data, "category_content", '$.mobile.changePage("#category",{ transition: "slide"});');
			}
		});

	}
});

$('#goHome').live('click', function(e) {
	$.mobile.loading('show');
	$.mobile.changePage("", {
		transition : "slide"
	});
}); 