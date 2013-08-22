<div id="catPage">
	<ul>
	{{each news}}
		<li>
			{{if image[0]["url"]}}
			<img style='float:right;margin-left:10px;' src='${image[0]["url"]}' />
			{{else}}
			<div style="width:80px;height:60px;background:#CCC;float:right;margin-left:10px;"></div>
			{{/if}}			
			<span class="cufon cufon_yekan">${title}</span>
			<p>${teaser}</p>
		</li>
	{{/each}}
	</ul>
</div>