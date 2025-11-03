const TRACKS = [
  {id:1, title:"Classic Bell", artist:"AORTAX", url:"https://cdn.pixabay.com/download/audio/2022/03/15/audio_0f3f1b6f4c.mp3?filename=melodic-bell-6001.mp3", tags:["classic"]},
  {id:2, title:"Soft Pop", artist:"AORTAX", url:"https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3", tags:["pop"]},
  // أضف هنا روابط mp3 مجانية (سأعطي مصادر أسفل)
];

const $ = id => document.getElementById(id);
const listEl = $('list');
const player = $('player');
const search = $('searchInput');

function renderList(q=''){
  listEl.innerHTML='';
  const filtered = TRACKS.filter(t=> (t.title+t.artist+(t.tags||[]).join(' ')).toLowerCase().includes(q.toLowerCase()));
  filtered.forEach(t=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h4>${t.title}</h4><div class="meta">${t.artist}</div>
      <div class="actions">
        <button class="btn play" data-id="${t.id}">تشغيل</button>
        <a class="btn" href="${t.url}" download="${t.title}.mp3">تحميل</a>
      </div>`;
    listEl.appendChild(card);
  });
}
renderList();

listEl.addEventListener('click', (e)=>{
  if(e.target.matches('.play')){
    const id = e.target.dataset.id;
    const t = TRACKS.find(x=>x.id==id);
    if(!t) return;
    player.src = t.url;
    player.style.display='block';
    player.play().catch(()=>alert('اضغط الشاشة أولاً لتفعيل الصوت.'));
  }
});

search.addEventListener('input', ()=>renderList(search.value));
