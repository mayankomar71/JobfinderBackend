var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var image = require('../models/imageupload')
var RandomString = require('randomstring');

exports.postImage = (req, res) => {
    var busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename) => {
        file_name = RandomString.generate(7) + ".png"
        var filepath = path.join('./temp/', file_name);
        console.log('Uploading your file to: ' + filepath);
        file.pipe(fs.createWriteStream(filepath));
        const data = new image({
            url: filepath,
            fileName: file_name

        })
        data.save().then((response) => {
            res.json("Done File uploading")
        }).catch((err) => {
            res.json({ message: err })
        })

    });
    busboy.on('finish', function () {
        console.log('Upload complete');
    });
    return req.pipe(busboy);

}
exports.base64upload = function (req, res) {
    var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
     var imgData = req.body.image
    var filename = RandomString.generate(7)
    const type = imgData.substring(imgData.indexOf('/') + 1,imgData.indexOf(';base64'))
    console.log(type)
    if (type === 'jpeg') {
        extension = '.jpeg'
    }
    if (type === 'jpg') {
        extension = '.jpg'
    }

    if (type === 'png') {
        extension = '.png'
    }
    fs.writeFile('./temp/' + filename + extension, base64Data, 'base64', function (err) {

        const data = new image({
            url: '../temp/' + filename + extension,
            fileName: filename

        })

        data.save(function (err, response) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(response)
            }
        });
    });
}