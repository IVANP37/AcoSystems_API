require('dotenv').config();
const { spawn } = require('child_process');
const log = require('simple-node-logger').createSimpleLogger('src/Api.log');


const getProfile =  (req, res) => {
    const { referencePhotos, samplePhoto, sampleInfo } = req.body;
    const newProfile = { ...req.body };
    let listUrl = [];
    log.info(newProfile, new Date().toJSON());
    if (referencePhotos && samplePhoto && sampleInfo) {
        const samplePhot = newProfile.samplePhoto;
        const color = newProfile.sampleInfo.colorCode;
        console.log(samplePhot);
        log.info(samplePhot, new Date().toJSON());
        for (var i = 0; i < newProfile.referencePhotos.length; i++) {
            listUrl.push(newProfile.referencePhotos[i].url);
            console.log('Url:' + newProfile.referencePhotos[i].url);
            log.info('Url:' + newProfile.referencePhotos[i].url, new Date().toJSON());
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        sleep(2000).then(() => {
            console.log("Python scripts!");
            // Function to convert an Uint8Array to a string
            var uint8arrayToString = function (data) {
                return String.fromCharCode.apply(null, data);
            };
            // invocando los script de python 
            var dataToSend;
            var list = "-p " + listUrl.join(" -p ").split(' ').filter(i => i).join(" ");
            let command = process.env.SCRIPT_PYTHON_URI + list + " -d " + samplePhot + " -c " + color;
            log.info(command);
            const picture = spawn(command, [], { shell: true })  // use `shell` option           
            picture.stdout.on('data', function (data) {
                log.info('Channeling data from the Python script ...', new Date().toJSON());
                dataToSend = data;
                log.info("DATA: " + dataToSend);

                if (dataToSend == 1) {

                    res.status(200).json({
                        "sampleID": "1",
                        "result": "PASSED"
                    });
                } else {

                    res.status(200).json({
                        "sampleID": "1",
                        "result": "FAILED"
                    });
                }
            });
            picture.stderr.on('data', (data) => {
                log.info("Error:", uint8arrayToString(data));
            });
            picture.on('exit', (code) => {
                console.log("Process quit with code : " + code);
            });
        });
    } else {
        res.status(500).json({ error: 'Lack parameters' });
    }
}

module.exports = {
    getProfile
}