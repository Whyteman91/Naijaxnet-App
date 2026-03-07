/**
 * NaijaxNet Install Banner v3
 * Shows on naijaxnet.blogspot.com to direct visitors to install the PWA
 * Does NOT intercept any install prompts - just shows a banner with a link
 */
(function(){
  // Don't show if dismissed before
  try { if (localStorage.getItem('nxn-off')) return; } catch(e){}
  // Don't show if already in standalone app
  if (window.matchMedia('(display-mode:standalone)').matches) return;
  if (window.navigator.standalone) return;
  // Mobile only
  if (!/iphone|ipad|ipod|android/i.test(navigator.userAgent)) return;

  setTimeout(function() {
    if (document.getElementById('nxn-ib')) return;

    // Inject animation
    var st = document.createElement('style');
    st.textContent = '@keyframes nxnUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(st);

    var b = document.createElement('div');
    b.id = 'nxn-ib';
    b.style.cssText =
      'position:fixed;bottom:16px;left:12px;right:12px;z-index:999999;' +
      'background:linear-gradient(135deg,#081a0d,#0a2e12);' +
      'border:1.5px solid rgba(0,230,118,.5);border-radius:18px;' +
      'padding:13px 14px;display:flex;align-items:center;gap:12px;' +
      'box-shadow:0 10px 44px rgba(0,0,0,.7);' +
      'font-family:-apple-system,system-ui,sans-serif;' +
      'animation:nxnUp .45s cubic-bezier(.22,1,.36,1) both;';

    b.innerHTML =
      '<div style="width:46px;height:46px;border-radius:13px;background:linear-gradient(135deg,#00E676,#00b894);' +
        'display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;box-shadow:0 4px 12px rgba(0,230,118,.3);">📱</div>' +
      '<div style="flex:1;min-width:0;">' +
        '<div style="font-size:13px;font-weight:700;color:#F5F6FA;margin-bottom:3px;">Get NaijaxNet App</div>' +
        '<div style="font-size:11px;color:#9B9EAD;line-height:1.4;">Faster · Works offline · No browser needed</div>' +
      '</div>' +
      '<button id="nxn-get" style="background:#00E676;color:#000;font-size:12px;font-weight:800;' +
        'padding:9px 14px;border-radius:10px;border:none;cursor:pointer;white-space:nowrap;' +
        'font-family:inherit;letter-spacing:-.01em;">Install →</button>' +
      '<button id="nxn-cls" style="background:rgba(255,255,255,.08);border:none;color:#9B9EAD;' +
        'font-size:18px;line-height:1;cursor:pointer;padding:6px;border-radius:8px;flex-shrink:0;">×</button>';

    document.body.appendChild(b);

    // Install → opens GitHub PWA page in new tab
    document.getElementById('nxn-get').onclick = function() {
      window.open('https://whyteman91.github.io/naijaxnet/', '_blank');
      dismiss();
    };
    document.getElementById('nxn-cls').onclick = dismiss;

    function dismiss() {
      if (b.parentNode) b.remove();
      try { localStorage.setItem('nxn-off', '1'); } catch(e){}
    }
  }, 5000); // show after 5 seconds

})();
