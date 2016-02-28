/**
 * Created by ozan on 2/25/16.
 */
function repro(){
    var window = new OverlayWebWindow({
        title: 'Google',
        source: "https://ozanserim.github.io/repro/repro.html",
        width: 900,
        height: 700,
        visible: true
    });
    //var window = new OverlayWebWindow(…);

    window.eventBridge.emitScriptEvent(JSON.stringify("DATA_TO_SEND"));
    //Script.stop();
}
repro();