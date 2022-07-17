import dayjs from 'dayjs'

import './styles/Article.css'

function displayBiasRating(bias_rating) {
  if (!bias_rating) return

  return <>({bias_rating})</>
}

function displayNewDay(date) {
  return dayjs(date).format('MM/DD/YYYY')
}

function displayTotalCitations(totalCitations) {
  if (!totalCitations) return
  return <span>({totalCitations})</span>
}

function Article(props) {
  const { source, bias_rating, url, title, description, totalCitations } = props
  return (
    <article className='container'>
      <div className='publication-name'>
        <span>{source}</span>
        <span className='capitalize'>&nbsp;{displayBiasRating(bias_rating)}</span>
      </div>
      <div className='title-description'>
        <h3>
          <a href={url}>{title}</a>
        </h3>
        <p>{description}</p>
        <span>{displayTotalCitations(totalCitations)}</span>
      </div>
    </article>
  )
}

export default function ArticleList({ data }) {
  return data?.map((blockOfContent) => {
    const date = blockOfContent[0]
    const contentBlock = blockOfContent[1]
    return (
      <div key={date}>
        <div className='date'>{displayNewDay(date)}</div>
        {contentBlock.map((content) => {
          return <Article {...content} />
        })}
      </div>
    )
  })
}
