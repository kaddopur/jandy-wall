import { getDatabase, ref, set, push } from 'firebase/database';
import { useCallback, useState } from 'react';
import { initFirebase } from '../lib/firebaseHelper.js';

function InputBox() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const writePostData = useCallback((name, message) => {
    initFirebase();
    const db = getDatabase();
    const postListRef = ref(db, 'posts');
    const newPostRef = push(postListRef);
    set(newPostRef, {
      name,
      message,
      createdAt: new Date().getTime(),
    });
  }, []);

  return (
    <form
      className="bg-green-300 h-20 sticky bottom-0"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        writePostData(name, message);
      }}
    >
      Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      Message:
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <input type="submit" />
    </form>
  );
}
export default function Publish() {
  return (
    <div className="container">
      <InputBox />
    </div>
  );
}
