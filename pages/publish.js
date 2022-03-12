import { getDatabase, ref, set, push } from 'firebase/database';
import { useCallback, useState, useEffect } from 'react';
import { initFirebase } from '../lib/firebaseHelper.js';

function InputBox() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');
  const [alertClass, setAlertClass] = useState('opacity-0');

  const writePostData = useCallback((name, message) => {
    initFirebase();
    const db = getDatabase();
    const postListRef = ref(db, 'posts');
    const newPostRef = push(postListRef);
    set(newPostRef, {
      name,
      message,
      createdAt: new Date().getTime(),
    })
      .then(() => {
        setAlertClass('opacity-1 bg-green-500');
        setAlert('發送成功，謝謝您的參與');
        setMessage('');
      })
      .catch((error) => {
        setAlertClass('opacity-1 bg-red-500');
        setAlert('發送失敗，請再試一次');
      });
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    console.log(
      '🚀 ~ file: publish.js ~ line 32 ~ writePostData ~ savedName',
      savedName
    );
    if (savedName) {
      setName(savedName);
    }
  }, []);

  useEffect(() => {
    if (alertClass.indexOf('opacity-1') !== -1) {
      setTimeout(() => {
        setAlertClass('opacity-0');
      }, 3000);
    }
  }, [alert, alertClass]);

  return (
    <form
      className="my-6 flex flex-col px-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        writePostData(name, message);
      }}
    >
      <label htmlFor="name" className="text-lg">
        姓名
      </label>
      <input
        id="name"
        className="mt-1 mb-4 h-12 border border-purple-700 px-2 text-xl"
        value={name}
        onChange={(e) => {
          const newName = e.target.value;
          setName(newName);
          localStorage.setItem('name', newName);
        }}
        required
      />
      <label htmlFor="message" className="text-lg">
        訊息
      </label>
      <input
        id="message"
        className="mt-1 mb-4 h-12 border border-purple-700 px-2 text-xl"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <input
        type="submit"
        value="送出"
        className="mt-2 h-12 bg-purple-500 text-lg text-white"
      />
      {alert && (
        <div
          className={`${alertClass} mt-4 rounded-md text-center text-lg leading-loose text-white transition-all duration-500`}
        >
          {alert}
        </div>
      )}
    </form>
  );
}
export default function Publish() {
  return (
    <div className="container mx-auto">
      <InputBox />
    </div>
  );
}