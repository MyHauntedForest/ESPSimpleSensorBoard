/*

		Generated With Gulp @Tue Jun 21 2022 15:29:37 GMT-0700 (Pacific Daylight Time)

		*** DO NOT MANUALLY EDIT THIS FILE ***

		
		Edit project/html/pages/ files, then run 'gulp generate-js'
		*/

/*Home JS File*/
window.addEventListener('eg-setup', () => {



}, false);

window.addEventListener('eg-config-load', e => {

    const config = e.detail;

}, false);


window.addEventListener('eg-config-save', e => {

    const config = {};

    e.detail.home = config;

}, false);
/*End Home JS File*/
/*Home JS File*/
window.addEventListener('eg-setup', () => {



}, false);

window.addEventListener('eg-config-load', e => {

    const config = e.detail;

    $('#useWifi').prop('checked', config.network.useWifi);
    if (config.network.useWifi) {
        $('.useWifi').removeClass('hidden');
    } else {
        $('.useWifi').addClass('hidden');
    }
    $('#ssid').val(config.network.ssid);
    $('#password').val(config.network.passphrase);
    $('#hostname').val(config.network.hostname);
    $('#staTimeout').val(config.network.sta_timeout);
    $('#dhcp').prop('checked', config.network.dhcp);
    if (config.network.dhcp) {
        $('.dhcp').addClass('hidden');
    } else {
        $('.dhcp').removeClass('hidden');
    }
    $('#ap').prop('checked', config.network.ap_fallback);
    $('#ip').val(
        config.network.ip[0] + '.' + config.network.ip[1] + '.' + config.network.ip[2] + '.' + config.network.ip[3]
    );
    $('#netmask').val(
        config.network.netmask[0] +
        '.' +
        config.network.netmask[1] +
        '.' +
        config.network.netmask[2] +
        '.' +
        config.network.netmask[3]
    );
    $('#gateway').val(
        config.network.gateway[0] +
        '.' +
        config.network.gateway[1] +
        '.' +
        config.network.gateway[2] +
        '.' +
        config.network.gateway[3]
    );

}, false);


window.addEventListener('eg-config-save', e => {

    const config = {};

    e.detail.network = config;

}, false);
/*End Home JS File*/
/*Home Device File*/
window.addEventListener('eg-setup', () => {

    $('#checkInputTally').on('change', (evt) => {
        var checked = $(evt.target).prop('checked');
        if (checked) {
            $('#deviceConfigFieldsetTally').show();
            $('#checkInputHTTPRequests').prop('checked', true);
        } else {
            $('#deviceConfigFieldsetTally').hide();
        }
    });

    $('#checkInputMotionWhite').on('change', (evt) => {
        var checked = $('#checkInputMotionBlack').prop('checked');
        if (checked) {
            $('#checkInputMotionBlack').prop('checked', false);
        }
    });

    $('#checkInputMotionBlack').on('change', (evt) => {
        var checked = $('#checkInputMotionWhite').prop('checked');
        if (checked) {
            $('#checkInputMotionWhite').prop('checked', false);
        }
    });

    $('#checkOutputTriggerCameraRecord').on('change', (evt) => {
        var checked = $(evt.target).prop('checked');
        if (checked) {
            $('#deviceConfigFieldsetTriggerCameraRecord').show();
        }
        else {
            $('#deviceConfigFieldsetTriggerCameraRecord').hide();
        }
    });

    $('#checkOutputTriggerOtherBoard').on('change', (evt) => {
        var checked = $(evt.target).prop('checked');
        if (checked) {
            $('#deviceConfigFieldsetTriggerOtherBoard').show();
        }
        else {
            $('#deviceConfigFieldsetTriggerOtherBoard').hide();
        }
    });

    $('#checkOutputPlayAudio').on('change', (evt) => {
        var checked = $(evt.target).prop('checked');
        if (checked) {
            $('#deviceConfigFieldsetAudio').show();
        }
        else {
            $('#deviceConfigFieldsetAudio').hide();
        }
    });

}, false);

