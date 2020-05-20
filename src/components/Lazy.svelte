<script>
 import penguin from 'static/penguin.png' // case 1, imported in script
</script>

<style>
 .elephant {
   background-image: url("static/elephant.png"); /* case 2, referenced in css url */
 }
</style>

<img alt="penguin" src={penguin}>
<div class="elephant"></div>
<img alt="cat" src="static/cat.png"/> <!-- case 3, hardcoded in template -->