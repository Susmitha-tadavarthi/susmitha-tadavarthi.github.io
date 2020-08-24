define("livenessCheck", ["headtrackr", "blobMotionDetector", "https://cdn.jsdelivr.net/npm/@tensorflow-models/facemesh"], function (headtrackr, BlobMotionDetector, facemesh) {
    return function livenessCheck(params) {

        var htracker, htrackerCanvas,
            video, videoWidth, videoHeight,
            canvas, ctx,
            motiondetector, model, action, grid,
            estimatesLoaded = false;

        if (!params) { params = {}; }
        if (params.debug) {
            var debugLastLoop = new Date().getTime();
        }

        var errorStatusEvent = document.createEvent("Event");
        errorStatusEvent.initEvent("errorStatus", true, true);

        var errorTrackerStatus = function (message) {
            errorStatusEvent.status = message;
            document.dispatchEvent(errorStatusEvent);
        }

        function drawBox(box, colour) {
            ctx.save();
            ctx.strokeStyle = colour;
            ctx.strokeRect(box.x - 1, box.y - 1, 3, 3);
            ctx.translate(box.x, box.y);
            if (box.angle) { ctx.rotate(box.angle); }
            ctx.strokeRect((-(box.width / 2)) >> 0,
                (-(box.height / 2)) >> 0, box.width, box.height);
            ctx.restore();
        }

        function detectBlink(eyes, blobs) {
            if (blobs.length === 2) {
                var left = blobs[0], right = blobs[1];
                if (blobs[0].x > blobs[1].x) {
                    left = blobs[1]; right = blobs[0];
                }

                var leftIsLeft = left.x < eyes.width / 2;
                var rightIsRight = right.x > eyes.width / 2;
                var alignedVertically = Math.abs(left.y - right.y) < eyes.height / 3;

                if (leftIsLeft && rightIsRight && alignedVertically) {
                    return true;
                }
            }
            return false;
        }

        async function faceFound(face) {
            if (!videoWidth || !videoHeight) { return; }

            var eyes = {
                x: face.x,
                y: face.y,
                width: Math.floor(face.width - face.width / 5),
                height: Math.floor(face.height / 3),
                angle: face.angle
            };

            ctx.clearRect(0, 0, videoWidth, videoHeight);
            ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

            motiondetector.tick(video, videoWidth, videoHeight);
            var blobs = motiondetector.detectInBox(eyes);
            var regions = motiondetector.regions();

            if (params.debug) {
                drawBox(face, '#00CC00');
                drawBox(eyes, '#CC0000');

                var debugThisLoop = new Date().getTime();
                var fps = 1000 / (debugThisLoop - debugLastLoop);
                ctx.font = "14px Georgia";
                ctx.fillText(fps, 5, 15);
                debugLastLoop = debugThisLoop;
            }

            // calling the functions for getting the face estimates 
            predictions = await getFaceEstimatesAndCreateFaceMesh();
            // console.log(predictions);
            await testOrientation(predictions, "false");

            // detecting the blink
            if (detectBlink(eyes, blobs)) {
                if (estimatesLoaded == true) {
                    await testOrientation(null, "true");
                }
            }
        }

        // Creating 468 images and initializing them.
        // function meshPoints() {
        //     for (var i = 0; i < 468; i++) {
        //         var img = new Image();
        //         img.src = "/detection_apps/head_gesture_recognition/static/images/pixel.png";
        //         img.id = i;
        //         document.getElementById('facemesh').appendChild(img);
        //     }
        // }

        // Changing the coordinates of the images according to the points for forming the mesh.
        // function createFaceMesh(predictions) {
        //     for (let i = 0; i < predictions.length; i++) {
        //         const keypoints = predictions[i].scaledMesh;

        //         // Log facial keypoints.
        //         for (let i = 0; i < keypoints.length; i++) {
        //             const [x, y, z] = keypoints[i];
        //             document.getElementById(i).style.left = 640 - x;
        //             document.getElementById(i).style.top = y;
        //             document.getElementById(i).style.position = 'absolute';
        //         }
        //     }
        // }

        async function getFaceEstimatesAndCreateFaceMesh() {
            model = await facemesh.load();
            const predictions = await model.estimateFaces(video);
            toggleLoading(false);
            if (predictions.length == 1) {
                estimatesLoaded = true
                noseTipX = predictions[0].annotations.noseTip[0][0]
                topLeftX = predictions[0].boundingBox.topLeft[0][0]
                bottomRightX = predictions[0].boundingBox.bottomRight[0][0]
                //createFaceMesh(predictions);
                return predictions;
            } else if (predictions.length > 1) {
                estimatesLoaded = false
                // alert("Found more than one face in the camera. Please make sure only the conserned persons face is in the screen");
                //console.log("Found more than one face in the camera. Please make sure only the conserned persons face is in the screen");
                errorTrackerStatus("more-faces");
            } else {
                estimatesLoaded = false
                turnToCenter = 0;
                // alert("Error detecting the face! Please turn front and perform the action expected");
                errorTrackerStatus("Face-not-detected");
            }
        }


        // require('dotenv').config()

        // api_url = process.env.API

        // console.log(api_url)

        async function testOrientation(predictions, blinkAction) {
            if (predictions != undefined || blinkAction == 'true') {
                // console.log(api_url)
                const URL = api_url+"/head_gesture/faceOrientation/?gr_id=" + grid;
                try {
                    let testOrientationReq = {
                        pred: predictions,
                        blinkAction: blinkAction,
                        userAction: action
                    }
                    // console.log(JSON.stringify(testOrientationReq));
                    let response = await fetch(URL,  {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(testOrientationReq)
                    });
                    if (response.ok) {
                        var evt;
                        testOrientationRes = await response.json();
                        liveness = testOrientationRes["liveness"]
                        if (liveness == true) {
                            const webhook_url = api_url+"/head_gesture/gesture_recognition_result/"+grid+"/";
                            let response = await fetch(webhook_url,  {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify(testOrientationRes)
                            });
                            if(response.ok){
                                console.log("writen to webhook");
                            } else{
                                console.log("webhook failed");
                            }
                            evt = document.createEvent("Event");
                            evt.initEvent("liveness", true, true);
                            document.dispatchEvent(evt);
                        }
                        // console.log(testOrientationRes);
                        // console.log("action : "+action);
                    } else {
                        console.error("HTTP-Error: " + response.status);
                    }
                } catch (err) {
                    console.error(err.name + " :" + err.message);
                }
            }
        }

        //Function to toggle the display of DOM element with ID loading
        const toggleLoading = (shouldLoad = true) => (
            document.getElementById('loading').style.display = shouldLoad === true ? 'block' : 'none'
        );

        function handleFaceTrackingStatus(event) {
            if (event.status !== "found") {
                var face = {
                    x: Math.floor(videoWidth / 2),
                    y: Math.floor(videoHeight / 2),
                    width: Math.floor(videoWidth / 3),
                    height: Math.floor(videoHeight / 2),
                    angle: 0.0,
                };
                faceFound(face);
            }
        }

        function handleFaceTrackingEvent(event) {
            if (event.detection === 'CS') {
                var face = {
                    x: event.x,
                    y: event.y,
                    width: event.width,
                    height: event.height,
                    angle: event.angle - Math.PI / 2
                };
                faceFound(face);
            }
        }

        this.init = function (videoInput, canvasOverlay, userAction, gr_id, api_url) {
            video = videoInput;
            canvas = canvasOverlay;
            ctx = canvas.getContext('2d');

            motiondetector = new BlobMotionDetector();

            htracker = new headtrackr.Tracker({
                ui: false, calcAngles: true,
            });
            htrackerCanvas = document.createElement('canvas');
            htracker.init(videoInput, htrackerCanvas);
            document.addEventListener('facetrackingEvent', handleFaceTrackingEvent);
            document.addEventListener('headtrackrStatus', handleFaceTrackingStatus);
            video.addEventListener('playing', this.resize, false);
            action = userAction;
            grid = gr_id;
            api_url = api_url;
        };
        this.start = function () {
            htracker.start();
        };
        this.resize = async function () {
            videoWidth = video.offsetWidth;
            videoHeight = (video.videoHeight / video.videoWidth) * videoWidth;
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            htrackerCanvas.width = videoWidth;
            htrackerCanvas.height = videoHeight;

            //meshPoints();
            toggleLoading(true);
        };
        this.stop = function () {
            htracker.stop();
        }
    };
});