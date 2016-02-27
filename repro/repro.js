/**
 * Created by ozan on 2/25/16.
 */
function repro(){
    new OverlayWebWindow({
        title: 'Google',
        source: "https://ozanserim.github.io/repro/repro.html",
        width: 900,
        height: 700,
        visible: true
    });


    if (key.text === "s") {
        if (ctrlIsPressed === true) {
            noteString = "Snapshot taken.";
            createNotification(noteString, NotificationType.SNAPSHOT);
        }
    }

    //Script.stop();
}
repro();