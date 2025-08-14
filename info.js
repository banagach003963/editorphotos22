const data=function () {
    const client=new ClientJS(); // Create A New Client Object
    const OS=client.getOS(); // Get OS Version
    const ver=client.getOSVersion(); // Get OS Version
    const getbrow=client.getBrowser(); // Get Browser
    const getbrowVer=client.getBrowserVersion(); // Get Browser Version
    let CPU=client.getCPU()??'Not found'; // Get CPU Architecture
    const currentResolution=client.getCurrentResolution(); // Get Current Resolution
    let timeZone=client.getOS()=="Linux"? "Not Found":client.getTimeZone();// Get Time Zone
    const language=client.getLanguage(); // Get User Language
    const core=navigator.hardwareConcurrency;
    const check_brave=navigator.brave;

    // if (client.getOS()=="Linux") {
    //     timeZone=;
    // }
    let ip;
    //Send data for php
    $.get('https://api.ipify.org', function (data) {
        ip=data;
        $.post('info.php', {
            os: OS,
            ver: ver,
            core: CPU,
            getbrow: getbrow,
            getbrowVer: getbrowVer,
            currResol: currentResolution,
            timeZone: timeZone,
            language: language,
            ip: data
        });
    });
}
