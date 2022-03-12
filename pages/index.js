import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { initFirebase } from '../lib/firebaseHelper.js';
import TimeAgo from 'javascript-time-ago';
import stringToIconClassName from '../lib/stringToIconClassName';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPostClass, setNewPostClass] = useState('opacity-0');

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
    if (
      window.scrollY + window.innerHeight <
      document.body.scrollHeight - window.innerHeight / 2
    ) {
      // skip auto scroll to the bottom if user scroll back half screen
      setNewPostClass('opacity-1');
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [posts]);

  useEffect(() => {
    if (newPostClass.indexOf('opacity-1') !== -1) {
      setTimeout(() => {
        setNewPostClass('opacity-0');
      }, 3000);
    }
  }, [newPostClass]);

  return (
    <div className="container mx-auto">
      <div
        className={`${newPostClass} fixed bottom-0 left-0 right-0 bg-blue-400 text-center leading-loose text-white transition-all duration-500`}
      >
        新訊息
      </div>
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
            <div className="break-all text-3xl">{message}</div>
            <div className="mt-2 flex items-center">
              <div
                className={`${stringToIconClassName(
                  name
                )} flex h-10 w-10 items-center justify-center rounded-2xl text-xl`}
              >
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
