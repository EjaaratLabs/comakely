const log = require('node-file-logger');

class logger {
    constructor() {
        log.SetUserOptions({
                folderPath: './logs/',
                dateBasedFileNaming: true,
                // Required only if dateBasedFileNaming is set to false
                fileName: 'All_Logs',
                // Required only if dateBasedFileNaming is set to true
                fileNamePrefix: 'Logs_',
                fileNameSuffix: '',
                fileNameExtension: '.log',
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm:ss.SSS',
                logLevel: 'debug',
                onlyFileLogging: true

            });
    }

    logInfo(info)
    {
        log.Info(info);
    }
    logError(errorObj,error={msg:"",method:"UnKnown",service:"UnKnown"},)
    {
        if(error)
        log.Error(error.msg, error.service, error.method);
        if(errorObj)
        log.Error(errorObj);
    }
    logFatalError(errorObj,error={msg:"",method:"UnKnown",service:"UnKnown"})
    {
        if(error)
        log.Fatal(error.msg, error.service, error.method);
        if(errorObj)
        log.Fatal(errorObj);
    }

}

module.exports=new logger();