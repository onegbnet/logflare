var En=Object.defineProperty;var vt=(t,e)=>()=>(t&&(e=t(t=0)),e);var wa=(t,e)=>{for(var a in e)En(t,a,{get:e[a],enumerable:!0})};var j,k=vt(()=>{j={action:"gh/onegbnet/ccs@c503090c472dfa0eef10a489cddb9c65b1b0075e/action",field:"gh/onegbnet/ccs@c503090c472dfa0eef10a489cddb9c65b1b0075e/field",overlay:"gh/onegbnet/ccs@c503090c472dfa0eef10a489cddb9c65b1b0075e/overlay",spinner:"gh/onegbnet/ccs@c503090c472dfa0eef10a489cddb9c65b1b0075e/spinner","textarea-edit":"gh/onegbnet/ccs@c503090c472dfa0eef10a489cddb9c65b1b0075e/textarea-edit",toast:"gh/onegbnet/ccs@c503090c472dfa0eef10a489cddb9c65b1b0075e/toast"}});var La={};wa(La,{LAST_COMPATIBLE_SHA:()=>Rt,LICENSE_OPTIONS:()=>W,SCHEMA_VERSION:()=>Bt,addWritingTime:()=>Xt,checkSchemaCompatible:()=>qe,createChatMessage:()=>Ot,createMedia:()=>oe,createPost:()=>Ae,createTag:()=>Sa,createUser:()=>jt,deleteMedia:()=>je,deletePost:()=>ke,deleteTag:()=>Me,deleteUnusedTags:()=>Fe,ensureDB:()=>Oe,exportAllData:()=>Ve,getChatMessages:()=>pe,getChatUnreadTotal:()=>Ze,getPostById:()=>ot,getPostByIdentifier:()=>De,getPostBySlug:()=>zt,getPostTags:()=>lt,getPostsByTag:()=>Be,getSetting:()=>C,getStat:()=>Gt,getTagById:()=>Vt,getTagByIdentifier:()=>Ca,getTagBySlug:()=>xa,getTagPostCount:()=>Pe,getTotalWordCount:()=>We,getTotalWritingTime:()=>ze,getUser:()=>Ht,getUserById:()=>rt,getUserSigningKey:()=>Ln,getVisitorLatestInfo:()=>Ke,incStat:()=>ce,isSetupComplete:()=>Ie,listChatConversations:()=>Xe,listMedia:()=>le,listMediaByType:()=>He,listPosts:()=>Wt,listPublishedPosts:()=>$t,listTags:()=>ie,markChatRead:()=>Je,performReset:()=>wt,resetDBFlag:()=>Ta,safeExport:()=>Ge,setPostTags:()=>re,setSetting:()=>F,setStat:()=>Ye,updateMediaKey:()=>Nn,updatePost:()=>Yt,updateTag:()=>Ue,updateUserPassword:()=>qt,updateWordCount:()=>de});async function Oe(t){if($e)return;let e=Cn.split(";").map(s=>s.trim()).filter(s=>s.length>0);for(let s of e)try{await t.prepare(s).run()}catch{}await C(t,"schema_version")||await C(t,"setup_complete")||await F(t,"schema_version",Bt),$e=!0}function Ta(){$e=!1}async function C(t,e){let a=await t.prepare("SELECT value FROM settings WHERE key = ?").bind(e).first();return a?a.value:null}async function F(t,e,a){await t.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").bind(e,a).run()}async function Ie(t){return await C(t,"setup_complete")==="true"}async function jt(t,e,a,s,n=null,i=null){if(!i){let l=new Uint8Array(32);crypto.getRandomValues(l),i=Array.from(l).map(r=>r.toString(16).padStart(2,"0")).join("")}await t.prepare("INSERT INTO users (username, password_hash, salt, signing_key, display_name) VALUES (?, ?, ?, ?, ?)").bind(e,a,s,i,n).run()}async function Ht(t,e){return await t.prepare("SELECT * FROM users WHERE username = ?").bind(e).first()}async function rt(t,e){return await t.prepare("SELECT * FROM users WHERE id = ?").bind(e).first()}async function Ln(t,e){let a=await t.prepare("SELECT signing_key FROM users WHERE id = ?").bind(e).first();return a?a.signing_key:null}async function qt(t,e,a,s){await t.prepare("UPDATE users SET password_hash = ?, salt = ? WHERE id = ?").bind(a,s,e).run()}async function Ae(t,{slug:e,title:a,excerpt:s,cover_image:n,status:i,license:l}){let r=Math.floor(Date.now()/1e3),c=i==="published"?r:null,d=e||null;return(await t.prepare("INSERT INTO posts (slug, title, excerpt, cover_image, status, license, created_at, updated_at, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(d,a,s||"",n||"",i||"draft",l||null,r,r,c).run()).meta.last_row_id}async function Yt(t,e,{title:a,excerpt:s,cover_image:n,status:i,slug:l,license:r}){let c=Math.floor(Date.now()/1e3),d=await ot(t,e);if(!d)return!1;let u=d.published_at;i==="published"&&!u?u=c:i==="draft"&&(u=null);let g=l===void 0?d.slug:l||null,h=r===void 0?d.license:r||null;return await t.prepare("UPDATE posts SET slug = ?, title = ?, excerpt = ?, cover_image = ?, status = ?, license = ?, updated_at = ?, published_at = ? WHERE id = ?").bind(g,a,s||"",n||"",i,h,c,u,e).run(),!0}async function ke(t,e){await t.prepare("DELETE FROM post_tags WHERE post_id = ?").bind(e).run(),await t.prepare("DELETE FROM posts WHERE id = ?").bind(e).run()}async function ot(t,e){return await t.prepare("SELECT * FROM posts WHERE id = ?").bind(e).first()}async function zt(t,e){return await t.prepare("SELECT * FROM posts WHERE slug = ?").bind(e).first()}async function De(t,e){return/^\d+$/.test(e)?await ot(t,parseInt(e)):await zt(t,e)}async function Wt(t,{status:e=void 0,page:a=1,perPage:s=10}={}){let n="SELECT * FROM posts",i="SELECT COUNT(*) as total FROM posts",l=[];e&&(n+=" WHERE status = ?",i+=" WHERE status = ?",l.push(e)),n+=" ORDER BY COALESCE(published_at, created_at) DESC LIMIT ? OFFSET ?";let r=(a-1)*s,c=await t.prepare(i).bind(...l).first(),d=c?c.total:0;return{posts:(await t.prepare(n).bind(...l,s,r).all()).results||[],total:d,page:a,perPage:s,totalPages:Math.ceil(d/s)}}async function $t(t,e=1,a=10){return Wt(t,{status:"published",page:e,perPage:a})}async function Sa(t,e,a){let s=a||null;try{await t.prepare("INSERT INTO tags (name, slug) VALUES (?, ?)").bind(e,s).run()}catch{}return await t.prepare("SELECT * FROM tags WHERE name = ?").bind(e).first()}async function Vt(t,e){return await t.prepare("SELECT * FROM tags WHERE id = ?").bind(e).first()}async function xa(t,e){return await t.prepare("SELECT * FROM tags WHERE slug = ?").bind(e).first()}async function Ca(t,e){return/^\d+$/.test(e)?await Vt(t,parseInt(e)):await xa(t,e)}async function Ue(t,e,{name:a,slug:s}){let n=s===void 0?void 0:s||null;n===void 0?await t.prepare("UPDATE tags SET name = ? WHERE id = ?").bind(a,e).run():await t.prepare("UPDATE tags SET name = ?, slug = ? WHERE id = ?").bind(a,n,e).run()}async function Me(t,e){await t.prepare("DELETE FROM post_tags WHERE tag_id = ?").bind(e).run(),await t.prepare("DELETE FROM tags WHERE id = ?").bind(e).run()}async function Pe(t,e){let a=await t.prepare("SELECT COUNT(*) as count FROM post_tags WHERE tag_id = ?").bind(e).first();return a?a.count:0}async function Fe(t){return(await t.prepare("DELETE FROM tags WHERE id NOT IN (SELECT DISTINCT tag_id FROM post_tags)").run()).meta.changes||0}async function ie(t){return(await t.prepare("SELECT * FROM tags ORDER BY id DESC").all()).results||[]}async function re(t,e,a){await t.prepare("DELETE FROM post_tags WHERE post_id = ?").bind(e).run();for(let s of a){if(!s.trim())continue;let n=await Sa(t,s.trim());n&&await t.prepare("INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)").bind(e,n.id).run()}}async function lt(t,e){return(await t.prepare("SELECT t.* FROM tags t INNER JOIN post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ? ORDER BY pt.rowid").bind(e).all()).results||[]}async function Be(t,e,a=1,s=10){let n=await Ca(t,e);if(!n)return{posts:[],total:0,page:a,perPage:s,totalPages:0,tag:null};let i=await t.prepare("SELECT COUNT(*) as total FROM posts p INNER JOIN post_tags pt ON p.id = pt.post_id WHERE pt.tag_id = ? AND p.status = ?").bind(n.id,"published").first(),l=i?i.total:0,r=(a-1)*s;return{posts:(await t.prepare("SELECT p.* FROM posts p INNER JOIN post_tags pt ON p.id = pt.post_id WHERE pt.tag_id = ? AND p.status = ? ORDER BY COALESCE(p.published_at, p.created_at) DESC LIMIT ? OFFSET ?").bind(n.id,"published",s,r).all()).results||[],total:l,page:a,perPage:s,totalPages:Math.ceil(l/s),tag:n}}async function oe(t,{r2_key:e,mime_type:a,size:s}){return(await t.prepare("INSERT INTO media (r2_key, mime_type, size) VALUES (?, ?, ?)").bind(e,a||"",s||0).run()).meta.last_row_id}async function Nn(t,e,a){await t.prepare("UPDATE media SET r2_key = ? WHERE id = ?").bind(a,e).run()}async function je(t,e){let a=await t.prepare("SELECT * FROM media WHERE id = ?").bind(e).first();return a&&await t.prepare("DELETE FROM media WHERE id = ?").bind(e).run(),a}async function le(t,e=1,a=20){let s=await t.prepare("SELECT COUNT(*) as total FROM media").first(),n=s?s.total:0,i=(e-1)*a;return{media:(await t.prepare("SELECT * FROM media ORDER BY created_at DESC LIMIT ? OFFSET ?").bind(a,i).all()).results||[],total:n,page:e,perPage:a,totalPages:Math.ceil(n/a)}}async function He(t,{type:e="",date:a="",page:s=1,perPage:n=20}={}){let i="",l=[];if(e==="image"?(i+=" WHERE mime_type LIKE ?",l.push("image/%")):e==="video"?(i+=" WHERE mime_type LIKE ?",l.push("video/%")):e==="file"&&(i+=" WHERE mime_type NOT LIKE ? AND mime_type NOT LIKE ?",l.push("image/%","video/%")),a){let[g,h]=a.split("-").map(Number),y=Math.floor(new Date(g,h-1,1).getTime()/1e3),m=Math.floor(new Date(g,h,1).getTime()/1e3);i+=(i?" AND":" WHERE")+" created_at >= ? AND created_at < ?",l.push(y,m)}let r=await t.prepare(`SELECT COUNT(*) as total FROM media${i}`).bind(...l).first(),c=r?r.total:0,d=(s-1)*n;return{media:(await t.prepare(`SELECT * FROM media${i} ORDER BY created_at DESC LIMIT ? OFFSET ?`).bind(...l,n,d).all()).results||[],total:c,page:s,perPage:n,totalPages:Math.ceil(c/n)}}async function qe(t){try{await t.prepare("SELECT id, slug, title, excerpt, cover_image, status, license, writing_time, word_count, created_at, updated_at, published_at FROM posts LIMIT 0").run(),await t.prepare("SELECT id, username, password_hash, salt, signing_key, display_name, session_days FROM users LIMIT 0").run(),await t.prepare("SELECT key, value FROM settings LIMIT 0").run(),await t.prepare("SELECT id, name, slug FROM tags LIMIT 0").run(),await t.prepare("SELECT post_id, tag_id FROM post_tags LIMIT 0").run(),await t.prepare("SELECT key, value FROM stats LIMIT 0").run(),await t.prepare("SELECT id, r2_key, mime_type, size FROM media LIMIT 0").run(),await t.prepare("SELECT hit_id, path_id, session, duration, created_at FROM ac_hits LIMIT 0").run(),await t.prepare("SELECT path_id, hour, total FROM ac_hit_counts LIMIT 0").run(),await t.prepare("SELECT system_id, browser_id, hour, count FROM ac_os_browser_stats LIMIT 0").run(),await t.prepare("SELECT country, city, region, as_org, hour, count FROM ac_city_isp_stats LIMIT 0").run(),await t.prepare("SELECT id, visitor_id, visitor_name, visitor_email, role, content, context, read_at, created_at FROM chat_messages LIMIT 0").run();let e=await C(t,"schema_version");return e?e===Bt:!await C(t,"setup_complete")}catch{return!1}}async function $n(t){return(await t.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%'").all()).results.map(a=>a.name)}async function wt(t,e,a,{preserveMedia:s=!1,preserveConfig:n=!0,preserveUsers:i=!0,preserveLangs:l=!0}={}){if(s&&a)try{if(n){let c=new Set(Ea),d=(await t.prepare("SELECT * FROM settings").all()).results||[],u={};for(let g of d)c.has(g.key)||(u[g.key]=g.value);await a.put("_site/config.json",JSON.stringify(u,null,2),{httpMetadata:{contentType:"application/json"}})}if(i){let d={users:(await t.prepare("SELECT username, password_hash, salt, signing_key, display_name, session_days FROM users").all()).results||[]};await a.put("_site/users.json",JSON.stringify(d,null,2),{httpMetadata:{contentType:"application/json"}})}}catch{}let r=s?[...Rn]:await $n(t);for(;r.length>0;){let c=[];for(let d of r)try{await t.prepare(`DROP TABLE IF EXISTS ${d}`).run()}catch{c.push(d)}if(c.length===r.length)break;r=c}if(Ta(),e){let c=await e.list({limit:1e3});for(;c.keys.length>0;){for(let d of c.keys)await e.delete(d.name);if(c.list_complete)break;c=await e.list({limit:1e3,cursor:c.cursor})}}if(a){let c=await a.list({limit:1e3});for(;c.objects.length>0;){for(let d of c.objects){if(s){if(!l&&d.key.startsWith("_site/lang/")){await a.delete(d.key);continue}continue}await a.delete(d.key)}if(!c.truncated)break;c=await a.list({limit:1e3,cursor:c.cursor})}}}async function Gt(t,e){let a=await t.prepare("SELECT value FROM stats WHERE key = ?").bind(e).first();return a?a.value:0}async function ce(t,e,a=1){await t.prepare("INSERT INTO stats (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = value + ?").bind(e,a,a).run()}async function Ye(t,e,a){await t.prepare("INSERT OR REPLACE INTO stats (key, value) VALUES (?, ?)").bind(e,a).run()}async function Xt(t,e,a){a<=0||await t.prepare("UPDATE posts SET writing_time = writing_time + ? WHERE id = ?").bind(a,e).run()}async function de(t,e,a){await t.prepare("UPDATE posts SET word_count = ? WHERE id = ?").bind(a,e).run()}async function ze(t){let e=await t.prepare("SELECT COALESCE(SUM(writing_time), 0) as total FROM posts").first();return e?e.total:0}async function We(t){let e=await t.prepare("SELECT COALESCE(SUM(word_count), 0) as total FROM posts WHERE status = ?").bind("published").first();return e?e.total:0}async function Ve(t){let e=(await t.prepare("SELECT * FROM posts ORDER BY COALESCE(published_at, created_at) DESC").all()).results||[],a=(await t.prepare("SELECT * FROM tags ORDER BY name").all()).results||[],s=(await t.prepare("SELECT * FROM post_tags").all()).results||[],n=ne.map(()=>"?").join(","),i=(await t.prepare(`SELECT * FROM settings WHERE key NOT IN (${n})`).bind(...ne).all()).results||[],l=(await t.prepare("SELECT * FROM media ORDER BY created_at DESC").all()).results||[],r=(await t.prepare("SELECT * FROM stats").all()).results||[];return{posts:e,tags:a,post_tags:s,settings:i,media:l,stats:r}}async function Ge(t,e){let a={};try{a.posts=(await t.prepare("SELECT * FROM posts ORDER BY COALESCE(published_at, created_at) DESC").all()).results||[]}catch{a.posts=[]}try{a.tags=(await t.prepare("SELECT * FROM tags ORDER BY name").all()).results||[]}catch{a.tags=[]}try{a.post_tags=(await t.prepare("SELECT * FROM post_tags").all()).results||[]}catch{a.post_tags=[]}try{let s=ne.map(()=>"?").join(",");a.settings=(await t.prepare(`SELECT * FROM settings WHERE key NOT IN (${s})`).bind(...ne).all()).results||[]}catch{a.settings=[]}try{a.media=(await t.prepare("SELECT * FROM media ORDER BY created_at DESC").all()).results||[]}catch{a.media=[]}try{a.stats=(await t.prepare("SELECT * FROM stats").all()).results||[]}catch{a.stats=[]}if(e&&a.posts.length>0)for(let s of a.posts)try{let n=await e.get(`post:${s.id}:content`);!n&&s.slug&&(n=await e.get(`post:${s.slug}:content`)),s.content=n||""}catch{s.content=""}return a}async function Ot(t,{visitor_id:e,visitor_name:a,visitor_email:s,role:n,content:i,context:l}){return(await t.prepare("INSERT INTO chat_messages (visitor_id, visitor_name, visitor_email, role, content, context) VALUES (?, ?, ?, ?, ?, ?)").bind(e,a||"",s||"",n,i,l?JSON.stringify(l):"").run()).meta.last_row_id}async function pe(t,e,{since:a=0,limit:s=50}={}){let n="SELECT * FROM chat_messages WHERE visitor_id = ?",i=[e];return a&&(n+=" AND id > ?",i.push(a)),n+=" ORDER BY created_at ASC LIMIT ?",i.push(s),(await t.prepare(n).bind(...i).all()).results||[]}async function Xe(t){return(await t.prepare(`
    SELECT m.visitor_id,
      m.content AS last_message, m.role AS last_role, m.created_at AS last_at,
      (SELECT visitor_name FROM chat_messages WHERE visitor_id = m.visitor_id AND visitor_name != '' ORDER BY id DESC LIMIT 1) AS visitor_name,
      (SELECT visitor_email FROM chat_messages WHERE visitor_id = m.visitor_id AND visitor_email != '' ORDER BY id DESC LIMIT 1) AS visitor_email,
      (SELECT COUNT(*) FROM chat_messages WHERE visitor_id = m.visitor_id AND role = 'visitor' AND read_at IS NULL) AS unread
    FROM chat_messages m
    INNER JOIN (SELECT visitor_id, MAX(id) AS max_id FROM chat_messages WHERE role IN ('visitor', 'admin') GROUP BY visitor_id) g ON m.id = g.max_id
    ORDER BY m.created_at DESC
  `).all()).results||[]}async function Je(t,e){await t.prepare("UPDATE chat_messages SET read_at = unixepoch() WHERE visitor_id = ? AND role = ? AND read_at IS NULL").bind(e,"visitor").run()}async function Ke(t,e){let a=await t.prepare("SELECT context FROM chat_messages WHERE visitor_id = ? AND role = ? AND context != ? ORDER BY id DESC LIMIT 1").bind(e,"visitor","").first(),s=a?.context?JSON.parse(a.context):{},n=await t.prepare("SELECT content FROM chat_messages WHERE visitor_id = ? AND role = ? ORDER BY id DESC LIMIT 1").bind(e,"note").first();return{...s,note:n?n.content:""}}async function Ze(t){let e=await t.prepare("SELECT COUNT(*) as total FROM chat_messages WHERE role = ? AND read_at IS NULL").bind("visitor").first();return e?e.total:0}var Bt,Sn,Ea,xn,ne,Rt,Cn,W,$e,Rn,tt=vt(()=>{k();Bt="2u8pzmmuc68f28af",Sn=[],Ea=["setup_complete","schema_version"],xn=["deepl_key"],ne=[...Sn,...Ea,...xn],Rt="",Cn=`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  signing_key TEXT NOT NULL,
  display_name TEXT DEFAULT NULL,
  session_days INTEGER DEFAULT 7,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  status TEXT DEFAULT 'draft',
  license TEXT NOT NULL DEFAULT 'CC-BY-NC-SA-4.0',
  writing_time INTEGER DEFAULT 0,
  word_count INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch()),
  published_at INTEGER
);

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS post_tags (
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE IF NOT EXISTS stats (
  key TEXT PRIMARY KEY,
  value INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  r2_key TEXT UNIQUE NOT NULL,
  mime_type TEXT DEFAULT '',
  size INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS ac_paths (
  path_id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS ac_refs (
  ref_id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref TEXT NOT NULL,
  ref_scheme TEXT NOT NULL DEFAULT '',
  UNIQUE(ref, ref_scheme)
);
INSERT OR IGNORE INTO ac_refs (ref_id, ref, ref_scheme) VALUES (1, '', 'o');

CREATE TABLE IF NOT EXISTS ac_browsers (
  browser_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  version TEXT,
  UNIQUE(name, version)
);

CREATE TABLE IF NOT EXISTS ac_systems (
  system_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  version TEXT,
  UNIQUE(name, version)
);

CREATE TABLE IF NOT EXISTS ac_hits (
  hit_id INTEGER PRIMARY KEY AUTOINCREMENT,
  path_id INTEGER NOT NULL,
  ref_id INTEGER NOT NULL DEFAULT 1,
  browser_id INTEGER NOT NULL,
  system_id INTEGER NOT NULL,
  session TEXT,
  first_visit INTEGER NOT NULL DEFAULT 0,
  bot INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL DEFAULT '',
  query TEXT NOT NULL DEFAULT '',
  width INTEGER,
  device_type TEXT NOT NULL DEFAULT '',
  device_model TEXT NOT NULL DEFAULT '',
  ip TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  timezone TEXT NOT NULL DEFAULT '',
  asn INTEGER,
  as_org TEXT NOT NULL DEFAULT '',
  colo TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT '',
  latitude REAL,
  longitude REAL,
  duration INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ac_hits_created ON ac_hits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ac_hits_path ON ac_hits(path_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ac_hits_session ON ac_hits(session, created_at);

CREATE TABLE IF NOT EXISTS ac_hit_counts (
  path_id INTEGER NOT NULL,
  hour TEXT NOT NULL,
  total INTEGER NOT NULL,
  UNIQUE(path_id, hour) ON CONFLICT REPLACE
);
CREATE INDEX IF NOT EXISTS idx_ac_hc_hour ON ac_hit_counts(hour);

CREATE TABLE IF NOT EXISTS ac_ref_counts (
  path_id INTEGER NOT NULL,
  ref_id INTEGER NOT NULL,
  hour TEXT NOT NULL,
  total INTEGER NOT NULL,
  UNIQUE(path_id, ref_id, hour) ON CONFLICT REPLACE
);
CREATE INDEX IF NOT EXISTS idx_ac_rc_hour ON ac_ref_counts(hour);

CREATE TABLE IF NOT EXISTS ac_os_browser_stats (
  system_id INTEGER NOT NULL,
  browser_id INTEGER NOT NULL,
  hour TEXT NOT NULL,
  count INTEGER NOT NULL,
  UNIQUE(system_id, browser_id, hour) ON CONFLICT REPLACE
);
CREATE INDEX IF NOT EXISTS idx_ac_obs_hour ON ac_os_browser_stats(hour);

CREATE TABLE IF NOT EXISTS ac_city_isp_stats (
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT '',
  as_org TEXT NOT NULL,
  asn INTEGER,
  latitude REAL,
  longitude REAL,
  hour TEXT NOT NULL,
  count INTEGER NOT NULL,
  UNIQUE(country, city, as_org, hour) ON CONFLICT REPLACE
);
CREATE INDEX IF NOT EXISTS idx_ac_cis_hour ON ac_city_isp_stats(hour);

CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL,
  visitor_name TEXT NOT NULL DEFAULT '',
  visitor_email TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'visitor',
  content TEXT NOT NULL,
  context TEXT NOT NULL DEFAULT '',
  read_at INTEGER,
  created_at INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_chat_visitor ON chat_messages(visitor_id, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_messages(created_at DESC);

`,W=[{value:"CC-BY-4.0",label:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/",icon:"https://i.creativecommons.org/l/by/4.0/80x15.png"},{value:"CC-BY-SA-4.0",label:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/",icon:"https://i.creativecommons.org/l/by-sa/4.0/80x15.png"},{value:"CC-BY-NC-4.0",label:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/",icon:"https://i.creativecommons.org/l/by-nc/4.0/80x15.png"},{value:"CC-BY-NC-SA-4.0",label:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/",icon:"https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png"},{value:"CC-BY-ND-4.0",label:"CC BY-ND 4.0",url:"https://creativecommons.org/licenses/by-nd/4.0/",icon:"https://i.creativecommons.org/l/by-nd/4.0/80x15.png"},{value:"CC-BY-NC-ND-4.0",label:"CC BY-NC-ND 4.0",url:"https://creativecommons.org/licenses/by-nc-nd/4.0/",icon:"https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png"},{value:"CC0-1.0",label:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/",icon:"https://i.creativecommons.org/p/zero/1.0/80x15.png"},{value:"ARR",label:"All Rights Reserved",url:""}],$e=!1;Rn=["post_tags","tags","posts","stats","media","settings","users"]});var et,Oa=vt(()=>{k();et={admin:"Admin",ai_engine_label:"Engine",ai_failed_generate:"AI generation failed.",ai_failed_review:"AI review failed.",ai_failed_rewrite:"AI rewrite failed.",ai_failed_translate:"Translation failed.",ai_heading_original:"Original ({time})",ai_heading_rewrite:"Rewritten ({time})",ai_heading_selected:"Selected Text ({time})",ai_heading_translate:"Translated ({time}), by {engine} from {source} to {target}",ai_not_bound_hint:"Please bind Workers AI to this Worker in Cloudflare Dashboard (Settings \u2192 Bindings \u2192 Workers AI, variable name: LF_AI). The free tier includes 10,000 neurons per day.",ai_quota_exceeded:"Today's AI free quota has been exhausted and will reset tomorrow. For more usage, you can enable a paid plan in the Cloudflare Dashboard.",ai_review_copied:"Copied!",ai_scope_full:"Target: full text",ai_scope_selected:"Target: selected text",ai_translate_auto:"Auto-detect",ai_translate_default_saved:"Default saved.",ai_translate_fail_error:"{engine} encountered an error.",ai_translate_fail_quota:"{engine} quota exhausted.",ai_translate_fail_unsupported:"{engine} does not support this language combination.",ai_translate_fallback_no_auto:"{engine} does not support auto-detect. Please select a source language.",ai_translate_no_engine:"No translation engine available. Configure a DeepL API key or bind Workers AI.",ai_translate_same_lang:"Source and target languages are the same.",ai_translate_search:"Search languages...",ai_translate_set_default_source:"Set as default source",ai_translate_set_default_target:"Set as default target",ai_translate_similar_lang:"Source and target are variants of the same language. Continue?",ai_translate_title:"AI Translate",ai_translating:"Translating...",analytics_back:"Back",analytics_bounce:"Bounce Rate",analytics_clear_confirm:"Are you sure you want to clear all analytics data? This cannot be undone.",analytics_device_desktop:"Desktop",analytics_device_mobile:"Mobile",analytics_device_tablet:"Tablet",analytics_direct:"direct",analytics_direct_visit:"Direct",analytics_duration:"Avg. Visit Time",analytics_fri:"Fri",analytics_mon:"Mon",analytics_next_page:"Next",analytics_no_flow:"Not enough page transitions",analytics_no_sessions:"No sessions in this period",analytics_pageviews:"Pageviews",analytics_prev_page:"Prev",analytics_sankey_title:"Page Flow",analytics_sat:"Sat",analytics_sessions_title:"Visitor Sessions",analytics_sun:"Sun",analytics_thu:"Thu",analytics_timezone:"Timezone",analytics_title:"Analytics",analytics_tue:"Tue",analytics_visitors:"Unique Visitors",analytics_visits:"Visits",analytics_wed:"Wed",btn_publish:"Publish",btn_unpublish:"Unpublish",chat_disable:"Disable",chat_enable:"Enable",chat_title:"Visitor Chat",chat_you:"You",confirm_delete_post:"Delete this post?",cover_not_image:"Please select an image file",cover_select_title:"Select Image",dashboard_title:"Dashboard",default_blog_title:"My Blog",edit_post_title:"Edit Post",editor_insert_media:"Insert Media",editor_select_cover:"Select",err_db_error_title:"Database Error",err_db_not_found_msg:"Please bind a D1 database to this Worker with variable name <code>LF_DB</code>.",err_db_not_found_title:"Database Not Found",err_no_file:"No file provided.",err_password_complexity:"Password must contain both letters and numbers.",err_password_min:"Password must be at least 6 characters.",err_password_no_spaces:"Password must not contain spaces.",err_passwords_mismatch:"Passwords do not match.",err_quota_d1_msg:"The D1 database free tier limit has been reached (5M reads or 100K writes per day). It will reset tomorrow.",err_quota_d1_title:"Database Limit Reached",err_quota_kv_msg:"The KV storage free tier limit has been reached (100K reads or 1K writes per day). It will reset tomorrow.",err_quota_kv_title:"Storage Limit Reached",err_quota_msg:"A Cloudflare free tier limit has been reached. It will reset automatically. For higher limits, upgrade your Cloudflare plan.",err_quota_r2_msg:"The R2 storage free tier limit has been reached (10M reads or 1M writes per month). It will reset next month.",err_quota_r2_title:"Object Storage Limit Reached",err_quota_title:"Service Limit Reached",err_title_required:"Title is required.",err_username_invalid:"Username can only contain letters, numbers, hyphens and underscores.",err_username_password_required:"Username and password are required.",error_prefix:"Error: ",footer_crafted:"Crafted with {time} of dedication, totaling {count} characters",footer_powered_line:"Infrastructure hosted by {cloudflare}{sep}App supported by {gaobo}",footer_pv:"{pv} page views",footer_time_days:"{n} days",footer_time_hours:"{n} hours",footer_time_less_hour:"less than an hour",footer_time_months:"{n} months",footer_time_years:"{n} years",footer_time_years_months:"{y} years {m} months",footer_visitor_welcome:"Welcome, visitor #{uv} from {location}",full_reset_confirm_prompt:"Are you absolutely sure? All data and media will be permanently deleted!",hint_slug_rules:"Letters, numbers, hyphens and underscores only. Max 200 chars. Leave empty to use post ID.",import_complete:"Import Complete",import_failed:"Import Failed",import_settings_list:"Settings restored",import_summary:"Imported {posts} post(s), {tags} tag(s), {media} media file(s).",import_title:"Import Data",internal_error:"Internal Error",lang_direction_source:"source languages",lang_direction_target:"target languages",lang_group_common:"Common",lang_group_default:"Default",lang_group_other:"Other",lang_group_other_engine:"Other {engine} supported {direction}",lang_group_site:"Site Languages",lang_no_results:"No results",license_arr_label:"All Rights Reserved",license_hint_ARR:"All rights reserved, no reuse without permission.","license_hint_CC-BY-4.0":"Allows any use including commercial and modifications, attribution required.","license_hint_CC-BY-NC-4.0":"Allows modifications, attribution required, no commercial use.","license_hint_CC-BY-NC-ND-4.0":"Attribution required, no commercial use, no modifications.","license_hint_CC-BY-NC-SA-4.0":"Attribution required, no commercial use, derivatives must use the same license.","license_hint_CC-BY-ND-4.0":"Allows commercial use, attribution required, no modifications.","license_hint_CC-BY-SA-4.0":"Allows commercial use and modifications, attribution required, derivatives must use the same license.","license_hint_CC0-1.0":"Waives all rights, anyone may use the work in any way.",license_learn_more:"Learn more",license_warn_cc:"Note: CC licenses are irrevocable. Even if you later change to a more restrictive license, prior uses under the original license remain valid.",license_warn_cc0:"Warning: CC0 is irrevocable. Once applied, you cannot retroactively restrict how others have already used your work.",login_invalid:"Invalid username or password.",login_title:"Login - Logflare",media_confirm_delete:"Delete?",media_insert_btn:"Insert",media_no_media:"No media yet",media_title:"Media",method_not_allowed:"Method Not Allowed",new_post_title:"New Post",not_found:"Not Found",post_published:"Post published successfully.",post_saved:"Post saved successfully.",post_unpublished:"Post unpublished successfully.",posts_title:"Posts",reset_confirm_prompt:"Are you sure?",reset_password_title:"Reset Password - Logflare",settings_title:"Settings",setup_failed:"Setup failed: ",setup_invalid_data:"Invalid setup data. Please start over.",setup_invalid_request:"Invalid request.",setup_title:"Setup - Logflare",slug_reserved:"This slug is reserved and cannot be used.",tag_clean_confirm:"Delete all tags not used by any post?",tag_clean_done:"Removed {count} unused tag(s).",tag_delete_confirm:"Delete this tag? Posts will not be deleted.",tag_edit:"Edit Tag",tag_name_required:"Tag name is required.",tag_prefix:"Tag: ",tags_title:"Tags"}});function Ma(t){pt=t}function ut(){return pt}function B(t){return`https://${pt}/${Da}/${t}`}function ue(t){return`https://${pt}/npm/${t}`}function kn(t){return`https://${pt}/gh/${t}`}function at(t){let e=t.indexOf("/"),a=e===-1?t:t.substring(0,e),s=Dn[a];if(!s)return`https://${pt}/gh/onegbnet/ccs@MISSING-${a}/${t}`;let n=e===-1?"":t.substring(e+1);return`https://${pt}/${s}${n?"/"+n:""}`}function be(t){return kn(`highlightjs/cdn-release@11/build/styles/${t||"github"}.min.css`)}function Jt(t,e,a=!1,s=!1,n=!1){let i=detectPageLang(e),l=i==="he"||i==="ar"?"rtl":"ltr";if(!a){let u=Aa[i]||Aa.en;return`<!DOCTYPE html>
<html lang="${i}" dir="${l}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Logflare - ${u.title}</title><style>${Ia}
.login-form { display:none; margin-top:16px; }
.login-form.show { display:block; }
.login-form input { width:100%; margin-bottom:8px; }
.admin-link { margin-top:24px; text-align:center; }
.login-error { color:#ff3b30; font-size:0.85rem; margin-bottom:8px; }
</style></head>
<body>
  <div class="card" style="text-align:center;">
    <h1>${u.title}</h1>
    <p>${u.desc}</p>
    <div class="admin-link">
      <button type="button" class="btn btn-primary" onclick="document.getElementById('loginForm').classList.add('show');this.style.display='none'">${u.admin_btn}</button>
    </div>
    <form method="POST" action="/emergency-login" class="login-form${s?" show":""}" id="loginForm" style="text-align:start;">
      ${s?`<div class="login-error">${u.login_error}</div>`:""}
      <input type="text" name="username" placeholder="${u.username}" required autocomplete="username">
      <input type="password" name="password" placeholder="${u.password}" required autocomplete="current-password">
      <button type="submit" class="btn btn-primary" style="width:100%;">${u.login}</button>
    </form>
  </div>
</body></html>`}let r=ka[i]||ka.en,c=t?`https://${pt}/gh/${An}@${t}/index.js`:"",d=t?`
    <div class="section opt" onclick="activate(this)">
      <h2>${r.opt1_title}</h2>
      <p>${r.opt1_desc}</p>
      <p style="margin-top:12px;"><a href="${c}" class="btn btn-primary" download="index.js">${r.opt1_btn}</a></p>
    </div>`:"";return`<!DOCTYPE html>
<html lang="${i}" dir="${l}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Logflare - ${r.title}</title><style>${Ia}
.opt { cursor: pointer; transition: all 0.2s; }
.opt.disabled { opacity: 0.35; }
.opt.disabled a, .opt.disabled button, .opt.disabled input { pointer-events: none; }
.opt.active { opacity: 1; cursor: default; border-color: #0071e3; box-shadow: 0 0 0 2px rgba(0,113,227,0.3); }
.opt.active.danger { border-color: #ff3b30; box-shadow: 0 0 0 2px rgba(255,59,48,0.3); }
</style></head>
<body>
  <div class="card">
    <h1>${r.title}</h1>
    <p>${r.desc}</p>
    ${d}
    <div class="section opt" onclick="activate(this)">
      <h2>${r.opt2_title}</h2>
      <p>${r.opt2_desc}</p>
      <ol>
        <li>${r.opt2_step1} <a href="/emergency-export" class="btn btn-outline" style="margin-left:4px;" onclick="this.closest('.opt').querySelector('.reset-group').style.display='block'">${r.opt2_step1_btn}</a></li>
        <li>${r.opt2_step2}<br><br>
          <div class="reset-group" style="display:none;">
            <form method="POST" action="/emergency-reset">
              <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:0.85rem;cursor:pointer;"><input type="checkbox" name="preserve_config" value="1" checked> ${r.preserve_config}</label>
              <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:0.85rem;cursor:pointer;"><input type="checkbox" name="preserve_users" value="1" checked> ${r.preserve_users}</label>
              ${n?`<label style="display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:0.85rem;cursor:pointer;"><input type="checkbox" name="preserve_langs" value="1" checked> ${r.preserve_langs}</label>`:""}
              <input type="text" name="confirm" placeholder="RESET" autocomplete="off" style="width:120px;margin-right:8px;">
              <button type="submit" class="btn btn-primary" onclick="return this.form.confirm.value==='RESET'||alert('Type RESET to confirm')&&false">${r.opt2_step2_btn}</button>
            </form>
          </div>
        </li>
        <li>${r.opt2_step3}</li>
      </ol>
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid #ff3b30;">
        <h3 style="color:#ff3b30;margin-bottom:8px;">${r.opt3_title}</h3>
        <p style="font-size:0.95rem;font-weight:700;color:#ff3b30;text-transform:uppercase;margin-bottom:12px;">${r.opt3_desc}</p>
        <form method="POST" action="/emergency-full-reset">
          <input type="text" name="confirm" placeholder="FULLRESET" autocomplete="off" style="width:140px;margin-right:8px;">
          <button type="submit" class="btn btn-danger" onclick="return this.form.confirm.value==='FULLRESET'||alert('${r.opt3_confirm}')&&false">${r.opt3_btn}</button>
        </form>
      </div>
    </div>
  </div>
  <script>
  function activate(el) {
    document.querySelectorAll('.opt').forEach(function(o) {
      o.classList.toggle('disabled', o !== el);
      o.classList.toggle('active', o === el);
    });
  }
  <\/script>
</body></html>`}var Da,Ua,An,pt,Dn,me,ge,fe,_e,he,Ia,Aa,ka,nt=vt(()=>{k();Da="gh/onegbnet/logflare@db5b1a7868ce1647d1abea53da9ad13e466546a1/assets",Ua=(()=>{let t=/@([a-f0-9{}A-Z_]+)\//.exec(Da);return t?t[1].slice(0,7):"dev"})(),An="onegbnet/logflare",pt="cdn.jsdelivr.net";Dn=typeof j<"u"?j:{};me=()=>ue("markdown-it@14/dist/markdown-it.min.js"),ge=()=>ue("markdown-it-texmath@1/texmath.min.js"),fe=()=>ue("katex@0.16/dist/katex.min.js"),_e=()=>ue("katex@0.16/dist/katex.min.css"),he=()=>B("hljs.min.js");Ia=`
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f7; color: #1d1d1f;
  display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px;
  font-size: 0.95rem; line-height: 1.6;
}
:focus-visible { outline: 2px solid rgba(0,113,227,0.4); outline-offset: 2px; }
:focus:not(:focus-visible) { outline: none; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
@media (prefers-contrast: more) { .btn-outline { border-width: 2px; } .section { border-width: 2px; } }
.card {
  background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 48px; max-width: 560px; width: 100%;
}
.card h1 { font-size: 1.5rem; margin-bottom: 12px; line-height: 1.3; }
.card p, .card li { color: #6e6e73; font-size: 0.95rem; line-height: 1.6; }
.card a { color: #0071e3; text-decoration: none; }
.spinner {
  width: 40px; height: 40px; border: 4px solid #e5e5e7; border-top-color: #0071e3;
  border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 20px;
}
@keyframes spin { to { transform: rotate(360deg); } }
.status { font-size: 0.85rem; color: #6e6e73; margin-top: 16px; }
.section { margin-top: 28px; padding: 20px; border: 1px solid #e5e5e7; border-radius: 12px; }
.section h2 { font-size: 1.1rem; margin-bottom: 8px; line-height: 1.3; }
.section.danger { border-color: #ff3b30; }
.section.danger h2 { color: #ff3b30; }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 24px; border-radius: 8px; font-size: 0.95rem;
  font-weight: 500; border: none; cursor: pointer; font-family: inherit;
  text-decoration: none; text-align: center; min-height: 44px;
  transition: background 0.2s;
}
.btn:active { transform: scale(0.98); }
.btn-primary { background: #0071e3; color: #fff; }
.btn-primary:hover { background: #0077ED; }
.btn-danger { background: #ff3b30; color: #fff; }
.btn-danger:hover { background: #e0342d; }
.btn-outline { background: transparent; border: 1px solid #e5e5e7; color: #1d1d1f; }
.btn-outline:hover { background: #f0f0f2; border-color: #0071e3; color: #0071e3; }
input[type=text], input[type=password] {
  padding: 10px 12px; border: 1px solid #e5e5e7; border-radius: 6px; font-size: 0.95rem;
  font-family: inherit; min-height: 44px;
}
input[type=text]:focus, input[type=password]:focus {
  outline: none; border-color: #0071e3; box-shadow: 0 0 0 3px rgba(0,113,227,0.1);
}
ol { padding-left: 1.2em; margin: 12px 0; }
ol li { margin-bottom: 6px; }
`,Aa={en:{title:"Under Maintenance",desc:"The site is being upgraded. Please check back shortly.",admin_btn:"I'm the admin",username:"Username",password:"Password",login:"Login",login_error:"Invalid username or password."}},ka={en:{title:"Version Incompatible",desc:"The database structure is not compatible with this version of Logflare. Choose one of the options below.",opt1_title:"Roll Back (Recommended)",opt1_desc:"Download the compatible version and paste it back into your Worker. All your data and media will be preserved.",opt1_btn:"Download index.js",opt2_title:"Export, Reset & Re-import",opt2_desc:"Keep your media files and migrate your data to the new version:",opt2_step1:"Download your data backup:",opt2_step1_btn:"Download Export JSON",opt2_step2:"Reset the database (media files are preserved):",opt2_step2_btn:"Reset (Keep Media)",opt2_step3:"After reset, complete the setup wizard, then go to Admin \u2192 Import to restore your data.",opt3_title:"Full Reset",opt3_desc:"Erase all data and media files permanently. This cannot be undone. All options above will be ignored \u2014 nothing will be preserved.",opt3_btn:"Full Reset",opt3_confirm:"Type FULLRESET to confirm",preserve_config:"Preserve Site Info",preserve_users:"Preserve User Info",preserve_langs:"Preserve custom languages"}}});function Pa(t){return Un.indexOf(t)!==-1}function Fa(t){let e=t;return{t:function(a){return e&&e[a]||t[a]||a},setActive:function(a){e=a||t}}}function Ba(t,e){if(e=e||ea,!t)return"en";let a=t.split(",").map(s=>s.split(";")[0].trim().toLowerCase()).filter(Boolean);for(let s of a){if(e.indexOf(s)!==-1)return s;if(/^zh-(hant|tw|hk|mo)/.test(s)&&e.indexOf("zh-tw")!==-1)return"zh-tw";if(/^zh/.test(s)&&e.indexOf("zh-cn")!==-1)return"zh-cn";let n=s.split("-")[0];if(e.indexOf(n)!==-1)return n}return"en"}var ea,Un,ja=vt(()=>{k();ea=["en","eo","fr","de","es","it","nl","da","zh-cn","zh-tw","ja","ko","ms","vi","th","ta","my","uk","he","ar"],Un=["he","ar"]});async function St(){if(ye)return ye;try{let t=await fetch(B("lang/en.json"));t.ok&&(ye=await t.json())}catch{}return ye||et}function we(t){let e=t?Qt:qa;return[...X,...e]}function Mn(t){if(!Kt[t])try{Kt[t]=new Intl.DisplayNames([t],{type:"language"}).of(t)}catch{Kt[t]=t}}function Zt(t){return t?t.toLowerCase():"en"}async function za(t,e,a){let s=Zt(e);if(X.includes(s)){if(Tt[s])return Tt[s];if(s==="en")return et;try{let l=await fetch(B(`lang/${s}.json`));if(!l.ok)return et;let r=await l.json();return Tt[s]=r,r}catch{return et}}let n=`${a?"admin":"visitor"}:${s}`;if(Tt[n])return Tt[n];if(!t)return et;let i=a?"lang/admin":"lang/visitor";try{let l=await t.get(`_site/${i}/${s}.json`);if(!l)return et;let r=JSON.parse(await l.text());return Tt[n]=r,r}catch{return et}}async function Wa(t,e,a,s){if(t)try{let n=new Set,i=await t.list({prefix:`_site/${e}/`,limit:50});for(let l of i.objects){let r=l.key.match(new RegExp(`^_site/${e}/(.+)\\.json$`));r&&n.add(r[1])}for(let l of n)a.add(l),Mn(l);for(let l of a)n.has(l)||(a.delete(l),delete Tt[`${s}:${l}`])}catch{}}async function Va(t){await Wa(t,"lang/admin",Qt,"admin")}async function Ga(t){await Wa(t,"lang/visitor",qa,"visitor")}function Xa(t,e){sa=Zt(ve?aa:t),Ya.setActive(e||et)}function J(){return sa}function Ee(){return Pa(sa)}function o(t){return Ya.t(t)}function Ja(t,e,a){if(ve)return Zt(aa);let s=(a||X).map(Zt);if(e){let i=Zt(e);if(s.includes(i))return i}let n=t.headers.get("Accept-Language")||"";return Ba(n,s)}function Te(t){return(t.headers.get("Accept-Language")||"").split(",").map(s=>s.split(";")[0].trim())[0]||"en"}var ye,ve,aa,Ha,X,Qt,qa,Kt,Tt,sa,Ya,Q=vt(()=>{k();Oa();nt();ja();ye=null;ve=!1,aa=null,Ha=ve,X=ea,Qt=new Set,qa=new Set,Kt={en:"English",eo:"Esperanto",fr:"Fran\xE7ais",de:"Deutsch",es:"Espa\xF1ol",it:"Italiano",nl:"Nederlands",da:"Dansk","zh-cn":"\u7B80\u4F53\u4E2D\u6587","zh-tw":"\u7E41\u9AD4\u4E2D\u6587",ja:"\u65E5\u672C\u8A9E",ko:"\uD55C\uAD6D\uC5B4",ms:"Bahasa Melayu",vi:"Ti\u1EBFng Vi\u1EC7t",th:"\u0E44\u0E17\u0E22",ta:"\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",my:"\u1019\u103C\u1014\u103A\u1019\u102C\u1018\u102C\u101E\u102C",uk:"\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",he:"\u05E2\u05D1\u05E8\u05D9\u05EA",ar:"\u0627\u0644\u0639\u0631\u0628\u064A\u0629"};Tt={en:et},sa=ve?aa:"en",Ya=Fa(et)});var ts={};wa(ts,{syncLanguageKeys:()=>Bn,translateAllKeys:()=>na,translateAllKeysAI:()=>Qa,translateAllKeysDeepL:()=>Za,translatePrompt:()=>mt});async function Ka(t,e){let a=`${Pn}?q=${encodeURIComponent(t)}&langpair=en|${e}&de=m@one.gb.net`,s=await fetch(a);return s.ok&&(await s.json()).responseData?.translatedText||t}async function mt(t,e){try{return await Ka(t,e)}catch{return t}}async function na(t,e={}){let a=await St(),s=Object.keys(a),n={...e},i=s.filter(d=>!e[d]),l=[],r=[],c=0;for(let d of i){let g=a[d].length+8;c+g>450&&r.length>0&&(l.push(r),r=[],c=0),r.push(d),c+=g}r.length>0&&l.push(r);for(let d=0;d<l.length;d++){let u=l[d],g=y=>`###${String(y).padStart(3,"0")}###`,h=u.map((y,m)=>`${g(m+1)} ${a[y]}`).join(`
`);d>0&&await new Promise(y=>setTimeout(y,500));try{let y=await Ka(h,t);for(let m=0;m<u.length;m++){let w=g(m+1),S=g(m+2),D=y.indexOf(w);if(D===-1){n[u[m]]=a[u[m]];continue}let L=D+w.length,f=m<u.length-1?y.indexOf(S):y.length,b=y.substring(L,f===-1?y.length:f).trim();n[u[m]]=b||a[u[m]]}}catch{for(let m of u)n[m]=a[m]}}return n}async function Za(t,e,a={}){let s=await St(),i=Object.keys(s).filter(d=>!a[d]);if(i.length===0)return{...a};let l=e.toUpperCase();l==="ZH-CN"&&(l="ZH-HANS"),l==="ZH-TW"&&(l="ZH-HANT");let r={...a},c=50;try{for(let d=0;d<i.length;d+=c){let u=i.slice(d,d+c),g=new URLSearchParams;for(let m of u)g.append("text",s[m]);g.append("source_lang","EN"),g.append("target_lang",l);let h=await fetch(Fn,{method:"POST",headers:{Authorization:`DeepL-Auth-Key ${t}`,"Content-Type":"application/x-www-form-urlencoded"},body:g.toString()});if(!h.ok)throw new Error(`DeepL API error: ${h.status}`);let y=await h.json();for(let m=0;m<u.length;m++)r[u[m]]=y.translations?.[m]?.text||s[u[m]]}return r}catch{for(let u of i)r[u]||(r[u]=s[u]);return r}}async function Qa(t,e,a={}){if(!t)return na(e,a);let s=await St(),i=Object.keys(s).filter(c=>!a[c]);if(i.length===0)return{...a};let l=e.split("-")[0],r={...a};try{for(let c of i)try{let d=await t.run("@cf/meta/m2m100-1.2b",{text:s[c],source_lang:"english",target_lang:l});r[c]=d.translated_text||s[c]}catch{r[c]=s[c]}return r}catch{for(let d of i)r[d]||(r[d]=s[d]);return r}}async function Bn(t,e,a=null,s=null){let n=await St(),i=new Set(Object.keys(n)),l=new Set(Object.keys(e)),r=[...i].filter(u=>!l.has(u)),c=[...l].filter(u=>!i.has(u));if(r.length===0&&c.length===0)return null;let d={};for(let u of i)d[u]=e[u]||null;if(r.length>0){let u;return s?u=await Za(s,t,d):a?u=await Qa(a,t,d):u=await na(t,d),u}return d}var Pn,Fn,te=vt(()=>{k();Q();Pn="https://api.mymemory.translated.net/get",Fn="https://api-free.deepl.com/v2/translate"});k();k();var se=class{constructor(){this.routes=[],this.middlewares=[]}use(e){this.middlewares.push(e)}get(e,a){this.routes.push({method:"GET",path:e,handler:a})}post(e,a){this.routes.push({method:"POST",path:e,handler:a})}_match(e,a){let s=e.split("/").filter(Boolean),n=a.split("/").filter(Boolean);if(s.length!==n.length)return null;let i={};for(let l=0;l<s.length;l++)if(s[l].startsWith(":"))i[s[l].slice(1)]=decodeURIComponent(n[l]);else if(s[l]!==n[l])return null;return i}async handle(e,a){let s=new URL(e.url),n=s.pathname,i=e.method,l={request:e,env:a,url:s,path:n,params:{},query:Object.fromEntries(s.searchParams)};for(let r of this.middlewares){let c=await r(l);if(c instanceof Response)return c}for(let r of this.routes){if(r.method!==i)continue;let c=this._match(r.path,n);if(c!==null)return l.params=c,await r.handler(l)}return new Response("Not Found",{status:404,headers:{"Content-Type":"text/html; charset=utf-8"}})}};tt();k();function It(){let t=new Uint8Array(16);return crypto.getRandomValues(t),Array.from(t).map(e=>e.toString(16).padStart(2,"0")).join("")}async function Et(t,e){let a=new TextEncoder,s=await crypto.subtle.importKey("raw",a.encode(t),"PBKDF2",!1,["deriveBits"]),n=await crypto.subtle.deriveBits({name:"PBKDF2",salt:a.encode(e),iterations:1e5,hash:"SHA-256"},s,256);return Array.from(new Uint8Array(n)).map(i=>i.toString(16).padStart(2,"0")).join("")}async function At(t,e,a){return await Et(t,e)===a}function kt(t){return!t||t.length<6?"err_password_min":/\s/.test(t)?"err_password_no_spaces":!/[a-zA-Z]/.test(t)||!/[0-9]/.test(t)?"err_password_complexity":null}async function Na(t,e){let a=new TextEncoder,s=await crypto.subtle.importKey("raw",a.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),n=await crypto.subtle.sign("HMAC",s,a.encode(t));return Array.from(new Uint8Array(n)).map(i=>i.toString(16).padStart(2,"0")).join("")}var Ra=7,On=24;async function ct(t,e,a=Ra*On){let s=Date.now()+a*60*60*1e3,n=`${t}.${s}`,i=await Na(n,e);return`${n}.${i}`}async function Qe(t,e){if(!t)return null;let a=t.split(".");if(a.length!==3)return null;let[s,n,i]=a;if(Date.now()>parseInt(n))return null;let l=`${s}.${n}`,r=await Na(l,e);return i!==r?null:parseInt(s)}function ta(t){let e={};return t&&t.split(";").forEach(a=>{let[s,...n]=a.trim().split("=");s&&(e[s.trim()]=n.join("=").trim())}),e}var In=86400;function dt(t,e=Ra){return`logflare_auth=${t}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${e*In}`}function $a(){return"logflare_auth=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"}Q();nt();te();k();k();Q();nt();tt();var gt={};function as(t){gt=t||{}}function es(t){if(Ha)return"";let e=J(),a=we(t),s=a.filter(r=>X.includes(r)),n=a.filter(r=>!X.includes(r)),i=r=>`<option value="${r}" ${r===e?"selected":""}>${Kt[r]||r}</option>`,l=s.map(i).join("");return n.length>0&&(l+='<optgroup label="\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500">'+n.map(i).join("")+"</optgroup>"),`
    <div class="lang-switcher">
      <select onchange="fetch('/admin/lang',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'lang='+this.value}).then(()=>location.reload())">
        ${l}
      </select>
    </div>
  `}var ia=`<link rel="stylesheet" href="${B("style.min.css")}">`,ra='<link rel="icon" type="image/svg+xml" href="/favicon.svg">';function jn(t){if(t<3600)return o("footer_time_less_hour");let e=Math.floor(t/3600);if(e<24)return o("footer_time_hours").replace("{n}",e);let a=Math.floor(e/24);if(a<30)return o("footer_time_days").replace("{n}",a);let s=Math.floor(a/30);if(s<12)return o("footer_time_months").replace("{n}",s);let n=Math.floor(s/12),i=s%12;return i===0?o("footer_time_years").replace("{n}",n):o("footer_time_years_months").replace("{y}",n).replace("{m}",i)}function Hn(t){let e=J();if(e==="zh-cn"||e==="zh-tw"||e==="zh"||e==="ja"){if(t>=1e5)return Math.floor(t/1e4)+" \u4E07";if(t>=1e4){let a=t/1e4;return(a%1===0?a.toFixed(0):a.toFixed(1).replace(/\.0$/,""))+" \u4E07"}}else{if(t>=1e5)return Math.floor(t/1e3)+"K";if(t>=1e4)return(t/1e3).toFixed(1).replace(/\.0$/,"")+"K"}return t.toLocaleString()}function qn(t,e,a){let s=new Date().getFullYear(),n=e?' \xB7 <a href="/admin" data-i18n="admin">Admin</a>':"",i=a||{},l=i.createdYear||s.toString(),c=`<div>&copy; ${l===s.toString()?s:`${l} - ${s}`} \xB7 ${p(t||"Logflare")}${n}</div>`,d="";if(i.showVisitor){let g=i.city&&i.city!==i.country?`${i.city}, ${i.country}`:i.country||"",h=o("footer_visitor_welcome").replace("{uv}",(i.uv||0).toLocaleString()).replace("{location}",g||"?"),y=o("footer_pv").replace("{pv}",(i.pv||0).toLocaleString()),m="";(i.totalWritingTime>0||i.totalWordCount>0)&&(m=" \xB7 "+o("footer_crafted").replace("{time}",jn(i.totalWritingTime||0)).replace("{count}",Hn(i.totalWordCount||0))),d=`<div>${h} \xB7 ${y}${m}</div>`}let u="";if(i.showPowered!==!1){let g='style="white-space:nowrap"',h=`<a href="https://www.cloudflare.com" target="_blank" rel="noopener" ${g}>Cloudflare</a>`,y=`<img src="${B("gaobo.png")}" alt="\u9AD8\u535A\u7684\u4E16\u754C" style="height:20px;vertical-align:middle;margin:0 2px;">`,m=`<a href="https://go.gb.net/gaobo" target="_blank" rel="noopener" ${g}>${y}\u9AD8\u535A\u7684\u4E16\u754C</a>`;u=`<div>${o("footer_powered_line").replace("{cloudflare}",h).replace("{gaobo}",m).replace("{sep}",'<span class="footer-sep"> \xB7 </span>')}</div>`}return`<footer class="site-footer"><div class="container">${c}${d}${u}</div></footer>`}function Y({title:t="",body:e="",head:a="",siteTitle:s="",siteSubtitle:n="",isSetup:i=!1,isAdmin:l=!1,user:r=null,noindex:c=!1,footerData:d=null,langBanner:u=""}){let g=J(),h=Ee()?"rtl":"ltr",y=X.includes(g)?g:"en",m=`<script src="${B(`i18n-${y}.min.js`)}" defer><\/script>`;return i?`<!DOCTYPE html>
<html lang="${g}" dir="${h}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p(t)}</title>
  ${ra}
  ${ia}
  ${m}
  <script src="${at("field/client.min.js")}" defer><\/script>
  ${a}
</head>
<body>
  <div class="setup-lang-switcher">${es(!0)}</div>
  ${e}
</body>
</html>`:l?`<!DOCTYPE html>
<html lang="${g}" dir="${h}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p(t)} - ${o("admin")}</title>
  <script>var _CDN='${ut()}';<\/script>
  ${ra}
  ${ia}
  ${m}
  <link rel="stylesheet" href="${at("overlay/style.min.css")}">
  <link rel="stylesheet" href="${at("spinner/style.min.css")}">
  <script src="${at("action/client.min.js")}" defer><\/script>
  <script src="${at("field/client.min.js")}" defer><\/script>
  <script src="${at("overlay/client.min.js")}" defer><\/script>
  <script src="${at("textarea-edit/client.min.js")}" defer><\/script>
  <script>window.ccConfirm=function(f,e,m){e.preventDefault();if(window.Overlay&&Overlay.confirm){Overlay.confirm(m).then(function(ok){if(ok)f.submit();});}else if(window.confirm(m)){f.submit();}return false;};<\/script>
  ${a}
</head>
<body>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="logo"><img src="${B("logflare.png")}" alt="Logflare" style="width:100%;display:block;margin-bottom:8px;"><span style="display:block;text-align:center;">Logflare</span></div>
      <nav>
        <a href="/admin" data-i18n="nav_dashboard">Dashboard</a>
        <a href="/admin/posts" data-i18n="nav_posts">Posts</a>
        <a href="/admin/media" data-i18n="nav_media">Media</a>
        <a href="/admin/tags" data-i18n="nav_tags">Tags</a>
        <a href="/admin/settings" data-i18n="nav_settings">Settings</a>
        <a href="/admin/analytics" data-i18n="nav_analytics">Analytics</a>
        <a href="/admin/chat" data-i18n="nav_chat">Chat</a>
        <a href="/admin/export" data-i18n="nav_export">Export</a>
        <a href="/admin/import" data-i18n="nav_import">Import</a>
        <a href="/" target="_blank" data-i18n="nav_view_site">View Site</a>
      </nav>
      <div style="margin-top:auto;border-top:1px solid rgba(255,255,255,0.1);padding:12px 20px;">
        <form method="POST" action="/admin/logout">
          <button type="submit" style="background:none;border:none;color:rgba(255,255,255,0.7);font-size:0.9rem;cursor:pointer;padding:0;font-family:inherit;" data-i18n="logout">Logout</button>
        </form>
        <div style="color:rgba(255,255,255,0.3);font-size:0.7rem;margin-top:8px;font-family:'SF Mono',Menlo,monospace;display:grid;grid-template-columns:auto 1fr;gap:0 6px;"><span data-i18n="version_assets">Assets</span><span>${Ua}</span><span data-i18n="version_db">DB Schema</span><span>${Bt}</span></div>
      </div>
    </aside>
    <div class="sidebar-overlay" onclick="document.querySelector('.admin-sidebar').classList.remove('open');this.style.display='none'"></div>
    <main class="admin-main">
      <div class="admin-topbar">
        <button class="mobile-menu-btn" onclick="var s=document.querySelector('.admin-sidebar');s.classList.toggle('open')">&#9776;</button>
        ${es(!0)}
      </div>
      ${e}
    </main>
  </div>
  <script src="${B("admin-ui.js")}" defer><\/script>
  <script>if(location.search)history.replaceState(null,'',location.pathname);<\/script>
</body>
</html>`:`<!DOCTYPE html>
<html lang="${g}" dir="${h}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p(t)}${s&&s!==t?" - "+p(s):""}</title>
  ${ra}
  <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml">
  ${c?'<meta name="robots" content="noindex, nofollow">':""}
  ${ia}
  ${m}
  ${a}
</head>
<body>
  <header class="site-header">
    <div class="container">
      <div>
        <div class="site-title"><a href="/">${p(s||"Logflare")}</a></div>
        ${n?`<div class="site-subtitle">${p(n)}</div>`:""}
      </div>
      <nav class="site-nav">
        <a href="/" data-i18n="home">Home</a>
        <a href="/feed.xml" data-i18n="rss">RSS</a>
      </nav>
    </div>
  </header>
  <main class="container">
    ${u}
    ${e}
  </main>
  ${qn(s,r,d)}
  ${(()=>{let w=D=>JSON.stringify(D).replace(/</g,"\\u003c"),S=[];return(r||gt.lf_skipac==="t")&&S.push("L.skipac=1"),gt.lf_chat_name&&S.push(`L.chatName=${w(decodeURIComponent(gt.lf_chat_name))}`),gt.lf_chat_email&&S.push(`L.chatEmail=${w(decodeURIComponent(gt.lf_chat_email))}`),gt.lf_translate_engine&&S.push(`L.translateEngine=${w(decodeURIComponent(gt.lf_translate_engine))}`),S.length?`<script>(function(){var L=window._LF=window._LF||{};${S.join(";")};})();<\/script>`:""})()}
  <script defer src="${B("count.js")}"><\/script>
  <!-- Chat Widget -->
  <div id="lf-chat-widget" style="display:none;">
    <div id="lf-chat-window" style="display:none;">
      <div id="lf-chat-header">
        <span data-i18n="chat_widget_title">Chat with us</span>
        <button id="lf-chat-close" data-i18n-aria="chat_widget_close" aria-label="Close chat">&times;</button>
      </div>
      <div id="lf-chat-body"></div>
      <div id="lf-chat-info" style="display:none;">
        <input type="text" id="lf-chat-name" data-i18n-ph="chat_widget_name_placeholder" placeholder="Your name (optional)">
        <input type="email" id="lf-chat-email" data-i18n-ph="chat_widget_email_placeholder" placeholder="Your email (optional)">
        <div style="display:flex;gap:8px;">
          <button id="lf-chat-info-save" class="lf-chat-btn" style="flex:1;" data-i18n="save">Save</button>
          <button id="lf-chat-info-cancel" class="lf-chat-btn" style="flex:1;background:var(--border);color:var(--text);" data-i18n="cancel">Cancel</button>
        </div>
      </div>
      <div id="lf-chat-footer" style="display:none;">
        <form id="lf-chat-form" class="lf-chat-form">
          <input type="text" id="lf-chat-input" class="lf-chat-input" data-i18n-ph="chat_widget_input_placeholder" placeholder="Type a message..." autocomplete="off">
          <button type="submit" class="lf-chat-btn" data-i18n="chat_send">Send</button>
          <button type="button" id="lf-chat-settings" class="lf-chat-settings-btn" aria-label="Settings"><svg style="width:1em;height:1em;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button>
        </form>
      </div>
    </div>
    <button id="lf-chat-toggle" data-i18n-aria="chat_widget_title" aria-label="Chat with us">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </button>
  </div>
  <script src="${B("chat.js")}" defer><\/script>
</body>
</html>`}function p(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"):""}function Dt(t){if(!t)return"";let e=new Date(t*1e3),a=J();return e.toLocaleDateString(a,{year:"numeric",month:"long",day:"numeric"})}function I(t,e=200,a={}){return new Response(t,{status:e,headers:{"Content-Type":"text/html; charset=utf-8",...a}})}function E(t,e=200){return new Response(JSON.stringify(t),{status:e,headers:{"Content-Type":"application/json; charset=utf-8"}})}function z(t,e=302){return new Response(null,{status:e,headers:{Location:t}})}nt();tt();Q();te();Q();function st(t=1,e="",a={},s=""){let n="";t===1?n=`
      <h1 data-i18n="setup_welcome">Welcome to Logflare</h1>
      <p class="subtitle" data-i18n="setup_welcome_subtitle">Let's set up your blog in a few seconds.</p>
      ${e?`<div class="alert alert-error">${p(e)}</div>`:""}
      <form method="POST" action="/" data-password-form>
        <input type="hidden" name="step" value="1">
        <div class="form-group">
          <label data-i18n="label_admin_username">Admin Username</label>
          <input type="text" name="username" value="${p(a.username||"admin")}" required autocomplete="username">
        </div>
        <div class="form-group">
          <label data-i18n="label_admin_password">Admin Password</label>
          <input type="password" name="password" required autocomplete="new-password" oninput="this.setCustomValidity('')">
          <div class="form-hint" data-i18n="hint_password_rules">At least 6 characters, must contain letters and numbers, no spaces.</div>
        </div>
        <div class="form-group">
          <label data-i18n="label_confirm_password">Confirm Password</label>
          <input type="password" name="password_confirm" required autocomplete="new-password" oninput="this.setCustomValidity('')">
        </div>
        <button type="submit" class="btn btn-primary btn-block" data-i18n="setup_create_admin">Create Admin Account</button>
      </form>
      <script>window._LF={i18n:{err_password_min:${JSON.stringify(o("err_password_min"))},err_password_no_spaces:${JSON.stringify(o("err_password_no_spaces"))},err_password_complexity:${JSON.stringify(o("err_password_complexity"))},err_passwords_mismatch:${JSON.stringify(o("err_passwords_mismatch"))}}};<\/script>
      <script src="${B("setup-ui.js")}" defer><\/script>
    `:t===2&&(n=`
      <h1 data-i18n="setup_site_settings">Site Settings</h1>
      <p class="subtitle" data-i18n="setup_site_settings_subtitle">Give your blog a name and description.</p>
      ${e?`<div class="alert alert-error">${p(e)}</div>`:""}
      <form method="POST" action="/">
        <input type="hidden" name="step" value="2">
        <input type="hidden" name="username" value="${p(a.username)}">
        <input type="hidden" name="password_hash" value="${p(a.password_hash)}">
        <input type="hidden" name="salt" value="${p(a.salt)}">
        <div class="form-group">
          <label data-i18n="label_site_title">Site Title</label>
          <input type="text" name="site_title" value="${p(a.site_title||o("default_blog_title"))}" required>
        </div>
        <div class="form-group">
          <label data-i18n="label_site_subtitle">Site Subtitle</label>
          <input type="text" name="site_subtitle" value="${p(a.site_subtitle||"")}" data-i18n-ph="hint_subtitle_optional" placeholder="A short tagline (optional)">
        </div>
        <div class="form-group">
          <label data-i18n="label_site_description">Site Description</label>
          <textarea name="site_description" rows="3" data-i18n-ph="hint_description_optional" placeholder="Brief description for SEO (optional)">${p(a.site_description||"")}</textarea>
        </div>
        <div class="form-group">
          <label data-i18n="label_default_license">Default License</label>
          <select name="default_license" id="defaultLicenseSelect">${W.map(l=>`<option value="${l.value}" ${(a.default_license||"CC-BY-NC-SA-4.0")===l.value?"selected":""}>${l.value==="ARR"?o("license_arr_label"):l.label}</option>`).join("")}</select>
          <div class="form-hint" id="licenseHint"></div>
          <div class="form-hint" id="licenseWarn" style="margin-top:8px;color:var(--danger);display:none;"></div>
        </div>
        <script>window._LF={licHints:${JSON.stringify(Object.fromEntries(W.map(l=>[l.value,{hint:o("license_hint_"+l.value),url:l.url}])))},licWarn:${JSON.stringify({"CC0-1.0":o("license_warn_cc0"),"CC-BY-4.0":o("license_warn_cc"),"CC-BY-SA-4.0":o("license_warn_cc"),"CC-BY-NC-4.0":o("license_warn_cc"),"CC-BY-NC-SA-4.0":o("license_warn_cc"),"CC-BY-ND-4.0":o("license_warn_cc"),"CC-BY-NC-ND-4.0":o("license_warn_cc")})},i18n:{license_learn_more:${JSON.stringify(o("license_learn_more"))},err_password_min:${JSON.stringify(o("err_password_min"))},err_password_no_spaces:${JSON.stringify(o("err_password_no_spaces"))},err_password_complexity:${JSON.stringify(o("err_password_complexity"))},err_passwords_mismatch:${JSON.stringify(o("err_passwords_mismatch"))}}};<\/script>
        <script src="${B("setup-ui.js")}" defer><\/script>
        <div class="form-group">
          <label class="toggle-label">
            <span data-i18n="label_noindex">Hide from Search Engines</span>
            <input type="checkbox" name="noindex" value="1" ${a.noindex?"checked":""} class="toggle-input">
            <span class="toggle-switch"></span>
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-block" data-i18n="setup_complete_site">Complete Site Configuration</button>
      </form>
    `);let i=Y({title:o("setup_title"),isSetup:!0,body:`<div class="setup-page"><div class="setup-card">${s}${n}</div></div>`});return I(i)}async function oa(t){let e=Te(t.request),a=t.supportedLangs;if(e==="en"||a.includes(e))return"";let s=e.split("-")[0];if(a.some(n=>n===s||n.split("-")[0]===s))return"";try{let n="English",i=e;try{n=new Intl.DisplayNames(["en"],{type:"language"}).of(t.lang)||"English"}catch{}try{i=new Intl.DisplayNames(["en"],{type:"language"}).of(e)||e}catch{}let l=`Can't read ${n}? Click here to use ${i}!`,r=await mt(l,e);return r===l?"":`<div class="alert alert-info alert-flex" dir="${["ar","he","fa","ur","ps","yi"].includes(e.split("-")[0])?"rtl":"ltr"}" id="langAlert">
      <a href="/setup-translate?lang=${e}&source=admin">${r}</a>
      <button class="alert-dismiss" onclick="document.getElementById('langAlert').remove()" title="Dismiss">&times;</button>
    </div>`}catch{return""}}async function Se(t){let e=t.r2,a=t.db;if(e){let i=!1,l=!1;try{let r=await e.get("_site/config.json");if(r){let c=JSON.parse(await r.text());for(let[d,u]of Object.entries(c))await F(a,d,u);await e.delete("_site/config.json"),l=!0}}catch{}try{let r=await e.get("_site/users.json");if(r){let c=JSON.parse(await r.text());for(let d of c.users||[])await jt(a,d.username,d.password_hash,d.salt,d.display_name||null,d.signing_key||null);await e.delete("_site/users.json"),i=!0}}catch{}if(i&&l){await F(a,"setup_complete","true");let r=await a.prepare("SELECT id, signing_key, session_days FROM users LIMIT 1").first();if(r){let c=await ct(r.id,r.signing_key,r.session_days*24);return new Response(null,{status:302,headers:{Location:"/admin","Set-Cookie":dt(c,r.session_days)}})}return new Response(null,{status:302,headers:{Location:"/"}})}if(i&&!l){let r=await oa(t),c=await C(a,"site_title")||"",d=await C(a,"site_subtitle")||"",u=await C(a,"site_description")||"",g=await C(a,"default_license")||"",h=await C(a,"noindex")==="1";return st(2,"",{username:"_restored_",password_hash:"_restored_",salt:"_restored_",site_title:c,site_subtitle:d,site_description:u,default_license:g,noindex:h},r)}}if(await a.prepare("SELECT id FROM users LIMIT 1").first()){let i=await oa(t),l=await C(a,"site_title")||"",r=await C(a,"site_subtitle")||"",c=await C(a,"site_description")||"",d=await C(a,"default_license")||"",u=await C(a,"noindex")==="1";return st(2,"",{username:"_restored_",password_hash:"_restored_",salt:"_restored_",site_title:l,site_subtitle:r,site_description:c,default_license:d,noindex:u},i)}let n=await oa(t);return st(1,"",{},n)}async function ns(t){let a=(t.query.lang||"").replace(/[^a-zA-Z0-9-]/g,"").slice(0,20),s=t.query.source==="admin"?"admin":"visitor",n=s==="admin",i=n?"lang/admin":"lang/visitor";if(!a||a==="en"||X.includes(a))return new Response(null,{status:302,headers:{Location:"/"}});if(t.r2&&await t.r2.head(`_site/${i}/${a}.json`))return new Response(null,{status:302,headers:{Location:"/","Set-Cookie":`logflare_lang=${encodeURIComponent(a)}; Path=/; Max-Age=${365*24*3600}; SameSite=Strict; Secure`}});let l=n?await C(t.db,"deepl_key"):null,r=n?t.ai:null,d=`Translating via ${l?"DeepL":r?"Workers AI":"MyMemory"}, please wait...`,u="This translation is generated by machine and may not be fully accurate.";try{let[h,y]=await Promise.all([mt(d,a),mt(u,a)]);d=h,u=y}catch{}let g=`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Logflare - ${d}</title><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:#f5f5f7; color:#1d1d1f; display:flex; align-items:center; justify-content:center; min-height:100vh; padding:20px; font-size:0.95rem; }
.card { background:#fff; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:48px; max-width:560px; width:100%; text-align:center; }
.spinner { width:40px; height:40px; border:4px solid #e5e5e7; border-top-color:#0071e3; border-radius:50%; animation:spin 0.8s linear infinite; margin:0 auto 20px; }
@keyframes spin { to { transform:rotate(360deg); } }
h1 { font-size:1.5rem; margin-bottom:12px; }
.progress-text { color:#6e6e73; font-size:0.85rem; margin-bottom:8px; }
.progress-bar { background:#e5e5e7; border-radius:4px; height:6px; overflow:hidden; margin-bottom:16px; }
.progress-fill { background:#0071e3; height:100%; width:0%; border-radius:4px; transition:width 0.3s; }
.quality-notice { margin-top:20px; padding:16px; background:#fff8e1; border-radius:8px; color:#7a6200; }
</style></head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <h1>${d}</h1>
    <div class="progress-text" id="progressText">0%</div>
    <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>
    <div class="quality-notice">${u}</div>
  </div>
  <script>
  (function(){
    var offset=0;
    function next(){
      fetch('/setup-translate-batch?lang=${a}&source=${s}&offset='+offset)
        .then(function(r){return r.json()})
        .then(function(d){
          document.getElementById('progressFill').style.width=d.progress+'%';
          document.getElementById('progressText').textContent=Math.round(d.progress)+'%';
          if(d.done){
            fetch('/api/prefs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:'${a}'})}).then(function(){location.href='/';});
          } else {
            offset=d.next;
            next();
          }
        })
        .catch(function(){ setTimeout(next,2000); });
    }
    next();
  })();
  <\/script>
</body></html>`;return new Response(g,{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}})}var ss=30;async function is(t){let e=(t.query.lang||"").replace(/[^a-zA-Z0-9-]/g,"").slice(0,20),a=t.query.source==="admin"?"admin":"visitor",s=parseInt(t.query.offset||"0",10),n=a==="admin",i=n?"lang/admin":"lang/visitor",l=await St(),r=t.r2,c=n?await C(t.db,"deepl_key"):null,d=n?t.ai:null,u=Object.keys(l),g=u.slice(s,s+ss),h={};if(s>0)try{let w=await r.get(`_site/${i}/${e}.partial.json`);w&&(h=JSON.parse(await w.text()))}catch{}if(c)try{let w=new URLSearchParams;for(let L of g)w.append("text",l[L]);w.append("source_lang","EN");let S=e.toUpperCase();S==="ZH-CN"&&(S="ZH-HANS"),S==="ZH-TW"&&(S="ZH-HANT"),w.append("target_lang",S);let D=await fetch("https://api-free.deepl.com/v2/translate",{method:"POST",headers:{Authorization:`DeepL-Auth-Key ${c}`,"Content-Type":"application/x-www-form-urlencoded"},body:w.toString()});if(D.ok){let L=await D.json();for(let f=0;f<g.length;f++)h[g[f]]=L.translations?.[f]?.text||l[g[f]]}else for(let L of g)h[L]=l[L]}catch{for(let S of g)h[S]=l[S]}else if(d)for(let w of g)try{let S=await d.run("@cf/meta/m2m100-1.2b",{text:l[w],source_lang:"english",target_lang:e.split("-")[0]});h[w]=S.translated_text||l[w]}catch{h[w]=l[w]}else{let{translateAllKeys:w}=await Promise.resolve().then(()=>(te(),ts)),S={};for(let L of g)S[L]=null;let D=await w(e,{...h,...S});for(let L of g)h[L]=D[L]||l[L]}let y=s+ss,m=y>=u.length;if(m){await r.put(`_site/${i}/${e}.json`,JSON.stringify(h,null,2),{httpMetadata:{contentType:"application/json"}});try{await r.delete(`_site/${i}/${e}.partial.json`)}catch{}}else await r.put(`_site/${i}/${e}.partial.json`,JSON.stringify(h,null,2),{httpMetadata:{contentType:"application/json"}});return new Response(JSON.stringify({done:m,next:y,progress:Math.min(100,y/u.length*100)}),{headers:{"Content-Type":"application/json"}})}async function rs(t){let e=await t.request.formData(),a=e.get("step");if(a==="1"){let s=e.get("username")?.trim(),n=e.get("password"),i=e.get("password_confirm");if(!s||!n)return st(1,o("err_username_password_required"),{username:s});if(!/^[a-zA-Z0-9_\-]+$/.test(s))return st(1,o("err_username_invalid"),{username:s});let l=kt(n);if(l)return st(1,o(l),{username:s});if(n!==i)return st(1,o("err_passwords_mismatch"),{username:s});let r=It(),c=await Et(n,r);return await jt(t.db,s,c,r),new Response(null,{status:302,headers:{Location:"/"}})}if(a==="2"){let s=e.get("username")?.trim(),n=e.get("password_hash"),i=e.get("salt"),l=e.get("site_title")?.trim()||o("default_blog_title"),r=e.get("site_subtitle")?.trim()||"",c=e.get("site_description")?.trim()||"";if(!s||!n||!i)return st(1,o("setup_invalid_data"));let d=t.db;try{s!=="_restored_"&&await jt(d,s,n,i),await F(d,"site_title",l),await F(d,"site_subtitle",r),await F(d,"site_description",c),await F(d,"default_license",e.get("default_license")?.trim()||"CC-BY-NC-SA-4.0"),await F(d,"site_created_year",new Date().getFullYear().toString()),await F(d,"default_translate_lang",t.lang),await F(d,"default_translate_source_lang",t.lang),e.get("noindex")==="1"&&await F(d,"noindex","1"),await F(d,"setup_complete","true");let u=s==="_restored_"?await d.prepare("SELECT id, signing_key, session_days FROM users LIMIT 1").first():await d.prepare("SELECT id, signing_key, session_days FROM users WHERE username = ?").bind(s).first(),g=await ct(u.id,u.signing_key,u.session_days*24);return new Response(null,{status:302,headers:{Location:"/admin","Set-Cookie":dt(g,u.session_days)}})}catch(u){return st(1,o("setup_failed")+u.message)}}return st(1,o("setup_invalid_request"))}k();tt();Q();nt();function xt(t="",e="/admin"){let a=Y({title:o("login_title"),isSetup:!0,body:`
      <div class="setup-page">
        <div class="setup-card">
          <h1 data-i18n="login_heading">Admin Login</h1>
          <p class="subtitle" data-i18n="login_subtitle">Sign in to manage your blog.</p>
          ${t?`<div class="alert alert-error">${p(t)}</div>`:""}
          <form method="POST" action="/admin/login">
            <input type="hidden" name="return_to" value="${p(e)}">
            <div class="form-group">
              <label data-i18n="label_username">Username</label>
              <input type="text" name="username" required autocomplete="username">
            </div>
            <div class="form-group">
              <label data-i18n="label_password">Password</label>
              <input type="password" name="password" required autocomplete="current-password">
            </div>
            <button type="submit" class="btn btn-primary btn-block" data-i18n="login">Login</button>
          </form>
          <p style="margin-top:16px;text-align:center;font-size:0.85rem;color:var(--text-secondary);">
            <a href="javascript:void(0)" onclick="document.getElementById('forgotTip').style.display=document.getElementById('forgotTip').style.display==='none'?'block':'none'" style="color:var(--text-secondary);text-decoration:underline;" data-i18n="forgot_password">Forgot password?</a>
          </p>
          <div id="forgotTip" style="display:none;margin-top:12px;padding:12px 16px;background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius);font-size:0.85rem;color:var(--text-secondary);" data-i18n-html="forgot_password_tip">
            Go to Cloudflare Dashboard \u2192 KV \u2192 the KV namespace bound as LF_KV, add a key RESET_PASSWORD with any value, then visit /admin to reset your password.
          </div>
        </div>
      </div>
    `});return I(a)}async function os(t){let e=await t.request.formData(),a=e.get("username")?.trim(),s=e.get("password"),n=e.get("return_to")||"/admin";if(!a||!s)return xt(o("err_username_password_required"),n);let i=t.db,l=await Ht(i,a);if(!l)return xt(o("login_invalid"),n);if(!await At(s,l.salt,l.password_hash))return xt(o("login_invalid"),n);let c=await ct(l.id,l.signing_key,l.session_days*24);return new Response(null,{status:302,headers:{Location:n,"Set-Cookie":dt(c,l.session_days)}})}function xe(t=""){let e=Y({title:o("reset_password_title"),isSetup:!0,body:`
      <div class="setup-page">
        <div class="setup-card">
          <h1 data-i18n="reset_password_heading">Reset Password</h1>
          <p class="subtitle" data-i18n="reset_password_subtitle">Set a new password for the admin account.</p>
          ${t?`<div class="alert alert-error">${p(t)}</div>`:""}
          <form method="POST" action="/admin/reset-password" data-password-form>
            <div class="form-group">
              <label data-i18n="label_new_password">New Password</label>
              <input type="password" name="new_password" required autocomplete="new-password" oninput="this.setCustomValidity('')">
              <div class="form-hint" data-i18n="hint_password_rules">At least 6 characters, must contain letters and numbers, no spaces.</div>
            </div>
            <div class="form-group">
              <label data-i18n="label_confirm_password">Confirm Password</label>
              <input type="password" name="new_password_confirm" required autocomplete="new-password" oninput="this.setCustomValidity('')">
            </div>
            <button type="submit" class="btn btn-primary btn-block" data-i18n="btn_reset_password">Reset Password</button>
          </form>
          <script>window._LF={i18n:{err_password_min:${JSON.stringify(o("err_password_min"))},err_password_no_spaces:${JSON.stringify(o("err_password_no_spaces"))},err_password_complexity:${JSON.stringify(o("err_password_complexity"))},err_passwords_mismatch:${JSON.stringify(o("err_passwords_mismatch"))}}};<\/script>
          <script src="${B("setup-ui.js")}" defer><\/script>
        </div>
      </div>
    `});return I(e)}async function ls(t){let e=t.kv;if(!e||!await e.get("RESET_PASSWORD"))return xt("","/admin");let s=await t.request.formData(),n=s.get("new_password"),i=s.get("new_password_confirm"),l=kt(n);if(l)return xe(o(l));if(n!==i)return xe(o("err_passwords_mismatch"));let r=It(),c=await Et(n,r);await qt(t.db,1,c,r),await e.delete("RESET_PASSWORD");let d=await rt(t.db,1),u=await ct(1,d.signing_key,d.session_days*24);return new Response(null,{status:302,headers:{Location:"/admin","Set-Cookie":dt(u,d.session_days)}})}async function cs(t){return new Response(null,{status:302,headers:{Location:"/","Set-Cookie":$a()}})}k();tt();k();k();function Yn(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function la(t){if(!t)return"";let e=[];t=t.replace(/```(\w*)\n([\s\S]*?)```/g,(n,i,l)=>{let r=e.length;return e.push(`<pre><code${i?` class="language-${i}"`:""}>${Yn(l.trim())}</code></pre>`),`
%%CODEBLOCK_${r}%%
`});let a=t.split(/\n{2,}/),s=[];for(let n of a){if(n=n.trim(),!n)continue;if(/^%%CODEBLOCK_\d+%%$/.test(n)){let r=parseInt(n.match(/\d+/)[0]);s.push(e[r]);continue}if(/^(-{3,}|\*{3,}|_{3,})$/.test(n)){s.push("<hr>");continue}let i=n.match(/^(#{1,6})\s+(.+)$/);if(i){let r=i[1].length;s.push(`<h${r}>${ee(i[2])}</h${r}>`);continue}if(n.startsWith(">")){let r=n.split(`
`).map(c=>c.replace(/^>\s?/,""));s.push(`<blockquote><p>${ee(r.join(" "))}</p></blockquote>`);continue}if(/^[-*+]\s/.test(n)){let r=n.split(`
`).filter(c=>/^[-*+]\s/.test(c)).map(c=>c.replace(/^[-*+]\s+/,""));s.push("<ul>"+r.map(c=>`<li>${ee(c)}</li>`).join("")+"</ul>");continue}if(/^\d+\.\s/.test(n)){let r=n.split(`
`).filter(c=>/^\d+\.\s/.test(c)).map(c=>c.replace(/^\d+\.\s+/,""));s.push("<ol>"+r.map(c=>`<li>${ee(c)}</li>`).join("")+"</ol>");continue}let l=n.split(`
`).map(r=>ee(r)).join("<br>");s.push(`<p>${l}</p>`)}return s.join(`
`)}function ee(t){return t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1">').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>').replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*\*(.+?)\*\*\*/g,"<strong><em>$1</em></strong>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/~~(.+?)~~/g,"<del>$1</del>")}Q();te();nt();async function ca(t){let e=await C(t,"site_title")||"Logflare",a=await C(t,"site_subtitle")||"",s=await C(t,"site_description")||"",n=await rt(t,1),i=n?.display_name||n?.username||"",l=await C(t,"noindex")==="1",r=await C(t,"default_license")||"CC-BY-NC-SA-4.0";return{title:e,subtitle:a,description:s,author:i,noindex:l,defaultLicense:r}}async function da(t){if((t.request.headers.get("Cookie")||"").includes("logflare_lang_dismiss=1"))return"";let a=Te(t.request),s=t.supportedLangs;if(a==="en"||s.includes(a))return"";let n=a.split("-")[0];if(s.some(i=>i===n||i.split("-")[0]===n))return"";try{let i="English",l=a;try{i=new Intl.DisplayNames(["en"],{type:"language"}).of(t.lang)||"English"}catch{}try{l=new Intl.DisplayNames(["en"],{type:"language"}).of(a)||a}catch{}let r=`Can't read ${i}? Click here to use ${l}!`,c="Don't show again",[d,u]=await Promise.all([mt(r,a),mt(c,a)]);return d===r?"":`<div class="alert alert-info alert-flex" dir="${["ar","he","fa","ur","ps","yi"].includes(a.split("-")[0])?"rtl":"ltr"}" id="langAlert">
      <a href="/setup-translate?lang=${a}&source=visitor">${d}</a>
      <span class="alert-actions">
        <a href="javascript:void(0)" onclick="document.getElementById('langAlert').remove();fetch('/api/prefs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang_dismiss:1})})">${u}</a>
        <button class="alert-dismiss" onclick="document.getElementById('langAlert').remove()" title="Dismiss">&times;</button>
      </span>
    </div>`}catch{return""}}async function pa(t){let e=t.db,a=Math.floor(Date.now()/1e3);await ce(e,"pv");let n=`v:${t.request.headers.get("CF-Connecting-IP")||t.request.headers.get("X-Forwarded-For")||"unknown"}`,i=await Gt(e,n);if((!i||a-i>86400)&&(await ce(e,"uv"),await Ye(e,n,a)),Math.random()<.01)try{await e.prepare("DELETE FROM stats WHERE key LIKE 'v:%' AND value < ?").bind(a-86400).run()}catch{}let l=t.request.cf||{},r=l.country||"",c=l.city||"",d=await C(e,"footer_show_visitor")==="1",u=await C(e,"footer_show_powered")!=="0",g=await C(e,"site_created_year")||new Date().getFullYear().toString(),h=await Gt(e,"pv"),y=await Gt(e,"uv"),m=await ze(e),w=await We(e);return{pv:h,uv:y,country:r,city:c,showVisitor:d,showPowered:u,createdYear:g,totalWritingTime:m,totalWordCount:w}}function ds(t,e=[],a=null,s="",n=""){let i=`/${t.slug||t.id}`,l=t.cover_image?`<img class="post-card-cover" src="${p(t.cover_image)}" alt="${p(t.title)}">`:"",r=e.length>0?`<div class="post-card-tags">${e.map(d=>`<a href="/tag/${d.slug||d.id}" class="tag-badge">${p(d.name)}</a>`).join("")}</div>`:"",c=a?`<a href="/admin/posts/${t.id}/edit" class="post-edit-link" data-i18n="edit_post">Edit</a>`:"";return`
    <article class="post-card">
      ${l}
      <div class="post-card-body">
        <h2 class="post-card-title"><a href="${p(i)}">${p(t.title)}</a></h2>
        ${t.excerpt?`<p class="post-card-excerpt">${p(t.excerpt)}</p>`:""}
        <div class="post-card-meta">
          <span>${Dt(t.published_at||t.created_at)}${s?" \xB7 "+p(s):""} \xB7 ${us(t.license||n)}</span>
          ${c}
        </div>
        ${r}
      </div>
    </article>
  `}function ps(t,e,a="/"){if(e<=1)return"";let s=a.includes("?")?"&":"?",n='<div class="pagination">';t>1&&(n+=`<a href="${a}${s}page=${t-1}">&laquo; <span data-i18n="prev">Prev</span></a>`);for(let i=1;i<=e;i++)i===t?n+=`<span class="current">${i}</span>`:n+=`<a href="${a}${s}page=${i}">${i}</a>`;return t<e&&(n+=`<a href="${a}${s}page=${t+1}"><span data-i18n="next">Next</span> &raquo;</a>`),n+="</div>",n}var zn='<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" class="license-icon-svg"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="8" y="11.5" text-anchor="middle" font-size="10" font-weight="bold" font-family="sans-serif">R</text></svg>';function us(t){let e=W.find(s=>s.value===t);if(!e)return"";if(e.icon)return`<a href="${e.url}" target="_blank" rel="noopener noreferrer" class="license-link" title="${e.label}"><img src="${e.icon}" alt="${e.label}" class="license-icon"></a>`;let a=e.value==="ARR"?o("license_arr_label"):e.label;return`<span class="license-link">${zn} ${p(a)}</span>`}function Wn(t,e){let a=e?p(e):"",s=us(t);return s?`<div class="post-license">${a}${a?" \xB7 ":""}${s}</div>`:""}async function ms(t){let e=t.db,a=await ca(e),[s,n]=await Promise.all([pa(t),da(t)]),i=parseInt(t.query.page)||1,{posts:l,totalPages:r}=await $t(e,i),c=[];for(let g of l){let h=await lt(e,g.id);c.push(ds(g,h,t.user,a.author,a.defaultLicense))}let d="";l.length===0?d=`
      <div class="empty-state">
        <h2 data-i18n="no_posts_yet">No posts yet</h2>
        ${t.user?'<p data-i18n-html="no_posts_hint">Go to admin panel to create your first post.</p>':""}
      </div>
    `:d=`
      <div class="posts-grid">${c.join("")}</div>
      ${ps(i,r)}
    `;let u=`
    <meta name="description" content="${p(a.description)}">
    <meta property="og:title" content="${p(a.title)}">
    <meta property="og:description" content="${p(a.description)}">
    <meta property="og:type" content="website">
  `;return I(Y({title:a.title,body:d,head:u,siteTitle:a.title,siteSubtitle:a.subtitle,user:t.user,noindex:a.noindex,footerData:s,langBanner:n}))}async function gs(t){let e=t.db,a=t.kv,s=await ca(e),[n,i]=await Promise.all([pa(t),da(t)]),{identifier:l}=t.params,r=await De(e,l);if(!r||r.status!=="published")return I(Y({title:o("not_found"),body:`<div class="empty-state"><h2 data-i18n="post_not_found">This post is not yet published or has been taken down</h2><p><a href="/" data-i18n="back_to_home">Back to home</a></p></div><script>var _t=setTimeout(function(){location.href='/'},10000);document.addEventListener('click',function(){clearTimeout(_t)})<\/script>`,siteTitle:s.title,siteSubtitle:s.subtitle,user:t.user}),404);if(/^\d+$/.test(l)&&r.slug)return new Response(null,{status:301,headers:{Location:`/${r.slug}`,"Cache-Control":"no-cache"}});let c="";try{c=await a.get(`post:${r.id}:content`)||""}catch{c=""}let d=await lt(e,r.id),u=d.length>0?`<div class="post-card-tags" style="margin-top:16px">${d.map(P=>`<a href="/tag/${P.slug||P.id}" class="tag-badge">${p(P.name)}</a>`).join("")}</div>`:"",g=t.user?`<a href="/admin/posts/${r.id}/edit" class="post-edit-link" data-i18n="edit_post">Edit</a>`:"",h=(t.request.headers.get("User-Agent")||"").toLowerCase(),y=/googlebot|bingbot|yandexbot|baiduspider|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot/.test(h),m=y?la(c):"",w=c.replace(/<\/script/gi,"<\\/script"),S=/\$\$[^\$]+\$\$/.test(c)||/(?<![\\$])\$((?:\S)|(?:\S[^\$]*?\S))\$(?!\d)/.test(c),D=await C(e,"hljs_theme")||"github",L=r.cover_image?`<img class="post-cover" src="${p(r.cover_image)}" alt="${p(r.title)}">`:"",f=`
    <link rel="stylesheet" href="${be(D)}">
    <script src="${me()}" defer><\/script>
    <script src="${he()}" defer><\/script>`;S&&(f+=`
    <link rel="stylesheet" href="${_e()}">
    <script src="${fe()}" defer><\/script>
    <script src="${ge()}" defer><\/script>`),f+=`<script>window._LF={cdn:${JSON.stringify(ut())}};<\/script>
    <script src="${B("post-render.js")}" defer><\/script>`;let b=`
    <article class="post-content">
      ${L}
      <h1>${p(r.title)}</h1>
      <div class="post-meta">
        ${Dt(r.published_at||r.created_at)}
        ${g}
        ${u}
      </div>
      <div class="post-body" id="postBody">${m}</div>
      ${Wn(r.license||s.defaultLicense,s.author)}
    </article>
    ${y?"":`<script id="postMarkdown" type="text/markdown">${w}<\/script>
    ${f}`}
  `,_=new URL(t.request.url).origin,v=`${_}/${r.slug||r.id}`,N=r.cover_image?r.cover_image.startsWith("http")?r.cover_image:_+r.cover_image:"",M=r.published_at?new Date(r.published_at*1e3).toISOString():"",A=r.updated_at?new Date(r.updated_at*1e3).toISOString():"",$=d.map(P=>P.name).join(", "),U=d.map(P=>`<meta property="article:tag" content="${p(P.name)}">`).join(`
    `),q=JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting",headline:r.title,description:r.excerpt||"",...N?{image:N}:{},datePublished:M,dateModified:A||M,url:v,author:{"@type":"Person",name:s.author||s.title},publisher:{"@type":"Organization",name:s.title},...$?{keywords:$}:{}}),K=`
    <meta name="description" content="${p(r.excerpt)}">
    ${$?`<meta name="keywords" content="${p($)}">`:""}
    <link rel="canonical" href="${v}">
    <meta property="og:title" content="${p(r.title)}">
    <meta property="og:description" content="${p(r.excerpt)}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${v}">
    <meta property="og:site_name" content="${p(s.title)}">
    ${N?`<meta property="og:image" content="${p(N)}">`:""}
    ${M?`<meta property="article:published_time" content="${M}">`:""}
    ${A?`<meta property="article:modified_time" content="${A}">`:""}
    ${U}
    <script type="application/ld+json">${q}<\/script>
  `;return I(Y({title:r.title,body:b,head:K,siteTitle:s.title,siteSubtitle:s.subtitle,user:t.user,noindex:s.noindex,footerData:n,langBanner:i}))}async function fs(t){let e=t.db,a=await ca(e),[s,n]=await Promise.all([pa(t),da(t)]),{identifier:i}=t.params,l=parseInt(t.query.page)||1,{posts:r,totalPages:c,tag:d}=await Be(e,i,l);if(!d)return I(Y({title:o("not_found"),body:'<div class="empty-state"><h2 data-i18n="tag_not_found">Tag not found</h2><p><a href="/" data-i18n="back_to_home">Back to home</a></p></div>',siteTitle:a.title,siteSubtitle:a.subtitle,user:t.user}),404);if(/^\d+$/.test(i)&&d.slug){let y=l>1?`?page=${l}`:"";return new Response(null,{status:301,headers:{Location:`/tag/${d.slug}${y}`,"Cache-Control":"no-cache"}})}let u=[];for(let y of r){let m=await lt(e,y.id);u.push(ds(y,m,t.user,a.author,a.defaultLicense))}let g=`/tag/${d.slug||d.id}`,h=`
    <h1 class="page-title"><span data-i18n="tag_prefix">Tag: </span>${p(d.name)}</h1>
    <p class="page-subtitle">${r.length} <span data-i18n="posts_count">post(s)</span></p>
    <div class="posts-grid">${u.join("")}</div>
    ${ps(l,c,g)}
  `;return I(Y({title:`${o("tag_prefix")}${d.name}`,body:h,siteTitle:a.title,siteSubtitle:a.subtitle,user:t.user,noindex:a.noindex,footerData:s,langBanner:n}))}k();tt();Q();k();function ua(t){if(!t)return 0;let e=t;return e=e.replace(/```[\s\S]*?```/g,""),e=e.replace(/`[^`]+`/g,""),e=e.replace(/!\[[^\]]*\]\([^)]*\)/g,""),e=e.replace(/\[([^\]]*)\]\([^)]*\)/g,"$1"),e=e.replace(/<[^>]+>/g,""),e=e.replace(/^#{1,6}\s+/gm,""),e=e.replace(/(\*{1,3}|_{1,3}|~~)(.*?)\1/g,"$2"),e=e.replace(/^>\s+/gm,""),e=e.replace(/^[-*+]\s+/gm,""),e=e.replace(/^\d+\.\s+/gm,""),e=e.replace(/^---+$/gm,""),e=e.replace(/https?:\/\/\S+/g,""),e.replace(/\s/g,"").length}nt();var _s="2356789abcdefghjkmnpqrstuvwxyz";function ys(){let t;do{t="";let e=new Uint8Array(8);crypto.getRandomValues(e);for(let a=0;a<8;a++)t+=_s[e[a]%_s.length]}while(t.includes("666"));return t}var Ce=["aa","ab","af","ak","am","an","ar","as","av","ay","az","ba","be","bg","bh","bi","bm","bn","bo","br","bs","ca","ce","ch","co","cr","cs","cu","cv","cy","da","de","dv","dz","ee","el","en","eo","es","et","eu","fa","ff","fi","fil","fj","fo","fr","fy","ga","gd","gl","gn","gu","gv","ha","he","hi","ho","hr","ht","hu","hy","hz","ia","id","ie","ig","ii","ik","io","is","it","iu","ja","jv","ka","kg","ki","kj","kk","kl","km","kn","ko","kr","ks","ku","kv","kw","ky","la","lb","lg","li","ln","lo","lt","lu","lv","mg","mh","mi","mk","ml","mn","mr","ms","mt","my","na","nb","nd","ne","ng","nl","nn","no","nr","nv","ny","oc","oj","om","or","os","pa","pi","pl","ps","pt","pt-BR","qu","rm","rn","ro","ru","rw","sa","sc","sd","se","sg","si","sk","sl","sm","sn","so","sq","sr","ss","st","su","sv","sw","ta","te","tg","th","ti","tk","tl","tn","to","tr","ts","tt","tw","ty","ug","uk","ur","uz","ve","vi","vo","wa","wo","xh","yi","yo","za","zh","zh-CN","zh-TW","zu"],vs=["en","zh-CN","zh-TW","ja","ko","ms","vi","th","ta","he","ar","fr","de","es","pt","pt-BR","ru","it","nl","pl","sv","da","fi","no","cs","hu","ro","bg","uk","el","tr","id","fil","hi","bn","ur","fa","sw","zu"];function hs({id:t,name:e,value:a,includeAuto:s,autoDetectEnabled:n,defaultLang:i}){let l=J(),r;try{r=new Intl.DisplayNames([l],{type:"language"})}catch{r=null}function c(f){try{return r?r.of(f):f}catch{return f}}let d=a==="auto"?o("ai_translate_auto"):c(a)+" ("+a+")",u=new Set,g=[...X,...Qt],h=[];i&&Ce.includes(i)&&(h.push(i),u.add(i));let y=g.filter(f=>u.has(f)?!1:(u.add(f),!0)),m=vs.filter(f=>u.has(f)?!1:(u.add(f),!0)),w=Ce.filter(f=>u.has(f)?!1:(u.add(f),!0));function S(f){return`<div data-value="${p(f)}">${p(c(f))} (${p(f)})</div>`}let D="";s&&n&&(D+=`<div data-value="auto">${p(o("ai_translate_auto"))}</div>`),h.length&&(D+=`<div class="lang-group">\u2500\u2500 ${p(o("lang_group_default"))} \u2500\u2500</div>`,D+=h.map(S).join("")),y.length&&(D+=`<div class="lang-group">\u2500\u2500 ${p(o("lang_group_site"))} \u2500\u2500</div>`,D+=y.map(S).join("")),m.length&&(D+=`<div class="lang-group">\u2500\u2500 ${p(o("lang_group_common"))} \u2500\u2500</div>`,D+=m.map(S).join("")),w.length&&(D+=`<div class="lang-group">\u2500\u2500 ${p(o("lang_group_other"))} \u2500\u2500</div>`,D+=w.map(S).join("")),D+=`<div class="lang-no-result" style="display:none;">${p(o("lang_no_results"))}</div>`;let L=e?` name="${p(e)}"`:"";return`<div class="lang-selector" id="${t}Wrap" style="position:relative;">
  <input type="text" id="${t}Input" placeholder="${p(o("ai_translate_search"))}" autocomplete="off" value="${p(d)}">
  <input type="hidden"${L} id="${t}Value" value="${p(a)}">
  <div id="${t}List" class="lang-search-list" style="display:none;">${D}</div>
</div>
<script>
(function(){
  var input=document.getElementById('${t}Input'),hidden=document.getElementById('${t}Value'),list=document.getElementById('${t}List');
  var noRes=list.querySelector('.lang-no-result');
  var lastD=input.value,lastV=hidden.value;
  function filter(){
    var q=input.value.toLowerCase(),any=false;
    var items=list.querySelectorAll('[data-value]');
    items.forEach(function(el){var m=!q||el.textContent.toLowerCase().indexOf(q)>=0;el.style.display=m?'':'none';if(m)any=true;});
    list.querySelectorAll('.lang-group').forEach(function(g){
      var n=g.nextElementSibling,vis=false;
      while(n&&!n.classList.contains('lang-group')&&!n.classList.contains('lang-no-result')){if(n.style.display!=='none'&&n.hasAttribute('data-value'))vis=true;n=n.nextElementSibling;}
      g.style.display=vis?'':'none';
    });
    noRes.style.display=any?'none':'';list.style.display='block';
  }
  input.addEventListener('focus',function(){input.select();filter();});
  input.addEventListener('input',filter);
  list.addEventListener('mousedown',function(e){
    var val=e.target.getAttribute('data-value');
    if(val){hidden.value=val;input.value=e.target.textContent;lastD=input.value;lastV=val;list.style.display='none';}
  });
  input.addEventListener('blur',function(){setTimeout(function(){list.style.display='none';input.value=lastD;hidden.value=lastV;},150);});
})();
<\/script>`}function H(t,e,a=""){return Y({title:t,body:e,head:a,isAdmin:!0})}async function ws(t){let e=t.db,{posts:a,total:s}=await Wt(e,{page:1,perPage:5}),n=await ie(e),{total:i}=await le(e,1,1),l=a.map(c=>`
    <tr>
      <td><a href="/admin/posts/${c.id}/edit">${p(c.title)}</a></td>
      <td><span class="status-badge status-${c.status}">${c.status==="published"?'<span data-i18n="status_published">Published</span>':'<span data-i18n="status_draft">Draft</span>'}</span></td>
      <td>${Dt(c.created_at)}</td>
    </tr>
  `).join(""),r=`
    <div class="admin-header"><h1 data-i18n="dashboard_title">Dashboard</h1></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:32px;">
      <a href="/admin/posts" style="background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);padding:24px;text-decoration:none;color:inherit;">
        <div style="font-size:2rem;font-weight:700;">${s}</div>
        <div style="color:var(--text-secondary);font-size:0.9rem;" data-i18n="stat_total_posts">Total Posts</div>
      </a>
      <a href="/admin/tags" style="background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);padding:24px;text-decoration:none;color:inherit;">
        <div style="font-size:2rem;font-weight:700;">${n.length}</div>
        <div style="color:var(--text-secondary);font-size:0.9rem;" data-i18n="stat_tags">Total Tags</div>
      </a>
      <a href="/admin/media" style="background:var(--card-bg);border-radius:var(--radius);box-shadow:var(--shadow);padding:24px;text-decoration:none;color:inherit;">
        <div style="font-size:2rem;font-weight:700;">${i}</div>
        <div style="color:var(--text-secondary);font-size:0.9rem;" data-i18n="stat_media_files">Total Media</div>
      </a>
    </div>
    ${a.length>0?`
    <h2 style="margin-bottom:16px;" data-i18n="recent_posts">Recent Posts</h2>
    <div class="admin-table">
      <table>
        <thead><tr><th data-i18n="col_title">Title</th><th data-i18n="col_status">Status</th><th data-i18n="col_created">Created</th></tr></thead>
        <tbody>${l}</tbody>
      </table>
    </div>`:'<div class="empty-state"><h2 data-i18n="no_posts_create">No posts yet</h2><a href="/admin/posts/new" class="btn btn-primary" style="margin-top:16px;" data-i18n="create_first_post">Create your first post</a></div>'}
  `;return I(H(o("dashboard_title"),r))}async function Es(t){let e=t.db,a=parseInt(t.query.page)||1,{posts:s,totalPages:n}=await Wt(e,{page:a,perPage:20}),i=[];for(let r of s){let c=await lt(e,r.id),d=`/${r.slug||r.id}`;i.push(`
      <tr>
        <td>
          <a href="/admin/posts/${r.id}/edit">${p(r.title)}</a>
          <div class="meta-line">
            <a href="javascript:void(0)" class="license-badge" onclick="_lopen(${r.id},'${p(r.license||"")}','${p(r.title).replace(/'/g,"\\'")}')" data-i18n-title="editor_set_license" title="Set License">${(()=>{let u=W.find(g=>g.value===r.license);return u?.icon?`<img src="${u.icon}" alt="${u.label}" class="license-icon">`:`<span class="meta-link">${u?u.value==="ARR"?o("license_arr_label"):u.label:""}</span>`})()}</a>
            ${r.slug?`<a href="javascript:void(0)" class="tag-badge" data-i18n-title="editor_set_slug" title="Set Slug" onclick="_sopen(${r.id},'${p(r.slug)}','${p(r.title).replace(/'/g,"\\'")}')">${p(r.slug)}</a>`:`<a href="javascript:void(0)" class="meta-link" data-i18n-title="editor_set_slug" title="Set Slug" onclick="_sopen(${r.id},'','${p(r.title).replace(/'/g,"\\'")}')" data-i18n="slug_none">No Slug</a>`}
          </div>
        </td>
        <td><span class="status-badge status-${r.status}">${r.status==="published"?'<span data-i18n="status_published">Published</span>':'<span data-i18n="status_draft">Draft</span>'}</span></td>
        <td>${c.length>0?c.map(u=>`<a href="/admin/tags/${u.id}/edit" class="tag-badge">${p(u.name)}</a>`).join(" "):'<span class="meta-muted" data-i18n="tag_none">None</span>'}</td>
        <td>${Dt(r.created_at)}</td>
        <td>
          ${r.status==="published"?`<a href="${p(d)}" target="_blank" class="btn btn-outline btn-sm" data-i18n="view">View</a>`:'<span class="btn btn-outline btn-sm" style="opacity:0.3;cursor:default;" data-i18n-title="post_not_published" title="Post not published yet" data-i18n="view">View</span>'}
          <form method="POST" action="/admin/posts/${r.id}/delete" style="display:inline;" onsubmit="return ccConfirm(this,event,'${o("confirm_delete_post")}')">
            <button type="submit" class="btn btn-danger btn-sm" data-i18n="delete">Delete</button>
          </form>
        </td>
      </tr>
    `)}let l=`
    ${i.length>0?`
    <div class="admin-header">
      <a href="/admin/posts/new" class="btn btn-primary" data-i18n="nav_new_post">New Post</a>
    </div>
    <div class="admin-table">
      <table>
        <thead><tr><th data-i18n="col_title">Title</th><th data-i18n="col_status">Status</th><th data-i18n="col_tags">Tags</th><th data-i18n="col_created">Created</th><th data-i18n="col_actions">Actions</th></tr></thead>
        <tbody>${i.join("")}</tbody>
      </table>
    </div>`:`
    <div class="empty-state">
      <h2 data-i18n="no_posts_create">No posts yet</h2>
      <a href="/admin/posts/new" class="btn btn-primary" style="margin-top:16px;" data-i18n="create_first_post">Create your first post</a>
    </div>`}
    <template id="slugModalTpl" data-title="${p(o("editor_set_slug"))}">
      <input type="hidden" id="slugPostId" value="">
      <div style="margin-bottom:12px;font-size:0.9rem;"><span style="color:var(--text-secondary);">${p(o("label_title"))} </span><span id="slugPostTitle" style="display:inline-block;max-width:80%;vertical-align:bottom;padding:4px 10px;background:var(--bg);border-radius:var(--radius);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></span></div>
      <div class="form-group">
        <input type="text" id="slugInput" value="" maxlength="200" placeholder="${p(o("hint_slug_placeholder"))}" style="width:100%;font-family:'SF Mono',Menlo,monospace;">
      </div>
      <div class="form-hint">${p(o("hint_slug_rules"))}</div>
      <div class="form-hint" style="margin-top:4px;">${p(o("hint_slug_purpose"))}</div>
      <div id="slugServerError" class="alert alert-error" style="display:none;margin-top:12px;"></div>
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button type="button" class="btn btn-primary btn-sm" id="slugSaveBtn">${p(o("save"))}</button>
        <button type="button" class="btn btn-outline btn-sm" id="slugClearBtn">${p(o("slug_clear"))}</button>
      </div>
    </template>
    <template id="licenseListModalTpl" data-title="${p(o("editor_set_license"))}">
      <input type="hidden" id="licensePostId" value="">
      <div style="margin-bottom:12px;font-size:0.9rem;"><span style="color:var(--text-secondary);">${p(o("label_title"))} </span><span id="licensePostTitle" style="display:inline-block;max-width:80%;vertical-align:bottom;padding:4px 10px;background:var(--bg);border-radius:var(--radius);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></span></div>
      <div class="form-group">
        <select id="licenseListSelect">
          ${W.map(r=>`<option value="${r.value}">${r.value==="ARR"?o("license_arr_label"):r.label}</option>`).join("")}
        </select>
      </div>
      <div class="form-hint" id="licenseListHint"></div>
      <div class="form-hint" id="licenseListWarn" style="margin-top:8px;color:var(--danger);display:none;"></div>
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button type="button" class="btn btn-primary btn-sm" id="licenseListSaveBtn">${p(o("save"))}</button>
      </div>
    </template>
    <script>window._LF={licHints:${JSON.stringify(Object.fromEntries(W.map(r=>[r.value,{hint:o("license_hint_"+r.value),url:r.url}])))},licWarn:${JSON.stringify({"CC0-1.0":o("license_warn_cc0"),"CC-BY-4.0":o("license_warn_cc"),"CC-BY-SA-4.0":o("license_warn_cc"),"CC-BY-NC-4.0":o("license_warn_cc"),"CC-BY-NC-SA-4.0":o("license_warn_cc"),"CC-BY-ND-4.0":o("license_warn_cc"),"CC-BY-NC-ND-4.0":o("license_warn_cc")})},i18n:{license_learn_more:${JSON.stringify(o("license_learn_more"))}}};<\/script>
  `;return I(H(o("posts_title"),l))}async function Ts(t){let e=t.db;return I(H(o("new_post_title"),await ht({},"","","",!1,e,t),await _t(e,await ft(e,t))))}async function Ss(t){let e=t.db,a=t.kv,s=await t.request.formData(),n=s.get("title")?.trim(),i=s.get("content")||"",l=s.get("status")||"draft",r=s.get("cover_image")?.trim()||"",c=s.get("tags")?.trim()||"",d=s.get("excerpt")?.trim()||"",u=s.get("license")?.trim()||"",g=s.get("slug")?.trim()||"";if(!n)return I(H(o("new_post_title"),await ht({title:n,slug:g,status:l,cover_image:r,tags:c,excerpt:d,license:u},i,o("err_title_required"),"",!1,e,t),await _t(e,await ft(e,t))));if(g&&ma(g))return I(H(o("new_post_title"),await ht({title:n,slug:g,status:l,cover_image:r,tags:c,excerpt:d,license:u},i,o("slug_reserved"),"",!1,e,t),await _t(e,await ft(e,t))));g&&await zt(e,g)&&(g=g+"-"+Date.now());try{let h=await Ae(e,{slug:g||null,title:n,excerpt:d,cover_image:r,status:l,license:u||null});await a.put(`post:${h}:content`,i),await de(e,h,ua(i));let y=parseInt(s.get("writing_time")||"0",10);if(y>0&&await Xt(e,h,y),c){let w=c.split(",").map(S=>S.trim()).filter(Boolean);await re(e,h,w)}return z(`/admin/posts/${h}/edit?action=${l==="published"?"published":"saved"}`)}catch(h){return I(H(o("new_post_title"),await ht({title:n,slug:g,status:l,cover_image:r,tags:c,excerpt:d,license:u},i,o("error_prefix")+h.message,"",!1,e,t),await _t(e,await ft(e,t))))}}async function xs(t){let e=t.db,a=t.kv,{id:s}=t.params,n=await ot(e,parseInt(s));if(!n)return z("/admin/posts");let i="";try{i=await a.get(`post:${n.id}:content`)||""}catch{i=""}let r=(await lt(e,n.id)).map(u=>u.name).join(", "),c=t.query.action||"",d=c==="published"?o("post_published"):c==="unpublished"?o("post_unpublished"):c==="saved"?o("post_saved"):"";return I(H(o("edit_post_title"),await ht({id:n.id,title:n.title,slug:n.slug,status:n.status,cover_image:n.cover_image,tags:r,excerpt:n.excerpt,license:n.license},i,"",d,!0,e,t),await _t(e,await ft(e,t))))}async function Cs(t){let e=t.db,a=t.kv,{id:s}=t.params,n=await ot(e,parseInt(s));if(!n)return z("/admin/posts");let i=await t.request.formData(),l=i.get("title")?.trim(),r=i.get("content")||"",c=i.get("status")||"draft",d=i.get("cover_image")?.trim()||"",u=i.get("tags")?.trim()||"",g=i.get("excerpt")?.trim()||"",h=i.get("slug")?.trim()||"",y=i.get("license")?.trim()||"";if(!l)return I(H(o("edit_post_title"),await ht({id:n.id,title:l,slug:h,status:c,cover_image:d,tags:u,excerpt:g,license:y},r,o("err_title_required"),"",!0,e,t),await _t(e,await ft(e,t))));if(h&&ma(h))return I(H(o("edit_post_title"),await ht({id:n.id,title:l,slug:h,status:c,cover_image:d,tags:u,excerpt:g,license:y},r,o("slug_reserved"),"",!0,e,t),await _t(e,await ft(e,t))));try{await Yt(e,n.id,{title:l,excerpt:g,cover_image:d,status:c,slug:h||null,license:y||null}),await a.put(`post:${n.id}:content`,r),await de(e,n.id,ua(r));let m=parseInt(i.get("writing_time")||"0",10);m>0&&await Xt(e,n.id,m);let w=u.split(",").map(L=>L.trim()).filter(Boolean);await re(e,n.id,w);let S=n.status,D=c!==S?c==="published"?"published":"unpublished":"saved";return z(`/admin/posts/${n.id}/edit?action=${D}`)}catch(m){return I(H(o("edit_post_title"),await ht({id:n.id,title:l,slug:h,status:c,cover_image:d,tags:u,excerpt:g,license:y},r,o("error_prefix")+m.message,"",!0,e,t),await _t(e,await ft(e,t))))}}async function Ls(t){let e=t.db,a=t.kv,{id:s}=t.params;await ke(e,parseInt(s));try{await a.delete(`post:${s}:content`)}catch{}return z("/admin/posts")}async function Ns(t){let e=t.db,{id:a}=t.params,s=await t.request.formData(),n=parseInt(s.get("seconds")||"0",10);return n>0&&n<86400&&await Xt(e,parseInt(a),n),new Response("ok",{status:200})}async function Rs(t){let e=t.db,a=await C(e,"site_title")||"",s=await C(e,"site_subtitle")||"",n=await C(e,"site_description")||"",i=t.user?.display_name||"",l=await C(e,"default_license")||"CC-BY-NC-SA-4.0",r=await C(e,"noindex")==="1",c=await C(e,"default_translate_lang");c||(c=t.lang,await F(e,"default_translate_lang",c));let d=await C(e,"default_translate_source_lang");d||(d=t.lang,await F(e,"default_translate_source_lang",d));let u=await C(e,"hljs_theme")||"github",g=await C(e,"deepl_key")||"",h=null;if(g)try{let b=await fetch("https://api-free.deepl.com/v2/usage",{headers:{Authorization:`DeepL-Auth-Key ${g}`}});b.ok&&(h=await b.json())}catch{}let y=await C(e,"footer_show_visitor")==="1",m=await C(e,"footer_show_powered")!=="0",w=[["github","GitHub"],["github-dark","GitHub Dark"],["atom-one-light","Atom One Light"],["atom-one-dark","Atom One Dark"],["vs","VS Code Light"],["vs2015","VS Code Dark"],["monokai","Monokai"],["dracula","Dracula"]],S=t.query.saved==="1",D=t.query.pw==="1",L=t.query.pw_err,f=`
    <div class="admin-header"><h1 data-i18n="settings_title">Settings</h1></div>
    ${S?'<div class="alert alert-success" data-i18n="settings_saved">Settings saved.</div>':""}
    ${D?'<div class="alert alert-success" data-i18n="password_changed">Password changed successfully.</div>':""}
    ${L?`<div class="alert alert-error">${o(L)}</div>`:""}
    <form method="POST" action="/admin/settings">
    <div class="settings-card">
      <h3 style="margin:0 0 16px;font-size:1rem;" data-i18n="settings_group_site">Site Info</h3>
        <div class="form-group">
          <label data-i18n="label_setting_title">Title</label>
          <input type="text" name="site_title" value="${p(a)}" required>
        </div>
        <div class="form-group">
          <label data-i18n="label_setting_subtitle">Subtitle</label>
          <input type="text" name="site_subtitle" value="${p(s)}" data-i18n-ph="hint_optional" placeholder="Optional">
        </div>
        <div class="form-group">
          <label data-i18n="label_setting_description_seo">Description (SEO)</label>
          <textarea name="site_description" rows="3">${p(n)}</textarea>
        </div>
        <div class="form-group">
          <label class="toggle-label">
            <span data-i18n="label_noindex">Hide from Search Engines</span>
            <input type="checkbox" name="noindex" value="1" ${r?"checked":""} class="toggle-input">
            <span class="toggle-switch"></span>
          </label>
        </div>
        <div class="form-group">
          <label data-i18n="label_default_license">Default License</label>
          <select name="default_license" id="defaultLicenseSelect">${W.map(b=>`<option value="${b.value}" ${l===b.value?"selected":""}>${b.value==="ARR"?o("license_arr_label"):b.label}</option>`).join("")}</select>
          <div class="form-hint" id="licenseHint"></div>
          <div class="form-hint" id="licenseWarn" style="margin-top:8px;color:var(--danger);display:none;"></div>
        </div>
        <h3 style="margin:24px 0 16px;padding-top:20px;border-top:1px solid var(--border);font-size:1rem;" data-i18n="settings_group_editor">Editor</h3>
        <div class="form-group">
          <label data-i18n="label_default_translate_source_lang">Default Translation Source Language</label>
          ${hs({id:"settingsSourceLang",name:"default_translate_source_lang",value:d,includeAuto:!1,autoDetectEnabled:!1,defaultLang:d})}
          <div class="form-hint" data-i18n="hint_default_translate_source_lang">Default source language for AI Translate in the editor.</div>
        </div>
        <div class="form-group">
          <label data-i18n="label_default_translate_lang">Default Translation Target Language</label>
          ${hs({id:"settingsLang",name:"default_translate_lang",value:c,includeAuto:!1,autoDetectEnabled:!1,defaultLang:c})}
          <div class="form-hint" data-i18n="hint_default_translate_lang">Default target language for AI Translate in the editor.</div>
        </div>
        <div class="form-group">
          <label data-i18n="label_hljs_theme">Code Highlight Theme</label>
          <select name="hljs_theme">${w.map(([b,_])=>`<option value="${b}" ${u===b?"selected":""}>${_}</option>`).join("")}</select>
        </div>
        <h3 style="margin:24px 0 16px;padding-top:20px;border-top:1px solid var(--border);font-size:1rem;" data-i18n="settings_group_footer">Footer</h3>
        <div class="form-group">
          <label class="toggle-label">
            <span data-i18n="label_footer_show_visitor">Show Visitor Stats</span>
            <input type="checkbox" name="footer_show_visitor" value="1" ${y?"checked":""} class="toggle-input">
            <span class="toggle-switch"></span>
          </label>
        </div>
        <div class="form-group">
          <label class="toggle-label">
            <span data-i18n="label_footer_show_powered">Show Powered By</span>
            <input type="checkbox" name="footer_show_powered" value="1" ${m?"checked":""} class="toggle-input">
            <span class="toggle-switch"></span>
          </label>
        </div>
        <h3 style="margin:24px 0 16px;padding-top:20px;border-top:1px solid var(--border);font-size:1rem;" data-i18n="settings_group_extern">External Services</h3>
        <div class="form-group">
          <label data-i18n="label_deepl_key">DeepL API Key</label>
          <input type="password" name="deepl_key" value="${p(g)}" data-i18n-ph="hint_optional" placeholder="Optional" autocomplete="off">
          <div class="form-hint" data-i18n-html="hint_deepl_key">For high-quality admin language translation. Get a free key.</div>
          ${h?`<div style="margin-top:8px;">
            <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-secondary);margin-bottom:4px;">
              <span data-i18n="deepl_usage">Monthly usage</span>
              <span>${h.character_count.toLocaleString()} / ${h.character_limit.toLocaleString()}</span>
            </div>
            <div style="background:var(--border);border-radius:4px;height:6px;overflow:hidden;">
              <div style="background:${h.character_count/h.character_limit>.9?"var(--danger)":"var(--accent)"};height:100%;width:${Math.min(100,h.character_count/h.character_limit*100).toFixed(1)}%;border-radius:4px;"></div>
            </div>
          </div>`:""}
        </div>
        <input type="hidden" name="license_apply_all" id="licenseApplyAll" value="">
        <input type="hidden" name="prev_license" value="${p(l)}">
        <button type="submit" class="btn btn-primary" data-i18n="save_settings">Save Settings</button>
    </div>
    <div class="settings-card" style="margin-top:24px;">
      <h3 style="margin:0 0 16px;font-size:1rem;" data-i18n="settings_group_user">User Info</h3>
        <div class="form-group">
          <label data-i18n="label_display_name">Display Name</label>
          <input type="text" name="display_name" value="${p(i)}" placeholder="${t.user?.username||""}" maxlength="50">
          <div class="form-hint" data-i18n="hint_display_name">Shown as article author. Leave empty to use your username.</div>
        </div>
        <div class="form-group">
          <label data-i18n="label_session_days">Session Duration (days)</label>
          <input type="number" name="session_days" value="${t.user.session_days}" min="1" max="365" step="1" pattern="[0-9]*" inputmode="numeric" onkeydown="return /[0-9]|Backspace|Tab|Arrow/.test(event.key)" style="width:100px;">
          <div class="form-hint" data-i18n="hint_session_days">How long before you need to log in again. Default: 7 days.</div>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-outline" onclick="openPasswordModal()" data-i18n="btn_change_password">Change Password</button>
        </div>
        <button type="submit" class="btn btn-primary" data-i18n="save_settings">Save Settings</button>
    </div>
    </form>
    <template id="licenseChangeModalTpl" data-title="${p(o("license_change_title"))}">
      <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:16px;">${p(o("license_change_hint"))}</p>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button type="button" class="btn btn-outline btn-sm" id="licenseNewOnly">${p(o("license_new_only"))}</button>
        <button type="button" class="btn btn-primary btn-sm" id="licenseApplyAllBtn">${p(o("license_apply_all"))}</button>
      </div>
    </template>
    <div class="settings-card" style="margin-top:32px;border:1px solid var(--danger);">
      <h2 style="margin-bottom:12px;" data-i18n="reset_title">Reset Site</h2>
      <p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.85rem;" data-i18n="reset_desc">Reset the database. Your media files will be preserved.</p>
      <form method="POST" action="/admin/reset" onsubmit="return document.getElementById('resetConfirm').value==='RESET' && ccConfirm(this,event,'${o("reset_confirm_prompt")}')">
        <div class="form-group">
          <label class="toggle-label">
            <span data-i18n="reset_preserve_config">Preserve Site Info</span>
            <input type="checkbox" name="preserve_config" value="1" checked class="toggle-input">
            <span class="toggle-switch"></span>
          </label>
        </div>
        <div class="form-group">
          <label class="toggle-label">
            <span data-i18n="reset_preserve_users">Preserve User Info</span>
            <input type="checkbox" name="preserve_users" value="1" checked class="toggle-input">
            <span class="toggle-switch"></span>
          </label>
        </div>
        ${t.supportedLangs.some(b=>!X.includes(b))?`<div class="form-group">
          <label class="toggle-label">
            <span data-i18n="reset_preserve_langs">Preserve custom languages</span>
            <input type="checkbox" name="preserve_langs" value="1" checked class="toggle-input">
            <span class="toggle-switch"></span>
          </label>
        </div>`:""}
        <div class="form-group">
          <label data-i18n="reset_confirm">Type "RESET" to confirm</label>
          <input type="text" id="resetConfirm" name="confirm" placeholder="RESET" autocomplete="off">
        </div>
        <button type="submit" class="btn btn-danger" data-i18n="reset_button">Reset</button>
      </form>
      <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--danger);">
        <h3 style="color:var(--danger);margin-bottom:8px;" data-i18n="full_reset_title">Full Reset</h3>
        <p class="text-danger-bold" style="margin-bottom:16px;" data-i18n="full_reset_desc">Erase all data and media files permanently. This cannot be undone. All options above will be ignored \u2014 nothing will be preserved.</p>
        <form method="POST" action="/admin/full-reset" onsubmit="return document.getElementById('fullResetConfirm').value==='FULLRESET' && ccConfirm(this,event,'${o("full_reset_confirm_prompt")}')">
          <div class="form-group">
            <label data-i18n="full_reset_confirm">Type "FULLRESET" to confirm</label>
            <input type="text" id="fullResetConfirm" name="confirm" placeholder="FULLRESET" autocomplete="off">
          </div>
          <button type="submit" class="btn btn-danger" data-i18n="full_reset_button">Full Reset</button>
        </form>
      </div>
    </div>
    <template id="passwordModalTpl" data-title="${p(o("change_password_title"))}"><form method="POST" action="/admin/change-password">
        <div class="form-group">
          <label>${p(o("label_current_password"))}</label>
          <input type="password" name="current_password" required autocomplete="current-password">
        </div>
        <div class="form-group">
          <label>${p(o("label_new_password"))}</label>
          <input type="password" name="new_password" required autocomplete="new-password" oninput="this.setCustomValidity('')">
          <div class="form-hint">${p(o("hint_password_rules"))}</div>
        </div>
        <div class="form-group">
          <label>${p(o("label_new_password_confirm"))}</label>
          <input type="password" name="new_password_confirm" required autocomplete="new-password" oninput="this.setCustomValidity('')">
        </div>
        <button type="submit" class="btn btn-primary">${p(o("btn_change_password"))}</button>
      </form></template>
    <script>window._LF={licHints:${JSON.stringify(Object.fromEntries(W.map(b=>[b.value,{hint:o("license_hint_"+b.value),url:b.url}])))},licWarn:${JSON.stringify({"CC0-1.0":o("license_warn_cc0"),"CC-BY-4.0":o("license_warn_cc"),"CC-BY-SA-4.0":o("license_warn_cc"),"CC-BY-NC-4.0":o("license_warn_cc"),"CC-BY-NC-SA-4.0":o("license_warn_cc"),"CC-BY-ND-4.0":o("license_warn_cc"),"CC-BY-NC-ND-4.0":o("license_warn_cc")})},pwError:${!!L},i18n:{license_learn_more:${JSON.stringify(o("license_learn_more"))},err_password_min:${JSON.stringify(o("err_password_min"))},err_password_no_spaces:${JSON.stringify(o("err_password_no_spaces"))},err_password_complexity:${JSON.stringify(o("err_password_complexity"))},err_passwords_mismatch:${JSON.stringify(o("err_passwords_mismatch"))}}};<\/script>
  `;return I(H(o("settings_title"),f))}async function $s(t){let e=t.db,a=await t.request.formData();await F(e,"site_title",a.get("site_title")?.trim()||o("default_blog_title")),await F(e,"site_subtitle",a.get("site_subtitle")?.trim()||""),await F(e,"site_description",a.get("site_description")?.trim()||"");let s=a.get("default_license")?.trim()||"CC-BY-NC-SA-4.0";await F(e,"default_license",s),a.get("license_apply_all")==="1"&&await e.prepare("UPDATE posts SET license = ?").bind(s).run(),await F(e,"noindex",a.get("noindex")==="1"?"1":"");let n=a.get("display_name")?.trim()||null,i=parseInt(a.get("session_days"),10),l=Math.max(1,Math.min(365,isNaN(i)?7:i));await e.prepare("UPDATE users SET display_name = ?, session_days = ? WHERE id = ?").bind(n,l,t.user.id).run(),await F(e,"default_translate_source_lang",a.get("default_translate_source_lang")?.trim()||t.lang),await F(e,"default_translate_lang",a.get("default_translate_lang")?.trim()||t.lang),await F(e,"hljs_theme",a.get("hljs_theme")?.trim()||"github");let r=a.get("deepl_key")?.trim()||"";if(r)/^[0-9a-f-]+:fx$/i.test(r)&&await F(e,"deepl_key",r);else try{await e.prepare("DELETE FROM settings WHERE key = 'deepl_key'").run()}catch{}return await F(e,"footer_show_visitor",a.get("footer_show_visitor")==="1"?"1":""),await F(e,"footer_show_powered",a.get("footer_show_powered")==="1"?"1":"0"),z("/admin/settings?saved=1")}async function Os(t){let e=await t.request.formData(),a=e.get("current_password"),s=e.get("new_password"),n=e.get("new_password_confirm");if(!await At(a,t.user.salt,t.user.password_hash))return z("/admin/settings?pw_err=err_current_password_wrong");let l=kt(s);if(l)return z(`/admin/settings?pw_err=${l}`);if(s!==n)return z("/admin/settings?pw_err=err_passwords_mismatch");let r=It(),c=await Et(s,r);return await qt(t.db,t.user.id,c,r),z("/admin/settings?pw=1")}async function Is(t){let e=t.db,a=parseInt(t.query.page)||1,{media:s,totalPages:n}=await le(e,a),i=s.map(r=>{let c=r.mime_type&&r.mime_type.startsWith("image/"),d=r.mime_type&&r.mime_type.startsWith("video/"),u=`/media/${p(r.r2_key)}`;return`
      <div class="media-item">
        ${c?`<a href="${u}" target="_blank"><img src="${u}" alt=""></a>`:`<div style="height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f5f5f7;color:var(--text-secondary);gap:8px;">${d?'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><polygon points="10,8 16,12 10,16"/></svg>':'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'}<a href="${u}" target="_blank" style="font-size:0.75rem;max-width:90%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p(r.r2_key)}</a></div>`}
        <div class="media-actions">
          <button class="btn btn-outline btn-sm" onclick="copyRelativePath('${u}')" data-i18n="media_copy_relative">Copy Path</button>
          <button class="btn btn-outline btn-sm" onclick="copyAbsolutePath('${u}')" data-i18n="media_copy_absolute">Copy Full URL</button>
          <form method="POST" action="/admin/media/${r.id}/delete" style="display:inline;" onsubmit="return ccConfirm(this,event,'${o("media_confirm_delete")}')">
            <button type="submit" class="btn btn-danger btn-sm" data-i18n="delete">Delete</button>
          </form>
        </div>
      </div>
    `}).join(""),l=`
    <div class="admin-header"><h1 data-i18n="media_title">Media</h1></div>
    <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
      <p data-i18n="media_upload_hint">Click or drag files here to upload</p>
      <input type="file" id="fileInput" multiple accept="image/*,video/*,.pdf,.doc,.docx">
    </div>
    <div id="uploadStatus" style="margin-bottom:16px;"></div>
    ${i?`<div class="media-grid">${i}</div>`:'<div class="empty-state"><h2 data-i18n="media_no_media">No media yet</h2></div>'}
    <script src="${B("media.js")}"><\/script>
  `;return I(H(o("media_title"),l))}async function As(t){let e=t.db,a=t.r2;try{let n=(await t.request.formData()).get("file");if(!n)return E({error:o("err_no_file")},400);let i=n.name.includes(".")?"."+n.name.split(".").pop().toLowerCase():"",l=new Date,c=`${String(l.getFullYear()).slice(2)+String(l.getMonth()+1).padStart(2,"0")+String(l.getDate()).padStart(2,"0")}/${ys()}${i}`;return await oe(e,{r2_key:c,mime_type:n.type,size:n.size}),await a.put(c,n.stream(),{httpMetadata:{contentType:n.type}}),E({ok:!0,url:`/media/${c}`})}catch(s){return E({error:s.message},500)}}async function ks(t){let e=t.db,a=t.r2,{id:s}=t.params,n=await je(e,parseInt(s));if(n)try{await a.delete(n.r2_key)}catch{}return z("/admin/media")}async function Ds(t){let e=t.db,a=t.kv,s=await Ve(e);for(let n of s.posts)try{n.content=await a.get(`post:${n.id}:content`)||""}catch{n.content=""}return new Response(JSON.stringify(s,null,2),{headers:{"Content-Type":"application/json","Content-Disposition":'attachment; filename="logflare-export.json"'}})}async function Us(t){return I(H(o("import_title"),`
    <div class="admin-header"><h1 data-i18n="import_title">Import Data</h1></div>
    <div class="settings-card">
      <p style="margin-bottom:16px;color:var(--text-secondary);" data-i18n="import_hint">Upload a Logflare export JSON file to import posts, tags, and settings.</p>
      <form method="POST" action="/admin/import" enctype="multipart/form-data">
        <div class="form-group">
          <input type="file" name="file" accept=".json" required>
        </div>
        <button type="submit" class="btn btn-primary" data-i18n="import_button">Import</button>
      </form>
    </div>
  `))}async function Ms(t){let e=t.db,a=t.kv;try{let n=(await t.request.formData()).get("file");if(!n)throw new Error(o("err_no_file"));let i=await n.text(),l=JSON.parse(i),r={posts:0,tags:0,media:0},c=[];if(l.settings){let h=new Set(["schema_version","setup_complete","deepl_key"]);for(let y of l.settings)h.has(y.key)||(await F(e,y.key,y.value),c.push(y.key))}if(l.posts){let h=await C(e,"default_license")||"CC-BY-NC-SA-4.0";for(let y of l.posts)try{let m=Math.floor(Date.now()/1e3),S=(await e.prepare("INSERT INTO posts (slug, title, excerpt, cover_image, status, license, writing_time, word_count, created_at, updated_at, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(y.slug||null,y.title||"Untitled",y.excerpt??"",y.cover_image??y.thumbnail??"",y.status||"draft",y.license||h,y.writing_time||0,y.word_count||0,y.created_at||m,y.updated_at||m,y.published_at||null).run()).meta.last_row_id;y.content&&await a.put(`post:${S}:content`,y.content),r.posts++}catch{}}if(l.tags){let{createTag:h}=await Promise.resolve().then(()=>(tt(),La));for(let y of l.tags)await h(e,y.name,y.slug),r.tags++}if(l.post_tags)for(let h of l.post_tags)try{await e.prepare("INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)").bind(h.post_id,h.tag_id).run()}catch{}if(l.stats)for(let h of l.stats)try{await e.prepare("INSERT OR REPLACE INTO stats (key, value) VALUES (?, ?)").bind(h.key,h.value).run()}catch{}if(l.media&&l.media.length>0&&t.r2&&(await t.r2.list({prefix:"media/",limit:1})).objects.length>0)for(let y of l.media)try{await t.r2.head(y.r2_key)&&(await e.prepare("INSERT OR IGNORE INTO media (r2_key, mime_type, size, created_at) VALUES (?, ?, ?, ?)").bind(y.r2_key,y.mime_type||"",y.size||0,y.created_at||Math.floor(Date.now()/1e3)).run(),r.media++)}catch{}let d=c.length>0?c.map(h=>`<code>${p(h)}</code>`).join(", "):"",g=`
      <div class="admin-header"><h1 data-i18n="import_complete">Import Complete</h1></div>
      <div class="settings-card">
        <div class="alert alert-success">${o("import_summary").replace("{posts}",r.posts).replace("{tags}",r.tags).replace("{media}",r.media)}</div>
        ${d?`<p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:16px;">${o("import_settings_list")}: ${d}</p>`:""}
        <a href="/admin/posts" class="btn btn-primary" data-i18n="view_posts">View Posts</a>
      </div>
    `;return I(H(o("import_complete"),g))}catch(s){let n=`
      <div class="admin-header"><h1 data-i18n="import_failed">Import Failed</h1></div>
      <div class="settings-card">
        <div class="alert alert-error">${o("error_prefix")}${p(s.message)}</div>
        <a href="/admin/import" class="btn btn-outline" data-i18n="import_try_again">Try Again</a>
      </div>
    `;return I(H(o("import_failed"),n))}}async function Ps(t){let e=t.db,a=parseInt(t.params.id),s=await ot(e,a);if(!s)return E({error:"not found"},404);let n;try{n=await t.request.json()}catch{return E({error:"invalid"},400)}let i=(n.slug||"").trim();if(i&&!/^[a-zA-Z0-9_\-]+$/.test(i))return E({error:o("err_username_invalid")},400);if(i&&i.length>200)return E({error:"too long"},400);if(i&&ma(i))return E({error:o("slug_reserved")},400);if(i){let l=await zt(e,i);if(l&&l.id!==a)return E({error:o("slug_reserved")},400)}return await Yt(e,a,{title:s.title,excerpt:s.excerpt,cover_image:s.cover_image,status:s.status,slug:i||null}),E({ok:!0,slug:i||null})}async function Fs(t){let e=t.db,a=parseInt(t.params.id),s=await ot(e,a);if(!s)return E({error:"not found"},404);let n;try{n=await t.request.json()}catch{return E({error:"invalid"},400)}let i=(n.license||"").trim();return!i||!W.find(l=>l.value===i)?E({error:"invalid license"},400):(await Yt(e,a,{title:s.title,excerpt:s.excerpt,cover_image:s.cover_image,status:s.status,slug:void 0,license:i}),E({ok:!0,license:i}))}var Vn=["admin","media","tag","date","feed.xml","sitemap.xml","favicon.svg","emergency-login","emergency-export","emergency-reset","emergency-full-reset","setup-translate","setup-translate-status"];function ma(t){return Vn.includes(t.toLowerCase())}async function Bs(t){let e=t.db,a=await ie(e),s=[];for(let r of a){let c=await Pe(e,r.id);s.push(`
      <tr>
        <td><a href="/tag/${r.slug||r.id}" target="_blank">${p(r.name)}</a></td>
        <td>${r.slug?p(r.slug):'<span style="color:var(--text-secondary);">\u2014</span>'}</td>
        <td>${c}</td>
        <td>
          <a href="/admin/tags/${r.id}/edit" class="btn btn-outline btn-sm" data-i18n="edit">Edit</a>
          <form method="POST" action="/admin/tags/${r.id}/delete" style="display:inline;" onsubmit="return ccConfirm(this,event,'${o("tag_delete_confirm")}')">
            <button type="submit" class="btn btn-danger btn-sm" data-i18n="delete">Delete</button>
          </form>
        </td>
      </tr>
    `)}let n=s.some((r,c)=>a[c]&&!s[c].includes(">0<")),i=t.query.cleaned,l=`
    <div class="admin-header">
      <h1 data-i18n="tags_title">Tags</h1>
      ${a.length>0?`<form method="POST" action="/admin/tags/clean" onsubmit="return ccConfirm(this,event,'${o("tag_clean_confirm")}')"><button type="submit" class="btn btn-outline btn-sm" data-i18n="tag_clean_unused">Clean Unused</button></form>`:""}
    </div>
    ${i!==void 0?`<div class="alert alert-success">${o("tag_clean_done").replace("{count}",i)}</div>`:""}
    ${a.length>0?`
    <div class="admin-table">
      <table>
        <thead><tr><th data-i18n="tag_name">Name</th><th data-i18n="tag_slug">Slug</th><th data-i18n="tag_posts">Posts</th><th data-i18n="col_actions">Actions</th></tr></thead>
        <tbody>${s.join("")}</tbody>
      </table>
    </div>`:'<div class="empty-state"><h2 data-i18n="tag_no_tags">No tags yet</h2></div>'}
  `;return I(H(o("tags_title"),l))}async function js(t){let e=t.db,{id:a}=t.params,s=await Vt(e,parseInt(a));if(!s)return z("/admin/tags");let i=`
    <div class="admin-header"><h1 data-i18n="tag_edit">Edit Tag</h1></div>
    <div class="settings-card">
      ${t.query.saved==="1"?'<div class="alert alert-success" data-i18n="tag_saved">Tag saved.</div>':""}
      <form method="POST" action="/admin/tags/${s.id}/edit">
        <div class="form-group">
          <label data-i18n="tag_name">Name</label>
          <input type="text" name="name" value="${p(s.name)}" required>
        </div>
        <div class="form-group">
          <label data-i18n="tag_slug">Slug</label>
          <input type="text" name="slug" value="${p(s.slug||"")}" data-i18n-ph="hint_tag_slug_placeholder" placeholder="e.g. travel, tech" pattern="[a-zA-Z0-9_\\-]*" maxlength="200" style="font-family:'SF Mono',Menlo,monospace;">
          <div class="form-hint" data-i18n="hint_slug_rules">Letters, numbers, hyphens and underscores only. Max 200 chars. Leave empty to use post ID.</div>
        </div>
        <button type="submit" class="btn btn-primary" data-i18n="save">Save</button>
        <a href="/admin/tags" class="btn btn-outline" style="margin-inline-start:8px;" data-i18n="cancel">Cancel</a>
      </form>
    </div>
  `;return I(H(o("tag_edit"),i))}async function Hs(t){let e=t.db,{id:a}=t.params,s=await Vt(e,parseInt(a));if(!s)return z("/admin/tags");let n=await t.request.formData(),i=n.get("name")?.trim(),l=n.get("slug")?.trim()||"",r=c=>`
      <div class="admin-header"><h1 data-i18n="tag_edit">Edit Tag</h1></div>
      <div class="settings-card">
        <div class="alert alert-error">${c}</div>
        <form method="POST" action="/admin/tags/${s.id}/edit">
          <div class="form-group">
            <label data-i18n="tag_name">Name</label>
            <input type="text" name="name" value="${p(i||"")}" required>
          </div>
          <div class="form-group">
            <label data-i18n="tag_slug">Slug</label>
            <input type="text" name="slug" value="${p(l)}" data-i18n-ph="hint_tag_slug_placeholder" placeholder="e.g. travel, tech" pattern="[a-zA-Z0-9_\\-]*" maxlength="200" style="font-family:'SF Mono',Menlo,monospace;">
          </div>
          <button type="submit" class="btn btn-primary" data-i18n="save">Save</button>
          <a href="/admin/tags" class="btn btn-outline" style="margin-inline-start:8px;" data-i18n="cancel">Cancel</a>
        </form>
      </div>`;if(!i)return I(H(o("tag_edit"),r(o("tag_name_required"))));if(l&&!/^[a-zA-Z0-9_\-]+$/.test(l))return I(H(o("tag_edit"),r(o("hint_slug_rules"))));try{return await Ue(e,s.id,{name:i,slug:l||null}),z(`/admin/tags/${s.id}/edit?saved=1`)}catch(c){let d=`
      <div class="admin-header"><h1 data-i18n="tag_edit">Edit Tag</h1></div>
      <div class="settings-card">
        <div class="alert alert-error">${o("error_prefix")}${p(c.message)}</div>
        <a href="/admin/tags/${s.id}/edit" class="btn btn-outline" data-i18n="cancel">Cancel</a>
      </div>
    `;return I(H(o("tag_edit"),d))}}async function qs(t){let e=t.db,{id:a}=t.params;return await Me(e,parseInt(a)),z("/admin/tags")}async function Ys(t){let e=await Fe(t.db);return z(`/admin/tags?cleaned=${e}`)}async function zs(t){try{let e=await t.request.formData(),a=e.get("preserve_config")==="1",s=e.get("preserve_users")==="1",n=e.get("preserve_langs")==="1";await wt(t.db,t.kv,t.r2,{preserveMedia:!0,preserveConfig:a,preserveUsers:s,preserveLangs:n});let i=new Response(null,{status:302,headers:{Location:"/"}});return i.headers.append("Set-Cookie","logflare_auth=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Strict"),i.headers.append("Set-Cookie","logflare_lang=; Path=/; Max-Age=0; Secure; SameSite=Strict"),i}catch(e){return I(H(o("error_prefix")+"Reset",`<div class="alert alert-error">${p(e.message)}</div>`))}}async function Ws(t){try{await wt(t.db,t.kv,t.r2,{preserveMedia:!1});let e=new Response(null,{status:302,headers:{Location:"/"}});return e.headers.append("Set-Cookie","logflare_auth=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Strict"),e.headers.append("Set-Cookie","logflare_lang=; Path=/; Max-Age=0; Secure; SameSite=Strict"),e}catch(e){return I(H(o("error_prefix")+"Reset",`<div class="alert alert-error">${p(e.message)}</div>`))}}var Gn=new Set(["default_translate_source_lang","default_translate_lang","chat_enabled"]);async function Vs(t){let e=t.db;try{let{key:a,value:s}=await t.request.json();return!a||!Gn.has(a)?E({error:"forbidden"},403):!s||typeof s!="string"?E({error:"invalid"},400):(await F(e,a,s.trim()),E({ok:!0}))}catch(a){return E({error:a.message},500)}}async function Gs(t){let e=t.db,a=t.query.type||"",s=t.query.date||"",n=parseInt(t.query.page)||1,{media:i,total:l,totalPages:r}=await He(e,{type:a,date:s,page:n,perPage:20}),c=i.map(d=>({url:`/media/${d.r2_key}`,name:d.r2_key,mime_type:d.mime_type||"",size:d.size||0,created_at:d.created_at}));return E({items:c,total:l,page:n,pages:r})}function Ct(t){let e=(t.message||"").toLowerCase();return e.includes("limit")||e.includes("quota")||e.includes("exceeded")||e.includes("429")||e.includes("too many")||e.includes("neurons")?E({error:"quota_exceeded",message:o("ai_quota_exceeded")},429):E({error:"failed",message:t.message},500)}function Xn(t){let e=0,a=0;for(let s of t){let n=s.codePointAt(0);n<=32||(a++,(n>=19968&&n<=40959||n>=13312&&n<=19903||n>=131072&&n<=173791||n>=12352&&n<=12447||n>=12448&&n<=12543||n>=44032&&n<=55215||n>=4352&&n<=4607)&&e++)}return a>0&&e/a>.3}function Lt(t){let e=Xn(t),a=t.length;return e?a<=500?"@cf/zai-org/glm-4.7-flash":"@cf/moonshotai/kimi-k2.5":a<=1e3?"@cf/mistralai/mistral-small-3.1-24b-instruct":a<=1e4?"@cf/meta/llama-3.3-70b-instruct-fp8-fast":"@cf/moonshotai/kimi-k2.5"}function Nt(t){return t?.response||t?.choices?.[0]?.message?.content||""}var Jn="@cf/black-forest-labs/flux-2-klein-9b";function Ut(t){let e=t||"en",a;try{a=new Intl.DisplayNames(["en"],{type:"language"}).of(e)}catch{a=e}return`You MUST write your entire response in ${a} (${e}).`}async function Xs(t){let e=t.ai;if(!e)return E({error:"ai_not_bound",message:o("ai_not_bound_hint")},400);try{let{content:a,lang:s}=await t.request.json();if(!a||!a.trim())return E({error:"empty",message:"No content provided."},400);let n=await e.run(Lt(a),{messages:[{role:"system",content:"Based on the article below, suggest a concise, engaging title. Output ONLY the title text, no quotes or labels. "+Ut(s||t.lang)},{role:"user",content:a}],max_tokens:100});return E({ok:!0,title:Nt(n).trim()})}catch(a){return Ct(a)}}async function Js(t){let e=t.ai;if(!e)return E({error:"ai_not_bound",message:o("ai_not_bound_hint")},400);try{let{content:a,lang:s}=await t.request.json();if(!a||!a.trim())return E({error:"empty",message:"No content provided."},400);let n=await e.run(Lt(a),{messages:[{role:"system",content:"Generate a concise excerpt (max 200 characters) for the following article. Output ONLY the excerpt text, no quotes, labels, or prefixes. "+Ut(s||t.lang)},{role:"user",content:a}],max_tokens:300}),i=Nt(n).trim();return i.length>200&&(i=i.substring(0,200)),E({ok:!0,excerpt:i})}catch(a){return Ct(a)}}async function Ks(t){let e=t.ai;if(!e)return E({error:"ai_not_bound",message:o("ai_not_bound_hint")},400);try{let{content:a,lang:s}=await t.request.json();if(!a||!a.trim())return E({error:"empty",message:"No content provided."},400);let n=await e.run(Lt(a),{messages:[{role:"system",content:"Review the following article thoroughly. Point out typos, grammar issues, factual concerns, unclear expressions, and suggest improvements. Use markdown formatting for your response. "+Ut(s||t.lang)},{role:"user",content:a}],max_tokens:2e3});return E({ok:!0,review:Nt(n).trim()})}catch(a){return Ct(a)}}async function Zs(t){let e=t.ai,a=t.r2,s=t.db;if(!e)return E({error:"ai_not_bound",message:o("ai_not_bound_hint")},400);if(!a)return E({error:"failed",message:"R2 not configured."},500);try{let{title:n,content:i}=await t.request.json();if(!n&&!i)return E({error:"empty",message:"No content provided."},400);let l=await e.run(Lt(i||n),{messages:[{role:"system",content:"Based on the article title and content below, generate a short English prompt (max 100 words) for an AI image generator to create a blog cover image. Output ONLY the prompt text, no quotes or labels. The image should be visually appealing, abstract or thematic, suitable as a blog header."},{role:"user",content:(n||"")+`

`+(i||"")}],max_tokens:150}),r=Nt(l).trim()||"modern minimalist blog cover illustration",c=await e.run(Jn,{prompt:r,width:1024,height:576}),d=new Date,g=`${String(d.getFullYear()).slice(2)+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0")}/${ys()}.png`;return await oe(s,{r2_key:g,mime_type:"image/png",size:0}),await a.put(g,c,{httpMetadata:{contentType:"image/png"}}),E({ok:!0,url:`/media/${g}`})}catch(n){return Ct(n)}}async function Qs(t){let e=t.ai;if(!e)return E({error:"ai_not_bound",message:o("ai_not_bound_hint")},400);try{let{content:a,lang:s}=await t.request.json();if(!a||!a.trim())return E({error:"empty",message:"No content provided."},400);let n=await e.run(Lt(a),{messages:[{role:"system",content:`Based on the article below, suggest 3-5 relevant tags. Rules:
1. Prefer short, atomic tags. If "A B" can be split into "A" and "B" as independent tags, prefer the split over the compound.
2. Never generate a tag that contains another tag. E.g. if you have "Singapore", do not also output "Singapore food" \u2014 use "Singapore" and "food" separately.
3. Avoid tags sharing a common suffix. E.g. instead of "ABC airport" and "XYZ airport", output "ABC", "XYZ", and "airport".
Output ONLY comma-separated tag names using ASCII commas (,). No numbering, labels, or explanation. `+Ut(s||t.lang)},{role:"user",content:a}],max_tokens:200}),i=Nt(n).trim();return i=i.replace(/[，、；]/g,","),i=i.split(",").map(l=>l.trim()).filter(Boolean).join(", "),E({ok:!0,tags:i})}catch(a){return Ct(a)}}async function tn(t){let e=t.ai;if(!e)return E({error:"ai_not_bound",message:o("ai_not_bound_hint")},400);try{let{content:a,prompt:s,lang:n}=await t.request.json();if(!a||!a.trim())return E({error:"empty",message:"No content provided."},400);let i="You are an expert editor. Rewrite and improve the following article: fix grammar, improve clarity and flow, enhance readability, and polish the writing style. Keep the same tone and meaning. Preserve all markdown formatting, links, and media tags. Output ONLY the rewritten article, no explanations or labels. "+Ut(n||t.lang)+(s?`

Additional instructions: `+s:""),l=await e.run(Lt(a),{messages:[{role:"system",content:i},{role:"user",content:a}],max_tokens:4e3});return E({ok:!0,content:Nt(l).trim()})}catch(a){return Ct(a)}}var Kn=new Set(["ar","bg","cs","da","de","el","en","es","et","fi","fr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt","ro","ru","sk","sl","sv","tr","uk","zh"]),Zn=new Set(["ar","bg","cs","da","de","el","en-gb","en-us","es","es-419","et","fi","fr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sk","sl","sv","tr","uk","zh-hans","zh-hant"]),Qn=new Set(["af","am","ar","ast","az","ba","be","bg","bn","br","bs","ca","ceb","cs","cy","da","de","el","en","es","et","fa","ff","fi","fr","fy","ga","gd","gl","gu","ha","he","hi","hr","ht","hu","hy","id","ig","ilo","is","it","ja","jv","ka","kk","km","kn","ko","lb","lg","ln","lo","lt","lv","mg","mk","ml","mn","mr","ms","my","ne","nl","no","ns","oc","or","pa","pl","ps","pt","ro","ru","sd","si","sk","sl","so","sq","sr","ss","su","sv","sw","ta","th","tl","tn","tr","uk","ur","uz","vi","wo","xh","yi","yo","zh","zu"]);function ti(t){let e=t.toUpperCase();return e==="ZH-CN"?"ZH-HANS":e==="ZH-TW"?"ZH-HANT":e==="EN"?"EN-US":e==="PT"?"PT-PT":e}function ei(t){return Zn.has(ti(t).toLowerCase())}function ai(t){return t==="auto"?!0:Kn.has(t.split("-")[0].toLowerCase())}function bs(t){return Qn.has(t.split("-")[0].toLowerCase())}function ga(t,e){let a=[];return t&&a.push({id:"deepl",name:"DeepL",autoDetect:!0,supportsSource:ai,supportsTarget:ei,async translate({text:s,sourceLang:n,targetLang:i}){let l=await fetch("https://api-free.deepl.com/v2/usage",{headers:{Authorization:`DeepL-Auth-Key ${t}`}});if(l.ok){let u=await l.json();if(u.character_limit-u.character_count<s.length)return{error:"quota"}}let r=i.toUpperCase();r==="ZH-CN"&&(r="ZH-HANS"),r==="ZH-TW"&&(r="ZH-HANT");let c=new URLSearchParams;c.append("text",s),n&&n!=="auto"&&c.append("source_lang",n.toUpperCase()),c.append("target_lang",r);let d=await fetch("https://api-free.deepl.com/v2/translate",{method:"POST",headers:{Authorization:`DeepL-Auth-Key ${t}`,"Content-Type":"application/x-www-form-urlencoded"},body:c.toString()});if(d.ok){let g=(await d.json()).translations?.[0];return{text:g?.text||"",detectedLang:g?.detected_source_language?.toLowerCase()}}return{error:d.status===400||d.status===404?"unsupported_lang":"error"}}}),e&&a.push({id:"workers_ai",name:"Workers AI",autoDetect:!1,supportsSource:s=>s!=="auto"&&bs(s),supportsTarget:bs,async translate({text:s,sourceLang:n,targetLang:i}){return{text:(await e.run("@cf/meta/m2m100-1.2b",{text:s,source_lang:n.split("-")[0],target_lang:i.split("-")[0]})).translated_text||""}}}),a}async function en(t){let e=t.db;try{let{content:a,source_lang:s,target_lang:n,engine:i}=await t.request.json();if(!a||!a.trim())return E({error:"empty",message:"No content provided."},400);if(!n)return E({error:"no_target",message:"No target language specified."},400);let l=await C(e,"deepl_key"),r=ga(l,t.ai);if(!r.length)return E({error:"no_engine",message:o("ai_translate_no_engine")},400);let c=i&&r.find(g=>g.name===i)||r[0];if(s==="auto"&&!c.autoDetect)return E({error:"translate_failed",message:o("ai_translate_fallback_no_auto").replace("{engine}",c.name)},400);if(!c.supportsSource(s))return E({error:"translate_failed",message:o("ai_translate_fail_unsupported").replace("{engine}",c.name)},400);if(!c.supportsTarget(n))return E({error:"translate_failed",message:o("ai_translate_fail_unsupported").replace("{engine}",c.name)},400);let d=await c.translate({text:a,sourceLang:s,targetLang:n});if(d.error){let g=d.error==="quota"?o("ai_translate_fail_quota"):o("ai_translate_fail_error");return E({error:"translate_failed",message:g.replace("{engine}",c.name)},400)}if(!d.text)return E({error:"translate_failed",message:o("ai_translate_fail_error").replace("{engine}",c.name)},400);let u=s;return d.detectedLang&&(u=d.detectedLang),E({ok:!0,content:d.text,engine:c.name,source_lang:u})}catch(a){return E({error:"translate_failed",message:a.message||"Translation failed."},500)}}async function an(t){let e=t.ai;if(!e)return E({error:"ai_not_bound",message:o("ai_not_bound_hint")},400);try{let{source:a,prompt:s,lang:n}=await t.request.json();if(!a||!a.trim())return E({error:"empty",message:"No reference material provided."},400);if(!s||!s.trim())return E({error:"empty",message:"No prompt provided."},400);let i=await e.run(Lt(a+s),{messages:[{role:"system",content:"You are a creative writer. Based on the reference material provided by the user, write an article following their instructions. Use markdown formatting. "+Ut(n||t.lang)},{role:"user",content:`Reference material:

`+a+`

---

Instructions: `+s}],max_tokens:4e3});return E({ok:!0,content:Nt(i).trim()})}catch(a){return Ct(a)}}async function ft(t,e){let a=await C(t,"default_translate_lang"),s=await C(t,"default_translate_source_lang")||a,n=t?await C(t,"deepl_key"):"",i=ga(n,e&&e.ai);return{i18n:{ai_heading_original:o("ai_heading_original"),ai_heading_rewrite:o("ai_heading_rewrite"),ai_heading_translate:o("ai_heading_translate"),ai_heading_selected:o("ai_heading_selected"),ai_failed_review:o("ai_failed_review"),ai_failed_rewrite:o("ai_failed_rewrite"),ai_failed_translate:o("ai_failed_translate"),ai_failed_generate:o("ai_failed_generate"),ai_translating:o("ai_translating"),ai_translate_title:o("ai_translate_title"),ai_scope_full:o("ai_scope_full"),ai_scope_selected:o("ai_scope_selected"),ai_engine_label:o("ai_engine_label"),ai_review_copied:o("ai_review_copied"),ai_translate_set_default_source:o("ai_translate_set_default_source"),ai_translate_set_default_target:o("ai_translate_set_default_target"),ai_translate_default_saved:o("ai_translate_default_saved"),ai_translate_same_lang:o("ai_translate_same_lang"),ai_translate_similar_lang:o("ai_translate_similar_lang")},primaryEngine:i[0]?.name||"",engines:i.map(l=>({name:l.name,autoDetect:l.autoDetect,sourceLangs:Ce.filter(r=>l.supportsSource(r)),targetLangs:Ce.filter(r=>l.supportsTarget(r))})),defaultTranslateLang:a,defaultTranslateSourceLang:s,siteLangs:[...X,...Qt],commonLangs:vs,groupLabels:{default:o("lang_group_default"),site:o("lang_group_site"),common:o("lang_group_common"),other:o("lang_group_other"),otherEngine:o("lang_group_other_engine"),dirSource:o("lang_direction_source"),dirTarget:o("lang_direction_target")},noResults:o("lang_no_results"),searchPlaceholder:o("ai_translate_search"),autoDetectLabel:o("ai_translate_auto")}}async function _t(t,e){let a=t&&await C(t,"hljs_theme")||"github",s=e?`<script>window.__EDITOR__=${JSON.stringify(e)};<\/script>`:"";return`
    <link rel="stylesheet" href="${be(a)}">
    <link rel="stylesheet" href="${_e}">
    <link rel="stylesheet" href="${at("toast/style.min.css")}">
    <script src="${fe}" defer><\/script>
    <script src="${me}" defer><\/script>
    <script src="${ge}" defer><\/script>
    <script src="${he}" defer><\/script>
    <script src="${at("toast/client.min.js")}" defer><\/script>
    ${s}
    <script src="${B("editor.js")}" defer><\/script>
  `}var it="\u2728 ",si='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px;"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>';async function ht(t={},e="",a="",s="",n=!1,i=null,l=null){let r=i&&await C(i,"default_license")||"CC-BY-NC-SA-4.0",c=await C(i,"default_translate_lang"),d=i?await C(i,"deepl_key"):"",u=ga(d,l&&l.ai),g=u[0]?.name||"",h=u.some(S=>S.autoDetect),y=n?`/admin/posts/${t.id}/edit`:"/admin/posts/new",m=t.status!=="published",w=n?`/${t.slug||t.id}`:"";return`
    <div class="admin-header">
      <h1>${n?o("edit_post_title"):o("new_post_title")}</h1>
      ${n?m?'<span class="btn btn-outline btn-sm" style="opacity:0.5;cursor:default;" data-i18n="post_not_published">Post not published yet</span>':`<a href="${p(w)}" target="_blank" class="btn btn-outline btn-sm" data-i18n="view_post">View Post</a>`:""}
    </div>
    ${a?`<div class="alert alert-error">${p(a)}</div>`:""}
    ${s?`<div class="alert alert-success">${p(s)}</div>`:""}
    <form method="POST" action="${y}" id="editorForm">
      <input type="hidden" name="status" id="statusField" value="${p(t.status||"draft")}">
      <input type="hidden" name="slug" id="slugField" value="${p(t.slug||"")}">
      <input type="hidden" name="writing_time" id="writingTimeField" value="0">
      ${n?`<input type="hidden" id="postIdField" value="${t.id}">`:""}
      <div class="editor-title-row">
        <input type="text" name="title" value="${p(t.title||"")}" required maxlength="200" data-i18n-ph="hint_title_max" placeholder="Max 200 characters" class="editor-title-input">
        <button type="button" class="btn btn-outline btn-sm" id="aiTitleBtn">${it}<span data-i18n="editor_ai_generate">AI Generate</span></button>
        <button type="button" class="btn btn-outline btn-sm" id="slugToggleBtn" data-i18n="editor_set_slug">Set Slug</button>
        <button type="button" class="btn btn-outline btn-sm" onclick="_lopenEd()" data-i18n="editor_set_license">Set License</button>
      </div>
      <input type="hidden" name="license" id="licenseField" value="${p(t.license||r)}">

      <div class="editor-toolbar">
        <button type="button" data-action="bold" data-i18n-title="editor_bold" title="Bold"><b>B</b></button>
        <button type="button" data-action="italic" data-i18n-title="editor_italic" title="Italic"><i>I</i></button>
        <button type="button" data-action="underline" data-i18n-title="editor_underline" title="Underline"><u>U</u></button>
        <button type="button" data-action="superscript" data-i18n-title="editor_superscript" title="Superscript">X<sup>2</sup></button>
        <button type="button" data-action="subscript" data-i18n-title="editor_subscript" title="Subscript">X<sub>2</sub></button>
        <span class="toolbar-dropdown">
          <button type="button" data-i18n-title="editor_heading" title="Heading (H1 is reserved for the post title)">H</button>
          <span class="toolbar-dropdown-menu">
            <button type="button" data-action="h2" style="font-size:1.1rem;font-weight:700;">H2</button>
            <button type="button" data-action="h3" style="font-size:1rem;font-weight:700;">H3</button>
            <button type="button" data-action="h4" style="font-size:0.9rem;font-weight:700;">H4</button>
            <button type="button" data-action="h5" style="font-size:0.85rem;font-weight:600;">H5</button>
            <button type="button" data-action="h6" style="font-size:0.8rem;font-weight:600;">H6</button>
          </span>
        </span>
        <button type="button" data-action="ol" data-i18n-title="editor_ol" title="Ordered List">1.</button>
        <button type="button" data-action="ul" data-i18n-title="editor_ul" title="Unordered List">&bull;</button>
        <button type="button" data-action="quote" data-i18n-title="editor_quote" title="Quote">&ldquo;</button>
        <span class="toolbar-sep"></span>
        <button type="button" data-action="code" data-i18n-title="editor_code" title="Code">&lt;/&gt;</button>
        <button type="button" data-action="formula" data-i18n-title="editor_formula" title="Formula">&sum;</button>
        <button type="button" data-action="link" data-i18n-title="editor_link" title="Link">&#128279;</button>
        <button type="button" data-action="media" data-i18n-title="editor_media" title="Media">${si}</button>
        <span class="toolbar-sep"></span>
        <button type="button" data-action="translate" data-i18n-title="editor_translate" title="AI Translate">${it}<span data-i18n="editor_translate">AI Translate</span></button>
        <button type="button" data-action="review" data-i18n-title="editor_review" title="AI Review">${it}<span data-i18n="editor_review">AI Review</span></button>
        <button type="button" data-action="rewrite" data-i18n-title="editor_rewrite" title="AI Rewrite">${it}<span data-i18n="editor_rewrite">AI Rewrite</span></button>
        <button type="button" data-action="reference" data-i18n-title="editor_reference" title="AI Reference">${it}<span data-i18n="editor_reference">AI Reference</span></button>
        <span class="toolbar-spacer"></span>
        <button type="button" data-action="preview" data-i18n-title="editor_preview" title="Preview" data-i18n="editor_preview">Preview</button>
      </div>
      <div class="editor-container">
        <div class="editor-pane">
          <textarea name="content" id="editorContent">${p(e)}</textarea>
        </div>
      </div>
      <div class="editor-meta-section">
        <div class="editor-meta-item">
          <label data-i18n="label_excerpt">Excerpt</label>
          <textarea name="excerpt" id="excerptInput" maxlength="200" rows="2" data-i18n-ph="hint_excerpt" placeholder="Brief summary (max 200 chars). Leave empty if not needed.">${p(t.excerpt||"")}</textarea>
          <button type="button" class="btn btn-outline btn-sm" id="aiExcerptBtn">${it}<span data-i18n="editor_ai_generate">AI Generate</span></button>
        </div>
        <div class="editor-meta-item">
          <label data-i18n="label_tags_hint">Tags (comma separated)</label>
          <input type="text" name="tags" id="tagsInput" value="${p(t.tags||"")}" data-i18n-ph="hint_tags_example" placeholder="tech, life, coding">
          <button type="button" class="btn btn-outline btn-sm" id="aiTagsBtn">${it}<span data-i18n="editor_ai_generate">AI Generate</span></button>
        </div>
        <div class="editor-meta-item">
          <label data-i18n="label_cover_image">Cover Image</label>
          <input type="text" name="cover_image" id="coverImageInput" value="${p(t.cover_image||"")}" data-i18n-ph="hint_cover_image" placeholder="/media/xxx or https://...">
          <div style="display:flex;gap:6px;">
            <button type="button" class="btn btn-outline btn-sm" id="coverSelectBtn" data-i18n="editor_select_cover">Select</button>
            <button type="button" class="btn btn-outline btn-sm" id="aiCoverBtn">${it}<span data-i18n="editor_ai_generate">AI Generate</span></button>
          </div>
          <div class="form-hint" data-i18n="hint_cover_size">Recommended: 16:9 ratio, at least 1024\xD7576 px</div>
          <div id="coverPreview" class="cover-preview">${t.cover_image?`<img src="${p(t.cover_image)}" alt="">`:""}</div>
        </div>
      </div>
      <div class="editor-actions">
        <button type="submit" class="btn btn-primary" data-i18n="save">Save</button>
        <button type="button" class="btn ${m?"btn-success":"btn-warning"}" id="publishBtn">${m?o("btn_publish"):o("btn_unpublish")}</button>
        <a href="/admin/posts" class="btn btn-danger" data-i18n="btn_discard">Discard & Back</a>
      </div>
    </form>
    <template id="previewModalTpl" data-title="${p(o("editor_preview"))}">
      <div class="post-body" id="previewPane"></div>
    </template>
    <template id="mediaModalTpl" data-title-media="${p(o("editor_insert_media"))}" data-title-cover="${p(o("cover_select_title"))}" data-err-not-image="${p(o("cover_not_image"))}">
      <div class="form-group">
        <label>${p(o("media_url_label"))}</label>
        <div style="display:flex;gap:8px;">
          <input type="text" id="mediaUrlInput" placeholder="${p(o("media_url_placeholder"))}" style="flex:1;">
          <button type="button" class="btn btn-primary btn-sm" id="mediaUrlInsertBtn" data-text-insert="${p(o("media_insert_btn"))}" data-text-select="${p(o("editor_select_cover"))}">${p(o("media_insert_btn"))}</button>
        </div>
      </div>
      <hr style="border:none;border-top:1px solid var(--border);margin:16px 0;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div style="display:flex;gap:8px;">
          <button type="button" class="btn btn-outline btn-sm" id="mediaUploadBtn">${p(o("media_upload_file"))}</button>
          <input type="file" id="mediaFileInput" style="display:none;">
        </div>
        <div style="display:flex;gap:8px;">
          <select id="mediaFilterType" class="btn btn-outline btn-sm">
            <option value="">${p(o("media_filter_all"))}</option>
            <option value="image">${p(o("media_filter_images"))}</option>
            <option value="video">${p(o("media_filter_videos"))}</option>
            <option value="file">${p(o("media_filter_docs"))}</option>
          </select>
          <select id="mediaFilterDate" class="btn btn-outline btn-sm"></select>
        </div>
      </div>
      <div id="mediaUploadStatus"></div>
      <div id="mediaGrid" class="media-picker-grid" data-empty="${p(o("media_no_media"))}"></div>
      <div id="mediaPagination" style="display:flex;justify-content:center;gap:12px;margin-top:16px;"></div>
    </template>
    <template id="reviewModalTpl" data-title="${p(o("editor_review"))}">
      <div id="reviewScope" style="display:none;"></div>
      <div class="post-body" id="reviewPane"></div>
      <div id="reviewActions" style="display:none;padding:12px 0 0;border-top:1px solid var(--border);margin-top:12px;gap:8px;">
        <button type="button" class="btn btn-primary btn-sm" id="reviewApplyBtn">${it}<span>${p(o("ai_review_apply"))}</span></button>
        <button type="button" class="btn btn-outline btn-sm" id="reviewCopyBtn">${p(o("ai_review_copy"))}</button>
      </div>
    </template>
    <template id="slugModalTpl" data-title="${p(o("editor_set_slug"))}">
      <div style="margin-bottom:12px;font-size:0.9rem;"><span style="color:var(--text-secondary);">${p(o("label_title"))} </span><span id="slugPostTitle" style="display:inline-block;max-width:80%;vertical-align:bottom;padding:4px 10px;background:var(--bg);border-radius:var(--radius);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p(t.title||"")}</span></div>
      <div class="form-group">
        <input type="text" id="slugInput" maxlength="200" placeholder="${p(o("hint_slug_placeholder"))}" style="width:100%;font-family:'SF Mono',Menlo,monospace;">
      </div>
      <div class="form-hint">${p(o("hint_slug_rules"))}</div>
      <div class="form-hint" style="margin-top:4px;">${p(o("hint_slug_purpose"))}</div>
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button type="button" class="btn btn-primary btn-sm" id="slugSaveBtn">${p(o("save"))}</button>
        <button type="button" class="btn btn-outline btn-sm" id="slugClearBtn">${p(o("slug_clear"))}</button>
      </div>
    </template>
    <template id="licenseModalTpl" data-title="${p(o("editor_set_license"))}">
      <div class="form-group">
        <select id="licenseSelect">
          ${W.map(S=>`<option value="${S.value}">${S.value==="ARR"?o("license_arr_label"):S.label}</option>`).join("")}
        </select>
      </div>
      <div class="form-hint" id="licenseHintText"></div>
      <div class="form-hint" id="licenseWarn" style="margin-top:8px;color:var(--danger);display:none;"></div>
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button type="button" class="btn btn-primary btn-sm" id="licenseSaveBtn">${p(o("save"))}</button>
      </div>
    </template>
    <script>window._LF={licHints:${JSON.stringify(Object.fromEntries(W.map(S=>[S.value,{hint:o("license_hint_"+S.value),url:S.url}])))},licWarn:${JSON.stringify({"CC0-1.0":o("license_warn_cc0"),"CC-BY-4.0":o("license_warn_cc"),"CC-BY-SA-4.0":o("license_warn_cc"),"CC-BY-NC-4.0":o("license_warn_cc"),"CC-BY-NC-SA-4.0":o("license_warn_cc"),"CC-BY-ND-4.0":o("license_warn_cc"),"CC-BY-NC-ND-4.0":o("license_warn_cc")})},i18n:{license_learn_more:${JSON.stringify(o("license_learn_more"))}}};<\/script>
    <template id="translateModalTpl" data-title="${p(o("ai_translate_title"))}">
      <div id="translateScope" style="display:none;"></div>
      <div class="form-group">
        <label>${p(o("ai_translate_source"))}</label>
        <div id="translateSourceWrap" style="position:relative;"></div>
      </div>
      <div class="form-group">
        <label>${p(o("ai_translate_target"))}</label>
        <div id="translateTargetWrap" style="position:relative;"></div>
      </div>
      <div class="form-group" ${u.length<2?'style="display:none;"':""}>
        <label>${p(o("ai_engine_label"))}</label>
        <select id="translateEngine" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:0.95rem;font-family:inherit;background:#fff;min-height:44px;">
          ${u.map((S,D)=>`<option value="${p(S.name)}" ${D===0?"selected":""}>${p(S.name)}</option>`).join("")}
        </select>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button type="button" class="btn btn-outline btn-sm" id="translateCancelBtn">${p(o("cancel"))}</button>
        <button type="button" class="btn btn-primary btn-sm" id="translateConfirmBtn">${p(o("ai_translate_confirm"))}</button>
      </div>
    </template>
    <template id="rewriteModalTpl" data-title="${p(o("ai_rewrite_title"))}">
      <div id="rewriteScope" style="display:none;"></div>
      <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:16px;">${p(o("ai_rewrite_hint"))}</p>
      <div class="form-group">
        <label>${p(o("ai_rewrite_prompt_label"))}</label>
        <textarea id="rewritePromptInput" rows="3" placeholder="${p(o("ai_rewrite_prompt_placeholder"))}" style="width:100%;font-family:inherit;"></textarea>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button type="button" class="btn btn-outline btn-sm" id="rewriteCancelBtn">${p(o("cancel"))}</button>
        <button type="button" class="btn btn-primary btn-sm" id="rewriteConfirmBtn">${p(o("ai_rewrite_confirm"))}</button>
      </div>
    </template>
    <template id="referenceModalTpl" data-title="${p(o("ai_reference_title"))}">
      <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;margin-bottom:16px;">${p(o("ai_reference_hint"))}</p>
      <div class="form-group">
        <label>${p(o("ai_reference_source"))}</label>
        <textarea id="referenceSourceInput" rows="6" placeholder="${p(o("ai_reference_source_placeholder"))}" style="width:100%;font-family:inherit;"></textarea>
      </div>
      <div class="form-group">
        <label>${p(o("ai_reference_prompt"))}</label>
        <textarea id="referencePromptInput" rows="3" placeholder="${p(o("ai_reference_prompt_placeholder"))}" style="width:100%;font-family:inherit;"></textarea>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button type="button" class="btn btn-outline btn-sm" id="referenceCancelBtn">${p(o("cancel"))}</button>
        <button type="button" class="btn btn-primary btn-sm" id="referenceConfirmBtn">${p(o("ai_reference_confirm"))}</button>
      </div>
    </template>
  `}k();tt();Q();async function sn(t){let e=t.db,a=await C(e,"site_title")||"Logflare",s=await C(e,"site_description")||"",n=new URL(t.request.url).origin,i=J(),{posts:l}=await $t(e,1,20),r=l.map(d=>{let u=new Date((d.published_at||d.created_at)*1e3).toUTCString();return`
    <item>
      <title>${Le(d.title)}</title>
      <link>${n}/${d.slug||d.id}</link>
      <guid isPermaLink="false">post-${d.id}</guid>
      <description>${Le(d.excerpt||"")}</description>
      <pubDate>${u}</pubDate>
    </item>`}).join(`
`),c=`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${Le(a)}</title>
    <link>${n}</link>
    <description>${Le(s)}</description>
    <language>${i}</language>
    <atom:link href="${n}/feed.xml" rel="self" type="application/rss+xml" />
    ${r}
  </channel>
</rss>`;return new Response(c,{headers:{"Content-Type":"application/rss+xml; charset=utf-8"}})}async function nn(t){let e=t.db,a=new URL(t.request.url).origin,{posts:s}=await $t(e,1,1e3),n=`  <url>
    <loc>${a}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;for(let l of s){let r=new Date((l.updated_at||l.created_at)*1e3).toISOString().split("T")[0];n+=`  <url>
    <loc>${a}/${l.slug||l.id}</loc>
    <lastmod>${r}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`}let i=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${n}</urlset>`;return new Response(i,{headers:{"Content-Type":"application/xml; charset=utf-8"}})}function Le(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"):""}k();tt();Q();nt();var ni=[[/OPR\/(\d+)/,"Opera"],[/Edg\/(\d+)/,"Edge"],[/SamsungBrowser\/(\d+)/,"Samsung"],[/UCBrowser\/(\d+)/,"UC Browser"],[/Firefox\/(\d+)/,"Firefox"],[/Chrome\/(\d+)/,"Chrome"],[/Version\/(\d+).*Safari/,"Safari"],[/MSIE (\d+)/,"IE"],[/Trident.*rv:(\d+)/,"IE"]],ii=[[/Windows NT (\d+\.\d+)/,"Windows"],[/Mac OS X (\d+[._]\d+)/,"macOS"],[/Android (\d+)/,"Android"],[/iPhone OS (\d+[._]\d+)/,"iOS"],[/iPad.*OS (\d+[._]\d+)/,"iPadOS"],[/Linux/,"Linux",""],[/CrOS/,"Chrome OS",""]];function fa(t){if(!t)return{browser:"",browserVersion:"",os:"",osVersion:"",deviceType:"desktop",deviceModel:""};let e="",a="",s="",n="";for(let[r,c]of ni){let d=t.match(r);if(d){e=c,a=d[1]||"";break}}for(let[r,c,d]of ii){let u=t.match(r);if(u){s=c,n=d!==void 0?d:(u[1]||"").replace(/_/g,".");break}}let i="desktop";/iPad/.test(t)||/Android/.test(t)&&!/Mobile/.test(t)?i="tablet":/Mobile|iPhone|Android/.test(t)&&(i="mobile");let l="";if(/iPod/.test(t))l="iPod";else if(/iPhone/.test(t))l="iPhone";else if(/iPad/.test(t))l="iPad";else{let r=t.match(/Android[^;]*;\s*([^)]+)\)/);r&&(l=r[1].trim().replace(/\s*Build\/.*/,""))}return{browser:e,browserVersion:a,os:s,osVersion:n,deviceType:i,deviceModel:l}}async function ri(t,e,a){let s=await t.prepare("SELECT path_id FROM ac_paths WHERE path = ?").bind(e).first();return s?(a&&a!==s.title&&await t.prepare("UPDATE ac_paths SET title = ? WHERE path_id = ?").bind(a,s.path_id).run(),s.path_id):(await t.prepare("INSERT INTO ac_paths (path, title) VALUES (?, ?)").bind(e,a||"").run()).meta.last_row_id}async function oi(t,e){if(!e)return 1;let a="h";try{let i=new URL(e);e=i.hostname+i.pathname.replace(/\/$/,""),a=i.protocol==="https:"?"h":"o"}catch{a="o"}let s=await t.prepare("SELECT ref_id FROM ac_refs WHERE ref = ? AND ref_scheme = ?").bind(e,a).first();return s?s.ref_id:(await t.prepare("INSERT INTO ac_refs (ref, ref_scheme) VALUES (?, ?)").bind(e,a).run()).meta.last_row_id}async function li(t,e,a){let s=await t.prepare("SELECT browser_id FROM ac_browsers WHERE name = ? AND version = ?").bind(e,a).first();return s?s.browser_id:(await t.prepare("INSERT INTO ac_browsers (name, version) VALUES (?, ?)").bind(e,a).run()).meta.last_row_id}async function ci(t,e,a){let s=await t.prepare("SELECT system_id FROM ac_systems WHERE name = ? AND version = ?").bind(e,a).first();return s?s.system_id:(await t.prepare("INSERT INTO ac_systems (name, version) VALUES (?, ?)").bind(e,a).run()).meta.last_row_id}function rn(t,e){let a=`${t}|${e}`,s=0;for(let n=0;n<a.length;n++)s=(s<<5)-s+a.charCodeAt(n)|0;return Math.abs(s).toString(36)}async function _a(t){let e=t.db;if(!e)return new Response("",{status:204});let s=new URL(t.request.url).searchParams,n=s.get("type")||"",i=s.get("p")||"/",l=new Uint8Array([71,73,70,56,57,97,1,0,1,0,128,0,0,255,255,255,0,0,0,44,0,0,0,0,1,0,1,0,0,2,2,68,1,0,59]),r=()=>new Response(l,{status:200,headers:{"Content-Type":"image/gif","Cache-Control":"no-store, no-cache","Access-Control-Allow-Origin":"*"}});if(n==="leave"){let Z=parseInt(s.get("d"))||0;if(Z>0&&Z<=86400){let bt=t.request.headers.get("CF-Connecting-IP")||"",ae=t.request.headers.get("User-Agent")||"",Re=rn(bt,ae),Pt=await e.prepare("SELECT path_id FROM ac_paths WHERE path = ?").bind(i).first();Pt&&await e.prepare("UPDATE ac_hits SET duration = ? WHERE session = ? AND path_id = ? ORDER BY created_at DESC LIMIT 1").bind(Z,Re,Pt.path_id).run()}return r()}let c=s.get("r")||"",d=s.get("t")||"",u=parseInt(s.get("s"))||null,g=parseInt(s.get("b"))||0,h=s.get("q")||"";if(g>0)return r();let y=c.includes("/admin")?"":c,m=t.request.cf||{},w=t.request.headers.get("User-Agent")||"",S=t.request.headers.get("CF-Connecting-IP")||"",L=(t.request.headers.get("Accept-Language")||"").split(",")[0]?.split(";")[0]?.trim()||"",f=fa(w),b=parseInt(s.get("tp"))||0;f.deviceType==="desktop"&&f.os==="macOS"&&b>0&&(f.deviceType="tablet",f.deviceModel="iPad",f.os="iPadOS");let _=new Date,v=_.toISOString().slice(0,13)+":00:00.000Z",N=_.toISOString(),M=rn(S,w),[A,$,U,q]=await Promise.all([ri(e,i,d),oi(e,y),li(e,f.browser,f.browserVersion),ci(e,f.os,f.osVersion)]),P=await e.prepare("SELECT 1 FROM ac_hits WHERE session = ? LIMIT 1").bind(M).first()?0:1;await e.prepare(`INSERT INTO ac_hits
    (path_id, ref_id, browser_id, system_id, session, first_visit, bot,
     title, query, width, device_type, device_model, ip, country, region,
     city, timezone, asn, as_org, colo, language, latitude, longitude, created_at)
    VALUES (?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?)`).bind(A,$,U,q,M,P,g,d,h,u,f.deviceType,f.deviceModel,S,m.country||"",m.region||"",m.city||"",m.timezone||"",m.asn||null,m.asOrganization||"",m.colo||"",L,parseFloat(m.latitude)||null,parseFloat(m.longitude)||null,N).run();let V=m.country||"";return await Promise.all([e.prepare("INSERT INTO ac_hit_counts (path_id, hour, total) VALUES (?, ?, 1) ON CONFLICT(path_id, hour) DO UPDATE SET total = total + 1").bind(A,v).run(),$>1?e.prepare("INSERT INTO ac_ref_counts (path_id, ref_id, hour, total) VALUES (?, ?, ?, 1) ON CONFLICT(path_id, ref_id, hour) DO UPDATE SET total = total + 1").bind(A,$,v).run():null,e.prepare("INSERT INTO ac_os_browser_stats (system_id, browser_id, hour, count) VALUES (?, ?, ?, 1) ON CONFLICT(system_id, browser_id, hour) DO UPDATE SET count = count + 1").bind(q,U,v).run(),V?e.prepare("INSERT INTO ac_city_isp_stats (country, city, region, as_org, asn, latitude, longitude, hour, count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1) ON CONFLICT(country, city, as_org, hour) DO UPDATE SET count = count + 1").bind(V,m.city||"",m.region||"",m.asOrganization||"",m.asn||null,parseFloat(m.latitude)||null,parseFloat(m.longitude)||null,v).run():null].filter(Boolean)),r()}function di(t,e,a,s){let n={};for(let l of t)n[l.t]=l;let i=[];if(s){let l=e.slice(0,10),r=a.slice(0,10),c=new Date(l+"T00:00:00Z"),d=new Date(r+"T00:00:00Z");for(let u=new Date(c);u<=d;u.setUTCDate(u.getUTCDate()+1)){let g=u.toISOString().slice(0,10);i.push({t:g,pv:n[g]?.pv||0,uv:n[g]?.uv||0})}}else{let l=new Date(e),r=new Date(a);for(let c=new Date(l);c<=r;c.setTime(c.getTime()+36e5)){let d=c.toISOString().slice(0,13);i.push({t:d,pv:n[d]?.pv||0,uv:n[d]?.uv||0})}}return i}async function on(t){let e=t.db,a=new URL(t.request.url),s=a.searchParams.get("metric")||"overview",n=a.searchParams.get("countMode")||"pv",i=a.searchParams.get("subDimension")||"",l=a.searchParams.get("expandName")||"",r=a.searchParams.get("startTimestamp")||new Date().toISOString(),c=a.searchParams.get("endTimestamp")||new Date().toISOString(),d=parseInt(a.searchParams.get("tzOffset"))||0,u=new Date(c)-new Date(r),g=u>=24*36e5,h=new Date(new Date(r)-u).toISOString(),y=r,m=r.slice(0,13)+":00:00.000Z",w=c.slice(0,13)+":59:59.999Z",S=n==="uv"?"COUNT(DISTINCT h.session)":"COUNT(*)",D=n==="uv"?"COUNT(DISTINCT session)":"COUNT(*)",L;switch(s){case"overview":{let f=g?10:13,b=async(G,...yt)=>{try{return await e.prepare(G).bind(...yt).first()}catch{return{v:0}}},_=async(G,...yt)=>{try{return(await e.prepare(G).bind(...yt).all()).results}catch{return[]}},[v,N,M,A]=await Promise.all([b("SELECT SUM(total) as v FROM ac_hit_counts WHERE hour >= ? AND hour <= ?",m,w),b("SELECT COUNT(DISTINCT session) as v FROM ac_hits WHERE created_at >= ? AND created_at <= ?",m,w),b(`SELECT ROUND(CAST(SUM(CASE WHEN cnt=1 THEN 1 ELSE 0 END) AS REAL) / MAX(COUNT(*),1) * 100) as v
          FROM (SELECT session, COUNT(*) as cnt FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY session)`,m,w),b("SELECT ROUND(AVG(duration)) as v FROM ac_hits WHERE created_at >= ? AND created_at <= ? AND duration > 0",m,w)]),$=await b("SELECT COUNT(*) as v FROM (SELECT DISTINCT session, substr(created_at,1,10) FROM ac_hits WHERE created_at >= ? AND created_at <= ?)",m,w),[U,q,K,P]=await Promise.all([b("SELECT SUM(total) as v FROM ac_hit_counts WHERE hour >= ? AND hour < ?",h,y),b("SELECT COUNT(DISTINCT session) as v FROM ac_hits WHERE created_at >= ? AND created_at < ?",h,y),b(`SELECT ROUND(CAST(SUM(CASE WHEN cnt=1 THEN 1 ELSE 0 END) AS REAL) / MAX(COUNT(*),1) * 100) as v
          FROM (SELECT session, COUNT(*) as cnt FROM ac_hits WHERE created_at >= ? AND created_at < ? GROUP BY session)`,h,y),b("SELECT ROUND(AVG(duration)) as v FROM ac_hits WHERE created_at >= ? AND created_at < ? AND duration > 0",h,y)]),V=await b("SELECT COUNT(*) as v FROM (SELECT DISTINCT session, substr(created_at,1,10) FROM ac_hits WHERE created_at >= ? AND created_at < ?)",h,y),Z=await _(`SELECT substr(hour, 1, ${f}) as t, SUM(total) as pv FROM ac_hit_counts WHERE hour >= ? AND hour <= ? GROUP BY t ORDER BY t`,m,w),bt=await _(`SELECT substr(created_at, 1, ${f}) as t, COUNT(DISTINCT session) as uv FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY t ORDER BY t`,m,w),ae={};for(let G of bt)ae[G.t]=G.uv;let Re=Z.map(G=>({t:G.t,pv:G.pv||0,uv:ae[G.t]||0})),Pt=v?.v||0,ha=N?.v||0,ba=$?.v||0,ya=M?.v||0,va=A?.v||0,Ft=(G,yt)=>yt===0?G>0?100:0:Math.round((G-yt)/yt*100);L={metrics:[{key:"visitors",value:ha,change:Ft(ha,q?.v||0)},{key:"visits",value:ba,change:Ft(ba,V?.v||0)},{key:"pageviews",value:Pt,change:Ft(Pt,U?.v||0)},{key:"bounce",value:Math.round(ya),change:Ft(ya,K?.v||0),unit:"%",invertColor:!0},{key:"duration",value:Math.round(va),change:Ft(va,P?.v||0),unit:"s"}],chart:di(Re,m,w,g),granularity:g?"daily":"hourly"};break}case"pages":{let f=await e.prepare(`SELECT p.path, p.title, ${S} as views
        FROM ac_hits h JOIN ac_paths p ON p.path_id = h.path_id
        WHERE h.created_at >= ? AND created_at <= ? GROUP BY h.path_id ORDER BY views DESC LIMIT 50`).bind(m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"entry":{let f=await e.prepare(`SELECT p.path, p.title, COUNT(*) as views FROM ac_paths p
        JOIN ac_hits h ON h.path_id = p.path_id
        WHERE h.hit_id IN (SELECT MIN(hit_id) FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY session)
        AND h.created_at >= ? AND created_at <= ? GROUP BY p.path ORDER BY views DESC LIMIT 30`).bind(m,w,m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"exit":{let f=await e.prepare(`SELECT p.path, p.title, COUNT(*) as views FROM ac_paths p
        JOIN ac_hits h ON h.path_id = p.path_id
        WHERE h.hit_id IN (SELECT MAX(hit_id) FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY session)
        AND h.created_at >= ? AND created_at <= ? GROUP BY p.path ORDER BY views DESC LIMIT 30`).bind(m,w,m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"domains":{let f=await e.prepare(`SELECT r.ref as fullref, ${S} as views
        FROM ac_hits h JOIN ac_refs r ON r.ref_id = h.ref_id
        WHERE h.created_at >= ? AND created_at <= ? AND r.ref != '' GROUP BY r.ref ORDER BY views DESC`).bind(m,w).all(),b={};for(let N of f.results){let M=N.fullref.split("/")[0]||N.fullref;b[M]=(b[M]||0)+N.views}let _=Object.entries(b).map(([N,M])=>({name:N,views:M})).sort((N,M)=>M.views-N.views).slice(0,30),v=_.reduce((N,M)=>N+M.views,0);L=_.map(N=>({...N,pct:v?Math.round(N.views/v*100):0}));break}case"refs":{let f=await e.prepare(`SELECT r.ref as name, ${S} as views
        FROM ac_hits h JOIN ac_refs r ON r.ref_id = h.ref_id
        WHERE h.created_at >= ? AND created_at <= ? AND r.ref != '' GROUP BY r.ref ORDER BY views DESC LIMIT 30`).bind(m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"domain_detail":{let f=l||"";L=(await e.prepare(`SELECT r.ref as fullref, ${S} as views
        FROM ac_hits h JOIN ac_refs r ON r.ref_id = h.ref_id
        WHERE h.created_at >= ? AND created_at <= ? AND r.ref LIKE ? AND r.ref != '' GROUP BY r.ref ORDER BY views DESC LIMIT 20`).bind(m,w,f+"%").all()).results.map(_=>({name:_.fullref,views:_.views}));break}case"channels":{let f=["google","bing","baidu","yahoo","duckduckgo","yandex","sogou","ecosia","naver","seznam"],b=new URL(t.request.url).hostname,_=await e.prepare(`SELECT r.ref, ${S} as views
        FROM ac_hits h JOIN ac_refs r ON r.ref_id = h.ref_id
        WHERE h.created_at >= ? AND created_at <= ? GROUP BY r.ref`).bind(m,w).all(),v=0,N=0,M=0,A=0;for(let U of _.results){if(!U.ref){v+=U.views;continue}let q=U.ref.split("/")[0];q===b?A+=U.views:f.some(K=>q.includes(K))?N+=U.views:M+=U.views}let $=v+N+M+A;L=[{name:"Direct",views:v,pct:$?Math.round(v/$*100):0},{name:"Organic",views:N,pct:$?Math.round(N/$*100):0},{name:"Referral",views:M,pct:$?Math.round(M/$*100):0},{name:"Internal",views:A,pct:$?Math.round(A/$*100):0}].filter(U=>U.views>0);break}case"channel_detail":{let f=["google","bing","baidu","yahoo","duckduckgo","yandex","sogou","ecosia","naver","seznam"],b=new URL(t.request.url).hostname,_=l||"",v=await e.prepare(`SELECT r.ref, ${S} as views
        FROM ac_hits h JOIN ac_refs r ON r.ref_id = h.ref_id
        WHERE h.created_at >= ? AND created_at <= ? AND r.ref != '' GROUP BY r.ref ORDER BY views DESC`).bind(m,w).all(),N=[];for(let A of v.results){let $=A.ref.split("/")[0];_==="Organic"&&f.some(U=>$.includes(U))?N.push({name:$,views:A.views}):_==="Referral"&&$!==b&&!f.some(U=>$.includes(U))&&N.push({name:$,views:A.views})}let M={};for(let A of N)M[A.name]=(M[A.name]||0)+A.views;L=Object.entries(M).map(([A,$])=>({name:A,views:$})).sort((A,$)=>$.views-A.views).slice(0,20);break}case"browser_versions":{let f=l||"";L=(await e.prepare(`SELECT b.version as name, ${S} as views
        FROM ac_hits h JOIN ac_browsers b ON b.browser_id = h.browser_id
        WHERE h.created_at >= ? AND created_at <= ? AND b.name = ? GROUP BY b.version ORDER BY views DESC LIMIT 20`).bind(m,w,f).all()).results;break}case"system_versions":{let f=l||"";L=(await e.prepare(`SELECT s.version as name, ${S} as views
        FROM ac_hits h JOIN ac_systems s ON s.system_id = h.system_id
        WHERE h.created_at >= ? AND created_at <= ? AND s.name = ? GROUP BY s.version ORDER BY views DESC LIMIT 20`).bind(m,w,f).all()).results;break}case"device_models":{let f=l||"";L=(await e.prepare(`SELECT COALESCE(NULLIF(device_model,''),'Unknown') as name, ${D} as views
        FROM ac_hits WHERE created_at >= ? AND created_at <= ? AND device_type = ? GROUP BY name ORDER BY views DESC LIMIT 20`).bind(m,w,f).all()).results;break}case"location_cities":{let f=l||"",b=i||"cities";b==="isp"?L=(await e.prepare(`SELECT COALESCE(NULLIF(as_org,''),'Unknown') as name, 'AS'||MAX(COALESCE(asn,'')) as tip, ${D} as views
          FROM ac_hits WHERE created_at >= ? AND created_at <= ? AND country = ? GROUP BY as_org ORDER BY views DESC LIMIT 20`).bind(m,w,f).all()).results:b==="both"?L=(await e.prepare(`SELECT COALESCE(NULLIF(city,''),'Unknown') as city,
          COALESCE(NULLIF(region,''),'') as region,
          COALESCE(NULLIF(as_org,''),'Unknown') as isp,
          'AS'||MAX(COALESCE(asn,'')) as isp_tip,
          ROUND(AVG(latitude),4) as lat, ROUND(AVG(longitude),4) as lng,
          SUM(count) as views
          FROM ac_city_isp_stats WHERE hour >= ? AND hour <= ? AND country = ? GROUP BY city, as_org ORDER BY views DESC LIMIT 20`).bind(m,w,f).all()).results.map(v=>({city:v.region?v.city+"/"+v.region:v.city,city_tip:v.lat!=null&&v.lng!=null?v.lat+", "+v.lng:"",isp:v.isp,tip:v.isp_tip,views:v.views})):L=(await e.prepare(`SELECT COALESCE(NULLIF(city,''),'Unknown') as name,
          COALESCE(NULLIF(region,''),'') as region,
          ROUND(AVG(CASE WHEN latitude IS NOT NULL THEN latitude END),4) as lat,
          ROUND(AVG(CASE WHEN longitude IS NOT NULL THEN longitude END),4) as lng,
          ${D} as views
          FROM ac_hits WHERE created_at >= ? AND created_at <= ? AND country = ? GROUP BY city ORDER BY views DESC LIMIT 20`).bind(m,w,f).all()).results.map(v=>({name:v.region?v.name+"/"+v.region:v.name,tip:v.lat!=null&&v.lng!=null?v.lat+", "+v.lng:"",views:v.views}));break}case"utm":{let f=await e.prepare("SELECT query FROM ac_hits WHERE created_at >= ? AND created_at <= ? AND query != '' AND query LIKE '%utm_%'").bind(m,w).all(),b={};for(let _ of f.results)try{let N=new URLSearchParams(_.query).get("utm_source");N&&(b[N]=(b[N]||0)+1)}catch{}L=Object.entries(b).map(([_,v])=>({name:_,views:v})).sort((_,v)=>v.views-_.views).slice(0,20);break}case"browsers":{let f=await e.prepare(`SELECT COALESCE(NULLIF(b.name,''),'Unknown') as name, ${S} as views
        FROM ac_hits h JOIN ac_browsers b ON b.browser_id = h.browser_id
        WHERE h.created_at >= ? AND created_at <= ? GROUP BY name ORDER BY views DESC LIMIT 20`).bind(m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"systems":{let f=await e.prepare(`SELECT COALESCE(NULLIF(s.name,''),'Unknown') as name, ${S} as views
        FROM ac_hits h JOIN ac_systems s ON s.system_id = h.system_id
        WHERE h.created_at >= ? AND created_at <= ? GROUP BY name ORDER BY views DESC LIMIT 20`).bind(m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"env_system":{let f=i||"systems";if(f==="os_browser"){let b=await e.prepare(`SELECT
          COALESCE(NULLIF(s.name,''),'Unknown') || ' ' || COALESCE(s.version,'') || ' \xB7 ' || COALESCE(NULLIF(b.name,''),'Unknown') || ' ' || COALESCE(b.version,'') as name,
          SUM(obs.count) as views
          FROM ac_os_browser_stats obs
          JOIN ac_systems s ON s.system_id = obs.system_id
          JOIN ac_browsers b ON b.browser_id = obs.browser_id
          WHERE obs.hour >= ? AND obs.hour <= ? GROUP BY obs.system_id, obs.browser_id ORDER BY views DESC LIMIT 30`).bind(m,w).all(),_=b.results.reduce((v,N)=>v+N.views,0);L=b.results.map(v=>({...v,pct:_?Math.round(v.views/_*100):0}))}else if(f==="browsers"){let b=await e.prepare(`SELECT COALESCE(NULLIF(b.name,''),'Unknown') as name, ${S} as views
          FROM ac_hits h JOIN ac_browsers b ON b.browser_id = h.browser_id
          WHERE h.created_at >= ? AND created_at <= ? GROUP BY name ORDER BY views DESC LIMIT 20`).bind(m,w).all(),_=b.results.reduce((v,N)=>v+N.views,0);L=b.results.map(v=>({...v,pct:_?Math.round(v.views/_*100):0}))}else{let b=await e.prepare(`SELECT COALESCE(NULLIF(s.name,''),'Unknown') as name, ${S} as views
          FROM ac_hits h JOIN ac_systems s ON s.system_id = h.system_id
          WHERE h.created_at >= ? AND created_at <= ? GROUP BY name ORDER BY views DESC LIMIT 20`).bind(m,w).all(),_=b.results.reduce((v,N)=>v+N.views,0);L=b.results.map(v=>({...v,pct:_?Math.round(v.views/_*100):0}))}break}case"devices":{let f=await e.prepare(`SELECT COALESCE(NULLIF(device_type,''),'Unknown') as name, ${D} as views
        FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY name ORDER BY views DESC`).bind(m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"locations":{let f=await e.prepare(`SELECT COALESCE(NULLIF(country,''),'Unknown') as name, COUNT(*) as pv, COUNT(DISTINCT session) as uv
        FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY name ORDER BY ${n==="uv"?"uv":"pv"} DESC LIMIT 30`).bind(m,w).all(),b=f.results.reduce((_,v)=>_+(n==="uv"?v.uv:v.pv),0);L=f.results.map(_=>({..._,views:n==="uv"?_.uv:_.pv,pct:b?Math.round((n==="uv"?_.uv:_.pv)/b*100):0}));break}case"languages":{let f=await e.prepare(`SELECT COALESCE(NULLIF(language,''),'Unknown') as name, ${D} as views
        FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY name ORDER BY views DESC LIMIT 20`).bind(m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"timezones":{let f=await e.prepare(`SELECT COALESCE(NULLIF(timezone,''),'Unknown') as name, ${D} as views
        FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY name ORDER BY views DESC LIMIT 30`).bind(m,w).all(),b=f.results.reduce((_,v)=>_+v.views,0);L=f.results.map(_=>({..._,pct:b?Math.round(_.views/b*100):0}));break}case"heatmap":{let f=-d,b=new Date(Date.now()+f*6e4),_=new Date(b);_.setUTCDate(_.getUTCDate()-_.getUTCDay()),_.setUTCHours(0,0,0,0);let v=new Date(_.getTime()-f*6e4).toISOString(),N=new Date(_.getTime()+7*864e5-1-f*6e4).toISOString(),M=await e.prepare(`SELECT
        CAST(strftime('%w', datetime(created_at, '${f} minutes')) AS INTEGER) as dow,
        CAST(strftime('%H', datetime(created_at, '${f} minutes')) AS INTEGER) as hour,
        COUNT(*) as views
        FROM ac_hits WHERE created_at >= ? AND created_at <= ? GROUP BY dow, hour`).bind(v,N).all(),A=Array.from({length:7},()=>Array(24).fill(0));for(let $ of M.results)A[$.dow][$.hour]=$.views;L=A;break}case"sessions":{let f=parseInt(a.searchParams.get("page"))||1,b=20,_=(f-1)*b,v=await e.prepare("SELECT COUNT(DISTINCT session) as total FROM ac_hits WHERE created_at >= ? AND created_at <= ?").bind(m,w).first(),N=(await e.prepare(`SELECT session, MIN(created_at) as first_seen, MAX(created_at) as last_seen,
        COUNT(*) as page_count, MAX(duration) as duration,
        MAX(device_type) as device_type, MAX(device_model) as device_model,
        MAX(country) as country, MAX(region) as region, MAX(city) as city,
        MAX(latitude) as lat, MAX(longitude) as lng,
        MAX(as_org) as as_org, MAX(asn) as asn,
        MAX(timezone) as timezone, MAX(language) as language
        FROM ac_hits WHERE created_at >= ? AND created_at <= ?
        GROUP BY session ORDER BY first_seen DESC LIMIT ? OFFSET ?`).bind(m,w,b,_).all()).results;if(N.length>0){let M=N.map(()=>"?").join(","),A=(await e.prepare(`SELECT h.session, p.path, p.title, r.ref,
          b.name as browser, b.version as browser_ver,
          s.name as os, s.version as os_ver, h.created_at
          FROM ac_hits h JOIN ac_paths p ON p.path_id=h.path_id JOIN ac_refs r ON r.ref_id=h.ref_id
          JOIN ac_browsers b ON b.browser_id=h.browser_id JOIN ac_systems s ON s.system_id=h.system_id
          WHERE h.session IN (${M}) AND h.created_at >= ? AND h.created_at <= ?
          ORDER BY h.created_at ASC`).bind(...N.map(U=>U.session),m,w).all()).results,$={};for(let U of A)$[U.session]||($[U.session]=[]),$[U.session].push(U);for(let U of N){let q=$[U.session]||[];U.trail=q.map(K=>({path:K.path,title:K.title||""})),U.browser=q[0]?.browser||"",U.browser_ver=q[0]?.browser_ver||"",U.os=q[0]?.os||"",U.os_ver=q[0]?.os_ver||"",U.referrer=q[0]?.ref||""}}L={sessions:N,total:v?.total||0,page:f,pageSize:b};break}case"sankey":{let U=function(){if(A)if($&&$.length){let P=A+"|||_trunc";_[P]=(_[P]||0)+1,v[A]||(v[A]=[]),v[A].push($)}else{let P=A+"|||_exit";_[P]=(_[P]||0)+1}},b=(await e.prepare(`SELECT h.session, p.path, h.created_at
        FROM ac_hits h JOIN ac_paths p ON p.path_id=h.path_id
        WHERE h.created_at >= ? AND h.created_at <= ?
        ORDER BY h.session, h.created_at ASC LIMIT 10000`).bind(m,w).all()).results,_={},v={},N=null,M=0,A=null,$=null;for(let P of b){if(P.session!==N&&(U(),M=0,A=null,N=P.session,$=null),M>=6){$||($=[]),$.push(P.path);continue}let V="s"+M+":"+P.path;if(A&&A!==V){let Z=A+"|||"+V;_[Z]=(_[Z]||0)+1}A=V,M++}U();let q=[];for(let[P,V]of Object.entries(_)){let[Z,bt]=P.split("|||");q.push({from:Z,to:bt,flow:V})}q.sort((P,V)=>V.flow-P.flow);let K={};for(let[P,V]of Object.entries(v)){let Z=P.replace(/^s[0-9]+:/,"");K[P]=V.map(bt=>Z+" \u2192 "+bt.join(" \u2192 ")+" \u21E5")}L={links:q.slice(0,80),truncInfo:K};break}default:L=[]}return new Response(JSON.stringify(L),{headers:{"Content-Type":"application/json"}})}async function ln(t){let e=t.db,a=["ac_hits","ac_hit_counts","ac_ref_counts","ac_os_browser_stats","ac_city_isp_stats","ac_paths","ac_refs","ac_browsers","ac_systems"];for(let s of a)await e.prepare(`DELETE FROM ${s}`).run();return await e.prepare("INSERT OR IGNORE INTO ac_refs (ref_id, ref, ref_scheme) VALUES (1, '', 'o')").run(),new Response(null,{status:302,headers:{Location:"/admin/analytics"}})}async function cn(t){let e=ut(),a=J()==="en",[s,n]=await Promise.all([t.db.prepare("SELECT MIN(created_at) as t FROM ac_hits").first(),t.db.prepare("SELECT MAX(created_at) as t FROM ac_hits").first()]),i=!!(s?.t&&n?.t),l=i?s.t.slice(0,13)+":00:00.000Z":"",r=i?n.t.slice(0,13)+":59:59.999Z":"",c={visitors:o("analytics_visitors")+(a?"":"(UV)"),visits:o("analytics_visits"),pageviews:o("analytics_pageviews")+(a?"":"(PV)"),bounce:o("analytics_bounce"),duration:o("analytics_duration")},d=`
    <div class="admin-header">
      <h1 data-i18n="analytics_title">Analytics</h1>
      <form id="ac-clear-form" method="POST" action="/admin/analytics/clear" onsubmit="return ccConfirm(this,event,'${o("analytics_clear_confirm")}')" style="display:none;">
        <button type="submit" class="btn btn-sm" style="color:var(--danger);" data-i18n="analytics_clear">Clear Data</button>
      </form>
    </div>

    <div id="ac-empty" class="empty-state" style="display:none;">
      <h2 data-i18n="analytics_no_data">No data yet</h2>
      <p data-i18n="analytics_no_data_hint">Visitor data will appear here once your site receives traffic.</p>
    </div>

    <div id="ac-content" style="display:none;">
    <div style="margin-bottom:20px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
      <button class="btn btn-sm ac-period" data-period="today" data-i18n="analytics_today">Today</button>
      <button class="btn btn-sm ac-period" data-period="yesterday" data-i18n="analytics_yesterday">Yesterday</button>
      <button class="btn btn-sm ac-period" data-period="24h" data-i18n="analytics_24h">Last 24h</button>
      <button class="btn btn-sm ac-period active" data-period="7d" data-i18n="analytics_7d">7 Days</button>
      <button class="btn btn-sm ac-period" data-period="30d" data-i18n="analytics_30d">30 Days</button>
      <button class="btn btn-sm ac-period" data-period="90d" data-i18n="analytics_90d">90 Days</button>
      <button class="btn btn-sm ac-period" data-period="custom" id="ac-custom-btn" data-i18n="analytics_custom">Custom</button>
    </div>
    <div id="ac-custom-range" style="display:none;margin-bottom:16px;align-items:center;gap:8px;flex-wrap:wrap;">
      <input type="date" id="ac-date-start" style="padding:4px 8px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:0.85rem;">
      <span style="color:var(--text-secondary);">\u2013</span>
      <input type="date" id="ac-date-end" style="padding:4px 8px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:0.85rem;">
      <button class="btn btn-sm" id="ac-custom-apply" style="background:var(--accent-color,#007aff);color:#fff;border:none;" data-i18n="analytics_apply">Apply</button>
      <span style="color:var(--text-secondary,#888);font-size:0.75rem;margin-left:4px;" data-i18n="analytics_same_day_hint">Select same date for hourly view</span>
    </div>
    <div id="ac-24h-option" style="display:none;margin-bottom:16px;align-items:center;gap:8px;font-size:0.85rem;">
      <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
        <input type="checkbox" id="ac-24h-check">
        <span data-i18n="analytics_24h_back">Last 24 hours ending at</span>
      </label>
      <select id="ac-24h-hour" style="padding:4px 8px;border:1px solid var(--border-color,#ddd);border-radius:6px;font-size:0.85rem;" disabled>
        ${Array.from({length:23},(u,g)=>'<option value="'+(g+1)+'">'+String(g+1).padStart(2,"0")+":00</option>").join("")}
      </select>
      <span id="ac-24h-range" style="color:var(--text-secondary,#888);font-size:0.75rem;"></span>
    </div>
    <div id="ac-trimmed-hint" style="display:none;margin-bottom:12px;padding:8px 12px;background:rgba(38,128,235,0.08);border-radius:6px;font-size:0.8rem;color:var(--text-secondary,#666);" data-i18n="analytics_trimmed_hint">Query and display time range has been trimmed to exclude periods with no possible data.</div>
    <div id="ac-period-empty" class="empty-state" style="display:none;">
      <h2 data-i18n="analytics_period_no_data">No data in selected period</h2>
    </div>
    <div id="ac-data-content">
    <!-- Metric cards -->
    <div id="ac-metrics" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:24px;"></div>
    <!-- Chart / Map toggle -->
    <div class="ac-card" style="padding:16px;margin-bottom:24px;">
      <div style="display:flex;justify-content:flex-end;margin-bottom:8px;">
        <div class="ac-sub-filter visible" style="padding:0;">
          <label><input type="radio" name="chart-view" value="chart" checked> <span data-i18n="analytics_chart">Chart</span></label>
          <label><input type="radio" name="chart-view" value="map"> <span data-i18n="analytics_world_atlas">World Atlas</span></label>
        </div>
      </div>
      <div id="ac-chart-view">
        <div style="position:relative;height:400px;">
          <canvas id="ac-chart"></canvas>
        </div>
        <div id="ac-legend" style="display:flex;gap:16px;justify-content:center;margin-top:12px;font-size:0.85rem;"></div>
      </div>
      <div id="ac-map-view" style="display:none;">
        <div id="ac-map" style="width:100%;min-height:400px;"></div>
        <div style="text-align:center;color:var(--text-secondary,#888);font-size:0.75rem;margin-top:8px;" data-i18n="analytics_map_note">Some small territories (e.g. Hong Kong, Macau, Singapore) may not be visible on the map. See the Region panel for complete data.</div>
      </div>
    </div>

    <!-- Panels row 1: Pages | Channel -->
    <div class="ac-grid" style="margin-bottom:16px;">
      <div class="ac-card ac-panel">
        <div class="ac-title-bar"><h3 class="ac-panel-title" data-i18n="analytics_pages">Pages</h3><div class="ac-mode-toggle" data-panel="pages"><button class="ac-mode" data-mode="uv">UV</button><button class="ac-mode active" data-mode="pv">PV</button></div></div>
        <div class="ac-tabs" id="ac-pages-tabs">
          <button class="ac-tab active" data-metric="pages" data-i18n="analytics_footprint">Footprint</button>
          <button class="ac-tab" data-metric="entry" data-i18n="analytics_entry">Entry</button>
          <button class="ac-tab" data-metric="exit" data-i18n="analytics_exit">Exit</button>
        </div>
        <div id="ac-pages-sub" class="ac-sub-filter visible">
          <label><input type="radio" name="pages-sub" value="path" checked> <span data-i18n="analytics_show_path">Path</span></label>
          <label><input type="radio" name="pages-sub" value="title"> <span data-i18n="analytics_show_title">Title</span></label>
        </div>
        <div id="ac-pages" class="ac-list"></div>
      </div>
      <div class="ac-card ac-panel">
        <div class="ac-title-bar"><h3 class="ac-panel-title" data-i18n="analytics_refs">Referrers</h3><div class="ac-mode-toggle" data-panel="refs"><button class="ac-mode" data-mode="uv">UV</button><button class="ac-mode active" data-mode="pv">PV</button></div></div>
        <div class="ac-tabs" id="ac-refs-tabs">
          <button class="ac-tab active" data-metric="domains" data-i18n="analytics_domain">Domain</button>
          <button class="ac-tab" data-metric="channels" data-i18n="analytics_channel">Channel</button>
        </div>
        <div id="ac-refs" class="ac-list"></div>
      </div>
    </div>

    <!-- Panels row 2: Tech | Region -->
    <div class="ac-grid" style="margin-bottom:16px;">
      <div class="ac-card ac-panel">
        <div class="ac-title-bar"><h3 class="ac-panel-title" data-i18n="analytics_tech">Technology</h3><div class="ac-mode-toggle" data-panel="env"><button class="ac-mode" data-mode="uv">UV</button><button class="ac-mode active" data-mode="pv">PV</button></div></div>
        <div class="ac-tabs" id="ac-env-tabs">
          <button class="ac-tab active" data-metric="env_system" data-i18n="analytics_system">System</button>
          <button class="ac-tab" data-metric="devices" data-i18n="analytics_devices">Device Type</button>
        </div>
        <div id="ac-env-sub" class="ac-sub-filter">
          <label><input type="radio" name="env-sub" value="systems" checked> <span data-i18n="analytics_os">OS</span></label>
          <label><input type="radio" name="env-sub" value="browsers"> <span data-i18n="analytics_browsers">Browsers</span></label>
          <label><input type="radio" name="env-sub" value="os_browser"> <span data-i18n="analytics_os">OS</span>+<span data-i18n="analytics_browsers">Browsers</span></label>
        </div>
        <div id="ac-env" class="ac-list"></div>
      </div>
      <div class="ac-card ac-panel">
        <div class="ac-title-bar"><h3 class="ac-panel-title" data-i18n="analytics_region">Region</h3><div class="ac-mode-toggle" data-panel="geo"><button class="ac-mode" data-mode="uv">UV</button><button class="ac-mode active" data-mode="pv">PV</button></div></div>
        <div class="ac-tabs" id="ac-geo-tabs">
          <button class="ac-tab active" data-metric="locations" data-i18n="analytics_locations">Locations</button>
          <button class="ac-tab" data-metric="timezones" data-i18n="analytics_timezone">Timezone</button>
          <button class="ac-tab" data-metric="languages" data-i18n="analytics_languages">Languages</button>
        </div>
        <div id="ac-geo-sub" class="ac-sub-filter">
          <label><input type="radio" name="geo-sub" value="cities" checked> <span data-i18n="analytics_cities">City/Territory</span></label>
          <label><input type="radio" name="geo-sub" value="isp"> <span data-i18n="analytics_isp">ISP</span></label>
          <label><input type="radio" name="geo-sub" value="both"> <span data-i18n="analytics_cities">City/Territory</span>+<span data-i18n="analytics_isp">ISP</span></label>
        </div>
        <div id="ac-geo" class="ac-list"></div>
      </div>
    </div>

    <!-- Heatmap -->
    <div style="margin-top:16px;">
      <div class="ac-card" style="padding:16px;">
        <h3 style="margin:0 0 12px;" data-i18n="analytics_heatmap">Weekly Heatmap</h3>
        <div id="ac-heatmap" style="max-width:100%;overflow:hidden;"></div>
      </div>
    </div>
    </div><!-- /ac-data-content -->

    <div id="ac-sessions-view" style="display:none;">
      <div style="margin-bottom:16px;"><button class="btn btn-sm" id="ac-sessions-back">&larr; ${o("analytics_back")}</button></div>
      <h3 id="ac-sessions-title" style="margin:0 0 16px;"></h3>
      <div id="ac-sessions-list"></div>
      <div id="ac-sessions-pager" style="display:flex;gap:8px;justify-content:center;margin-top:16px;"></div>
    </div>

    <div id="ac-sankey-view" style="display:none;">
      <div style="margin-bottom:16px;"><button class="btn btn-sm" id="ac-sankey-back">&larr; ${o("analytics_back")}</button></div>
      <div class="ac-card" style="padding:16px;">
        <h3 style="margin:0 0 12px;" data-i18n="analytics_sankey_title">Page Flow</h3>
        <div id="ac-sankey" style="width:100%;min-height:500px;overflow-x:auto;"></div>
      </div>
    </div>

    </div><!-- /ac-content -->

    <style>
      .ac-card{background:var(--card-bg,#fff);border-radius:var(--radius-lg,12px);box-shadow:var(--shadow,0 2px 12px rgba(0,0,0,0.08));max-width:none;}
      .ac-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(480px,1fr));gap:16px;}
      .ac-panel{display:flex;flex-direction:column;min-height:500px;}
      .ac-title-bar{display:flex;align-items:center;justify-content:space-between;padding:12px 16px 4px;}
      .ac-panel-title{margin:0;font-size:1rem;font-weight:700;}
      .ac-mode-toggle{display:flex;gap:0;border:1px solid var(--border-color,#ddd);border-radius:6px;overflow:hidden;}
      .ac-mode{padding:3px 10px;border:none;background:none;cursor:pointer;font-size:0.75rem;font-weight:600;color:var(--text-secondary,#888);}
      .ac-mode.active{background:var(--accent-color,#007aff);color:#fff;}
      .ac-tabs{display:flex;gap:0;border-bottom:1px solid var(--border-color,#eee);padding:0 16px;align-items:center;}
      .ac-tab{padding:10px 12px;border:none;background:none;cursor:pointer;font-size:0.85rem;color:var(--text-secondary,#666);border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;}
      .ac-tab.active{color:var(--text,#1d1d1f);border-bottom-color:var(--accent-color,#007aff);font-weight:600;}
      .ac-tab-right{margin-left:auto;font-size:0.8rem;font-weight:600;color:var(--text-secondary,#666);white-space:nowrap;}
      .ac-list{flex:1;overflow-y:auto;padding:0 16px 16px;}
      .ac-row{display:flex;align-items:center;padding:6px 0;border-bottom:1px solid var(--border-color,#f0f0f0);font-size:0.85rem;}
      .ac-row:last-child{border-bottom:none;}
      .ac-row .ac-label{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .ac-row .ac-value{width:50px;text-align:right;font-weight:600;flex-shrink:0;}
      .ac-row .ac-pct{width:40px;text-align:right;color:var(--text-secondary,#888);font-size:0.8rem;flex-shrink:0;}
      .ac-expandable{cursor:pointer;} .ac-expandable:hover{background:var(--bg-secondary,#f8f8f8);}
      .ac-arrow{font-size:0.55rem;color:var(--text-secondary);margin-left:4px;display:inline-block;}
      .ac-sub{border-left:2px solid var(--accent-color,#007aff);margin-left:20px;}
      .ac-sub .ac-row{padding-left:8px;font-size:0.8rem;border-bottom:1px solid var(--border-color,#f5f5f5);}
      .ac-period{padding:6px 14px;border:1px solid var(--border-color,#ddd);background:var(--bg-secondary,#f5f5f5);border-radius:6px;cursor:pointer;font-size:0.85rem;}
      .ac-period.active{background:var(--accent-color,#007aff);color:#fff;border-color:transparent;}
      .ac-metric{background:var(--card-bg,#fff);border-radius:var(--radius-lg,12px);box-shadow:var(--shadow,0 2px 12px rgba(0,0,0,0.08));padding:16px 20px;}
      .ac-metric.ac-clickable{cursor:pointer;position:relative;transition:box-shadow 0.2s,transform 0.2s;}
      .ac-metric.ac-clickable::after{content:'';position:absolute;bottom:0;left:12px;right:12px;height:3px;border-radius:2px;background:var(--accent-color,#007aff);opacity:0.3;transition:opacity 0.2s;}
      .ac-metric.ac-clickable:hover{box-shadow:0 4px 16px rgba(0,0,0,0.12);transform:translateY(-1px);}
      .ac-metric.ac-clickable:hover::after{opacity:0.8;}
      .ac-session-card{background:var(--card-bg,#fff);border-radius:var(--radius-lg,12px);box-shadow:var(--shadow,0 2px 12px rgba(0,0,0,0.08));padding:14px 18px;margin-bottom:10px;transition:box-shadow 0.15s,transform 0.15s;}
      .ac-session-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.12);transform:translateY(-1px);}
      .ac-session-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:0.8rem;color:var(--text-secondary,#666);}
      .ac-session-trail{margin-top:8px;font-size:0.82rem;color:var(--text,#333);word-break:break-all;}
      .ac-metric .ac-metric-label{font-size:0.8rem;font-weight:600;color:var(--text-secondary,#666);}
      .ac-metric .ac-metric-value{font-size:1.8rem;font-weight:700;margin:4px 0;}
      .ac-metric .ac-metric-change{font-size:0.8rem;display:inline-flex;align-items:center;gap:2px;padding:2px 6px;border-radius:4px;}
      .ac-change-up{color:var(--success,#34c759);background:rgba(52,199,89,0.1);}
      .ac-change-down{color:var(--danger,#ff3b30);background:rgba(255,59,48,0.1);}
      .ac-change-neutral{color:var(--text-secondary,#888);background:var(--bg-secondary,#f5f5f5);}
      .ac-sub-filter{display:none;padding:8px 16px;font-size:0.8rem;color:var(--text-secondary,#666);gap:12px;flex-wrap:wrap;}
      .ac-sub-filter.visible{display:flex;}
      .ac-sub-filter label{display:flex;align-items:center;gap:3px;cursor:pointer;white-space:nowrap;}
      .ac-sub-filter input{margin:0;}
      .ac-hm-grid-h{display:grid;grid-template-columns:36px repeat(24,1fr);gap:2px;font-size:0.7rem;}
      .ac-hm-grid-v{display:grid;grid-template-columns:40px repeat(7,1fr);gap:2px;font-size:0.7rem;}
      .ac-hm-corner{width:36px;}
      .ac-hm-hlabel{text-align:center;color:var(--text-secondary,#888);font-size:0.65rem;padding-bottom:2px;}
      .ac-hm-dlabel{display:flex;align-items:center;justify-content:flex-end;padding-right:6px;color:var(--text-secondary,#888);font-size:0.75rem;white-space:nowrap;}
      .ac-hm-cell{width:100%;aspect-ratio:1;cursor:default;display:flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid var(--border-color,#e8e8e8);position:relative;}
      .ac-hm-cell:hover{border-color:var(--accent-color,#007aff);background:rgba(38,128,235,0.05);}
      .ac-hm-dot{border-radius:50%;background:rgba(38,128,235,0.7);transition:transform 0.1s;}
      .ac-hm-cell:hover .ac-hm-dot{transform:scale(1.15);}
      @media(max-width:768px){.ac-grid{grid-template-columns:1fr;}}
    </style>
    <script src="https://${e}/npm/chart.js@4/dist/chart.umd.min.js"><\/script>
    <script src="https://${e}/npm/d3-array@3/dist/d3-array.min.js"><\/script>
    <script src="https://${e}/npm/d3-geo@3/dist/d3-geo.min.js"><\/script>
    <script src="https://${e}/npm/d3-path@3/dist/d3-path.min.js"><\/script>
    <script src="https://${e}/npm/d3-shape@3/dist/d3-shape.min.js"><\/script>
    <script src="https://${e}/npm/d3-sankey@0.12/dist/d3-sankey.min.js"><\/script>
    <script src="https://${e}/npm/topojson-client@3/dist/topojson-client.min.js"><\/script>
    <script>window._LF={labels:${JSON.stringify(c)},i18n:{device_desktop:${JSON.stringify(o("analytics_device_desktop"))},device_mobile:${JSON.stringify(o("analytics_device_mobile"))},device_tablet:${JSON.stringify(o("analytics_device_tablet"))},days:[${JSON.stringify(o("analytics_sun"))},${JSON.stringify(o("analytics_mon"))},${JSON.stringify(o("analytics_tue"))},${JSON.stringify(o("analytics_wed"))},${JSON.stringify(o("analytics_thu"))},${JSON.stringify(o("analytics_fri"))},${JSON.stringify(o("analytics_sat"))}],sessions_title:${JSON.stringify(o("analytics_sessions_title"))},sankey_title:${JSON.stringify(o("analytics_sankey_title"))},timezone:${JSON.stringify(o("analytics_timezone"))},direct_label:${JSON.stringify("("+o("analytics_direct")+")")},no_sessions:${JSON.stringify(o("analytics_no_sessions"))},direct_visit:${JSON.stringify(o("analytics_direct_visit"))},prev_page:${JSON.stringify(o("analytics_prev_page"))},next_page:${JSON.stringify(o("analytics_next_page"))},no_flow:${JSON.stringify(o("analytics_no_flow"))}},cdn:${JSON.stringify(e)},minTs:${JSON.stringify(l)},maxTs:${JSON.stringify(r)}};<\/script>
    <script src="${B("analytics.js")}" defer><\/script>`;return new Response(Y({title:o("analytics_title"),body:d,isAdmin:!0,user:t.user}),{headers:{"Content-Type":"text/html; charset=utf-8"}})}k();tt();Q();async function dn(t){let e=await C(t.db,"chat_enabled")==="true",s=(t.request.headers.get("Cookie")||"").match(/(?:^|;\s*)lf_chat_vid=([^;]+)/),n=s?decodeURIComponent(s[1]):"",i=new Headers({"Content-Type":"application/json"});return n||(n=Math.random().toString(36).slice(2)+Date.now().toString(36),i.set("Set-Cookie",`lf_chat_vid=${encodeURIComponent(n)}; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly`)),new Response(JSON.stringify({enabled:e,vid:n}),{headers:i})}async function pn(t){try{let e=await t.request.json(),a=(e.visitor_id||"").trim(),s=(e.content||"").trim();if(!a||!s)return E({error:"missing fields"},400);if(s.length>2e3)return E({error:"message too long"},400);let n=await t.db.prepare("SELECT COUNT(*) as cnt FROM chat_messages WHERE visitor_id = ? AND created_at > unixepoch() - 60").bind(a).first();if(n&&n.cnt>=10)return E({error:"rate limited"},429);let i=fa(t.request.headers.get("User-Agent")||""),l=t.request.cf||{},r=(t.request.headers.get("Accept-Language")||"").split(",")[0].split(";")[0].trim(),c=parseInt(e.tp)||0;i.deviceType==="desktop"&&i.os==="macOS"&&c>0&&(i.os="iPadOS",i.deviceType="tablet",i.deviceModel="iPad");let d=await Ot(t.db,{visitor_id:a,visitor_name:(e.visitor_name||"").trim().slice(0,100),visitor_email:(e.visitor_email||"").trim().slice(0,200),role:"visitor",content:s,context:{page_path:(e.page_path||"").slice(0,500),page_title:(e.page_title||"").slice(0,200),ip:t.request.headers.get("CF-Connecting-IP")||"",country:l.country||"",city:l.city||"",region:l.region||"",os:i.os,os_version:i.osVersion,browser:i.browser,browser_version:i.browserVersion,language:r,timezone:l.timezone||""}});return E({ok:!0,id:d})}catch(e){return E({error:e.message},500)}}async function un(t){try{let e=await t.request.json(),a=(e.visitor_id||"").trim();if(!a)return E({error:"missing visitor_id"},400);let s=(e.visitor_name||"").trim().slice(0,100),n=(e.visitor_email||"").trim().slice(0,200);return await Ot(t.db,{visitor_id:a,visitor_name:s,visitor_email:n,role:"info",content:s||n?s+(n?" <"+n+">":""):""}),E({ok:!0})}catch(e){return E({error:e.message},500)}}async function mn(t){try{let e=t.query.vid||"";if(!e)return E({messages:[]});let a=parseInt(t.query.since)||0,s=await pe(t.db,e,{since:a});return E({messages:s})}catch(e){return E({error:e.message},500)}}async function gn(t){try{let e=await Xe(t.db),a=Math.floor(Date.now()/1e3);for(let s of e){s.online=s.last_role==="visitor"&&s.last_at&&a-s.last_at<300;let n=await Ke(t.db,s.visitor_id);Object.assign(s,n)}return E({conversations:e})}catch(e){return E({error:e.message},500)}}async function fn(t){try{let e=t.query.vid||"";if(!e)return E({messages:[]});let a=parseInt(t.query.since)||0;await Je(t.db,e);let s=await pe(t.db,e,{since:a});return E({messages:s})}catch(e){return E({error:e.message},500)}}async function _n(t){try{let e=await t.request.json(),a=(e.visitor_id||"").trim(),s=(e.content||"").trim();if(!a||!s)return E({error:"missing fields"},400);let n=await Ot(t.db,{visitor_id:a,visitor_name:"",visitor_email:"",role:"admin",content:s});return E({ok:!0,id:n})}catch(e){return E({error:e.message},500)}}async function hn(t){try{let e=await t.request.json(),a=(e.visitor_id||"").trim();if(!a)return E({error:"missing visitor_id"},400);let s=(e.note||"").trim().slice(0,500);return await Ot(t.db,{visitor_id:a,role:"note",content:s}),E({ok:!0})}catch(e){return E({error:e.message},500)}}async function bn(t){try{let e=await Ze(t.db);return E({unread:e})}catch(e){return E({error:e.message},500)}}async function yn(t){let e=await C(t.db,"site_title")||"Logflare",a=await C(t.db,"chat_enabled")==="true",s=`
    <div class="admin-header">
      <h1 data-i18n="chat_title">Visitor Chat</h1>
      <button id="chat-toggle-btn" class="btn btn-sm" style="background:${a?"var(--danger)":"var(--accent)"};color:#fff;" onclick="toggleChat()">
        ${a?'<span data-i18n="chat_disable">Disable</span>':'<span data-i18n="chat_enable">Enable</span>'}
      </button>
    </div>

    <div id="chat-admin" style="display:grid;grid-template-columns:300px 1fr;gap:20px;height:calc(100vh - 180px);min-height:400px;">
      <!-- Conversation list -->
      <div style="background:var(--card-bg);border-radius:var(--radius-lg);box-shadow:var(--shadow);overflow:hidden;display:flex;flex-direction:column;min-height:0;">
        <div style="padding:12px 16px;border-bottom:1px solid var(--border);font-weight:600;font-size:0.85rem;" data-i18n="chat_conversations">Conversations</div>
        <div id="chat-conv-list" style="flex:1;overflow-y:auto;"></div>
        <div id="chat-conv-empty" style="padding:40px 20px;text-align:center;color:var(--text-secondary);font-size:0.85rem;" data-i18n="chat_no_conversations">No conversations yet.</div>
      </div>

      <!-- Chat area -->
      <div style="background:var(--card-bg);border-radius:var(--radius-lg);box-shadow:var(--shadow);display:flex;flex-direction:column;min-height:0;overflow:hidden;">
        <div id="chat-header" style="padding:10px 16px;border-bottom:1px solid var(--border);font-size:0.8rem;display:none;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span id="chat-header-name" style="font-weight:600;cursor:pointer;border-bottom:1px dashed var(--border);" data-i18n-title="chat_note_placeholder" title="Add a note..."></span>
            <input id="chat-note-input" style="display:none;font-weight:600;padding:2px 6px;border:1px solid var(--accent);border-radius:var(--radius-sm);font-size:0.85rem;font-family:inherit;width:160px;">
            <span id="chat-header-email" style="color:var(--text-secondary);"></span>
          </div>
          <div id="chat-header-info" style="color:var(--text-secondary);font-size:0.75rem;display:flex;flex-wrap:wrap;gap:4px 12px;"></div>
        </div>
        <div id="chat-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:8px;"></div>
        <div id="chat-no-selected" style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--text-secondary);font-size:0.85rem;" data-i18n="chat_select_conversation">Select a conversation to view messages.</div>
        <div id="chat-input-area" style="padding:12px 16px;border-top:1px solid var(--border);display:none;">
          <form id="chat-reply-form" class="lf-chat-form">
            <input type="text" id="chat-reply-input" class="lf-chat-input" data-i18n-ph="chat_reply_placeholder" placeholder="Type a reply..." autocomplete="off">
            <button type="submit" class="lf-chat-btn" data-i18n="chat_send">Send</button>
          </form>
        </div>
      </div>
    </div>

    <script>
    (function() {
      var currentVid = null;
      var pollTimer = null;
      var convPollTimer = null;
      var lastMsgId = 0;
      var convNotes = {};
      var convOrigNames = {};
      var convData = {};

      var _audioCtx=null;
      function getAudioCtx(){if(!_audioCtx)_audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(_audioCtx.state==='suspended')_audioCtx.resume();return _audioCtx;}
      function playNotif(){try{var a=getAudioCtx(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=880;g.gain.value=0.3;o.start();g.gain.exponentialRampToValueAtTime(0.01,a.currentTime+0.15);o.stop(a.currentTime+0.15);}catch(e){}}

      function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

      function formatTime(ts) {
        var d = new Date(ts * 1000);
        var now = new Date();
        if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
        return d.toLocaleDateString([], {month:'short',day:'numeric'}) + ' ' + d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
      }

      function loadConversations() {
        fetch('/admin/api/chat/conversations').then(function(r){return r.json()}).then(function(data) {
          var list = document.getElementById('chat-conv-list');
          var empty = document.getElementById('chat-conv-empty');
          if (!data.conversations || data.conversations.length === 0) {
            list.innerHTML = '';
            empty.style.display = 'block';
            return;
          }
          empty.style.display = 'none';
          data.conversations.forEach(function(c) {
            convNotes[c.visitor_id] = c.note || '';
            convOrigNames[c.visitor_id] = c.visitor_name || c.visitor_id.slice(0, 8);
            convData[c.visitor_id] = c;
          });
          list.innerHTML = data.conversations.map(function(c) {
            var name = c.note || c.visitor_name || c.visitor_id.slice(0, 8);
            var isActive = c.visitor_id === currentVid;
            var onlineDot = c.online ? '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--success);flex-shrink:0;" data-i18n-title="chat_online" title="Online"></span>' : '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--text-disabled);flex-shrink:0;" data-i18n-title="chat_offline" title="Offline"></span>';
            var unread = c.unread > 0 ? '<span style="background:var(--accent);color:#fff;border-radius:10px;padding:1px 7px;font-size:0.7rem;margin-inline-start:auto;flex-shrink:0;">' + c.unread + '</span>' : '';
            var preview = esc((c.last_message || '').slice(0, 40));
            var youPrefix = c.last_role === 'admin' ? '${p(o("chat_you"))}: ' : '';
            return '<div class="chat-conv-item' + (isActive ? ' active' : '') + '" data-vid="' + esc(c.visitor_id) + '" onclick="selectChat(this)">' +
              '<div style="display:flex;align-items:center;gap:6px;">' + onlineDot + '<span style="font-weight:500;font-size:0.85rem;">' + esc(name) + '</span>' + unread + '</div>' +
              '<div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + youPrefix + preview + '</div>' +
              '<div style="font-size:0.7rem;color:var(--text-disabled);margin-top:2px;">' + formatTime(c.last_at) + '</div>' +
            '</div>';
          }).join('');
          // Refresh info bar and header for current conversation
          if (currentVid && convData[currentVid]) {
            updateVisitorInfo(currentVid);
            var cd = convData[currentVid];
            convOrigNames[currentVid] = cd.visitor_name || currentVid.slice(0, 8);
            document.getElementById('chat-header-name').textContent = convNotes[currentVid] || convOrigNames[currentVid];
            document.getElementById('chat-header-email').textContent = cd.visitor_email || '';
          }
        });
      }

      var adminLang = document.documentElement.lang || 'en';
      function dispName(type, code) {
        if (!code) return '';
        try { return new Intl.DisplayNames([adminLang], { type: type }).of(code); } catch(e) { return code; }
      }

      function updateVisitorInfo(vid) {
        var c = convData[vid];
        if (!c) return;
        var parts = [];
        if (c.page_path) parts.push(c.page_title ? c.page_title + ' (' + c.page_path + ')' : c.page_path);
        if (c.ip) {
          var geo = c.country ? dispName('region', c.country) : '';
          var detail = [c.region, c.city].filter(Boolean).join('/');
          parts.push(c.ip + (geo ? '\uFF08' + geo + (detail ? '\xB7 ' + detail : '') + '\uFF09' : ''));
        }
        if (c.language) parts.push(dispName('language', c.language));
        var envParts = [];
        if (c.os) envParts.push(c.os + (c.os_version ? ' ' + c.os_version : ''));
        if (c.browser) envParts.push(c.browser + (c.browser_version ? ' ' + c.browser_version : ''));
        if (envParts.length) parts.push(envParts.join(' / '));
        if (c.timezone) parts.push(c.timezone);
        document.getElementById('chat-header-info').innerHTML = parts.map(function(p) { return '<span>' + esc(p) + '</span>'; }).join('');
      }

      window.selectChat = function(el) {
        try{getAudioCtx();}catch(e){}
        var vid = el.getAttribute('data-vid');
        currentVid = vid;
        lastMsgId = 0;
        document.getElementById('chat-no-selected').style.display = 'none';
        document.getElementById('chat-header').style.display = 'block';
        document.getElementById('chat-input-area').style.display = 'block';
        document.getElementById('chat-messages').innerHTML = '';
        document.getElementById('chat-note-input').value = convNotes[vid] || '';
        updateVisitorInfo(vid);
        loadMessages(true);
        loadConversations();
        if (pollTimer) clearInterval(pollTimer);
        pollTimer = setInterval(function() { loadMessages(false); }, 5000);
      };

      function loadMessages(full) {
        if (!currentVid) return;
        var url = '/admin/api/chat/messages?vid=' + encodeURIComponent(currentVid);
        if (!full && lastMsgId) url += '&since=' + lastMsgId;
        fetch(url).then(function(r){return r.json()}).then(function(data) {
          if (!data.messages) return;
          var container = document.getElementById('chat-messages');
          if (full) container.innerHTML = '';

          // Header name/email updated via loadConversations refresh

          var hadNewVisitor = false;
          data.messages.forEach(function(m) {
            if (!full && m.id <= lastMsgId) return;
            if (m.id > lastMsgId) lastMsgId = m.id;
            // Skip note/info from chat bubbles
            if (m.role === 'note' || m.role === 'info') return;
            var isAdmin = m.role === 'admin';
            if (!full && !isAdmin) hadNewVisitor = true;
            var div = document.createElement('div');
            div.style.cssText = 'max-width:70%;padding:8px 12px;border-radius:12px;font-size:0.85rem;line-height:1.5;word-break:break-word;' +
              (isAdmin ? 'align-self:flex-end;background:var(--accent);color:#fff;' : 'align-self:flex-start;background:#f0f0f5;color:var(--text);');
            div.textContent = m.content;
            var time = document.createElement('div');
            time.style.cssText = 'font-size:0.65rem;color:' + (isAdmin ? 'rgba(255,255,255,0.7)' : 'var(--text-disabled)') + ';margin-top:2px;' + (isAdmin ? 'text-align:right;' : '');
            time.textContent = formatTime(m.created_at);
            div.appendChild(time);
            container.appendChild(div);
          });
          if (hadNewVisitor) playNotif();
          if (data.messages.length > 0) container.scrollTop = container.scrollHeight;
        });
      }

      document.getElementById('chat-reply-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var input = document.getElementById('chat-reply-input');
        var content = input.value.trim();
        if (!content || !currentVid) return;
        input.value = '';
        fetch('/admin/api/chat/send', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ visitor_id: currentVid, content: content })
        }).then(function() {
          loadMessages(false);
          setTimeout(loadConversations, 500);
        });
      });

      var nameSpan = document.getElementById('chat-header-name');
      var noteInput = document.getElementById('chat-note-input');

      nameSpan.onclick = function() {
        nameSpan.style.display = 'none';
        noteInput.style.display = 'block';
        noteInput.value = convNotes[currentVid] || nameSpan.textContent;
        noteInput.focus();
        noteInput.select();
      };

      function saveNote() {
        var note = noteInput.value.trim();
        noteInput.style.display = 'none';
        nameSpan.style.display = '';
        if (!currentVid) return;
        convNotes[currentVid] = note;
        nameSpan.textContent = note || convOrigNames[currentVid] || currentVid.slice(0, 8);
        fetch('/admin/api/chat/note', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ visitor_id: currentVid, note: note })
        }).then(function() { loadConversations(); });
      }

      noteInput.addEventListener('blur', saveNote);
      noteInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); noteInput.blur(); }
        if (e.key === 'Escape') { noteInput.value = convNotes[currentVid] || ''; noteInput.blur(); }
      });

      var chatEnabled = ${a};
      window.toggleChat = function() {
        chatEnabled = !chatEnabled;
        var btn = document.getElementById('chat-toggle-btn');
        btn.style.background = chatEnabled ? 'var(--danger)' : 'var(--accent)';
        btn.textContent = chatEnabled ? '${p(o("chat_disable"))}' : '${p(o("chat_enable"))}';
        fetch('/admin/api/setting', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ key: 'chat_enabled', value: chatEnabled ? 'true' : 'false' })
        });
      };

      // Initial load + periodic refresh
      loadConversations();
      convPollTimer = setInterval(loadConversations, 10000);
    })();
    <\/script>
  `;return I(Y({title:o("chat_title"),body:s,isAdmin:!0,user:t.user}))}k();function Mt(t,e,a={}){let s=a.maxAge??31536e3,n=a.httpOnly?"; HttpOnly":"",i=a.sameSite||"Lax";return`${t}=${encodeURIComponent(e)}; Path=/; Max-Age=${s}; SameSite=${i}; Secure${n}`}async function vn(t){let e={};try{e=await t.request.json()}catch{}let a=new Headers({"Content-Type":"application/json"});if(e.lang!==void 0){let s=String(e.lang).toLowerCase().slice(0,20);a.append("Set-Cookie",Mt("logflare_lang",s,{sameSite:"Strict"}))}if(e.lang_dismiss!==void 0&&a.append("Set-Cookie",Mt("logflare_lang_dismiss","1")),e.translate_engine!==void 0){let s=String(e.translate_engine).slice(0,50);a.append("Set-Cookie",Mt("lf_translate_engine",s))}if(e.chat_name!==void 0){let s=String(e.chat_name).slice(0,100);a.append("Set-Cookie",Mt("lf_chat_name",s))}if(e.chat_email!==void 0){let s=String(e.chat_email).slice(0,200);a.append("Set-Cookie",Mt("lf_chat_email",s))}if(e.skipac!==void 0){let s=e.skipac==="t"||e.skipac===!0?"t":"0";a.append("Set-Cookie",Mt("lf_skipac",s))}return new Response("{}",{status:200,headers:a})}var T=new se;T.get("/favicon.svg",async()=>Response.redirect(B("favicon.svg"),302));T.use(async t=>{let e=t.env;t.db=e.LF_DB||null,t.kv=e.LF_KV||null,t.r2=e.LF_FS||null,t.ai=e.LF_AI||null,t.lang="en",t.isRTL=!1;let a=t.request.cf?.country||"";if(Ma(a==="CN"?"cdn.jsdmirror.com":"cdn.jsdelivr.net"),t.cdnHost=ut(),!t.db)return I(`<div style="font-family:sans-serif;padding:40px;text-align:center;"><h1>${o("err_db_not_found_title")}</h1><p>${o("err_db_not_found_msg")}</p></div>`,500);try{await Oe(t.db)}catch(g){return I(`<div style="font-family:sans-serif;padding:40px;text-align:center;"><h1>${o("err_db_error_title")}</h1><p>${g.message}</p></div>`,500)}if(!await qe(t.db)){t._schemaIncompatible=!0;return}t.setupComplete=await Ie(t.db);let n=t.path.startsWith("/admin")||!t.setupComplete;t.isAdminContext=n,n?await Va(t.r2):await Ga(t.r2);let i=ta(t.request.headers.get("Cookie"));as(i);let l=i.logflare_lang,r=we(n),c=Ja(t.request,l,r),d=await za(t.r2,c,n);Xa(c,d),t.lang=J(),t.isRTL=Ee(),t.supportedLangs=r;let u=i.logflare_auth;if(t.userId=null,t.user=null,u&&t.setupComplete){let g=parseInt(u.split(".")[0]);if(g){let h=await rt(t.db,g);h?.signing_key&&await Qe(u,h.signing_key)&&(t.userId=h.id,t.user=h)}}});async function Ne(t){try{let a=ta(t.request.headers.get("Cookie")).logflare_auth;if(!a)return!1;let s=parseInt(a.split(".")[0]);if(!s)return!1;let n=await rt(t.db,s);return n?.signing_key?!!await Qe(a,n.signing_key):!1}catch{return!1}}async function pi(t){if(!t)return!1;try{return(await t.list({prefix:"_site/lang/",limit:1})).objects.length>0}catch{return!1}}function x(t){return async e=>{if(e._schemaIncompatible){let a=await Ne(e),s=a?await pi(e.r2):!1;return new Response(Jt(Rt,e.request,a,!1,s),{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}})}return t(e)}}T.post("/emergency-login",async t=>{let e=await t.request.formData(),a=e.get("username")?.trim(),s=e.get("password");try{let n=await Ht(t.db,a);if(n&&await At(s,n.salt,n.password_hash)){let i=n.signing_key||await C(t.db,"signing_key"),l=n.session_days||7,r=await ct(n.id,i,l*24);return new Response(null,{status:302,headers:{Location:"/","Set-Cookie":dt(r,l)}})}}catch{}return new Response(Jt(Rt,t.request,!1,!0),{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}})});T.get("/emergency-export",async t=>{if(!await Ne(t))return new Response("Unauthorized",{status:401});let e=await Ge(t.db,t.kv);return new Response(JSON.stringify(e,null,2),{headers:{"Content-Type":"application/json","Content-Disposition":'attachment; filename="logflare-export.json"'}})});T.post("/emergency-reset",async t=>{if(!await Ne(t))return new Response("Unauthorized",{status:401});let e=await t.request.formData();if(e.get("confirm")!=="RESET")return new Response(Jt(Rt,t.request,!0),{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}});let a=e.get("preserve_config")==="1",s=e.get("preserve_users")==="1",n=e.get("preserve_langs")==="1";await wt(t.db,t.kv,t.r2,{preserveMedia:!0,preserveConfig:a,preserveUsers:s,preserveLangs:n});let i=new Response(null,{status:302,headers:{Location:"/"}});return i.headers.append("Set-Cookie","logflare_auth=; Path=/; Max-Age=0"),i.headers.append("Set-Cookie","logflare_lang=; Path=/; Max-Age=0"),i});T.post("/emergency-full-reset",async t=>{if(!await Ne(t))return new Response("Unauthorized",{status:401});if((await t.request.formData()).get("confirm")!=="FULLRESET")return new Response(Jt(Rt,t.request,!0),{status:200,headers:{"Content-Type":"text/html; charset=utf-8"}});await wt(t.db,t.kv,t.r2,{preserveMedia:!1});let a=new Response(null,{status:302,headers:{Location:"/"}});return a.headers.append("Set-Cookie","logflare_auth=; Path=/; Max-Age=0"),a.headers.append("Set-Cookie","logflare_lang=; Path=/; Max-Age=0"),a});T.get("/setup-translate",async t=>ns(t));T.get("/setup-translate-batch",async t=>is(t));T.get("/setup-translate-status",async t=>{let e=t.query.lang||"",s=(t.query.source||"visitor")==="admin"?"lang/admin":"lang/visitor";if(!e||!t.r2)return E({ready:!1});let n=await t.r2.head(`_site/${s}/${e}.json`);return E({ready:!!n})});function O(t){return async e=>e.kv&&await e.kv.get("RESET_PASSWORD")?e.request.method==="POST"&&e.path==="/admin/reset-password"?ls(e):xe():e.user?t(e):xt("",e.path)}function R(t){return async e=>e.setupComplete?t(e):Se(e)}async function wn(t){let e=t.r2;if(!e)return new Response("R2 not configured",{status:500});let a=t.params.prefix?`${t.params.prefix}/${t.params.key}`:t.params.key;try{let s=await e.get(a);if(!s)return new Response(o("not_found"),{status:404});let n=new Headers;return s.httpMetadata?.contentType&&n.set("Content-Type",s.httpMetadata.contentType),n.set("Cache-Control","public, max-age=31536000, immutable"),new Response(s.body,{headers:n})}catch{return new Response(o("not_found"),{status:404})}}T.get("/",x(async t=>t.setupComplete?ms(t):Se(t)));T.post("/",x(async t=>t.setupComplete?new Response(o("method_not_allowed"),{status:405}):rs(t)));T.get("/tag/:identifier",x(R(fs)));T.get("/feed.xml",x(R(sn)));T.get("/sitemap.xml",x(R(nn)));T.get("/media/:key",x(R(wn)));T.get("/media/:prefix/:key",x(R(wn)));T.post("/admin/lang",x(async t=>{let a=(await t.request.formData()).get("lang")||"en",s=t.request.headers.get("Referer")||"/admin";return new Response(null,{status:302,headers:{Location:s,"Set-Cookie":`logflare_lang=${a}; Path=/; Max-Age=${365*24*3600}; SameSite=Strict`}})}));T.post("/admin/login",x(async t=>t.setupComplete?os(t):Se(t)));T.post("/admin/logout",x(O(cs)));T.get("/admin",x(R(O(ws))));T.get("/admin/posts",x(R(O(Es))));T.get("/admin/posts/new",x(R(O(Ts))));T.post("/admin/posts/new",x(R(O(Ss))));T.get("/admin/posts/:id/edit",x(R(O(xs))));T.post("/admin/posts/:id/edit",x(R(O(Cs))));T.post("/admin/posts/:id/delete",x(R(O(Ls))));T.post("/admin/posts/:id/slug",x(R(O(Ps))));T.post("/admin/posts/:id/license",x(R(O(Fs))));T.post("/admin/posts/:id/time",x(R(O(Ns))));T.get("/admin/tags",x(R(O(Bs))));T.get("/admin/tags/:id/edit",x(R(O(js))));T.post("/admin/tags/:id/edit",x(R(O(Hs))));T.post("/admin/tags/:id/delete",x(R(O(qs))));T.post("/admin/tags/clean",x(R(O(Ys))));T.get("/admin/settings",x(R(O(Rs))));T.post("/admin/settings",x(R(O($s))));T.post("/admin/change-password",x(R(O(Os))));T.get("/admin/media",x(R(O(Is))));T.post("/admin/media/upload",x(R(O(As))));T.post("/admin/media/:id/delete",x(R(O(ks))));T.get("/admin/export",x(R(O(Ds))));T.get("/admin/import",x(R(O(Us))));T.post("/admin/import",x(R(O(Ms))));T.post("/admin/reset",x(R(O(zs))));T.post("/admin/full-reset",x(R(O(Ws))));T.post("/admin/ai/title",x(R(O(Xs))));T.post("/admin/ai/excerpt",x(R(O(Js))));T.post("/admin/ai/review",x(R(O(Ks))));T.post("/admin/ai/cover",x(R(O(Zs))));T.post("/admin/ai/tags",x(R(O(Qs))));T.post("/admin/ai/translate",x(R(O(en))));T.post("/admin/ai/rewrite",x(R(O(tn))));T.post("/admin/ai/reference",x(R(O(an))));T.post("/admin/api/setting",x(R(O(Vs))));T.get("/admin/api/media",x(R(O(Gs))));T.get("/admin/analytics",x(R(O(cn))));T.get("/admin/api/analytics",x(R(O(on))));T.post("/admin/analytics/clear",x(R(O(ln))));T.get("/admin/chat",x(R(O(yn))));T.get("/admin/api/chat/conversations",x(R(O(gn))));T.get("/admin/api/chat/messages",x(R(O(fn))));T.post("/admin/api/chat/send",x(R(O(_n))));T.post("/admin/api/chat/note",x(R(O(hn))));T.get("/admin/api/chat/unread",x(R(O(bn))));T.get("/chat/status",x(dn));T.post("/chat/send",x(pn));T.post("/chat/update-info",x(un));T.get("/chat/messages",x(mn));T.get("/count",x(_a));T.post("/count",x(_a));T.post("/api/prefs",x(vn));T.get("/:identifier",x(R(gs)));var ho={async fetch(t,e,a){try{return e._executionCtx=a,await T.handle(t,e)}catch(s){console.error("Unhandled error:",s);let n=s.message||"",i=n.toLowerCase();return i.includes("d1")||i.includes("database")?I(`<div style="font-family:sans-serif;padding:40px;text-align:center;max-width:600px;margin:0 auto;"><h1>${o("err_quota_d1_title")}</h1><p style="color:#6e6e73;margin-top:12px;">${o("err_quota_d1_msg")}</p></div>`,429):i.includes("neurons")||i.includes("ai")&&(i.includes("limit")||i.includes("exceeded"))?I(`<div style="font-family:sans-serif;padding:40px;text-align:center;max-width:600px;margin:0 auto;"><h1>${o("err_quota_title")}</h1><p style="color:#6e6e73;margin-top:12px;">${o("ai_quota_exceeded")}</p></div>`,429):i.includes("r2")||i.includes("slowdown")||i.includes("storage object")?I(`<div style="font-family:sans-serif;padding:40px;text-align:center;max-width:600px;margin:0 auto;"><h1>${o("err_quota_r2_title")}</h1><p style="color:#6e6e73;margin-top:12px;">${o("err_quota_r2_msg")}</p></div>`,429):i.includes("kv")||i.includes("namespace")?I(`<div style="font-family:sans-serif;padding:40px;text-align:center;max-width:600px;margin:0 auto;"><h1>${o("err_quota_kv_title")}</h1><p style="color:#6e6e73;margin-top:12px;">${o("err_quota_kv_msg")}</p></div>`,429):i.includes("limit")||i.includes("quota")||i.includes("exceeded")||i.includes("429")||i.includes("too many")?I(`<div style="font-family:sans-serif;padding:40px;text-align:center;max-width:600px;margin:0 auto;"><h1>${o("err_quota_title")}</h1><p style="color:#6e6e73;margin-top:12px;">${o("err_quota_msg")}</p></div>`,429):I(`<div style="font-family:sans-serif;padding:40px;text-align:center;"><h1>${o("internal_error")}</h1><p>${n||"Unknown error"}</p></div>`,500)}}};export{ho as default};
