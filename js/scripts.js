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
		cid = params["tid"];
		$.ajax({
			type : "POST",
			data : {
				cid : cid
			},
			dataType : "json",
			url : "http://eboard.ir/khabardar/khabardar/reader.php",
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
	} else if (params["page"] == "news") {
		var id = params["id"];
		showNews(id);
	}
});

$('#goHome').live('click', function(e) {
	$.mobile.loading('show');
	$.mobile.changePage("", {
		transition : "slide"
	});
}); 