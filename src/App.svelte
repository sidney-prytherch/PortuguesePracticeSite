<script>
	export let name;
</script>

<link
	href="https://fonts.googleapis.com/css?family=UnifrakturCook:700"
	rel="stylesheet"
/>

<body>
	<div id="container">
		<div id="topbar">
			<h1 class="title">The Bilingual Times</h1>
			<!-- Content of the first div -->
		</div>
		<div id="second-div">
			<h3>Lorem Ipsum</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nulla eget urna iaculis viverra sed cursus mauris. Sed pharetra leo id blandit venenatis. Nulla facilisi. Donec molestie vulputate magna, sit amet scelerisque tellus lacinia sit amet. Mauris eget vehicula ante, quis ullamcorper leo. Maecenas porta ullamcorper ligula eu semper. Duis nec imperdiet libero. Donec sollicitudin congue lacinia. Nullam eu tellus eu odio sodales pulvinar. Proin porta a nisl vitae aliquam. Quisque et velit a tellus bibendum placerat. Morbi nec sodales lacus. Fusce quis mattis tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget libero nisi. Vestibulum enim nisl, molestie eu volutpat vel, vestibulum in sapien.</p>
			<p>Nulla luctus maximus leo vehicula luctus. Etiam vitae sagittis risus. Aliquam mi ex, facilisis quis fermentum in, dapibus vitae risus. Nulla id felis iaculis nisl dapibus finibus sit amet consequat ipsum. Suspendisse odio nisi, bibendum a est sed, interdum pretium sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur lacus lacus, pulvinar ut arcu quis, placerat porta sem. Maecenas id aliquam dui. Sed porta neque vel quam cursus suscipit vel et risus. Morbi tellus sapien, gravida sit amet diam a, porta interdum dui. Phasellus eleifend nec dolor vel commodo. Fusce a arcu et nibh pulvinar sodales. Aenean sed pretium dolor. Ut ligula tortor, convallis non mauris quis, convallis suscipit velit. Morbi neque est, porttitor sit amet malesuada id, tempus eu nibh.			</p>
		<p>Vivamus in mollis augue. Etiam feugiat eleifend libero eu ultrices. Proin auctor lacinia blandit. Nunc a ante erat. Morbi libero nibh, molestie id blandit vitae, sodales sed massa. Curabitur nec leo dignissim, facilisis turpis eu, condimentum risus. Phasellus sit amet magna blandit, dapibus neque sed, posuere justo. Nam malesuada felis nec nisl eleifend aliquam. Etiam aliquet iaculis neque, ut ornare sapien tempus id. Fusce malesuada, lacus sit amet tristique dignissim, dolor odio rhoncus lacus, eget varius leo mi vitae mi. Sed quis massa venenatis, porttitor magna vitae, faucibus dui. Proin id purus sed magna tempus tempor ut ultrices dui. Curabitur consequat pharetra nisl, ac eleifend velit laoreet et. Quisque nec imperdiet elit. Nulla sed scelerisque nunc. Proin sed iaculis est, ac lobortis libero.</p>
		<p>Praesent consectetur nisi eget dui interdum viverra. Vivamus ut imperdiet tortor. Fusce sit amet ex sem. Duis egestas lectus urna, vitae vulputate felis aliquet accumsan. In hac habitasse platea dictumst. Donec ut lacus dignissim, accumsan nibh vitae, efficitur tortor. Nulla condimentum lorem at elit fermentum, a mollis purus convallis. Suspendisse luctus mauris eu pretium sollicitudin. In pharetra neque at odio hendrerit, eget eleifend turpis lacinia. Praesent vehicula lacus et congue commodo.</p>
		<p>Praesent ullamcorper eleifend dapibus. Curabitur mi ex, rutrum eget nibh quis, maximus fermentum magna. Nulla vitae purus molestie, molestie purus vitae, commodo mauris. Duis eleifend augue et commodo dictum. Mauris eget nulla mattis, commodo massa eget, suscipit velit. Nam pulvinar egestas ipsum malesuada ultrices. Sed vel nulla sed lectus gravida mattis in et quam. Aenean vestibulum blandit tellus condimentum iaculis. Curabitur eget ipsum vel sem mattis efficitur ac vitae neque. Sed elementum est quis sagittis suscipit. Nullam porttitor eu odio vel interdum. Suspendisse velit sem, faucibus in est vitae, bibendum semper sem. Fusce vitae blandit risus. Pellentesque id ante non nibh fringilla scelerisque scelerisque in est.</p>
		
		</div>
	</div>
</body>

<style>
	#container {
		display: flex;
		flex-direction: column; /* Stack divs vertically */
	}

	.title {
		font-family: "UnifrakturCook";
		margin: 0 auto; /* Horizontally center the text */
	}

	h1 {
		font-size: 4rem;
	}

	div.content {
		padding: 1px 16px;
		overflow-y: auto; /* Enable vertical scrolling */
		height: calc(
			100vh - var(--topbar-height, 0px)
		); /* Set height to fill remaining viewport height */
	}

	@media screen and (max-width: 700px) {
		div.content {
			margin-left: 0;
		}
	}

	@media screen and (max-width: 400px) {
		.sidebar a {
			text-align: center;
			float: none;
		}
	}
</style>
