import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { initFirebase } from '../lib/firebaseHelper.js';
import TimeAgo from 'javascript-time-ago';

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
  const timeAgo = new TimeAgo('zh-Hant');
  return (
    <ul className="grid gap-[1px]">
      {posts.map((post) => {
        const { key, name, message, createdAt } = post;
        return (
          <li key={key} className="flex flex-col bg-slate-100 p-6">
            <div className="text-3xl">
              <span className="text-gradient">{message}</span>
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-400 text-xl">
                {name?.[0]}
              </div>
              <div className="ml-2 text-slate-800">{name}</div>
              <div className="mx-2 text-slate-500">-</div>
              <div className="text-sm text-slate-500">
                {timeAgo.format(createdAt)}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
