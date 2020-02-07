import React, { useState, useEffect }from 'react';
import './App.css';


function App() {
  // const [ name, setName ] = useState('yiling');
  const userName = setInputValue('yiling');
  const engName = setInputValue('daisy');
  setDocumentTitle(userName.value);
  const width = getWindowWidth();

    return (
    <div className="App">
      <header className="App-header">
        <div>
            <p>{userName.value} {engName.value}</p>
            <input
                { ...userName }
                // value={name}
                // onChange={ (e) => { setName(e.target.value)}}
            />
            <input
                { ...engName }
                // value={name}
                // onChange={ (e) => { setName(e.target.value)}}
            />
            <p>
                { width }

                {
                    width > 800 ? 'large' : ''
                }
                {
                    width < 400 ? 'small' : ''
                }
            </p>
        </div>
      </header>
    </div>
  );
}

function setInputValue(initialValue) {
  const [ value, setValue ] = useState(initialValue);
  return {
    value,
    onChange: (e) => {setValue(e.target.value)},
  }
}

// 注意此处 useEffect 第二个参数 [title] 表示只有title变化时起效，性能优化作用
// 如果不设置，其他useEffect 导致dom重新渲染，这个useEffect 会起效，打印documentEffect
function setDocumentTitle(title) {
    useEffect(() => {
        console.log('documentEffect');
        document.title = title;
    },[title]);
}

function getWindowWidth() {
    const [ width, setWidth] = useState(window.innerWidth);

    useEffect( () => {
        console.log('resizeEffect');
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        });
        return () => {
            window.removeEventListener('resize', () => {
                setWidth(window.innerWidth)
            });
        }
    }, [window.innerWidth]);
    return width;
}






export default App;
