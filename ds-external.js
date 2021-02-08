if (document.location.href.match(/.*\/MARAT\/importer\.aspx/)) {
checkpath();    
}
if (document.location.href.match(/.*\/PrioritizationAllocTool\/ModalDialogs\/SkuOrPNList\.aspx/)) {
fixSaveClickInChromeSKUsorPNs();    
}
if (document.location.href.match(/.*\/PrioritizationAllocTool\/ModalDialogs\/Priority\.aspx/)) {
fixSaveClickInChromeSKUsorPNs();    
}
function fixSaveClickInChromePriority () {
    if (document.getElementById('SaveButton') != null) {
        document.getElementById('SaveButton').outerHTML = "<input id=\"SaveButton\" type=\"button\" class=\"buttonP\" value=\"Save\" onclick=\"saveClickChromePriority()\" style=\"width:80px\">";
    } 
}
function fixSaveClickInChromeSKUsorPNs () {
    if (document.getElementById('SaveButton') != null) {
        document.getElementById('SaveButton').outerHTML = "<input id=\"SaveButton\" type=\"button\" class=\"buttonP\" value=\"Save\" onclick=\"saveClickChromeSKUsorPNS()\" style=\"width:80px\">";
    } 
}

function checkpath () {
    if (document.getElementById("filePath").value.replace(/.*rufc-fs.*\\FSDFS\\.*/,"processed") != "processed") {
    setTimeout(checkpath, 500);
    document.getElementById("filePath").value = document.getElementById("filePath").value.replace(/C:\\fakepath\\/,atob("XFxcXHJ1ZmMtZnMwNS5jbmV0Y29udGVudC5uZXRcXEZTREZTXFxUZWNobm9sb2d5VW5pdFxcTUFSQVRcXA=="));
    }
}
if (!window.showModalDialog) {
    window.showModalDialog = function (arg1, arg2, arg3) {
       var w;
       var h;
       var resizable = "no";
       var scroll = "no";
       var status = "no";
       var mdattrs = arg3.split(";");
       for (i = 0; i < mdattrs.length; i++) {
          var mdattr = mdattrs[i].split(":");
          var n = mdattr[0];
          var v = mdattr[1];
          if (n) { n = n.trim().toLowerCase(); }
          if (v) { v = v.trim().toLowerCase(); }
          if (n == "dialogheight") {
            h = v.replace("px", "");
         } else if (n == "dialogwidth") {
            w = v.replace("px", "");
         } else if (n == "resizable") {
            resizable = v;
         } else if (n == "scroll") {
            scroll = v;
         } else if (n == "status") {
            status = v;
         }
      }
      var left = window.screenX + (window.outerWidth / 2) - (w / 2);
      var top = window.screenY + (window.outerHeight / 2) - (h / 2);
      var targetWin = window.open(arg1, arg2, 'toolbar=no, location=no, directories=no, status=' + status + ', menubar=no, scrollbars=' + scroll + ', resizable=' + resizable + ', copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
      targetWin.focus();
   };
}
function saveClickChromeSKUsorPNS()
{
    var skuOrPNList = document.getElementById('SkuOrPNListTextBox').value;
    var skuOrPNMode = document.getElementById('SkuOrPNDropDownList').selectedIndex;
    window.returnValue = [skuOrPNList, skuOrPNMode];
    window.opener.receiveSKUsorPNsFromModalWindowPopup([skuOrPNList, skuOrPNMode]);
    window.close();
}
window.receiveSKUsorPNsFromModalWindowPopup = function(result) {
	skuOrPNMode = result[1];
	var skuOrPNListDisplay = trimString(result[0]);
	skuOrPNListDisplay = replace(skuOrPNListDisplay, "\n", "; ");
	skuOrPNListDisplay = replace(skuOrPNListDisplay, "\r\n", "; ");
	if (skuOrPNMode == 0 && skuOrPNListDisplay.length > 0) {
		skuOrPNListDisplay = "SKUs: " + skuOrPNListDisplay;
	}
	if (skuOrPNMode == 1 && skuOrPNListDisplay.length > 0) {
		skuOrPNListDisplay = "PNs: " + skuOrPNListDisplay;
	}
	document.getElementById("SkuOrPNListTextBox").value = skuOrPNListDisplay;
};
function saveClickChromePriority()
{
    var priority = new String(document.getElementById('PriorityTextBox').value);
        var error = false;
    if (priority.length == 0)
    {
        error = true;
    }
    if (!isInteger(priority))
    {
        error = true;
    }
    if(!error)
    {
        window.returnValue = priority.toString();
        window.opener.receivePriorityFromModalWindowPopup(priority.toString());
        window.close();
    }
    else
    {
        alert('error: incorrect format');
    }
}
window.receivePriorityFromModalWindowPopup = function(priority) {
    var ids = "id=" + getLabelValues("ProductIdLabel")[0];
	if (ids == null) {
		alert("Invalid operation for selected products.");
		return;
	}
	var skuIds = "sku_id=" + getLabelValues2("SkuIdLabel");
	var request = getPostRequest(
				"Handlers/ProductsManagement.ashx?action=change_priority&priority=" + priority,
				ids + "&" + skuIds);
	if (request == "ok") {
		updateLabelsValues(["PriorityLabel"], [priority]);
	}
	else {
		alert(request);
	}
};
