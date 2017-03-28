//My JS
document.addEventListener('DOMContentLoaded', function() {
    var intervalID = window.setInterval(checkReady, 1000);

    function checkReady() {
	if(document.getElementsByTagName('body')[0] !== undefined) {
	    var preload = document.getElementById("preload")
	    preload.classList.add("animated");
	    preload.classList.add("fadeOutLeft");
	    setTimeout(function(){
		//Then reveal stuff
	    },1000);
	    
	}
    }
});
