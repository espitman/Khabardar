<div id="catPage">
	<ul>
	{{each news}}
		<li data-web="${website_name}" data-link="${link}">
			{{if image[0]["url"]}}
			<img style='float:right;margin-left:10px;' src='${image[0]["url"]}' />
			{{else}}
			<div style="width:80px;height:60px;background:#CCC;float:right;margin-left:10px;"></div>
			{{/if}}			
			<span style="direction:rtl;" class="cufon cufon_yekan">${title}</span>
			<p>{{html teaser}}</p>
		</li>
	{{/each}}
	</ul>
</div>