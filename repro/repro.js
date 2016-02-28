/**
 * Created by ozan on 2/25/16.
 */
function repro(){
    var webView = new WebWindow('Repro1', "https://ozanserim.github.io/repro/repro.html", 800, 600, false);
    webView.eventBridge.emitScriptEvent(JSON.stringify("TEST_DATA_TO_SEND"));
    //Script.stop();
}
repro();