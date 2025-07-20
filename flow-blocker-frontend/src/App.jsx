import { useState } from 'react'
import './App.css'

const DEFAULT_BLOCKED = ['exe','sh','bat'];

function App() {
  const [defaultBlocked, setDefaultBlocked] = useState(DEFAULT_BLOCKED.map(ext =>({ext, checked:true})));
  const [customBlocked, setCustomBlocked] = useState([]);
  const [newExt,setNewExt] = useState('');
  const [selectedFile, setSelectFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleToggle = (ext) => {
    setDefaultBlocked(prev =>
      prev.map(item => item.ext === ext ? {...item, checked: !item.checked} : item)
    );
  };

const handleAddCustom = () => {
  const ext = newExt.trim().toLowerCase().replace('.','');
  if (!ext || customBlocked.includes(ext)) return
    setCustomBlocked(prev=>[...prev, ext]);
    setNewExt('');
  };
const handleFileChage = (e) =>{
  setSelectFile(e.target.files[0]);
};

const getFileExtension = (filename) => {
  return filename?.split('.').pop().toLowerCase();
};

const handleUpload = async()=>{
  if(!selectedFile) return setMessage('파일을 선택해주세요.');

  const ext = getFileExtension(selectedFile.name);
  const allBlocked = [
    ...defaultBlocked.filter(item => item.checked).map(item => item.ext),
    ...customBlocked,
  ];

  if(allBlocked.includes(ext)) {

      const response = await fetch('http://localhost:4000/upload', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({userId : 1, fileName : selectedFile.name}),
    });

    const data = await response.json();
    setMessage(`error "${data.message}" `);

    return
  }

  setMessage(`"${selectedFile.name}" 업로드 성공`);
  await fetch('http://localhost:4000/upload',{
    method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({userId : 1, fileName : selectedFile.name}),
  });

};


const handleSaveBlockedExtensions = async () => {
  const allBlocked = [
    ...defaultBlocked.filter(item => item.checked).map(item => ({ext: item.ext, isCustom: false})),
    ...customBlocked.map(ext => ({ ext, isCustom: true})),
  ];

  const response = await fetch('http://localhost:4000/extensions/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      extensions: allBlocked,
    }),
  });

  const data = await response.json();
  setMessage(data.message);
};

  return (
    <>
      <div  className="container">
        
      <h2  className="title"> 파일 확장자 차단 업로더 </h2>
      <h3 className="subtitle"> 기본 차단 확장자 </h3>
      {defaultBlocked.map(item => (
        <label key={item.ext} style={{marginRight:'10px'}}>
          <input 
          type="checkbox"
          checked={item.checked}
          onChange={()=>handleToggle(item.ext)}
          />.{item.ext}
        </label>
      ))}
      <h3  className="subtitle"> 커스텀 차단 확장자 추가</h3>
      <input type="text" value={newExt} onChange={(e)=>setNewExt(e.target.value)} placeholder="ex: zip"  className="input-text"/>
      <button onClick={handleAddCustom} className="addButton">추가</button>
      <button onClick={handleSaveBlockedExtensions} className="button">
        차단 확장자 저장
      </button>
      <div>현재 차단 목록 : {customBlocked.map(ext => '.' +ext).join(',')} </div>

      <hr/>

      <input type='file' onChange={handleFileChage}/>
      <br/><br/>
      <button onClick={handleUpload} className="button">업로드</button>

      <p className="message">{message}</p>

      </div>
    </>
  );
}

export default App;
