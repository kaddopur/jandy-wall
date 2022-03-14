import {
  getDatabase,
  limitToLast,
  onValue,
  query,
  ref,
} from 'firebase/database';
import { initFirebase } from '../lib/firebaseHelper.js';
import { useCallback, useEffect, useState } from 'react';
import Avvvatars from 'avvvatars-react';
import NavBar from '../components/NavBar';
import TimeAgo from 'javascript-time-ago';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPostClass, setNewPostClass] = useState('opacity-0');

  const scrollToBottom = useCallback((isSmooth = true) => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: isSmooth ? 'smooth' : 'instant',
    });
    setNewPostClass('opacity-0');
  }, []);

  useEffect(() => {
    initFirebase();

    const db = getDatabase();
    const postListRef = query(ref(db, 'posts'), limitToLast(256));
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
      scrollToBottom();
    }
  }, [posts, scrollToBottom]);

  useEffect(() => {
    if (newPostClass.indexOf('opacity-1') !== -1) {
      setTimeout(() => {
        setNewPostClass('opacity-0');
      }, 3000);
    }
  }, [newPostClass]);

  return (
    <div className="container mx-auto">
      <NavBar />
      <button
        className={`${newPostClass} fixed bottom-0 left-0 right-0 z-40 bg-blue-400 py-3 text-center leading-loose text-white transition-all duration-500`}
        onClick={scrollToBottom}
      >
        新訊息
      </button>
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
          <li
            key={key}
            className="relative flex flex-col overflow-hidden bg-slate-100 p-6"
          >
            <div className="break-all text-3xl">{message}</div>
            <div className="mt-2 flex items-center">
              <Avvvatars
                value={name}
                size={40}
                border
                borderSize={1}
                borderColor="#ccc"
              />
              <div className="ml-2 text-slate-800">{name}</div>
              <div className="mx-2 text-slate-500">-</div>
              <div className="text-sm text-slate-500">
                {timeAgo.format(createdAt)}
              </div>
              <img
                src="/logo.png"
                width={132}
                height={132}
                alt="jandy logo"
                className="absolute right-0 top-0 opacity-10"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
