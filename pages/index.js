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
          <li key={key} className="flex mb-2 border-b border-b-slate-200">
            <div className="rounded-2xl text-xl bg-slate-400 w-10 h-10 flex justify-center items-center">
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
