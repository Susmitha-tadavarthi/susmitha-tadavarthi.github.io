const fs = require('fs');
const path = require("path");
const ncp = require('ncp').ncp;

fs.readFile('js/livenessCheck.js', 'utf-8', function(err, data) {
    if (err) throw err;
 
    var newValue = data.replace(/drawBox/gim, 'dB');
    newValue = newValue.replace(/detectBlink/gim, 'deBl');
    newValue = newValue.replace(/faceFound/gim, 'fF');
    newValue = newValue.replace(/initializeDirection/gim, 'iD');
    newValue = newValue.replace(/getFaceEstimatesAndCreateFaceMesh/gim, 'gFEACF');
    newValue = newValue.replace(/testOrientation/gim, 'tO');
    newValue = newValue.replace(/toggleLoading/gim, 'tL');
    newValue = newValue.replace(/handleFaceTrackingStatus/gim, 'hFTS');
    newValue = newValue.replace(/handleFaceTrackingEvent/gim, 'hFTE');
    // newValue = newValue.replace(/model/gim, 'm');
    // newValue = newValue.replace(/model/gim, 'm');
 
    fs.writeFile('changedJs/livenessCheck.js', newValue, 'utf-8', function(err, data) {
        if (err) throw err;
        console.log('livenessCheck Done!');
    })
})

fs.readFile('js/blendDifference.js', 'utf-8', function(err, data) {
    if (err) throw err;
 
    var newValue = data.replace(/threshold/gim, 't');
    newValue = newValue.replace(/fastAbs/gim, 'fA');
    newValue = newValue.replace(/differenceAccuracy/gim, 'dA');
    // newValue = newValue.replace(/model/gim, 'm');
    // newValue = newValue.replace(/model/gim, 'm');
 
    fs.writeFile('changedJs/blendDifference.js', newValue, 'utf-8', function(err, data) {
        if (err) throw err;
        console.log('blendDifference Done!');
    })
})

fs.readFile('js/blobMotionDetector.js', 'utf-8', function(err, data) {
    if (err) throw err;
 
    var newValue = data.replace(/indexToXandY/gim, 'iTXY');
    newValue = newValue.replace(/scaleBox/gim, 'sB');
    newValue = newValue.replace(/thresholdImage/gim, 'tI');
    newValue = newValue.replace(/detectBlobByColour/gim, 'dBBC');
    newValue = newValue.replace(/detectBlobs/gim, 'deBlo');
    // newValue = newValue.replace(/model/gim, 'm');
    // newValue = newValue.replace(/model/gim, 'm');
 
    fs.writeFile('changedJs/blobMotionDetector.js', newValue, 'utf-8', function(err, data) {
        if (err) throw err;
        console.log('blobMotionDetector Done!');
    })
})

ncp('js/cropImageData.js','changedJs/cropImageData.js')
ncp('js/floodfill.js','changedJs/floodfill.js')
ncp('js/gaussFilter.js','changedJs/gaussFilter.js')
ncp('js/headtrackr.js','changedJs/headtrackr.js')
ncp('js/require.js','changedJs/require.js')

