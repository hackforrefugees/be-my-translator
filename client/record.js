Template.record.onCreated(function() {
  $.getScript("https://webrtcexperiment-webrtc.netdna-ssl.com/RecordRTC.js");
});

// RecordRTC
// docs:     http://recordrtc.org/
// example:  https://www.webrtc-experiment.com/RecordRTC/
Template.record.onRendered(function () {

  var params = {},
      r = /([^&=]+)=?([^&]*)/g;

  function d(s) {
      return decodeURIComponent(s.replace(/\+/g, ' '));
  }

  var match, search = window.location.search;
  while (match = r.exec(search.substring(1)))
      params[d(match[1])] = d(match[2]);

  window.params = params;

  var recordAudio       = document.getElementById('record-audio'),
     stopRecordingAudio = document.getElementById('stop-recording-audio'),
     pauseResumeAudio   = document.getElementById('pause-resume-audio'),
     audio = document.getElementById('audio');

    var audioConstraints = {
     audio: true,
    };

  var audioStream;
  var recorder;

  recordAudio.onclick = function() {
     if (!audioStream)
         navigator.getUserMedia(audioConstraints, function(stream) {
             if (window.IsChrome) stream = new window.MediaStream(stream.getAudioTracks());
             audioStream = stream;

             // "audio" is a default type
             recorder = window.RecordRTC(stream, {
                 type: 'audio',
                 bufferSize: typeof params.bufferSize == 'undefined' ? 16384 : params.bufferSize,
                 sampleRate: typeof params.sampleRate == 'undefined' ? 44100 : params.sampleRate,
                 leftChannel: params.leftChannel || false,
                 disableLogs: params.disableLogs || false
             });
             recorder.startRecording();
         }, function() {});
     else {
         audio.src = URL.createObjectURL(audioStream);
         audio.muted = true;
         audio.play();
         if (recorder) recorder.startRecording();
     }

     window.isAudio = true;

     this.disabled = true;
     stopRecordingAudio.disabled = false;
     pauseResumeAudio.disabled = false;
  };

  stopRecordingAudio.onclick = function() {
     this.disabled = true;
     recordAudio.disabled = false;
     audio.src = '';

     if (recorder)
         recorder.stopRecording(function(url) {
             audio.src = url;
             audio.muted = false;
             audio.play();

             document.getElementById('audio-url-preview').innerHTML = '<a href="' + url + '" target="_blank">Recorded Audio URL</a>';
         });
  };

  pauseResumeAudio.onclick = pauseResumeVideo.onclick = pauseResumeGif.onclick =  function() {
     if(!recorder) return;

     if(this.innerHTML === 'Pause') {
         this.innerHTML = 'Resume';
         recorder.pauseRecording();
         return;
     }

     this.innerHTML = 'Pause';
     recorder.resumeRecording();
  };

})
