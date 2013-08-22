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
			renderTemplate("home", '', "home",'showPage("home")');
		} else if(func == "category") {
			getCategoryNews(parameters['cat']);
		}
		Cufon.refresh();
	});


	$("li").live("click", function() {
		var cat = $(this).attr("data-cat");
		window.location.hash = "category?cat="+cat;
	});
	
	
	$("img.lazy").lazyload({
		effect      : "fadeIn",
	});	

});
