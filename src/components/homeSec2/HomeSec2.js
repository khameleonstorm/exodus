import s from './HomeSec2.module.css';

export default function HomeSec2({list, text}) {


  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>{text.title}</h1>
        <h2>{text.subtitle}</h2>
        <img src={text.image} alt={text.title}/>
        {text.cardDesc &&
          <div className={s.access}>
            <p>
              {text.cardDesc}
            </p>
            <a href={text.cardLink}>{text.cardLinkText}<span>&rarr;</span></a>
          </div>
        }
      </div>
      {list.length > 0 && <div className={s.list}>
        {list.map(item  => 
          <div className={s.item} key={item.id}>
            <item.icon />
            <b>{item.id}</b>
            <p>{item.desc}</p>
          </div>
        )}
      </div>}
    </div>
  )
}
