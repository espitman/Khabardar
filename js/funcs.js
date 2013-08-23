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
	setTimeout(function(){
		stoptLoading();
	},600);
}

function getCategoryNews(cat,tid) {
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
			renderTemplate("category", data, "category");
			setTimeout(function(){
				showPage("category");
				Cufon.refresh();						
			},600);
		}
	});
}

function startLoading() {
	var h = $(window).height();
	$("html").css({"overflow-y":"hidden"});
	$("#loading-blocker").css("height", h + "px").show();
	$("#loading").show();
}

function stoptLoading() {
	var t= setTimeout(function(){
		$("html, body").animate({
			scrollTop : 0
		}, 500);
		$("#loading-blocker").hide();
		$("#loading").hide();
		$("html").css({"overflow-y":"auto"});
	},600);
}