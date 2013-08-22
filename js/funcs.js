function renderTemplate(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
	$("#" + elmId).empty();
	$.tmpl("main", data).appendTo("#" + elmId);
}

function hidePage() {
	$(".page").animate({"left":"-100%"},600,'easeOutBack');
}

function showPage(page) {
	hidePage();
	$(".page#" + page).animate({"left":"0"},600,'easeOutBack');
}

function getCategoryNews(cat,tid) {
	console.log("getCategoryNews");
	$.ajax({
		type : "POST",
		dataType : "jsonp",
		url : "http://api.khabarfarsi.net/api/news/latest/1?tid="+tid+"&output=json",
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
			},600);
		}
	});
}
