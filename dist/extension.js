"use strict";var Yt=Object.create;var P=Object.defineProperty;var jt=Object.getOwnPropertyDescriptor;var Nt=Object.getOwnPropertyNames;var Dt=Object.getPrototypeOf,Jt=Object.prototype.hasOwnProperty;var Wt=(t,n)=>{for(var e in n)P(t,e,{get:n[e],enumerable:!0})},rt=(t,n,e,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of Nt(n))!Jt.call(t,i)&&i!==e&&P(t,i,{get:()=>n[i],enumerable:!(o=jt(n,i))||o.enumerable});return t};var v=(t,n,e)=>(e=t!=null?Yt(Dt(t)):{},rt(n||!t||!t.__esModule?P(e,"default",{value:t,enumerable:!0}):e,t)),qt=t=>rt(P({},"__esModule",{value:!0}),t);var be={};Wt(be,{activate:()=>he,deactivate:()=>ve});module.exports=qt(be);var d=v(require("vscode"));var J=v(require("os")),m=v(require("path")),p=v(require("fs/promises")),ct=v(require("vscode"));function Kt(){let t=ct.env.appName.toLowerCase();return t.includes("antigravity")?"antigravity":t.includes("cursor")?"cursor":t.includes("kiro")?"kiro":"vscode"}async function Ut(){try{return(await p.readFile("/proc/version","utf-8")).toLowerCase().includes("microsoft")}catch{return!1}}async function Ht(){let t=[],n=new Set(["public","default","default user","all users"]);for(let e of["c","d"]){let o=`/mnt/${e}/Users`;try{let i=await p.readdir(o);for(let s of i){if(n.has(s.toLowerCase()))continue;let a=m.join(o,s);try{(await p.stat(a)).isDirectory()&&t.push(a)}catch{}}}catch{}}return t}async function Vt(){let t=[],n=new Set(["root"]);for(let e of["\\\\wsl$","\\\\wsl.localhost"]){let o;try{o=await p.readdir(e)}catch{continue}for(let i of o){let s=m.join(e,i,"home");try{let a=await p.readdir(s);for(let r of a){if(n.has(r))continue;let l=m.join(s,r);try{(await p.stat(l)).isDirectory()&&t.push(l)}catch{}}}catch{}}}return t}async function Qt(t){let n=process.platform,e=[],o={vscode:[{local:".vscode",server:".vscode-server"}],cursor:[{local:".cursor",server:".cursor-server"}],antigravity:[{local:".antigravity-ide",server:".antigravity-ide-server"},{local:".antigravity",server:".antigravity-server"}],kiro:[{local:".kiro",server:".kiro-server"}]},i=(s,a)=>{for(let{local:r,server:l}of o[a])e.push(m.join(s,r,"extensions")),e.push(m.join(s,l,"extensions"))};if(n==="win32"){let s=process.env.USERPROFILE;s&&i(s,t);let a=await Vt();for(let r of a)for(let{server:l}of o[t])e.push(m.join(r,l,"extensions"))}else if(n==="darwin")i(J.homedir(),t);else if(n==="linux"){let s=J.homedir();i(s,t);try{let a=await p.readdir("/home");for(let r of a){let l=m.join("/home",r);if(l!==s)try{(await p.stat(l)).isDirectory()&&i(l,t)}catch{}}}catch{}if(await Ut()){let a=await Ht();for(let r of a)i(r,t)}}return e}async function A(t){try{return await p.access(t),!0}catch{return!1}}async function g(){let t=Kt(),n=await Qt(t),e=[];for(let o of n){if(!await A(o))continue;let i;try{i=await p.readdir(o)}catch{continue}let s=i.filter(a=>a.startsWith("anthropic.claude-code-")).sort();for(let a of s){let r=m.join(o,a),l=m.join(r,"webview","index.css"),u=m.join(r,"webview","index.js"),h=m.join(r,"extension.js");await A(l)&&e.push({dir:r,cssPath:l,jsPath:await A(u)?u:null,extensionJsPath:await A(h)?h:null,name:a})}}return e}var c=v(require("fs/promises")),St=v(require("path"));var R="/* RTL Text Support for Claude Code VS Code / Cursor / Antigravity Extension - Added by script */",q="/* End RTL Text Support for Claude Code VS Code / Cursor / Antigravity Extension */",K="/* RTL Toggle Button - Added by script */",lt="/* End RTL Toggle Button */",zt="/* RTL-MODE: active */",B="/* RTL-MODE: always */",k="/* RTL-MODE: auto */",W=".YBYrtl ",Gt=`
/* ==========================================
   Toggle button - always visible
   ========================================== */


#yby-rtl-btn {
    font-size: 14px;
    font-weight: bold;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: transparent;
    color: var(--vscode-foreground);
    opacity: 0.5;
    transition: opacity 0.2s, background 0.2s;
    flex-shrink: 0;
}

#yby-rtl-btn:hover {
    opacity: 1;
}

#yby-rtl-btn.yby-active {
    opacity: 1;
    background: var(--vscode-button-background, rgba(128, 128, 128, 0.3));
}

/* Fallback wrapper when header is absent (active session on startup) */
#yby-rtl-btn-wrap {
    display: flex;
    justify-content: flex-end;
    padding: 0 8px;
}
`;function dt(t){return`
/* ==========================================
   RTL - Arabic content (active when .YBYrtl is on #root)
   ========================================== */

/* Messages container */
${t}[class*="messagesContainer_"] {
    direction: rtl;
}

/* User messages */
${t}[class*="userMessage_"],
${t}[class*="userMessageContainer_"] {
    direction: rtl;
    unicode-bidi: isolate;
    text-align: right !important;
    align-items: flex-end !important;
    margin-left: auto !important;
    margin-right: 0 !important;
}

${t}[class*="content_"][class*="xGDvVg"],
${t}[class*="content_"] > span {
    unicode-bidi: isolate;
}

/* Claude's markdown responses (excluding thinking block) */
${t}[class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) {
    direction: rtl;
    unicode-bidi: isolate;
}

${t}[class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) > :is(p, ul, ol, h1, h2, h3, h4, blockquote),
${t}[class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) > :is(ul, ol) li {
    text-align: right;
}

${t}[class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) a {
    unicode-bidi: isolate;
}

/* Question/answer blocks */
${t}[class*="questionBlock_"],
${t}[class*="questionHeader_"],
${t}[class*="answerText_"],
${t}[class*="optionText_"],
${t}[class*="optionContent_"] {
    direction: rtl;
    unicode-bidi: isolate;
}

${t?`/* Force RTL on all paragraphs when toggle is active */
${t}p {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

`:""}/* Prompt input \u2014 always auto-detect direction by first character */
[class*="messageInputContainer_"] > * {
    unicode-bidi: isolate;
    text-align: start;
}
${t?`
/* Force RTL on input when toggle is active */
${t}[class*="messageInputContainer_"] > * {
    direction: rtl;
    unicode-bidi: isolate;
}
`:""}`}function U(t){return`
/* ==========================================
   LTR overrides - Code, Tools, UI
   ========================================== */

${t}[class*="slashCommandMessage_"],
${t}[class*="slashCommandResultMessage_"],
${t}[class*="header_"][class*="aqhumA"],
${t}[class*="sessionsButtonText_"],
${t}[class*="dotSuccess_"],
${t}[class*="dotFailure_"],
${t}[class*="dotProgress_"],
${t}[class*="dotWarning_"],
${t}[class*="progressContent_"],
${t}[class*="inputContainer_"][class*="cKsPxg"],
${t}[class*="inputWrapper_"],
${t}[class*="iconButton_"],
${t}[class*="copyButton_"],
${t}[class*="actionButton_"],
${t}[class*="selectionAttachment_"],
${t}[class*="attachmentInfo_"],
${t}[class*="attachmentText_"],
${t}[class*="errorMessage_"],
${t}[class*="secondaryLine_"],
${t}[class*="todoListContainer_"],
${t}[class*="todoList_"],
${t}[class*="todoItem_"],
${t}[class*="auth_"],
${t}[class*="authUrl"] {
    direction: ltr !important;
}

/* Code blocks - LTR + alignment */
${t}pre,
${t}code,
${t}[class*="codeBlockWrapper_"] {
    direction: ltr !important;
    unicode-bidi: isolate !important;
    text-align: left !important;
}

/* Tool containers - LTR + alignment */
${t}[class*="toolUse_"],
${t}[class*="toolSummary_"],
${t}[class*="toolBody_"],
${t}[class*="toolBodyGrid_"],
${t}[class*="toolBodyRow_"],
${t}[class*="toolBodyRowContent_"],
${t}[class*="toolBodyRowLabel_"],
${t}[class*="toolResult_"],
${t}[class*="toolNameText_"],
${t}[class*="toolReference_"] {
    direction: ltr !important;
    unicode-bidi: isolate !important;
    text-align: left !important;
}

/* Thinking block - LTR + alignment */
${t}[class*="thinking_"],
${t}[class*="thinkingContent_"],
${t}[class*="thinkingContainer_"],
${t}[class*="thinkingHeader_"],
${t}[class*="spinnerRow_"],
${t}[class*="timelineMessage_"]:has([class*="thinking_"]) {
    direction: ltr !important;
    unicode-bidi: isolate !important;
    text-align: left !important;
}

${t}[class*="thinkingContent_"] [class*="root_"] :is(ul, ol, li) {
    direction: ltr !important;
    text-align: left !important;
}
`}var Xt=`
/* ==========================================
   RTL - Auto mode (per-bubble detection)
   ========================================== */

/* Self-matching: bubble element itself */
.YBYrtl[class*="userMessage_"],
.YBYrtl[class*="userMessageContainer_"] {
    direction: rtl;
    unicode-bidi: isolate;
    text-align: right !important;
    align-items: flex-end !important;
    margin-left: auto !important;
    margin-right: 0 !important;
}

/* Descendant: content inside RTL bubbles */
.YBYrtl [class*="content_"][class*="xGDvVg"],
.YBYrtl [class*="content_"] > span {
    unicode-bidi: isolate;
}

/* Claude's markdown responses (excluding thinking block) */
.YBYrtl [class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) {
    direction: rtl;
    unicode-bidi: isolate;
}

.YBYrtl [class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) > :is(p, ul, ol, h1, h2, h3, h4, blockquote),
.YBYrtl [class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) > :is(ul, ol) li {
    text-align: right;
}

.YBYrtl [class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) a {
    unicode-bidi: isolate;
}

/* Prompt input container \u2014 no .YBYrtl ancestor in Auto mode, use #root
   for specificity to override *{unicode-bidi:bidi-override} */
#root [class*="messageInputContainer_"] > * {
    unicode-bidi: isolate;
    text-align: start;
}

/* Question/answer blocks */
.YBYrtl [class*="questionBlock_"],
.YBYrtl [class*="questionHeader_"],
.YBYrtl [class*="answerText_"],
.YBYrtl [class*="optionText_"],
.YBYrtl [class*="optionContent_"] {
    direction: rtl;
    unicode-bidi: isolate;
}

`,Zt=`
/* ==========================================
   Permission requests \u2014 dynamic RTL (JS-driven)
   ========================================== */

/* Container-level RTL when question contains RTL text */
.YBYperm-rtl[class*="permissionsContainer_"],
.YBYperm-rtl [class*="permissionRequestContent_"] {
    direction: rtl;
}

/* Question is LTR but individual option text has RTL */
.YBYopt-rtl[class*="optionLabel_"],
.YBYopt-rtl[class*="optionDescription_"] {
    direction: rtl;
    text-align: right;
}

/* Permission elements that must stay LTR */
.YBYperm-rtl [class*="buttonContainer_"],
.YBYperm-rtl [class*="keyboardHints_"] {
    direction: ltr !important;
}

/* Free-text input \u2014 auto-detect direction */
[class*="otherInput_"] [contenteditable] {
    unicode-bidi: isolate;
    text-align: start;
}
`,te=`
(function() {
    var PERM_RTL_RE = /[\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF]/;
    var PERM_SEL = '[class*="permissionsContainer_"]';

    var LABEL_SEL = '[class*="optionLabel_"],[class*="optionDescription_"]';

    function handleContainer(container) {
        var question = container.querySelector('[class*="questionTextLarge_"]');
        if (question && PERM_RTL_RE.test(question.textContent || '')) {
            container.classList.add('YBYperm-rtl');
            return;
        }
        tagLabels(container);
    }

    function tagLabels(root) {
        var els = root.querySelectorAll(LABEL_SEL);
        for (var k = 0; k < els.length; k++) {
            if (PERM_RTL_RE.test(els[k].textContent || '')) {
                els[k].classList.add('YBYopt-rtl');
            }
        }
    }

    function scanPermissions() {
        var containers = document.querySelectorAll(PERM_SEL);
        for (var i = 0; i < containers.length; i++) {
            handleContainer(containers[i]);
        }
    }

    var permObs = new MutationObserver(function(muts) {
        for (var i = 0; i < muts.length; i++) {
            var added = muts[i].addedNodes;
            for (var j = 0; j < added.length; j++) {
                var nd = added[j];
                if (nd.nodeType !== 1) continue;
                if (nd.matches && nd.matches(PERM_SEL)) { handleContainer(nd); continue; }
                /* Re-rendered option \u2014 re-tag labels only if question was LTR */
                var parent = nd.closest ? nd.closest(PERM_SEL) : null;
                if (parent && !parent.classList.contains('YBYperm-rtl')) { tagLabels(parent); continue; }
                if (nd.querySelectorAll) {
                    var nested = nd.querySelectorAll(PERM_SEL);
                    for (var k = 0; k < nested.length; k++) handleContainer(nested[k]);
                }
            }
        }
    });

    if (document.body) {
        scanPermissions();
        permObs.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            scanPermissions();
            permObs.observe(document.body, { childList: true, subtree: true });
        });
    }
})();
`,b={textFont:"",codeFont:""};function H(t){let n=[];return t.textFont&&n.push(`
/* Custom text font */
[class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) > :is(p, ul, ol, h1, h2, h3, h4, blockquote),
[class*="root_"]:not([class*="thinkingContent_"] [class*="root_"]) > :is(ul, ol) li,
[class*="userMessage_"],
[class*="content_"],
[class*="messageInputContainer_"] [contenteditable],
[class*="mentionMirror_"] {
    font-family: "${t.textFont}", sans-serif !important;
}`),t.codeFont&&n.push(`
/* Custom code font */
pre,
code,
[class*="codeBlockWrapper_"] {
    font-family: "${t.codeFont}", monospace !important;
}

/* Diff editor \u2014 Monaco sets font-family as inline style, needs !important */
[class*="diffEditorWrapper_"] .view-lines,
[class*="diffEditorWrapper_"] .view-overlays,
[class*="diffEditorWrapper_"] .margin-view-overlays,
[class*="diffEditorWrapper_"] .cursor,
[class*="diffEditorWrapper_"] .inputarea {
    font-family: "${t.codeFont}", monospace !important;
}`),n.join(`
`)}function V(t){let n=[];return t.textFont&&n.push(`
#content {
    font-family: "${t.textFont}", sans-serif !important;
}`),t.codeFont&&n.push(`
#content pre,
#content code {
    font-family: "${t.codeFont}", monospace !important;
}`),n.join(`
`)}function Q(t,n){return`
${R}
${t}
${n.join(`
`)}
${q}
`}function ut(t=b){return Q(zt,[Gt,dt(W),U(W),H(t)])}function ft(t=b){return Q(B,[dt(""),U(""),H(t)])}function pt(t=b){return Q(k,[Xt,U(W),Zt,H(t)])}var mt=`
/* RTL Toggle Button - Added by script */
(function() {
    var BTN_ID = 'yby-rtl-btn';
    var WRAP_ID = 'yby-rtl-btn-wrap';
    var ROOT_CLASS = 'YBYrtl';

    function mkBtn() {
        var btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.textContent = '\\u21C4';
        btn.title = 'Toggle RTL mode';

        btn.addEventListener('click', function() {
            var root = document.getElementById('root');
            if (!root) return;
            var isActive = root.classList.toggle(ROOT_CLASS);
            btn.classList.toggle('yby-active', isActive);
        });

        return btn;
    }

    function tryInsertButton() {
        var header = document.querySelector('[class*="header_"]');
        var existing = document.getElementById(BTN_ID);

        // Already placed in the header \u2014 nothing to do
        if (existing && header && header.contains(existing)) return;

        // Header appeared but button is in fallback position \u2014 migrate to header
        if (header && existing) {
            var oldWrap = document.getElementById(WRAP_ID);
            if (oldWrap) oldWrap.remove(); else existing.remove();
            header.appendChild(mkBtn());
            return;
        }

        // Header exists, no button yet \u2014 place in header
        if (header && !existing) {
            header.appendChild(mkBtn());
            return;
        }

        // No header, button already in fallback \u2014 keep it
        if (existing) return;

        // No header, no button \u2014 fallback: active session without header
        // Place above the input prompt when messages are visible
        var input = document.querySelector('[class*="inputContainer_"]');
        if (!input || !input.parentNode) return;
        if (!document.querySelector('[class*="messagesContainer_"]')) return;

        var wrap = document.createElement('div');
        wrap.id = WRAP_ID;
        wrap.appendChild(mkBtn());
        input.parentNode.insertBefore(wrap, input);
    }

    // View mode button: hides input field and user message bubbles
    var VIEW_ID = 'yby-view-btn';
    var VIEW_CLASS = 'YBYview';
    function ensureViewStyle() {
        if (document.getElementById('yby-view-style')) return;
        var st = document.createElement('style');
        st.id = 'yby-view-style';
        st.textContent =
            '#' + VIEW_ID + '{font-size:14px;width:28px;height:28px;border:none;border-radius:4px;cursor:pointer;background:transparent;color:var(--vscode-foreground);opacity:.5;transition:opacity .2s,background .2s;flex-shrink:0;}' +
            '#' + VIEW_ID + ':hover{opacity:1;}' +
            '#' + VIEW_ID + '.yby-active{opacity:1;background:var(--vscode-button-background,rgba(128,128,128,.3));}' +
            '.' + VIEW_CLASS + ' [class*="inputContainer_"],' +
            '.' + VIEW_CLASS + ' [class*="userMessageContainer_"],' +
            '.' + VIEW_CLASS + ' [class*="userMessage_"]{display:none !important;}';
        document.head.appendChild(st);
    }
    function tryInsertViewButton() {
        var rtl = document.getElementById(BTN_ID);
        if (!rtl || !rtl.parentNode) return;
        var v = document.getElementById(VIEW_ID);
        if (v && v.previousSibling === rtl) return;
        if (v) v.remove();
        ensureViewStyle();
        v = document.createElement('button');
        v.id = VIEW_ID;
        v.textContent = '\u{1F441}';
        v.title = 'Toggle view mode (hide input & my messages)';
        var root = document.getElementById('root');
        if (root && root.classList.contains(VIEW_CLASS)) v.classList.add('yby-active');
        v.addEventListener('click', function() {
            var r = document.getElementById('root');
            if (!r) return;
            v.classList.toggle('yby-active', r.classList.toggle(VIEW_CLASS));
        });
        rtl.parentNode.insertBefore(v, rtl.nextSibling);
    }

    // Font size buttons (+ / -): 4 levels, applied to messages container
    // var FS_LEVELS = [0.9, 1, 1.15, 1.3];
    var FS_LEVELS = [1, 1.3, 1.5 , 1.8];
    var FS_KEY = 'yby-font-level';
    var fsLevel = 1;
    try { var sv = parseInt(localStorage.getItem(FS_KEY), 10); if (sv >= 0 && sv < FS_LEVELS.length) fsLevel = sv; } catch (e) {}
    function applyFont() {
        var st = document.getElementById('yby-font-style');
        if (!st) { st = document.createElement('style'); st.id = 'yby-font-style'; document.head.appendChild(st); }
        st.textContent = '[class*="messagesContainer_"]{zoom:' + FS_LEVELS[fsLevel] + ';}' +
            '#yby-fs-minus,#yby-fs-plus{font-size:14px;font-weight:bold;width:28px;height:28px;border:none;border-radius:4px;cursor:pointer;background:transparent;color:var(--vscode-foreground);opacity:.5;transition:opacity .2s;flex-shrink:0;}' +
            '#yby-fs-minus:hover,#yby-fs-plus:hover{opacity:1;}' +
            '#yby-fs-minus:disabled,#yby-fs-plus:disabled{opacity:.2;cursor:default;}';
        var m = document.getElementById('yby-fs-minus'), p = document.getElementById('yby-fs-plus');
        var t = 'Text size: ' + (fsLevel + 1) + '/' + FS_LEVELS.length;
        if (m) { m.disabled = fsLevel === 0; m.title = 'Smaller text (' + t + ')'; }
        if (p) { p.disabled = fsLevel === FS_LEVELS.length - 1; p.title = 'Larger text (' + t + ')'; }
    }
    function mkFsBtn(id, label, delta) {
        var b = document.createElement('button');
        b.id = id;
        b.textContent = label;
        b.addEventListener('click', function() {
            fsLevel = Math.max(0, Math.min(FS_LEVELS.length - 1, fsLevel + delta));
            try { localStorage.setItem(FS_KEY, String(fsLevel)); } catch (e) {}
            applyFont();
        });
        return b;
    }
    function tryInsertFontButtons() {
        var v = document.getElementById(VIEW_ID);
        if (!v || !v.parentNode) return;
        var m = document.getElementById('yby-fs-minus'), p = document.getElementById('yby-fs-plus');
        if (m && p && v.nextSibling === m && m.nextSibling === p) return;
        if (m) m.remove();
        if (p) p.remove();
        m = mkFsBtn('yby-fs-minus', '\u2212', -1);
        p = mkFsBtn('yby-fs-plus', '+', 1);
        v.parentNode.insertBefore(m, v.nextSibling);
        v.parentNode.insertBefore(p, m.nextSibling);
        applyFont();
    }
    applyFont();

    // Wait for React to render
    var observer = new MutationObserver(function() {
        tryInsertButton();
        tryInsertViewButton();
        tryInsertFontButtons();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState !== 'loading') {
        tryInsertButton();
        tryInsertViewButton();
        tryInsertFontButtons();
    } else {
        document.addEventListener('DOMContentLoaded', function() { tryInsertButton(); tryInsertViewButton(); tryInsertFontButtons(); });
    }
})();
/* End RTL Toggle Button */
`,x="/* RTL Plan Preview Start */",z="/* RTL Plan Preview End */",gt="/* RTL Plan Preview JS Start */",ht="/* RTL Plan Preview JS End */",vt=`
#yby-plan-rtl-btn {
    position: fixed;
    top: 8px;
    right: 8px;
    font-size: 14px;
    font-weight: bold;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    opacity: 0.7;
    z-index: 200;
    transition: opacity 0.2s;
}
#yby-plan-rtl-btn:hover { opacity: 1; }
#yby-plan-rtl-btn.yby-active { opacity: 1; }
`,bt=`
#content.YBYrtl {
    direction: rtl;
    text-align: right;
}
#content.YBYrtl blockquote {
    border-left: none;
    border-right: 3px solid var(--vscode-textBlockQuote-border);
    padding-left: 0;
    padding-right: 12px;
}
#content.YBYrtl ul, #content.YBYrtl ol {
    padding-left: 0;
    padding-right: 32px;
}
#content.YBYrtl th, #content.YBYrtl td {
    text-align: right;
}
#content.YBYrtl pre,
#content.YBYrtl code {
    direction: ltr;
    unicode-bidi: isolate;
    text-align: left;
}
`,ee=`
#content {
    direction: rtl;
    text-align: right;
}
#content blockquote {
    border-left: none;
    border-right: 3px solid var(--vscode-textBlockQuote-border);
    padding-left: 0;
    padding-right: 12px;
}
#content ul, #content ol {
    padding-left: 0;
    padding-right: 32px;
}
#content th, #content td {
    text-align: right;
}
#content pre,
#content code {
    direction: ltr;
    unicode-bidi: isolate;
    text-align: left;
}
`;function wt(t=b){return x+`
`+vt+bt+V(t)+`
`+z}function _t(t=b){return x+`
`+ee+V(t)+`
`+z}function yt(t=b){return x+`
`+vt+bt+V(t)+`
`+z}var Rt=gt+`
(function() {
    var btn = document.createElement('button');
    btn.id = 'yby-plan-rtl-btn';
    btn.textContent = '\\u21C4';
    btn.title = 'Toggle RTL';
    btn.addEventListener('click', function() {
        var c = document.getElementById('content');
        if (c) {
            var isRtl = c.classList.toggle('YBYrtl');
            btn.classList.toggle('yby-active', isRtl);
        }
    });
    document.body.appendChild(btn);
})();
`+ht,xt=gt+`
(function() {
    var RTL_RE = /[\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF]/;
    var content = document.getElementById('content');
    if (!content) return;
    var btn = document.createElement('button');
    btn.id = 'yby-plan-rtl-btn';
    btn.textContent = '\\u21C4';
    btn.title = 'Toggle RTL';
    var manualOverride = false;
    btn.addEventListener('click', function() {
        manualOverride = true;
        var isRtl = content.classList.toggle('YBYrtl');
        btn.classList.toggle('yby-active', isRtl);
    });
    document.body.appendChild(btn);
    var obs = new MutationObserver(function() {
        if (manualOverride) return;
        if (RTL_RE.test(content.textContent || '')) {
            content.classList.add('YBYrtl');
            btn.classList.add('yby-active');
        } else {
            content.classList.remove('YBYrtl');
            btn.classList.remove('yby-active');
        }
    });
    obs.observe(content, { childList: true, subtree: true });
})();
`+ht,Lt=`
/* RTL Toggle Button - Added by script */
(function() {
    var RTL = /[\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF]/;
    var CLS = 'YBYrtl';

    /* Bubble selectors \u2014 Claude responses and user messages */
    var BUBBLE_SEL = '[class*="timelineMessage_"],[class*="userMessageContainer_"]';
    var autoOn = true;
    var observers = [];

    /* Watch a single bubble \u2014 add .YBYrtl when RTL text is found, then stop watching */
    function watchBubble(el) {
        if (!autoOn) return;
        if (!el.matches || !el.matches(BUBBLE_SEL)) return;
        if (el.classList.contains(CLS)) return;

        /* Check immediately */
        if (RTL.test(el.textContent || '')) {
            el.classList.add(CLS);
            return;
        }

        /* Not found yet \u2014 observe this bubble for changes */
        var obs = new MutationObserver(function() {
            if (RTL.test(el.textContent || '')) {
                el.classList.add(CLS);
                obs.disconnect();
            }
        });
        obs.observe(el, { childList: true, subtree: true, characterData: true });
        observers.push(obs);
    }

    var root = document.getElementById('root');
    if (!root) return;

    /* Initial scan */
    root.querySelectorAll(BUBBLE_SEL).forEach(watchBubble);

    /* Watch for new bubbles appearing */
    var rootObs = new MutationObserver(function(muts) {
        for (var i = 0; i < muts.length; i++) {
            var m = muts[i];
            for (var j = 0; j < m.addedNodes.length; j++) {
                var nd = m.addedNodes[j];
                if (nd.nodeType !== 1) continue;
                if (nd.matches) watchBubble(nd);
                if (nd.querySelectorAll) {
                    nd.querySelectorAll(BUBBLE_SEL).forEach(watchBubble);
                }
            }
        }
    });
    rootObs.observe(root, { childList: true, subtree: true });

    /* Esc turns Auto mode off for this session (only while it is on) */
    document.addEventListener('keydown', function(e) {
        if (!autoOn || e.key !== 'Escape') return;
        autoOn = false;
        rootObs.disconnect();
        observers.forEach(function(o) { o.disconnect(); });
        observers = [];
        root.querySelectorAll('.' + CLS).forEach(function(el) { el.classList.remove(CLS); });
    }, true);
})();
${te}
/* End RTL Toggle Button */
`;var $="*{direction:ltr;unicode-bidi:bidi-override}";async function L(t){try{return await c.access(t),!0}catch{return!1}}function ne(t){return new Promise(n=>setTimeout(n,t))}async function E(t,n){let e=St.join(t,".ybyrtl.lock"),o=3e4,i=100,s=2e4,a,r=Date.now();for(;;)try{a=await c.open(e,"wx"),await a.writeFile(String(process.pid));break}catch(l){let u=l;if(u.code!=="EEXIST")throw u;try{let h=await c.stat(e);if(Date.now()-h.mtimeMs>o){await c.rm(e,{force:!0});continue}}catch{continue}if(Date.now()-r>s)break;await ne(i)}try{return await n()}finally{a&&(await a.close().catch(()=>{}),await c.rm(e,{force:!0}).catch(()=>{}))}}async function I(t,n){let e=`${t}.ybytmp.${process.pid}`;try{await c.writeFile(e,n,"utf-8"),await c.rename(e,t)}catch(o){throw await c.rm(e,{force:!0}).catch(()=>{}),o}}async function oe(t){try{return(await c.readFile(t,"utf-8")).includes(R)}catch{return!1}}async function se(t){try{return(await c.readFile(t,"utf-8")).includes(B)}catch{return!1}}async function ie(t){try{return(await c.readFile(t,"utf-8")).includes(k)}catch{return!1}}async function G(t){if(!t)return!1;try{return(await c.readFile(t,"utf-8")).includes(K)}catch{return!1}}function ae(t,n,e){let o=t.indexOf(n),i=t.indexOf(e);if(o===-1||i===-1)return t;let s=o,a=i+e.length;return s>0&&t[s-1]===`
`&&(s-=1),t.substring(0,s)+t.substring(a)}async function C(t,n,e,o,i){try{let s=t+".bak";await L(s)?(await c.copyFile(s,t),o.push(`  ${e}: Restored from backup`)):(await c.copyFile(t,s),o.push(`  ${e}: Backup created: ${s}`));let a=await c.readFile(t,"utf-8");i?.fixBidi&&a.includes($)&&(a=a.replace($,""),o.push(`  ${e}: Removed bidi-override rule`));let r=a+`
`+n,l=(await c.stat(s)).size;return Buffer.byteLength(r,"utf-8")<l?(o.push(`  ${e}: Aborted \u2014 result (${Buffer.byteLength(r,"utf-8")}B) smaller than backup (${l}B); corruption guard, file left untouched`),!1):(await I(t,r),!0)}catch(s){let a=s;return a.code==="EPERM"||a.code==="EACCES"?(o.push(`  ${e}: Permission denied: ${t}`),o.push("       Try running with elevated privileges")):o.push(`  ${e}: Error: ${a.message}`),!1}}async function X(t,n,e){let o=t+".bak";if(!await L(o))return!1;try{return await c.copyFile(o,t),await c.unlink(o),e.push(`  ${n}: Restored from backup (backup deleted)`),!0}catch(i){return e.push(`  ${n}: Error restoring: ${i.message}`),!1}}var Ct='<div id="content"></div>';async function Z(t,n,e,o){if(!t)return o.push("  Plan: extension.js not found, skipping Plan Preview injection"),!1;try{let i=t+".bak";await L(i)?(await c.copyFile(i,t),o.push("  Plan: Restored extension.js from backup")):(await c.copyFile(t,i),o.push(`  Plan: Backup created: ${i}`));let s=await c.readFile(t,"utf-8"),a=s.indexOf(Ct);if(a===-1)return o.push("  Plan: Plan Preview template not found in extension.js (older Claude Code version?)"),!1;let l=s.lastIndexOf("</style>",a);if(l===-1)return o.push("  Plan: Could not locate </style> in Plan Preview template"),!1;if(s=s.substring(0,l)+`
`+n+`
`+s.substring(l),e){let h=s.indexOf(Ct),D=s.indexOf("vscode.postMessage({ type: 'ready' })",h);D===-1?o.push("  Plan: Could not locate JS injection point in Plan Preview template"):(s=s.substring(0,D)+e+`
      `+s.substring(D),o.push("  Plan: RTL JS injected into Plan Preview"))}let u=(await c.stat(i)).size;return Buffer.byteLength(s,"utf-8")<u?(o.push(`  Plan: Aborted \u2014 result (${Buffer.byteLength(s,"utf-8")}B) smaller than backup (${u}B); corruption guard, file left untouched`),!1):(await I(t,s),o.push("  Plan: RTL CSS injected into Plan Preview"),!0)}catch(i){let s=i;return s.code==="EPERM"||s.code==="EACCES"?o.push(`  Plan: Permission denied: ${t}`):o.push(`  Plan: Error: ${s.message}`),!1}}async function Tt(t){if(!t)return!1;try{return(await c.readFile(t,"utf-8")).includes(x)}catch{return!1}}async function w(t){let n=[];for(let e of t){let o="";try{o=await c.readFile(e.cssPath,"utf-8")}catch{}let i=o.includes(R),s=i&&o.includes(k),a=i&&!s&&o.includes(B);n.push({extension:e,cssInstalled:i,jsInstalled:await G(e.jsPath),planPreviewInstalled:await Tt(e.extensionJsPath),cssBackupExists:await L(e.cssPath+".bak"),jsBackupExists:e.jsPath?await L(e.jsPath+".bak"):!1,mode:s?"auto":a?"always":i?"active":"inactive"})}return n}async function Pt(t,n){let e=[],o=!1;return await C(t.cssPath,ut(n),"CSS",e)&&(e.push(`  CSS: RTL support added to ${t.name}`),o=!0),t.jsPath?await C(t.jsPath,mt,"JS",e)&&(e.push(`  JS:  Toggle button added to ${t.name}`),o=!0):e.push("  JS:  index.js not found, skipping button injection"),await Z(t.extensionJsPath,wt(n),Rt,e)&&(o=!0),{messages:e,changed:o}}async function At(t,n){let e=[],o=!1;return await C(t.cssPath,ft(n),"CSS",e,{fixBidi:!0})&&(e.push(`  CSS: RTL Always support added to ${t.name}`),o=!0),t.jsPath&&await G(t.jsPath)?await X(t.jsPath,"JS",e)&&(o=!0):e.push("  JS:  No button to remove (Always mode \u2014 no JS needed)"),await Z(t.extensionJsPath,_t(n),null,e)&&(o=!0),{messages:e,changed:o}}async function Bt(t,n){let e=[],o=!1;return await C(t.cssPath,pt(n),"CSS",e,{fixBidi:!0})&&(e.push(`  CSS: RTL Auto support added to ${t.name}`),o=!0),t.jsPath?await C(t.jsPath,Lt,"JS",e)&&(e.push(`  JS:  Auto-detection script added to ${t.name}`),o=!0):e.push("  JS:  index.js not found, skipping auto-detection injection"),await Z(t.extensionJsPath,yt(n),xt,e)&&(o=!0),{messages:e,changed:o}}async function re(t,n){let e=await ie(t.cssPath),o=!e&&await se(t.cssPath),i=e?await Bt(t,n):o?await At(t,n):await Pt(t,n);try{let s=await c.readFile(t.cssPath,"utf-8");if(s.includes($)){let a=s.replace($,"");await I(t.cssPath,a),i.messages.push("  CSS: Removed bidi-override rule")}}catch(s){i.messages.push(`  CSS: Error fixing BiDi: ${s.message}`)}return i}async function Et(t,n,e,o,i,s,a){if(!n)return a.push(`  ${i}: RTL not installed in ${s}`),!1;if(await X(t,i,a))return!0;try{let r=await c.readFile(t,"utf-8"),l=ae(r,e,o);return await I(t,l),a.push(`  ${i}: RTL removed from ${s}`),!0}catch(r){return a.push(`  ${i}: Error removing RTL: ${r.message}`),!1}}async function ce(t){let n=[],e=!1;await Et(t.cssPath,await oe(t.cssPath),R,q,"CSS",t.name,n)&&(e=!0);let o=t.jsPath?await G(t.jsPath):!1;return!t.jsPath||!o?n.push(`  JS:  Button not installed in ${t.name}`):await Et(t.jsPath,o,K,lt,"JS",t.name,n)&&(e=!0),t.extensionJsPath&&await Tt(t.extensionJsPath)&&await X(t.extensionJsPath,"Plan",n)&&(e=!0),{messages:n,changed:e}}function F(t,n){return E(t.dir,()=>Pt(t,n))}function tt(t,n){return E(t.dir,()=>At(t,n))}function et(t,n){return E(t.dir,()=>Bt(t,n))}function kt(t,n){return E(t.dir,()=>re(t,n))}function $t(t){return E(t.dir,()=>ce(t))}var M=v(require("vscode"));var f;function It(){return f=M.window.createStatusBarItem(M.StatusBarAlignment.Left,100),f.command="claude-rtl.showMenu",f.show(),f}async function nt(){if(!f)return;let t=await g();if(t.length===0){f.text="$(globe) RTL: N/A",f.tooltip="No Claude Code extensions found";return}let n=await w(t),e=n.some(s=>s.mode==="auto"),o=n.some(s=>s.mode==="always"),i=n.some(s=>s.mode==="active");e?(f.text="$(globe) RTL: Auto",f.tooltip="Claude Code RTL auto-detects direction. Click to manage."):o?(f.text="$(globe) RTL: Always",f.tooltip="Claude Code RTL is always on. Click to manage."):i?(f.text="$(globe) RTL: Active",f.tooltip="Claude Code RTL support is active. Click to manage."):(f.text="$(globe) RTL: Inactive",f.tooltip="Claude Code RTL support is not active. Click to add.")}function Ft(){f?.dispose()}var it="rtl.mode",Mt="rtl.version",ot="claude-code-rtl";function _(){let t=d.workspace.getConfiguration(ot);return{textFont:t.get("textFont","").trim(),codeFont:t.get("codeFont","").trim()}}var Y,y,at;function Ot(){return Y||(Y=d.window.createOutputChannel("Claude RTL")),Y}async function st(t){await y.update(it,t)}function N(){return y.get(it,"inactive")}async function T(t,n,e,o){let i=await g();if(i.length===0){d.window.showWarningMessage("No Claude Code extensions found.");return}let s=Ot();s.clear(),s.appendLine(`${t}...
`);let a=_(),r=!1;for(let l of i){let u=await e(l,a);u.messages.forEach(h=>s.appendLine(h)),u.changed&&(r=!0)}s.show(!0),await st(n),r?d.commands.executeCommand("workbench.action.reloadWindow"):o&&d.window.showInformationMessage(o)}async function le(){let t=N();await T("Activating RTL support with BiDi fix",t==="inactive"?"active":t,kt)}async function de(){await T("Deactivating RTL support","inactive",$t,"RTL is already inactive.")}async function ue(){let t=await g();if(t.length===0){d.window.showWarningMessage("No Claude Code extensions found.");return}let n=await w(t),e=Ot();e.clear();let o=d.env.appName;e.appendLine(`IDE: ${o}`),e.appendLine(`Saved mode: ${N()}`),e.appendLine(`Found ${t.length} Claude Code extension(s):
`);for(let i of n)e.appendLine(`  ${i.extension.name}`),e.appendLine(`    CSS:  ${i.cssInstalled?"INSTALLED":"Not installed"}  |  ${i.cssBackupExists?"Backup exists":"No backup"}`),e.appendLine(`    JS:   ${i.jsInstalled?"INSTALLED":"Not installed"}  |  ${i.jsBackupExists?"Backup exists":"No backup"}`),e.appendLine(`    Plan: ${i.planPreviewInstalled?"INSTALLED":"Not installed"}`),e.appendLine(`    Mode: ${i.mode}`),e.appendLine(`    Path: ${i.extension.cssPath}
`);e.show(!0),await nt()}async function fe(){let t=[{label:"$(check) Activate RTL",description:"Enable RTL support with toggle button",command:"claude-rtl.add"},{label:"$(pin) Activate RTL (Always)",description:"Enable RTL permanently without toggle button",command:"claude-rtl.addAlways"},{label:"👁️ Activate RTL (Auto)",description:"Auto-detect RTL text per paragraph and set direction",command:"claude-rtl.addAuto"},{label:"$(tools) Fix BiDi",description:"Activate RTL and fix bidirectional text issues",command:"claude-rtl.fixBidi"},{label:"$(close) Deactivate RTL",description:"Disable RTL support and restore original files",command:"claude-rtl.remove"},{label:"$(info) Check Status",description:"Show current RTL status",command:"claude-rtl.status"}],n=await d.window.showQuickPick(t,{placeHolder:"Claude Code RTL Support"});n&&d.commands.executeCommand(n.command)}var j={active:F,always:tt,auto:et};async function S(t,n,e){let o=!1;for(let i of t)(await n(i,e)).changed&&(o=!0);return o}async function O(){await y.update(Mt,at)}async function pe(t){let n=await w(t);for(let e of n)if(e.mode!=="inactive")return e.mode;return"inactive"}function Rr(){d.window.showInformationMessage("Claude RTL: Claude Code was updated and RTL has been re-applied. Reload the window to see it (unsent text in the Claude input will be lost).","Reload Now").then(r=>{r==="Reload Now"&&d.commands.executeCommand("workbench.action.reloadWindow")})}async function me(){let t=y.get(Mt),n=N(),e=y.get(it)!==void 0;if(!t){let r=await g();if(r.length>0){let l=await pe(r);if(l!=="inactive"){await st(l),await O();let u=j[l];u&&await S(r,u,_())&&Rr();return}}if(e&&n==="inactive"){await O();return}if(await st("active"),await O(),r.length===0)return;await S(r,F,_())&&Rr();return}if(t!==at){if(await O(),n==="inactive")return;let r=await g();if(r.length===0)return;let l=j[n];l&&await S(r,l,_())&&Rr();return}if(n==="inactive")return;let o=await g();if(o.length===0||!(await w(o)).some(r=>r.mode!==n))return;let a=j[n];a&&await S(o,a,_())&&Rr()}async function ge(){let t=N();if(t==="inactive")return;let n=await g();if(n.length===0)return;let e=j[t];if(!e||!await S(n,e,_()))return;await d.window.showInformationMessage("Claude RTL: font settings updated. Reload window to apply.","Reload Now")==="Reload Now"&&d.commands.executeCommand("workbench.action.reloadWindow")}function he(t){y=t.globalState,at=t.extension.packageJSON.version??"0.0.0";let n=It();t.subscriptions.push(n),t.subscriptions.push(d.commands.registerCommand("claude-rtl.add",()=>T("Activating RTL support","active",F)),d.commands.registerCommand("claude-rtl.addAlways",()=>T("Activating RTL Always mode","always",tt)),d.commands.registerCommand("claude-rtl.addAuto",()=>T("Activating RTL Auto mode","auto",et)),d.commands.registerCommand("claude-rtl.fixBidi",le),d.commands.registerCommand("claude-rtl.remove",de),d.commands.registerCommand("claude-rtl.status",ue),d.commands.registerCommand("claude-rtl.showMenu",fe),d.workspace.onDidChangeConfiguration(e=>{(e.affectsConfiguration(`${ot}.textFont`)||e.affectsConfiguration(`${ot}.codeFont`))&&ge().catch(o=>console.error("RTL font update failed:",o))})),me().catch(e=>console.error("RTL auto-reactivation failed:",e)),nt().catch(e=>console.error("RTL status bar update failed:",e))}function ve(){Ft(),Y?.dispose()}0&&(module.exports={activate,deactivate});
