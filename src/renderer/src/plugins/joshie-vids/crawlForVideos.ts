import { replaceSlashes } from './utils'

export const rootUrl = `http://192.168.1.168:6113/Josh%20Photos/`
const linkRegex = /<a href="(.*)"/g
const ignoredLinks = ['https://github.com/http-party/http-server', './../']
const maxDepth = 10

export const crawlForVideos = async (url: string = rootUrl, depth = 0): Promise<string[]> => {
  if (depth >= maxDepth) return []

  const results = await crawl(url)
  let videos = [...results.videos]

  for (const f of results.follow) videos = [...videos, ...(await crawlForVideos(f, depth + 1))]

  return videos
}

const crawl = async (url: string) => {
  console.log(`crawling for videos..`)
  const response = await fetch(url)
  const html = await response.text()
  console.log(`got HTML with ${html.length} length`)
  const matches = [...html.matchAll(linkRegex)]
    .map((m) => m[1])
    .filter((s) => !ignoredLinks.includes(s))
    .map((s) => joinUrls(url, s)) // Use the custom URL join
    .map(replaceSlashes)
    .map((s) => s.replace('http:/', 'http://'))

  console.log(`found ${matches.length} matches`)

  const follow = matches.filter((s) => s.endsWith('/'))
  const videos = matches.filter(
    (s) =>
      s.toLowerCase().endsWith('.m4v') ||
      s.toLowerCase().endsWith('.mp4') ||
      s.toLowerCase().endsWith('.mov') ||
      s.toLowerCase().endsWith('.webm')
  )

  return {
    follow,
    videos
  }
}

const joinUrls = (baseUrl: string, relativePath: string) => {
  const trimmedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const trimmedRelative = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath
  return `${trimmedBase}/${trimmedRelative}`
}
