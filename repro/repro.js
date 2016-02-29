/**
 * Created by ozan on 2/25/16.
 */
function repro(){
    var webView = new WebWindow('Repro3', "file:///Users/ozan/WebstormProjects/ozanserim/repro/repro.html", 800, 600, false);
    webView.setVisible(true);
    webView.eventBridge.emitScriptEvent("test_data");
    //Script.stop();
}
repro();