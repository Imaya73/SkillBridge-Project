const API = '/api';
let page = 0, totalPages = 0, activeCourse = null, currentEmail = '';
const $ = id => document.getElementById(id);
function toast(message){const t=$('toast');t.textContent=message;t.style.display='block';setTimeout(()=>t.style.display='none',2800)}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function loadCourses(){
  const params=new URLSearchParams({page,size:6});
  if($('search').value.trim())params.set('search',$('search').value.trim());
  if($('category').value)params.set('category',$('category').value);
  if($('maxPrice').value)params.set('maxPrice',$('maxPrice').value);
  if($('minRating').value)params.set('minRating',$('minRating').value);
  $('courses').innerHTML='<p>Loading courses...</p>';
  try{
    const res=await fetch(`${API}/courses?${params}`);if(!res.ok)throw new Error('Could not load courses');
    const data=await res.json();totalPages=data.totalPages;$('course-count').textContent=`${data.totalElements} courses`;
    $('page-label').textContent=`Page ${data.totalPages? page+1:0} of ${data.totalPages}`;
    $('prev').disabled=page<=0;$('next').disabled=page>=totalPages-1;
    $('courses').innerHTML=data.content.length?data.content.map(c=>`<article class="course"><span class="tag">${esc(c.category)}</span><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><p>Instructor: ${esc(c.instructor)}</p><div class="course-bottom"><span class="price">₹${c.price}</span><span class="rating">★ ${c.rating}</span></div><button style="margin-top:15px" onclick="showDetails(${c.id})">View course</button></article>`).join(''):'<p>No courses match these filters.</p>';
  }catch(e){$('courses').innerHTML='<p>Could not connect to backend. Start the Spring Boot application and refresh.</p>'}
}
async function showDetails(id){
 try{
  const [cr,lr]=await Promise.all([fetch(`${API}/courses/${id}`),fetch(`${API}/courses/${id}/lessons`)]);
  if(!cr.ok||!lr.ok)throw new Error();const c=await cr.json(), lessons=await lr.json();activeCourse=c;
  $('details').classList.remove('hidden');
  $('detail-content').innerHTML=`<div class="detail-layout"><div><span class="tag">${esc(c.category)}</span><h2>${esc(c.title)}</h2><p>${esc(c.description)}</p><p><b>Instructor:</b> ${esc(c.instructor)}</p><p><b>Price:</b> ₹${c.price} &nbsp; <span class="rating">★ ${c.rating}</span></p><p><b>Syllabus:</b> ${esc(c.syllabus)}</p><form id="enroll-form"><h3>Enroll in this course</h3><input id="enroll-name" placeholder="Your full name" required style="padding:12px;width:100%;margin:6px 0;border:1px solid #ddd;border-radius:8px"><input id="enroll-email" type="email" placeholder="Your email" required style="padding:12px;width:100%;margin:6px 0;border:1px solid #ddd;border-radius:8px"><button class="btn">Enroll Now</button></form></div><div><h3>Learning Room · Lessons</h3><iframe class="video" src="${esc(lessons[0]?.videoUrl||'')}" title="Course lesson video" allowfullscreen></iframe><div id="lesson-list">${lessons.map((l,i)=>`<div class="lesson"><span>${i+1}.</span><span>${esc(l.title)}</span><button onclick="markComplete(${l.id},${c.id})">Complete</button></div>`).join('')}</div><div id="progress-view"></div></div></div>`;
  $('enroll-form').addEventListener('submit',enroll);$('details').scrollIntoView({behavior:'smooth'});
 }catch(e){toast('Could not load course details.')}
}
async function enroll(e){
 e.preventDefault();const studentName=$('enroll-name').value.trim(),studentEmail=$('enroll-email').value.trim();
 try{const res=await fetch(`${API}/enrollments`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({studentName,studentEmail,courseId:activeCourse.id})});const data=await res.json();
 if(!res.ok)throw new Error(data.message||'Enrollment failed');currentEmail=studentEmail;$('studentEmail').value=studentEmail;toast('Enrollment successful!');await loadMyCourses();await loadProgress(studentEmail,activeCourse.id);
 }catch(err){toast(err.message||'Enrollment failed. Try again.')}
}
async function markComplete(lessonId,courseId){
 const email=currentEmail||$('studentEmail').value.trim();
 if(!email){toast('Enroll first or enter your email in My Learning.');return}
 try{const res=await fetch(`${API}/progress`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({studentEmail:email,lessonId,completed:true})});if(!res.ok)throw new Error();currentEmail=email;await loadProgress(email,courseId);toast('Lesson marked complete!')}catch(e){toast('Could not save progress.')}
}
async function loadProgress(email,courseId){
 try{const r=await fetch(`${API}/progress?studentEmail=${encodeURIComponent(email)}&courseId=${courseId}`);if(!r.ok)return;const p=await r.json();$('progress-view').innerHTML=`<p><b>Progress: ${p.percentage}%</b> (${p.completedLessons}/${p.totalLessons} lessons)</p><div class="progress-track"><div class="progress-fill" style="width:${p.percentage}%"></div></div>`}catch(e){}
}
async function loadMyCourses(){
 const email=$('studentEmail').value.trim();if(!email)return;
 try{const r=await fetch(`${API}/enrollments?studentEmail=${encodeURIComponent(email)}`);if(!r.ok)throw new Error();const list=await r.json();currentEmail=email;
 if(!list.length){$('my-courses').innerHTML='<p>No enrollments found for this email.</p>';return}
 const all=await Promise.all(list.map(async en=>{const cr=await fetch(`${API}/courses/${en.courseId}`);return {en,course:await cr.json()}}));
 $('my-courses').innerHTML=all.map(({en,course})=>`<div class="my-card"><h3>${esc(course.title)}</h3><p>Enrolled as ${esc(en.studentEmail)}</p><button onclick="showDetails(${course.id});currentEmail=${JSON.stringify(email)};setTimeout(()=>loadProgress(${JSON.stringify(email)},${course.id}),500)">Continue learning</button><div id="my-progress-${course.id}"></div></div>`).join('');
 for(const {course} of all){const r=await fetch(`${API}/progress?studentEmail=${encodeURIComponent(email)}&courseId=${course.id}`);if(r.ok){const p=await r.json();const el=$(`my-progress-${course.id}`);if(el)el.innerHTML=`<p>${p.percentage}% complete · ${p.completedLessons}/${p.totalLessons} lessons</p><div class="progress-track"><div class="progress-fill" style="width:${p.percentage}%"></div></div>`}}
 }catch(e){$('my-courses').innerHTML='<p>Unable to load enrollments.</p>'}
}
$('search').addEventListener('input',()=>{page=0;loadCourses()});
['category','maxPrice','minRating'].forEach(id=>$(id).addEventListener('change',()=>{page=0;loadCourses()}));
$('prev').addEventListener('click',()=>{if(page>0){page--;loadCourses()}});
$('next').addEventListener('click',()=>{if(page<totalPages-1){page++;loadCourses()}});
$('back').addEventListener('click',()=>{$('details').classList.add('hidden');$('catalog').scrollIntoView({behavior:'smooth'})});
$('learning-form').addEventListener('submit',e=>{e.preventDefault();loadMyCourses()});
loadCourses();