var copyRecursiveSync = function(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(function(childItemName) {
        copyRecursiveSync(path.join(src, childItemName),
                          path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  copyRecursiveSync("js/@tensorflow","changedJs/@tensorflow")

// fs.readFile('js/blendDifference.js', 'utf-8', function(err, data) {
//     if (err) throw err;
 
//     var newValue = data.replace(/threshold/gim, 't');
//     newValue = newValue.replace(/fastAbs/gim, 'fA');
//     // newValue = newValue.replace(/noseTipX/gim, 'ntx');
//     // newValue = newValue.replace(/topLeftX/gim, 'tlx');
//     // newValue = newValue.replace(/bottomRightX/gim, 'brx');
//     // newValue = newValue.replace(/userDirection/gim, 'ud');
//     // newValue = newValue.replace(/rightTurn/gim, 'rt');
//     // newValue = newValue.replace(/leftTurn/gim, 'lt');
//     // newValue = newValue.replace(/turnToCenter/gim, 'ttc');
//     // newValue = newValue.replace(/toggleLoading/gim, 'tl');
//     // newValue = newValue.replace(/toggleWebcam/gim, 'tw');
//     // newValue = newValue.replace(/toggleDemo/gim, 'td');
//     // newValue = newValue.replace(/toggleFacemesh/gim, 'tf');
//     // newValue = newValue.replace(/initializeDirection/gim, 'indi');
//     // newValue = newValue.replace(/stopWebcamAndDiaplayThankYou/gim, 'swadty');
//     // newValue = newValue.replace(/displayThankYou/gim, 'dty');
//     // newValue = newValue.replace(/setupCamera/gim, 'suc');
//     // newValue = newValue.replace(/meshPoints/gim, 'mp');
//     // newValue = newValue.replace(/getFaceEstimatesAndCreateFaceMesh/gim, 'gfeacfm');
//     // newValue = newValue.replace(/createFaceMesh/gim, 'cfm');
//     // newValue = newValue.replace(/testOrientation/gim, 'to');
//     // newValue = newValue.replace(/showDirection/gim, 'sd');
//     // newValue = newValue.replace(/checkDirectionToTurnAndShowDirection/gim, 'cdttasd');
//     // newValue = newValue.replace(/trueMain/gim, 'tm');
//     // newValue = newValue.replace(/main/gim, 'ma');
//     // newValue = newValue.replace(/model/gim, 'm');
//     // newValue = newValue.replace(/model/gim, 'm');
 
//     fs.writeFile('changedJs/blendDifference.js', newValue, 'utf-8', function(err, data) {
//         if (err) throw err;
//         console.log('blendDifference Done!');
//     })
// })

// fs.readFile('js/blendDifference.js', 'utf-8', function(err, data) {
//     if (err) throw err;
 
//     var newValue = data.replace(/threshold/gim, 't');
//     newValue = newValue.replace(/fastAbs/gim, 'fA');
//     // newValue = newValue.replace(/noseTipX/gim, 'ntx');
//     // newValue = newValue.replace(/topLeftX/gim, 'tlx');
//     // newValue = newValue.replace(/bottomRightX/gim, 'brx');
//     // newValue = newValue.replace(/userDirection/gim, 'ud');
//     // newValue = newValue.replace(/rightTurn/gim, 'rt');
//     // newValue = newValue.replace(/leftTurn/gim, 'lt');
//     // newValue = newValue.replace(/turnToCenter/gim, 'ttc');
//     // newValue = newValue.replace(/toggleLoading/gim, 'tl');
//     // newValue = newValue.replace(/toggleWebcam/gim, 'tw');
//     // newValue = newValue.replace(/toggleDemo/gim, 'td');
//     // newValue = newValue.replace(/toggleFacemesh/gim, 'tf');
//     // newValue = newValue.replace(/initializeDirection/gim, 'indi');
//     // newValue = newValue.replace(/stopWebcamAndDiaplayThankYou/gim, 'swadty');
//     // newValue = newValue.replace(/displayThankYou/gim, 'dty');
//     // newValue = newValue.replace(/setupCamera/gim, 'suc');
//     // newValue = newValue.replace(/meshPoints/gim, 'mp');
//     // newValue = newValue.replace(/getFaceEstimatesAndCreateFaceMesh/gim, 'gfeacfm');
//     // newValue = newValue.replace(/createFaceMesh/gim, 'cfm');
//     // newValue = newValue.replace(/testOrientation/gim, 'to');
//     // newValue = newValue.replace(/showDirection/gim, 'sd');
//     // newValue = newValue.replace(/checkDirectionToTurnAndShowDirection/gim, 'cdttasd');
//     // newValue = newValue.replace(/trueMain/gim, 'tm');
//     // newValue = newValue.replace(/main/gim, 'ma');
//     // newValue = newValue.replace(/model/gim, 'm');
//     // newValue = newValue.replace(/model/gim, 'm');
 
//     fs.writeFile('changedJs/blendDifference.js', newValue, 'utf-8', function(err, data) {
//         if (err) throw err;
//         console.log('blendDifference Done!');
//     })
// })

// fs.readFile('js/blendDifference.js', 'utf-8', function(err, data) {
//     if (err) throw err;
 
//     var newValue = data.replace(/threshold/gim, 't');
//     newValue = newValue.replace(/fastAbs/gim, 'fA');
//     // newValue = newValue.replace(/noseTipX/gim, 'ntx');
//     // newValue = newValue.replace(/topLeftX/gim, 'tlx');
//     // newValue = newValue.replace(/bottomRightX/gim, 'brx');
//     // newValue = newValue.replace(/userDirection/gim, 'ud');
//     // newValue = newValue.replace(/rightTurn/gim, 'rt');
//     // newValue = newValue.replace(/leftTurn/gim, 'lt');
//     // newValue = newValue.replace(/turnToCenter/gim, 'ttc');
//     // newValue = newValue.replace(/toggleLoading/gim, 'tl');
//     // newValue = newValue.replace(/toggleWebcam/gim, 'tw');
//     // newValue = newValue.replace(/toggleDemo/gim, 'td');
//     // newValue = newValue.replace(/toggleFacemesh/gim, 'tf');
//     // newValue = newValue.replace(/initializeDirection/gim, 'indi');
//     // newValue = newValue.replace(/stopWebcamAndDiaplayThankYou/gim, 'swadty');
//     // newValue = newValue.replace(/displayThankYou/gim, 'dty');
//     // newValue = newValue.replace(/setupCamera/gim, 'suc');
//     // newValue = newValue.replace(/meshPoints/gim, 'mp');
//     // newValue = newValue.replace(/getFaceEstimatesAndCreateFaceMesh/gim, 'gfeacfm');
//     // newValue = newValue.replace(/createFaceMesh/gim, 'cfm');
//     // newValue = newValue.replace(/testOrientation/gim, 'to');
//     // newValue = newValue.replace(/showDirection/gim, 'sd');
//     // newValue = newValue.replace(/checkDirectionToTurnAndShowDirection/gim, 'cdttasd');
//     // newValue = newValue.replace(/trueMain/gim, 'tm');
//     // newValue = newValue.replace(/main/gim, 'ma');
//     // newValue = newValue.replace(/model/gim, 'm');
//     // newValue = newValue.replace(/model/gim, 'm');
 
//     fs.writeFile('changedJs/blendDifference.js', newValue, 'utf-8', function(err, data) {
//         if (err) throw err;
//         console.log('blendDifference Done!');
//     })
// })

// fs.readFile('js/blendDifference.js', 'utf-8', function(err, data) {
//     if (err) throw err;
 
//     var newValue = data.replace(/threshold/gim, 't');
//     newValue = newValue.replace(/fastAbs/gim, 'fA');
//     // newValue = newValue.replace(/noseTipX/gim, 'ntx');
//     // newValue = newValue.replace(/topLeftX/gim, 'tlx');
//     // newValue = newValue.replace(/bottomRightX/gim, 'brx');
//     // newValue = newValue.replace(/userDirection/gim, 'ud');
//     // newValue = newValue.replace(/rightTurn/gim, 'rt');
//     // newValue = newValue.replace(/leftTurn/gim, 'lt');
//     // newValue = newValue.replace(/turnToCenter/gim, 'ttc');
//     // newValue = newValue.replace(/toggleLoading/gim, 'tl');
//     // newValue = newValue.replace(/toggleWebcam/gim, 'tw');
//     // newValue = newValue.replace(/toggleDemo/gim, 'td');
//     // newValue = newValue.replace(/toggleFacemesh/gim, 'tf');
//     // newValue = newValue.replace(/initializeDirection/gim, 'indi');
//     // newValue = newValue.replace(/stopWebcamAndDiaplayThankYou/gim, 'swadty');
//     // newValue = newValue.replace(/displayThankYou/gim, 'dty');
//     // newValue = newValue.replace(/setupCamera/gim, 'suc');
//     // newValue = newValue.replace(/meshPoints/gim, 'mp');
//     // newValue = newValue.replace(/getFaceEstimatesAndCreateFaceMesh/gim, 'gfeacfm');
//     // newValue = newValue.replace(/createFaceMesh/gim, 'cfm');
//     // newValue = newValue.replace(/testOrientation/gim, 'to');
//     // newValue = newValue.replace(/showDirection/gim, 'sd');
//     // newValue = newValue.replace(/checkDirectionToTurnAndShowDirection/gim, 'cdttasd');
//     // newValue = newValue.replace(/trueMain/gim, 'tm');
//     // newValue = newValue.replace(/main/gim, 'ma');
//     // newValue = newValue.replace(/model/gim, 'm');
//     // newValue = newValue.replace(/model/gim, 'm');
 
//     fs.writeFile('changedJs/blendDifference.js', newValue, 'utf-8', function(err, data) {
//         if (err) throw err;
//         console.log('blendDifference Done!');
//     })
// })