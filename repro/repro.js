/**
 * Created by ozan on 2/25/16.
 */
function repro(){
    var webView = new WebWindow('Repro2', "https://ozanserim.github.io/repro/repro.html", 800, 600, false);
    webView.setVisible(true);
    webView.eventBridge.emitScriptEvent("test_data");
    //Script.stop();
}
repro();