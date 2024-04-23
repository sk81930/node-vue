var socket = io.connect();
var videoChatForm = document.getElementById("video-chat-form");
var videoChatRooms = document.getElementById("video-chat-rooms");
var joinBtn = document.getElementById("join");
var roomInput = document.getElementById("roomName");
var userVideo = document.getElementById("user-video");
var peerVideo = document.getElementById("peer-video");

var divBtnGroup = document.getElementById("btn-group");
var leaveRoomButton = document.getElementById("leaveRoomButton");

var roomName;
var creater = false;
var rtcPeerConnection;
var userStream;
var iceServers = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};


joinBtn.addEventListener("click",function(){
	if(roomInput.value == ""){
		alert("Please enter room!")
	}else{

		roomName = roomInput.value;

		socket.emit("join", roomName);
		//navigator.getDisplayMedia = navigator.mediaDevices.getDisplayMedia || navigator.mediaDevices.webkitGetDisplayMedia || navigator.mediaDevices.mozGetDisplayMedia;

		

	}
})

socket.on("created",function(){

	creater = true


	navigator.mediaDevices.getDisplayMedia({ audio: true, video: {width:500,height:500}})
    .then(stream => {
    	userStream = stream;
        videoChatForm.style = "display:none";
        divBtnGroup.style = "display:flex";
        userVideo.srcObject = stream;
        userVideo.onloadedmetadata = function(e){
        	userVideo.play();
        }
    })
    .catch(error => {
      console.error('Error accessing media devices:', error);
    });

})

socket.on("joined",function(){
	creater = false
	navigator.mediaDevices.getDisplayMedia({ audio: true, video: {width:500,height:500}})
    .then(stream => {
    	userStream = stream;
        videoChatForm.style = "display:none";
        divBtnGroup.style = "display:flex";
        userVideo.srcObject = stream;
        userVideo.onloadedmetadata = function(e){
        	userVideo.play();
        }
        socket.emit("ready", roomName);
    })
    .catch(error => {
      console.error('Error accessing media devices:', error);
    });
})

socket.on("full",function(){
	alert("room is full");
})

socket.on("ready",function(){
	if(creater){
		rtcPeerConnection = new RTCPeerConnection(iceServers) 
		rtcPeerConnection.onicecandidate = OnIceCandidateFunction
		rtcPeerConnection.ontrack = ontrackFunc;


		rtcPeerConnection.addTrack(userStream.getTracks()[0],userStream)

		rtcPeerConnection.createOffer(
			function(offer){
				rtcPeerConnection.setLocalDescription(offer)
                socket.emit("offer", offer, roomName);
			},
			function(error){
              console.log(error)
			},
		)
	}
})

socket.on("candidate",function(data){
	var iceCandidate = new RTCIceCandidate(data.candidate);
	rtcPeerConnection.addIceCandidate(iceCandidate)
})

socket.on("offer",function(offer){
	if(!creater){

		rtcPeerConnection = new RTCPeerConnection(iceServers) 
		rtcPeerConnection.onicecandidate = OnIceCandidateFunction
		rtcPeerConnection.ontrack = ontrackFunc

		rtcPeerConnection.addTrack(userStream.getTracks()[0],userStream)
        rtcPeerConnection.setRemoteDescription(offer)
		rtcPeerConnection.createAnswer(
			function(answer){
				rtcPeerConnection.setLocalDescription(answer)
                socket.emit("answer", answer, roomName);
			},
			function(error){
              console.log(error)
			},
		)
	}
})

socket.on("answer",function(data){
	rtcPeerConnection.setRemoteDescription(data.answer)
})
socket.on("leave",function(){
	creater = true;
	if(peerVideo.srcObject){
    	peerVideo.srcObject.getTracks()[0].stop();
    }

    if(rtcPeerConnection){
    	rtcPeerConnection.ontrack = null;
    	rtcPeerConnection.onicecandidate = null;
    	rtcPeerConnection.close();
    }
})

leaveRoomButton.addEventListener("click",function(){
	socket.emit("leave", roomName);
	videoChatForm.style = "display:block";
    divBtnGroup.style = "display:none";

    if(userVideo.srcObject){
    	userVideo.srcObject.getTracks()[0].stop();
    }
    if(peerVideo.srcObject){
    	peerVideo.srcObject.getTracks()[0].stop();
    }

    if(rtcPeerConnection){
    	rtcPeerConnection.ontrack = null;
    	rtcPeerConnection.onicecandidate = null;
    	rtcPeerConnection.close();
    }
})



function OnIceCandidateFunction(event){

	if(event.candidate){
		socket.emit("candidate", event.candidate, roomName);
	}

}
function ontrackFunc(event){


	peerVideo.srcObject = event.streams[0]

	peerVideo.onloadedmetadata = function(e){
    	peerVideo.play();
    }

}
