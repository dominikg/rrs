<script>
    import test from './test.png'
    import circuit from './circuit-board.svg'

</script>
<style>
    .background {
        width: 100px;
        height: 100px;
        background-image: url("./test.png");
    }
    .bgr {
        background-repeat: repeat;
        background-size: 100px;
        width: 1000px;
        height: 1000px;
        background-image: url("./test.png");
    }
</style>
<h1> image with src</h1>
<img alt="test" src={test}>
<h1>circuit</h1>
<div class="bgr"></div>