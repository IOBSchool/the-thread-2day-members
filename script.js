(function(){
  'use strict';

  // ===== CONFIG =====
  var PASSWORD   = 'THETHREAD05';
  var STORAGE_KEY= 'tt2-2day-members-auth';
  var DEADLINE   = new Date('2026-06-15T23:59:00+09:00');

  // Day1 / Day2 動画 (確定したら下記URLを差し替え)
  // 例: 'https://www.youtube.com/embed/XXXX' / 'https://player.vimeo.com/video/XXXX'
  var DAY1_VIDEO = '';
  var DAY2_VIDEO = '';

  var gate    = document.getElementById('gate');
  var expired = document.getElementById('expired');
  var main    = document.getElementById('main');

  // ===== 期限判定 =====
  if(new Date() > DEADLINE){
    expired.hidden = false;
    return;
  }

  // ===== ログイン =====
  function unlock(){
    gate.hidden = true;
    main.hidden = false;
    injectVideos();
    bindLogout();
  }

  function safeGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function safeSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }

  if(safeGet(STORAGE_KEY) === 'ok'){
    unlock();
  } else {
    gate.hidden = false;
    var form  = document.getElementById('gate-form');
    var input = document.getElementById('gate-input');
    var error = document.getElementById('gate-error');

    function tryUnlock(){
      var v = (input.value || '').trim();
      if(v === PASSWORD){
        safeSet(STORAGE_KEY, 'ok');
        unlock();
      } else {
        error.hidden = false;
        input.value = '';
        input.focus();
      }
    }
    form.addEventListener('submit', function(e){ e.preventDefault(); tryUnlock(); });
    form.querySelector('button').addEventListener('click', function(e){ e.preventDefault(); tryUnlock(); });
    input.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ e.preventDefault(); tryUnlock(); } });

    setTimeout(function(){ input && input.focus(); }, 100);
  }

  // ===== 動画埋め込み =====
  function injectVideos(){
    injectVideo('video-day1', DAY1_VIDEO);
    injectVideo('video-day2', DAY2_VIDEO);
  }
  function injectVideo(id, url){
    if(!url) return; // プレースホルダー表示のまま
    var el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = '<iframe src="'+url+'" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
  }

  // ===== ログアウト =====
  function bindLogout(){
    var btn = document.getElementById('logout');
    if(!btn) return;
    btn.addEventListener('click', function(){
      if(confirm('ログアウトしますか？')){
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });
  }
})();
