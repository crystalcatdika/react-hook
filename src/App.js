import React, { useState, useEffect, useRef }from 'react';
import './App.css';


function App() {
   // 练习useState useEffect
  // const [ name, setName ] = useState('yiling');
  const name = setInputValue('yiling');
  const engName = setInputValue('daisy');
  setDocumentTitle(name.value);
  const width = getWindowWidth();

  // 定义useAsync
  const userId = 1;
  const getUserName = (userId) => Promise.resolve('管理员');
  const { loading, username} = useAsync(() => getUserName(userId), [userId]);

  // useRef
    const inputEl = useRef(null);
    const onButtonClick = () => {
        console.log(inputEl.current);
        inputEl.current.focus();
    };

  return (
    <div className="App">
      <header className="App-header">
        <div>
            <p>{name.value} {engName.value}</p>
            <input
                { ...name }
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
        <div>
            <p>用户名: { username }</p>
        </div>
        <div>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
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


function useAsync(getData, condition) {
    const [loading, setloading] = useState(false);
    const [username, setusername] = useState('');
    const count = useRef(0);

    useEffect(() => {
        //多次调用，只取最后一次结果
        const currentCount = count.current;
        setloading(true);
        getData().then((res) => {
            if(count.current !== currentCount)
            setloading(false);
            setusername(res);
        });
        // 组件
        return () => {
            count.current += 1;
        }
    }, condition);


    return {
        loading,
        username
    }
}


export default App;
