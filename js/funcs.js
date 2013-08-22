function renderTemplate(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
	$("#" + elmId).empty();
	$.tmpl("main", data).appendTo("#" + elmId);
}

function hidePage() {
	$(".page.active").hide("slide", {
		direction : "left"
	}, 400);
	var t = setTimeout(function() {
		$(".page.active").removeClass("active");
	}, 400);
}

function showPage(page) {
	hidePage();
	var t = setTimeout(function() {
		$(".page#" + page).show("slide", {
			direction : "left",
			easing : 'easeOutBack'
		}, 400).addClass("active");
	}, 400);
}

function getCategoryNews(cat) {
	$.ajax({
		type : "POST",
		dataType : "jsonp",
		url : "http://api.khabarfarsi.net/api/news/latest/1?tid=*&output=json",
		async : true,
		success : function(response) {
			var data = {};
			data.slides = {};
			data.news = {};

			var i = 0;
			for (var x in response.items) {
				if (i < 4) {
					data.slides[i] = response.items[x];
				} else {
					data.news[i - 4] = response.items[x];
				}
				i++;
			}

			console.log(data);
			renderTemplate("category", data, "category", 'showPage("category")');
			Cufon.refresh();
		}
	});
}
