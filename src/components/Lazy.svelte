<script>
 import penguin from 'static/penguin.png' // case 1, imported in script
</script>

<style>
 .elephant {
   width: 50px;
   height: 50px;
   background-image: url("static/elephant.png"); /* case 2, referenced in css url */
 }
</style>
<h1>Image with imported src</h1>
<img alt="penguin" src={penguin}>
<h1>Div with css background</h1>
<div class="elephant"></div>
<h1>Image with static src</h1>
<img alt="cat" src="static/cat.png"/> <!-- case 3, hardcoded in template -->