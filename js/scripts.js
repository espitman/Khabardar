Cufon.replace('.cufon_yekan', {
	fontFamily : 'Yekan',
	onBeforeReplace : Bifon.convert
});

$(document).ready(function() {

	$.history.init(function(hash) {
		hash = explode("?", hash);
		var func = hash[0];
		var params = hash[1];
		var parameters = {};
		params = explode("&", params);
		for (var x in params) {
			var tmp = explode("=", params[x]);
			parameters[tmp[0]] = tmp[1];
		}		
		
		if (func == "home" || func == "") {
			startLoading();
			renderTemplate("home", '', "home",'showPage("home")');
		} else if(func == "category") {
			startLoading();
			getCategoryNews(parameters['cat'],parameters['tid']);
		}
		Cufon.refresh();
	});


	$(".menu li").live("click", function() {
		var cat = $(this).attr("data-cat");
		var tid = $(this).attr("data-tid");
		window.location.hash = "category?cat="+cat+"&tid="+tid;
	});
	
	$("#goHome").live("click", function() {
		window.location.hash = "";
	});

});
