function renderTemplate(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
	$("#" + elmId).empty();
	$.tmpl("main", data).appendTo("#" + elmId);
}

function renderTemplateAppend(name, data, elmId, callback) {
	var markup = getMarkup(name, callback);
	$.template("main", markup);
	$.tmpl("main", data).appendTo("#" + elmId);
}

function getLinkParams(link) {
	var ret = {};
	link = str_replace("#", "", link);
	link = explode("?", link);
	ret["page"] = link[0];
	link = link[1];
	link = explode("&", link);
	for (var x in link) {
		tmp = explode("=", link[x]);
		ret[tmp[0]] = tmp[1];
	}
	return ret;
}

function showCategory(cid) {
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
			renderTemplate("category_news", data, "catPage-ul");
			$.mobile.loading('hide');
			iNav.push("home");
		}
	});
}

function updateCategory(cid, lastId) {
	//$.mobile.loading('show');
	$("#catPage-ul").append("<li id='in-load'>درحال دریافت اطلاعات</li>");
	$.ajax({
		type : "POST",
		data : {
			cid : cid,
			lastId : lastId
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
			renderTemplateAppend("category_news", data, "catPage-ul");
			$.mobile.loading('hide');
			iNav.push("home");
			startAutoUpdate = 0;
			//$.mobile.loading('hide');
			$("#in-load").remove();
			var cst = $(window).scrollTop();
			//$(window).scrollTop(cst+10);
			$('html').animate({scrollTop : (cst+200)},'slow');
			
			
		}
	});
}

function showNews(id) {
	var sct = $(window).scrollTop();
	$.ajax({
		type : "POST",
		data : {
			nid : id
		},
		dataType : "json",
		url : "http://eboard.ir/khabardar/khabardar/reader.php",
		async : true,
		success : function(response) {
			var i = 0;
			renderTemplate("news", response.item, "news_content", '$.mobile.changePage("#news",{ transition: "slide"});');
			$.mobile.loading('hide');
			iNav.push('category', sct);
		}
	});
}

function autoUpdate() {
	
	//$(window).scroll(function() {
	$(window).bind('scrollstop', function () {
		
		//alert($(window).scrollTop()+','+$(document).height()+','+$(window).height());
		
		var docHeight = parseInt($("#category_content").outerHeight())+parseInt($("#header").outerHeight());
		
		if ($(window).scrollTop() > 10) {
			if (docHeight > $(window).height()) {
				if ($(window).scrollTop() == docHeight - $(window).height()) {
					if (startAutoUpdate == 0) {
						startAutoUpdate = 1;
						 var hash = document.location.hash;
						 if(hash == "#category") {
						 	var id = $("#catPage ul li:last").attr("data-id");
						 	var cid = $("#catPage ul li:last").attr("data-cid");
						 	updateCategory(cid, id);
						 }
					}
				}
			}
		}
	});

}
