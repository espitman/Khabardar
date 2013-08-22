function renderTemplate(name,data,elmId) {
	var markup = getMarkup(name);
	$.template("main", markup);
	$.tmpl("main", data).appendTo("#"+elmId);
}
