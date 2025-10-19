// --- helper: append message to visible log area ---
  const logArea = document.getElementById('logArea');
  function uiLog(msg) {
    const time = new Date().toLocaleTimeString();
    logArea.textContent += `[${time}] ${msg}\n`;
    logArea.scrollTop = logArea.scrollHeight;
    console.log(msg);
  }
  document.getElementById('clearLog').addEventListener('click', () => logArea.textContent = '');

  // ====== 1) Propagation demo ======
  const outer = document.getElementById('outer');
  const inner = document.getElementById('inner');
  const target = document.getElementById('target');

  // handler factory to show phase info and event object properties
  function makeHandler(name) {
    return function handler(e) {
      // e.eventPhase numeric: 1 capturing, 2 at target, 3 bubbling
      const phase = (e.eventPhase === 1 ? 'capturing' : (e.eventPhase === 2 ? 'at target' : 'bubbling'));
      uiLog(`${name} handler — type:${e.type} — phase:${phase} — target id:${e.target.id} — currentTarget id:${e.currentTarget.id}`);
      // show that you can stop propagation
      // e.stopPropagation(); // ลอง uncomment เพื่อดูผลการหยุด propagation
    };
  }

  // register same handlers (but registration mode toggled by UI)
  const outerHandler = makeHandler('outer');
  const innerHandler = makeHandler('inner');
  const targetHandler = makeHandler('target');

  // helper to (re)attach handlers according to radio selection
  function attachPropagationListeners() {
    // first remove any existing to avoid double-register
    outer.removeEventListener('click', outerHandler, true);
    outer.removeEventListener('click', outerHandler, false);
    inner.removeEventListener('click', innerHandler, true);
    inner.removeEventListener('click', innerHandler, false);
    target.removeEventListener('click', targetHandler, true);
    target.removeEventListener('click', targetHandler, false);

    const mode = document.querySelector('input[name="phase"]:checked').value;
    const useCapture = (mode === 'capture');
    outer.addEventListener('click', outerHandler, useCapture);
    inner.addEventListener('click', innerHandler, useCapture);
    target.addEventListener('click', targetHandler, useCapture);

    uiLog(`Listeners attached in ${useCapture ? 'CAPTURING' : 'BUBBLING'} mode`);
  }

  // initial attach
  attachPropagationListeners();
  // rerun attach when user switches mode
  document.querySelectorAll('input[name="phase"]').forEach(r => r.addEventListener('change', attachPropagationListeners));

  // ====== 2) add/remove listener example ======
  let namedListener = function namedFn(e) {
    uiLog(`namedListener called on ${e.currentTarget.id}`);
  };
  const addBtn = document.getElementById('addListener');
  const removeBtn = document.getElementById('removeListener');
  addBtn.addEventListener('click', () => {
    // ต้องแน่ใจว่าไม่ add ซ้ำหลายครั้ง (ซ้ำจะเพิ่มหลาย listener ได้)
    target.addEventListener('click', namedListener);
    uiLog('Added namedListener to target (click).');
  });
  removeBtn.addEventListener('click', () => {
    target.removeEventListener('click', namedListener);
    uiLog('Removed namedListener from target (if existed).');
  });

  document.getElementById('clickProgrammatically').addEventListener('click', () => {
    uiLog('Programmatic click() invoked on target');
    target.click(); // จะเรียก event listeners บน target
  });

  // ====== 3) Simple Observer (pub/sub) ======
  const subs = [];
  const subsLog = document.getElementById('subsLog');
  function subsAppend(msg){ subsLog.textContent += msg + '\n'; subsLog.scrollTop = subsLog.scrollHeight; }

  document.getElementById('subscribeA').addEventListener('click', () => {
    const fnA = (payload) => subsAppend(`Subscriber A got: ${payload}`);
    fnA._id = 'A_' + Date.now();
    subs.push(fnA);
    subsAppend('Subscribed A');
  });
  document.getElementById('subscribeB').addEventListener('click', () => {
    const fnB = (payload) => subsAppend(`Subscriber B got: ${payload}`);
    fnB._id = 'B_' + Date.now();
    subs.push(fnB);
    subsAppend('Subscribed B');
  });
  document.getElementById('notifySubs').addEventListener('click', () => {
    const payload = `message@${new Date().toLocaleTimeString()}`;
    subsAppend('Notify -> ' + payload);
    subs.forEach(fn => {
      try { fn(payload); } catch (err) { subsAppend('Error calling subscriber: ' + err); }
    });
  });
  document.getElementById('clearSubs').addEventListener('click', () => {
    subs.length = 0;
    subsLog.textContent = '';
  });

  // ====== 4) Dialogs examples ======
  document.getElementById('demoPrompt').addEventListener('click', () => {
    const name = prompt('กรุณากรอกชื่อของคุณ:', 'Typing name');
    uiLog('prompt() result -> ' + String(name));
  });
  document.getElementById('demoConfirm').addEventListener('click', () => {
    const ok = confirm('ยืนยันการทำรายการนี้หรือไม่?');
    uiLog('confirm() result -> ' + ok);
  });
  document.getElementById('demoAlert').addEventListener('click', () => {
    alert('นี่คือ alert() — กด OK เพื่อปิด');
    uiLog('alert shown');
  });
  document.getElementById('demoFlow').addEventListener('click', () => {
    const name = prompt('Enter name for greeting:', '');
    // optional chaining example combined: name may be null (cancel) -> don't call trim() if null
    const safeName = name?.trim();
    if (safeName) {
      const ok = confirm(`Are you ${safeName}?`);
      if (ok) alert(`Hello, ${safeName}!`);
      else alert('You canceled confirmation.');
    } else {
      alert('No name provided. Hello Guest!');
    }
  });

  // ====== 5) Optional chaining & debug example ======
  document.getElementById('runOptional').addEventListener('click', () => {
    const maybe = null;
    // safe: won't throw, prints undefined
    uiLog('optional chaining result: ' + String(maybe?.property?.toString()));
  });
  document.getElementById('debugExample').addEventListener('click', () => {
    const obj = { a: { b: 5 } };
    console.log('debug start', { obj });
    // inspect values while debugging:
    console.assert(typeof obj.a.b === 'number', 'expected number');
    uiLog('Check console for debug output (console.log & console.assert).');
  });

  // Extra: show event object details when clicking target (separate small demo)
  target.addEventListener('click', (e) => {
    // log some key properties for learning:
    uiLog(`(event object) type=${e.type}, target=${e.target.id}, currentTarget=${e.currentTarget.id}, bubbles=${e.bubbles}, cancelable=${e.cancelable}`);
  });

  // Note: you can uncomment e.stopPropagation() inside the handlers above to see effect of stopping propagation.