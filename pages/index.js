import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useCallback, useState } from 'react';
import { initFirebase } from '../lib/firebaseHelper.js';

export default function Home() {
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, [posts]);

  return (
    <div className="container mx-auto">
      <Posts posts={posts} />
    </div>
  );
}

function Posts({ posts }) {
  return (
    <ul className="bg-slate-100">
      {posts.map((post) => {
        const { key, name, message } = post;
        return (
          <li key={key} className="mb-2 flex border-b border-b-slate-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-400 text-xl">
              {name?.[0]}
            </div>
            <div>
              <span>{name}</span>
              <span>{message}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