window.addEventListener('eg-config-load', e => {

    const config = e.detail;

    $('#checkInputMotionWhite').prop('checked', config.device.inputs.motionWhite);
    $('#checkInputMotionBlack').prop('checked', config.device.inputs.motionBlack);
    $('#checkInputBeam').prop('checked', config.device.inputs.beam);
    $('#checkInputHTTPRequests').prop('checked', config.device.inputs.http);
    $('#checkInputTally').prop('checked', config.device.inputs.tally.enabled);
    $('#checkInputAlwaysOn').prop('checked', config.device.inputs.alwaysOn);

    $('#radioInputTallyDisableSensor').prop('checked', config.device.inputs.tally.disableSensor);
    $('#radioInputTallyTandomSensor').prop('checked', config.device.inputs.tally.tandomSensor);

    $('#checkOutputRelay').prop('checked', config.device.outputs.relay);
    $('#checkOutputTriggerOtherBoard').prop('checked', config.device.outputs.triggerOtherBoard.enabled);
    $('#inputOutputIPAddressOfOtherBoardToTrigger').val(config.device.outputs.triggerOtherBoard.ip);

    $('#inputStartupMS').val(config.device.timings.startupMS);
    $('#inputTimeOnMS').val(config.device.timings.timeOnMS);
    $('#inputCooldownMS').val(config.device.timings.cooldownMS);
    $('#inputLoopCount').val(config.device.timings.loopCount);

    if (config.device.inputs.tally.enabled) {
        $('#deviceConfigFieldsetTally').show();
    }

    //set camera stuff
    $('#checkOutputTriggerCameraRecord').prop('checked', config.device.outputs.triggerCameraRecord.enabled);
    $('#outputTCRSeconds').val(config.device.outputs.triggerCameraRecord.seconds);
    $('#outputTCRMinutes').val(config.device.outputs.triggerCameraRecord.minutes);

    $('#outputTCRCamera').val(config.device.outputs.triggerCameraRecord.camera);
    $('#outputTCRServerIP').val(config.device.outputs.triggerCameraRecord.serverIP);

    if (config.device.outputs.triggerCameraRecord.enabled) {
        $('#deviceConfigFieldsetTriggerCameraRecord').show();
    }

    if (config.device.outputs.triggerOtherBoard.enabled) {
        $('#deviceConfigFieldsetTriggerOtherBoard').show();
    }

}, false);


window.addEventListener('eg-config-save', e => {

    var config = {
        inputs: {
            motionWhite: $('#checkInputMotionWhite').prop('checked'),
            motionBlack: $('#checkInputMotionBlack').prop('checked'),
            beam: $('#checkInputBeam').prop('checked'),
            http: $('#checkInputHTTPRequests').prop('checked'),
            tally: {
                enabled: $('#checkInputTally').prop('checked'),
                disableSensor: $('#radioInputTallyDisableSensor').prop('checked'),
                tandomSensor: $('#radioInputTallyTandomSensor').prop('checked')
            },
            alwaysOn: $('#checkInputAlwaysOn').prop('checked')
        },

        outputs: {
            relay: $('#checkOutputRelay').prop('checked'), //not sure why you want to turn this off. Do we een add a option?
            triggerCameraRecord: {
                enabled: $('#checkOutputTriggerCameraRecord').prop('checked'),
                serverIP: $('#outputTCRServerIP').val(),
                camera: $('#outputTCRCamera').val(),
                seconds: parseIntOrDefault($('#outputTCRSeconds').val(), 0),
                minutes: parseIntOrDefault($('#outputTCRMinutes').val(), 0)
            },
            triggerOtherBoard: {
                enabled: $('#checkOutputTriggerOtherBoard').prop('checked'),
                ip: $('#outputTCBServerIP').val()
            },
            triggerAudio: {
                enabled: $('#checkOutputPlayAudio').prop('checked'),
                ambient: parseIntOrDefault($('#outputAudioAmbient').val(), -1),
                trigger: parseIntOrDefault($('#outputAudioTrigger').val(), -1)
            }
        },

        timings: {
            startupMS: parseIntOrDefault($('#inputStartupMS').val(), 0),
            timeOnMS: parseIntOrDefault($('#inputTimeOnMS').val(), 0),
            cooldownMS: parseIntOrDefault($('#inputCooldownMS').val(), 0),
            loopCount: parseIntOrDefault($('#inputLoopCount').val(), 0)
        },

        id: $('#devid').val()
    };

    e.detail.device = config;

}, false);
/*End Device JS File*/
/*Test JS File*/
window.addEventListener('eg-setup', () => {



}, false);

window.addEventListener('eg-config-load', e => {

    const config = e.detail;

    $('#checkOutputPlayAudio').prop('checked', config.device.outputs.triggerAudio.enabled);
    $('#outputAudioAmbient').val(config.device.outputs.triggerAudio.ambient == -1 ? "" : config.device.outputs.triggerAudio.ambient);
    $('#outputAudioTrigger').val(config.device.outputs.triggerAudio.trigger == -1 ? "" : config.device.outputs.triggerAudio.trigger);

    if (config.device.outputs.triggerAudio.enabled) {
        $('#deviceConfigFieldsetAudio').show();
    }

}, false);


window.addEventListener('eg-config-save', e => {

    const config = {};

    e.detail.test = config;

}, false);
/*End Test JS File*/
/*Admin JS File*/
window.addEventListener('eg-setup', () => {



}, false);

window.addEventListener('eg-config-load', e => {

    const config = e.detail;

}, false);


window.addEventListener('eg-config-save', e => {

    const config = {};

    e.detail.admin = config;

}, false);
/*End Admin JS File*/