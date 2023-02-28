// This script will test up to the following version.
flash_versions = 20;

// Initialize variables and arrays
var flash = new Object();
flash.installed=false;
flash.version='0.0';

// Dig through Netscape-compatible plug-ins first.
if (navigator.plugins && navigator.plugins.length) {
	for (x=0; x < navigator.plugins.length; x++) {
		if (navigator.plugins[x].name.indexOf('Shockwave Flash') != -1) {
			flash.version = navigator.plugins[x].description.split('Shockwave Flash ')[1];
			flash.installed = true;
			break;
		}
	}
}

// Then, dig through ActiveX-style plug-ins afterwords
else if (window.ActiveXObject) {
	for (x = 2; x <= flash_versions; x++) {
		try {
			oFlash = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + x + "');");
			if(oFlash) {
				flash.installed = true;
				flash.version = x + '.0';
			}
		}
		catch(e) {}
	}
}

// Create sniffing variables in the following style: flash.ver[x]
flash.ver = Array();
for(i = 4; i <= flash_versions; i++) {
	eval("flash.ver[" + i + "] = (flash.installed && parseInt(flash.version) >= " + i + ") ? true : false;");
}

function ShowNoFlashMessage(){
document.write('<div align="left" class="main"> <br><br><font color="#FF0000" size="+1"><strong>Flash plugin not detected.</strong></font><br><br>');
document.write('If you are seeing this message and not an animation instead. You probably need Macromedia Flash Player Plug-in for your browser, please download ');
document.write('the Macromedia Flash Player Plug-in from <br><a href="http://www.macromedia.com/go/getflashplayer" target="_blank">http://www.macromedia.com/go/getflashplayer</a><br>');
document.write('<br>This is a very small download and offers rich multimedia content to be rendered to your browser. For more information please contact');
document.write('<a href="http://www.macromedia.com" target="_blank">Macromedia Inc.</a><br><br>Thank you.<br><em>webmaster</em></div>');
}