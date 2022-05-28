const jspdf = require("jspdf");
const html2canvas = require("html2canvas");
const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore = require('./Authentication-store');

var results = []
var donorDetails = {}
var reciptDeatils = {}

var ReportsStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    generateDailyUserReport() {

        Axios.get(config["baseUrl"] + "/transaction/reports/1",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["data"];
            var fileData = "data:application/pdf;base64," + response.data["file"]
            const linkSource = fileData;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = response.data["fileName"];
            downloadLink.click();
            /*const pdf = new jspdf.jsPDF("p", "mm", "a4");
            pdf.setFontSize(12);
            //pdf.table()
            //  var data='<div style="font-size:12px">';
            var data = `
          <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  </head>
  <body>
  <div style="font-size:12px">    
          <table>
                        <tr>
                        <th>Donation No</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        </tr>
                        <tr>
                        <td>Donation No</td>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Date</td>
                        </tr>
                    </table>
                    </div>
                    </body>
  </html>
            `;
            html2canvas.html2canvas(data).then((val) => {
                pdf.html(val).then(() => {
                    pdf.save("report")
                });
            })*/


            toast.success("Report generated sucessfully")
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    generateCustomReport(data) {

        Axios.get(config["baseUrl"] + "/getReports",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["data"];
            var fileData = "data:application/pdf;base64," + response.data["file"]
            const linkSource = fileData;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = response.data["fileName"];
            downloadLink.click();
            /*const pdf = new jspdf.jsPDF("p", "mm", "a4");
            pdf.setFontSize(12);
            //pdf.table()
            //  var data='<div style="font-size:12px">';
            var data = `
          <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  </head>
  <body>
  <div style="font-size:12px">    
          <table>
                        <tr>
                        <th>Donation No</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        </tr>
                        <tr>
                        <td>Donation No</td>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Date</td>
                        </tr>
                    </table>
                    </div>
                    </body>
  </html>
            `;
            html2canvas.html2canvas(data).then((val) => {
                pdf.html(val).then(() => {
                    pdf.save("report")
                });
            })*/


            toast.success("Report generated sucessfully")
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    getData() {
        return results;
    }

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case "DAILY_USER_REPORT":
            ReportsStore.generateDailyUserReport()
            break;
        case "CUSTOM_REPORT":
            ReportsStore.generateCustomReport(action.data)
                break;
    }
});

module.exports = ReportsStore;