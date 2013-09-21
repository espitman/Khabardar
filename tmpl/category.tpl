<div id="catPage">
	<ul>
	{{each news}}
		<li>
			<a href="#news?id=${id}">
				{{if image}}
					<img style='float:right;margin-left:10px;max-height:80px;width:80px;' src='http://eboard.ir/khabardar/khabardar/temporary/${source}/${image}' />
				{{else}}
				<div style="width:80px;height:60px;background:#CCC;float:right;margin-left:10px;"></div>
				{{/if}}			
				<span style="direction:rtl;" class="cufon cufon_yekan">${title}</span>
				<p>{{html teaser}}</p>
			</a>
		</li>
	{{/each}}
	</ul>
</div>