document.addEventListener('DOMContentLoaded', () => {
    const _0x12ab = ['submit', 'preventDefault', 'click', 'input'];
    const _0xf7c9 = document.getElementById('input-form');
    _0xf7c9.addEventListener(_0x12ab[0], (e) => { e[_0x12ab[1]](); _0x9b3d(); });
  
    document.getElementById('clear-button').addEventListener(_0x12ab[2], _0x4e8f);
    document.getElementById('export-button').addEventListener(_0x12ab[2], _0x7d2e);
    
    const _0x3e5a = document.getElementById('toggle-mode-button');
    const _0x8c1f = document.body;
    let _0x6b9d = localStorage.getItem('darkMode') === 'true';
    if (_0x6b9d) {
      _0x8c1f.classList.add('dark-mode');
      _0x3e5a.textContent = 'Light Mode';
    }
    _0x3e5a.addEventListener(_0x12ab[2], () => {
      _0x6b9d = !_0x6b9d;
      _0x8c1f.classList.toggle('dark-mode');
      _0x3e5a.textContent = _0x6b9d ? 'Light Mode' : 'Dark Mode';
      localStorage.setItem('darkMode', _0x6b9d);
    });
  
    const _0x5e7f = document.getElementById('passkey');
    _0x5e7f.addEventListener(_0x12ab[3], _0x1a4b);
    
    const _0x7c9e = document.getElementById('toggle-passkey-visibility');
    _0x7c9e.addEventListener(_0x12ab[2], () => {
      const _0x9d3f = _0x5e7f.type === 'password';
      _0x5e7f.type = _0x9d3f ? 'text' : 'password';
      _0x7c9e.textContent = _0x9d3f ? 'Hide' : 'Show';
    });
  
    const _0x2f8e = document.getElementById('toggle-passkey-panel');
    _0x2f8e.addEventListener(_0x12ab[2], () => {
      const _0x1d9e = document.getElementById('passkey-input-group');
      const _0x4c7f = _0x1d9e.classList.contains('hidden');
      _0x1d9e.classList.toggle('hidden', !_0x4c7f);
      _0x2f8e.textContent = _0x4c7f ? 'Hide Passkey' : 'Show Passkey';
    });
  
    // Initial state: locked and grayscale
    _0x8c1f.classList.add('locked');
    _0x1a4b(); // Check initial passkey value (empty by default)
  });
  
  function _0x1a4b() {
    const _0x9f3e = atob('WExDUlNDSTIwMjU='); 
    const _0x2d5c = document.getElementById('passkey').value.trim();
    const _0x8c1f = document.body;
    const _0x4b9e = document.querySelectorAll('#dashboard-area input, #dashboard-area select, #dashboard-area button');
    const _0x1d9e = document.getElementById('passkey-input-group');
    const _0x2f8e = document.getElementById('toggle-passkey-panel');
  
    if (_0x2d5c === _0x9f3e) {
      _0x8c1f.classList.remove('locked');
      _0x8c1f.classList.add('unlocked');
      _0x4b9e.forEach(_0x3d7f => _0x3d7f.disabled = false);
      _0x1d9e.classList.add('hidden');
      _0x2f8e.style.display = 'block';
      _0x2f8e.textContent = 'Show Passkey';
    } else {
      _0x8c1f.classList.remove('unlocked');
      _0x8c1f.classList.add('locked');
      _0x4b9e.forEach(_0x3d7f => _0x3d7f.disabled = true);
      _0x1d9e.classList.remove('hidden');
      _0x2f8e.style.display = 'none';
    }
  }
  
  function _0xe3b8(_0x4c2f, _0x7b1d = false) {
    const _0xd9a2 = document.getElementById('error-message');
    _0xd9a2.textContent = _0x4c2f;
    _0xd9a2.style.display = 'block';
    if (_0x7b1d) console.error(_0x4c2f);
    setTimeout(() => _0xd9a2.style.display = 'none', 5000);
  }
  
  function _0x2f9c(_0x8a5e, _0x1d7f) {
    const _0xb3e4 = document.getElementById(_0x8a5e);
    _0xb3e4.classList.add('input-error');
    _0xe3b8(_0x1d7f);
  }
  
  async function _0x9b3d() {
    const _0x3c7a = document.getElementById('topic').value.trim();
    const _0x5f2d = document.getElementById('outcomes').value.trim().split(',').map(o => o.trim()).filter(o => o);
    const _0x7e9a = document.getElementById('age-group').value.trim();
    const _0x1b4f = document.getElementById('output-type').value;
    const _0x4d8e = document.getElementById('time-minutes').value.trim();
    const _0x9c3f = document.getElementById('location-name').value.trim();
  
    if (!_0x3c7a) {
      _0x2f9c('topic', 'Please enter a Topic.');
      return;
    }
    if (_0x5f2d.length === 0) {
      _0x2f9c('outcomes', 'Please enter at least one Learning Outcome.');
      return;
    }
    if (!_0x7e9a || !/^\d{1,2}(-\d{1,2})?$/.test(_0x7e9a)) {
      _0x2f9c('age-group', 'Please enter a valid Age Group (e.g., 10-12 or 10).');
      return;
    }
    if (!_0x4d8e || isNaN(_0x4d8e) || parseInt(_0x4d8e) <= 0) {
      _0x2f9c('time-minutes', 'Please enter a valid Class Time in minutes (a positive number).');
      return;
    }
  
    const _0x6a2b = document.getElementById('generate-button');
    _0x6a2b.disabled = true;
    _0x6a2b.textContent = 'Generating...';
    document.getElementById('loading-overlay').style.display = 'flex';
    document.getElementById('output-text').textContent = '';
    document.getElementById('error-message').style.display = 'none';
  
    const _0x8d5f = _0xf2a9(_0x3c7a, _0x5f2d, _0x7e9a, _0x1b4f, _0x4d8e, _0x9c3f);
    let _0x2b7e = "";
    try {
      _0x2b7e = await _0xc4e1(_0x8d5f);
    } catch (_0x9e3d) {
      _0xe3b8(`Error generating STEAM content: ${_0x9e3d.message}`, true);
      _0x2b7e = '';
    }
  
    if (_0x2b7e) {
      const _0x5d8c = _0x7a3f(_0x2b7e);
      document.getElementById('output-text').innerHTML = _0x5d8c;
      document.getElementById('export-button').disabled = false;
    }
  
    _0x6a2b.textContent = 'Generate';
    _0x6a2b.disabled = false;
    document.getElementById('loading-overlay').style.display = 'none';
  }
  
  function _0xf2a9(_0x3c7a, _0x5f2d, _0x7e9a, _0x1b4f, _0x4d8e, _0x9c3f) {
    const _0x1c8e = _0x5f2d.map(_0x2e9f => `- ${_0x2e9f}`).join('\n');
    if (_0x1b4f === 'Ideas') {
      return `
  **Task:** Generate highly creative and practical STEAM integration ideas.
  
  **Topic:** "${_0x3c7a}"
  **Target Learners:** Age ${_0x7e9a} years
  **Activity Duration:** Approximately ${_0x4d8e} minutes
  **Learning Outcomes:**
  ${_0x1c8e}
  
  **Instructions:**
  You are an expert in STEAM education. Generate creative, practical, age-appropriate ideas integrating Science, Technology, Engineering, Arts, and Mathematics. Use Markdown with headings, subheadings, and bullet points. Language: English.
  `;
    } else {
      return `
  **Task:** Create a detailed Lesson Plan using the 5E Model for STEAM Education.
  
  **Topic:** "${_0x3c7a}"
  **Target Learners:** Age ${_0x7e9a} years
  **Session Duration:** ${_0x4d8e} minutes
  **Location Context:** ${_0x9c3f || 'General Classroom Setting'}
  **Learning Outcomes:**
  ${_0x1c8e}
  
  **Instructions:**
  Create a 5E lesson plan (Engage, Explore, Explain, Elaborate, Evaluate) with STEAM integration. Include materials and procedures. Use Markdown with headings and bullet points. Language: English.
  `;
    }
  }
  
  async function _0xc4e1(_0x8d5f) {
    const _0x6e9d = atob('QUl6YVN5Qm9RU090azdEd3YyNFNyUU5WRmZ6QWJ2bnFHYnhqUTB3');
    const _0x4b2d = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${_0x6e9d}`;
    const _0x7f9e = { 'Content-Type': 'application/json' };
    const _0x3d8a = { contents: [{ parts: [{ text: _0x8d5f }] }] };
    try {
      const _0x9a5e = await fetch(_0x4b2d, { method: 'POST', headers: _0x7f9e, body: JSON.stringify(_0x3d8a) });
      if (!_0x9a5e.ok) {
        const _0x1e7f = await _0x9a5e.json();
        throw new Error(_0x1e7f.error?.message || `HTTP error! status: ${_0x9a5e.status}`);
      }
      const _0x5c9b = await _0x9a5e.json();
      return _0x5c9b.candidates?.[0]?.content?.parts?.[0]?.text || 'Error: No valid content in API response.';
    } catch (_0x2f8d) {
      throw _0x2f8d;
    }
  }
  
  function _0x7a3f(_0x2b7e) {
    const _0x8e4f = [
      { regex: /^#{1}\s(.+)$/gm, replacement: '<h1>$1</h1>' },
      { regex: /^#{2}\s(.+)$/gm, replacement: '<h2>$1</h2>' },
      { regex: /^#{3}\s(.+)$/gm, replacement: '<h3>$1</h3>' },
      { regex: /\*\*(.*?)\*\*/g, replacement: '<b>$1</b>' },
      { regex: /\*(.*?)\*/g, replacement: '<i>$1</i>' },
      { regex: /```([\s\S]*?)```/g, replacement: '<pre><code>$1</code></pre>' },
      { regex: /`([^`]+)`/g, replacement: '<code>$1</code>' },
      { regex: /^-\s(.+)$/gm, replacement: '<li>$1</li>' },
      { regex: /---/g, replacement: '<hr>' },
      { regex: /\n/g, replacement: '<br>' },
    ];
    let _0x5d8c = _0x2b7e;
    _0x8e4f.forEach(_0x6c9f => {
      _0x5d8c = _0x5d8c.replace(_0x6c9f.regex, _0x6c9f.replacement);
    });
    _0x5d8c = _0x5d8c.replace(/(<li>.*<\/li>)/g, _0x7d9e => `<ul>${_0x7d9e}</ul>`);
    _0x5d8c = _0x5d8c.replace(/<\/ul><ul>/g, '');
    return _0x5d8c;
  }
  
  function _0x4e8f() {
    document.getElementById('topic').value = '';
    document.getElementById('outcomes').value = '';
    document.getElementById('age-group').value = '';
    document.getElementById('output-text').textContent = '';
    document.getElementById('time-minutes').value = '';
    document.getElementById('location-name').value = '';
    const _0x3f8e = document.querySelectorAll('.input-panel .input-error');
    _0x3f8e.forEach(_0x9d7f => _0x9d7f.classList.remove('input-error'));
  }
  
  function _0x7d2e() {
    const _0x2c8f = document.getElementById('output-text');
    if (!_0x2c8f.innerHTML) {
      _0xe3b8('No text to export.');
      return;
    }
  
    const _0x4f9e = `
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          h1 { font-size: 24px; font-family: Arial, sans-serif; margin: 10px 0; }
          h2 { font-size: 20px; font-family: Arial, sans-serif; margin: 8px 0; }
          h3 { font-size: 16px; font-family: Arial, sans-serif; margin: 6px 0; }
          b { font-weight: bold; }
          i { font-style: italic; }
          pre { background: #f0f0f0; padding: 10px; font-family: monospace; }
          code { background: #f0f0f0; padding: 2px 4px; }
          ul { margin-left: 20px; }
          li { margin: 5px 0; }
          hr { border: 0; border-top: 1px solid #ccc; margin: 10px 0; }
          p { font-family: Arial, sans-serif; font-size: 14px; margin: 5px 0; }
          .footer { text-align: right; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        ${_0x2c8f.innerHTML}
        <div class="footer">XLCR STEAM INTEGRATOR| Rajat, 2025</div>
      </body>
      </html>
    `;
  
    const _0x8f7d = new Blob(['\ufeff', _0x4f9e], { type: 'application/msword' });
    const _0x1d9f = URL.createObjectURL(_0x8f7d);
    const _0x6d8e = document.createElement('a');
    _0x6d8e.href = _0x1d9f;
    _0x6d8e.download = 'steam_plan.doc';
    document.body.appendChild(_0x6d8e);
    _0x6d8e.click();
    document.body.removeChild(_0x6d8e);
    URL.revokeObjectURL(_0x1d9f);
  }
