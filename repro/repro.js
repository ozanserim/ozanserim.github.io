/**
 * Created by ozan on 2/25/16.
 */
function repro(){
    var webView = new OverlayWebWindow({
        title: 'Repro1',
        source: "https://ozanserim.github.io/repro/repro.html",
        width: 900,
        height: 700,
        visible: true
    });

    webView.eventBridge.emitScriptEvent(JSON.stringify("test_data"));
    //Script.stop();
}
repro();