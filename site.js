var audio = new Audio();
audio.src = 'track1.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = true;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_height;

window.addEventListener("load", initMp3Player, false);

function initMp3Player() {
	document.getElementById('audio_box').appendChild(audio);
	context = new AudioContext();
	analyser = context.createAnalyser();
	canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	
	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}

// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#FFFFFF';

	var contentWidth = $('#mp3_player').width();
	var bar_width = 2;
	var bar_spacing = 1;
	var bars = contentWidth/(bar_width + bar_spacing);

	for (var i = 0; i < bars; i++) {
		bar_x = i * (bar_width + bar_spacing);
		bar_height = -(fbc_array[i] / 2);

		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}