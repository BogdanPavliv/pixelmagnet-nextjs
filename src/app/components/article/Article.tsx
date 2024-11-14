import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
    item: { id:number, title: string; text: string; image: string; };
}

const Article: React.FC<Props> = ({item}) => {
  return (
    <article className="article">
         <div className="article__img__wrapper">
         <Link href={`/article/${item.id}`} className="article__link-detail">
           <Image width={628} height={572} className="article__img" src={item.image} alt={item.title}/>
          </Link>
         </div>
        <div className="acticle__content">
          <Link href={`/article/${item.id}`} className="article__link-article">
            <h4 className="article__title">{item.title}</h4>
          </Link>
          <p className="article__text">{item.text}</p>
        </div>
    </article>
  )
}

export default Article;
