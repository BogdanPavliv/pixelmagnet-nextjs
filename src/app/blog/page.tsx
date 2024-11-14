"use client";

import React, { useState, useEffect } from 'react';
import styles from "./blog.module.scss";
import { dataPosts } from "../utils/data";
import { dataPostsStatic } from "../utils/data";
import Article from '../components/article/Article';
import Circle from '../components/UI/Circle';
import Image from 'next/image';

import {useLenis} from "../../hooks/useLenis";

type PostItem = {
  id: number;
  title: string,
  text: string,
  image: string,
}

const BlogPage: React.FC = () => {
  // Плавний скрол
  useLenis();
  
  const [posts, setPosts] = useState<PostItem[]>(dataPosts.slice(0, 2));
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || scrollLoading || loadMoreVisible) return;
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        loadMorePostsOnScroll();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, scrollLoading, loadMoreVisible]);

  const loadMorePosts = () => {
    if (posts.length >= dataPosts.length) {
      setHasMore(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setPosts(posts.concat(dataPosts.slice(posts.length, posts.length + 2)));
      setLoading(false);
      setLoadMoreVisible(false);
    }, 1500);
  };

  const loadMorePostsOnScroll = () => {
    if (posts.length >= dataPosts.length) {
      setHasMore(false);
      return;
    }
    setScrollLoading(true);
    setTimeout(() => {
      setPosts(posts.concat(dataPosts.slice(posts.length, posts.length + 2)));
      setScrollLoading(false);
    }, 1500);
  };

  const handleLoadMore = () => {
    loadMorePosts();
  };

  return (
    <div className="main">
      <section className={styles.posts}>
        <div className="container">
          <div className="posts__inner">
            <div className="posts__top">
              <div className="posts__top--left">
                <h1 className="title">Blog</h1>
              </div>
              <div className="posts__top--right">
                <p className="posts__top--right-text">
                  Take a look at some of our proudest moments, where creativity, strategy, and innovation came together to make brands shine in the digital realm. Our success stories are a testament to our dedication and expertise.
                </p>
              </div>
            </div>
            <div className="posts__bottom">
              <div className="posts__large">
                <article className="articleLarge">
                  <div className="articleLarge__img__wrapper">
                   <Image width={1290} height={572} className="articleLarge__img" src="/img/section-posts/post-img-5.jpg" alt="" />
                  </div>
                  <div className="articleLarge__content--wrapper">
                    <div className="articleLarge__content">
                      <h4 className="articleLarge__title">Introducing: A brand new Dribbble for your portfolio</h4>
                      <p className="articleLarge__text">Our suite of services is designed to cater to every aspect of your online presence, from boosting your visibility to engaging your audience and driving conversions.</p>
                      <div className="articleLarge__category">2023 - UX/UI & App Development</div>
                    </div>
                    <a className="articleLarge__link" href="#">
                      <img className="articleLarge__link--img" src="/img/section-posts/arrow-right.svg" alt="" />
                    </a>
                  </div>
                </article>
              </div>
              <div className="posts__static">
                <div className={styles.articles}>
                  {dataPostsStatic.map((item: PostItem) => (
                    <Article item={item} key={item.id}/>
                  ))}
                </div>
              </div>
              <div className="posts__large">
                <article className="articleLarge">
                  <div className="articleLarge__img__wrapper">
                    <img className="articleLarge__img" src="/img/section-posts/post-img-6.jpg" alt="" />
                  </div>
                  <div className="articleLarge__content--wrapper">
                    <div className="articleLarge__content">
                      <h4 className="articleLarge__title">Blueprint fidelity: between paper prototype and finished product</h4>
                      <p className="articleLarge__text">Our suite of services is designed to cater to every aspect of your online presence, from boosting your visibility to engaging your audience and driving conversions.</p>
                      <div className="articleLarge__category">2023 - UX/UI & App Development</div>
                    </div>
                    <a className="articleLarge__link" href="#">
                      <img className="articleLarge__link--img" src="/img/section-posts/arrow-right.svg" alt="" />
                    </a>
                  </div>
                </article>
              </div>
              <div className="posts__infinite">
                <div className={styles.articles}>
                  {posts.map((item: PostItem) => (
                    <Article item={item} key={item.id}/>
                  ))}
                </div>
                {loadMoreVisible && (
                  <div className="loadMore_wrapper">
                    <button onClick={handleLoadMore} className="loadMore">
                      Load more
                    </button>
                  </div>
                )}
                {(loading || scrollLoading) && (
                  <div className="loading_wrapper">
                    <img width={32} height={32} className={styles.loading} src="/img/section-posts/loading.gif" alt="" />
                  </div>
                )}
                {!hasMore && (
                  <div className="line"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="magnetize">
            <div className="container-xs">
              <div className="magnetize__wrapper">
                <h1 className="title text-white">Let's <span className='text-bg'>magnetize</span> your online presence with our creative prowess and expert strategies </h1>
                <Circle>Let's talk</Circle>
              </div>
            </div>
      </section>
    </div>
  )
}

export default BlogPage;