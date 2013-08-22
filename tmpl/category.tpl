<div id="catPage">
	<div id="catSlider">
		<ul>
		{{each slides}}
			<li>
				<img style='' src='${image[0]["url"]}' />
				<span class="cufon cufon_yekan">${title}</span>
			</li>
		{{/each}}
		</ul>
	</div>
	
	<ul>
	{{each news}}
		<li>
			<img style='' src='${image[0]["url"]}' />
			<span class="cufon cufon_yekan">${title}</span>
		</li>
	{{/each}}
	</ul>
</div>