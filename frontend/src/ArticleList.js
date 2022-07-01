import dayjs from 'dayjs'

import './styles/Article.css'

function displayBiasRating(bias_rating) {
  if (!bias_rating) return

  return <>({bias_rating})</>
}

function displayArticleDate(filterBy, date) {
  return filterBy !== 'date' ? dayjs(date).format('MM/DD/YYYY') : null
}

function Article(props) {
  const filterBy = 'date'
  const { source, bias_rating, url, title, description, date } = props

  return (
    <article className='article'>
      <header>
        <span>{source}</span>
        <span className='capitalize'>&nbsp;{displayBiasRating(bias_rating)}</span>
      </header>
      <section className='section'>
        <h3>
          <a href={url}>{title}</a>
        </h3>
        <p>{description}</p>
        <span>{displayArticleDate(filterBy, date)}</span>
      </section>
    </article>
  )
}

export default function ArticleList({ articles }) {
  return articles?.map(({ id, ...props }) => <Article key={id} {...props} />)
}
