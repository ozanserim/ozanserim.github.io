/**
 * Created by ozan on 2/25/16.
 */

var reproWindow = new OverlayWebWindow({
    title: 'Repro3',
    source: "file:///Users/ozan/WebstormProjects/ozanserim/repro/repro.html",
    width: 800,
    height: 600,
    visible: false
});

reproWindow.setVisible(true);
reproWindow.raise();

Script.setTimeout(function(){
    reproWindow.eventBridge.emitScriptEvent("test_data");



    //start doing stuff here



},3000)

