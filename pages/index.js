import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  get,
  query,
  orderByChild,
} from 'firebase/database';
import { useEffect, useCallback, useState } from 'react';
import { initFirebase } from '../lib/firebaseHelper.js';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    initFirebase();

    const db = getDatabase();
    const postListRef = ref(db, 'posts');
    onValue(
      postListRef,
      (snapshot) => {
        let newPosts = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          newPosts.push({
            key: childKey,
            ...childData,
          });
        });

        setPosts(newPosts);
      },
      {
        onlyOnce: false,
      }
    );
  }, []);

  const writePostData = useCallback((name, message) => {
    console.log(
      '🚀 ~ file: index.js ~ line 30 ~ writePostData ~ message',
      message
    );
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
    <>
      <form
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
      <ul>
        {posts.map((post) => {
          const { key, name, message } = post;
          return (
            <li key={key}>
              {name}: {message}
            </li>
          );
        })}
      </ul>
    </>
  );
}
