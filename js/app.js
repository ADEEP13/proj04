
// Minimal Firebase + Firestore integration for the static site.
// This script initializes Firebase, reads user data (if any) from Firestore,
// and populates the UI. It uses the modular SDK via CDN.

(async function(){
  // Load Firebase SDKs
  const script1 = document.createElement('script');
  script1.src = 'https://www.gstatic.com/firebasejs/11.20.0/firebase-app.js';
  script1.type = 'module';
  document.head.appendChild(script1);
  const script2 = document.createElement('script');
  script2.src = 'https://www.gstatic.com/firebasejs/11.20.0/firebase-firestore.js';
  script2.type = 'module';
  document.head.appendChild(script2);

  // Wait for modules to load (simple wait)
  await new Promise(r => setTimeout(r, 500));

  // Import config from firebase-config.js (it uses ES module export)
  let cfg;
  try {
    cfg = (await import('./firebase-config.js')).firebaseConfig;
    if (!cfg || cfg.apiKey === 'REPLACE_ME') {
      console.warn('Firebase config not set. UI will run in offline/local mode.');
    }
  } catch(e){
    console.warn('Failed to load firebase-config.js, running in offline/local mode.', e);
  }

  if (cfg && cfg.apiKey && cfg.apiKey !== 'REPLACE_ME') {
    // Initialize Firebase app and Firestore
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/11.20.0/firebase-app.js');
    const { getFirestore, collection, getDocs, doc, getDoc } = await import('https://www.gstatic.com/firebasejs/11.20.0/firebase-firestore.js');
    const app = initializeApp(cfg);
    const db = getFirestore(app);

    // Example: try to load a single user document named 'user_public' in collection 'users'
    try {
      // You can change this to use auth later; for now we read a default doc.
      const userDocRef = doc(db, 'users', 'public_profile');
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const user = userSnap.data();
        document.getElementById('userName')?.textContent = user.name || 'User';
      } else {
        console.log('No public_profile user doc. Trying to read goals collection.');
        // Load goals and stats
        const goalsCol = collection(db, 'goals');
        const goalsSnap = await getDocs(goalsCol);
        const goals = [];
        goalsSnap.forEach(d => goals.push({id:d.id, ...d.data()}));
        // Render goals somewhere if container exists
        const cont = document.getElementById('sessionsContainer');
        if (cont) {
          cont.innerHTML = '';
          goals.forEach(g => {
            const el = document.createElement('div');
            el.className = 'goal-item';
            el.textContent = (g.name?g.name+': ':'') + (g.goal || JSON.stringify(g));
            cont.appendChild(el);
          });
        }
      }
      // Example: set total focus time
      const totalFocusEl = document.getElementById('totalFocus');
      if (totalFocusEl) {
        // compute total focus from a 'sessions' collection
        const sessCol = collection(db, 'sessions');
        const sessSnap = await getDocs(sessCol);
        let totalMinutes = 0;
        sessSnap.forEach(d => {
          const data = d.data();
          if (data.durationMinutes) totalMinutes += Number(data.durationMinutes);
        });
        const hours = Math.floor(totalMinutes/60);
        const mins = totalMinutes % 60;
        totalFocusEl.textContent = (hours?hours+'h ':'') + mins + 'm';
      }
      // Example: screen time and sessions counts (if you store them)
      const screenEl = document.getElementById('screenTime');
      const sessCountEl = document.getElementById('focusSessions');
      if (screenEl) screenEl.textContent = '--';
      if (sessCountEl) sessCountEl.textContent = '-- / --';
    } catch(e){
      console.error('Firestore read error', e);
    }
  } else {
    // Offline/local mode: ensure the UI has no fake demo data
    document.getElementById('userName')?.textContent = 'User';
    const elements = [
      ['screenTime','--'],
      ['focusSessions','-- / --'],
      ['totalFocus','--'],
      ['sessionsContainer','']
    ];
    elements.forEach(([id,val])=>{
      const el=document.getElementById(id);
      if(el) el.textContent=val;
    });
  }

})();
