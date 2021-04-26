// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log("getting all divs");
    chrome.tabs.executeScript({
        code:   'dom_be_gone_div = true;'
                + 'if(typeof document.onmouseover !== "undefined") old_onmouseover = document.onmouseover;'
                + 'if(typeof document.onclick !== "undefined") old_onclick = document.onclick;'
                + 'document.onclick = function(e){'
                + 'e.preventDefault();'
                + 'var targ;'
                + 'if (!e) var e = window.event;'
                + 'if(e.target){targ = e.target;} else if(e.srcElement){targ = e.srcElement;};'
                + 'targ.onclick = function(){return false;};'
                + 'targ.remove();'
                + 'document.onmouseover = old_onmouseover;'
                + 'document.onclick = old_onclick;'
                + '}; '
                + 'document.onmouseover = function(e){'
                + 'var targ;'
                + 'if (!e) var e = window.event;'
                + 'if(e.target){targ = e.target;} else if(e.srcElement){targ = e.srcElement;};'
                + 'targ.style.boxShadow="-1px -1px 8px 4px rgba(94,204,255,0.79)";'
                + 'targ.onmouseout = function(e){'
                + 'targ.style.boxShadow="none";'
                + '}'
                + '}'
    });
});
