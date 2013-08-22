function renderTemplate(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
	$("#" + elmId).empty();
	$.tmpl("main", data).appendTo("#" + elmId);
}

function hidePage() {
	$(".page").animate({"left":"-100%"},1000);
	/*
	$(".page.active").hide("slide", {
		direction : "left"
	}, 1000);
	var t = setTimeout(function() {
		$(".page.active").removeClass("active");
	}, 1000);
	*/
}

function showPage(page) {
	hidePage();
	$(".page#" + page).animate({"left":"0"},1000);
	/*
	var t = setTimeout(function() {
		$(".page#" + page).show("slide", {
			direction : "left",
			easing : 'easeOutBack'
		}, 1000).addClass("active");
	}, 1000);
	*/
}

function getCategoryNews(cat) {
	console.log("getCategoryNews");
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
				data.news[i] = response.items[x];
				i++;
			}
			//console.log(data);
			renderTemplate("category", data, "category");
			setTimeout(function(){
				showPage("category");
				Cufon.refresh();		
			},1000);

		}
	});
}
