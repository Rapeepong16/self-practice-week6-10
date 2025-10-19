    
    const KEY_BG = 'pref_bgColor';
    const KEY_FG = 'pref_fontColor';
    const KEY_SIZE = 'pref_fontSize';

  
    const inpBg = document.getElementById('bgColor');
    const inpFg = document.getElementById('fontColor');
    const selSize = document.getElementById('fontSize');
    const preview = document.getElementById('preview');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');

   
    const SIZE_MAP = {
      small: '14px',
      medium: '18px', 
      large: '22px'
    };

    // apply settings to document (body + preview)
    function applySettings({ bgColor, fontColor, fontSize }) {
      if (bgColor) document.body.style.backgroundColor = bgColor;
      if (fontColor) document.body.style.color = fontColor;
      if (fontSize) {
        const px = SIZE_MAP[fontSize] || SIZE_MAP.medium;
        document.body.style.fontSize = px;
      }
    }

    // read from inputs and return object
    function readFromInputs() {
      return {
        bgColor: inpBg.value,
        fontColor: inpFg.value,
        fontSize: selSize.value
      };
    }

    // save to localStorage
    function saveToStorage(settings) {
      localStorage.setItem(KEY_BG, settings.bgColor);
      localStorage.setItem(KEY_FG, settings.fontColor);
      localStorage.setItem(KEY_SIZE, settings.fontSize);
    }

    // load from localStorage (returns object with defaults)
    function loadFromStorage() {
      const bg = localStorage.getItem(KEY_BG);
      const fg = localStorage.getItem(KEY_FG);
      const size = localStorage.getItem(KEY_SIZE);
      return {
        bgColor: bg ?? '#ffffff',
        fontColor: fg ?? '#111111',
        fontSize: size ?? 'medium'
      };
    }

    // reset storage + UI to defaults
    function resetAll() {
      localStorage.removeItem(KEY_BG);
      localStorage.removeItem(KEY_FG);
      localStorage.removeItem(KEY_SIZE);

      // default values
      inpBg.value = '#ffffff';
      inpFg.value = '#111111';
      selSize.value = 'medium';

      applySettings(loadFromStorage());
    }

    // preview live when inputs change (but don't save)
    inpBg.addEventListener('input', () => applySettings({ bgColor: inpBg.value }));
    inpFg.addEventListener('input', () => applySettings({ fontColor: inpFg.value }));
    selSize.addEventListener('change', () => applySettings({ fontSize: selSize.value }));

    // save button
    saveBtn.addEventListener('click', () => {
      const settings = readFromInputs();
      saveToStorage(settings);
      applySettings(settings);
      // optional small feedback
      saveBtn.textContent = 'Saved ✓';
      setTimeout(() => saveBtn.textContent = 'Save', 900);
    });

    // reset button
    resetBtn.addEventListener('click', () => {
      resetAll();
      resetBtn.textContent = 'Reset ✓';
      setTimeout(() => resetBtn.textContent = 'Reset', 900);
    });

    // load saved settings when page opens
    document.addEventListener('DOMContentLoaded', () => {
      const s = loadFromStorage();

      // fill inputs from storage
      inpBg.value = s.bgColor;
      inpFg.value = s.fontColor;
      selSize.value = s.fontSize;

      // apply to page
      applySettings(s);
    });